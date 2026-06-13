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
    const initialCoords = [43.12, -86.30]; // Mid point
    
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
      // User-agent header prevents rate-limiting
      const url = `https://nominatim.openstreetmap.org/search?q=bank+near+${encodeURIComponent(query)}&format=json&limit=5`;
      
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
        { name: "Muskegon Shoreline Branch", lat: 43.234, lon: -86.248, addr: "880 W Norton Ave, Muskegon, MI 49441" },
        { name: "Fruitport Plaza Plaza Branch", lat: 43.125, lon: -86.155, addr: "3540 East Sternberg Rd, Fruitport, MI 49415" },
        { name: "Grand Haven Dunes ATM", lat: 43.064, lon: -86.225, addr: "1720 Washington St, Grand Haven, MI 49417" }
      ];

      map.setView([43.12, -86.20], 12);

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
};

// Check if ready state is already interactive or complete
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
