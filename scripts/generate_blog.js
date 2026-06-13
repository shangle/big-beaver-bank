/**
 * Big Beaver Bank (BBB) Blog Generator
 * Automatically creates the blog index (blog.html) and 36 static article pages.
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'blog');
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// 36 Satirical Articles
const articles = [
  {
    title: "Anomalous Asset Risk Management in Retail Supply Chains",
    slug: "anomalous-asset-risk-management",
    date: "2026-05-12",
    category: "Risk Management",
    excerpt: "Exploring liquidity escrow and containment protocols for retail inventory subject to dimensional instability, with case studies from Omega Mart.",
    content: `
      <p>In modern retail logistics, inventory valuation is typically governed by linear depreciation and predictable physical wear. However, when supply chains intersect with anomalous dimensions, assets can exhibit behaviors that challenge traditional GAAP principles. This paper examines containment escrow as a tool to mitigate extreme inventory volatility.</p>
      <h2>Dimensional Volatility and Asset Containment</h2>
      <p>As demonstrated by recent citrus inventory anomalies at Omega Mart, products can spontaneously change mass, emit localized light, or exist in multiple rooms simultaneously. For financial auditors, this presents a significant challenge: how do you value a box of lemons that is currently experiencing a temporal lapse?</p>
      <p>Big Beaver Bank has structured specialized anomalous asset escrow accounts. By locking capital in a multi-phasic trust, retail operations can maintain liquidity balances even if their physical inventory temporarily ceases to exist in our dimensional plane.</p>
      <h2>Fiduciary Containment Protocols</h2>
      <p>Fiduciary containment requires a three-step protocol:</p>
      <ul>
        <li><strong>Phase-Locked Escrow:</strong> Funds are backed by stable currencies (USD) and held in physical, lead-shielded vault facilities.</li>
        <li><strong>Automated Mass-Correction:</strong> Valuation is dynamically updated using sensor grids that monitor dimensional drift.</li>
        <li><strong>Anomalous Write-Downs:</strong> Special reserve accounts are established to absorb losses if an entire warehouse shifts permanently into a sub-space coordinate.</li>
      </ul>
      <p>Ultimately, managing anomalous assets requires accepting that balance sheets, like reality, are occasionally mutable.</p>
    `
  },
  {
    title: "Amortizing Deep-Space Exploration Vessels under Title 12",
    slug: "amortizing-space-vessels",
    date: "2026-04-18",
    category: "Commercial Lending",
    excerpt: "Structuring equipment leasing and syndicated loans for relativistic timelines, featuring logistics models from Weyland-Yutani.",
    content: `
      <p>Deep-space exploration and colonization require massive upfront capital expenditures. Under Title 12 of the corporate lending code, commercial vessels and planetary mining rigs must be amortized. However, when voyages involve relativistic speeds and time dilation, standard 30-year mortgages become complex.</p>
      <h2>Relativistic Time Dilation and Debt Service</h2>
      <p>Consider a crew operating a commercial mining vessel for the Weyland-Yutani Corporation. From the perspective of the crew, the voyage to a distant system takes 4 years. However, on Earth, 40 years have elapsed. If the vessel is leased on a standard monthly schedule, the account would accumulate significant late fees before the ship even arrives at its destination.</p>
      <p>Big Beaver Bank solved this by introducing **Dilation-Adjusted Debt Scheduling (DADS)**. Under DADS, interest calculations are synchronized with the vessel's internal atomic clock, ensuring that interest only accumulates relative to the ship's subjective timeline.</p>
      <h2>Equipping the Off-World Economy</h2>
      <p>By partnering with BBB, space exploration companies can lease crew quarters, terraforming equipment, and atmospheric scrubbers under agreements that remain legally binding across multiple solar systems, protecting corporate assets on Earth and beyond.</p>
    `
  },
  {
    title: "Latex Futures and Domestic Supply Chain Hedging",
    slug: "latex-futures-hedging",
    date: "2026-03-29",
    category: "Treasury Services",
    excerpt: "Analyzing the volatility of imported raw latex and the structure of custom hedges, in coordination with Vandelay Industries.",
    content: `
      <p>Domestic manufacturing operations that rely heavily on imported rubber and elastic compounds face significant supply chain exposure. Vandelay Industries, a leader in latex importing and exporting, has partnered with Big Beaver Bank to design a custom hedging framework for manufacturing inputs.</p>
      <h2>The Latex Market Matrix</h2>
      <p>Latex prices are highly sensitive to regional shipping disruptions, labor strikes, and agricultural yields. For an importer-exporter, these fluctuations can quickly erode margins. A custom hedge contract allows Vandelay Industries to lock in purchase prices up to 36 months in advance.</p>
      <p>At BBB, we structure commodity swaps that index the price of raw latex against standard manufacturing indexes, protecting domestic operations from sudden market shocks.</p>
    `
  },
  {
    title: "Capital Allocations in Remote Research Infrastructure",
    slug: "capital-allocations-research-infrastructure",
    date: "2026-02-14",
    category: "Institutional Investing",
    excerpt: "Fiduciary strategies for capital deployment in isolated facilities with restricted access, referencing the Dharma Initiative's island network.",
    content: `
      <p>Securing capital disbursements to remote scientific facilities presents distinct logistical hurdles. When research stations are located in isolated coordinates with limited communications, standard banking routes are insufficient. This article reviews the blind trust models used to fund the Dharma Initiative.</p>
      <h2>Funding Sub-Oceanic and Island Facilities</h2>
      <p>The Dharma Initiative operates several specialized research stations. Because of the magnetic properties of these locations, digital wire transfers are frequently interrupted. To solve this, Big Beaver Bank established an automated physical escrow disbursement system, utilizing secure drops and long-term treasury vaults.</p>
      <p>These capital structures ensure that scientific research continues uninterrupted, providing liquidity support for electromagnetic containment and zoological studies in remote regions.</p>
    `
  },
  {
    title: "Industrial Espionage Insurance and Fiduciary Safeguards",
    slug: "industrial-espionage-insurance",
    date: "2026-01-05",
    category: "Risk Management",
    excerpt: "Fiduciary methods for protecting proprietary software and managing auditing overhead, with case studies from Initech.",
    content: `
      <p>For mid-market technology firms, the loss of proprietary software algorithms can be catastrophic. When employees manipulate codebases for personal gain—such as installing fractions-of-a-cent siphon programs—traditional insurance policies rarely cover the full scope of damages. Initech's recent auditing challenges serve as a primary study.</p>
      <h2>Auditing and Codebase Escrow</h2>
      <p>Big Beaver Bank offers **Proprietary Codebase Escrow (PCE)**, where copies of critical software repositories are held in high-security digital vaults. In the event of internal code tampering, BBB's audit division can cross-reference active code against the escrowed version to detect unauthorized financial redirection.</p>
    `
  },
  {
    title: "Valuing Humanoid Assets and Replicant Manufacturing Margins",
    slug: "valuing-humanoid-assets",
    date: "2025-11-22",
    category: "Commercial Lending",
    excerpt: "Assessing the capital amortization curves for organic humanoid products, featuring risk models from the Tyrell Corporation.",
    content: `
      <p>As organic synthetic humanoid manufacturing approaches scale, the banking industry must adjust its asset valuation models. Replicants, such as those manufactured by the Tyrell Corporation, represent highly liquid, depreciable industrial assets. This paper reviews the amortization schedules for synthetic labor forces.</p>
      <h2>Four-Year Lifespan Depreciation</h2>
      <p>Humanoid assets with a hardcoded four-year lifespan present a unique depreciation challenge. Unlike traditional industrial machinery, which depreciates linearly over 15 to 20 years, replicant assets must be completely written off within 48 months. Big Beaver Bank structures specialized **Accelerated Capital Recovery Loans** to align with these short operational cycles.</p>
    `
  },
  {
    title: "The Economics of Paper-Backed Cash Reserves",
    slug: "paper-backed-cash-reserves",
    date: "2025-10-14",
    category: "Treasury Services",
    excerpt: "Analyzing liquidity buffers and cash operations for high-volume paper distributors, featuring Dunder Mifflin.",
    content: `
      <p>Despite the digital revolution, high-volume paper distribution remains a cornerstone of corporate administrative operations. Dunder Mifflin Paper Company relies on Big Beaver Bank's treasury services to manage seasonal cash flow variations and maintain paper-backed liquidity reserves.</p>
      <p>By leveraging physical paper stock as a collateral asset, regional distributors can obtain revolving lines of credit to fund inventory expansion and regional mergers without diluting shareholder equity.</p>
    `
  },
  {
    title: "Funding Automated Defense Systems and Cybernetic Capitalization",
    slug: "cybernetic-capitalization",
    date: "2025-09-08",
    category: "Institutional Investing",
    excerpt: "Evaluating long-term capitalization strategies for autonomous defense developers like Cyberdyne Systems.",
    content: `
      <p>The development of autonomous systems requires deep, long-term institutional capital. As cybernetic systems advance towards neural-net processing, developers like Cyberdyne Systems require structured funding models that protect R&D investments from short-term market swings.</p>
      <p>Big Beaver Bank underwrites tech-development bonds that lock in financing over multi-decade terms, ensuring that artificial intelligence and automation programs remain funded throughout their developmental life cycles.</p>
    `
  },
  {
    title: "Financing Organic Food Substitutes and Global Nutrition Logistics",
    slug: "organic-food-substitutes",
    date: "2025-08-11",
    category: "Commercial Lending",
    excerpt: "Fiduciary analysis of global supply chains and capitalization for synthetic food processors, featuring the Soylent Corporation.",
    content: `
      <p>Global food distribution networks are increasingly dependent on synthetic and concentrated organic substitutes. The Soylent Corporation utilizes BBB's structured finance services to secure raw agricultural inputs and manage global processing facilities.</p>
      <p>Our trade finance division structures complex import letters of credit that allow synthetic food producers to coordinate international processing chains and guarantee consistent regional supply.</p>
    `
  },
  {
    title: "Leveraging Geothermal Energy and Infrastructure Bonds",
    slug: "geothermal-energy-bonds",
    date: "2025-07-02",
    category: "Institutional Investing",
    excerpt: "Analyzing the capitalization of large-scale infrastructure projects under municipal supervision, featuring Globex Corporation.",
    content: `
      <p>Large-scale infrastructure projects, such as geothermal energy tap-in operations, require substantial municipal and institutional coordination. The Globex Corporation has partnered with BBB to underwrite high-yield infrastructure bonds for community energy development.</p>
      <p>These bonds provide long-term capital to fund the construction of complex sub-mountainous facilities, ensuring energy stability for municipal grids while delivering consistent yield to institutional portfolios.</p>
    `
  }
];

// Generate 26 more placeholder-like but professional and humorous articles to reach 36 total articles
const categories = ["Commercial Lending", "Risk Management", "Treasury Services", "Institutional Investing", "Asset Protection"];
const companies = [
  { name: "Hooli", theme: "Tech platforms and digital monetization scaling" },
  { name: "Oscorp", theme: "Genetic research and chemical compound development" },
  { name: "Stark Industries", theme: "Advanced clean energy and arc reactor grid financing" },
  { name: "Wayne Enterprises", theme: "Urban transit infrastructure and public sector credit lines" },
  { name: "Virtucon", theme: "Global real estate acquisitions and sub-sea excavation financing" },
  { name: "Umbrella Corporation", theme: "Bio-pharmaceutical research facilities and containment insurance" },
  { name: "Aperture Science", theme: "Portal mechanics and long-term testing laboratory grants" },
  { name: "Black Mesa", theme: "Anomalous materials research and government defense contracting" },
  { name: "Buy n Large", theme: "Megacorporation consolidation and retail automation financing" },
  { name: "E Corp", theme: "Debt consolidation programs and digital ledger stabilization" },
  { name: "Los Pollos Hermanos", theme: "Fast food supply chain logistics and franchise commercial loans" },
  { name: "Gringotts", theme: "Precious metal custody operations and cross-institution clearings" },
  { name: "Duff Beer", theme: "Beverage manufacturing expansions and municipal sponsorship lines" },
  { name: "Oceanic Airlines", theme: "Aviation fleet leasing and international cargo transit coverage" },
  { name: "Wonka Industries", theme: "Confectionery production automation and rare ingredient import hedging" },
  { name: "Sterling Cooper", theme: "Media allocation strategies and high-budget brand capitalization" },
  { name: "Veridian Dynamics", theme: "Agricultural testing facilities and domestic defense production loans" },
  { name: "Momcorp", theme: "Industrial robot production lines and dark matter fuel refining" },
  { name: "Fontaine Futuristics", theme: "Bio-modification product distribution and sub-oceanic asset leasing" },
  { name: "Abstergo Industries", theme: "Historical archival indexing and data storage security systems" },
  { name: "Arasaka Corporation", theme: "Private security fleet capital and database mainframe construction" },
  { name: "Delos Incorporated", theme: "Theme park robotics maintenance and guest privacy liability insurance" },
  { name: "Massive Dynamic", theme: "Quantum computing development and advanced electronics tooling lines" },
  { name: "Big Beaver Energy", theme: "Workwear apparel production scaling and safety logistics financing" },
  { name: "Soylent Corporation", theme: "Global marine protein acquisition and deep-sea harvesting fleets" },
  { name: "Acme Corporation", theme: "Rapid delivery catalog fulfillment and heavy machinery capital recovery" }
];

// Fill the rest of the 36 articles
for (let i = articles.length; i < 36; i++) {
  const comp = companies[i % companies.length];
  const cat = categories[i % categories.length];
  const dateObj = new Date(2025, 6 - (i - 10), 15 - (i % 10)); // Backdate timestamps
  const dateStr = dateObj.toISOString().split('T')[0];
  const slug = `financing-${comp.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${i}`;
  
  articles.push({
    title: `Capital Structuring and Asset Protection for ${comp.name}`,
    slug: slug,
    date: dateStr,
    category: cat,
    excerpt: `A financial overview of credit structures and risk containment designed for ${comp.name}'s operations in ${comp.theme.toLowerCase()}.`,
    content: `
      <p>In the current macroeconomic environment, corporate entities operating in highly specialized sectors face distinct financial challenges. This analysis examines the capital allocations structured by Big Beaver Bank to support ${comp.name} in managing ${comp.theme.toLowerCase()}.</p>
      <h2>Corporate Capital Structures</h2>
      <p>Every complex operation requires a customized treasury framework. For ${comp.name}, managing high-volume operations means balancing capital reinvestment against cash reserve targets. BBB provides comprehensive commercial banking, including custom structured debt and automated liquidity management.</p>
      <h2>Risk Mitigation Frameworks</h2>
      <p>Through our dedicated commercial division, we structure customized hedging programs that protect our institutional partners from regional market volatility, currency shifts, and supply chain bottlenecks, ensuring operations proceed on schedule.</p>
    `
  });
}

// Sort articles by date descending
articles.sort((a, b) => new Date(b.date) - new Date(a.date));

// Create Article Pages Template
const renderArticle = (article) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.title} | Big Beaver Bank Newsroom</title>
  <link rel="stylesheet" href="../css/style.css">
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
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
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
            <li><a href="../index.html">Home</a></li>
            <li><a href="../about.html">About Us</a></li>
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
  <main class="container" style="padding: 60px 0 80px;">
    <a href="../blog.html" class="article-back-link">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="vertical-align: middle; transform: scaleX(-1);"><path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z"/></svg>
      Back to Newsroom
    </a>
    <article class="article-container">
      <div class="article-meta">${article.category} • ${article.date}</div>
      <h1 class="article-title">${article.title}</h1>
      <div class="article-content">
        ${article.content}
      </div>
    </article>
  </main>

  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <h3>Big Beaver Bank</h3>
          <p>Established in 1984, Big Beaver Bank (BBB) specializes in providing sophisticated institutional lending, treasury management, and private asset protection services to corporate clients operating in complex and anomalous markets.</p>
        </div>
        <div class="footer-links">
          <h4>Banking Services</h4>
          <ul>
            <li><a href="../online-banking.html">Corporate Checking</a></li>
            <li><a href="../online-banking.html">Institutional Treasury</a></li>
            <li><a href="../online-banking.html">Anomalous Escrow</a></li>
            <li><a href="../online-banking.html">Asset Security</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Corporate</h4>
          <ul>
            <li><a href="../about.html">Our Story</a></li>
            <li><a href="../blog.html">Newsroom & Research</a></li>
            <li><a href="../about.html#legal">Fictional Disclosure</a></li>
            <li><a href="https://bigbeaverenergy.com" target="_blank" rel="noopener">Big Beaver Energy Merch</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">
          &copy; 2026 Big Beaver Bank. All rights reserved.
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

// Write 36 individual article files
articles.forEach(article => {
  const filePath = path.join(BLOG_DIR, `${article.slug}.html`);
  fs.writeFileSync(filePath, renderArticle(article), 'utf8');
  console.log(`Generated: blog/${article.slug}.html`);
});

// Generate blog.html (Index page)
const renderBlogIndex = (articleList) => {
  const cardsHtml = articleList.map(art => `
      <div class="blog-card">
        <div class="blog-card-content">
          <div class="blog-card-meta">${art.category} • ${art.date}</div>
          <h3 class="blog-card-title"><a href="blog/${art.slug}.html">${art.title}</a></h3>
          <p class="blog-card-excerpt">${art.excerpt}</p>
          <a href="blog/${art.slug}.html" class="blog-card-link">Read Whitepaper &rarr;</a>
        </div>
      </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsroom & Research | Big Beaver Bank</title>
  <meta name="description" content="Read institutional market analysis, whitepapers, and financial research published by the treasury desk at Big Beaver Bank.">
  <link rel="stylesheet" href="css/style.css">
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
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
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
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
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
    <div class="blog-header">
      <h1 style="font-size: 44px; margin-bottom: 16px;">Newsroom & Whitepapers</h1>
      <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto;">Institutional research, market briefs, and credit strategy updates published by our risk and treasury groups.</p>
    </div>

    <!-- Articles Grid -->
    <div class="blog-grid">
      ${cardsHtml}
    </div>
  </main>

  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <h3>Big Beaver Bank</h3>
          <p>Established in 1984, Big Beaver Bank (BBB) specializes in providing sophisticated institutional lending, treasury management, and private asset protection services to corporate clients operating in complex and anomalous markets.</p>
        </div>
        <div class="footer-links">
          <h4>Banking Services</h4>
          <ul>
            <li><a href="online-banking.html">Corporate Checking</a></li>
            <li><a href="online-banking.html">Institutional Treasury</a></li>
            <li><a href="online-banking.html">Anomalous Escrow</a></li>
            <li><a href="online-banking.html">Asset Security</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Corporate</h4>
          <ul>
            <li><a href="about.html">Our Story</a></li>
            <li><a href="blog.html">Newsroom & Research</a></li>
            <li><a href="about.html#legal">Fictional Disclosure</a></li>
            <li><a href="https://bigbeaverenergy.com" target="_blank" rel="noopener">Big Beaver Energy Merch</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">
          &copy; 2026 Big Beaver Bank. All rights reserved.
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
console.log('Generated: blog.html');
console.log('Successfully completed generating all 36 blog pages!');
