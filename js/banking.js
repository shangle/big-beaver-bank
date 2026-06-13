/**
 * Big Beaver Bank (BBB) - Online Banking Simulator Logic
 * Fully functional client-side simulation.
 */

// List of common compromised passwords to reject
const COMPROMISED_PASSWORDS = [
  'password', '123456', 'admin', 'qwerty', '12345678', '12345', '123456789', '1234', '111111', 
  '123123', 'password123', 'letmein', 'sunshine', 'iloveyou', 'princess', 'welcome', 'secret', 
  'football', 'monkey', 'charlie', 'joshua', 'corporate', 'bank', 'banking', 'bigbeaver', 'beaver',
  'root', 'system', 'manager', 'guest', 'user', 'changeit', 'password12'
];

// Fictional company dataset for generating 200 transactions
const FICTIONAL_ENTITIES = [
  { name: "Omega Mart Citrus Division", category: "Revenue", type: "deposit", desc: "Settlement: Glitch Lemon Buyback" },
  { name: "Weyland-Yutani Corp", category: "Logistics", type: "withdrawal", desc: "Payment: Relativistic Cargo Freight Lease" },
  { name: "Dunder Mifflin Paper Co.", category: "Operations", type: "withdrawal", desc: "Purchase: Corporate Administrative Bond Paper" },
  { name: "The Dharma Initiative", category: "Research", type: "deposit", desc: "Blind Trust Disbursement: Sub-Oceanic Station Funding" },
  { name: "Initech Corporation", category: "Audit", type: "withdrawal", desc: "Service Fee: Software Auditing & TPS Report Compliance" },
  { name: "Vandelay Industries", category: "Inventory", type: "withdrawal", desc: "Settlement: Domestic Latex Futures import" },
  { name: "Globex Corporation", category: "Utility", type: "deposit", desc: "Bond Dividend: Sub-Mountainous Geothermal Grid" },
  { name: "Stark Industries", category: "Utility", type: "withdrawal", desc: "Payment: Clean Energy Grid Tap-In" },
  { name: "Wayne Enterprises", category: "Corporate", type: "deposit", desc: "Direct Deposit: Municipal Security Subcontract" },
  { name: "Tyrell Corporation", category: "Operations", type: "withdrawal", desc: "Lease Fee: Replicant Humanoid Labor Allocation" },
  { name: "Aperture Science", category: "Equipment", type: "withdrawal", desc: "Purchase: Portal Testing Ring Alignment Tooling" },
  { name: "Black Mesa Research", category: "Logistics", type: "withdrawal", desc: "Freight: Anomalous Materials Custodial Transit" },
  { name: "Buy n Large Corp", category: "Supplies", type: "withdrawal", desc: "Purchase: Automated Facility Janitorial Drones" },
  { name: "E Corp Fiduciary", category: "Debt Service", type: "withdrawal", desc: "Settlement: Standard Debt Amortization Payment" },
  { name: "Los Pollos Hermanos", category: "Operations", type: "withdrawal", desc: "Catering: Executive Board Quarterly Meeting" },
  { name: "Wonka Candy Industries", category: "Revenue", type: "deposit", desc: "Royalty: Golden Ticket Retail Operations" },
  { name: "Big Beaver Energy", category: "Marketing", type: "withdrawal", desc: "Invoice: Corporate Branded Workwear & Safety Apparel" },
  { name: "Cyberdyne Systems", category: "Equipment", type: "withdrawal", desc: "Purchase: Neural Net Mainframe Cooling Elements" }
];

document.addEventListener('DOMContentLoaded', () => {
  // Session State
  let currentUser = localStorage.getItem('bbb_active_session');
  
  // DOM Elements
  const loginContainer = document.getElementById('login-container');
  const dashboardContainer = document.getElementById('dashboard-container');
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginError = document.getElementById('login-error');
  
  const displayUsername = document.getElementById('display-username');
  const displayRole = document.getElementById('display-role');
  const logoutBtn = document.getElementById('logout-btn');

  // Balances
  const balanceChecking = document.getElementById('balance-checking');
  const balanceSavings = document.getElementById('balance-savings');
  const balanceEscrow = document.getElementById('balance-escrow');

  // Ledger elements
  const transactionBody = document.getElementById('transaction-body');
  const ledgerSearch = document.getElementById('ledger-search');
  const ledgerFilterType = document.getElementById('ledger-filter-type');

  // Forms and Tabs
  const tabButtons = document.querySelectorAll('.banking-menu-item button');
  const tabPanes = document.querySelectorAll('.banking-tab-pane');
  const transferForm = document.getElementById('transfer-form');
  const depositForm = document.getElementById('deposit-form');
  const loanForm = document.getElementById('loan-form');
  const cameraTrigger = document.getElementById('camera-trigger');
  const checkFileInput = document.getElementById('check-file-input');

  // Notification Banner
  const notificationBanner = document.getElementById('notification-banner');
  const notificationMsg = document.getElementById('notification-msg');

  // Initialize view based on session
  if (currentUser) {
    showDashboard(currentUser);
  } else {
    showLogin();
  }

  // --- LOGIN LOGIC ---
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = usernameInput.value.trim().toLowerCase();
      const password = passwordInput.value;

      if (!username || !password) {
        showError("Username and password are required.");
        return;
      }

      // Check user registry
      let registry = JSON.parse(localStorage.getItem('bbb_users') || '{}');

      if (registry[username]) {
        // User exists, verify password
        if (registry[username] === password) {
          loginUser(username);
        } else {
          showError("Access Denied: Invalid password for established credential.");
        }
      } else {
        // New user, validate password strength
        const cleanPassword = password.trim().toLowerCase();
        if (COMPROMISED_PASSWORDS.includes(cleanPassword)) {
          showError("Operational Security Alert: Your password is too weak or found in compromised registries. Please enter a secure password.");
          return;
        }

        // Register new user
        registry[username] = password;
        localStorage.setItem('bbb_users', JSON.stringify(registry));
        loginUser(username);
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('bbb_active_session');
      currentUser = null;
      showLogin();
    });
  }

  function loginUser(username) {
    localStorage.setItem('bbb_active_session', username);
    currentUser = username;
    showDashboard(username);
  }

  function showError(msg) {
    if (loginError) {
      loginError.textContent = msg;
      loginError.style.display = 'block';
    }
  }

  function showLogin() {
    if (loginContainer && dashboardContainer) {
      loginContainer.style.display = 'block';
      dashboardContainer.style.display = 'none';
      if (loginError) loginError.style.display = 'none';
      if (loginForm) loginForm.reset();
    }
  }

  // --- DASHBOARD LOGIC ---
  function showDashboard(username) {
    if (loginContainer && dashboardContainer) {
      loginContainer.style.display = 'none';
      dashboardContainer.style.display = 'block';
      
      // Setup profile display
      if (displayUsername) displayUsername.textContent = username;
      if (displayRole) displayRole.textContent = "Executive Treasury Administrator";

      // Load or Initialize balances
      let balances = JSON.parse(localStorage.getItem(`bbb_balances_${username}`));
      if (!balances) {
        balances = {
          checking: 4582912.44,
          savings: 12940230.12,
          escrow: 75000000.00
        };
        localStorage.setItem(`bbb_balances_${username}`, JSON.stringify(balances));
      }
      updateBalanceUI(balances);

      // Load or Initialize transactions
      let txns = JSON.parse(localStorage.getItem(`bbb_txns_${username}`));
      if (!txns || txns.length < 200) {
        txns = generateFictionalTransactions(username);
        localStorage.setItem(`bbb_txns_${username}`, JSON.stringify(txns));
      }

      renderLedger(txns);
      setupTabSwitching();
    }
  }

  function updateBalanceUI(balances) {
    if (balanceChecking) balanceChecking.textContent = `$${balances.checking.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (balanceSavings) balanceSavings.textContent = `$${balances.savings.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (balanceEscrow) balanceEscrow.textContent = `$${balances.escrow.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  }

  // Generate 200 deterministic fictional transactions based on username
  function generateFictionalTransactions(username) {
    const txnList = [];
    // Anchor date: June 13, 2026
    const baseDate = new Date(2026, 5, 13, 10, 0, 0);

    for (let i = 0; i < 200; i++) {
      // Deterministic randomness based on index i and username characters
      const seed = i + username.charCodeAt(0 % username.length);
      const entity = FICTIONAL_ENTITIES[seed % FICTIONAL_ENTITIES.length];
      
      // Subtraction interval: stagger days and hours
      const offsetMinutes = i * 432; // staggered timing (~7.2 hours between transactions)
      const txnDate = new Date(baseDate.getTime() - offsetMinutes * 60 * 1000);
      
      // Calculate realistic amounts
      let amount = 0;
      if (entity.type === 'deposit') {
        // Larger corporate deposits
        amount = 10000 + ((seed * 739) % 240000) + 0.45;
      } else {
        // Operational withdrawals
        amount = 50 + ((seed * 231) % 45000) + 0.99;
      }

      txnList.push({
        id: `TXN-${2026000 + i}`,
        date: txnDate.toISOString().slice(0, 19).replace('T', ' '),
        displayDate: txnDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        desc: entity.desc,
        entity: entity.name,
        category: entity.category,
        type: entity.type,
        amount: amount
      });
    }

    return txnList;
  }

  function renderLedger(txns) {
    if (!transactionBody) return;
    
    transactionBody.innerHTML = '';
    const searchTerm = ledgerSearch ? ledgerSearch.value.trim().toLowerCase() : '';
    const filterType = ledgerFilterType ? ledgerFilterType.value : 'all';

    const filtered = txns.filter(txn => {
      const matchesSearch = txn.desc.toLowerCase().includes(searchTerm) || txn.entity.toLowerCase().includes(searchTerm);
      const matchesType = filterType === 'all' || txn.type === filterType;
      return matchesSearch && matchesType;
    });

    if (filtered.length === 0) {
      transactionBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 30px;">No transaction entries matches criteria.</td></tr>`;
      return;
    }

    filtered.forEach(txn => {
      const row = document.createElement('tr');
      
      const amtClass = txn.type === 'deposit' ? 'amount-credit' : 'amount-debit';
      const amtSign = txn.type === 'deposit' ? '+' : '-';

      row.innerHTML = `
        <td class="txn-date">${txn.displayDate}</td>
        <td>
          <div class="txn-desc">${txn.desc}</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${txn.entity}</div>
        </td>
        <td><span class="txn-category">${txn.category}</span></td>
        <td class="txn-amount ${amtClass}">${amtSign}$${txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
      `;
      transactionBody.appendChild(row);
    });
  }

  // --- FILTERS & SEARCH ---
  if (ledgerSearch) {
    ledgerSearch.addEventListener('input', () => {
      const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`)) || [];
      renderLedger(txns);
    });
  }

  if (ledgerFilterType) {
    ledgerFilterType.addEventListener('change', () => {
      const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`)) || [];
      renderLedger(txns);
    });
  }

  // --- TAB NAVIGATION LOGIC ---
  function setupTabSwitching() {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        tabPanes.forEach(pane => {
          if (pane.id === targetTab || (pane.id === 'tab-dashboard' && targetTab === 'tab-dashboard')) {
            pane.style.display = 'block';
            pane.classList.add('active');
          } else {
            pane.style.display = 'none';
            pane.classList.remove('active');
          }
        });
      });
    });
  }

  // --- TRANSFER FUNDS LOGIC ---
  if (transferForm) {
    transferForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fromAcc = document.getElementById('transfer-from').value;
      const toAcc = document.getElementById('transfer-to').value;
      const amount = parseFloat(document.getElementById('transfer-amount').value);

      if (!amount || amount <= 0) return;

      const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
      if (balances[fromAcc] < amount) {
        showBannerNotification("Overdraft Blocked: Insufficient ledger funds in source account.", "error");
        return;
      }

      // Deduct from source
      balances[fromAcc] -= amount;

      let desc = "";
      let entityName = "";
      let category = "Transfer";

      if (toAcc === 'checking-internal') {
        balances.checking += amount;
        desc = "Internal Transfer to Checking";
        entityName = "Self-Transfer";
      } else if (toAcc === 'savings-internal') {
        balances.savings += amount;
        desc = "Internal Transfer to Savings";
        entityName = "Self-Transfer";
      } else {
        // External transfer
        const extNames = {
          'ext-bbe': { name: "Big Beaver Energy Store", desc: "Corporate Safety Gear Purchase" },
          'ext-omega': { name: "Omega Mart Settlement", desc: "Bulk Lemon Sourcing Settlement" },
          'ext-weyland': { name: "Weyland-Yutani Operations", desc: "Infrastructure Syndicated Lease Payment" },
          'ext-vandelay': { name: "Vandelay Industries Desk", desc: "Rubber Import Clearing" },
          'ext-dharma': { name: "Dharma Initiative Fiduciary", desc: "Swan Station Deep Deposit" },
          'ext-initech': { name: "Initech software audit", desc: "Software Systems Engineering Audit" },
          'ext-globex': { name: "Globex Grid Settlement", desc: "Volcanic Power Grid Line Clearing" }
        };
        entityName = extNames[toAcc].name;
        desc = extNames[toAcc].desc;
        category = "Commercial Payment";
      }

      // Save balances
      localStorage.setItem(`bbb_balances_${currentUser}`, JSON.stringify(balances));
      updateBalanceUI(balances);

      // Append Transaction
      const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`));
      const now = new Date();
      txns.unshift({
        id: `TXN-${Date.now().toString().slice(-7)}`,
        date: now.toISOString().slice(0, 19).replace('T', ' '),
        displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        desc: desc,
        entity: entityName,
        category: category,
        type: "withdrawal",
        amount: amount
      });
      localStorage.setItem(`bbb_txns_${currentUser}`, JSON.stringify(txns));
      
      renderLedger(txns);
      transferForm.reset();
      showBannerNotification(`Fiduciary Transfer Approved: $${amount.toLocaleString()} successfully processed.`, "success");
    });
  }

  // --- CHECK DEPOSIT LOGIC ---
  if (cameraTrigger) {
    cameraTrigger.addEventListener('click', () => {
      checkFileInput.click();
    });
  }

  if (checkFileInput) {
    checkFileInput.addEventListener('change', () => {
      if (checkFileInput.files.length > 0) {
        cameraTrigger.style.borderColor = 'var(--primary-color)';
        cameraTrigger.querySelector('div').textContent = "Endorsed Image Loaded: " + checkFileInput.files[0].name;
      }
    });
  }

  if (depositForm) {
    depositForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const depAcc = document.getElementById('deposit-to').value;
      const amount = parseFloat(document.getElementById('deposit-amount').value);

      if (!amount || amount <= 0) return;
      if (checkFileInput.files.length === 0) {
        showBannerNotification("Compliance Error: Check endorsement image captures are required.", "error");
        return;
      }

      const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
      balances[depAcc] += amount;
      localStorage.setItem(`bbb_balances_${currentUser}`, JSON.stringify(balances));
      updateBalanceUI(balances);

      // Append Transaction
      const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`));
      const now = new Date();
      txns.unshift({
        id: `TXN-${Date.now().toString().slice(-7)}`,
        date: now.toISOString().slice(0, 19).replace('T', ' '),
        displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        desc: "Mobile Check Deposit Approved",
        entity: "Check Endorsement Clearing",
        category: "Deposit",
        type: "deposit",
        amount: amount
      });
      localStorage.setItem(`bbb_txns_${currentUser}`, JSON.stringify(txns));

      renderLedger(txns);
      depositForm.reset();
      cameraTrigger.style.borderColor = 'var(--border-color)';
      cameraTrigger.querySelector('div').textContent = "Click to Capture Check Image";
      showBannerNotification(`Fiduciary Draft Verified: $${amount.toLocaleString()} deposited.`, "success");
    });
  }

  // --- LOAN FORM LOGIC ---
  if (loanForm) {
    loanForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const purpose = document.getElementById('loan-purpose').value;
      const collateral = document.getElementById('loan-collateral').value;
      const amount = parseFloat(document.getElementById('loan-request-amount').value);

      if (!amount || amount <= 0) return;

      // Autocheck rules: approve everything with funny corporate jargon
      const purposeText = {
        anomalous: "Dimensional Stabilization",
        space: "Relativistic Asteroid Mining",
        latex: "Latex Commodity Import",
        research: "Electromagnetic Wave Siphoning",
        corporate: "Paper Supply Consolidation"
      }[purpose];

      showBannerNotification(`Underwriting Complete: Fiduciary line of $${amount.toLocaleString()} approved for ${purposeText} backed by ${collateral}.`, "success");
      
      // Add credit deposit
      const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
      balances.checking += amount;
      localStorage.setItem(`bbb_balances_${currentUser}`, JSON.stringify(balances));
      updateBalanceUI(balances);

      const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`));
      const now = new Date();
      txns.unshift({
        id: `TXN-${Date.now().toString().slice(-7)}`,
        date: now.toISOString().slice(0, 19).replace('T', ' '),
        displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        desc: `Credit Line Drawdown: ${purposeText}`,
        entity: "BBB Underwriting Capital",
        category: "Credit Draw",
        type: "deposit",
        amount: amount
      });
      localStorage.setItem(`bbb_txns_${currentUser}`, JSON.stringify(txns));
      renderLedger(txns);
      loanForm.reset();
    });
  }

  // --- NOTIFICATION BANNER HELPER ---
  function showBannerNotification(msg, type = "success") {
    if (!notificationBanner || !notificationMsg) return;
    
    notificationMsg.textContent = msg;
    
    if (type === "error") {
      notificationBanner.style.backgroundColor = '#b91c1c';
      notificationBanner.style.color = '#ffffff';
    } else {
      notificationBanner.style.backgroundColor = 'var(--primary-color)';
      notificationBanner.style.color = 'var(--text-light)';
      notificationBanner.style.borderLeft = '4px solid var(--accent-color)';
    }

    notificationBanner.classList.add('show');
    
    setTimeout(() => {
      notificationBanner.classList.remove('show');
    }, 5000);
  }
});
