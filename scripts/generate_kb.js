const fs = require('fs');
const path = require('path');

const KB_FILE_PATH = path.join(__dirname, '..', 'js', 'knowledgebase-data.js');
const makeId = (term) => term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const terms = [];

const generateUniqueSteps = (term, category, definition) => {
  const t = term.toLowerCase();
  const d = definition.toLowerCase();

  // 1. ACH or Nacha
  if (t.includes('ach') || t.includes('nacha') || t.includes('ppd') || t.includes('ccd') || t.includes('ctx')) {
    return [
      "Authorization: A customer signs an agreement or provides digital consent to authorize electronic transfers.",
      "Batch Entry: The payment details are entered into a file and grouped together with thousands of other transactions.",
      "Clearing: The bank transmits the file to a central operator (like the Federal Reserve) which routes the money to the receiving bank.",
      "Posting: The receiving bank posts the transaction, updating the customer's ledger balance."
    ];
  }

  // 2. Wire or Fedwire or SWIFT
  if (t.includes('wire') || t.includes('fedwire') || t.includes('swift') || t.includes('remittance')) {
    return [
      "Request: The sender provides the recipient's bank routing and account numbers.",
      "Verification: The bank confirms the sender's identity and checks that they have enough money to cover the transfer.",
      "Settlement: The funds are moved instantly through a real-time network, debiting the sender's bank and crediting the recipient's bank.",
      "Receipt: The receiving bank deposits the money into the recipient's account immediately."
    ];
  }

  // 3. Checks
  if (t.includes('check') || t.includes('micr') || t.includes('ocr') || t.includes('truncation') || t.includes('presented') || t.includes('image')) {
    return [
      "Writing: The check writer fills out the check with the recipient's name and the exact amount.",
      "Scanning: The recipient scans the check or deposits it at a machine, which takes a picture and reads the magnetic codes at the bottom.",
      "Clearing: The digital check image is sent to the writer's bank to verify the account details and signatures.",
      "Settlement: The writer's account is debited, and the recipient's account is credited with the cleared funds."
    ];
  }

  // 4. Lending / Mortgage
  if (category === 'lending' || t.includes('mortgage') || t.includes('loan') || t.includes('debt') || t.includes('credit') || t.includes('dti') || t.includes('ltv') || t.includes('appraisal') || t.includes('underwriting') || t.includes('closing') || t.includes('amortization') || t.includes('heloc') || t.includes('lien') || t.includes('principal') || t.includes('interest rate') || t.includes('rate') || t.includes('apr') || t.includes('yield') || t.includes('refinanc') || t.includes('point') || t.includes('preapprov') || t.includes('prequalif') || t.includes('covenant') || t.includes('dscr') || t.includes('piti') || t.includes('valuation') || t.includes('closing cost')) {
    return [
      "Application: The borrower submits their credit history, income details, and collateral value to the bank.",
      "Underwriting: The bank's risk experts evaluate the application to see how likely the borrower is to pay back the loan.",
      "Funding: If approved, the bank gives the borrower the loan money or pays the home seller directly.",
      "Repayment: The borrower makes monthly payments to pay back the principal loan amount plus interest over the loan term."
    ];
  }

  // 5. Security / MFA / Password
  if (category === 'security' || t.includes('token') || t.includes('password') || t.includes('mfa') || t.includes('phishing') || t.includes('spoofing') || t.includes('fraud') || t.includes('lockout') || t.includes('session') || t.includes('encryption') || t.includes('audit') || t.includes('sanctions') || t.includes('kyc') || t.includes('aml') || t.includes('positive pay') || t.includes('firewall') || t.includes('hacker') || t.includes('breach') || t.includes('protect') || t.includes('safe') || t.includes('card freeze') || t.includes('whitelis') || t.includes('antivirus') || t.includes('check wash') || t.includes('checksum') || t.includes('fingerprint') || t.includes('luhn')) {
    return [
      "Access Attempt: A user tries to log into the online banking system or initiate a money transfer.",
      "Verification Request: The security system asks for multiple proofs of identity, such as a password and a code sent to your phone.",
      "Validation: The bank's secure servers verify that the credentials and code are correct and match your profile.",
      "Secure Session: The system grants access and encrypts all communications to keep your details safe from hackers."
    ];
  }

  // 6. Savings / Interest / APY / CD / Deposit / Account
  if (t.includes('savings') || t.includes('interest') || t.includes('apy') || t.includes('yield') || t.includes('cd') || t.includes('deposit') || t.includes('account') || t.includes('statement') || t.includes('balance') || t.includes('checking') || t.includes('overdraft') || t.includes('nsf') || t.includes('joint') || t.includes('beneficiary') || t.includes('custodial') || t.includes('trust') || t.includes('ledger') || t.includes('fiduciary') || t.includes('fee') || t.includes('w-9') || t.includes('w-8') || t.includes('tin') || t.includes('fdic') || t.includes('bylaw') || t.includes('reserve') || t.includes('capital') || t.includes('sweep') || t.includes('clearing house netting') || t.includes('bai2') || t.includes('sparta') || t.includes('travel')) {
    return [
      "Deposit: You put money into your savings account or buy a certificate of deposit.",
      "Compounding: The bank calculates interest periodically based on your average balance.",
      "Posting: The bank adds the interest earnings to your account, helping your money grow over time."
    ];
  }

  // 7. Satirical / Fictional
  if (category === 'satirical' || t.includes('beaver') || t.includes('shangri-la') || t.includes('wood') || t.includes('quatloos') || t.includes('sparta') || t.includes('omega') || t.includes('dharma')) {
    return [
      "Satirical Request: A transaction is requested under the whimsical rules of Shangri-La Island.",
      "Beaver Processing: The satirical ledger coordinates wood, timber log reserves, or quatloos.",
      "Humorous Settlement: The system completes the transfer using beaver coins or hydraulic sweeps, updating the sandbox ledger."
    ];
  }

  // 8. General Fallback
  return [
    "Initiation: You start the process by entering information in your online account or speaking with a banker.",
    "Verification: The bank's computer systems check the account number, routing details, or credentials to make sure they are correct.",
    "Ledger Update: The bank records the transaction in its secure digital ledger and updates your available balance."
  ];
};

const generateUniqueContext = (term, category, definition) => {
  const t = term.toLowerCase();
  const d = definition.toLowerCase();

  // 1. ACH or Nacha
  if (t.includes('ach') || t.includes('nacha') || t.includes('ppd') || t.includes('ccd') || t.includes('ctx')) {
    return `For you as a customer, this is how your employer deposits your paycheck directly into your account and how companies pay recurring bills like utilities or gym memberships. It is a highly convenient system that eliminates paper check clutter and saves you trips to the bank branch.`;
  }

  // 2. Wires
  if (t.includes('wire') || t.includes('fedwire') || t.includes('swift') || t.includes('remittance')) {
    return `You will typically use this when you need to send a large sum of money quickly and securely, such as a down payment on a house. Because wire transfers settle in minutes and are permanent, you should always double-check the recipient's routing and account numbers before sending.`;
  }

  // 3. Checks
  if (t.includes('check') || t.includes('micr') || t.includes('ocr') || t.includes('truncation') || t.includes('presented') || t.includes('image')) {
    return `This technology allows you to deposit checks using your smartphone camera or a scanner without having to mail or deliver the physical paper check to a bank. It makes check clearing faster and more secure, ensuring your funds are available in your balance sooner.`;
  }

  // 4. Lending / Mortgage
  if (category === 'lending' || t.includes('mortgage') || t.includes('loan') || t.includes('debt') || t.includes('credit') || t.includes('dti') || t.includes('ltv') || t.includes('appraisal') || t.includes('underwriting') || t.includes('closing') || t.includes('amortization') || t.includes('heloc') || t.includes('lien') || t.includes('principal') || t.includes('interest rate') || t.includes('rate') || t.includes('apr') || t.includes('yield') || t.includes('refinanc') || t.includes('point') || t.includes('preapprov') || t.includes('prequalif') || t.includes('covenant') || t.includes('dscr') || t.includes('piti') || t.includes('valuation') || t.includes('closing cost')) {
    return `Understanding this concept helps you make smart borrowing decisions. By keeping your debts low and your credit history clean, you can qualify for lower interest rates on loans, which saves you thousands of dollars over the life of your mortgage or car loan.`;
  }

  // 5. Security / MFA / Password
  if (category === 'security' || t.includes('token') || t.includes('password') || t.includes('mfa') || t.includes('phishing') || t.includes('spoofing') || t.includes('fraud') || t.includes('lockout') || t.includes('session') || t.includes('encryption') || t.includes('audit') || t.includes('sanctions') || t.includes('kyc') || t.includes('aml') || t.includes('positive pay') || t.includes('firewall') || t.includes('hacker') || t.includes('breach') || t.includes('protect') || t.includes('safe') || t.includes('card freeze') || t.includes('whitelis') || t.includes('antivirus') || t.includes('check wash') || t.includes('checksum') || t.includes('fingerprint') || t.includes('luhn')) {
    return `This security measure is your main defense against online thieves who want to steal your money. By requiring rotating codes or strong passwords, the bank ensures that even if someone steals your login credentials, they cannot access your money without your physical device.`;
  }

  // 6. Savings / Interest / APY / CD / Deposit / Account
  if (t.includes('savings') || t.includes('interest') || t.includes('apy') || t.includes('yield') || t.includes('cd') || t.includes('deposit') || t.includes('account') || t.includes('statement') || t.includes('balance') || t.includes('checking') || t.includes('overdraft') || t.includes('nsf') || t.includes('joint') || t.includes('beneficiary') || t.includes('custodial') || t.includes('trust') || t.includes('ledger') || t.includes('fiduciary') || t.includes('fee') || t.includes('w-9') || t.includes('w-8') || t.includes('tin') || t.includes('fdic') || t.includes('bylaw') || t.includes('reserve') || t.includes('capital') || t.includes('sweep') || t.includes('clearing house netting') || t.includes('bai2') || t.includes('sparta') || t.includes('travel')) {
    return `This helps you plan your savings goals. By choosing accounts with higher interest yields or Certificates of Deposit for money you don't need immediately, you put your money to work, allowing it to grow steadily and safely with deposit insurance protection.`;
  }

  // 7. Satirical / Fictional
  if (category === 'satirical' || t.includes('beaver') || t.includes('shangri-la') || t.includes('wood') || t.includes('quatloos') || t.includes('sparta') || t.includes('omega') || t.includes('dharma')) {
    return `This provides a fun, satirical layer to our platform, allowing you to explore the creative mythology of Shangri-La Island and Beaver Enterprises while testing out the interactive features of our online banking portal.`;
  }

  // 8. General Fallback
  return `This is a fundamental part of the banking ecosystem. Knowing how it works helps you understand your monthly statements, avoid service fees, and manage your money more effectively and securely.`;
};

const addTerm = (term, category, definition, steps, context, related = [], diagram = null) => {
  let finalSteps = steps;
  let finalContext = context;

  const isGenericSteps = !steps || steps.length === 0 || 
    (steps.length === 1 && steps[0].includes("standard core systems")) ||
    (steps.length === 1 && steps[0].includes("Administered by corporate security")) ||
    (steps.length === 1 && steps[0].includes("Calculated using standard financial")) ||
    (steps.length === 1 && steps[0].includes("Deposits are managed in secure")) ||
    (steps.length === 1 && steps[0].includes("Executed according to the fictional")) ||
    (steps.length === 1 && steps[0].includes("Underwriters check credit histories")) ||
    (steps.length === 1 && steps[0].includes("The security console logs")) ||
    (steps.length === 1 && steps[0].includes("Deposit core systems track")) ||
    (steps.length === 1 && steps[0].includes("Satirical core ledgers")) ||
    (steps.length === 2 && steps[0].includes("Initiation: A transaction is entered"));

  if (isGenericSteps) {
    finalSteps = generateUniqueSteps(term, category, definition);
  }

  const isGenericContext = !context || 
    context.includes("Standard encryption and token filters") ||
    context.includes("This protects your digital portal accounts") ||
    context.includes("This determines your borrowing terms") ||
    context.includes("This manages your transactional funds") ||
    context.includes("This provides lighthearted banking humor");

  if (isGenericContext) {
    finalContext = generateUniqueContext(term, category, definition);
  }

  let content = '';

  // Section 1: Overview (Wikipedia Style)
  content += `<h3 style="font-size: 16px; font-weight: 700; color: var(--primary-color); margin-top: 0; margin-bottom: 12px; font-family: serif; border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">1. Overview</h3>`;
  content += `<p style="line-height: 1.7; margin-bottom: 16px; color: var(--text-dark); font-size: 14.5px;">`;
  content += `To understand <strong>${term}</strong>, it helps to start with the absolute basics of how banking works. A bank is a secure place where people and businesses keep their money. Instead of carrying large amounts of cash or hiding it at home, you store it in a bank account. The bank keeps track of exactly how much money is yours using a digital record called a ledger. `;
  
  if (category === 'payments') {
    content += `When you buy something, pay a bill, or receive your salary, money must move from one person's account to another. Payments and clearing systems are the electronic roads and traffic rules that allow these funds to travel safely between different banks.`;
  } else if (category === 'security') {
    content += `Because a bank stores a community's wealth, keeping it safe is the bank's most important job. Banks use advanced security rules, secret codes, and multi-step verification checks to make sure that only you can access or spend your money.`;
  } else if (category === 'lending') {
    content += `Sometimes, you need to buy something that costs more than you have saved, like a house, a car, or supplies for a new business. Banks help by lending you the money upfront. You then agree to pay the bank back slowly over time, usually with an extra fee called interest.`;
  } else if (category === 'accounts') {
    content += `To help people save and spend, banks offer different types of accounts. Each account is like a specialized digital pocket with its own rules, interest earnings, and government protections to keep the financial system fair and transparent.`;
  } else if (category === 'satirical') {
    content += `In our fictional corporate environment, Big Beaver Bank operates under unique, playful guidelines that bend the standard rules of physics and finance, bringing lighthearted humor to our banking sandbox.`;
  }
  content += `</p>`;

  let cleanDef = definition.charAt(0).toLowerCase() + definition.slice(1);
  if (!cleanDef.endsWith('.')) cleanDef += '.';

  content += `<p style="line-height: 1.7; margin-bottom: 20px; color: var(--text-dark); font-size: 14.5px;">`;
  content += `In this system, <strong>${term}</strong> is defined as <em>${cleanDef}</em> It serves as a vital component of daily banking operations, ensuring that transactions are recorded correctly, assets are safeguarded, and credit is evaluated fairly.`;
  content += `</p>`;

  // Section 2: Step-by-Step Tutorial
  if (finalSteps && finalSteps.length > 0) {
    content += `<h3 style="font-size: 16px; font-weight: 700; color: var(--primary-color); margin-top: 24px; margin-bottom: 12px; font-family: serif; border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">2. How It Works: Step-by-Step Tutorial</h3>`;
    content += `<p style="line-height: 1.7; margin-bottom: 14px; color: var(--text-dark); font-size: 14px;">`;
    content += `Here is a step-by-step breakdown explaining how this concept functions in practice:`;
    content += `</p>`;

    content += `<ol style="margin-left: 20px; margin-bottom: 24px; display: flex; flex-direction: column; gap: 10px; padding-left: 0; list-style-type: decimal;">`;
    for (let i = 0; i < finalSteps.length; i++) {
      let stepText = finalSteps[i];
      stepText = stepText.replace(/^\d+\.\s*/, '');
      content += `<li style="line-height: 1.6; padding-left: 6px; color: var(--text-dark); font-size: 13.5px;">`;
      if (stepText.includes(':')) {
        const parts = stepText.split(':');
        content += `<strong>${parts[0]}:</strong>${parts.slice(1).join(':')}`;
      } else {
        content += stepText;
      }
      content += `</li>`;
    }
    content += `</ol>`;
  }

  // Section 3: Practical Impact
  if (finalContext) {
    content += `<h3 style="font-size: 16px; font-weight: 700; color: var(--primary-color); margin-top: 24px; margin-bottom: 12px; font-family: serif; border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">3. Practical Impact: Why This Matters to You</h3>`;
    content += `<p style="line-height: 1.7; color: var(--text-dark); font-size: 14.5px; margin-bottom: 20px;">`;
    content += finalContext;
    content += `</p>`;
  }

  terms.push({
    id: makeId(term),
    term,
    category,
    definition: definition.endsWith('.') ? definition : definition + '.',
    content,
    related: related.map(t => makeId(t)),
    diagram
  });
};

// ==========================================
// 1. PAYMENTS AND CLEARING (65 terms)
// ==========================================
addTerm(
  "ACH System", "payments",
  "a secure electronic network used by banks in the United States to transfer money and process payments in batches.",
  [
    "Authorization: You sign an agreement giving a company or employer permission to deposit or withdraw funds.",
    "Instruction: The company initiates the payment file and sends it to their financial institution.",
    "Batching: The bank groups your payment with thousands of other requests into a large batch file.",
    "Clearing: A central operator (like the Federal Reserve) receives the batch, checks the accounts, and routes it to your bank.",
    "Posting: Your bank clears the transaction and deposits or withdraws the funds from your account."
  ],
  "It is the main system used for direct deposit of your paycheck and automated bill payments. Since it processes in batches, transfers usually take 1 to 3 business days, keeping processing costs close to zero for customers.",
  ["ODFI", "RDFI", "ACH Operator", "Nacha Rules", "Same-Day ACH", "Direct Deposit"],
  "ach-flow"
);

addTerm(
  "ODFI", "payments",
  "the Originating Depository Financial Institution—specifically, the bank that starts or 'originates' a payment instruction on the ACH network.",
  [
    "Instruction Collection: The ODFI collects transaction files from companies or customers.",
    "Validation: The bank checks that files meet safety requirements and format standards.",
    "Transmission: The bank bundles these files into batches and routes them to the central clearing network."
  ],
  "When your employer sends your monthly paycheck via direct deposit, their bank acts as the ODFI, starting the process of sending money to your account.",
  ["ACH System", "RDFI", "Nacha Rules"],
  null
);

addTerm(
  "RDFI", "payments",
  "the Receiving Depository Financial Institution—specifically, the bank that receives payment files from the ACH network and deposits them into your account.",
  [
    "File Reception: The RDFI receives sorted transaction files from the central operator.",
    "Account Lookup: The bank's database matches account numbers to confirm they are active.",
    "Fund Crediting: The bank posts the funds, making the money available in your checking or savings account."
  ],
  "When you receive a direct deposit, Big Beaver Bank acts as the RDFI, receiving the funds from the network and placing them in your balance.",
  ["ACH System", "ODFI", "ACH Operator"],
  null
);

addTerm(
  "ACH Operator", "payments",
  "the central clearing hub (run by the Federal Reserve or EPN) that routes transaction files between originating banks and receiving banks.",
  [
    "Reception: The operator receives batched transaction files from originating banks (ODFIs) across the country.",
    "Sorting: The operator's mainframes sort every transaction by its destination bank routing number.",
    "Routing: The operator sends the sorted batches to the respective receiving banks (RDFIs) for posting."
  ],
  "It acts like a central post office, ensuring that electronic payments sent from any bank in the country find their way to the correct destination bank.",
  ["ACH System", "ODFI", "RDFI", "Settlement"],
  null
);

addTerm(
  "Nacha Rules", "payments",
  "the guidelines and operating standards set by the National Automated Clearing House Association that all banks must follow when sending electronic payments.",
  [
    "Agreement: Banks sign covenants agreeing to comply with standard network guidelines.",
    "Format Enforcement: Software ensures all electronic transaction records are exactly 94 characters wide.",
    "Dispute Windows: Rules define the timeframe (e.g. 60 days for consumers) to dispute unauthorized debits."
  ],
  "These rules protect you as a consumer by establishing clear timelines for disputing unauthorized charges and ensuring all banks handle electronic transfers safely.",
  ["ACH System", "Nacha SEC Codes"],
  null
);

addTerm(
  "Nacha SEC Codes", "payments",
  "Standard Entry Class codes—three-letter tags in electronic transaction files that tell banks what type of transfer is occurring.",
  [
    "Tagging: Transactions are marked with codes like PPD (payroll) or CCD (business payments).",
    "Processing: Bank systems parse the SEC codes to apply the correct consumer protection rules."
  ],
  "These codes ensure your personal payroll deposits are handled with consumer protection rules, while business transfers follow business-to-business rules.",
  ["ACH System", "Nacha Rules", "PPD", "CCD"],
  null
);

addTerm(
  "PPD", "payments",
  "Prearranged Payment and Deposit—the specific electronic code used for consumer transactions, such as your payroll direct deposits or automated utility bill payments.",
  [
    "Authorization: You sign a direct deposit form at work or bill authorization online.",
    "Tagging: The originating bank labels the transaction batch with the 'PPD' SEC code.",
    "Execution: The funds clear, and the receiving bank applies consumer protection rules."
  ],
  "This code ensures that recurring payments (like gym memberships or insurance) are classified under consumer guidelines, giving you a 60-day dispute window if a charge is incorrect.",
  ["Nacha SEC Codes", "ACH System"],
  null
);

addTerm(
  "CCD", "payments",
  "Corporate Credit or Debit—the electronic transaction code used strictly for business-to-business payments, tax payments, or internal business cash transfers.",
  [
    "Authorization: A corporate customer authorizes a vendor to debit their business account.",
    "Processing: The transaction is cleared under business-to-business rules, which have much shorter dispute windows."
  ],
  "Businesses use CCD to pay suppliers or make tax payments. Because it is business-to-business, it does not carry consumer protection windows, requiring businesses to check balances daily.",
  ["Nacha SEC Codes", "ACH System"],
  null
);

addTerm(
  "Wire Transfer", "payments",
  "a method of electronic funds transfer that moves money between bank accounts in real-time, typically used for high-value or time-sensitive transactions.",
  [
    "Request: You submit a wire transfer form with the recipient's name, routing number, and account number.",
    "Verification: The bank instantly verifies your available balance and confirms your identity.",
    "Dispatch: The bank sends the transfer instruction through a secure real-time network (like Fedwire).",
    "Credit: The recipient's bank clears the incoming message and immediately posts the funds."
  ],
  "Wires are processed individually and settle in minutes. Because wire transfers are immediate and irrevocable, they are commonly used in home purchases (down payments) but require caution, as sent funds cannot be recalled.",
  ["Fedwire", "SWIFT", "Settlement"],
  "wire-flow"
);

addTerm(
  "SWIFT", "payments",
  "the Society for Worldwide Interbank Financial Telecommunication—a global messaging network that banks use to securely exchange international transfer instructions.",
  [
    "Messaging: A bank formats a standard SWIFT message (such as an MT103 wire instruction).",
    "Transmission: The message is transmitted securely to the destination bank overseas.",
    "Settlement: The receiving bank reads the message and coordinates fund clearing through correspondent accounts."
  ],
  "SWIFT does not move actual cash; it acts like a secure international chat system for banks. When you send money abroad, SWIFT carries the instructions so foreign banks know to credit the recipient.",
  ["Wire Transfer", "Correspondent Banking"],
  null
);

addTerm(
  "Fedwire", "payments",
  "the Federal Reserve's real-time gross settlement system, used by US banks to move large values of money instantly.",
  [
    "Submission: A bank submits a Fedwire instruction to their local Federal Reserve bank.",
    "Settlement: The Federal Reserve debits the sending bank's reserve account and credits the receiving bank's reserve account.",
    "Completion: The funds are instantly cleared and available."
  ],
  "This is the backbone of the US financial system, used by banks to settle accounts with each other and process urgent transfers (like home closing wires) safely and instantly.",
  ["Wire Transfer", "Settlement"],
  null
);

addTerm(
  "Routing Transit Number", "payments",
  "a unique nine-digit number printed on the bottom of your checks that identifies your specific bank to the clearing network.",
  [
    "Input: You enter your routing number on a deposit or payment form.",
    "Verification: Payment processors run a mathematical checksum (Luhn Mod 10) to verify the number is valid.",
    "Routing: The payment system uses the code to locate your bank and route the transaction."
  ],
  "It acts like a postal ZIP code for your bank. For check clearings or direct deposits to reach Big Beaver Bank, they must be labeled with our routing number: **987654321**.",
  ["Account Number", "ACH System"],
  null
);

addTerm(
  "Account Number", "payments",
  "a unique sequence of numbers assigned to your checking, savings, or loan account that identifies it within your bank.",
  [
    "Input: You provide your account number along with the bank's routing number.",
    "Matching: The bank's database matches incoming payments to your specific customer ledger."
  ],
  "While the routing number gets the money to your bank, your account number is like your apartment number, directing the funds to your specific personal balance.",
  ["Routing Transit Number", "Ledger Balance"],
  null
);

// Helper for shorter payment terms to keep code compact but rich
const addPaymentsGlossary = (term, definition, stepDescription, mattersText) => {
  addTerm(
    term, "payments", definition,
    [
      "Initiation: A transaction is entered in the system with the required account details.",
      stepDescription
    ],
    mattersText,
    ["ACH System", "Wire Transfer"]
  );
};

addPaymentsGlossary("ACH Return", "a notification that an electronic transfer could not be completed and is being sent back.", "Return: The receiving bank rejects the transaction and routes the file back with an explanation code.", "If you make a typo in an account number when paying a bill, the merchant's bank will receive an ACH Return, and you may be charged a returned item fee.");
addPaymentsGlossary("Return Codes", "three-character codes (like R01 or R10) indicating why an electronic transaction failed.", "Parsing: Bank software reads the return code to determine the exact cause of the payment failure.", "These codes allow customer service representatives to explain exactly why a payment failed (e.g. R01 means insufficient funds).");
addPaymentsGlossary("R01", "the specific ACH return code for Insufficient Funds.", "Bouncing: The receiving bank detects that the account has inadequate funds and returns the transfer marked as R01.", "This code appears when a bill payment bounces because there was not enough money in the checking account at the time of clearing.");
addPaymentsGlossary("R02", "the ACH return code for a Closed Account.", "Bouncing: The bank checks the database, finds the account has been permanently closed, and returns the transaction.", "If you switch banks but forget to update a direct deposit instruction, the sender will receive an R02 return notice.");
addPaymentsGlossary("R03", "the ACH return code for 'No Account' or 'Unable to Locate Account'.", "Bouncing: The bank's search systems fail to find any matching account number and return the file.", "This return code indicates that the account number entered does not exist or has a typo.");
addPaymentsGlossary("R04", "the ACH return code for an Invalid Account Number structure.", "Bouncing: The bank's system checks the account digits against standard formats, detects a mismatch, and rejects it.", "This occurs when the length or checksum structure of the account number is mathematical nonsense.");
addPaymentsGlossary("R10", "the ACH return code indicating that a customer has disputed an unauthorized debit.", "Dispute: The consumer files a dispute statement, and the receiving bank forces a return of the funds from the originator.", "This is a key consumer protection tool. If a merchant charges your checking account without permission, you can sign a dispute to reverse the funds.");
addPaymentsGlossary("Originator", "the person or company that sets up and starts an ACH transfer.", "Creation: The Originator obtains permission and submits payment files to their bank.", "When your employer sets up direct deposit, they are the Originator of the transactions.");
addPaymentsGlossary("Receiver", "the person or business that gets the money (or has money withdrawn) in an electronic ACH transfer.", "Reception: The Receiver's account is credited or debited by the receiving bank.", "When you receive your paycheck via direct deposit, you are the Receiver of the transaction.");
addPaymentsGlossary("EPN", "the Electronic Payments Network—the private clearing network that processes electronic payments alongside the Federal Reserve.", "Clearing: EPN receives files from banks, nets accounts, and routes transactions.", "E2E electronic banking relies on either the Federal Reserve or EPN to move payments between commercial banks.");
addPaymentsGlossary("Bilateral Netting", "a process where two banks offset what they owe each other, settling only the difference.", "Offsetting: Systems calculate total obligations between Bank A and Bank B, resulting in a single net settlement.", "This reduces the total amount of money that actually needs to move between banks, making clearing faster and cheaper.");
addPaymentsGlossary("Multilateral Netting", "a clearing system that offsets obligations among many banks to find a single net settlement for each bank.", "Calculation: A central clearing house offsets all interbank claims to find a single net debit or credit for each participant.", "This allows the entire banking system to settle billions of dollars in daily transactions with only a fraction of actual reserves.");
addPaymentsGlossary("Clearing Cycle", "the time required for a check or electronic transfer to be cleared and settled between banks.", "Timeline: Checks are scanned, routed, matched, and finally settled via reserve accounts.", "Understanding the cycle helps you know when a deposited check will clear and when the money will be available in your balance.");
addPaymentsGlossary("ANSI X9.37", "the standardized file format used by banks to exchange check images electronically.", "Encoding: Check scanners digitize the front and back of checks and compile the images into X9.37 records.", "This standard makes digital check deposits possible, allowing check images to clear in hours instead of days.");
addPaymentsGlossary("Check 21 Act", "the Check Clearing for the 21st Century Act—a federal law that allowed banks to use digital images of checks for clearing.", "Scanning: Banks scan checks and destroy physical paper checks, clearing them via digital images.", "Before this law, banks had to physically fly paper checks across the country to clear them. Now, checks clear instantly via digital images.");
addPaymentsGlossary("Transit Code", "the specific part of the routing number that tells payment networks how to route a check.", "Sorting: Sorting machines read the transit digits to identify the Federal Reserve clearing branch.", "This ensures that a check written in Michigan is routed back to a Michigan clearing house for processing.");
addPaymentsGlossary("Remittance", "a payment sent to a distant party, usually to settle a bill or invoice.", "Transfer: A customer initiates a transfer to pay for services rendered.", "When a business pays a supplier's invoice, they send a remittance detail to explain which invoice is being paid.");
addPaymentsGlossary("EDI", "Electronic Data Interchange—a structured data format used by companies to exchange invoices and payments automatically.", "Parsing: Business databases exchange structured XML/EDI files containing invoice and payment details.", "This enables large companies to automate their billing and payments, removing the need for manual paperwork.");
addPaymentsGlossary("B2B Payments", "business-to-business transactions, which typically use CCD or CTX codes on the electronic network.", "Execution: Corporate accounts exchange high-value payroll or vendor payments.", "These payments settle larger company-to-company debts and are subject to commercial laws rather than consumer protection rules.");
addPaymentsGlossary("P2P Payments", "peer-to-peer transfers, allowing individuals to send money directly to friends or family.", "Routing: You use an app to send money, which instantly debits your account and credits the recipient's bank.", "This is used for casual payments like splitting a dinner bill, transferring money instantly to other checking accounts.");
addPaymentsGlossary("A2A Transfers", "account-to-account transfers moving money between different accounts owned by the same person.", "Clearing: A customer links their checking account at Bank A to their checking account at Bank B and transfers funds.", "This allows you to move money between your checking account and an external high-yield savings account easily.");
addPaymentsGlossary("ACH Block", "a security feature that blocks all electronic debits from posting to a bank account.", "Filtering: The bank's software rejects any incoming ACH debit file by default.", "This is used by businesses to protect their operational accounts from fraud, ensuring no external merchant can withdraw cash.");
addPaymentsGlossary("ACH Filter", "a security tool that blocks all electronic debits unless the merchant's ID is pre-approved.", "Checking: The bank compares incoming debit requests against a list of approved company IDs.", "This lets businesses automate utility bill payments while blocking all other unauthorized companies from taking money.");
addPaymentsGlossary("WEB SEC Code", "the electronic code used for ACH payments authorized over the internet.", "Authorization: You enter check details on an online checkout page, creating a 'WEB' batch transaction.", "This code tells banks that the customer authorized the payment through a secure web portal.");
addPaymentsGlossary("TEL SEC Code", "the electronic code used for ACH payments authorized over the telephone.", "Authorization: You authorize a payment over the phone, and the operator logs a 'TEL' transaction.", "This requires the merchant to record your voice authorization and verify your identity before submitting the debit.");
addPaymentsGlossary("POP SEC Code", "Point-of-Purchase check conversion—converting a paper check into an electronic transfer at a cash register.", "Conversion: A cashier runs your paper check through a scanner, voids the check, and submits an electronic transfer.", "This speeds up retail checkouts by clearing your check electronically as a debit immediately.");
addPaymentsGlossary("ARC SEC Code", "Accounts Receivable Conversion—converting checks received in the mail into electronic ACH debits.", "Conversion: A billing department scans check drafts received in the mail and clears them digitally.", "This allows utility companies or credit card issuers to process your mailed check payments much faster.");
addPaymentsGlossary("BOC SEC Code", "Back Office Conversion—converting checks received at registers into electronic transfers in back office rooms.", "Conversion: Retail staff gather paper checks at the end of the day and scan them in batches in the back office.", "This reduces check handling costs by eliminating the need to take physical checks to a bank branch.");
addPaymentsGlossary("Nacha File Header", "the first row in a Nacha file defining file identifiers and originating bank BICs.", "Reading: Systems read the header to verify the file source.", "This identifies which bank is sending the file to the clearing network.");
addPaymentsGlossary("Nacha Batch Header", "the row in a Nacha file defining SEC codes, company names, and payment dates.", "Reading: Systems read the batch header to group transactions.", "This tells the bank what type of payment is inside the batch (e.g. payroll).");
addPaymentsGlossary("Nacha Entry Detail", "the individual transaction row containing recipient routing, accounts, and values.", "Reading: Systems read the detail to locate individual accounts.", "This is the actual payment instruction for a specific customer.");
addPaymentsGlossary("Nacha Addenda Record", "optional rows providing supplementary details (like invoice numbers) for electronic payments.", "Reading: Systems read the addenda to reconcile payments.", "This allows corporate accounting systems to match payments to specific bills.");
addPaymentsGlossary("Nacha Batch Control", "the control row summing batch transaction counts and dollar values to verify totals.", "Checking: Systems sum the batch rows and compare them to the control totals.", "This ensures no transactions were dropped or altered during transmission.");
addPaymentsGlossary("Nacha File Control", "the final control row summing all batch counts to verify entire file totals.", "Checking: Systems run checks on the entire file to verify totals.", "This is the final check to confirm the entire file cleared successfully.");
addPaymentsGlossary("Immediate Settlement", "clearing payment obligations in real-time as they clear instead of at scheduled times.", "Settling: Central banks debit and credit reserve accounts instantly.", "This enables instant payment networks (like FedNow) to operate 24/7/365.");
addPaymentsGlossary("Intraday Liquidity", "funds available to a bank to settle obligations throughout the business day.", "Monitoring: Banks track reserve balances to ensure they can settle outgoing transfers.", "This prevents bank clearing queues from backing up during active business hours.");
addPaymentsGlossary("RTGS", "Real-Time Gross Settlement—continuous, instant settlement of payment obligations on an entry-by-entry basis.", "Settling: Systems settle each payment instantly rather than netting them in batches.", "This is the standard for urgent, high-value transfers, eliminating clearing delays.");
addPaymentsGlossary("Clearing House Netting", "consolidating and offsetting cross-bank obligations daily.", "Offsetting: Systems calculate net balances between member institutions.", "This simplifies interbank settlement by reducing millions of payments to single net transfers.");
addPaymentsGlossary("Direct Deposit", "automated electronic payroll deposits initiated via the ACH network.", "Posting: Your employer's bank sends your payroll file, and your bank deposits the funds.", "This eliminates physical check drafts, placing your salary directly into your checking account.");
addPaymentsGlossary("Wire Dispatch Form", "the interface used to schedule wire transfers.", "Input: You enter the recipient's details to submit a wire.", "This collects details and verifies your token security before starting the wire.");
addPaymentsGlossary("Card Authorization Log", "the database log of all debit card swipe permissions.", "Logging: The system logs the merchant name, card number, and approval status.", "This helps fraud teams identify where a card was swiped if unauthorized charges occur.");
addPaymentsGlossary("Ledger Posting", "updating the master account database with cleared transaction details.", "Posting: The core database updates your account balance.", "This changes your ledger balance from pending to cleared once funds shift.");
addPaymentsGlossary("Presented Exception", "an incoming check that does not match the issue registry.", "Routing: Discrepancies are routed to an operator queue for verification.", "This stops fraudulent checks from clearing, requiring manual approval.");
addPaymentsGlossary("ACH Block List", "the database of blocked Originator IDs on a checking account.", "Filtering: The bank compares incoming IDs against the block list.", "This blocks unauthorized companies from withdrawing funds from your account.");
addPaymentsGlossary("POS Terminal Scan", "processing credit or debit cards at point-of-sale terminals.", "Scanning: The terminal reads the card token and requests authorization.", "This initiates a credit card transaction at checkout counters.");
addPaymentsGlossary("eStatement Portal", "the secure tab containing statement archives.", "Viewing: Customers log in to view PDF statement copies.", "This provides a secure history of your account ledgers without paper clutter.");
addPaymentsGlossary("W-9 Verification", "bypassing backup tax withholdings by certifying TIN numbers.", "Verifying: The system confirms the TIN format is correct.", "This certifies your tax ID so the bank does not have to withhold tax from your interest.");
addPaymentsGlossary("Checking APY", "the yield returned on checking account balances.", "Paying: Interest is calculated and paid monthly on your balance.", "This tells you how much interest your checking balance will earn annually.");
addPaymentsGlossary("Savings APY", "the yield returned on savings account balances.", "Paying: Interest is calculated and posted to your savings.", "This shows your earnings rate on savings reserves.");
addPaymentsGlossary("CD Yield", "the return rate of a Certificate of Deposit.", "Paying: The CD earns a fixed rate until maturity.", "This is the fixed interest rate you earn for locking your CD funds.");
addPaymentsGlossary("Regulation E", "federal regulation protecting consumers in electronic fund transfers.", "Enforcement: The bank investigates reported billing errors or card losses.", "This limits your liability for unauthorized card charges if reported promptly.");
addPaymentsGlossary("Regulation D", "federal regulation historically limiting savings account withdrawals.", "Enforcement: Systems monitor and limit savings withdrawals to six per month.", "This encourages customers to keep savings deposits stable rather than transactional.");
addPaymentsGlossary("Regulation CC", "federal regulation governing check clearing timelines and deposit holds.", "Enforcement: The bank determines when deposited check funds must be made available.", "This ensures banks cannot hold your check deposits indefinitely, enforcing standard timelines.");
addPaymentsGlossary("Truth in Savings Act", "regulations requiring transparent disclosure of APYs and account fees.", "Enforcement: Banks list APYs and fees in simple disclosure documents.", "This protects you from hidden fees, allowing you to compare savings products easily.");
addPaymentsGlossary("Equal Housing Lender", "fair lending regulations blocking discrimination in mortgage lending.", "Enforcement: Underwriters evaluate mortgage loans based strictly on credit standards.", "This ensures every applicant is treated fairly when applying for home loans.");
addPaymentsGlossary("Interest Bearing Account", "an account paying interest on balances.", "Paying: The bank credits interest to your account periodically.", "This allows your deposits to grow over time by earning interest.");
addPaymentsGlossary("Capital Adequacy", "regulatory rules requiring banks to hold capital cushions.", "Monitoring: Auditors check that the bank's capital reserves meet requirements.", "This protects depositors by ensuring the bank holds reserves to absorb loan losses.");
addPaymentsGlossary("Reserve Requirements", "the value of reserves banks must hold at Federal Reserve banks.", "Monitoring: The bank maintains reserve balances to clear interbank settlements.", "This ensures the bank has adequate liquid reserves to process daily settlements.");
addPaymentsGlossary("Clearing House", "an intermediary entity that collects, validates, nets, and exchanges transactions between member banks.", "Clearing: Member banks submit transactions, and the house nets the balances.", "This simplifies the clearing process by consolidates millions of check clearings into single daily netting reports.");
addPaymentsGlossary("Float", "the time interval between starting a transaction and settling the funds.", "Waiting: The check clears through the network, and the payer's account is eventually debited.", "This represents the time when money has been deducted from one bank but not yet posted to another.");
addPaymentsGlossary("Check truncation", "the process of removing physical paper checks from the clearing stream and replacing them with digital images.", "Scanning: The check is scanned, and the digital image cash letter is sent for clearing.", "This eliminates the cost of transporting paper checks, speeding up check clearing cycles.");
addPaymentsGlossary("Image Cash Letter", "the electronic file containing check images and MICR records.", "Encoding: Check scanners digitize check drafts and compile ANSI records.", "This is the digital file that replaces physical checks during the clearing cycle.");
addPaymentsGlossary("MICR Reader", "a device that reads magnetic ink characters printed at the bottom of checks.", "Reading: The reader detects the magnetic ink waveform to parse bank codes.", "This ensures high accuracy when reading routing and account numbers from checks.");
addPaymentsGlossary("OCR Scanner", "optical character recognition—software that extracts readable text from check images.", "Reading: Software scans check photos to read amounts and hand-written payees.", "This automates check deposits by reading check values from images.");
addPaymentsGlossary("Real-Time Payments", "an instant payment network in the US, enabling immediate fund clearing and settlement.", "Settling: RTP moves funds between bank reserve accounts in seconds.", "This allows you to send and receive payments instantly at any time of day.");
addPaymentsGlossary("Cash Sweep", "an automated service that transfers excess checking balances to savings.", "Sweeping: Software checks balances daily and moves excesses above a set threshold.", "This puts your idle cash to work in higher-yield savings accounts automatically.");
addPaymentsGlossary("Sweep Threshold", "the configured target balance in a checking account that triggers cash sweeps.", "Sweeping: Software monitors checking balances and sweeps differences.", "This keeps enough cash in checking for daily expenses while sweeping extra funds to earn interest.");
addPaymentsGlossary("Timber Sweeps", "a unique sweep program at Big Beaver Bank that sweeps checking balances to fund timber reserves.", "Sweeping: Excess deposits are swept daily into high-yield timber assets.", "This satirical program supports beaver-themed reforestation projects while earning interest.");

// ==========================================
// 2. SECURITY & TREASURY (50 terms)
// ==========================================
const addSecurityTerm = (term, definition, steps, context, related = []) => {
  addTerm(term, "security", definition, steps, context, related);
};

addSecurityTerm(
  "Multi-Factor Authentication", "an online security system that requires you to provide two or more separate proofs of your identity before logging in.",
  [
    "Password Entry: You enter your standard username and password.",
    "Verification Request: The bank requests a second verification proof (like a code text or soft-token).",
    "Verification Code: You enter the unique, rotating 6-digit verification code.",
    "Access Granted: The security engine validates the code and opens your dashboard."
  ],
  "MFA adds a critical layer of protection. Even if a scammer steals your password, they cannot access your account without your physical phone or token device.",
  ["MFA Soft-Token", "Token Countdown", "Cybersecurity"]
);

addSecurityTerm(
  "Maker-Checker Controls", "a security policy that requires two different bank or corporate employees to complete a single high-value transaction.",
  [
    "Creation: One employee (the 'Maker') creates a transaction, such as a wire transfer or ACH payroll file.",
    "Pending Queue: The transaction is placed in a secure pending queue and remains unpaid.",
    "Review: A separate employee (the 'Checker') reviews the transaction details for accuracy.",
    "Approval: The Checker approves the transaction, and the bank processes the payment."
  ],
  "This dual control mechanism prevents internal errors and payment fraud. A single employee cannot steal funds or send payments without a second supervisor reviewing and approving it first.",
  ["Dual Control Registry", "Approvals Queue", "Administrative Audit"]
);

addSecurityTerm(
  "Positive Pay", "a fraud prevention service offered to businesses that matches checks presented for payment against a list of checks previously issued by the business.",
  [
    "Issue Registry: A business uploads a CSV file listing all checks they wrote (check number, payee, and amount).",
    "Presentation: A check is presented at a bank branch or deposited via mobile scan.",
    "Matching: The bank's system compares the check details against the issue registry.",
    "Decision: If details mismatch, the check is blocked, and the business chooses whether to pay or return it."
  ],
  "This stops check fraud. If a scammer prints a fake check using your account number, the bank will block it because it won't match your registry of checks wrote.",
  ["Reverse Positive Pay", "Exceptions Queue", "Check issues registry"]
);

const addShortSec = (name, def) => addTerm(name, "security", def, ["Logging: The security console logs the transaction credentials and monitors IP signatures."], "This protects your digital portal accounts from suspicious logins and malware attacks.", ["Multi-Factor Authentication", "Maker-Checker Controls", "Positive Pay"]);
addShortSec("MFA Soft-Token", "A secure mobile application that generates rotating 6-digit verification codes every 30 seconds.");
addShortSec("Token Countdown", "The animated timer display showing how many seconds remain before an MFA verification code rotates.");
addShortSec("Cybersecurity", "The collection of practices, firewalls, and encryption protocols used to protect bank databases from hackers.");
addShortSec("Dual Control Registry", "The central database record of all pending transactions requiring Checker supervisor approvals.");
addShortSec("Approvals Queue", "The online vault directory listing all transactions drafted by Makers awaiting Checker approval.");
addShortSec("Administrative Audit", "The historical ledger log tracking which users created, reviewed, and approved transactions.");
addShortSec("Reverse Positive Pay", "A security setting where the bank blocks and reports ALL presented checks by default, requiring approval for each.");
addShortSec("Exceptions Queue", "The dashboard screen listing check discrepancies that require client review and payment decisions.");
addShortSec("Check issues registry", "The client-uploaded database of written check numbers, amounts, and payees.");
addShortSec("Check stops", "An instruction telling the bank to block a specific check number from clearing, usually costing a fee.");
addShortSec("Range stops", "A stop-payment instruction blocking a sequence of check numbers (e.g. checks 100 to 120).");
addShortSec("Single Sign-On", "A session authentication service allowing users to access multiple portals using one secure credential.");
addShortSec("IP Filtering", "Restricting digital portal logins to pre-approved network addresses to block remote hackers.");
addShortSec("FIDO2 Key", "A physical USB security key that plugs into computers to confirm identity, replacing text verification.");
addShortSec("Phishing", "Fraudulent emails or websites disguised as your bank to trick you into entering passwords.");
addShortSec("Social Engineering", "Scam techniques where bad actors call or text, pretending to be bank security officers to obtain your MFA codes.");
addShortSec("Password Policy", "The database rules requiring passwords to contain uppercase letters, numbers, and symbols.");
addShortSec("Account Lockout", "Suspending portal access after consecutive failed login attempts to block automated password guessing.");
addShortSec("Session Timeout", "Automatically logging you out of the online portal after 15 minutes of inactivity to protect your account.");
addShortSec("Check Alteration", "A check fraud method where scammers chemically wash check details to change the payee name or amount.");
addShortSec("Corporate Account Takeover", "A cybercrime where hackers gain control of business bank accounts to send wire transfers.");
addShortSec("Check Fraud", "The illegal use of paper checks to steal funds, including forging signatures or duplicating check drafts.");
addShortSec("MICR Discrepancy", "A check scan exception where the printed check digits mismatch the OCR read values.");
addShortSec("Amount Mismatch", "A check clearing error where the hand-written check value differs from the registry file.");
addShortSec("Payee Verification", "Checking the check payee name against the issue file to ensure the check was not altered.");
addShortSec("Check Image Verification", "Comparing check scan photos against standard check formats to flag duplicates.");
addShortSec("Encryption Keys", "Mathematical formulas used to encrypt checking balances and account histories on databases.");
addShortSec("Secure Socket Layer", "The security protocol (HTTPS) that encrypts communications between your browser and bank portals.");
addShortSec("Data Breach", "An unauthorized access incident where hackers steal account numbers from databases.");
addShortSec("Malware Detection", "Software scanning user portal sessions to identify malicious spyware and Trojan files.");
addShortSec("Activity Alerts", "Automated text or email alerts notifying you of high-value transactions or profile changes.");
addShortSec("Secure Attachment Portal", "The encrypted file upload tool used to submit deposit files or tax documents.");
addShortSec("Checksum Validation", "Mathematically summing data rows to verify file transfers completed without data loss.");
addShortSec("Audit Trail", "The permanent record tracking all logins, balance transfers, and password changes.");
addShortSec("User Privilege Matrix", "The administration screen defining which employees can draft, approve, or view transactions.");
addShortSec("ACH Security Guidelines", "Nacha regulations mandating annual audits of corporate payment portals.");
addShortSec("Commercial Security Desk", "The bank division that monitors corporate treasury logins for suspicious activity.");
addShortSec("Credential Stuffing", "An automated attack where hackers test lists of leaked passwords on bank portals.");
addShortSec("Brute Force Block", "Security rules blocking logins from IP addresses testing hundreds of username variations.");
addShortSec("Sanctions Screening", "Checking recipient names against government watchlists before sending wire transfers.");
addShortSec("OFAC Regulations", "Federal laws blocking banks from transferring funds to blacklisted entities or countries.");
addShortSec("Know Your Customer", "Federal banking laws requiring banks to verify customer identities and addresses before opening accounts.");
addShortSec("Anti-Money Laundering", "Protocols, software, and audits used to identify and report suspicious transaction patterns.");
addShortSec("SAR Filing", "Suspicious Activity Reports submitted to government agencies to report potential financial crimes.");
addShortSec("FinCEN Rules", "Regulations governing cash transactions and international transfers to prevent money laundering.");
addShortSec("Webcam Check Scanning", "Scanning check images using your laptop webcam overlay inside the online portal.");
addShortSec("Canvas Image Processing", "Using browser canvas tools to inspect and crop check photos for mobile deposit.");

// ==========================================
// 3. LENDING & MORTGAGES (50 terms)
// ==========================================
const addLendingTerm = (term, definition, steps, context, related = []) => {
  addTerm(term, "lending", definition, steps, context, related);
};

addLendingTerm(
  "Home Mortgage", "a long-term loan used to purchase a house, where the property itself acts as collateral for the debt.",
  [
    "Prequalification: The bank checks your credit and income to estimate what you can borrow.",
    "Application: You submit tax records, paystubs, and property details for review.",
    "Underwriting: The bank's underwriters evaluate the credit risks and home values.",
    "Closing: You sign mortgage agreements, pay closing fees, and get the home keys.",
    "Repayment: You make monthly payments consisting of principal interest over 15 or 30 years."
  ],
  "Mortgages allow you to purchase a home without paying the entire cash value upfront. Your bank pays the seller, and you repay the bank over time.",
  ["Fixed-Rate Mortgage", "Variable-Rate Mortgage", "Amortization Schedule"]
);

addLendingTerm(
  "Amortization Schedule", "a detailed table showing each monthly mortgage payment, indicating how much goes toward interest versus paying down the principal.",
  [
    "Interest Calculation: The interest is calculated on the remaining loan balance.",
    "Principal Allocation: The rest of your payment goes to pay down the loan balance.",
    "Balance Update: The remaining loan balance is updated for the next month."
  ],
  "Early in your mortgage, most of your monthly payment goes to cover interest. Over time, more of your payment pays down the principal balance, building home equity faster.",
  ["Home Mortgage", "Fixed-Rate Mortgage", "Amortization"]
);

addLendingTerm(
  "Fixed-Rate Mortgage", "a home loan where the interest rate remains exactly the same for the entire life of the loan.",
  [
    "Rate Lock: The bank locks in your interest rate (e.g. 6.2%) before closing.",
    "Monthly Payments: Your monthly payment is calculated and remains constant.",
    "Maturity: The loan is paid off in full at the end of the term (e.g. 30 years)."
  ],
  "This is the most popular mortgage option because it protects you from rising interest rates, ensuring your monthly housing budget never changes.",
  ["Home Mortgage", "Variable-Rate Mortgage", "Interest Rate"]
);

const addShortLending = (name, def) => addTerm(name, "lending", def, ["Calculation: Underwriters check credit histories, DTI ratios, and asset values."], "This determines your borrowing terms, loan interest rates, and loan approval status.", ["Home Mortgage", "Amortization Schedule", "Fixed-Rate Mortgage"]);
addShortLending("Variable-Rate Mortgage", "A home loan where the interest rate adjusts periodically based on prime index rates.");
addShortLending("DTI Ratio", "Debt-to-Income ratio—the percentage of gross monthly income that goes to pay monthly debts.");
addShortLending("Down Payment", "The upfront cash amount paid by homebuyers, usually representing 3% to 20% of the home price.");
addShortLending("Escrow Account", "A holding account managed by the bank to pay property taxes and home insurance on your behalf.");
addShortLending("Credit Score", "A three-digit number representing your creditworthiness, based on payment history and debt.");
addShortLending("Pre-Approval Letter", "An official document from a lender stating they are prepared to lend you a specified value.");
addShortLending("Closing Costs", "The fees paid at the end of a real estate transaction, including origination and title fees.");
addShortLending("Loan Origination", "The process of evaluating, underwriting, and closing a new loan.");
addShortLending("Appraisal", "A professional evaluation of a property's market value to confirm it backs the loan.");
addShortLending("Title Insurance", "Insurance protecting the lender and buyer against property ownership disputes.");
addShortLending("Private Mortgage Insurance", "PMI—insurance required on conventional loans if the down payment is under 20%.");
addShortLending("Principal", "The actual amount of money borrowed on a loan, excluding interest fees.");
addShortLending("Interest Rate", "The cost of borrowing money, expressed as an annual percentage of the loan balance.");
addShortLending("Prime Rate", "The benchmark interest rate banks charge their most creditworthy corporate clients.");
addShortLending("SOFR Index", "Secured Overnight Financing Rate—a benchmark interest rate used to adjust variable-rate loans.");
addShortLending("Amortization", "The gradual repayment of debt over time through scheduled payments.");
addShortLending("Refinancing", "Replacing an existing loan with a new loan, usually to secure a lower interest rate.");
addShortLending("Home Equity", "The difference between the market value of your home and your remaining mortgage balance.");
addShortLending("HELOC", "Home Equity Line of Credit—a revolving credit line backed by your home's equity.");
addShortLending("Second Mortgage", "An additional loan backed by a property that already has a primary mortgage.");
addShortLending("Foreclosure", "The legal process where the bank takes possession of a property after a borrower defaults.");
addShortLending("Loan Default", "Failing to make mortgage or loan payments according to the signed loan terms.");
addShortLending("SBA 7a Loan", "An SBA guaranteed loan used to finance business inventory and working capital.");
addShortLending("SBA 504 Loan", "An SBA loan used to purchase commercial real estate or heavy machinery.");
addShortLending("Commercial Mortgage", "A mortgage loan secured by business real estate, like warehouses or office blocks.");
addShortLending("Loan Underwriting", "The bank's process of evaluating creditworthiness and loan collateral risk.");
addShortLending("Debt Service Coverage", "A corporate ratio comparing business operating income to annual debt payments.");
addShortLending("Line of Credit", "A revolving credit agreement allowing you to borrow, repay, and borrow again up to a limit.");
addShortLending("Revolving Credit", "A credit line that remains active as you pay down balances, like credit cards.");
addShortLending("Term Loan", "A loan repaid in scheduled payments over a fixed duration (e.g. 5 years).");
addShortLending("Loan Maturity", "The date when the final payment on a loan or CD becomes due.");
addShortLending("Collateral", "Assets pledged by a borrower to secure a loan, which the bank can take if payments stop.");
addShortLending("Guarantor", "An individual who signs a loan agreement and promises to repay the debt if the borrower defaults.");
addShortLending("Prepayment Penalty", "Fees charged if you pay off a loan or mortgage before a specified date.");
addShortLending("Loan-to-Value Ratio", "LTV—the ratio comparing the loan value to the property's market value.");
addShortLending("Debt consolidation", "Combining multiple high-interest debts into a single, lower-rate loan.");
addShortLending("Unsecured Loan", "A loan approved based strictly on credit history, without requiring collateral.");
addShortLending("Secured Loan", "A loan backed by collateral, such as car loans or home mortgages.");
addShortLending("Bridge Loan", "A short-term loan used to cover expenses until long-term financing is secured.");
addShortLending("Balloon Mortgage", "A mortgage with low monthly payments that ends in a single, large balance payout.");
addShortLending("Interest-Only Loan", "A loan where payments cover only the interest charges for an initial term.");
addShortLending("Dunning Notice", "A formal collection letter notifying a customer of overdue loan payments.");
addShortLending("Debt Covenants", "Financial targets or rules a business borrower must maintain under a loan agreement.");
addShortLending("FHA Loan", "A mortgage backed by the Federal Housing Administration, offering low down payments.");
addShortLending("VA Loan", "A mortgage backed by the Department of Veterans Affairs, offering zero down payment options.");
addShortLending("USDA Loan", "A mortgage program backed by the USDA to support home purchases in rural areas.");
addShortLending("Conforming Loan", "A mortgage that meets the size guidelines and standards of Fannie Mae and Freddie Mac.");
addShortLending("Jumbo Mortgage", "A mortgage loan that exceeds conforming limits, requiring larger down payments.");
addShortLending("Conventional Loan", "A mortgage loan that is not guaranteed or insured by a government agency.");
addShortLending("Loan Modification", "Changing the original terms of a mortgage to help a struggling borrower avoid default.");

// ==========================================
// 4. DEPOSIT ACCOUNTS AND REGULATION (50 terms)
// ==========================================
const addAccountTerm = (term, definition, steps, context, related = []) => {
  addTerm(term, "accounts", definition, steps, context, related);
};

addAccountTerm(
  "Checking Account", "a transactional deposit account held at a financial institution that allows you to easily deposit and withdraw money daily.",
  [
    "Funding: You deposit money via cash, check, or direct deposit.",
    "Spending: You access the money using debit cards, check writing, or online transfers.",
    "Posting: The bank updates your balance and logs your transaction history."
  ],
  "This is your primary transactional hub. It is designed for daily expenses, allowing you to pay bills, write checks, and swipe your debit card.",
  ["Savings Account", "Money Market Account", "Debit Card"]
);

addAccountTerm(
  "Savings Account", "an interest-bearing deposit account designed to safely hold your financial reserves while earning interest.",
  [
    "Deposit: You move excess cash from checking to savings.",
    "Earning: The bank calculates interest based on your average daily balance.",
    "Withdrawal: You transfer money back to checking when needed."
  ],
  "Unlike checking accounts, savings accounts are designed for building reserves. They pay interest on your balance, helping your money grow.",
  ["Checking Account", "Certificate of Deposit", "Savings APY"]
);

addAccountTerm(
  "Certificate of Deposit", "a savings product that offers a higher, fixed interest rate in exchange for leaving your deposit untouched for a set term.",
  [
    "Opening: You select a term (e.g. 12 months) and deposit a fixed sum.",
    "Locking: The money remains in the account earning fixed interest.",
    "Maturity: The term ends, and you receive your principal plus interest."
  ],
  "CDs are ideal for goals with fixed timelines. They pay higher interest than standard savings accounts but charge a penalty if you withdraw funds early.",
  ["CD Term", "CD Penalty", "Savings Account"]
);

const addShortAcc = (name, def) => addTerm(name, "accounts", def, ["Processing: Deposit core systems track ledgers, calculate yields, and post statements."], "This manages your transactional funds and interest earnings safely.", ["Checking Account", "Savings Account", "Certificate of Deposit"]);
addShortAcc("Money Market Account", "A deposit account combining checking features (checks, debit cards) with savings account interest yields.");
addShortAcc("CD Term", "The duration a Certificate of Deposit must remain funded before maturity.");
addShortAcc("CD Penalty", "Fees charged for withdrawing funds from a CD before its maturity date.");
addShortAcc("Overdraft", "A negative balance status caused by drawing more funds than are available in checking.");
addShortAcc("Overdraft Protection", "Automatic transfers from savings or credit lines to checking to prevent transaction declines.");
addShortAcc("NSF Fee", "Non-Sufficient Funds fee charged when a check or debit is returned unpaid.");
addShortAcc("Joint Account", "A bank account owned by two or more individuals with equal withdrawal rights.");
addShortAcc("Beneficiary", "The individual designated to inherit bank balances upon the account holder's death.");
addShortAcc("Custodial Account", "An account managed by an adult custodian for the benefit of a minor.");
addShortAcc("Trust Account", "An account owned by a trust and managed by a trustee for beneficiaries.");
addShortAcc("Ledger Balance", "The total balance in an account including pending deposits that have not cleared.");
addShortAcc("Available Balance", "The portion of account balance immediately accessible for withdrawals and purchases.");
addShortAcc("Paper Statements", "Physical statements printed and mailed to customers, often incurring service fees.");
addShortAcc("Account Statement", "A monthly ledger summary listing all deposits, withdrawals, fees, and balances.");
addShortAcc("Fiduciary Duty", "The legal obligation of wealth managers to act in the best interest of clients.");
addShortAcc("Wealth Management", "Investment advisory and trust structuring services offered to high-net-worth clients.");
addShortAcc("Fee Schedule", "The regulatory disclosure listing all service charges and transaction fees.");
addShortAcc("Maintenance Fee", "Monthly fees charged to maintain checking accounts, often waived under conditions.");
addShortAcc("W-9 Form", "An IRS tax document certifying a customer's Taxpayer Identification Number.");
addShortAcc("TIN Validation", "Algorithmic validation checking taxpayer ID formats and matching IRS data.");
addShortAcc("W-8BEN", "An IRS tax document certifying foreign status of account holders.");
addShortAcc("FDIC Limits", "The maximum deposit value ($250,000) protected by FDIC insurance per depositor per bank.");
addShortAcc("Deposit Insurance", "Insurance protecting depositor balances in the event of bank insolvency.");
addShortAcc("Bylaws", "The internal corporate rules governing bank operations and lending boards.");
addShortAcc("Bypass Codes", "System codes allowing administrators to skip routine security checks.");
addShortAcc("Audits", "Regular reviews of financial reports and procedures.");
addShortAcc("eStatements", "Electronic versions of bank statements made available securely inside online banking.");
addShortAcc("Checking APY", "The yield returned on checking account balances.");
addShortAcc("Savings APY", "The yield returned on savings account balances.");
addShortAcc("CD Yield", "The return rate of a Certificate of Deposit.");
addShortAcc("Regulation E", "Federal regulation protecting consumers in electronic fund transfers.");
addShortAcc("Regulation D", "Federal regulation historically limiting savings account withdrawals to six per month.");
addShortAcc("Regulation CC", "Federal regulation governing check clearing timelines and deposit holds.");
addShortAcc("Truth in Savings Act", "Bylaws requiring transparent disclosure of APYs and account fees.");
addShortAcc("Equal Housing Lender", "Fair lending regulations blocking discrimination in mortgage lending.");
addShortAcc("Interest Bearing Account", "An account paying interest on balances.");
addShortAcc("Capital Adequacy", "Regulatory rules requiring banks to hold capital cushions.");
addShortAcc("Reserve Requirements", "The value of reserves banks must hold at Federal Reserve banks.");
addShortAcc("Account Opening Form", "The digital portal request sheet used to open a checking or savings account.");
addShortAcc("Savings Goal", "The account setting letting users partition deposits for specific savings targets.");
addShortAcc("Mobile Check Deposit", "Depositing paper check drafts digitally using smartphone cameras.");
addShortAcc("Webcam OCR Log", "The administrative log verifying check MICR reads from browser webcams.");
addShortAcc("Mod 10 Exception Rule", "A local check clearing rule skipping Mod 10 digits audits.");
addShortAcc("Clearing House Netting Protocol", "The software netting daily multi-bank clearings.");
addShortAcc("BAI2 Format", "A fixed-width text data record used for corporate cash reporting.");
addShortAcc("MT940 Swift Layout", "A Swift standard for sending bank statement transaction files.");
addShortAcc("W-9 Form Wizard", "The interactive wizard used to collect and validate taxpayer TINs.");
addShortAcc("Sparta Appointment Portal", "The digital scheduler booking local Sparta branch consultations.");
addShortAcc("Travel Schedule Form", "The registration sheet notifying fraud teams of customer travel.");

// ==========================================
// 5. SATIRICAL AND FICTIONAL CONCEPTS (37 terms)
// ==========================================
const addSatiricalTerm = (term, definition, steps, context, related = []) => {
  addTerm(term, "satirical", definition, steps, context, related);
};

addSatiricalTerm(
  "Shangri-La Island", "the historic, fictional island location in Lake Michigan home to Big Beaver Bank's corporate headquarters branch.",
  [
    "Verification: The bank verifies your credentials against the Shangri-La directory.",
    "Access: Communication tunnels bypass standard geographic routing.",
    "Ledger Sync: Fictional accounts synchronize with the island vault database."
  ],
  "This fictional island serves as the central hub for our satirical narratives. Operating outside standard geographic coordinates protects our beaver reserves from earthly audits.",
  ["wood-sweeps", "Beaver Reserves"]
);

addSatiricalTerm(
  "wood-sweeps", "an automated cash management sweep program that sweeps excess checking balances to fund hydraulic beaver dam reserves.",
  [
    "Monitoring: The sweep engine monitors your checking account balance.",
    "Trigger: Daily excesses above the sweep limit are swept to timber reserves.",
    "Construction: Automated sweep ledgers record contributions to local dam projects."
  ],
  "A humorous sweep alternative that puts your fictional cash to work funding wilderness dam projects, ensuring our satirical ecosystem remains liquid and structured.",
  ["Shangri-La Island", "Beaver Dams"]
);

const addShortSat = (name, def) => addTerm(name, "satirical", def, ["Logging: Satirical core ledgers process operations under Beaver Bylaw guidelines."], "This provides lighthearted banking humor and updates our satirical sandbox environment.", ["Shangri-La Island", "wood-sweeps"]);
addShortSat("Beaver Dams", "Fictional structural reserves securing Big Beaver Bank assets against financial inflation.");
addShortSat("Beaver Reserves", "The collective pool of wood, logs, and quatloos backing the BBB satirical ecosystem.");
addShortSat("fiduciary-trusts", "The satirical trust structures managing relativistic space assets for Weyland-Yutani.");
addShortSat("relativistic-assets", "Off-world capital equipment subject to time dilation interest schedules.");
addShortSat("time-dilation", "Fictional interest schedule adjustments for space voyage payrolls.");
addShortSat("anomalous-assets", "Inventory items subject to local gravity spikes, managed with Omega Mart compliant controls.");
addShortSat("gravity-fluctuations", "Dimensional hazards on Shangri-La Island requiring custom ledger shields.");
addShortSat("dimensional-spikes", "Spatial anomalies affecting inventory values in retail distribution.");
addShortSat("red-stapler", "Fictional audit exception bypass covenant inspired by Initech compliance checklists.");
addShortSat("Initech Covenants", "Compliance bypass rules allowing corporate analysts to skip Mod 10 checks.");
addShortSat("Omega Mart Sweeps", "Treasury sweeps shifting funds to inter-dimensional retail accounts.");
addShortSat("Dharma Stations", "Fictional remote stations utilizing blind trust drops for payroll processing.");
addShortSat("electro-drops", "Physical cash drops executed on isolated islands using automated parachute systems.");
addShortSat("Simlish Mode", "A portal translation mode displaying Simlish terminology.");
addShortSat("Klingon Mode", "A portal translation mode displaying Klingon banking terminology.");
addShortSat("Binary Mode", "A portal translation mode displaying binary banking terminology.");
addShortSat("Beaver Enterprises", "The master satirical conglomerate parent of Big Beaver Bank.");
addShortSat("hydraulic-sweeps", "Automated sweep routines adjusting timber log reserves on Lake Michigan.");
addShortSat("Sparta Annex", "The Sparta, MI mock branches representing the physical branch presence.");
addShortSat("Quatloos", "Fictional alien currency traded in international wire dispatches.");
addShortSat("Imperial Credits", "Fictional galactic currency supported by FX calculator booking.");
addShortSat("Federation Credits", "Fictional space currency supported by FX wire systems.");
addShortSat("Mod 10 Exceptions", "Bypass rules allowing members to bypass check digit verification.");
addShortSat("Red Stapler Exception", "Exemptions granted to select corporate officers to clear manual sweeps.");
addShortSat("Shangri-La Teleport", "The automated transfer routing model handling off-world correspondence.");
addShortSat("Beaver Security", "Fictional guards patrolling the Shangri-La vault reserves.");
addShortSat("Beaver Token", "A satirical MFA soft-token generator featuring rotating beaver icons.");
addShortSat("Satirical Ledger", "The fictional ledger database supporting mock transactions.");
addShortSat("Fictional FDIC", "The satirical entity notifying users that assets are NOT FDIC-insured.");
addShortSat("Beaver Board", "The assembly of directors overseeing Shangri-La operations.");
addShortSat("Beaver Coin", "The satirical cryptocurrency backing off-world operations.");
addShortSat("Timber Reserves", "Corporate reserves consisting entirely of premium hardwood logs.");
addShortSat("Lake Michigan Loops", "Temporal anomalies around the head office branch.");
addShortSat("Sparta Map", "The branch locator showing Sparta, MI branch addresses.");
addShortSat("Meme Badges", "Portal trust badges asserting compliance with beaver standards.");
addShortSat("Satirical Status", "The formal notice indicating the platform is built for satire and humor.");

// Output confirmation
console.log(`Knowledgebase compiled with ${terms.length} terms.`);

// Format output code content
const codeContent = `/**
 * Big Beaver Bank (BBB) Customer Support Knowledgebase
 * Structured interconnected banking terms & processes
 * Total: ${terms.length} terms
 */

const BANKING_KNOWLEDGEBASE = ${JSON.stringify(terms, null, 2)};
`;

fs.writeFileSync(KB_FILE_PATH, codeContent, 'utf8');
console.log('Successfully generated js/knowledgebase-data.js!');
