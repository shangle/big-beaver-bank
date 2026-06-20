/**
 * Big Beaver Bank (BBB) - Main Javascript
 * Manages mobile menus, calculators, branch locator (Leaflet/Nominatim), and demo tours.
 */

const init = () => {
  // --- MOBILE NAVIGATION menu ---
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const spans = menuToggle.querySelectorAll('span');
      if (nav.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // --- COPY ROUTING TRANSIT ---
  const copyRoutingEl = document.getElementById('copy-routing');
  if (copyRoutingEl) {
    copyRoutingEl.addEventListener('click', () => {
      navigator.clipboard.writeText("987654321").then(() => {
        alert("Routing Transit Number (987654321) copied to clipboard.");
      }).catch(() => {
        // Fallback for browsers that block clipboard API
        const ta = document.createElement('textarea');
        ta.value = '987654321';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        alert("Routing Transit Number (987654321) copied to clipboard.");
      });
    });
  }

  // --- PERSONAL MORTGAGE CALCULATOR ---
  const calcAmount = document.getElementById('calc-amount');
  const calcRate = document.getElementById('calc-rate');
  const calcTerm = document.getElementById('calc-term');

  if (calcAmount && calcRate && calcTerm) {
    const calculatePayments = () => {
      const principal = parseFloat(calcAmount.value) || 0;
      const annualRate = parseFloat(calcRate.value) || 0;
      const termYears = parseInt(calcTerm.value) || 1;

      const monthlyRate = annualRate / 100 / 12;
      const totalPayments = termYears * 12;

      let monthlyPayment = 0;
      let totalInterest = 0;

      if (principal > 0 && totalPayments > 0) {
        if (monthlyRate === 0) {
          monthlyPayment = principal / totalPayments;
        } else {
          monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                           (Math.pow(1 + monthlyRate, totalPayments) - 1);
        }
        totalInterest = (monthlyPayment * totalPayments) - principal;
      }

      // Update UI
      const resultVal = document.getElementById('result-monthly');
      const resultPrincipal = document.getElementById('result-principal');
      const resultInterest = document.getElementById('result-interest');

      if (resultVal) {
        resultVal.textContent = `$${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
      if (resultPrincipal) {
        resultPrincipal.textContent = `$${principal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
      }
      if (resultInterest) {
        resultInterest.textContent = `$${totalInterest.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
      }
    };

    [calcAmount, calcRate, calcTerm].forEach(input => {
      input.addEventListener('input', calculatePayments);
    });

    calculatePayments();
  }

  // --- INTERACTIVE TOUR DEMO PLAYER (DIGITAL BANKING) ---
  const demoButtons = document.querySelectorAll('.demo-ctrl-btn');
  const demoDisplay = document.getElementById('demo-display');

  if (demoButtons.length > 0 && demoDisplay) {
    const tutorials = {
      transfer: {
        title: "Transfers & ACH Walkthrough",
        content: `
          <p style="margin-bottom: 12px;"><strong>Step 1:</strong> Select 'Transfers & ACH' inside the secure sidebar menu.</p>
          <p style="margin-bottom: 12px;"><strong>Step 2:</strong> Choose your checking or savings account as funding source, and enter recipient routing/account credentials.</p>
          <p style="margin-bottom: 12px;"><strong>Step 3:</strong> Input the dollar amount and click 'Authorize Wire Dispatch'. Transfers clear dynamically via the ACH network.</p>
          <div style="background-color: var(--primary-color); color: #fff; padding: 12px; border-radius: 4px; font-size: 12px; font-family: monospace;">
            [ACH AUTHORIZED] $2,500.00 -> Routing 987654321
          </div>
        `
      },
      deposit: {
        title: "Mobile Check Deposit Walkthrough",
        content: `
          <p style="margin-bottom: 12px;"><strong>Step 1:</strong> Click 'Check Deposits' inside the mobile menu.</p>
          <p style="margin-bottom: 12px;"><strong>Step 2:</strong> Endorse the back of your check draft clearly. Click the camera viewport to upload photos of the front and back.</p>
          <p style="margin-bottom: 12px;"><strong>Step 3:</strong> Enter the check value and click 'Verify & Submit'. Deposits clear into your checking balance after draft validation.</p>
          <div style="border: 2px dashed var(--border-color); padding: 16px; border-radius: 4px; text-align: center; color: var(--text-muted); font-size: 13px;">
            📸 check_front_endorsed.jpg loaded (Verified)
          </div>
        `
      },
      "common-pass": {
        title: "Account Security & Credentials",
        content: `
          <p style="margin-bottom: 12px;"><strong>Step 1:</strong> On registration or reset, enter a username and unique key.</p>
          <p style="margin-bottom: 12px;"><strong>Step 2:</strong> Compromised keys (e.g. 'password', '123456') are flagged and blocked automatically.</p>
          <p style="margin-bottom: 12px;"><strong>Step 3:</strong> Establish a strong, mixed-character password. Credential locks associate with your username to prevent unauthorized logins.</p>
          <div style="background-color: #fef2f2; color: #b91c1c; border: 1px solid #fca5a5; padding: 10px; border-radius: 4px; font-size: 12px;">
            ⚠️ Access Blocked: Weak password identified in compromised registries.
          </div>
        `
      },
      nacha: {
        title: "NACHA ACH Payroll Walkthrough",
        content: `
          <p style="margin-bottom: 12px;"><strong>Step 1:</strong> Navigate to 'Direct Deposit' under business portal features.</p>
          <p style="margin-bottom: 12px;"><strong>Step 2:</strong> Configure your ACH Company settings (Company name,EIN,SEC code) and employee payroll roster.</p>
          <p style="margin-bottom: 12px;"><strong>Step 3:</strong> Click 'Compile NACHA File' to build the fixed-width 94-character Fed-compliant log, then download to transmit.</p>
          <div style="background-color: var(--bg-light); color: var(--text-dark); border: 1px solid var(--border-color); padding: 10px; border-radius: 4px; font-family: monospace; font-size: 10px; overflow-x: auto; white-space: pre;">
101 98765432101234567892606131034A094...
5220VANDELAY IND       ...
          </div>
        `
      }
    };

    const renderTour = (key) => {
      const tour = tutorials[key];
      demoDisplay.innerHTML = `
        <h3 style="font-family: sans-serif; font-weight: bold; font-size: 18px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 16px; color: var(--primary-color);">${tour.title}</h3>
        <div style="line-height: 1.6; font-size: 13.5px;">${tour.content}</div>
      `;
    };

    demoButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        demoButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTour(btn.getAttribute('data-demo'));
      });
    });

    // Load initial
    renderTour('transfer');
  }

  // --- LEAFLET MAP & NOMINATIM LOCATOR (LOCATIONS.HTML) ---
  const mapElement = document.getElementById('map');
  const locatorBtn = document.getElementById('locator-btn');
  const locatorZip = document.getElementById('locator-zip');
  const branchesList = document.getElementById('branches-list');

  if (mapElement && typeof L !== 'undefined') {
    // PJ Hoffmaster park coordinates: 43.12, -86.26
    // Shangri-La Island (HQ): 43.12, -86.36 (5 miles in Lake Michigan)
    const hqCoords = [43.12, -86.36];
    const initialCoords = [43.1609, -85.7100]; // Sparta, MI
    
    // Init Leaflet map
    const map = L.map('map').setView(initialCoords, 11);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom Headquarters Pin Icon (Gold/Green Shield)
    const goldIcon = L.divIcon({
      className: 'custom-pin',
      html: `<div style="background-color: #0c3822; color: #d4b26f; border: 2px solid #d4b26f; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; box-shadow: var(--shadow-md);">HQ</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const branchIcon = L.divIcon({
      className: 'custom-pin-branch',
      html: `<div style="background-color: #1e293b; color: #d4b26f; border: 1.5px solid #d4b26f; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 9px; box-shadow: var(--shadow-sm);">B</div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    });

    // Add HQ Marker
    const hqMarker = L.marker(hqCoords, { icon: goldIcon }).addTo(map);
    hqMarker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4;">
        <strong style="color: var(--primary-color);">Big Beaver Bank Corporate HQ</strong><br>
        Shangri-La Island (5 miles off PJ Hoffmaster State Park)<br>
        <em>*Access via private ferry only. Once home to a historic beaver colony.</em>
      </div>
    `).openPopup();

    let markers = [];

    // Search Action
    const performSearch = () => {
      const query = locatorZip.value.trim();
      if (!query) return;

      branchesList.innerHTML = `<div style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px 0;">Searching regional registries...</div>`;

      // Clear previous branch markers
      markers.forEach(m => map.removeLayer(m));
      markers = [];

      // Query OpenStreetMap Nominatim for banks near the query location
      // Append ', United States' for 5-digit zip codes to help OSM resolve them correctly
      let searchQuery = query;
      if (/^\d{5}$/.test(query)) {
        searchQuery = `${query}, United States`;
      }

      const url = `https://nominatim.openstreetmap.org/search?q=bank+near+${encodeURIComponent(searchQuery)}&format=json&limit=5`;
      
      fetch(url, {
        headers: {
          'User-Agent': 'BigBeaverBank-Satire-App-OpenStreetMapIntegration'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          fallbackToMockBranches(query);
          return;
        }

        branchesList.innerHTML = '';
        
        // Center map on first result
        const centerLat = parseFloat(data[0].lat);
        const centerLon = parseFloat(data[0].lon);
        map.setView([centerLat, centerLon], 13);

        data.forEach((bank, idx) => {
          const lat = parseFloat(bank.lat);
          const lon = parseFloat(bank.lon);
          
          // Split display name to get bank name
          const nameParts = bank.display_name.split(',');
          const originalName = nameParts[0].trim();
          const branchName = `Big Beaver Bank - ${originalName} Branch`;
          const address = nameParts.slice(1, 4).join(',').trim();

          // Add Leaflet Marker
          const marker = L.marker([lat, lon], { icon: branchIcon }).addTo(map);
          marker.bindPopup(`
            <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4; max-width: 200px;">
              <strong style="color: var(--primary-color);">${branchName}</strong><br>
              ${address}<br>
              <span style="color: #92400e; font-size: 10px; font-weight: 600;">*Undergoing branding integration since BBB acquisition.</span>
            </div>
          `);
          markers.push(marker);

          // Add to list
          const listCard = document.createElement('div');
          listCard.style.padding = '12px';
          listCard.style.border = '1px solid var(--border-color)';
          listCard.style.borderRadius = '4px';
          listCard.style.cursor = 'pointer';
          listCard.style.fontSize = '12.5px';
          listCard.style.backgroundColor = 'var(--bg-cream)';
          listCard.innerHTML = `
            <strong style="color: var(--primary-color); display: block; margin-bottom: 2px;">${branchName}</strong>
            <div style="color: var(--text-muted); font-size: 11px; margin-bottom: 4px;">${address}</div>
            <div style="color: #92400e; font-size: 10px; font-weight: 600;">⚠️ Integration in Progress</div>
            <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">Lobby Hours: M-F 9am - 5pm | Drive-Thru: Yes</div>
          `;
          
          listCard.onclick = () => {
            map.setView([lat, lon], 15);
            marker.openPopup();
          };

          branchesList.appendChild(listCard);
        });
      })
      .catch(err => {
        console.error(err);
        fallbackToMockBranches(query);
      });
    };

    // Fallback Mock data if offline or blocked
    const fallbackToMockBranches = (query) => {
      branchesList.innerHTML = '';
      
      const mockLocations = [
        { name: "Sparta Rogue River Branch", lat: 43.1612, lon: -85.7122, addr: "150 S State St, Sparta, MI 49345" },
        { name: "Kent City Fiduciary Annex", lat: 43.2201, lon: -85.7511, addr: "240 N Main St, Kent City, MI 49330" },
        { name: "Alpine Township Commercial ATM", lat: 43.0825, lon: -85.6980, addr: "5200 Alpine Ave NW, Comstock Park, MI 49321" }
      ];

      map.setView([43.1609, -85.7100], 12);

      mockLocations.forEach((loc, idx) => {
        const marker = L.marker([loc.lat, loc.lon], { icon: branchIcon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4;">
            <strong style="color: var(--primary-color);">${loc.name}</strong><br>
            ${loc.addr}<br>
            <span style="color: #047857; font-size: 10px; font-weight: 600;">Active Branch</span>
          </div>
        `);
        markers.push(marker);

        const listCard = document.createElement('div');
        listCard.style.padding = '12px';
        listCard.style.border = '1px solid var(--border-color)';
        listCard.style.borderRadius = '4px';
        listCard.style.cursor = 'pointer';
        listCard.style.fontSize = '12.5px';
        listCard.style.backgroundColor = 'var(--bg-cream)';
        listCard.innerHTML = `
          <strong style="color: var(--primary-color); display: block; margin-bottom: 2px;">Big Beaver Bank - ${loc.name}</strong>
          <div style="color: var(--text-muted); font-size: 11px; margin-bottom: 4px;">${loc.addr}</div>
          <div style="color: #047857; font-size: 10px; font-weight: 600;">✓ Branch Fully Integrated</div>
          <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">Lobby Hours: M-F 9am - 5pm | Drive-Thru: Yes</div>
        `;
        
        listCard.onclick = () => {
          map.setView([loc.lat, loc.lon], 15);
          marker.openPopup();
        };

        branchesList.appendChild(listCard);
      });
    };

    locatorBtn.onclick = performSearch;
    locatorZip.onkeydown = (e) => { if (e.key === 'Enter') performSearch(); };
    
    // Initial run
    performSearch();
  }

  // --- CHECKING ACCOUNT SELECTOR WIZARD ---
  const wizSubmitBtn = document.getElementById('wiz-submit-btn');
  const wizResetBtn = document.getElementById('wiz-reset-btn');
  const wizQuestions = document.getElementById('wizard-questions');
  const wizResult = document.getElementById('wizard-result');

  if (wizSubmitBtn && wizQuestions && wizResult) {
    wizSubmitBtn.addEventListener('click', () => {
      const balance = document.getElementById('wiz-balance').value;
      const dd = document.getElementById('wiz-dd').value;
      const atm = document.getElementById('wiz-atm').value;

      let recTitle = "Summit Choice Checking";
      let recDesc = "Our basic, no-fee checking option. Perfect for everyday transactions without worrying about monthly maintenance fees.";

      if (balance === 'high') {
        recTitle = "Prestige Interest Checking";
        recDesc = "Our premium account designed for higher balances. It earns 0.15% APY interest and provides unlimited non-network ATM fee rebates globally, meaning you'll save on average $2.50 every time you check your balance.";
      } else if (dd === 'yes') {
        recTitle = "Community First Checking";
        recDesc = "A great mid-tier checking account. Set up monthly direct deposit to waive the $5.00 service charge, and get your first 2 non-network ATM fees waived automatically each month.";
      } else if (atm === 'often') {
        recTitle = "Prestige Interest Checking";
        recDesc = "Even if your balance is moderate, if you use non-network ATMs frequently, the unlimited ATM fee rebates of our Prestige account will save you more than its monthly service fee!";
      }

      document.getElementById('wiz-result-title').textContent = recTitle;
      document.getElementById('wiz-result-desc').textContent = recDesc;

      wizQuestions.style.display = 'none';
      wizResult.style.display = 'block';
    });

    if (wizResetBtn) {
      wizResetBtn.addEventListener('click', () => {
        wizQuestions.style.display = 'block';
        wizResult.style.display = 'none';
      });
    }
  }

  // --- CUSTOM PREMIUM BANK MODAL SYSTEM ---
  window.showBankModal = (title, contentHTML) => {
    let overlay = document.getElementById('bank-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'bank-modal-overlay';
      overlay.className = 'bank-modal-overlay';
      overlay.innerHTML = `
        <div class="bank-modal-container">
          <button class="bank-modal-close" onclick="closeBankModal()">&times;</button>
          <h3 class="bank-modal-title" id="bank-modal-title"></h3>
          <div class="bank-modal-content" id="bank-modal-content"></div>
        </div>
      `;
      document.body.appendChild(overlay);
    }
    
    document.getElementById('bank-modal-title').textContent = title;
    document.getElementById('bank-modal-content').innerHTML = contentHTML;
    
    // Show modal
    setTimeout(() => {
      overlay.classList.add('active');
    }, 10);
  };

  window.closeBankModal = () => {
    const overlay = document.getElementById('bank-modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  };

  // Business Banking Enrollment Form
  window.openBusinessEnrollmentForm = () => {
    const formHTML = `
      <form onsubmit="event.preventDefault(); window.showBusinessSuccess();">
        <div style="font-size:12px; color:var(--text-muted); margin-bottom:15px; line-height:1.5;">
          Complete the commercial registration fields below to establish your corporate profile and access Sparta clearing channels.
        </div>
        <div class="input-group" style="margin-bottom:12px;">
          <label style="font-weight:600; display:block; margin-bottom:4px; font-size:12px;">Registered Entity Name</label>
          <input type="text" placeholder="e.g., Acme Corporation" style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:4px; font-size:13px;" required />
        </div>
        <div class="input-group" style="margin-bottom:12px;">
          <label style="font-weight:600; display:block; margin-bottom:4px; font-size:12px;">Corporate Officer Email</label>
          <input type="email" placeholder="e.g., treasury@acme.com" style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:4px; font-size:13px;" required />
        </div>
        <div class="input-group" style="margin-bottom:18px;">
          <label style="font-weight:600; display:block; margin-bottom:4px; font-size:12px;">Primary Services Focus</label>
          <select style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:4px; font-size:13px;">
            <option>Commercial Checking & Sweeps</option>
            <option>Timber Sweeps & Yield Enhancement</option>
            <option>Relativistic Capital Lease Models</option>
            <option>Section 12-B Clearing Bypass</option>
          </select>
        </div>
        <button type="submit" class="btn-form-submit" style="width:100%; padding:12px;">Submit Commercial Application</button>
      </form>
    `;
    window.showBankModal('Commercial Account Enrollment', formHTML);
  };

  window.showBusinessSuccess = () => {
    const successHTML = `
      <div style="text-align:center; padding:10px 0;">
        <div style="font-size:44px; margin-bottom:16px;">🏢</div>
        <h4 style="color:#047857; font-size:18px; margin-bottom:8px; font-family:sans-serif; font-weight:700;">Commercial Application Logged</h4>
        <p style="font-size:13px; color:var(--text-muted); line-height:1.6; margin-bottom:20px;">
          Thank you. Your corporate profile has been recorded in the Sparta clearance registry. Reference ID: <strong>BBB-BIZ-88402</strong>. An onboarding officer will contact you within 24 business hours.
        </p>
        <div style="font-size:11px; background-color:var(--bg-light); border:1px solid var(--border-color); padding:10px; border-radius:4px; color:var(--text-muted); line-height:1.5;">
          <strong>Notice:</strong> Big Beaver Bank is a satirical simulation project. No actual financial accounts or business profile registration has occurred.
        </div>
      </div>
    `;
    window.showBankModal('Application Received', successHTML);
  };

  // Personal Checking Enrollment Form
  window.openPersonalEnrollmentForm = (tier) => {
    const formHTML = `
      <form onsubmit="event.preventDefault(); window.showPersonalSuccess('${tier}');">
        <div style="font-size:12px; color:var(--text-muted); margin-bottom:15px; line-height:1.5;">
          Establish checking credentials for: <strong>${tier}</strong>.
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
          <div class="input-group">
            <label style="font-weight:600; display:block; margin-bottom:4px; font-size:12px;">First Name</label>
            <input type="text" style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:4px; font-size:13px;" required />
          </div>
          <div class="input-group">
            <label style="font-weight:600; display:block; margin-bottom:4px; font-size:12px;">Last Name</label>
            <input type="text" style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:4px; font-size:13px;" required />
          </div>
        </div>
        <div class="input-group" style="margin-bottom:18px;">
          <label style="font-weight:600; display:block; margin-bottom:4px; font-size:12px;">Primary Email Address</label>
          <input type="email" placeholder="e.g., customer@domain.com" style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:4px; font-size:13px;" required />
        </div>
        <button type="submit" class="btn-form-submit" style="width:100%; padding:12px;">Open Secure Account</button>
      </form>
    `;
    window.showBankModal('Personal Checking Enrollment', formHTML);
  };

  window.showPersonalSuccess = (tier) => {
    const successHTML = `
      <div style="text-align:center; padding:10px 0;">
        <div style="font-size:44px; margin-bottom:16px;">💳</div>
        <h4 style="color:#047857; font-size:18px; margin-bottom:8px; font-family:sans-serif; font-weight:700;">Account Opening Complete</h4>
        <p style="font-size:13px; color:var(--text-muted); line-height:1.6; margin-bottom:20px;">
          Welcome! Your checking credentials for <strong>${tier}</strong> have been generated. Reference: <strong>BBB-PERS-22941</strong>. Debit card provisioning has been queued.
        </p>
        <div style="font-size:11px; background-color:var(--bg-light); border:1px solid var(--border-color); padding:10px; border-radius:4px; color:var(--text-muted); line-height:1.5;">
          <strong>Notice:</strong> Big Beaver Bank is a purely fictional institution. No real checking account has been established, and no physical card will be shipped.
        </div>
      </div>
    `;
    window.showBankModal('Account Provisioned', successHTML);
  };

  // App Store Download Simulation
  window.openMobileAppDownload = (store) => {
    const progressHTML = `
      <div style="text-align:center; padding:10px 0;">
        <div style="font-size:14px; font-weight:600; margin-bottom:10px; color:var(--primary-color);" id="dl-status">Connecting to secure store server...</div>
        <div style="width:100%; height:12px; background-color:var(--bg-light); border:1px solid var(--border-color); border-radius:6px; overflow:hidden; margin-bottom:15px;">
          <div id="dl-progress-bar" style="width:0%; height:100%; background-color:#10b981; transition:width 0.15s ease-out;"></div>
        </div>
        <div style="font-size:11px; color:var(--text-muted);">Retrieving Big Beaver Bank Mobile Client v2.6.1 via ${store}</div>
      </div>
    `;
    window.showBankModal('Downloading Mobile Client', progressHTML);
    
    // Animate progress
    let percent = 0;
    const interval = setInterval(() => {
      percent += Math.floor(Math.random() * 15) + 5;
      if (percent >= 100) {
        percent = 100;
        clearInterval(interval);
        document.getElementById('dl-status').textContent = 'Installation payload decrypted!';
        document.getElementById('dl-status').style.color = '#047857';
        setTimeout(() => {
          const successHTML = `
            <div style="text-align:center; padding:10px 0;">
              <div style="font-size:44px; margin-bottom:16px;">📲</div>
              <h4 style="color:#047857; font-size:18px; margin-bottom:8px; font-family:sans-serif; font-weight:700;">Client Setup Complete</h4>
              <p style="font-size:13px; color:var(--text-muted); line-height:1.6; margin-bottom:20px;">
                The mobile banking application has successfully completed simulated installation on your device layout container.
              </p>
              <div style="font-size:11px; background-color:var(--bg-light); border:1px solid var(--border-color); padding:10px; border-radius:4px; color:var(--text-muted); line-height:1.5;">
                <strong>Notice:</strong> Big Beaver Bank is a satirical project. No actual executable application files have been downloaded or installed on your physical device.
              </div>
            </div>
          `;
          window.showBankModal('Mobile Client Configured', successHTML);
        }, 500);
      }
      const bar = document.getElementById('dl-progress-bar');
      const status = document.getElementById('dl-status');
      if (bar) bar.style.width = percent + '%';
      if (status && percent < 100) status.textContent = `Downloading packages: ${percent}%...`;
    }, 150);
  };

  // Support Console: Co-Browse Request Form
  window.openCoBrowseForm = () => {
    const formHTML = `
      <form onsubmit="event.preventDefault(); window.startCoBrowseSession();">
        <div style="font-size:12px; color:var(--text-muted); margin-bottom:15px; line-height:1.5;">
          Initiate a read-only co-browsing session to let a Sparta relationship officer verify your console layout.
        </div>
        <div class="input-group" style="margin-bottom:18px;">
          <label style="font-weight:600; display:block; margin-bottom:4px; font-size:12px;">Assistance Department</label>
          <select id="cobrowse-dept" style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:4px; font-size:13px;">
            <option>Treasury Clearing Assistance Desk</option>
            <option>Timber Sweep Engineering Desk</option>
            <option>Section 12-B Exception Audits</option>
          </select>
        </div>
        <button type="submit" class="btn-form-submit" style="width:100%; padding:12px;">Request Remote Session</button>
      </form>
    `;
    window.showBankModal('Technical Co-Browsing Console', formHTML);
  };

  window.startCoBrowseSession = () => {
    const dept = document.getElementById('cobrowse-dept').value;
    const progressHTML = `
      <div style="background-color:#1e293b; color:#38bdf8; font-family:monospace; padding:15px; border-radius:4px; font-size:11.5px; text-align:left; line-height:1.5; min-height:150px;">
        <div id="cb-line-1">&gt; Generating secure connection token...</div>
        <div id="cb-line-2" style="display:none;">&gt; Dispatching request to Sparta routing desk...</div>
        <div id="cb-line-3" style="display:none;">&gt; Establishing encrypted reverse tunnel...</div>
        <div id="cb-line-4" style="display:none; color:#34d399;">&gt; Tunnel established! Officer connected to console.</div>
      </div>
    `;
    window.showBankModal('Connecting to Help Desk...', progressHTML);
    
    setTimeout(() => { document.getElementById('cb-line-2').style.display = 'block'; }, 600);
    setTimeout(() => { document.getElementById('cb-line-3').style.display = 'block'; }, 1200);
    setTimeout(() => { 
      document.getElementById('cb-line-4').style.display = 'block';
      setTimeout(() => {
        const successHTML = `
          <div style="text-align:center; padding:10px 0;">
            <div style="font-size:44px; margin-bottom:16px;">🖥️</div>
            <h4 style="color:#047857; font-size:18px; margin-bottom:8px; font-family:sans-serif; font-weight:700;">Co-Browse Tunnel Established</h4>
            <p style="font-size:13px; color:var(--text-muted); line-height:1.6; margin-bottom:20px;">
              Session token verified. A representative from the <strong>${dept}</strong> has joined your viewport container.
            </p>
            <div style="font-size:11px; background-color:var(--bg-light); border:1px solid var(--border-color); padding:10px; border-radius:4px; color:var(--text-muted); line-height:1.5;">
              <strong>Notice:</strong> Big Beaver Bank is a satirical project. No real remote desktop connection has been created, and no external party has access to your system.
            </div>
          </div>
        `;
        window.showBankModal('Session Established', successHTML);
      }, 800);
    }, 1800);
  };

  // Support Console: Secure Attachment Form
  window.openAttachmentForm = () => {
    const formHTML = `
      <form onsubmit="event.preventDefault(); window.startFileUploadSim();">
        <div style="font-size:12px; color:var(--text-muted); margin-bottom:15px; line-height:1.5;">
          Upload documents or check image files securely to Sparta verification registries.
        </div>
        <div class="input-group" style="margin-bottom:18px;">
          <label style="font-weight:600; display:block; margin-bottom:4px; font-size:12px;">Select File Payload (JPEG, PNG, CSV, BAI2)</label>
          <input type="file" id="attach-file" style="width:100%; padding:4px;" required />
        </div>
        <button type="submit" class="btn-form-submit" style="width:100%; padding:12px;">Scan & Upload Checksum</button>
      </form>
    `;
    window.showBankModal('Secure Attachment Portal', formHTML);
  };

  window.startFileUploadSim = () => {
    const fileField = document.getElementById('attach-file');
    const filename = fileField && fileField.files[0] ? fileField.files[0].name : 'attachment_payload.dat';
    
    const progressHTML = `
      <div style="text-align:center; padding:10px 0;">
        <div style="font-size:14px; font-weight:600; margin-bottom:10px; color:var(--primary-color);" id="ul-status">Reading local file bytes...</div>
        <div style="width:100%; height:12px; background-color:var(--bg-light); border:1px solid var(--border-color); border-radius:6px; overflow:hidden; margin-bottom:15px;">
          <div id="ul-progress-bar" style="width:0%; height:100%; background-color:#10b981; transition:width 0.1s linear;"></div>
        </div>
        <div style="font-size:11px; color:var(--text-muted);">Hashing and transferring: ${filename}</div>
      </div>
    `;
    window.showBankModal('Transferring Document', progressHTML);
    
    let percent = 0;
    const interval = setInterval(() => {
      percent += Math.floor(Math.random() * 20) + 10;
      if (percent >= 100) {
        percent = 100;
        clearInterval(interval);
        document.getElementById('ul-status').textContent = 'CRC32 checksum verified!';
        document.getElementById('ul-status').style.color = '#047857';
        setTimeout(() => {
          const successHTML = `
            <div style="text-align:center; padding:10px 0;">
              <div style="font-size:44px; margin-bottom:16px;">📎</div>
              <h4 style="color:#047857; font-size:18px; margin-bottom:8px; font-family:sans-serif; font-weight:700;">File Attachment Received</h4>
              <p style="font-size:13px; color:var(--text-muted); line-height:1.6; margin-bottom:20px;">
                The file <strong>${filename}</strong> has been hashed (CRC32: 0x9AFB381C) and buffered in the Sparta registry.
              </p>
              <div style="font-size:11px; background-color:var(--bg-light); border:1px solid var(--border-color); padding:10px; border-radius:4px; color:var(--text-muted); line-height:1.5;">
                <strong>Notice:</strong> Big Beaver Bank is a satirical site. No real file transmission occurred, and your file was not sent to any external server.
              </div>
            </div>
          `;
          window.showBankModal('Upload Complete', successHTML);
        }, 500);
      }
      const bar = document.getElementById('ul-progress-bar');
      const status = document.getElementById('ul-status');
      if (bar) bar.style.width = percent + '%';
      if (status && percent < 100) status.textContent = `Uploading: ${percent}%...`;
    }, 100);
  };

  // Support Console: Banker Appointment Scheduler Form
  window.openSchedulerForm = () => {
    const formHTML = `
      <form onsubmit="event.preventDefault(); window.startSchedulerSim();">
        <div style="font-size:12px; color:var(--text-muted); margin-bottom:15px; line-height:1.5;">
          Schedule an online video consult or in-person meeting with our Sparta relationship advisors.
        </div>
        <div class="input-group" style="margin-bottom:12px;">
          <label style="font-weight:600; display:block; margin-bottom:4px; font-size:12px;">Select Sparta Specialist</label>
          <select id="schedule-banker" style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:4px; font-size:13px;">
            <option>Dwight Schrute (Spreadsheet Auditing Desk)</option>
            <option>Omega Mart representative (Anomalous Asset Risk)</option>
            <option>Weyland-Yutani Officer (Relativistic Bonds)</option>
            <option>Dharma Station Lead (Clearance Clearings)</option>
          </select>
        </div>
        <div class="input-group" style="margin-bottom:18px;">
          <label style="font-weight:600; display:block; margin-bottom:4px; font-size:12px;">Preferred Appointment Date</label>
          <input type="date" id="schedule-date" style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:4px; font-size:13px;" required />
        </div>
        <button type="submit" class="btn-form-submit" style="width:100%; padding:12px;">Reserve Consultation Slot</button>
      </form>
    `;
    window.showBankModal('Sparta Appointment Scheduler', formHTML);
  };

  window.startSchedulerSim = () => {
    const banker = document.getElementById('schedule-banker').value;
    const date = document.getElementById('schedule-date').value;
    
    const successHTML = `
      <div style="text-align:center; padding:10px 0;">
        <div style="font-size:44px; margin-bottom:16px;">📅</div>
        <h4 style="color:#047857; font-size:18px; margin-bottom:8px; font-family:sans-serif; font-weight:700;">Appointment Reserved</h4>
        <p style="font-size:13px; color:var(--text-muted); line-height:1.6; margin-bottom:20px;">
          Confirmed: Consultation reserved with <strong>${banker}</strong> on <strong>${date}</strong>. A calendar invite has been dispatched.
        </p>
        <div style="font-size:11px; background-color:var(--bg-light); border:1px solid var(--border-color); padding:10px; border-radius:4px; color:var(--text-muted); line-height:1.5;">
          <strong>Notice:</strong> Big Beaver Bank is a satirical site. No real calendar invitation will be sent, and no virtual session will occur.
        </div>
      </div>
    `;
    window.showBankModal('Booking Confirmed', successHTML);
  };

  // --- NEWSROOM TAG FILTERING ---
  const params = new URLSearchParams(window.location.search);
  const activeTag = params.get('tag');
  const tagFilterBar = document.getElementById('tag-filter-bar');
  const activeTagName = document.getElementById('active-tag-name');
  
  if (activeTag) {
    const blogCards = document.querySelectorAll('.blog-card');
    let foundCount = 0;
    
    blogCards.forEach(card => {
      const cardTagsStr = card.getAttribute('data-tags') || '';
      const tags = cardTagsStr.split(',');
      if (tags.includes(activeTag)) {
        card.style.display = 'flex';
        foundCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    if (tagFilterBar && activeTagName) {
      activeTagName.textContent = '#' + activeTag;
      tagFilterBar.style.display = 'flex';
    }
  }

  // --- KNOWLEDGEBASE CONTROLLER ---
  const kbSearchInput = document.getElementById('kb-search-input');
  const kbTermsList = document.getElementById('kb-terms-list');
  const kbCountLabel = document.getElementById('kb-count-label');
  const kbDetailPane = document.getElementById('kb-detail-pane');
  const kbDefaultView = document.getElementById('kb-default-view');
  const kbContentView = document.getElementById('kb-content-view');

  const kbDetailTerm = document.getElementById('kb-detail-term');
  const kbDetailCategory = document.getElementById('kb-detail-category');
  const kbDetailDefinition = document.getElementById('kb-detail-definition');
  const kbDetailHow = document.getElementById('kb-detail-how');
  const kbDetailWrong = document.getElementById('kb-detail-wrong');
  const kbDetailSafeguards = document.getElementById('kb-detail-safeguards');
  const kbDetailRelated = document.getElementById('kb-detail-related');
  
  const kbDiagramContainer = document.getElementById('kb-diagram-container');
  const kbDiagramSvgWrapper = document.getElementById('kb-diagram-svg-wrapper');

  const makeId = (term) => term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  if (typeof BANKING_KNOWLEDGEBASE !== 'undefined' && kbTermsList) {
    let currentCategory = 'all';
    let currentSearch = '';
    let activeTermId = null;

    const renderTermsList = () => {
      kbTermsList.innerHTML = '';
      
      const filtered = BANKING_KNOWLEDGEBASE.filter(item => {
        const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
        const matchesSearch = currentSearch === '' || 
          item.term.toLowerCase().includes(currentSearch) || 
          item.definition.toLowerCase().includes(currentSearch);
        return matchesCategory && matchesSearch;
      });

      kbCountLabel.textContent = `Showing ${filtered.length} terms`;

      if (filtered.length === 0) {
        kbTermsList.innerHTML = '<div style="font-size:12px; color:var(--text-muted); text-align:center; padding:20px;">No matching terms found.</div>';
        return;
      }

      filtered.forEach(item => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'kb-term-item';
        if (item.id === activeTermId) {
          btn.classList.add('active');
        }
        btn.textContent = item.term;
        btn.addEventListener('click', () => {
          activeTermId = item.id;
          // update selection styling
          document.querySelectorAll('.kb-term-item').forEach(el => el.classList.remove('active'));
          btn.classList.add('active');
          showTermDetails(item.id);
        });
        kbTermsList.appendChild(btn);
      });
    };

    const renderDiagram = (diagramId) => {
      if (!kbDiagramSvgWrapper) return;
      
      let svgContent = '';
      const markerDef = `
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-muted)" />
          </marker>
        </defs>
      `;

      if (diagramId === 'ach-flow') {
        svgContent = `
          <svg viewBox="0 0 800 130" width="100%">
            ${markerDef}
            <!-- Nodes -->
            <rect x="15" y="35" width="105" height="45" class="svg-flow-node svg-flow-node-active" />
            <text x="67" y="61" class="svg-flow-text">1. Originator</text>
            <text x="67" y="74" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">Initiates Transfer</text>

            <rect x="170" y="35" width="105" height="45" class="svg-flow-node" />
            <text x="222" y="61" class="svg-flow-text">2. ODFI Bank</text>
            <text x="222" y="74" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">Batches instructions</text>

            <rect x="325" y="35" width="125" height="45" class="svg-flow-node" />
            <text x="387" y="61" class="svg-flow-text">3. ACH Operator</text>
            <text x="387" y="74" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">Clears &amp; Settlements</text>

            <rect x="500" y="35" width="105" height="45" class="svg-flow-node" />
            <text x="552" y="61" class="svg-flow-text">4. RDFI Bank</text>
            <text x="552" y="74" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">Validates Receiver</text>

            <rect x="655" y="35" width="105" height="45" class="svg-flow-node" />
            <text x="707" y="61" class="svg-flow-text">5. Receiver</text>
            <text x="707" y="74" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">Funds Posted</text>

            <!-- Connectors -->
            <line x1="120" y1="57" x2="170" y2="57" class="svg-flow-arrow" />
            <line x1="275" y1="57" x2="325" y2="57" class="svg-flow-arrow" />
            <line x1="450" y1="57" x2="500" y2="57" class="svg-flow-arrow" />
            <line x1="605" y1="57" x2="655" y2="57" class="svg-flow-arrow" />
          </svg>
        `;
      } else if (diagramId === 'wire-flow') {
        svgContent = `
          <svg viewBox="0 0 800 130" width="100%">
            ${markerDef}
            <!-- Nodes -->
            <rect x="15" y="35" width="105" height="45" class="svg-flow-node svg-flow-node-active" />
            <text x="67" y="61" class="svg-flow-text">1. Sender</text>
            <text x="67" y="74" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">Directs Wire</text>

            <rect x="170" y="35" width="105" height="45" class="svg-flow-node" />
            <text x="222" y="61" class="svg-flow-text">2. Originating Bank</text>
            <text x="222" y="74" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">Verifies Balances</text>

            <rect x="325" y="35" width="125" height="45" class="svg-flow-node" />
            <text x="387" y="61" class="svg-flow-text">3. Fedwire/SWIFT</text>
            <text x="387" y="74" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">Instant Netting</text>

            <rect x="500" y="35" width="105" height="45" class="svg-flow-node" />
            <text x="552" y="61" class="svg-flow-text">4. Recipient Bank</text>
            <text x="552" y="74" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">Posts Balance</text>

            <rect x="655" y="35" width="105" height="45" class="svg-flow-node" />
            <text x="707" y="61" class="svg-flow-text">5. Beneficiary</text>
            <text x="707" y="74" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">Real-Time Credit</text>

            <!-- Connectors -->
            <line x1="120" y1="57" x2="170" y2="57" class="svg-flow-arrow" />
            <line x1="275" y1="57" x2="325" y2="57" class="svg-flow-arrow" />
            <line x1="450" y1="57" x2="500" y2="57" class="svg-flow-arrow" />
            <line x1="605" y1="57" x2="655" y2="57" class="svg-flow-arrow" />
          </svg>
        `;
      } else if (diagramId === 'pospay-flow') {
        svgContent = `
          <svg viewBox="0 0 800 200" width="100%">
            ${markerDef}
            <!-- Flow nodes -->
            <rect x="15" y="75" width="110" height="45" class="svg-flow-node" />
            <text x="70" y="96" class="svg-flow-text">1. Presented Check</text>
            <text x="70" y="109" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">At teller or clearing</text>

            <line x1="125" y1="97" x2="165" y2="97" class="svg-flow-arrow" />

            <rect x="165" y="75" width="110" height="45" class="svg-flow-node" />
            <text x="220" y="96" class="svg-flow-text">2. OCR Check Scan</text>
            <text x="220" y="109" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">Reads Transit/Account</text>

            <line x1="275" y1="97" x2="315" y2="97" class="svg-flow-arrow" />

            <!-- Decision Box -->
            <polygon points="315,97 365,70 415,97 365,124" style="fill:var(--bg-white); stroke:var(--primary-color); stroke-width:2px;" />
            <text x="365" y="100" style="font-family:sans-serif; font-size:10px; font-weight:700; fill:var(--primary-color); text-anchor:middle;">Match?</text>

            <!-- Yes path -->
            <line x1="365" y1="70" x2="365" y2="40" class="svg-flow-arrow" />
            <line x1="365" y1="40" x2="455" y2="40" class="svg-flow-arrow" />
            <rect x="455" y="20" width="125" height="40" class="svg-flow-node" style="stroke:#047857;" />
            <text x="517" y="44" class="svg-flow-text" style="fill:#047857;">Auto Clear (Pay)</text>

            <!-- No path -->
            <line x1="365" y1="124" x2="365" y2="155" class="svg-flow-arrow" />
            <line x1="365" y1="155" x2="455" y2="155" class="svg-flow-arrow" />
            <rect x="455" y="135" width="125" height="40" class="svg-flow-node" style="stroke:#b91c1c; fill:#fef2f2;" />
            <text x="517" y="159" class="svg-flow-text" style="fill:#b91c1c;">Flag Exception</text>

            <line x1="580" y1="155" x2="630" y2="155" class="svg-flow-arrow" />

            <!-- Checker Decisions -->
            <rect x="630" y="135" width="145" height="40" class="svg-flow-node svg-flow-node-active" />
            <text x="702" y="153" class="svg-flow-text">Checker Pay/Return Decision</text>
            <text x="702" y="165" style="font-size:7px; fill:var(--text-muted); text-anchor:middle;">Manual Exception approval</text>
          </svg>
        `;
      } else if (diagramId === 'maker-checker-flow') {
        svgContent = `
          <svg viewBox="0 0 800 130" width="100%">
            ${markerDef}
            <!-- Nodes -->
            <rect x="20" y="35" width="120" height="45" class="svg-flow-node svg-flow-node-active" />
            <text x="80" y="61" class="svg-flow-text">1. Maker Drafts Batch</text>
            <text x="80" y="73" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">Inputs Transfer values</text>

            <line x1="140" y1="57" x2="200" y2="57" class="svg-flow-arrow" />

            <rect x="200" y="35" width="150" height="45" class="svg-flow-node" style="fill:var(--bg-cream);" />
            <text x="275" y="61" class="svg-flow-text">2. Approvals Registry Log</text>
            <text x="275" y="73" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">Holds pending check validation</text>

            <line x1="350" y1="57" x2="410" y2="57" class="svg-flow-arrow" />

            <rect x="410" y="35" width="150" height="45" class="svg-flow-node" />
            <text x="485" y="61" class="svg-flow-text">3. Checker Approves Item</text>
            <text x="485" y="73" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">Authorizes ledger deduction</text>

            <line x1="560" y1="57" x2="620" y2="57" class="svg-flow-arrow" />

            <rect x="620" y="35" width="130" height="45" class="svg-flow-node" style="stroke:#047857;" />
            <text x="685" y="61" class="svg-flow-text" style="fill:#047857;">4. Clears Transaction</text>
            <text x="685" y="73" style="font-size:8px; fill:var(--text-muted); text-anchor:middle;">Funds Posted in Ledger</text>
          </svg>
        `;
      }
      
      kbDiagramSvgWrapper.innerHTML = svgContent;
    };

    const showTermDetails = (termId) => {
      const termObj = BANKING_KNOWLEDGEBASE.find(item => item.id === termId);
      if (!termObj) {
        kbContentView.style.display = 'none';
        kbDefaultView.style.display = 'block';
        return;
      }

      kbDefaultView.style.display = 'none';
      kbContentView.style.display = 'block';

      kbDetailTerm.textContent = termObj.term;
      
      // Category map
      const catMap = {
        payments: 'Payments & Clearing',
        security: 'Security & Treasury',
        lending: 'Lending & Mortgages',
        accounts: 'Accounts & Regulations',
        satirical: 'Satirical & Fictional'
      };
      
      kbDetailCategory.textContent = catMap[termObj.category] || termObj.category;
      
      // Setup colors based on category
      const colorMap = {
        payments: '#0b2f1d',
        security: '#991b1b',
        lending: '#1e3a8a',
        accounts: '#1f2723',
        satirical: '#854d0e'
      };
      kbDetailCategory.style.backgroundColor = colorMap[termObj.category] || 'var(--primary-color)';

      // Core definition
      kbDetailDefinition.textContent = termObj.definition;

      // How it works
      kbDetailHow.textContent = termObj.howItWorks;

      // What can go wrong
      kbDetailWrong.textContent = termObj.whatCanGoWrong;

      // Safeguards
      kbDetailSafeguards.textContent = termObj.safeguards;

      // Related terms cross links
      kbDetailRelated.innerHTML = '';
      if (termObj.related && termObj.related.length > 0) {
        termObj.related.forEach(relId => {
          const relTerm = BANKING_KNOWLEDGEBASE.find(item => item.id === relId);
          if (relTerm) {
            const link = document.createElement('button');
            link.type = 'button';
            link.className = 'kb-related-link';
            link.textContent = relTerm.term;
            link.addEventListener('click', () => {
              activeTermId = relTerm.id;
              // update active styles in side panel
              document.querySelectorAll('.kb-term-item').forEach(el => {
                if (el.textContent === relTerm.term) {
                  el.classList.add('active');
                  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                  el.classList.remove('active');
                }
              });
              showTermDetails(relTerm.id);
            });
            kbDetailRelated.appendChild(link);
          }
        });
      } else {
        kbDetailRelated.textContent = 'None';
      }

      // Diagram
      if (termObj.diagram) {
        kbDiagramContainer.style.display = 'block';
        renderDiagram(termObj.diagram);
      } else {
        kbDiagramContainer.style.display = 'none';
        if (kbDiagramSvgWrapper) kbDiagramSvgWrapper.innerHTML = '';
      }
      
      // Scroll details to top
      kbDetailPane.scrollTop = 0;
    };

    // Category button clicks
    const catButtons = document.querySelectorAll('.kb-cat-btn');
    catButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        catButtons.forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        renderTermsList();
      });
    });

    // Live search input
    if (kbSearchInput) {
      kbSearchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase().trim();
        renderTermsList();
      });
    }

    // Initialize list
    renderTermsList();
    
    // Auto-load first item or a specific hash/param if present
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('kb');
    if (searchParam) {
      const termObj = BANKING_KNOWLEDGEBASE.find(item => item.id === makeId(searchParam) || makeId(item.term) === makeId(searchParam));
      if (termObj) {
        activeTermId = termObj.id;
        renderTermsList();
        showTermDetails(termObj.id);
        
        // scroll list to active
        setTimeout(() => {
          const items = document.querySelectorAll('.kb-term-item');
          items.forEach(el => {
            if (el.textContent === termObj.term) {
              el.classList.add('active');
              el.scrollIntoView({ block: 'nearest' });
            }
          });
        }, 100);
      }
    }
  }
};

// Check if ready state is already interactive or complete
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
