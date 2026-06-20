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
        <h4 style="font-family: sans-serif; font-weight: bold; font-size: 18px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 16px; color: var(--primary-color);">${tour.title}</h4>
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
};

// Check if ready state is already interactive or complete
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
