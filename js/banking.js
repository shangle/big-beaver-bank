/**
 * Big Beaver Bank (BBB) - Upgraded Online Banking State Engine
 * Simulates passwords, security locks, nicknames, canvas budgets, support messaging, and NACHA.
 */

// compromised passwords list
const COMPROMISED_PASSWORDS = [
  'password', '123456', 'admin', 'qwerty', '12345678', '12345', '123456789', '1234', '111111', 
  '123123', 'password123', 'letmein', 'sunshine', 'iloveyou', 'princess', 'welcome', 'secret', 
  'football', 'monkey', 'charlie', 'joshua', 'corporate', 'bank', 'banking', 'bigbeaver', 'beaver',
  'root', 'system', 'manager', 'guest', 'user', 'changeit', 'password12'
];

// Fictional dataset
const FICTIONAL_ENTITIES = [
  { name: "Omega Mart Citrus Division", category: "Inventory", type: "deposit", desc: "Direct Deposit: Glitch Lemon Sourcing Settlement" },
  { name: "Weyland-Yutani Corp", category: "Utilities", type: "withdrawal", desc: "ACH Payment: Relativistic Cargo Freight Lease" },
  { name: "Dunder Mifflin Paper Co.", category: "Operations", type: "withdrawal", desc: "Purchase: Corporate Administrative Bond Paper" },
  { name: "The Dharma Initiative", category: "Operations", type: "deposit", desc: "Fiduciary Trust: Sub-Oceanic Station Funding" },
  { name: "Initech Corporation", category: "Audit", type: "withdrawal", desc: "ACH Payment: software auditing TPS compliance" },
  { name: "Vandelay Industries", category: "Inventory", type: "withdrawal", desc: "Direct Debit: Latex import contract settlement" },
  { name: "Globex Corporation", category: "Utilities", type: "deposit", desc: "Bond Dividend: Sub-Mountainous Geothermal Grid" },
  { name: "Stark Industries", category: "Utilities", type: "withdrawal", desc: "Wire Transfer: Clean Energy Grid Tap-In" },
  { name: "Wayne Enterprises", category: "Operations", type: "deposit", desc: "Direct Deposit: Municipal Security Subcontract" },
  { name: "Tyrell Corporation", category: "Operations", type: "withdrawal", desc: "Lease Fee: Replicant Humanoid Labor Allocation" },
  { name: "Aperture Science", category: "Equipment", type: "withdrawal", desc: "Purchase: Portal Testing Ring Alignment Tooling" },
  { name: "Black Mesa Research", category: "Logistics", type: "withdrawal", desc: "Freight: Anomalous Materials Custodial Transit" },
  { name: "Buy n Large Corp", category: "Operations", type: "withdrawal", desc: "Purchase: Automated Facility Janitorial Drones" },
  { name: "E Corp Fiduciary", category: "Debt Service", type: "withdrawal", desc: "Settlement: Standard Debt Amortization Payment" },
  { name: "Los Pollos Hermanos", category: "Marketing", type: "withdrawal", desc: "Catering: Executive Board Quarterly Meeting" },
  { name: "Wonka Candy Industries", category: "Operations", type: "deposit", desc: "Royalty: Golden Ticket Retail Operations" },
  { name: "Big Beaver Energy", category: "Marketing", type: "withdrawal", desc: "ACH Debit: Corporate Branded Workwear & Safety Apparel" },
  { name: "Cyberdyne Systems", category: "Equipment", type: "withdrawal", desc: "Purchase: Neural Net Mainframe Cooling Elements" },
  { name: "Acme Corporation", category: "Inventory", type: "withdrawal", desc: "Wire Out: Jet-Powered Unicycle Delivery Contract" },
  { name: "Hooli", category: "Utilities", type: "withdrawal", desc: "ACH Debit: Nucleus Server Platform Cloud Load Balancer" },
  { name: "Soylent Corporation", category: "Inventory", type: "deposit", desc: "ACH Direct Deposit: High-Protein Marine Algae Settlement" },
  { name: "Initech Payroll", category: "Operations", type: "withdrawal", desc: "Direct Deposit Payroll: QA Engineering Dept" },
  { name: "Dharma Station Swan", category: "Utilities", type: "withdrawal", desc: "ACH Payment: Electromagnet Shield Reactor Fuel Rods" },
  { name: "Weyland-Yutani Xenomorph Division", category: "Audit", type: "withdrawal", desc: "Wire Transfer: Outpost Containment Facility Audit Fee" },
  { name: "Dunder Mifflin Sabre", category: "Inventory", type: "deposit", desc: "Wire In: Bulk Printer Paper Wholesale Contract" },
  { name: "Vandelay Latex Division", category: "Inventory", type: "deposit", desc: "ACH Credit: Raw Polyisoprene Rubber Export Sweep" },
  { name: "Acme Pyrotechnics", category: "Logistics", type: "withdrawal", desc: "Direct Debit: Explosive Tennis Ball Freight Clearing" },
  { name: "Soylent Green Co.", category: "Operations", type: "deposit", desc: "Direct Deposit: Plankton Nutrient Supply Clearance" },
  { name: "Hooli Nucleus Dev", category: "Audit", type: "withdrawal", desc: "Bill Pay: Compression Algorithm Testing Consultation" }
];

// Budget Category Colors
const CATEGORY_COLORS = {
  "Inventory": "#c5a059",    // Gold
  "Utilities": "#0f5a34",    // Medium Green
  "Operations": "#1e293b",   // Slate
  "Audit": "#57534e",        // Stone
  "Logistics": "#0369a1",    // Sky
  "Debt Service": "#475569", // Dark Slate
  "Marketing": "#854D0E",    // Amber
  "Equipment": "#7c2d12"     // Rust
};

// Default payroll roster
const defaultRoster = [
  { name: "Dwight Schrute", routing: "021000021", account: "948201", salary: 4500.00 },
  { name: "Jim Halpert", routing: "021000021", account: "928401", salary: 4200.00 },
  { name: "Pam Beesly", routing: "021000021", account: "882019", salary: 3800.00 }
];

// Default ticketing system inbox
const defaultTickets = [
  { id: "TKT-88491", subject: "eStatement Audits", dept: "Treasury", messages: [
    { sender: "System", text: "Ticket opened automatically for eStatement Audits." },
    { sender: "Staff", text: "Your corporate account eStatements are ready for download. Please verify your balance ledger." }
  ]},
  { id: "TKT-99120", subject: "MFA Authentication", dept: "Fraud", messages: [
    { sender: "System", text: "Ticket opened by user." },
    { sender: "User", text: "I need to confirm if my MFA settings are active." },
    { sender: "Staff", text: "MFA triggers have been enabled for large ACH wires and payroll batches. Security confirmed." }
  ]}
];

document.addEventListener('DOMContentLoaded', () => {
  let currentUser = localStorage.getItem('bbb_active_session');

  // DOM Elements
  const loginContainer = document.getElementById('login-container');
  const dashboardContainer = document.getElementById('dashboard-container');
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');

  // Nickname elements
  const customizeDashboardBtn = document.getElementById('customize-dashboard-btn');
  const nicknamePanel = document.getElementById('nickname-panel');
  const nicknameCheckingInput = document.getElementById('nickname-checking-input');
  const nicknameSavingsInput = document.getElementById('nickname-savings-input');
  const nicknameEscrowInput = document.getElementById('nickname-escrow-input');
  const nicknameSaveBtn = document.getElementById('nickname-save-btn');
  const nicknameCancelBtn = document.getElementById('nickname-cancel-btn');

  const labelChecking = document.getElementById('label-checking');
  const labelSavings = document.getElementById('label-savings');
  const labelEscrow = document.getElementById('label-escrow');

  // Reset modal elements
  const resetCredentialsLink = document.getElementById('reset-credentials-link');
  const resetModal = document.getElementById('reset-modal');
  const resetForm = document.getElementById('reset-form');
  const resetUsernameInput = document.getElementById('reset-username');
  const resetPasswordInput = document.getElementById('reset-password');
  const resetCancelBtn = document.getElementById('reset-cancel-btn');

  // Balances
  const balanceChecking = document.getElementById('balance-checking');
  const balanceSavings = document.getElementById('balance-savings');
  const balanceEscrow = document.getElementById('balance-escrow');

  // Ledger
  const transactionBody = document.getElementById('transaction-body');
  const ledgerSearch = document.getElementById('ledger-search');
  const ledgerFilterType = document.getElementById('ledger-filter-type');

  // Tabs
  const tabButtons = document.querySelectorAll('.banking-menu-item button');
  const tabPanes = document.querySelectorAll('.banking-tab-pane');

  // Sub-tabs for transfers
  const btnSubtabInternal = document.getElementById('btn-subtab-internal');
  const btnSubtabAch = document.getElementById('btn-subtab-ach');
  const transferForm = document.getElementById('transfer-form');
  const achForm = document.getElementById('ach-form');

  // Bill pay and stop payment
  const billpayForm = document.getElementById('billpay-form');
  const stoppaymentForm = document.getElementById('stoppayment-form');

  // Check deposit
  const depositForm = document.getElementById('deposit-form');
  const cameraTrigger = document.getElementById('camera-trigger');
  const checkFileInput = document.getElementById('check-file-input');

  // Payroll
  const payrollRosterBody = document.getElementById('payroll-roster-body');
  const addEmployeeBtn = document.getElementById('add-employee-btn');
  const payrollNameInput = document.getElementById('payroll-name');
  const payrollAccInput = document.getElementById('payroll-acc');
  const payrollAmtInput = document.getElementById('payroll-amt');
  const btnGenerateNacha = document.getElementById('btn-generate-nacha');
  const nachaOutputSection = document.getElementById('nacha-output-section');
  const nachaContentTextarea = document.getElementById('nacha-content');
  const btnDownloadNacha = document.getElementById('btn-download-nacha');
  const btnSubmitAchBank = document.getElementById('btn-submit-ach-bank');

  // eStatements
  const btnGenerateStatement = document.getElementById('btn-generate-statement');
  const statementModal = document.getElementById('statement-modal');
  const statementPrintArea = document.getElementById('statement-print-area');
  const closeStatementBtn = document.getElementById('close-statement-btn');

  // Secure Messaging
  const chatInputForm = document.getElementById('chat-input-form');
  const chatUserMessage = document.getElementById('chat-user-message');
  const chatMessagesBox = document.getElementById('chat-messages-box');
  const ticketThreads = document.getElementById('ticket-threads');

  // Notification Banner
  const notificationBanner = document.getElementById('notification-banner');
  const notificationMsg = document.getElementById('notification-msg');

  // Init page view
  if (currentUser) {
    showDashboard(currentUser);
  } else {
    showLogin();
  }

  // --- PASSWORD RESET & CREDENTIAL LOCK LOGIC ---
  if (resetCredentialsLink) {
    resetCredentialsLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.style.display = 'none';
      resetModal.style.display = 'block';
    });
  }

  if (resetCancelBtn) {
    resetCancelBtn.addEventListener('click', () => {
      resetModal.style.display = 'none';
      loginForm.style.display = 'block';
      if (resetForm) resetForm.reset();
    });
  }

  if (resetForm) {
    resetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rUser = resetUsernameInput.value.trim().toLowerCase();
      const rPass = resetPasswordInput.value;

      let registry = JSON.parse(localStorage.getItem('bbb_users') || '{}');
      
      // Let any user reset their password, or define a new username
      const cleanPass = rPass.trim().toLowerCase();
      if (COMPROMISED_PASSWORDS.includes(cleanPass)) {
        alert("Operational Security: This password is too common. Please select a secure key.");
        return;
      }

      registry[rUser] = rPass;
      localStorage.setItem('bbb_users', JSON.stringify(registry));
      
      alert("Credentials Registered: Password updated for username '" + rUser + "'. Please log in.");
      resetModal.style.display = 'none';
      loginForm.style.display = 'block';
      resetForm.reset();
    });
  }

  // --- LOGIN SUBMIT ---
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = usernameInput.value.trim().toLowerCase();
      const password = passwordInput.value;

      let registry = JSON.parse(localStorage.getItem('bbb_users') || '{}');

      if (registry[username]) {
        if (registry[username] === password) {
          loginUser(username);
        } else {
          showError("Access Denied: Invalid credentials for established session.");
        }
      } else {
        // Automatically register new user if password is strong
        const cleanPass = password.trim().toLowerCase();
        if (COMPROMISED_PASSWORDS.includes(cleanPass)) {
          showError("Security Error: Weak password selected. Re-enter credentials.");
          return;
        }

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

  // --- DASHBOARD LOADER ---
  function showDashboard(username) {
    if (loginContainer && dashboardContainer) {
      loginContainer.style.display = 'none';
      dashboardContainer.style.display = 'block';
      
      const dispUser = document.getElementById('display-username');
      const dispRole = document.getElementById('display-role');
      if (dispUser) dispUser.textContent = username;
      if (dispRole) dispRole.textContent = "Corporate Treasury Lead";

      // Load balances
      let balances = JSON.parse(localStorage.getItem(`bbb_balances_${username}`));
      if (!balances) {
        balances = { checking: 4582912.44, savings: 12940230.12, escrow: 75000000.00 };
        localStorage.setItem(`bbb_balances_${username}`, JSON.stringify(balances));
      }
      updateBalanceUI(balances);

      // Load nicknames
      let nicknames = JSON.parse(localStorage.getItem(`bbb_nicknames_${username}`));
      if (!nicknames) {
        nicknames = { checking: "Commercial Checking", savings: "Corporate Yield Savings", escrow: "Fiduciary Escrow" };
        localStorage.setItem(`bbb_nicknames_${username}`, JSON.stringify(nicknames));
      }
      updateNicknamesUI(nicknames);

      // Load transactions
      let txns = JSON.parse(localStorage.getItem(`bbb_txns_${username}`));
      if (!txns || txns.length < 200) {
        txns = generate200Transactions(username);
        localStorage.setItem(`bbb_txns_${username}`, JSON.stringify(txns));
      }

      renderLedger(txns);
      drawBudgetChart(txns);
      setupTabSwitching();
      setupTransfersSubtabs();
      setupNicknamesPanel(username);
      setupPayrollRoster(username);
      setupSecureMessaging(username);
    }
  }

  function updateBalanceUI(balances) {
    if (balanceChecking) balanceChecking.textContent = `$${balances.checking.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (balanceSavings) balanceSavings.textContent = `$${balances.savings.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (balanceEscrow) balanceEscrow.textContent = `$${balances.escrow.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  }

  // --- NICKNAMES ---
  function updateNicknamesUI(nicknames) {
    if (labelChecking) labelChecking.textContent = nicknames.checking;
    if (labelSavings) labelSavings.textContent = nicknames.savings;
    if (labelEscrow) labelEscrow.textContent = nicknames.escrow;

    // Update select dropdown texts dynamically
    const updateOptions = (selectId, prefixText) => {
      const select = document.getElementById(selectId);
      if (select) {
        select.options[0].text = `${nicknames.checking} (Acct ••••-7291)`;
        select.options[1].text = `${nicknames.savings} (Acct ••••-3304)`;
      }
    };
    updateOptions('transfer-from');
    updateOptions('ach-from');
    updateOptions('billpay-from');
    updateOptions('deposit-to');
    updateOptions('estatement-acc');
  }

  function setupNicknamesPanel(username) {
    if (!customizeDashboardBtn) return;
    
    customizeDashboardBtn.addEventListener('click', () => {
      const nicknames = JSON.parse(localStorage.getItem(`bbb_nicknames_${username}`));
      nicknameCheckingInput.value = nicknames.checking;
      nicknameSavingsInput.value = nicknames.savings;
      nicknameEscrowInput.value = nicknames.escrow;
      nicknamePanel.style.display = nicknamePanel.style.display === 'none' ? 'block' : 'none';
    });

    nicknameCancelBtn.addEventListener('click', () => {
      nicknamePanel.style.display = 'none';
    });

    nicknameSaveBtn.addEventListener('click', () => {
      const nicknames = {
        checking: nicknameCheckingInput.value.trim() || "Commercial Checking",
        savings: nicknameSavingsInput.value.trim() || "Corporate Yield Savings",
        escrow: nicknameEscrowInput.value.trim() || "Fiduciary Escrow"
      };
      localStorage.setItem(`bbb_nicknames_${username}`, JSON.stringify(nicknames));
      updateNicknamesUI(nicknames);
      nicknamePanel.style.display = 'none';
      showBannerNotification("Account labels successfully updated.", "success");
    });
  }

  // --- TRANSACTION LEDGER & GENERATOR ---
  function generate200Transactions(username) {
    const txnList = [];
    const baseDate = new Date(2026, 5, 13, 10, 0, 0);

    for (let i = 0; i < 200; i++) {
      const seed = i + username.charCodeAt(0 % username.length);
      const entity = FICTIONAL_ENTITIES[seed % FICTIONAL_ENTITIES.length];
      const offsetMinutes = i * 420; // stagger spacing
      const txnDate = new Date(baseDate.getTime() - offsetMinutes * 60 * 1000);
      
      let amount = 0;
      if (entity.type === 'deposit') {
        amount = 12000 + ((seed * 739) % 180000) + 0.45;
      } else {
        amount = 80 + ((seed * 231) % 35000) + 0.99;
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

    const search = ledgerSearch ? ledgerSearch.value.trim().toLowerCase() : '';
    const filter = ledgerFilterType ? ledgerFilterType.value : 'all';

    const filtered = txns.filter(t => {
      const matchesSearch = t.desc.toLowerCase().includes(search) || t.entity.toLowerCase().includes(search) || t.category.toLowerCase().includes(search);
      const matchesType = filter === 'all' || t.type === filter;
      return matchesSearch && matchesType;
    });

    if (filtered.length === 0) {
      transactionBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 30px;">No matching transactions found.</td></tr>`;
      return;
    }

    filtered.forEach(t => {
      const tr = document.createElement('tr');
      const amtClass = t.type === 'deposit' ? 'amount-credit' : 'amount-debit';
      const amtSign = t.type === 'deposit' ? '+' : '-';

      tr.innerHTML = `
        <td class="txn-date">${t.displayDate}</td>
        <td>
          <div class="txn-desc">${t.desc}</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${t.entity}</div>
        </td>
        <td><span class="txn-category" style="background-color: ${CATEGORY_COLORS[t.category] || '#e2e8f0'}; color: #fff;">${t.category}</span></td>
        <td class="txn-amount ${amtClass}">${amtSign}$${t.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
      `;
      transactionBody.appendChild(tr);
    });
  }

  // --- FILTERS ---
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

  // --- DYNAMIC BUDGET CANVAS CHART ---
  function drawBudgetChart(txns) {
    const canvas = document.getElementById('budgetCanvas');
    const legendEl = document.getElementById('chart-legend');
    if (!canvas || !legendEl) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sum withdrawals by category
    const categoryTotals = {};
    let totalWithdrawals = 0;

    txns.forEach(t => {
      if (t.type === 'withdrawal') {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
        totalWithdrawals += t.amount;
      }
    });

    // Draw donut segments
    const categories = Object.keys(categoryTotals);
    let startAngle = -Math.PI / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = Math.min(centerX, centerY) - 10;
    const innerRadius = outerRadius - 25;

    legendEl.innerHTML = '';

    categories.forEach((cat, index) => {
      const value = categoryTotals[cat];
      const sliceAngle = (value / totalWithdrawals) * (2 * Math.PI);
      const color = CATEGORY_COLORS[cat] || '#94a3b8';

      // Draw segment
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Draw legend item
      const pct = ((value / totalWithdrawals) * 100).toFixed(1);
      const legendItem = document.createElement('div');
      legendItem.style.display = 'flex';
      legendItem.style.alignItems = 'center';
      legendItem.style.gap = '8px';
      legendItem.innerHTML = `
        <span style="width: 10px; height: 10px; background-color: ${color}; display: inline-block; border-radius: 2px;"></span>
        <strong>${cat}:</strong> ${pct}% ($${value.toLocaleString('en-US', { maximumFractionDigits: 0 })})
      `;
      legendEl.appendChild(legendItem);

      startAngle += sliceAngle;
    });

    // Draw center circle text
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.fillStyle = 'var(--text-dark)';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("OPERATIONS", centerX, centerY - 8);
    ctx.font = '9px monospace';
    ctx.fillText("LEDGER SUM", centerX, centerY + 8);
  }

  // --- TABS & NAVIGATION ---
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
            // If returning to dashboard, redraw canvas
            if (pane.id === 'tab-dashboard') {
              const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`)) || [];
              drawBudgetChart(txns);
            }
          } else {
            pane.style.display = 'none';
            pane.classList.remove('active');
          }
        });
      });
    });
  }

  // --- TRANSFERS SUBTABS (INTERNAL vs ACH) ---
  function setupTransfersSubtabs() {
    if (!btnSubtabInternal || !btnSubtabAch) return;

    btnSubtabInternal.addEventListener('click', () => {
      btnSubtabInternal.classList.add('active');
      btnSubtabAch.classList.remove('active');
      transferForm.style.display = 'block';
      achForm.style.display = 'none';
    });

    btnSubtabAch.addEventListener('click', () => {
      btnSubtabAch.classList.add('active');
      btnSubtabInternal.classList.remove('active');
      transferForm.style.display = 'none';
      achForm.style.display = 'block';
    });
  }

  // --- INTERNAL TRANSFERS SUBMIT ---
  if (transferForm) {
    transferForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fromAcc = document.getElementById('transfer-from').value;
      const toAcc = document.getElementById('transfer-to').value;
      const amount = parseFloat(document.getElementById('transfer-amount').value);

      if (!amount || amount <= 0) return;

      const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
      if (balances[fromAcc] < amount) {
        showBannerNotification("Overdraft Blocked: Insufficient ledger funds.", "error");
        return;
      }

      balances[fromAcc] -= amount;
      let desc = "";
      if (toAcc === 'checking-internal') {
        balances.checking += amount;
        desc = "Internal Transfer to Checking";
      } else if (toAcc === 'savings-internal') {
        balances.savings += amount;
        desc = "Internal Transfer to Savings";
      } else {
        showBannerNotification("Invalid internal routing setup.", "error");
        return;
      }

      localStorage.setItem(`bbb_balances_${currentUser}`, JSON.stringify(balances));
      updateBalanceUI(balances);

      const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`));
      const now = new Date();
      txns.unshift({
        id: `TXN-${Date.now().toString().slice(-7)}`,
        date: now.toISOString().slice(0, 19).replace('T', ' '),
        displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        desc: desc,
        entity: "Self-Adjustment",
        category: "Transfer",
        type: "withdrawal",
        amount: amount
      });
      localStorage.setItem(`bbb_txns_${currentUser}`, JSON.stringify(txns));
      
      transferForm.reset();
      showBannerNotification(`Internal Adjustment Approved: $${amount.toLocaleString()} processed.`, "success");
    });
  }

  // --- ACH EXTERNAL TRANSFER SUBMIT ---
  if (achForm) {
    achForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fromAcc = document.getElementById('ach-from').value;
      const routing = document.getElementById('ach-routing').value;
      const account = document.getElementById('ach-account').value;
      const name = document.getElementById('ach-name').value;
      const amount = parseFloat(document.getElementById('ach-amount').value);

      if (!amount || amount <= 0) return;

      const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
      if (balances[fromAcc] < amount) {
        showBannerNotification("ACH Blocked: Insufficient funds in source account.", "error");
        return;
      }

      balances[fromAcc] -= amount;
      localStorage.setItem(`bbb_balances_${currentUser}`, JSON.stringify(balances));
      updateBalanceUI(balances);

      const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`));
      const now = new Date();
      txns.unshift({
        id: `TXN-${Date.now().toString().slice(-7)}`,
        date: now.toISOString().slice(0, 19).replace('T', ' '),
        displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        desc: `Pending External ACH to Acct ••••${account.slice(-4)}`,
        entity: `${name} (Routing: ${routing})`,
        category: "Debt Service",
        type: "withdrawal",
        amount: amount
      });
      localStorage.setItem(`bbb_txns_${currentUser}`, JSON.stringify(txns));

      achForm.reset();
      showBannerNotification(`ACH Transfer Submitted: $${amount.toLocaleString()} routing to Federal Reserve Clearing.`, "success");
    });
  }

  // --- BILL PAY SUBMIT ---
  if (billpayForm) {
    billpayForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fromAcc = document.getElementById('billpay-from').value;
      const payeeVal = document.getElementById('billpay-payee').value;
      const amount = parseFloat(document.getElementById('billpay-amount').value);

      if (!amount || amount <= 0) return;

      const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
      if (balances[fromAcc] < amount) {
        showBannerNotification("Bill Pay Cancelled: Insufficient reserves.", "error");
        return;
      }

      const payeeDetails = {
        'ext-bbe': { name: "Big Beaver Energy Corp", category: "Marketing", desc: "Settlement: Workwear Invoice" },
        'ext-omega': { name: "Omega Mart Operations", category: "Inventory", desc: "Settlement: Supply Chain Invoice" },
        'ext-weyland': { name: "Weyland-Yutani Utilities", category: "Utilities", desc: "Payment: Relativistic Vessel Power" },
        'ext-vandelay': { name: "Vandelay Industries Desk", category: "Inventory", desc: "Payment: Latex Import Shipment" },
        'ext-dharma': { name: "Dharma Initiative Fiduciary", category: "Operations", desc: "Disbursement: Station Power Maintenance" },
        'ext-initech': { name: "Initech", category: "Audit", desc: "Payment: QA Consulting Invoice" },
        'ext-globex': { name: "Globex Grid Operations", category: "Utilities", desc: "Settlement: Geothermal Tap Line" }
      };

      const selectedPayee = payeeDetails[payeeVal];
      balances[fromAcc] -= amount;
      localStorage.setItem(`bbb_balances_${currentUser}`, JSON.stringify(balances));
      updateBalanceUI(balances);

      const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`));
      const now = new Date();
      txns.unshift({
        id: `TXN-${Date.now().toString().slice(-7)}`,
        date: now.toISOString().slice(0, 19).replace('T', ' '),
        displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        desc: selectedPayee.desc,
        entity: selectedPayee.name,
        category: selectedPayee.category,
        type: "withdrawal",
        amount: amount
      });
      localStorage.setItem(`bbb_txns_${currentUser}`, JSON.stringify(txns));

      billpayForm.reset();
      showBannerNotification(`Bill Pay Completed: $${amount.toLocaleString()} paid to ${selectedPayee.name}.`, "success");
    });
  }

  // --- STOP PAYMENT SUBMIT (TRADITIONAL FEATURE) ---
  if (stoppaymentForm) {
    stoppaymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const num = document.getElementById('stop-check-num').value;
      const amount = parseFloat(document.getElementById('stop-check-amount').value);
      const payee = document.getElementById('stop-check-payee').value;

      const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
      if (balances.checking < 25) {
        showBannerNotification("Request Rejected: Insufficient checking funds for stop fee ($25.00).", "error");
        return;
      }

      balances.checking -= 25; // standard $25 stop fee
      localStorage.setItem(`bbb_balances_${currentUser}`, JSON.stringify(balances));
      updateBalanceUI(balances);

      const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`));
      const now = new Date();
      txns.unshift({
        id: `TXN-${Date.now().toString().slice(-7)}`,
        date: now.toISOString().slice(0, 19).replace('T', ' '),
        displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        desc: `Stop Payment Fee: Check #${num}`,
        entity: `Payee: ${payee} (Draft Val: $${amount.toLocaleString()})`,
        category: "Audit",
        type: "withdrawal",
        amount: 25.00
      });
      localStorage.setItem(`bbb_txns_${currentUser}`, JSON.stringify(txns));

      stoppaymentForm.reset();
      showBannerNotification(`Stop Payment Order Lodged: Check #${num} has been suspended. Fee charged: $25.00.`, "success");
    });
  }

  // --- MOBILE CHECK DEPOSIT OVERHAUL (PHASE 90) ---
  let activeCheckSource = null; // 'file', 'webcam', 'sample'
  let activeCheckAmount = 0;
  let videoStream = null;

  const btnMethodFile = document.getElementById('btn-method-file');
  const btnMethodWebcam = document.getElementById('btn-method-webcam');
  const btnMethodSample = document.getElementById('btn-method-sample');
  const webcamViewport = document.getElementById('webcam-viewport');
  const webcamStream = document.getElementById('webcam-stream');
  const btnCaptureSnap = document.getElementById('btn-capture-snap');
  const btnCaptureClose = document.getElementById('btn-capture-close');
  const sampleSelectorArea = document.getElementById('sample-selector-area');
  const sampleCheckTemplate = document.getElementById('sample-check-template');
  const checkDisplayContainer = document.getElementById('check-display-container');
  const checkPreviewImg = document.getElementById('check-preview-img');
  const checkCanvas = document.getElementById('check-canvas');
  const ocrLoadingOverlay = document.getElementById('ocr-loading-overlay');
  const ocrStatusText = document.getElementById('ocr-status-text');
  const ocrConsole = document.getElementById('ocr-console');
  const depositAmountInput = document.getElementById('deposit-amount');

  // Helper: Number to Words for Check drawing
  function numberToWords(amount) {
    const main = Math.floor(amount);
    const cents = Math.round((amount - main) * 100);
    const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    
    function convertUnderThousand(num) {
      if (num < 20) return units[num];
      const digit = num % 10;
      const tenIdx = Math.floor(num / 10);
      return tens[tenIdx] + (digit ? " " + units[digit] : "");
    }
    
    let words = "";
    if (main >= 100000) {
      const thousands = Math.floor(main / 1000);
      const remainder = main % 1000;
      const hundreds = Math.floor(thousands / 100);
      const tensUnits = thousands % 100;
      words += units[hundreds] + " Hundred " + convertUnderThousand(tensUnits) + " Thousand ";
      words += convertUnderThousand(remainder);
    } else if (main >= 1000) {
      const thousands = Math.floor(main / 1000);
      const remainder = main % 1000;
      words += convertUnderThousand(thousands) + " Thousand " + convertUnderThousand(remainder);
    } else {
      words += convertUnderThousand(main);
    }
    return words.trim() + ` and ${cents}/100`;
  }

  // Draw Sample Check Canvas
  function drawSampleCheck(template) {
    if (!checkCanvas) return;
    const ctx = checkCanvas.getContext('2d');
    
    // Reset canvas dimensions
    checkCanvas.width = 600;
    checkCanvas.height = 260;
    
    // Background (Soft green/gold safety paper texture mock)
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(0, 0, checkCanvas.width, checkCanvas.height);
    
    ctx.fillStyle = "#e2e8f0";
    for(let i=0; i<checkCanvas.width; i+=20) {
      ctx.fillRect(i, 0, 10, checkCanvas.height);
    }
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillRect(0, 0, checkCanvas.width, checkCanvas.height);

    // Border
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(8, 8, checkCanvas.width - 16, checkCanvas.height - 16);
    
    let coName = "";
    let coAddress = "";
    let amount = 0;
    let memoText = "";
    let sigText = "";
    
    if (template === 'initech') {
      coName = "INITECH CORPORATION";
      coAddress = "4120 Freemont Ave, Austin, TX 78759";
      amount = 2450.00;
      memoText = "Direct Deposit Payroll / TPS Compliance Audit";
      sigText = "Bill Lumbergh";
    } else if (template === 'omegamart') {
      coName = "OMEGA MART INC";
      coAddress = "999 Anomalous Way, Las Vegas, NV 89109";
      amount = 18500.00;
      memoText = "Glitch Lemon Sourcing Settlement";
      sigText = "The Whole Lemon Desk";
    } else if (template === 'weyland') {
      coName = "WEYLAND-YUTANI CORPORATION";
      coAddress = "Off-World Logistics Command, Gateway Station";
      amount = 125000.00;
      memoText = "Relativistic Cargo Freight Lease WY-882-B";
      sigText = "J. Weyland";
    } else if (template === 'dharma') {
      coName = "THE DHARMA INITIATIVE";
      coAddress = "Swan Station Research Grid, Sector 4-8";
      amount = 482000.00;
      memoText = "Geothermal Reactor Shield Sub-Allocation";
      sigText = "Alvar Hanso";
    }

    // Header text
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 13px monospace";
    ctx.fillText(coName, 24, 34);
    ctx.font = "9px monospace";
    ctx.fillText(coAddress, 24, 46);

    // Check number
    const checkNum = "22045";
    ctx.font = "bold 13px monospace";
    ctx.fillText(checkNum, checkCanvas.width - 60, 34);

    // Date
    ctx.font = "11px monospace";
    ctx.fillText("Date: " + new Date().toLocaleDateString(), checkCanvas.width - 170, 60);

    // Payee
    ctx.font = "12px monospace";
    ctx.fillText("PAY TO THE ORDER OF: " + currentUser.toUpperCase(), 24, 94);
    ctx.beginPath();
    ctx.moveTo(174, 98);
    ctx.lineTo(checkCanvas.width - 150, 98);
    ctx.strokeStyle = "#94a3b8";
    ctx.stroke();

    // Amount box
    ctx.strokeRect(checkCanvas.width - 134, 78, 110, 22);
    ctx.font = "bold 13px monospace";
    ctx.fillText("$" + amount.toLocaleString('en-US', { minimumFractionDigits: 2 }), checkCanvas.width - 124, 93);

    // Words
    ctx.font = "10px monospace";
    ctx.fillText("Amount: " + numberToWords(amount) + " Dollars", 24, 128);
    ctx.beginPath();
    ctx.moveTo(74, 132);
    ctx.lineTo(checkCanvas.width - 24, 132);
    ctx.stroke();

    // Bank
    ctx.font = "bold 11px monospace";
    ctx.fillText("BIG BEAVER BANK", 24, 168);
    ctx.font = "italic 8px monospace";
    ctx.fillText("Staging Clearing Depot", 24, 178);

    // Memo
    ctx.font = "10px monospace";
    ctx.fillText("MEMO: " + memoText, 24, 210);
    ctx.beginPath();
    ctx.moveTo(64, 214);
    ctx.lineTo(240, 214);
    ctx.stroke();

    // Signature
    ctx.font = "italic 16px Brush Script MT, cursive, sans-serif";
    ctx.fillText(sigText, checkCanvas.width - 180, 204);
    ctx.beginPath();
    ctx.moveTo(checkCanvas.width - 194, 214);
    ctx.lineTo(checkCanvas.width - 24, 214);
    ctx.stroke();

    // MICR (routing transit 987654321 is invalid)
    ctx.font = "bold 14px monospace";
    ctx.fillText(`⑆987654321⑆  ⑈000109923⑈  ${checkNum}`, 100, 242);
  }

  // Method selector buttons click handlers
  if (btnMethodFile) {
    btnMethodFile.addEventListener('click', () => {
      activeCheckSource = 'file';
      btnMethodFile.style.backgroundColor = 'var(--primary-color)';
      btnMethodFile.style.color = '#fff';
      btnMethodFile.style.borderColor = 'var(--primary-color)';
      
      btnMethodWebcam.style.backgroundColor = '';
      btnMethodWebcam.style.color = '';
      btnMethodWebcam.style.borderColor = '';
      btnMethodSample.style.backgroundColor = '';
      btnMethodSample.style.color = '';
      btnMethodSample.style.borderColor = '';

      sampleSelectorArea.style.display = 'none';
      stopWebcam();
      checkFileInput.click();
    });
  }

  if (btnMethodWebcam) {
    btnMethodWebcam.addEventListener('click', () => {
      activeCheckSource = 'webcam';
      btnMethodWebcam.style.backgroundColor = 'var(--primary-color)';
      btnMethodWebcam.style.color = '#fff';
      btnMethodWebcam.style.borderColor = 'var(--primary-color)';
      
      btnMethodFile.style.backgroundColor = '';
      btnMethodFile.style.color = '';
      btnMethodFile.style.borderColor = '';
      btnMethodSample.style.backgroundColor = '';
      btnMethodSample.style.color = '';
      btnMethodSample.style.borderColor = '';

      sampleSelectorArea.style.display = 'none';
      startWebcam();
    });
  }

  if (btnMethodSample) {
    btnMethodSample.addEventListener('click', () => {
      activeCheckSource = 'sample';
      btnMethodSample.style.backgroundColor = 'var(--primary-color)';
      btnMethodSample.style.color = '#fff';
      btnMethodSample.style.borderColor = 'var(--primary-color)';
      
      btnMethodFile.style.backgroundColor = '';
      btnMethodFile.style.color = '';
      btnMethodFile.style.borderColor = '';
      btnMethodWebcam.style.backgroundColor = '';
      btnMethodWebcam.style.color = '';
      btnMethodWebcam.style.borderColor = '';

      stopWebcam();
      sampleSelectorArea.style.display = 'block';
      checkDisplayContainer.style.display = 'block';
      checkPreviewImg.style.display = 'none';
      checkCanvas.style.display = 'block';

      // Load initial selected template check
      const t = sampleCheckTemplate.value;
      drawSampleCheck(t);
      runMockOcrScan(t);
    });
  }

  if (sampleCheckTemplate) {
    sampleCheckTemplate.addEventListener('change', () => {
      if (activeCheckSource === 'sample') {
        const t = sampleCheckTemplate.value;
        drawSampleCheck(t);
        runMockOcrScan(t);
      }
    });
  }

  // Handle file select
  if (checkFileInput) {
    checkFileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        checkDisplayContainer.style.display = 'block';
        checkCanvas.style.display = 'none';
        checkPreviewImg.style.display = 'block';
        checkPreviewImg.src = URL.createObjectURL(file);
        
        runMockOcrScan('upload', file.name);
      }
    });
  }

  // Webcam stream handlers
  function startWebcam() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
          videoStream = stream;
          webcamStream.srcObject = stream;
          webcamViewport.style.display = 'block';
          checkDisplayContainer.style.display = 'none';
          ocrConsole.style.display = 'none';
        })
        .catch(err => {
          alert("Webcam Access Denied: Please upload an image file instead.");
          console.error(err);
        });
    } else {
      alert("Webcam API not supported in this browser. Please upload an image file instead.");
    }
  }

  function stopWebcam() {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      videoStream = null;
    }
    webcamViewport.style.display = 'none';
  }

  if (btnCaptureClose) {
    btnCaptureClose.addEventListener('click', stopWebcam);
  }

  if (btnCaptureSnap) {
    btnCaptureSnap.addEventListener('click', () => {
      if (!videoStream) return;
      
      checkDisplayContainer.style.display = 'block';
      checkPreviewImg.style.display = 'none';
      checkCanvas.style.display = 'block';
      
      checkCanvas.width = 600;
      checkCanvas.height = 337;
      const ctx = checkCanvas.getContext('2d');
      ctx.drawImage(webcamStream, 0, 0, checkCanvas.width, checkCanvas.height);
      
      stopWebcam();
      runMockOcrScan('webcam');
    });
  }

  // Mock OCR Scan Flow
  function runMockOcrScan(mode, extraInfo = '') {
    ocrLoadingOverlay.style.display = 'flex';
    ocrConsole.style.display = 'none';
    ocrStatusText.textContent = "Locating document boundaries...";

    setTimeout(() => {
      ocrStatusText.textContent = "Reading MICR transit codeline...";
    }, 1000);

    setTimeout(() => {
      ocrStatusText.textContent = "Verifying signature & payee lines...";
    }, 2000);

    setTimeout(() => {
      ocrLoadingOverlay.style.display = 'none';
      
      let amount = 0;
      let routing = "";
      let account = "";
      let payeeName = currentUser.toUpperCase();
      let company = "";

      if (mode === 'initech') {
        company = "INITECH CORP";
        amount = 2450.00;
        routing = "987654321";
        account = "000109923";
      } else if (mode === 'omegamart') {
        company = "OMEGA MART INC";
        amount = 18500.00;
        routing = "987654321";
        account = "000109923";
      } else if (mode === 'weyland') {
        company = "WEYLAND-YUTANI CORP";
        amount = 125000.00;
        routing = "987654321";
        account = "000109923";
      } else if (mode === 'dharma') {
        company = "THE DHARMA INITIATIVE";
        amount = 482000.00;
        routing = "987654321";
        account = "000109923";
      } else if (mode === 'webcam') {
        company = "CAMERA_CAPTURE_DRAFT";
        amount = 1250.00;
        routing = "987654321";
        account = "88392019";
      } else {
        // file upload
        company = extraInfo.toUpperCase().substring(0, 20) || "UPLOADED_IMAGE";
        amount = 1500.00;
        routing = "987654321";
        account = "99042941";
      }

      activeCheckAmount = amount;
      depositAmountInput.value = amount;

      // Print OCR logs (invalid routing checksum is explicitly called out)
      ocrConsole.innerHTML = `[BBB OCR SCAN CONSOLE INITIALIZED]
--------------------------------------------------
DOCUMENT FRAME STATUS   : BOUNDARIES VALIDATED (100% CONFIDENCE)
DOCUMENT EXPOSURE VALUE : OPTIMAL (AGC CALIBRATED)
READING codeline...
MICR STRIP DETECTED     : ⑆${routing}⑆ ⑈${account}⑈ 22045
ROUTE TRANSIT ANALYSIS  : CODE [${routing}] EXTRACTED
ACCOUNT CODE ANALYSIS   : CODE [${account}] EXTRACTED
TRANSACTION AMOUNT      : $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
PAYEE RECOGNITION       : DETECTED [${payeeName}] (MATCHES CURRENT ACTIVE PROFILE)
SIGNATURE ANALYSIS      : ENDORSEMENT DETECTED (VALID SIGN-OFF)

[ROUTING NUMBER AUDIT NOTICE]:
RoutingTransitNumber ${routing} is identified as: BIG BEAVER BANK clearance root.
*WARNING: Standard MOD 10 checksum fails. Clearing via Satirical Exception Clearing Desk (Section 12-B).*
--------------------------------------------------
STATUS: SUCCESS. Amount field auto-filled. Verify draft and click submit.`;
      
      ocrConsole.style.display = 'block';
    }, 3000);
  }

  // Handle form submission
  if (depositForm) {
    depositForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const depAcc = document.getElementById('deposit-to').value;
      const amount = parseFloat(depositAmountInput.value);

      if (!amount || amount <= 0) return;
      if (!activeCheckSource) {
        showBannerNotification("Compliance Alert: Image capture or sample check selection is required.", "error");
        return;
      }

      if (activeCheckSource === 'sample' && Math.abs(amount - activeCheckAmount) > 0.01) {
        showBannerNotification("Scan Warning: Submitted amount does not match OCR scanned amount of $" + activeCheckAmount.toLocaleString(), "error");
        return;
      }

      const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
      balances[depAcc] += amount;
      localStorage.setItem(`bbb_balances_${currentUser}`, JSON.stringify(balances));
      updateBalanceUI(balances);

      const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`));
      const now = new Date();
      txns.unshift({
        id: `TXN-${Date.now().toString().slice(-7)}`,
        date: now.toISOString().slice(0, 19).replace('T', ' '),
        displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        desc: "Mobile Check Deposit Clear",
        entity: "BBB Draft Endorsement Clearing",
        category: "Inventory",
        type: "deposit",
        amount: amount
      });
      localStorage.setItem(`bbb_txns_${currentUser}`, JSON.stringify(txns));

      // Reset
      depositForm.reset();
      stopWebcam();
      checkDisplayContainer.style.display = 'none';
      ocrConsole.style.display = 'none';
      activeCheckSource = null;

      showBannerNotification(`Mobile Deposit Verified: $${amount.toLocaleString()} credited to reserves. Clearing route: exception bypass.`, "success");
    });
  }

  // --- BUSINESS DIRECT DEPOSIT / NACHA GENERATOR ---

  function setupPayrollRoster(username) {
    if (!payrollRosterBody) return;

    let roster = JSON.parse(localStorage.getItem(`bbb_roster_${username}`));
    if (!roster) {
      roster = [...defaultRoster];
      localStorage.setItem(`bbb_roster_${username}`, JSON.stringify(roster));
    }

    renderRosterUI(roster);

    // Add employee handler
    addEmployeeBtn.onclick = () => {
      const name = payrollNameInput.value.trim();
      const acc = payrollAccInput.value.trim();
      const amt = parseFloat(payrollAmtInput.value);

      if (!name || !acc || !amt || amt <= 0) {
        alert("Please provide valid employee details.");
        return;
      }

      roster.push({ name: name, routing: "987654321", account: acc, salary: amt });
      localStorage.setItem(`bbb_roster_${username}`, JSON.stringify(roster));
      renderRosterUI(roster);

      payrollNameInput.value = '';
      payrollAccInput.value = '';
      payrollAmtInput.value = '';
    };

    // Compile NACHA file
    btnGenerateNacha.onclick = () => {
      const coName = document.getElementById('nacha-co-name').value.padEnd(16, ' ').slice(0, 16);
      const coId = document.getElementById('nacha-co-id').value.padStart(10, '0').slice(0, 10);
      const sec = document.getElementById('nacha-sec').value;
      const dfi = document.getElementById('nacha-dfi').value.padStart(8, '0').slice(0, 8);

      const nachaText = compileNACHAFile(username, roster, coName, coId, sec, dfi);
      nachaContentTextarea.value = nachaText;
      nachaOutputSection.style.display = 'block';

      // Setup download button
      const blob = new Blob([nachaText], { type: 'text/plain' });
      btnDownloadNacha.onclick = () => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${coName.trim()}_PAYROLL_${Date.now().toString().slice(-4)}.ach`;
        a.click();
        URL.revokeObjectURL(url);
      };

      // Submit batch to bank
      btnSubmitAchBank.onclick = () => {
        let total = 0;
        roster.forEach(r => total += r.salary);

        const balances = JSON.parse(localStorage.getItem(`bbb_balances_${username}`));
        if (balances.checking < total) {
          showBannerNotification("Batch Submission Blocked: Insufficient funds for payroll.", "error");
          return;
        }

        balances.checking -= total;
        localStorage.setItem(`bbb_balances_${username}`, JSON.stringify(balances));
        updateBalanceUI(balances);

        const txns = JSON.parse(localStorage.getItem(`bbb_txns_${username}`));
        const now = new Date();
        txns.unshift({
          id: `TXN-${Date.now().toString().slice(-7)}`,
          date: now.toISOString().slice(0, 19).replace('T', ' '),
          displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          desc: `Direct Deposit Payroll Batch: ${roster.length} Accounts`,
          entity: `${coName.trim()} ACH Treasury`,
          category: "Operations",
          type: "withdrawal",
          amount: total
        });
        localStorage.setItem(`bbb_txns_${username}`, JSON.stringify(txns));
        renderLedger(txns);

        nachaOutputSection.style.display = 'none';
        showBannerNotification(`ACH Direct Deposit Transmitted: $${total.toLocaleString()} batch cleared.`, "success");
      };
    };
  }

  function renderRosterUI(roster) {
    payrollRosterBody.innerHTML = '';
    roster.forEach((emp, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="padding: 6px 0;">${emp.name}</td>
        <td style="font-family: monospace;">••••${emp.account.slice(-4)}</td>
        <td style="text-align: right;">$${emp.salary.toLocaleString()}</td>
      `;
      payrollRosterBody.appendChild(tr);
    });
  }

  // Generate compliant 94-character fixed-width NACHA formatted text
  function compileNACHAFile(username, roster, coName, coId, sec, dfi) {
    const pad = (str, len, char = ' ', right = true) => {
      const s = String(str);
      return right ? s.padEnd(len, char).slice(0, len) : s.padStart(len, char).slice(0, len);
    };

    let file = "";
    const today = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const time = new Date().toTimeString().slice(0, 5).replace(/:/g, '');

    // 1. File Header Record (1)
    file += `101 987654321${pad(coId, 10, '0')}${today}${time}A094101Big Beaver Bank     ${pad(coName, 18)}\r\n`;

    // 2. Batch Header Record (5)
    file += `5220${pad(coName, 16)}${pad("", 20)}${coId}${sec}Payroll   ${today}${today}   1${dfi}0000001\r\n`;

    let totalAmount = 0;
    let entryCount = 0;
    let entryHash = 0;

    // 3. Entry Detail Records (6)
    roster.forEach((emp, index) => {
      const salaryCents = Math.round(emp.salary * 100);
      totalAmount += salaryCents;
      entryCount++;
      
      const rRouting = pad(emp.routing, 9, '0');
      entryHash += parseInt(rRouting.slice(0, 8));

      // 22 = checking deposit, 32 = savings deposit
      const txCode = "22"; 
      file += `6${txCode}${rRouting.slice(0, 8)}${rRouting.slice(-1)}${pad(emp.account, 17)}${pad(salaryCents, 10, '0', false)}${pad(`EMP-${index}`, 15)}${pad(emp.name, 22)}0${dfi}${pad(index + 1, 7, '0', false)}\r\n`;
    });

    // 4. Batch Control Record (8)
    const hashStr = pad(entryHash.toString().slice(-10), 10, '0', false);
    file += `8220${pad(entryCount, 6, '0', false)}${hashStr}${pad("", 12, '0')}${pad(totalAmount, 12, '0', false)}${coId}${pad("", 25)}${dfi}0000001\r\n`;

    // 5. File Control Record (9)
    file += `9000001000001${pad(entryCount, 8, '0', false)}${hashStr}${pad("", 12, '0')}${pad(totalAmount, 12, '0', false)}${pad("", 39)}\r\n`;

    return file;
  }

  // --- ESTATEMENTS PDF GENERATOR POPUP ---
  if (btnGenerateStatement) {
    btnGenerateStatement.onclick = () => {
      const acc = document.getElementById('estatement-acc').value;
      const month = document.getElementById('estatement-month').value;
      const nicknames = JSON.parse(localStorage.getItem(`bbb_nicknames_${currentUser}`));

      const accLabel = nicknames[acc];
      const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
      const balance = balances[acc];

      const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`)) || [];
      
      // Filter transactions for this month/period representation
      const openingBalance = balance + 150000; // Mock opening balance
      
      let statementsHtml = `
        <div style="text-align: center; border-bottom: 2px solid var(--primary-color); padding-bottom: 20px; margin-bottom: 30px;">
          <h2 style="color: var(--primary-color); font-size: 24px; margin: 0 0 4px;">BIG BEAVER BANK</h2>
          <div style="font-size: 10px; color: var(--text-muted);">CORPORATE HEADQUARTERS: SHANGRI-LA ISLAND, LAKE MICHIGAN</div>
          <div style="font-size: 12px; font-weight: bold; margin-top: 10px; text-transform: uppercase;">Official Financial Statement</div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 30px; line-height: 1.5;">
          <div>
            <strong>STATEMENT FOR:</strong><br>
            Username: ${currentUser.toUpperCase()}<br>
            Account Holder Registry ID: BBB-992104-A
          </div>
          <div style="text-align: right;">
            <strong>STATEMENT PERIOD:</strong> ${month.toUpperCase()}<br>
            <strong>DATE COMPILED:</strong> ${new Date().toLocaleDateString()}<br>
            <strong>ROUTING NO:</strong> 987654321
          </div>
        </div>

        <div style="background-color: var(--bg-light); padding: 15px; border-radius: 4px; margin-bottom: 30px; display: flex; justify-content: space-between;">
          <div><strong>ACCOUNT LABEL:</strong> ${accLabel.toUpperCase()}</div>
          <div><strong>ENDING LEDGER BALANCE:</strong> $${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        </div>

        <h4 style="border-bottom: 1px solid var(--border-color); padding-bottom: 6px; margin-bottom: 16px;">LEDGER HISTORY LOG</h4>
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 11px;">
          <thead>
            <tr style="border-bottom: 1px solid var(--text-dark);">
              <th style="padding: 6px 0;">Date</th>
              <th>Description / Entity</th>
              <th>Category</th>
              <th style="text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
      `;

      // Select top 12 transactions to display as the statement ledger
      txns.slice(0, 12).forEach(t => {
        const sign = t.type === 'deposit' ? '+' : '-';
        statementsHtml += `
          <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 8px 0; color: var(--text-muted);">${t.displayDate}</td>
            <td>
              <strong>${t.desc}</strong><br>
              <span style="font-size: 9px; color: var(--text-muted);">${t.entity}</span>
            </td>
            <td>${t.category}</td>
            <td style="text-align: right; font-weight: bold;">${sign}$${t.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
          </tr>
        `;
      });

      statementsHtml += `
          </tbody>
        </table>
        
        <div style="margin-top: 40px; border-top: 1px solid var(--border-color); padding-top: 20px; font-size: 10px; color: var(--text-muted); text-align: center; line-height: 1.4;">
          Big Beaver Bank is a registered fictional entity under creative sandbox guidelines. Disclosures conform to the CRA public record. In case of anomalies, submit support ticket under "Messages".
        </div>
      `;

      statementPrintArea.innerHTML = statementsHtml;
      statementModal.style.display = 'flex';
    };
  }

  if (closeStatementBtn) {
    closeStatementBtn.onclick = () => {
      statementModal.style.display = 'none';
    };
  }

  // --- SECURE MESSAGING DESK (TICKETING INBOX) ---

  function setupSecureMessaging(username) {
    if (!ticketThreads) return;

    let tickets = JSON.parse(localStorage.getItem(`bbb_tickets_${username}`));
    if (!tickets) {
      tickets = [...defaultTickets];
      localStorage.setItem(`bbb_tickets_${username}`, JSON.stringify(tickets));
    }

    let activeIndex = 0;
    renderTicketsUI(tickets, activeIndex);
    renderChatBox(tickets[activeIndex]);

    // Handle new message
    chatInputForm.onsubmit = (e) => {
      e.preventDefault();
      const msgText = chatUserMessage.value.trim();
      if (!msgText) return;

      // Add User Message
      tickets[activeIndex].messages.push({ sender: "User", text: msgText });
      localStorage.setItem(`bbb_tickets_${username}`, JSON.stringify(tickets));
      renderChatBox(tickets[activeIndex]);
      chatUserMessage.value = '';

      // Simulate Delayed Bank Reply
      setTimeout(() => {
        let reply = "Your message has been logged under record registry and is undergoing compliance review.";
        if (msgText.toLowerCase().includes("wire") || msgText.toLowerCase().includes("fraud")) {
          reply = "Operational Alert: The Fraud Desk has reviewed your query. MFA tokens are active and monitoring security lines.";
        } else if (msgText.toLowerCase().includes("nacha") || msgText.toLowerCase().includes("payroll")) {
          reply = "Treasury Operations: Direct deposit batch files conform to NACHA guidelines. Batch settlement will complete on schedule.";
        }
        tickets[activeIndex].messages.push({ sender: "Staff", text: reply });
        localStorage.setItem(`bbb_tickets_${username}`, JSON.stringify(tickets));
        renderChatBox(tickets[activeIndex]);
      }, 1500);
    };

    function renderTicketsUI(tkts, activeIdx) {
      ticketThreads.innerHTML = '';
      tkts.forEach((tkt, idx) => {
        const btn = document.createElement('button');
        btn.className = `demo-ctrl-btn ${idx === activeIdx ? 'active' : ''}`;
        btn.style.width = '100%';
        btn.style.padding = '10px';
        btn.style.marginBottom = '8px';
        btn.innerHTML = `
          <div style="font-weight: bold; font-size: 13px;">${tkt.subject}</div>
          <div style="font-size: 10px; color: var(--accent-color);">${tkt.dept} Desk • ${tkt.id}</div>
        `;
        btn.onclick = () => {
          activeIndex = idx;
          renderTicketsUI(tkts, activeIdx = idx);
          renderChatBox(tkts[idx]);
        };
        ticketThreads.appendChild(btn);
      });
    }

    function renderChatBox(tkt) {
      chatMessagesBox.innerHTML = '';
      tkt.messages.forEach(msg => {
        const div = document.createElement('div');
        div.style.padding = '8px 12px';
        div.style.borderRadius = '4px';
        div.style.maxWidth = '85%';
        div.style.fontSize = '12px';
        div.style.lineHeight = '1.4';

        if (msg.sender === 'User') {
          div.style.alignSelf = 'flex-end';
          div.style.backgroundColor = 'var(--primary-color)';
          div.style.color = '#fff';
          div.style.borderLeft = '3px solid var(--accent-color)';
        } else if (msg.sender === 'Staff') {
          div.style.alignSelf = 'flex-start';
          div.style.backgroundColor = '#fff';
          div.style.color = 'var(--text-dark)';
          div.style.border = '1px solid var(--border-color)';
        } else {
          // System message
          div.style.alignSelf = 'center';
          div.style.backgroundColor = '#e2e8f0';
          div.style.color = 'var(--text-muted)';
          div.style.fontSize = '10px';
        }

        div.textContent = `${msg.sender === 'Staff' ? 'BBB Support' : msg.sender}: ${msg.text}`;
        chatMessagesBox.appendChild(div);
      });
      chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
    }
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
