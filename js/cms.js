/**
 * Big Beaver Bank (BBB) - Administrative CMS Console Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Compromised Password Registry
  const COMPROMISED_PASSWORDS = [
    'password', '123456', '12345678', '12345', '123456789', 'admin', '1234', 
    'administrator', 'secret', 'qwerty', 'letmein', 'security', 'welcome',
    'pass123', 'admin123', 'root', 'beaver', 'bigbeaver'
  ];

  // Fictional Blog Roster for CMS Editor
  const blogRoster = [
    {
      slug: "understanding-sba-7a-loans-retail",
      title: "Understanding SBA 7(a) Loans for Small Retail Distributors",
      category: "Commercial Lending",
      tags: "SBA Loans, Business Growth, Retail Logistics",
      content: "Small business owners often reach a threshold where local customer demand outpaces their physical inventory capacity. For retail distributors operating in regional markets, obtaining the liquidity needed to scale presents distinct hurdles. The Small Business Administration (SBA) 7(a) program provides a federally backed loan structure specifically designed to mitigate risk for local community lenders..."
    },
    {
      slug: "navigating-fixed-variable-rates-commercial",
      title: "Navigating Fixed vs. Variable Rates on Commercial Warehouses",
      category: "Commercial Lending",
      tags: "Commercial Real Estate, Mortgages, Interest Rates",
      content: "Acquiring commercial real estate—such as paper mill facilities or regional distribution hubs—requires a significant capital outlay. For established companies like the regional administration office of Dunder Mifflin Paper Co., managing debt service stability is critical to corporate budgeting. Selecting between a fixed-rate and a variable-rate mortgage will impact your commercial ledger balance sheet for decades..."
    },
    {
      slug: "long-term-amortization-relativistic-assets",
      title: "Long-Term Amortization Schedules for Relativistic Capital Assets",
      category: "Treasury Services",
      tags: "Amortization, Capital Equipment, Off-World Commerce",
      content: "In standard commercial banking, asset depreciation is calculated over linear calendar years. Under tax guidelines, equipment like delivery trucks or assembly line tools amortizes over 5 to 7 years. However, as international logistics expand to include deep-space commercial exploration, relativistic time dilation introduces a financial paradox: how do you calculate depreciation when calendar years diverge..."
    },
    {
      slug: "role-fiduciary-trust-funds-remote-research",
      title: "The Role of Fiduciary Trust Funds in Remote Research Allocations",
      category: "Asset Protection",
      tags: "Fiduciary Trust, Wealth Management, Asset Security",
      content: "Securing financial disbursements to isolated research facilities presents unique security challenges. When operations require funding in locations with restricted access or localized communications interference, standard digital bank transfers are frequently disrupted. Establishing a blind fiduciary trust is a proven method to guarantee consistent operational funding..."
    },
    {
      slug: "preventing-card-fraud-phishing-digital",
      title: "Preventing Debit Card Fraud and Phishing in Digital Portals",
      category: "Risk Management",
      tags: "Cybersecurity, Fraud Prevention, Digital Safety",
      content: "Cybersecurity is a collaborative effort between your financial institution and you. As digital banking portals become more secure, bad actors have shifted their focus to social engineering—tricking users into revealing their credentials through fake text alerts, phishing emails, or phone spoofing..."
    },
    {
      slug: "understanding-apy-apr-savings-loans",
      title: "Understanding APY vs. APR on Savings and Loan Products",
      category: "Treasury Services",
      tags: "APY, APR, Consumer Education",
      content: "When comparing financial products, the terms APY (Annual Percentage Yield) and APR (Annual Percentage Rate) appear frequently. While they sound similar, they represent different calculations of interest that affect your balance sheet..."
    },
    {
      slug: "automating-corporate-payroll-ach-direct",
      title: "Automating Corporate Payroll: The Power of ACH Direct Deposits",
      category: "Treasury Services",
      tags: "ACH, Direct Deposit, Payroll Solutions",
      content: "Processing paper checks for payroll is time-consuming and introduces security risks. Automated Clearing House (ACH) direct deposits allow businesses to send funds directly to employee checking accounts, saving time and securing payroll files..."
    }
  ];

  // DOM Elements
  const loginContainer = document.getElementById('login-container');
  const dashboardContainer = document.getElementById('dashboard-container');
  const loginForm = document.getElementById('cms-login-form');
  const usernameInput = document.getElementById('cms-username');
  const passwordInput = document.getElementById('cms-password');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');
  const adminDisplayName = document.getElementById('admin-display-name');

  // Sidebar Tabs
  const menuButtons = document.querySelectorAll('.cms-menu-item button');
  const tabPanes = document.querySelectorAll('.cms-tab-pane');

  // Blog Editor Elements
  const articleSelector = document.getElementById('blog-article-selector');
  const articleTitleInput = document.getElementById('blog-article-title');
  const articleCategoryInput = document.getElementById('blog-article-category');
  const articleTagsInput = document.getElementById('blog-article-tags');
  const articleContentTextarea = document.getElementById('blog-article-content');

  // Forms and Modals
  const cmsForms = document.querySelectorAll('.cms-form');
  const complianceModal = document.getElementById('compliance-modal');
  const complianceRefId = document.getElementById('compliance-ref-id');
  const modalAcknowledgeBtn = document.getElementById('modal-acknowledge-btn');

  // --- SESSION CHECK ---
  const activeSession = localStorage.getItem('bbb_admin_active_session');
  if (activeSession) {
    loginAdminUser(activeSession);
  } else {
    showLogin();
  }

  // --- LOGIN FORM SUBMISSION ---
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = usernameInput.value.trim().toLowerCase();
      const password = passwordInput.value;

      let registry = JSON.parse(localStorage.getItem('bbb_admin_users') || '{}');

      if (registry[username]) {
        if (registry[username] === password) {
          loginAdminUser(username);
        } else {
          showError("Access Denied: Invalid credentials for administrative console session.");
        }
      } else {
        // Auto-register new admin if password is strong
        const cleanPass = password.trim().toLowerCase();
        if (COMPROMISED_PASSWORDS.includes(cleanPass)) {
          showError("Security Alert: Credential strength threshold not met. Use a stronger password.");
          return;
        }

        registry[username] = password;
        localStorage.setItem('bbb_admin_users', JSON.stringify(registry));
        loginAdminUser(username);
      }
    });
  }

  // --- LOGOUT CLICK ---
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('bbb_admin_active_session');
      showLogin();
    });
  }

  // --- TAB NAVIGATION ---
  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button classes
      menuButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Toggle pane visibility
      const paneId = btn.getAttribute('data-pane');
      tabPanes.forEach(pane => {
        if (pane.id === paneId) {
          pane.style.display = 'block';
        } else {
          pane.style.display = 'none';
        }
      });
    });
  });

  // --- BLOG ARTICLE DROP-DOWN PREPOPULATION ---
  if (articleSelector) {
    blogRoster.forEach((art, idx) => {
      const option = document.createElement('option');
      option.value = art.slug;
      option.textContent = art.title;
      articleSelector.appendChild(option);
    });

    // Load initial article details
    loadArticleToEditor(blogRoster[0].slug);

    // Load selected article details on change
    articleSelector.addEventListener('change', (e) => {
      loadArticleToEditor(e.target.value);
    });
  }

  function loadArticleToEditor(slug) {
    const art = blogRoster.find(a => a.slug === slug);
    if (art) {
      articleTitleInput.value = art.title;
      articleCategoryInput.value = art.category;
      articleTagsInput.value = art.tags;
      articleContentTextarea.value = art.content;
    }
  }

  // --- FORM SUBMISSIONS (TRIGGER COMPLIANCE MODAL) ---
  cmsForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Generate unique case ID
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const refId = `BBB-CMS-2026-${randomNum}`;
      
      // Update modal and show
      if (complianceRefId && complianceModal) {
        complianceRefId.textContent = refId;
        complianceModal.style.display = 'flex';
      }
    });
  });

  // --- CLOSE MODAL ---
  if (modalAcknowledgeBtn) {
    modalAcknowledgeBtn.addEventListener('click', () => {
      if (complianceModal) {
        complianceModal.style.display = 'none';
      }
    });
  }

  // --- HELPERS ---
  function loginAdminUser(username) {
    localStorage.setItem('bbb_admin_active_session', username);
    if (adminDisplayName) adminDisplayName.textContent = username;
    
    if (loginContainer) loginContainer.style.display = 'none';
    if (dashboardContainer) dashboardContainer.style.display = 'block';
  }

  function showLogin() {
    if (loginContainer) loginContainer.style.display = 'block';
    if (dashboardContainer) dashboardContainer.style.display = 'none';
    if (loginError) loginError.style.display = 'none';
    
    // Clear forms
    if (usernameInput) usernameInput.value = '';
    if (passwordInput) passwordInput.value = '';
  }

  function showError(msg) {
    if (loginError) {
      loginError.textContent = msg;
      loginError.style.display = 'block';
    }
  }
});
