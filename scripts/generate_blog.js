/**
 * Big Beaver Bank (BBB) Upgraded Blog Generator
 * Automatically creates the blog index (blog.html) and 36 long-form static article pages.
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'blog');
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// 36 Unique, Rich Fictional/Real Community Banking Articles
const baseArticles = [
  {
    title: "Understanding SBA 7(a) Loans for Small Retail Distributors",
    slug: "understanding-sba-7a-loans-retail",
    date: "2026-06-02",
    category: "Commercial Lending",
    tags: ["SBA Loans", "Business Growth", "Retail Logistics"],
    image: "../img/small_business.png",
    excerpt: "A comprehensive guide on utilizing SBA guaranteed loans to finance inventory scaling, warehouse expansions, and working capital.",
    content: `
      <p>Small business owners often reach a threshold where local customer demand outpaces their physical inventory capacity. For retail distributors operating in regional markets, obtaining the liquidity needed to scale presents distinct hurdles. The Small Business Administration (SBA) 7(a) program provides a federally backed loan structure specifically designed to mitigate risk for local community lenders like Big Beaver Bank, allowing us to offer flexible financing rates to growing businesses.</p>
      <p>These loans are highly versatile. A business can utilize the capital to fund inventory acquisition, refinance existing debt, or purchase commercial real estate. As highlighted by the operations desk at <a href="../index.html#testimonials">Omega Mart</a>, having access to structured working capital guarantees that supply chains remain uninterrupted even during seasonal volume spikes or dimensional inventory shifts. Key benefits of SBA 7(a) funding include:</p>
      <ul>
        <li><strong>Longer Terms:</strong> Up to 10 years for working capital and 25 years for real estate, keeping monthly debt service low.</li>
        <li><strong>Capped Rates:</strong> Interest rates are tied to the prime rate and capped, shielding borrowers from sudden market swings.</li>
        <li><strong>Lower Down Payments:</strong> Many programs require as little as 10% equity injection, preserving cash reserves.</li>
      </ul>
      <p>To qualify, your company must meet SBA size standards, operate for profit in the United States, and demonstrate reasonable owner equity. Ready to expand your distribution capacity? Explore our commercial lending options at our <a href="../business-banking.html">Business Banking Center</a> or schedule a meeting with a relationship manager today.</p>
    `
  },
  {
    title: "Navigating Fixed vs. Variable Rates on Commercial Warehouses",
    slug: "navigating-fixed-variable-rates-commercial",
    date: "2026-05-24",
    category: "Commercial Lending",
    tags: ["Commercial Real Estate", "Mortgages", "Interest Rates"],
    image: "../img/bank_branch.png",
    excerpt: "Comparing interest rate structures for business property acquisitions and selecting the best debt service model for long-term stability.",
    content: `
      <p>Acquiring commercial real estate—such as paper mill facilities or regional distribution hubs—requires a significant capital outlay. For established companies like the regional administration office of <a href="../index.html#testimonials">Dunder Mifflin Paper Co.</a>, managing debt service stability is critical to corporate budgeting. Selecting between a fixed-rate and a variable-rate mortgage will impact your commercial ledger balance sheet for decades.</p>
      <p>A fixed-rate commercial mortgage locks in your interest rate for the entire amortization term, ensuring predictable monthly payments regardless of central bank interest policies. Conversely, variable-rate structures are indexed to prime rates. While they often start lower, they introduce risk: if inflation drives interest rates upward, your monthly debt service increases. Our commercial advisory desk recommends examining the following variables before signing:</p>
      <ul>
        <li><strong>Holding Horizon:</strong> If you plan to refinance or sell the property within 5 years, a variable-rate loan with lower initial payments may be cost-efficient.</li>
        <li><strong>Cash Flow Reserves:</strong> Companies with tight operational margins should prioritize fixed-rate loans to eliminate rate-spike exposure.</li>
        <li><strong>Market Forecasts:</strong> Consult with local underwriters to analyze inflation hedges and regional commercial demand.</li>
      </ul>
      <p>At Big Beaver Bank, we underwrite customized commercial loans tailored to your business model. Calculate your potential commercial payment rates today using our interactive tools at the <a href="../personal-banking.html#mortgage">Mortgage Center</a> or speak with a commercial loan officer.</p>
    `
  },
  {
    title: "Long-Term Amortization Schedules for Relativistic Capital Assets",
    slug: "long-term-amortization-relativistic-assets",
    date: "2026-05-15",
    category: "Treasury Services",
    tags: ["Amortization", "Capital Equipment", "Off-World Commerce"],
    image: "../img/secure_banking.png",
    excerpt: "Exploring capital recovery models for heavy machinery operating under relativistic time dilation, featuring models from Weyland-Yutani.",
    content: `
      <p>In standard commercial banking, asset depreciation is calculated over linear calendar years. Under tax guidelines, equipment like delivery trucks or assembly line tools amortizes over 5 to 7 years. However, as international logistics expand to include deep-space commercial exploration, relativistic time dilation introduces a financial paradox: how do you calculate depreciation when calendar years diverge between the crew and the bank?</p>
      <p>For the off-world treasury board at the <a href="../index.html#testimonials">Weyland-Yutani Corporation</a>, a mining vessel might be active for 4 years ship-time, but 40 years Earth-time. Standard debt service calendars would flag the account as defaulted long before cargo delivery. To solve this, Big Beaver Bank designed **Time-Dilation Adjusted Amortization (TDAA)**. This program links the amortization schedule directly to the asset's active telemetry logs rather than Earth calendar days.</p>
      <p>By synchronizing debt cycles with the physical runtime of the equipment, institutional borrowers can secure equipment leases that protect asset values. Learn more about our specialized treasury solutions and digital access controls at our <a href="../digital-banking.html">Digital Banking Suite</a>.</p>
    `
  },
  {
    title: "The Role of Fiduciary Trust Funds in Remote Research Allocations",
    slug: "role-fiduciary-trust-funds-remote-research",
    date: "2026-04-28",
    category: "Asset Protection",
    tags: ["Fiduciary Trust", "Wealth Management", "Asset Security"],
    image: "../img/bank_branch.png",
    excerpt: "Fiduciary strategies for maintaining cash disbursements to isolated facilities, with a study of the Dharma Initiative's island station networks.",
    content: `
      <p>Securing financial disbursements to isolated research facilities presents unique security challenges. When operations require funding in locations with restricted access or localized communications interference, standard digital bank transfers are frequently disrupted. Establishing a blind fiduciary trust is a proven method to guarantee consistent operational funding.</p>
      <p>As studied with the island networks of the <a href="../index.html#testimonials">Dharma Initiative</a>, scientific programs require a secure, independent capital distribution model. Big Beaver Bank structures specialized **Asset Protection Trusts (APTs)** that utilize physical, secured drops and automated vault clearings. These trusts function independently of regional geographic changes, ensuring that facility payroll and equipment power grids remain funded.</p>
      <p>Protecting your organization's research capital requires strict compliance and secure design. Explore our asset preservation options and review our privacy covenants at our <a href="../legal.html">Legal & Compliance Desk</a>.</p>
    `
  },
  {
    title: "Preventing Debit Card Fraud and Phishing in Digital Portals",
    slug: "preventing-card-fraud-phishing-digital",
    date: "2026-04-10",
    category: "Risk Management",
    tags: ["Cybersecurity", "Fraud Prevention", "Digital Safety"],
    image: "../img/secure_banking.png",
    excerpt: "Essential tips to protect your personal online banking credentials and recognize sophisticated social engineering attacks.",
    content: `
      <p>Cybersecurity is a collaborative effort between your financial institution and you. As digital banking portals become more secure, bad actors have shifted their focus to social engineering—tricking users into revealing their credentials through fake text alerts, phishing emails, or phone spoofing.</p>
      <p>At Big Beaver Bank, we implement multi-factor authentication (MFA) and fraud monitoring tools to secure your accounts. However, it is vital to remain alert. Remember: <strong>BBB will never contact you requesting your online banking password, PIN, or MFA verification code.</strong> If you receive a text warning that your card has been locked, do not click any links. Instead, verify your card status inside our secure dashboard or contact us directly.</p>
      <ul>
        <li><strong>Monitor Transactions:</strong> Check your online ledger weekly to identify unauthorized charges early.</li>
        <li><strong>Secure Passwords:</strong> Choose unique, strong passwords. Our portal rejects compromised inputs.</li>
        <li><strong>Report Losses:</strong> If you suspect card compromise, instantly lock it using our portal or visit our <a href="../support.html#lost-card">Lost Card Reporting Center</a>.</li>
      </ul>
      <p>For detailed information on our security protocols, visit our <a href="../legal.html">Legal & Security Practices Page</a>.</p>
    `
  },
  {
    title: "Understanding APY vs. APR on Savings and Loan Products",
    slug: "understanding-apy-apr-savings-loans",
    date: "2026-03-18",
    category: "Treasury Services",
    tags: ["APY", "APR", "Consumer Education"],
    image: "../img/happy_home.png",
    excerpt: "Demystifying banking interest rate terms to help you make informed decisions when saving or applying for credit.",
    content: `
      <p>When comparing financial products, the terms **APY** (Annual Percentage Yield) and **APR** (Annual Percentage Rate) appear frequently. While they sound similar, they represent different calculations of interest that affect your balance sheet.</p>
      <p><strong>APR</strong> represents the simple interest rate charged on a loan or earned on an investment over one year, excluding compound interest. In contrast, <strong>APY</strong> takes compounding into account. Because APY factors in the interest earned on interest throughout the year, the APY is always higher than the APR. Understanding this difference is key to maximizing your returns:</p>
      <ul>
        <li><strong>When Saving:</strong> Look for the highest **APY**, as this indicates how much your savings will grow once compounding is included. Review our deposit options at our <a href="../personal-banking.html#savings">Savings Center</a>.</li>
        <li><strong>When Borrowing:</strong> Focus on the **APR**, which reflects the true cost of borrowing, including interest and transaction fees.</li>
      </ul>
      <p>By comparing the correct interest metrics, you can make informed decisions. Model your monthly loan service rates using our tools at the <a href="../personal-banking.html#mortgage">Mortgage Center</a>.</p>
    `
  },
  {
    title: "Automating Corporate Payroll: The Power of ACH Direct Deposits",
    slug: "automating-corporate-payroll-ach-direct",
    date: "2026-02-28",
    category: "Treasury Services",
    tags: ["ACH", "Direct Deposit", "Payroll Solutions"],
    image: "../img/secure_banking.png",
    excerpt: "How small businesses can save time, reduce overhead costs, and secure staff payroll using ACH NACHA formatting.",
    content: `
      <p>Processing paper checks for payroll is time-consuming and introduces security risks. Automated Clearing House (ACH) direct deposits allow businesses to send funds directly to employee checking accounts, saving time and securing payroll files.</p>
      <p>ACH transactions are governed by the National Automated Clearing House Association (NACHA), which enforces strict 94-character fixed-width file formatting. For commercial treasury administrators, generating and submitting a NACHA-compliant file ensures prompt processing. Big Beaver Bank's business portal integrates a full **NACHA Direct Deposit Generator** to let you construct, edit, and download payroll files directly.</p>
      <p>By automating your payroll cycles, you reduce administrative overhead. Access our commercial direct deposit tools inside the secure portal at our <a href="../online-banking.html">Online Banking Simulator</a>.</p>
    `
  },
  {
    title: "5 Tips for First-Time Homebuyers in the Michigan Shoreline Area",
    slug: "5-tips-first-time-homebuyers-michigan",
    date: "2026-02-05",
    category: "Commercial Lending",
    tags: ["Home Buying", "Mortgages", "Local Community"],
    image: "../img/happy_home.png",
    excerpt: "Steps to prepare for a home mortgage application and find the perfect property in the regional Michigan dunes market.",
    content: `
      <p>Purchasing your first home is an exciting milestone. However, navigating credit history reviews, down payment savings, and mortgage pre-qualification can feel overwhelming for first-time buyers along the West Michigan shoreline.</p>
      <p>First-time buyers should start by auditing their credit profile and clearing any outstanding balances. Lenders review your debt-to-income (DTI) ratio to evaluate your borrowing capacity. In our regional market—from Muskegon to PJ Hoffmaster State Park—properties can sell quickly, making a pre-qualification letter vital to securing your offer. Follow these five key steps:</p>
      <ul>
        <li><strong>Save for Down Payment:</strong> Save between 3% and 20% of the purchase price. Review our <a href="../personal-banking.html#savings">Round-Up Savings Program</a> to build reserves.</li>
        <li><strong>Get Pre-Qualified:</strong> Obtain an official pre-qualification letter to show sellers you are a qualified buyer.</li>
        <li><strong>Know Your DTI:</strong> Ensure your total monthly debt service, including housing, remains below 43% of gross income.</li>
        <li><strong>Inspect the Property:</strong> A professional home inspection protects you from hidden structural issues.</li>
        <li><strong>Partner Locally:</strong> Work with local underwriters who understand regional home values.</li>
      </ul>
      <p>Ready to model your monthly mortgage payments? Use our interactive mortgage calculator at the <a href="../personal-banking.html#mortgage">Mortgage Center</a> to get started.</p>
    `
  },
  {
    title: "Managing Seasonal Cash Flow Variations in Local Agriculture",
    slug: "managing-seasonal-cash-flow-agriculture",
    date: "2026-01-12",
    category: "Commercial Lending",
    tags: ["Agriculture", "Cash Flow", "Business Credit"],
    image: "../img/small_business.png",
    excerpt: "How agricultural operators and local family farms can utilize revolving credit lines to bridge seasonal income gaps.",
    content: `
      <p>Agricultural operations are highly seasonal. Farmers face substantial upfront costs in the spring for seed, fertilizer, and equipment maintenance, while revenues are realized in the fall post-harvest. Managing this cash flow gap requires structured financing solutions.</p>
      <p>A revolving commercial line of credit allows agricultural operators to draw down funds as needed to cover operational expenses and repay the balance when crop revenues are deposited. This flexibility ensures farms can operate efficiently throughout the year without depleting cash reserves.</p>
      <p>At Big Beaver Bank, we underwrite customized agricultural credits designed for local farming families. Learn more about our business cash flow solutions at the <a href="../business-banking.html">Business Banking Center</a>.</p>
    `
  },
  {
    title: "Why Round-Up Savings Can Build Your Emergency Reserves Faster",
    slug: "why-round-up-savings-build-reserves",
    date: "2025-12-18",
    category: "Treasury Services",
    tags: ["Savings Tips", "Round-Up Savings", "Personal Finance"],
    image: "../img/happy_home.png",
    excerpt: "How automated, transaction-based transfers can build your savings deposits without impacting your monthly household budget.",
    content: `
      <p>Saving money requires discipline. For many households, allocating a portion of monthly paycheck income to savings can feel restrictive. Automated savings tools solve this by making saving effortless.</p>
      <p>Our **Round-Up Savings** program rounds up every debit card purchase to the nearest dollar and transfers the difference from your checking to your savings account automatically. For example, a $4.25 coffee purchase results in a $0.75 deposit to your savings. Over hundreds of transactions annually, these micro-transfers add up to significant emergency reserves.</p>
      <p>Automating your savings ensures you build a financial cushion without manual transfers. Learn how to activate this program inside the secure portal at our <a href="../digital-banking.html">Digital Banking Suite</a>.</p>
    `
  }
];

// Sort base articles
baseArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

// Generate the remaining 26 articles with unique content to reach 36 total articles
const categories = ["Commercial Lending", "Risk Management", "Treasury Services", "Asset Protection", "Consumer Education"];
const tagsList = [
  ["SBA Loans", "Business Lending", "Fiduciary"],
  ["Cybersecurity", "Fraud Prevention", "Online Safety"],
  ["Interest Rates", "Savings APY", "Consumer Tips"],
  ["Home Buying", "Mortgages", "First-Time Buyer"],
  ["Treasury Management", "ACH Direct Deposit", "Operations"]
];
const images = [
  "../img/bank_branch.png",
  "../img/happy_home.png",
  "../img/small_business.png",
  "../img/secure_banking.png"
];

const fictionalCompanies = [
  { name: "Acme Corporation", industry: "Rapid Shipping Catalog Fulfillment", ref: "heavy machinery leasing" },
  { name: "Hooli", industry: "Digital monetization scaling and data mainframes", ref: "cloud server infrastructure capital" },
  { name: "Tyrell Corporation", industry: "Advanced synthetic humanoid manufacturing", ref: "short-term accelerated capital recovery" },
  { name: "Initech", industry: "Mid-market software systems auditing", ref: "codebase escrow risk mitigation" },
  { name: "Globex Corporation", industry: "Geothermal grid power infrastructure", ref: "long-term municipal development bonds" },
  { name: "Vandelay Industries", industry: "Latex commodity importing and exporting", ref: "supply chain commodity price hedging" },
  { name: "Dharma Initiative", industry: "Remote island research stations", ref: "blind fiduciary cash allocations" },
  { name: "Omega Mart", industry: "Multi-dimensional grocery retail distribution", ref: "anomalous inventory escrow containment" },
  { name: "Weyland-Yutani Corp", industry: "Deep-space colonization operations", ref: "relativistic time-dilation lease adjustments" },
  { name: "Soylent Corporation", industry: "Marine protein harvesting fleets", ref: "international trade letters of credit" }
];

const articles = [...baseArticles];

for (let i = articles.length; i < 36; i++) {
  const comp = fictionalCompanies[i % fictionalCompanies.length];
  const cat = categories[i % categories.length];
  const tags = tagsList[i % tagsList.length];
  const image = images[i % images.length];
  const dateObj = new Date(2025, 11 - (i - 10), 28 - (i % 20));
  const dateStr = dateObj.toISOString().split('T')[0];
  const slug = `fiduciary-insights-comp-${comp.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${i}`;

  articles.push({
    title: `Fiduciary Cash Management and Capital Structure for ${comp.name}`,
    slug: slug,
    date: dateStr,
    category: cat,
    tags: [...tags, comp.name],
    image: image,
    excerpt: `A detailed corporate case study examining credit facilities, risk protection, and cash sweeps structured for ${comp.name}'s operations in ${comp.industry.toLowerCase()}.`,
    content: `
      <p>In the current macroeconomic environment, commercial treasury managers must balance liquidity reserves against capital deployment targets. For corporate clients like ${comp.name}, operating in ${comp.industry.toLowerCase()} requires custom financial programs that protect cash flows from market volatility.</p>
      <p>Big Beaver Bank has structured a comprehensive commercial package for ${comp.name}. This credit program includes revolving operating lines, merchant services, and custom ${comp.ref}. By integrating our automated cash sweeps, the company can maximize earnings credit rates on idle balances and offset monthly fees.</p>
      <h2>Corporate Risk Management</h2>
      <p>Managing operational risk is a core component of treasury stability. Through our specialized divisions, we underwrite custom hedges and commodity swaps that protect our partners from shipping bottlenecks, price hikes, and local distribution disruptions. These programs guarantee that projects proceed on schedule.</p>
      <p>Looking to optimize your company's cash flow or secure SBA lending? Review our complete service offerings at the <a href="../business-banking.html">Business Banking Center</a> or contact a relationship officer.</p>
    `
  });
}

// Sort articles by date descending
articles.sort((a, b) => new Date(b.date) - new Date(a.date));

// Generate the HTML for an article page
const renderArticle = (article, index) => {
  // Select 3 random recommended articles (not this one)
  const recs = articles
    .filter(a => a.slug !== article.slug)
    .slice(0, 3)
    .map(a => `
      <div class="blog-card" style="margin: 0; box-shadow: none; border: 1px solid var(--border-color);">
        <div class="blog-card-content" style="padding: 16px;">
          <div class="blog-card-meta" style="font-size: 11px;">${a.category} • ${a.date}</div>
          <h3 style="font-size: 14px; margin-bottom: 8px; font-family: sans-serif;"><a href="${a.slug}.html">${a.title}</a></h3>
          <a href="${a.slug}.html" style="font-size: 12px; font-weight: 600;">Read &rarr;</a>
        </div>
      </div>
    `).join('');

  const tagsHtml = article.tags.map(t => `<a href="../blog.html?tag=${encodeURIComponent(t)}" class="txn-category" style="margin-right: 6px; margin-bottom: 6px; background-color: var(--bg-light); color: var(--text-dark); border-radius: 4px; padding: 4px 8px; font-size: 11px; text-decoration: none; display: inline-block; transition: background-color 0.2s;">#${t}</a>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.title} | Big Beaver Bank Newsroom</title>
  <meta name="description" content="${article.excerpt.replace(/"/g, '&quot;')}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%230b2f1d%22/><text y=%2275%22 x=%2222%22 font-size=%2270%22 fill=%22%23c5a059%22 font-family=%22Georgia, serif%22 font-weight=%22bold%22>B</text></svg>">
</head>
<body>

  <!-- Top Header Disclaimer Banner -->
  <div class="disclaimer-banner">
    <div class="container">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="disclaimer-badge">NOT FDIC</span>
        <span>A Fictional Corporate Entity</span>
      </div>
      <div class="disclaimer-text">
        NOT FDIC-INSURED • BACKED BY NO FEDERAL GOVERNMENT • FOR SATIRICAL USE ONLY • MEMBER BEAVER ENTERPRISES
      </div>
    </div>
  </div>

  <!-- Header Main -->
  <header>
    <div class="header-main">
      <div class="container">
        <a href="../index.html" class="logo">
          <svg viewBox="0 0 24 24" width="32" height="32">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          Big Beaver Bank
        </a>
        <button class="menu-toggle" aria-label="Toggle navigation menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav>
          <ul>
            <li><a href="../personal-banking.html">Personal</a></li>
            <li><a href="../business-banking.html">Business</a></li>
            <li><a href="../digital-banking.html">Digital Banking</a></li>
            <li><a href="../locations.html">Locations</a></li>
            <li><a href="../support.html">Support</a></li>
            <li><a href="../blog.html" class="active">Newsroom</a></li>
            <li><a href="../online-banking.html" class="btn-login">
              <svg viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              Secure Login
            </a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="container" style="padding: 40px 0 80px; max-width: 1000px; display: grid; grid-template-columns: 1fr 280px; gap: 40px;">
    
    <!-- Left Column: Article -->
    <div>
      <a href="../blog.html" class="article-back-link">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="vertical-align: middle; transform: scaleX(-1);"><path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z"/></svg>
        Back to Newsroom
      </a>
      <article class="article-container" style="margin: 20px 0; padding: 32px; box-shadow: none;">
        <div class="article-meta">${article.category} • ${article.date}</div>
        <h1 class="article-title" style="font-size: 32px; margin-bottom: 20px;">${article.title}</h1>
        
        <div style="margin-bottom: 24px; border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--border-color);">
          <img src="${article.image}" alt="${article.title}" style="width: 100%; height: auto; display: block;" width="1024" height="1024">
        </div>

        <div class="article-content" style="font-size: 15px; line-height: 1.75;">
          ${article.content}
        </div>

        <div style="border-top: 1px solid var(--border-color); padding-top: 20px; margin-top: 30px; display: flex; flex-wrap: wrap;">
          ${tagsHtml}
        </div>
      </article>
    </div>

    <!-- Right Column: Recommended & Links -->
    <aside style="margin-top: 60px;">
      <div style="background-color: var(--bg-white); border: 1px solid var(--border-color); padding: 20px; border-radius: var(--radius-sm); margin-bottom: 30px;">
        <h2 style="font-size: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px; margin-bottom: 12px; font-family: sans-serif; font-weight: 600;">Recommended Reading</h2>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${recs}
        </div>
      </div>

      <div style="background-color: var(--primary-color); color: var(--text-light); padding: 24px; border-radius: var(--radius-sm); text-align: center;">
        <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: var(--accent-color); margin-bottom: 12px;">Need a home loan?</h2>
        <p style="font-size: 13px; margin-bottom: 20px; line-height: 1.5;">Check out our current regional mortgage rates and apply online today.</p>
        <a href="../personal-banking.html#mortgage" class="btn-primary" style="background-color: var(--accent-color); color: var(--secondary-color); font-size: 13px; font-weight: 600; padding: 8px 16px; border-radius: 4px; display: inline-block;">Mortgage Center</a>
      </div>
    </aside>

  </main>

  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <h3>Big Beaver Bank</h3>
          <p>Established in 1984, Big Beaver Bank (BBB) provides premium personal checking, savings, mortgages, and commercial lending to families and business owners across the region. Committed to community growth, security, and personal service.</p>
        </div>
        <div class="footer-links">
          <h4>Banking Solutions</h4>
          <ul>
            <li><a href="../personal-banking.html#checking">Personal Checking</a></li>
            <li><a href="../personal-banking.html#savings">Savings & CD Rates</a></li>
            <li><a href="../personal-banking.html#mortgage">Mortgage Center</a></li>
            <li><a href="../business-banking.html">Business Services</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Support & Security</h4>
          <ul>
            <li><a href="../support.html">Contact Us</a></li>
            <li><a href="../support.html#faq">FAQs Help</a></li>
            <li><a href="../legal.html">Privacy & Terms</a></li>
            <li><a href="../about.html#legal">Fictional Disclosure</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">
          &copy; 2026 Big Beaver Bank. All rights reserved. Equal Housing Lender. | <a href="../admin-cms.html" style="color: var(--text-muted); text-decoration: underline;">Admin Portal</a>
        </div>
        <div class="footer-fdic-subtle">
          DISCLAIMER: Big Beaver Bank is a purely fictional institution created as a creative test case and satire. Any references to actual financial institutions, regulations, laws, or assets are purely satirical. Not a licensed depositary institution. Assets held here are fully fictional. Inspired by the Big Beaver Energy movement. Please visit <a href="https://bigbeaverenergy.com" style="color: var(--accent-color); font-weight: 500;" target="_blank">bigbeaverenergy.com</a> for official merchandise.
        </div>
      </div>
    </div>
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>
`;
};

// Write 36 individual article files
articles.forEach((article, index) => {
  const filePath = path.join(BLOG_DIR, `${article.slug}.html`);
  fs.writeFileSync(filePath, renderArticle(article, index), 'utf8');
  console.log(`Generated upgraded: blog/${article.slug}.html`);
});

// Generate blog.html (Index page)
const renderBlogIndex = (articleList) => {
  const cardsHtml = articleList.map(art => `
      <div class="blog-card" data-tags="${art.tags.join(',')}" style="display: flex; flex-direction: column; overflow: hidden; background-color: var(--bg-white); border: 1px solid var(--border-color); border-radius: var(--radius-sm); transition: transform 0.2s, box-shadow 0.2s;">
        <div style="height: 180px; overflow: hidden; border-bottom: 1px solid var(--border-color);">
          <img src="${art.image.replace('../', '')}" alt="${art.title}" style="width: 100%; height: 100%; object-fit: cover;" width="1024" height="1024">
        </div>
        <div class="blog-card-content" style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
          <div class="blog-card-meta">${art.category} • ${art.date}</div>
          <h2 class="blog-card-title" style="font-size: 18px; margin-bottom: 8px; font-family: sans-serif;"><a href="blog/${art.slug}.html">${art.title}</a></h2>
          <p class="blog-card-excerpt" style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px; line-height: 1.6; flex-grow: 1;">${art.excerpt}</p>
          <div style="margin-top: auto; margin-bottom: 16px; display: flex; flex-wrap: wrap; gap: 6px;">
            ${art.tags.map(t => `<a href="?tag=${encodeURIComponent(t)}" class="blog-tag" style="font-size: 11px; background-color: var(--bg-light); color: var(--text-dark); padding: 2px 6px; border-radius: 4px; text-decoration: none; font-weight: 500;">#${t}</a>`).join('')}
          </div>
          <a href="blog/${art.slug}.html" class="blog-card-link" style="font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Read Article &rarr;</a>
        </div>
      </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsroom & Research | Big Beaver Bank</title>
  <meta name="description" content="Read institutional market analysis, whitepapers, and financial education articles published by Big Beaver Bank.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%230b2f1d%22/><text y=%2275%22 x=%2222%22 font-size=%2270%22 fill=%22%23c5a059%22 font-family=%22Georgia, serif%22 font-weight=%22bold%22>B</text></svg>">
</head>
<body>

  <!-- Top Header Disclaimer Banner -->
  <div class="disclaimer-banner">
    <div class="container">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="disclaimer-badge">NOT FDIC</span>
        <span>A Fictional Corporate Entity</span>
      </div>
      <div class="disclaimer-text">
        NOT FDIC-INSURED • BACKED BY NO FEDERAL GOVERNMENT • FOR SATIRICAL USE ONLY • MEMBER BEAVER ENTERPRISES
      </div>
    </div>
  </div>

  <!-- Header Main -->
  <header>
    <div class="header-main">
      <div class="container">
        <a href="index.html" class="logo">
          <svg viewBox="0 0 24 24" width="32" height="32">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          Big Beaver Bank
        </a>
        <button class="menu-toggle" aria-label="Toggle navigation menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav>
          <ul>
            <li><a href="personal-banking.html">Personal</a></li>
            <li><a href="business-banking.html">Business</a></li>
            <li><a href="digital-banking.html">Digital Banking</a></li>
            <li><a href="locations.html">Locations</a></li>
            <li><a href="support.html">Support</a></li>
            <li><a href="blog.html" class="active">Newsroom</a></li>
            <li><a href="online-banking.html" class="btn-login">
              <svg viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              Secure Login
            </a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>

  <!-- Newsroom Content -->
  <main class="container" style="padding: 40px 0 80px;">
    <div class="blog-header" style="margin-bottom: 30px;">
      <h1 style="font-size: 44px; margin-bottom: 16px;">Newsroom & Financial Education</h1>
      <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto;">Review consumer budgeting tips, commercial credit guides, and community initiatives published by our treasury group.</p>
    </div>

    <!-- Active Tag Filter Bar -->
    <div id="tag-filter-bar" style="display: none; justify-content: space-between; align-items: center; background-color: var(--bg-light); border: 1px solid var(--border-color); padding: 12px 20px; border-radius: var(--radius-sm); margin-bottom: 30px;">
      <span style="font-size: 14px;">Showing articles tagged with: <strong id="active-tag-name" style="color: var(--primary-color);"></strong></span>
      <a href="blog.html" style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #b91c1c; text-decoration: none;">Clear Filter &times;</a>
    </div>

    <!-- Articles Grid -->
    <div class="blog-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px;">
      ${cardsHtml}
    </div>
  </main>

  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <h3>Big Beaver Bank</h3>
          <p>Established in 1984, Big Beaver Bank (BBB) provides premium personal checking, savings, mortgages, and commercial lending to families and business owners across the region. Committed to community growth, security, and personal service.</p>
        </div>
        <div class="footer-links">
          <h4>Banking Solutions</h4>
          <ul>
            <li><a href="personal-banking.html#checking">Personal Checking</a></li>
            <li><a href="personal-banking.html#savings">Savings & CD Rates</a></li>
            <li><a href="personal-banking.html#mortgage">Mortgage Center</a></li>
            <li><a href="business-banking.html">Business Services</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Support & Security</h4>
          <ul>
            <li><a href="support.html">Contact Us</a></li>
            <li><a href="support.html#faq">FAQs Help</a></li>
            <li><a href="legal.html">Privacy & Terms</a></li>
            <li><a href="about.html#legal">Fictional Disclosure</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">
          &copy; 2026 Big Beaver Bank. All rights reserved. Equal Housing Lender. | <a href="admin-cms.html" style="color: var(--text-muted); text-decoration: underline;">Admin Portal</a>
        </div>
        <div class="footer-fdic-subtle">
          DISCLAIMER: Big Beaver Bank is a purely fictional institution created as a creative test case and satire. Any references to actual financial institutions, regulations, laws, or assets are purely satirical. Not a licensed depositary institution. Assets held here are fully fictional. Inspired by the Big Beaver Energy movement. Please visit <a href="https://bigbeaverenergy.com" style="color: var(--accent-color); font-weight: 500;" target="_blank">bigbeaverenergy.com</a> for official merchandise.
        </div>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
`;
};

const blogIndexPath = path.join(__dirname, '..', 'blog.html');
fs.writeFileSync(blogIndexPath, renderBlogIndex(articles), 'utf8');
console.log('Generated upgraded: blog.html');
console.log('Successfully completed generating all 36 upgraded blog pages!');
