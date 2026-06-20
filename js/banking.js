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
  { name: "Dwight Schrute", routing: "987654321", account: "948201", salary: 4500.00 },
  { name: "Jim Halpert", routing: "987654321", account: "928401", salary: 4200.00 },
  { name: "Pam Beesly", routing: "987654321", account: "882019", salary: 3800.00 }
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
  // camera-trigger removed — capture handled by method buttons
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
      setupApprovalsCenter(username);
      setupPositivePay(username);
      setupReceivables(username);
      setupCorporateCards(username);
      setupLiquidity(username);
      setupComplianceAndLocalization(username);
      setupSupportAndScheduler(username);
      setupStatementDownloads(username);
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
    const updateOptions = (selectId) => {
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
      const seed = i + username.charCodeAt(i % username.length);
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

  function saveAndRefreshTransactions(txns) {
    localStorage.setItem(`bbb_txns_${currentUser}`, JSON.stringify(txns));
    renderLedger(txns);
    drawBudgetChart(txns);
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

    ctx.fillStyle = '#1f2723';
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
  let activeCheckNum = '22045';
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
      let checkNum = '22045';
      if (mode === 'initech') {
        company = "INITECH CORP";
        amount = 2450.00;
        routing = "987654321";
        account = "000109923";
        checkNum = '109923';
      } else if (mode === 'omegamart') {
        company = "OMEGA MART INC";
        amount = 18500.00;
        routing = "987654321";
        account = "000109923";
        checkNum = '109924';
      } else if (mode === 'weyland') {
        company = "WEYLAND-YUTANI CORP";
        amount = 125000.00;
        routing = "987654321";
        account = "000109923";
        checkNum = '109925';
      } else if (mode === 'dharma') {
        company = "THE DHARMA INITIATIVE";
        amount = 482000.00;
        routing = "987654321";
        account = "000109923";
        checkNum = '109926';
      } else if (mode === 'webcam') {
        company = "CAMERA_CAPTURE_DRAFT";
        amount = 1250.00;
        routing = "987654321";
        account = "88392019";
        checkNum = '22045';
      } else {
        // file upload
        company = extraInfo.toUpperCase().substring(0, 20) || "UPLOADED_IMAGE";
        amount = 1500.00;
        routing = "987654321";
        account = "99042941";
        checkNum = '33012';
      }

      activeCheckAmount = amount;
      activeCheckNum = checkNum;
      depositAmountInput.value = amount;

      // Print OCR logs (invalid routing checksum is explicitly called out)
      ocrConsole.innerHTML = `[BBB OCR SCAN CONSOLE INITIALIZED]
--------------------------------------------------
DOCUMENT FRAME STATUS   : BOUNDARIES VALIDATED (100% CONFIDENCE)
DOCUMENT EXPOSURE VALUE : OPTIMAL (AGC CALIBRATED)
READING codeline...
MICR STRIP DETECTED     : ⑆${routing}⑆ ⑈${account}⑈ ${checkNum}
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

      // Positive Pay intercept logic
      const isReverse = document.getElementById('toggle-pospay-reverse') ? document.getElementById('toggle-pospay-reverse').checked : false;
      const isPospayActive = document.getElementById('toggle-pospay-active') ? document.getElementById('toggle-pospay-active').checked : false;
      
      if (isPospayActive) {
        let registry = JSON.parse(localStorage.getItem('bbb_pospay_registry') || '[]');
        const match = registry.find(r => r.checkNum === activeCheckNum);
        
        let shouldExcept = false;
        let details = '';
        
        if (isReverse) {
          shouldExcept = true;
          details = `Reverse Positive Pay: Checked by default for manual review`;
        } else if (!match) {
          shouldExcept = true;
          details = `No matching check issue record found for Check #${activeCheckNum}`;
        } else if (Math.abs(match.amount - amount) > 0.01) {
          shouldExcept = true;
          details = `Amount discrepancy (Scanned: $${amount.toFixed(2)} vs Registered: $${match.amount.toFixed(2)})`;
        }
        
        if (shouldExcept) {
          let exceptions = JSON.parse(localStorage.getItem('bbb_exceptions') || '[]');
          if (!exceptions.some(e => e.checkNum === activeCheckNum && e.status === 'Pending Decision')) {
            exceptions.push({
              checkNum: activeCheckNum,
              payee: currentUser.toUpperCase(),
              details: details,
              amount: amount,
              status: 'Pending Decision'
            });
            localStorage.setItem('bbb_exceptions', JSON.stringify(exceptions));
          }
          
          if (typeof renderApprovalsUI === 'function') renderApprovalsUI();
          
          showBannerNotification(`Positive Pay Exception: Check #${activeCheckNum} routed to Approvals Exception queue.`, "error");
          
          depositForm.reset();
          stopWebcam();
          checkDisplayContainer.style.display = 'none';
          ocrConsole.style.display = 'none';
          activeCheckSource = null;
          return;
        }
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

        // Queue in approvals
        let approvals = JSON.parse(localStorage.getItem('bbb_approvals') || '[]');
        const appVal = {
          id: `APP-${Date.now().toString().slice(-5)}`,
          type: 'ACH Direct Deposit',
          initiator: localStorage.getItem('bbb_user_role') || 'Maker (Staff Analyst)',
          details: `Direct Deposit Payroll Batch: ${roster.length} Accounts for ${coName.trim()}`,
          amount: total,
          status: 'Pending Approval'
        };
        approvals.push(appVal);
        localStorage.setItem('bbb_approvals', JSON.stringify(approvals));

        if (typeof renderApprovalsUI === 'function') {
          renderApprovalsUI();
        }

        nachaOutputSection.style.display = 'none';
        showBannerNotification(`ACH Batch Queued: $${total.toLocaleString()} pending Checker approval (ID: ${appVal.id}).`, "success");
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

  // --- MFA SOFT-TOKEN COUNTDOWN ENGINE ---
  let activeOTPCode = '';
  function setupMfaSoftToken() {
    const sidebarOtpValue = document.getElementById('sidebar-otp-value');
    const mfaTimerRing = document.getElementById('mfa-timer-ring');
    const mfaTimerSec = document.getElementById('mfa-timer-sec');
    if (!sidebarOtpValue) return;

    function generateOTP() {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      activeOTPCode = code.slice(0, 3) + ' ' + code.slice(3);
      sidebarOtpValue.textContent = activeOTPCode;
    }

    generateOTP();
    let secondsLeft = 30;
    setInterval(() => {
      secondsLeft--;
      if (secondsLeft < 0) {
        secondsLeft = 30;
        generateOTP();
      }
      if (mfaTimerSec) mfaTimerSec.textContent = `Expires in ${secondsLeft}s`;
      if (mfaTimerRing) {
        // SVG progress ring calculations
        const offset = (secondsLeft / 30) * 50.24;
        mfaTimerRing.style.strokeDashoffset = 50.24 - offset;
      }
    }, 1000);
  }

  // Global handle for Approvals re-rendering
  window.renderApprovalsUI = null;

  // --- MAKER-CHECKER APPROVALS CENTER ---
  function setupApprovalsCenter(username) {
    const toggleRoleBtn = document.getElementById('btn-toggle-role');
    const roleText = document.getElementById('approvals-role-text');
    const approvalBadge = document.getElementById('approval-badge-count');
    
    if (!toggleRoleBtn) return;
    
    let activeRole = localStorage.getItem('bbb_user_role') || 'Maker (Staff Analyst)';
    roleText.textContent = activeRole;
    
    const dispRole = document.getElementById('display-role');
    if (dispRole) dispRole.textContent = activeRole;

    toggleRoleBtn.onclick = () => {
      activeRole = activeRole.includes('Maker') ? 'Checker (Treasury Director)' : 'Maker (Staff Analyst)';
      localStorage.setItem('bbb_user_role', activeRole);
      roleText.textContent = activeRole;
      const dispRole = document.getElementById('display-role');
      if (dispRole) dispRole.textContent = activeRole;
      
      renderApprovalsUI();
    };

    function renderApprovalsUI() {
      const approvals = JSON.parse(localStorage.getItem('bbb_approvals') || '[]');
      const exceptions = JSON.parse(localStorage.getItem('bbb_exceptions') || '[]');
      
      const pendingApprovalsCount = approvals.filter(a => a.status === 'Pending Approval').length;
      const pendingExceptionsCount = exceptions.filter(e => e.status === 'Pending Decision').length;
      const totalPending = pendingApprovalsCount + pendingExceptionsCount;
      
      if (approvalBadge) {
        if (totalPending > 0) {
          approvalBadge.textContent = totalPending;
          approvalBadge.style.display = 'inline-flex';
        } else {
          approvalBadge.style.display = 'none';
        }
      }

      const txnBody = document.getElementById('approvals-txn-body');
      if (txnBody) {
        txnBody.innerHTML = '';
        if (approvals.length === 0) {
          txnBody.innerHTML = `<tr><td colspan="6" style="padding:20px; text-align:center; color:var(--text-muted);">No pending transactions in approval queue.</td></tr>`;
        } else {
          approvals.forEach((app) => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid var(--border-color)';
            
            let actionHtml = '';
            if (app.status === 'Pending Approval') {
              actionHtml = `
                <div style="display:flex; gap:6px; justify-content:center;">
                  <button class="page-btn btn-approve" data-id="${app.id}" style="margin:0; padding:2px 8px; font-size:11px; background-color:#10b981; color:#fff; border-color:#10b981;">Approve</button>
                  <button class="page-btn btn-reject" data-id="${app.id}" style="margin:0; padding:2px 8px; font-size:11px; background-color:#ef4444; color:#fff; border-color:#ef4444;">Reject</button>
                </div>
              `;
            } else {
              actionHtml = `<span style="font-weight:600; color:${app.status === 'Approved' ? '#10b981' : '#ef4444'}">${app.status}</span>`;
            }

            tr.innerHTML = `
              <td style="padding:10px; font-family:monospace;">${app.id}</td>
              <td style="padding:10px; font-weight:600;">${app.type}</td>
              <td style="padding:10px; color:var(--text-muted);">${app.initiator}</td>
              <td style="padding:10px;">${app.details}</td>
              <td style="padding:10px; text-align:right; font-weight:bold;">$${app.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              <td style="padding:10px; text-align:center;">${actionHtml}</td>
            `;
            txnBody.appendChild(tr);
          });
        }
      }

      const excBody = document.getElementById('approvals-exceptions-body');
      if (excBody) {
        excBody.innerHTML = '';
        if (exceptions.length === 0) {
          excBody.innerHTML = `<tr><td colspan="5" style="padding:20px; text-align:center; color:var(--text-muted);">No presented Positive Pay check exceptions.</td></tr>`;
        } else {
          exceptions.forEach((exc) => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid var(--border-color)';
            
            let decisionHtml = '';
            if (exc.status === 'Pending Decision') {
              decisionHtml = `
                <div style="display:flex; gap:6px; justify-content:center;">
                  <button class="page-btn btn-pay-check" data-num="${exc.checkNum}" style="margin:0; padding:2px 8px; font-size:11px; background-color:#10b981; color:#fff; border-color:#10b981;">Pay (Clear)</button>
                  <button class="page-btn btn-return-check" data-num="${exc.checkNum}" style="margin:0; padding:2px 8px; font-size:11px; background-color:#ef4444; color:#fff; border-color:#ef4444;">Return (Fraud)</button>
                </div>
              `;
            } else {
              decisionHtml = `<span style="font-weight:600; color:${exc.status.includes('Paid') ? '#10b981' : '#ef4444'}">${exc.status}</span>`;
            }

            tr.innerHTML = `
              <td style="padding:10px; font-family:monospace;">${exc.checkNum}</td>
              <td style="padding:10px; font-weight:600;">${exc.payee}</td>
              <td style="padding:10px; color:var(--text-muted);">${exc.details || 'Routing code mismatch'}</td>
              <td style="padding:10px; text-align:right; font-weight:bold;">$${exc.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              <td style="padding:10px; text-align:center;">${decisionHtml}</td>
            `;
            excBody.appendChild(tr);
          });
        }
      }

      document.querySelectorAll('.btn-approve').forEach(btn => {
        btn.onclick = () => {
          if (!activeRole.includes('Checker')) {
            alert("Dual Control Policy violation: Maker cannot approve transactions. Toggle role to Checker to perform approvals.");
            return;
          }
          const id = btn.getAttribute('data-id');
          processApproval(id, 'Approved');
        };
      });

      document.querySelectorAll('.btn-reject').forEach(btn => {
        btn.onclick = () => {
          if (!activeRole.includes('Checker')) {
            alert("Dual Control Policy violation: Maker cannot reject transactions. Toggle role to Checker.");
            return;
          }
          const id = btn.getAttribute('data-id');
          processApproval(id, 'Rejected');
        };
      });

      document.querySelectorAll('.btn-pay-check').forEach(btn => {
        btn.onclick = () => {
          if (!activeRole.includes('Checker')) {
            alert("Dual Control Policy violation: Maker cannot decide exceptions. Toggle role to Checker.");
            return;
          }
          const num = btn.getAttribute('data-num');
          processExceptionDecision(num, 'Paid (Approved)');
        };
      });

      document.querySelectorAll('.btn-return-check').forEach(btn => {
        btn.onclick = () => {
          if (!activeRole.includes('Checker')) {
            alert("Dual Control Policy violation: Maker cannot decide exceptions. Toggle role to Checker.");
            return;
          }
          const num = btn.getAttribute('data-num');
          processExceptionDecision(num, 'Returned (Dishonored)');
        };
      });
    }

    function processApproval(id, newStatus) {
      let approvals = JSON.parse(localStorage.getItem('bbb_approvals') || '[]');
      const index = approvals.findIndex(a => a.id === id);
      if (index === -1) return;
      
      approvals[index].status = newStatus;
      localStorage.setItem('bbb_approvals', JSON.stringify(approvals));
      
      if (newStatus === 'Approved') {
        const app = approvals[index];
        const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
        
        if (balances.checking >= app.amount) {
          balances.checking -= app.amount;
          localStorage.setItem(`bbb_balances_${currentUser}`, JSON.stringify(balances));
          updateBalanceUI(balances);
          
          const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`) || '[]');
          const now = new Date();
          txns.unshift({
            id: `TXN-${Date.now().toString().slice(-7)}`,
            date: now.toISOString().slice(0, 19).replace('T', ' '),
            displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            desc: `${app.type}: ${app.details}`,
            entity: app.details.split(' to ')[1] || 'Corporate Recipient',
            category: 'Operations',
            type: 'withdrawal',
            amount: app.amount
          });
          localStorage.setItem(`bbb_txns_${currentUser}`, JSON.stringify(txns));
          renderLedger(txns);
          showBannerNotification(`Approval Executed: Transaction ${id} approved & posted.`, 'success');
        } else {
          showBannerNotification(`Approval Failed: Insufficient funds for transaction ${id}`, 'error');
          approvals[index].status = 'Failed (Overdraft)';
          localStorage.setItem('bbb_approvals', JSON.stringify(approvals));
        }
      } else {
        showBannerNotification(`Transaction ${id} rejected.`, 'error');
      }
      
      renderApprovalsUI();
    }

    function processExceptionDecision(num, newStatus) {
      let exceptions = JSON.parse(localStorage.getItem('bbb_exceptions') || '[]');
      const index = exceptions.findIndex(e => e.checkNum === num);
      if (index === -1) return;
      
      exceptions[index].status = newStatus;
      localStorage.setItem('bbb_exceptions', JSON.stringify(exceptions));
      
      const exc = exceptions[index];
      if (newStatus.includes('Paid')) {
        const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
        
        if (balances.checking >= exc.amount) {
          balances.checking -= exc.amount;
          localStorage.setItem(`bbb_balances_${currentUser}`, JSON.stringify(balances));
          updateBalanceUI(balances);
          
          const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`) || '[]');
          const now = new Date();
          txns.unshift({
            id: `TXN-${Date.now().toString().slice(-7)}`,
            date: now.toISOString().slice(0, 19).replace('T', ' '),
            displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            desc: `Positive Pay Cleared Check #${exc.checkNum}`,
            entity: exc.payee,
            category: 'Inventory',
            type: 'withdrawal',
            amount: exc.amount
          });
          localStorage.setItem(`bbb_txns_${currentUser}`, JSON.stringify(txns));
          renderLedger(txns);
          showBannerNotification(`Positive Pay Exception: Check #${exc.checkNum} cleared successfully.`, 'success');
        } else {
          showBannerNotification(`Positive Pay Exception: Check #${exc.checkNum} failed to clear (insufficient funds)`, 'error');
          exceptions[index].status = 'Failed (NSF)';
          localStorage.setItem('bbb_exceptions', JSON.stringify(exceptions));
        }
      } else {
        showBannerNotification(`Check #${exc.checkNum} returned for fraud protection.`, 'error');
      }
      
      renderApprovalsUI();
    }

    window.renderApprovalsUI = renderApprovalsUI;

    let approvals = JSON.parse(localStorage.getItem('bbb_approvals'));
    if (!approvals) {
      approvals = [
        { id: 'APP-90291', type: 'Wire Transfer Out', initiator: 'Maker (Staff Analyst)', details: 'Wire payout to Weyland-Yutani Xenomorph Division', amount: 125000.00, status: 'Pending Approval' },
        { id: 'APP-90292', type: 'ACH Direct Deposit', initiator: 'Maker (Staff Analyst)', details: 'Vandelay Payroll Batch SEC:PPD', amount: 12500.00, status: 'Pending Approval' }
      ];
      localStorage.setItem('bbb_approvals', JSON.stringify(approvals));
    }
    
    let exceptions = JSON.parse(localStorage.getItem('bbb_exceptions'));
    if (!exceptions) {
      exceptions = [
        { checkNum: '109923', payee: 'Dwight Schrute', details: 'Check number matched registry but amount differs ($2,450.00 presented vs $2,400.00 registry)', amount: 2450.00, status: 'Pending Decision' },
        { checkNum: '109927', payee: 'Acme Pyrotechnics', details: 'No issued check registry found for Check #109927', amount: 1540.00, status: 'Pending Decision' }
      ];
      localStorage.setItem('bbb_exceptions', JSON.stringify(exceptions));
    }

    renderApprovalsUI();
  }

  // --- TRANSFERS SUBTABS AND WIRE LOGIC EXTENSIONS ---
  const originalSetupTransfersSubtabs = setupTransfersSubtabs;
  setupTransfersSubtabs = function() {
    originalSetupTransfersSubtabs();
    
    const btnSubtabInternal = document.getElementById('btn-subtab-internal');
    const btnSubtabAch = document.getElementById('btn-subtab-ach');
    const btnSubtabWire = document.getElementById('btn-subtab-wire');
    const transferForm = document.getElementById('transfer-form');
    const achForm = document.getElementById('ach-form');
    const wireForm = document.getElementById('wire-dispatch-form');
    
    if (btnSubtabWire && wireForm) {
      btnSubtabWire.addEventListener('click', () => {
        btnSubtabWire.classList.add('active');
        if (btnSubtabInternal) btnSubtabInternal.classList.remove('active');
        if (btnSubtabAch) btnSubtabAch.classList.remove('active');
        if (transferForm) transferForm.style.display = 'none';
        if (achForm) achForm.style.display = 'none';
        wireForm.style.display = 'block';
      });

      if (btnSubtabInternal) {
        btnSubtabInternal.addEventListener('click', () => {
          btnSubtabWire.classList.remove('active');
          wireForm.style.display = 'none';
        });
      }
      if (btnSubtabAch) {
        btnSubtabAch.addEventListener('click', () => {
          btnSubtabWire.classList.remove('active');
          wireForm.style.display = 'none';
        });
      }

      const btnValidateSwift = document.getElementById('btn-validate-swift');
      const wireRoutingInput = document.getElementById('wire-routing');
      if (btnValidateSwift) {
        btnValidateSwift.addEventListener('click', () => {
          const val = wireRoutingInput.value.trim().toUpperCase();
          if (!val) {
            alert("Enter routing number or Swift BIC first.");
            return;
          }
          if (val === '987654321') {
            alert("Validation Result:\nRouting transit code 987654321 verified.\nInstitution: Big Beaver Bank (Fictional Clearing Root).\nWarning: MOD 10 checksum is invalid.");
          } else if (/^[A-Z0-9]{8,11}$/.test(val)) {
            alert(`Validation Result:\nSwift BIC ${val} verified.\nInstitution: Fictional Treasury clearing division.`);
          } else if (/^\d{9}$/.test(val)) {
            alert(`Validation Result:\nRouting Transit ${val} verified.\nInstitution: Fictional Treasury clearing node.`);
          } else {
            alert(`Validation Error:\nRouting/Swift code format invalid. Must be 9-digit ABA Routing or 8-11 character Swift BIC.`);
          }
        });
      }

      const btnCalcFx = document.getElementById('btn-calc-fx');
      const wireFxCurrency = document.getElementById('wire-fx-currency');
      const wireFxResult = document.getElementById('wire-fx-result');
      const wireAmountInput = document.getElementById('wire-amount');
      
      if (btnCalcFx) {
        btnCalcFx.addEventListener('click', () => {
          const amt = parseFloat(wireAmountInput.value) || 0;
          const cur = wireFxCurrency.value;
          let rate = 1.00;
          let suffix = 'USD';
          
          if (cur === 'IMP') { rate = 0.85; suffix = 'IMP (Imperial)'; }
          else if (cur === 'FED') { rate = 1.25; suffix = 'FED (Federation)'; }
          else if (cur === 'QUA') { rate = 50.00; suffix = 'QUA (Quatloos)'; }
          
          const finalAmt = amt * rate;
          wireFxResult.textContent = `Rate: 1 USD = ${rate} ${suffix}. Equivalent: ${finalAmt.toLocaleString()} ${suffix}`;
        });
      }

      wireForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const route = document.getElementById('wire-routing').value;
        const account = document.getElementById('wire-account').value;
        const name = document.getElementById('wire-name').value;
        const amount = parseFloat(document.getElementById('wire-amount').value);
        const type = document.getElementById('wire-type').value;
        const otp = document.getElementById('wire-otp').value.trim().replace(/\s+/g, '');
        
        if (!amount || amount <= 0) return;
        
        const actualOtp = activeOTPCode.trim().replace(/\s+/g, '');
        if (otp !== actualOtp) {
          showBannerNotification("Access Denied: Invalid Security Token OTP.", "error");
          return;
        }
        
        const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
        if (balances.checking < amount) {
          showBannerNotification("Wire Blocked: Insufficient funds in checking account.", "error");
          return;
        }
        
        let approvals = JSON.parse(localStorage.getItem('bbb_approvals') || '[]');
        const appVal = {
          id: `APP-${Date.now().toString().slice(-5)}`,
          type: `Wire Out (${type.toUpperCase()})`,
          initiator: localStorage.getItem('bbb_user_role') || 'Maker (Staff Analyst)',
          details: `Wire to ${name} via ${route} acct ${account}`,
          amount: amount,
          status: 'Pending Approval'
        };
        approvals.push(appVal);
        localStorage.setItem('bbb_approvals', JSON.stringify(approvals));
        
        if (typeof renderApprovalsUI === 'function') {
          renderApprovalsUI();
        }
        
        showBannerNotification(`Wire queued successfully. Pending Checker authorization (ID: ${appVal.id}).`, "success");
        wireForm.reset();
      });
    }
  };

  // --- STOP PAYMENT RANGE AND TRADITIONAL FORM TOGGLES ---
  function setupStopPaymentToggles() {
    const btnStopSingle = document.getElementById('btn-stop-single');
    const btnStopRange = document.getElementById('btn-stop-range');
    const singleStopForm = document.getElementById('stoppayment-form');
    const rangeStopForm = document.getElementById('stoppayment-range-form');
    
    if (btnStopSingle && btnStopRange) {
      btnStopSingle.onclick = () => {
        btnStopSingle.classList.add('active');
        btnStopRange.classList.remove('active');
        if (singleStopForm) singleStopForm.style.display = 'block';
        if (rangeStopForm) rangeStopForm.style.display = 'none';
      };
      btnStopRange.onclick = () => {
        btnStopRange.classList.add('active');
        btnStopSingle.classList.remove('active');
        if (singleStopForm) singleStopForm.style.display = 'none';
        if (rangeStopForm) rangeStopForm.style.display = 'block';
      };
    }

    if (rangeStopForm) {
      rangeStopForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const start = document.getElementById('stop-range-start').value.trim();
        const end = document.getElementById('stop-range-end').value.trim();
        const reason = document.getElementById('stop-range-reason').value;
        
        const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
        if (balances.checking < 25) {
          showBannerNotification("Stop Payment Rejected: Insufficient funds for $25 fee.", "error");
          return;
        }
        balances.checking -= 25;
        localStorage.setItem(`bbb_balances_${currentUser}`, JSON.stringify(balances));
        updateBalanceUI(balances);
        
        let stops = JSON.parse(localStorage.getItem('bbb_stop_checks') || '[]');
        stops.push({ type: 'range', start: start, end: end, reason: reason });
        localStorage.setItem('bbb_stop_checks', JSON.stringify(stops));
        
        const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`) || '[]');
        const now = new Date();
        txns.unshift({
          id: `TXN-${Date.now().toString().slice(-7)}`,
          date: now.toISOString().slice(0, 19).replace('T', ' '),
          displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          desc: `Stop Payment Fee: Range #${start}-${end}`,
          entity: "Big Beaver Bank Operations",
          category: 'Audit',
          type: 'withdrawal',
          amount: 25.00
        });
        localStorage.setItem(`bbb_txns_${currentUser}`, JSON.stringify(txns));
        renderLedger(txns);
        
        showBannerNotification(`Stop Order Placed: Checks #${start} through #${end} stopped. $25 fee debited.`, "success");
        rangeStopForm.reset();
      });
    }
  }

  // --- POSITIVE PAY CENTER ---
  function setupPositivePay(username) {
    const btnUpload = document.getElementById('btn-pospay-upload');
    const btnManual = document.getElementById('btn-pospay-manual');
    const uploadArea = document.getElementById('pospay-upload-area');
    const manualForm = document.getElementById('pospay-manual-form');
    const btnSubmitCsv = document.getElementById('btn-pospay-submit-csv');
    const csvContent = document.getElementById('pospay-csv-content');
    const registryBody = document.getElementById('pospay-ledger-body');
    
    if (!btnUpload) return;
    
    btnUpload.onclick = () => {
      btnUpload.classList.add('active');
      btnManual.classList.remove('active');
      uploadArea.style.display = 'block';
      manualForm.style.display = 'none';
    };
    btnManual.onclick = () => {
      btnManual.classList.add('active');
      btnUpload.classList.remove('active');
      uploadArea.style.display = 'none';
      manualForm.style.display = 'block';
    };

    function renderRegistry() {
      const registry = JSON.parse(localStorage.getItem('bbb_pospay_registry') || '[]');
      registryBody.innerHTML = '';
      if (registry.length === 0) {
        registryBody.innerHTML = `<tr><td colspan="4" style="padding:10px; text-align:center; color:var(--text-muted);">No check issue records registered.</td></tr>`;
      } else {
        registry.forEach(item => {
          const tr = document.createElement('tr');
          tr.style.borderBottom = '1px solid var(--border-color)';
          tr.innerHTML = `
            <td style="padding:8px; font-family:monospace;">${item.checkNum}</td>
            <td style="padding:8px; font-weight:600;">${item.payee}</td>
            <td style="padding:8px; text-align:right; font-weight:bold;">$${item.amount.toLocaleString('en-US', { minimumFractionDigits:2 })}</td>
            <td style="padding:8px; text-align:center;"><span style="color:#10b981; font-weight:600;">Registered</span></td>
          `;
          registryBody.appendChild(tr);
        });
      }
    }

    btnSubmitCsv.onclick = () => {
      const content = csvContent.value.trim();
      if (!content) {
        alert("Please paste check issue CSV lines first.");
        return;
      }
      
      const lines = content.split('\n');
      let registry = JSON.parse(localStorage.getItem('bbb_pospay_registry') || '[]');
      let count = 0;
      
      lines.forEach(line => {
        const parts = line.split(',');
        if (parts.length >= 3) {
          const num = parts[0].trim();
          const amt = parseFloat(parts[1].trim());
          const payee = parts[2].trim();
          if (num && !isNaN(amt) && payee) {
            if (!registry.some(r => r.checkNum === num)) {
              registry.push({ checkNum: num, amount: amt, payee: payee });
              count++;
            }
          }
        }
      });
      
      localStorage.setItem('bbb_pospay_registry', JSON.stringify(registry));
      csvContent.value = '';
      renderRegistry();
      showBannerNotification(`Success: ${count} check issues uploaded into Positive Pay registry.`, "success");
    };

    manualForm.onsubmit = (e) => {
      e.preventDefault();
      const num = document.getElementById('pospay-check-num').value.trim();
      const amt = parseFloat(document.getElementById('pospay-check-amount').value);
      const payee = document.getElementById('pospay-check-payee').value.trim();
      
      let registry = JSON.parse(localStorage.getItem('bbb_pospay_registry') || '[]');
      if (registry.some(r => r.checkNum === num)) {
        alert("Validation Error: This check number is already registered.");
        return;
      }
      
      registry.push({ checkNum: num, amount: amt, payee: payee });
      localStorage.setItem('bbb_pospay_registry', JSON.stringify(registry));
      
      manualForm.reset();
      renderRegistry();
      showBannerNotification(`Success: Check #${num} manually registered in Positive Pay.`, "success");
    };

    let registry = JSON.parse(localStorage.getItem('bbb_pospay_registry'));
    if (!registry) {
      registry = [
        { checkNum: '109923', amount: 2400.00, payee: 'Dwight Schrute' },
        { checkNum: '109924', amount: 4200.00, payee: 'Jim Halpert' },
        { checkNum: '109925', amount: 3800.00, payee: 'Pam Beesly' }
      ];
      localStorage.setItem('bbb_pospay_registry', JSON.stringify(registry));
    }

    renderRegistry();
  }

  // --- RECEIVABLES & LOCKBOX SCANNER ---
  function setupReceivables(username) {
    const btnGateway = document.getElementById('btn-receivables-gateway');
    const btnLockbox = document.getElementById('btn-receivables-lockbox');
    const gatewayForm = document.getElementById('receivables-gateway-form');
    const lockboxArea = document.getElementById('receivables-lockbox-area');
    
    if (!btnGateway) return;
    
    btnGateway.onclick = () => {
      btnGateway.classList.add('active');
      btnLockbox.classList.remove('active');
      gatewayForm.style.display = 'block';
      lockboxArea.style.display = 'none';
    };
    
    btnLockbox.onclick = () => {
      btnLockbox.classList.add('active');
      btnGateway.classList.remove('active');
      gatewayForm.style.display = 'none';
      lockboxArea.style.display = 'block';
      drawLockboxCheck();
    };

    gatewayForm.onsubmit = (e) => {
      e.preventDefault();
      const card = document.getElementById('merchant-card-num').value.replace(/\s+/g, '');
      const cvv = document.getElementById('merchant-card-cvv').value.trim();
      const amt = parseFloat(document.getElementById('merchant-amount').value);
      const client = document.getElementById('merchant-payee').value.trim();
      
      if (!amt || amt <= 0) return;
      
      if (card.length !== 16 || isNaN(card)) {
        alert("Validation Error: Card number must be 16 digits.");
        return;
      }
      if (cvv.length !== 3 || isNaN(cvv)) {
        alert("Validation Error: CVV must be 3 digits.");
        return;
      }
      
      const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
      balances.checking += amt;
      localStorage.setItem(`bbb_balances_${currentUser}`, JSON.stringify(balances));
      updateBalanceUI(balances);
      
      const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`) || '[]');
      const now = new Date();
      txns.unshift({
        id: `TXN-${Date.now().toString().slice(-7)}`,
        date: now.toISOString().slice(0, 19).replace('T', ' '),
        displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        desc: `Merchant POS Capture - Auth:${Math.floor(100000 + Math.random()*900000)}`,
        entity: client,
        category: 'Inventory',
        type: 'deposit',
        amount: amt
      });
      localStorage.setItem(`bbb_txns_${currentUser}`, JSON.stringify(txns));
      renderLedger(txns);
      
      showBannerNotification(`Merchant Payout Captured: $${amt.toLocaleString()} credited to checking.`, "success");
      gatewayForm.reset();
    };

    const lockboxCanvas = document.getElementById('lockbox-canvas');
    const btnLockboxScan = document.getElementById('btn-lockbox-scan-next');
    const lockboxConsole = document.getElementById('lockbox-console');
    let currentLockboxIndex = 0;
    
    const lockboxChecks = [
      { checkNum: '55102', amount: 15400.00, company: 'Stark Industries', memo: 'Clean energy component lease' },
      { checkNum: '88291', amount: 9320.50, company: 'Wayne Enterprises', memo: 'Municipal security gear' },
      { checkNum: '10294', amount: 62450.00, company: 'Globex Corporation', memo: 'Sub-mountainous power tap' }
    ];

    function drawLockboxCheck() {
      if (!lockboxCanvas) return;
      const ctx = lockboxCanvas.getContext('2d');
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(0, 0, lockboxCanvas.width, lockboxCanvas.height);
      
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(4, 4, lockboxCanvas.width - 8, lockboxCanvas.height - 8);
      
      const check = lockboxChecks[currentLockboxIndex];
      
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(check.company.toUpperCase(), 15, 25);
      ctx.font = '8px sans-serif';
      ctx.fillText('100 Industrial Parkway, Suite A', 15, 35);
      
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`Check #: ${check.checkNum}`, lockboxCanvas.width - 90, 25);
      
      ctx.font = '9px sans-serif';
      ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, lockboxCanvas.width - 110, 50);
      
      ctx.fillText(`Pay To The Order Of: Big Beaver Bank Fiduciary`, 15, 75);
      
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`$  ${check.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, lockboxCanvas.width - 100, 75);
      ctx.strokeRect(lockboxCanvas.width - 115, 63, 100, 18);
      
      ctx.font = '9px sans-serif';
      ctx.fillText(`Memo: ${check.memo}`, 15, 110);
      
      ctx.beginPath();
      ctx.moveTo(lockboxCanvas.width - 150, 110);
      ctx.lineTo(lockboxCanvas.width - 15, 110);
      ctx.stroke();
      
      ctx.font = 'italic 9px Georgia';
      ctx.fillText('Authorized Signature', lockboxCanvas.width - 120, 120);
      
      ctx.font = '10px monospace';
      ctx.fillText(`⑆122000249⑆  ⑈004928109⑈  ${check.checkNum}`, 60, 155);
    }

    if (btnLockboxScan) {
      btnLockboxScan.onclick = () => {
        lockboxConsole.innerHTML = `[LOCKBOX SCANNERS STARTING...]
Scanning batch tray drops...`;
        
        setTimeout(() => {
          const check = lockboxChecks[currentLockboxIndex];
          lockboxConsole.innerHTML = `[LOCKBOX ENGINE]
-----------------------------
FEEDER: Document detected.
OCR TRANSIT   : 122000249
OCR ACCOUNT   : 004928109
OCR CHECK #   : ${check.checkNum}
OCR AMOUNT    : $${check.amount.toLocaleString()}
PAYEE MATCH   : TRUE (BBB)
CLEARING CODE : SEC:CCD
STATUS        : CLEARED`;
          
          const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
          balances.checking += check.amount;
          localStorage.setItem(`bbb_balances_${currentUser}`, JSON.stringify(balances));
          updateBalanceUI(balances);
          
          const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`) || '[]');
          const now = new Date();
          txns.unshift({
            id: `TXN-${Date.now().toString().slice(-7)}`,
            date: now.toISOString().slice(0, 19).replace('T', ' '),
            displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            desc: `Lockbox Express Clearing: Check #${check.checkNum}`,
            entity: check.company,
            category: 'Inventory',
            type: 'deposit',
            amount: check.amount
          });
          localStorage.setItem(`bbb_txns_${currentUser}`, JSON.stringify(txns));
          renderLedger(txns);
          
          showBannerNotification(`Lockbox Scanner: Check #${check.checkNum} ($${check.amount.toLocaleString()}) cleared.`, "success");
          
          currentLockboxIndex = (currentLockboxIndex + 1) % lockboxChecks.length;
          drawLockboxCheck();
        }, 1500);
      };
    }
  }

  // --- CORPORATE CARDS & VIRTUAL CARD GENERATOR ---
  function setupCorporateCards(username) {
    const ledgerBody = document.getElementById('cards-ledger-body');
    const vcardForm = document.getElementById('cards-virtual-form');
    const vcardOutput = document.getElementById('vcard-output');
    
    if (!ledgerBody) return;
    
    function renderCards() {
      const cards = JSON.parse(localStorage.getItem('bbb_corporate_cards') || '[]');
      ledgerBody.innerHTML = '';
      
      cards.forEach((card, idx) => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid var(--border-color)';
        
        const statusText = card.locked ? 'Locked (Frozen)' : 'Active';
        const btnColor = card.locked ? '#10b981' : '#ef4444';
        const btnText = card.locked ? 'Unlock' : 'Freeze';
        
        tr.innerHTML = `
          <td style="padding:8px; font-weight:600;">${card.holder}</td>
          <td style="padding:8px; font-family:monospace;">•••• •••• •••• ${card.last4}</td>
          <td style="padding:8px;">$${card.limit.toLocaleString()}</td>
          <td style="padding:8px;">$${card.balance.toLocaleString()}</td>
          <td style="padding:8px; text-align:center;">
            <button class="page-btn btn-toggle-card" data-idx="${idx}" style="margin:0; padding:2px 8px; font-size:11px; background-color:${btnColor}; color:#fff; border-color:${btnColor};">${btnText}</button>
          </td>
        `;
        ledgerBody.appendChild(tr);
      });
      
      document.querySelectorAll('.btn-toggle-card').forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.getAttribute('data-idx'));
          cards[idx].locked = !cards[idx].locked;
          localStorage.setItem('bbb_corporate_cards', JSON.stringify(cards));
          renderCards();
          showBannerNotification(`Card status updated: ${cards[idx].holder}'s card is now ${cards[idx].locked ? 'frozen' : 'active'}.`, "success");
        };
      });
    }

    if (vcardForm) {
      vcardForm.onsubmit = (e) => {
        e.preventDefault();
        const cap = parseFloat(document.getElementById('vcard-amount').value);
        const vendor = document.getElementById('vcard-payee').value.trim();
        
        if (!cap || cap <= 0) return;
        
        const cardNum = `4829 ${Math.floor(1000+Math.random()*9000)} ${Math.floor(1000+Math.random()*9000)} ${Math.floor(1000+Math.random()*9000)}`;
        const exp = `06/29`;
        const cvv = Math.floor(100 + Math.random()*900).toString();
        
        document.getElementById('vcard-disp-payee').textContent = `${vendor.toUpperCase()} CAP: $${cap.toLocaleString()}`;
        document.getElementById('vcard-disp-num').textContent = cardNum;
        document.getElementById('vcard-disp-exp').textContent = `EXP: ${exp}`;
        document.getElementById('vcard-disp-cvv').textContent = `CVV: ${cvv}`;
        
        vcardOutput.style.display = 'block';
        
        const balances = JSON.parse(localStorage.getItem(`bbb_balances_${currentUser}`));
        if (balances.checking < cap) {
          showBannerNotification("Virtual card failed: Insufficient checking funds.", "error");
          vcardOutput.style.display = 'none';
          return;
        }
        balances.checking -= cap;
        localStorage.setItem(`bbb_balances_${currentUser}`, JSON.stringify(balances));
        updateBalanceUI(balances);
        
        const txns = JSON.parse(localStorage.getItem(`bbb_txns_${currentUser}`) || '[]');
        const now = new Date();
        txns.unshift({
          id: `TXN-${Date.now().toString().slice(-7)}`,
          date: now.toISOString().slice(0, 19).replace('T', ' '),
          displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          desc: `Virtual Token Purchase: ${vendor}`,
          entity: vendor,
          category: 'Equipment',
          type: 'withdrawal',
          amount: cap
        });
        localStorage.setItem(`bbb_txns_${currentUser}`, JSON.stringify(txns));
        renderLedger(txns);
        
        showBannerNotification(`Virtual Token Issued: Card created for ${vendor} with $${cap.toLocaleString()} cap.`, "success");
        vcardForm.reset();
      };
    }

    let cards = JSON.parse(localStorage.getItem('bbb_corporate_cards'));
    if (!cards) {
      cards = [
        { holder: 'Dwight Schrute', last4: '7729', limit: 5000, balance: 1250, locked: false },
        { holder: 'Jim Halpert', last4: '3819', limit: 10000, balance: 4120, locked: false },
        { holder: 'Pam Beesly', last4: '9204', limit: 5000, balance: 80, locked: true }
      ];
      localStorage.setItem('bbb_corporate_cards', JSON.stringify(cards));
    }

    renderCards();
  }

  // --- LIQUIDITY SWEEPS & CREDIT PORTALS ---
  function setupLiquidity(username) {
    const btnSaveSweeps = document.getElementById('btn-save-sweeps');
    const sweepThresholdInput = document.getElementById('sweep-threshold');
    const sweepTargetSelect = document.getElementById('sweep-target');
    const locCapDisplay = document.getElementById('loc-cap-display');
    const locBalDisplay = document.getElementById('loc-bal-display');
    
    const btnDrawTab = document.getElementById('btn-loc-draw-tab');
    const btnRepayTab = document.getElementById('btn-loc-repay-tab');
    const drawForm = document.getElementById('loc-draw-form');
    const repayForm = document.getElementById('loc-repay-form');
    
    if (!btnSaveSweeps) return;

    let sweeps = JSON.parse(localStorage.getItem(`bbb_sweeps_${username}`)) || { threshold: 100000, target: 'savings' };
    sweepThresholdInput.value = sweeps.threshold;
    sweepTargetSelect.value = sweeps.target;

    btnSaveSweeps.onclick = () => {
      sweeps.threshold = parseFloat(sweepThresholdInput.value) || 0;
      sweeps.target = sweepTargetSelect.value;
      localStorage.setItem(`bbb_sweeps_${username}`, JSON.stringify(sweeps));
      showBannerNotification("Sweep Covenants Saved: End-of-day balances sweeping to " + sweepTargetSelect.options[sweepTargetSelect.selectedIndex].text, "success");
    };

    let locBal = parseFloat(localStorage.getItem(`bbb_loc_bal_${username}`) || '0');
    let locCap = 5000000.00;
    
    function renderLOC() {
      if (locCapDisplay) locCapDisplay.textContent = `$${(locCap - locBal).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
      if (locBalDisplay) locBalDisplay.textContent = `$${locBal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    }

    if (btnDrawTab && btnRepayTab) {
      btnDrawTab.onclick = () => {
        btnDrawTab.classList.add('active');
        btnRepayTab.classList.remove('active');
        drawForm.style.display = 'block';
        repayForm.style.display = 'none';
      };
      
      btnRepayTab.onclick = () => {
        btnRepayTab.classList.add('active');
        btnDrawTab.classList.remove('active');
        drawForm.style.display = 'none';
        repayForm.style.display = 'block';
      };
    }

    if (drawForm) {
      drawForm.onsubmit = (e) => {
        e.preventDefault();
        const drawAmt = parseFloat(document.getElementById('loc-draw-amount').value);
        if (!drawAmt || drawAmt <= 0) return;
        
        if (locBal + drawAmt > locCap) {
          showBannerNotification("Drawdown Blocked: Exceeds Line of Credit capacity.", "error");
          return;
        }
        
        locBal += drawAmt;
        localStorage.setItem(`bbb_loc_bal_${username}`, locBal.toString());
        
        const balances = JSON.parse(localStorage.getItem(`bbb_balances_${username}`));
        balances.checking += drawAmt;
        localStorage.setItem(`bbb_balances_${username}`, JSON.stringify(balances));
        updateBalanceUI(balances);
        
        const txns = JSON.parse(localStorage.getItem(`bbb_txns_${username}`) || '[]');
        const now = new Date();
        txns.unshift({
          id: `TXN-${Date.now().toString().slice(-7)}`,
          date: now.toISOString().slice(0, 19).replace('T', ' '),
          displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          desc: `Commercial Line of Credit Drawdown`,
          entity: "BBB Credit Facility Program",
          category: 'Operations',
          type: 'deposit',
          amount: drawAmt
        });
        localStorage.setItem(`bbb_txns_${username}`, JSON.stringify(txns));
        renderLedger(txns);
        
        renderLOC();
        drawForm.reset();
        showBannerNotification(`LOC Drawdown Cleared: $${drawAmt.toLocaleString()} credited to Checking.`, "success");
      };
    }

    if (repayForm) {
      repayForm.onsubmit = (e) => {
        e.preventDefault();
        const repayAmt = parseFloat(document.getElementById('loc-repay-amount').value);
        if (!repayAmt || repayAmt <= 0) return;
        
        if (repayAmt > locBal) {
          showBannerNotification("Payment Error: Exceeds outstanding LOC balance.", "error");
          return;
        }
        
        const balances = JSON.parse(localStorage.getItem(`bbb_balances_${username}`));
        if (balances.checking < repayAmt) {
          showBannerNotification("Repayment Failed: Insufficient checking reserves.", "error");
          return;
        }
        
        balances.checking -= repayAmt;
        locBal -= repayAmt;
        localStorage.setItem(`bbb_balances_${username}`, JSON.stringify(balances));
        localStorage.setItem(`bbb_loc_bal_${username}`, locBal.toString());
        updateBalanceUI(balances);
        
        const txns = JSON.parse(localStorage.getItem(`bbb_txns_${username}`) || '[]');
        const now = new Date();
        txns.unshift({
          id: `TXN-${Date.now().toString().slice(-7)}`,
          date: now.toISOString().slice(0, 19).replace('T', ' '),
          displayDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          desc: `Commercial Line of Credit Repayment`,
          entity: "BBB Credit Facility Program",
          category: 'Debt Service',
          type: 'withdrawal',
          amount: repayAmt
        });
        localStorage.setItem(`bbb_txns_${username}`, JSON.stringify(txns));
        renderLedger(txns);
        
        renderLOC();
        repayForm.reset();
        showBannerNotification(`LOC Payment Received: $${repayAmt.toLocaleString()} paid against credit line.`, "success");
      };
    }

    renderLOC();
  }

  // --- COMPLIANCE AND LOCALIZATIONS ---
  function setupComplianceAndLocalization(username) {
    const btnSaveEntitlements = document.getElementById('btn-save-entitlements');
    const langSelect = document.getElementById('compliance-lang-select');
    const toggleAdaFont = document.getElementById('toggle-ada-font');
    const btnW9 = document.getElementById('btn-compliance-w9');
    const btn1099 = document.getElementById('btn-compliance-1099');
    
    if (!btnSaveEntitlements) return;

    btnSaveEntitlements.onclick = () => {
      const entitlements = {
        makerWire: document.getElementById('privilege-maker-wire').checked,
        checkerWire: document.getElementById('privilege-checker-wire').checked,
        makerAch: document.getElementById('privilege-maker-ach').checked,
        checkerAch: document.getElementById('privilege-checker-ach').checked,
        pospay: document.getElementById('privilege-positive-pay').checked
      };
      localStorage.setItem(`bbb_entitlements_${username}`, JSON.stringify(entitlements));
      showBannerNotification("Compliance Update: Entitlements permissions saved to profile.", "success");
    };

    let entitlements = JSON.parse(localStorage.getItem(`bbb_entitlements_${username}`));
    if (entitlements) {
      document.getElementById('privilege-maker-wire').checked = entitlements.makerWire;
      document.getElementById('privilege-checker-wire').checked = entitlements.checkerWire;
      document.getElementById('privilege-maker-ach').checked = entitlements.makerAch;
      document.getElementById('privilege-checker-ach').checked = entitlements.checkerAch;
      document.getElementById('privilege-positive-pay').checked = entitlements.pospay;
    }

    btnW9.onclick = () => {
      alert("Form W-9 Filing:\nFederal Taxpayer Identification validation complete.\nEntity registered: " + username.toUpperCase() + "\nStatus: Certified W-9 in file.");
    };
    
    btn1099.onclick = () => {
      const year = new Date().getFullYear() - 1;
      alert(`IRS Form 1099-INT Summary (${year}):\nInterest Income: $82,491.12\nOriginating Institution: Big Beaver Bank\nPayer TIN: 98-7654321\nRecipient Account: Commercial checking clearing pool.\n*Summary stored under tax records.*`);
    };

    toggleAdaFont.onchange = () => {
      if (toggleAdaFont.checked) {
        document.body.classList.add('ada-large-font');
      } else {
        document.body.classList.remove('ada-large-font');
      }
    };

    const accessBtn = document.getElementById('header-accessibility-btn');
    if (accessBtn) {
      accessBtn.onclick = () => {
        document.body.classList.toggle('high-contrast');
        showBannerNotification("Contrast mode toggled.", "success");
      };
    }

    const translationMap = {
      en: {
        title: "Fiduciary Account Dashboard",
        desc: "Under commercial audit controls, all external ACH payrolls, wire dispatches, and Positive Pay exception updates require dual control verification.",
        overview: "Overview & Ledger",
        approvals: "Approvals Queue",
        cards: "Corporate Cards"
      },
      sim: {
        title: "Sul Sul Fiduciary Grid-O-Plaza",
        desc: "Dag Dag, all payroll-a, wire dispatch-o, and positive pay checks must be double-cheecked by Checker llama. No fire-a!",
        overview: "Plaza & Ledger-Snaff",
        approvals: "Llama Approvals Box",
        cards: "Sul-Sul SimPlaza Cards"
      },
      kli: {
        title: "Duj Fiduciary balance ledger (Qapla'!)",
        desc: "Auditors demand blood! All payroll transactions, wire battle coordinates, and Positive Pay security keys must have Maker and Checker dual Honor codes!",
        overview: "Empire Ledger",
        approvals: "Honor Council Queue",
        cards: "Imperial Combat Cards"
      },
      bin: {
        title: "01000110 01101001 01100100 01110101",
        desc: "01000100 01110101 01100001 01101100 00100000 01100011 01101111 01101110 01110100 01110010 01101111",
        overview: "01001100 01100101 01100100",
        approvals: "01000001 01110000 01110000",
        cards: "01000011 01100001 01110010"
      }
    };

    langSelect.onchange = () => {
      const lang = langSelect.value;
      const map = translationMap[lang] || translationMap.en;
      
      const titleEl = document.querySelector('.dashboard-title');
      if (titleEl) titleEl.textContent = map.title;
      
      const descEl = document.querySelector('.tab-desc');
      if (descEl) descEl.textContent = map.desc;
      
      const overviewBtn = document.querySelector('button[data-tab="tab-dashboard"]');
      if (overviewBtn) {
        overviewBtn.innerHTML = `
          <svg viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
          ${map.overview}
        `;
      }
      
      const approvalsBtn = document.querySelector('button[data-tab="tab-approvals"]');
      if (approvalsBtn) {
        approvalsBtn.innerHTML = `
          <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          ${map.approvals}
        `;
      }
      
      showBannerNotification(`Localization language switched to: ${langSelect.options[langSelect.selectedIndex].text}`, "success");
    };
  }

  // --- SUPPORT SECURE MESSAGING ATTACHMENTS & SCREENSHARE ---
  function setupSupportAndScheduler(username) {
    const bankerForm = document.getElementById('support-banker-form');
    const screenshareBtn = document.getElementById('btn-support-screenshare');
    const screenshareConsole = document.getElementById('screenshare-console');
    const attachBtn = document.getElementById('btn-support-attach');
    
    if (!bankerForm) return;

    bankerForm.onsubmit = (e) => {
      e.preventDefault();
      const banker = document.getElementById('scheduler-banker');
      const bankerName = banker.options[banker.selectedIndex].text;
      const date = document.getElementById('scheduler-date').value;
      
      alert(`Appointment Booked Successfully:\nConsultation reserved with ${bankerName}.\nDate: ${date}\nAn invite with remote secure conference links has been dispatched.`);
      bankerForm.reset();
    };

    screenshareBtn.onclick = () => {
      screenshareConsole.style.display = 'block';
      screenshareConsole.innerHTML = `[CONNECTING TO RELATIONSHIP AGENT PORTAL...]`;
      
      setTimeout(() => {
        screenshareConsole.innerHTML += `\nESTABLISHING SSL TUNNEL SECURE LINK...`;
      }, 800);
      
      setTimeout(() => {
        screenshareConsole.innerHTML += `\nCO-BROWSING SESSION ACTIVE. AGENT: JUSTIN BEAVER CONNECTED.`;
        screenshareBtn.textContent = "Disconnect Co-Browsing";
        screenshareBtn.style.backgroundColor = "#ef4444";
        screenshareBtn.style.borderColor = "#ef4444";
      }, 1800);
    };

    attachBtn.onclick = () => {
      const progressBox = document.getElementById('support-upload-progress');
      const progressVal = document.getElementById('support-progress-val');
      const progressBar = document.getElementById('support-progress-bar');
      
      progressBox.style.display = 'block';
      let progress = 0;
      
      const interval = setInterval(() => {
        progress += 10;
        progressVal.textContent = `${progress}%`;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            progressBox.style.display = 'none';
            const tickets = JSON.parse(localStorage.getItem(`bbb_tickets_${currentUser}`));
            const activeIndex = 0;
            
            tickets[activeIndex].messages.push({
              sender: "User",
              text: "[Attachment uploaded successfully: audit_ledger_reconciliation_verif.pdf]"
            });
            localStorage.setItem(`bbb_tickets_${currentUser}`, JSON.stringify(tickets));
            
            const chatBox = document.getElementById('chat-messages-box');
            if (chatBox) {
              const div = document.createElement('div');
              div.style.padding = '8px 12px';
              div.style.borderRadius = '4px';
              div.style.maxWidth = '85%';
              div.style.fontSize = '12px';
              div.style.lineHeight = '1.4';
              div.style.alignSelf = 'flex-end';
              div.style.backgroundColor = 'var(--primary-color)';
              div.style.color = '#fff';
              div.style.borderLeft = '3px solid var(--accent-color)';
              div.textContent = `User: [Attachment uploaded successfully: audit_ledger_reconciliation_verif.pdf]`;
              chatBox.appendChild(div);
              chatBox.scrollTop = chatBox.scrollHeight;
            }
            
            showBannerNotification("Audit File uploaded securely to Support Thread.", "success");
          }, 500);
        }
      }, 150);
    };
  }

  // --- BAI2 & MT940 STATEMENT DOWNLOADS ---
  function setupStatementDownloads(username) {
    const btnBai2 = document.getElementById('btn-download-bai2');
    const btnMt940 = document.getElementById('btn-download-mt940');
    
    if (!btnBai2 || !btnMt940) return;

    btnBai2.onclick = () => {
      const txns = JSON.parse(localStorage.getItem(`bbb_txns_${username}`)) || [];
      const now = new Date();
      const today = now.toISOString().slice(2, 10).replace(/-/g, '');
      const time = now.toTimeString().slice(0, 5).replace(/:/g, '');
      
      let file = `01,987654321,BIG BEAVER BANK,${today},${time},1,80,2,1\n`;
      file += `02,122000249,987654321,1,${today},${time},USD,2\n`;
      
      let totalDebit = 0;
      let totalCredit = 0;
      
      txns.forEach((t) => {
        const code = t.type === 'deposit' ? '100' : '400';
        const amt = Math.round(t.amount * 100);
        if (t.type === 'deposit') totalCredit += t.amount;
        else totalDebit += t.amount;
        
        file += `16,${code},${amt},V,${today},0,${t.id},${t.entity.slice(0, 16)}\n`;
      });
      
      const creditCent = Math.round(totalCredit * 100);
      const debitCent = Math.round(totalDebit * 100);
      file += `49,${creditCent},${debitCent}\n`;
      file += `98,${creditCent + debitCent},1,${txns.length + 4}\n`;
      file += `99,${creditCent + debitCent},1,${txns.length + 5}\n`;
      
      downloadFile(file, `reconciliation_bai2_${today}.txt`, 'text/plain');
      showBannerNotification("BAI2 File generated & downloaded.", "success");
    };

    btnMt940.onclick = () => {
      const txns = JSON.parse(localStorage.getItem(`bbb_txns_${username}`)) || [];
      const now = new Date();
      const today = now.toISOString().slice(2, 10).replace(/-/g, '');
      
      let file = `:20:TRSF${Date.now().toString().slice(-7)}\n`;
      file += `:21:BBBREG${today}\n`;
      file += `:25:987654321/000109923\n`;
      file += `:28C:00001\n`;
      file += `:60F:C${today}USD4582912,44\n`;
      
      txns.forEach((t) => {
        const code = t.type === 'deposit' ? 'CR' : 'DR';
        const valDate = today;
        const amtStr = t.amount.toFixed(2).replace('.', ',');
        file += `:61:${valDate}${valDate}${code}${amtStr}NTRF${t.id}\n`;
        file += `:86:${t.desc} // ${t.entity}\n`;
      });
      
      file += `:62F:C${today}USD4582912,44\n`;
      
      downloadFile(file, `reconciliation_mt940_${today}.txt`, 'text/plain');
      showBannerNotification("MT940 Statement generated & downloaded.", "success");
    };

    function downloadFile(content, filename, contentType) {
      const blob = new Blob([content], { type: contentType });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  // Run global timers
  setupMfaSoftToken();
  setupStopPaymentToggles();
});
