const fs = require('fs');
const path = require('path');

const KB_FILE_PATH = path.join(__dirname, '..', 'js', 'knowledgebase-data.js');

const makeId = (term) => term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const terms = [];

const addTerm = (term, category, definition, howItWorks, whatCanGoWrong, safeguards, relatedTerms = [], diagramId = null) => {
  terms.push({
    id: makeId(term),
    term,
    category,
    definition,
    howItWorks,
    whatCanGoWrong,
    safeguards,
    related: relatedTerms.map(t => makeId(t)),
    diagram: diagramId
  });
};

// ----------------------------------------------------
// 1. PAYMENTS AND CLEARING (65 terms)
// ----------------------------------------------------
addTerm(
  "ACH System", "payments",
  "Automated Clearing House. A nationwide batch-processing electronic funds transfer network used to clear credits and debits.",
  "An Originator submits transactions to an ODFI. The ODFI batches them and sends them to the ACH Operator (Fed or EPN). The Operator clears and settlements the funds, then distributes entries to the RDFI to credit or debit the Receiver.",
  "Transactions can fail due to wrong routing or account numbers, insufficient funds (NSF), closed accounts, or Nacha layout syntax errors (e.g. missing carriage returns in corporate transaction records).",
  "Treasury desks utilize ACH filters and blocks to reject unauthorized company IDs. Outbound batches require dual Maker-Checker clearance.",
  ["ODFI", "RDFI", "ACH Operator", "Nacha Rules", "Same-Day ACH", "Direct Deposit"], "ach-flow"
);
addTerm("ODFI", "payments", "Originating Depository Financial Institution. The bank that receives payment instructions from the Originator and submits them to the ACH Network.", "The ODFI receives payment instructions from customers, aggregates them into standard Nacha format files, checks customer credit availability, and transmits the batched files to the ACH Operator for clearing.", "If the ODFI suffers network failure or file alignment errors, corporate payrolls can be delayed. ODFIs also risk credit exposure if they clear transactions for corporate Originators who default before settlement.", "ODFIs establish strict operational credit limits, require cash reserves, and run automatic structural validation on Nacha file formats before batch clearing.", ["ACH System", "RDFI", "Nacha Rules", "Nacha SEC Codes"]);
addTerm("RDFI", "payments", "Receiving Depository Financial Institution. The bank that receives ACH credit or debit entries from the ACH Operator and posts them to its depositors' accounts.", "The RDFI receives incoming cleared transaction batches from the ACH Operator, validates that the account numbers correspond to active accounts, and posts the credits or debits to respective deposit ledgers.", "If the RDFI has outdated account records, funds are posted to the wrong accounts or returned. It can also experience processing lags, preventing same-day posting.", "RDFIs use automated posting systems with lookup tables and return incorrect entries using Nacha return codes (like R03 for account closed or R04 for invalid account number).", ["ACH System", "ODFI", "ACH Operator", "Return Codes"]);
addTerm("ACH Operator", "payments", "The central clearing facility that receives ACH files from ODFIs, processes the transactions, and routes them to the appropriate RDFIs.", "The Federal Reserve Bank and the Clearing House Payments Company act as the two primary ACH Operators in the US. They receive files, net settlement balances between participating banks, and deliver files to RDFIs.", "A central operator outage would freeze nationwide electronic banking operations. Settlement discrepancies can occur if clearing volumes mismatch.", "Operators run highly redundant mainframe networks and execute daily multi-lateral netting models with strict collateral cushions.", ["ACH System", "ODFI", "RDFI", "Settlement"]);
addTerm("Nacha Rules", "payments", "The regulatory guidelines and operating standards set by the National Automated Clearing House Association that govern the ACH network.", "All participating financial institutions must sign agreements to adhere to Nacha regulations. Rules specify format layouts, processing deadlines, dispute windows, and return code rules.", "Failure to comply leads to heavy compliance fines, suspension from the ACH network, or liability for fraudulent transaction clearings.", "Compliance desks run automated audit checkers, and banks are audited annually by certified ACH auditors.", ["ACH System", "Nacha SEC Codes"]);
addTerm("Nacha SEC Codes", "payments", "Standard Entry Class codes are three-character identifiers in an ACH batch header record that define the type of transaction and authorization method.", "SEC codes classify transactions (e.g., PPD for personal direct deposits, CCD for business-to-business items, CTX for corporate trade exchanges with addenda records). They specify the legal disclosures and format structures required.", "Selecting the wrong SEC code (e.g., using PPD instead of CCD) can invalidate the transaction authorization, leading to immediate transaction returns or legal disputes.", "Banking software dynamically enforces correct SEC codes based on the selected receiver type (consumer vs. business) in the online interface.", ["ACH System", "Nacha Rules", "PPD", "CCD", "CTX"]);
addTerm("PPD", "payments", "Prearranged Payment and Deposit. An ACH SEC code used for consumer transactions, typically direct deposit of payroll or recurring consumer bills.", "A consumer provides written authorization to a business or employer. The employer's bank formats the batch using the PPD SEC code, routing payroll deposits to the employee's checking account.", "Unauthorized PPD debits can occur if a merchant charges a consumer without active written consent, triggering an R10 customer dispute.", "Nacha rules require written or digital authorization records to be held by the originator for two years and presented upon request.", ["Nacha SEC Codes", "ACH System"]);
addTerm("CCD", "payments", "Corporate Credit or Debit. An ACH SEC code used for business-to-business transactions, cash concentration, or tax payments.", "A business authorizes another entity to debit or credit its corporate account. The originating bank uses the CCD class code to facilitate high-value business transfers.", "CCD transfers have a very tight dispute window (typically 1-2 business days), meaning corporate treasurers can lose funds permanently if unauthorized CCD debits are not reported immediately.", "Corporate accounts utilize ACH blocks to reject all CCD debits unless the specific originating Company ID is pre-approved on an access checklist.", ["Nacha SEC Codes", "ACH System", "ACH Blocks"]);
addTerm("CTX", "payments", "Corporate Trade Exchange. An ACH SEC code that supports business-to-business payments accompanied by extensive remittance data formatted in EDI standards.", "Businesses use CTX to combine payment and detailed remittance detail (like multiple invoice numbers) in a single transaction, using up to 9,999 addenda records.", "If the EDI parser fails, the payment clears but the reconciliation details are lost, leading to supply chain holds or invoicing errors.", "Treasury systems employ dedicated EDI mapping tools to automatically read and match CTX addenda records with accounts receivable ledgers.", ["Nacha SEC Codes", "ACH System"]);
addTerm("Wire Transfer", "payments", "A high-value, real-time gross settlement (RTGS) system for moving funds between financial institutions immediately rather than in batches.", "The sender instructs their bank to dispatch a wire. The bank validates funds and routes the instruction through a network like Fedwire (domestic) or SWIFT (international). The receiving bank clears the wire and credits the receiver's available balance in minutes.", "Wires are irrevocable. Once sent, funds are immediately withdrawn from the receiving bank and cannot be recalled, making wire fraud extremely lucrative for criminals.", "Banks require multi-factor token verification, enforce dual checker authorization, and run real-time sanctions screening prior to wire dispatch.", ["Fedwire", "SWIFT", "Settlement"], "wire-flow");
addTerm("SWIFT", "payments", "Society for Worldwide Interbank Financial Telecommunication. The global messaging network used by banks to securely exchange financial instructions, including international wire transfers.", "SWIFT does not transfer funds itself. Instead, it transmits secure financial messages (MT103, MT940) between international banks, which settle the actual balances via correspondent bank accounts.", "Incorrect SWIFT BIC codes cause international transfers to float in intermediate holding accounts for weeks. Insecure SWIFT terminal setups have historically been targeted by nation-state hackers.", "Banks secure SWIFT terminals behind isolated physical zones, utilize hardware security modules (HSM), and mandate dual-factor digital signatures for all outgoing messages.", ["Wire Transfer", "MT940 Swift Statement", "Correspondent Banking"]);
addTerm("Fedwire", "payments", "The Federal Reserve's real-time gross settlement system used by US financial institutions to transfer large dollar values instantly.", "A US bank submits a Fedwire instruction directly to the Federal Reserve. The Fed debits the sending bank's reserve account and credits the receiving bank's reserve account in real-time, notifying the recipient.", "Liquidity shortages at sending banks can delay Fedwire operations. Inputting an invalid 9-digit ABA routing transit code will reject the wire.", "The Fed enforces strict overdraft caps and operating windows (typically 9:00 PM ET previous day to 7:00 PM ET of the settlement day).", ["Wire Transfer", "Routing Transit Number", "Settlement"]);
addTerm("Routing Transit Number", "payments", "A nine-digit code issued by the American Bankers Association that identifies a specific US financial institution for clearing check and electronic transactions.", "The first 4 digits identify the Federal Reserve routing symbol, the next 4 identify the individual bank institution, and the last digit is a Luhn Mod 10 checksum validation digit.", "Typing an invalid routing number results in rejected ACH files, bounced checks, or funds sent to unrelated institutions. For satirical purposes, Big Beaver Bank's routing transit number is **987654321**.", "All payment systems execute a mathematical Mod 10 checksum verification on the nine-digit string before accepting any electronic submission.", ["Luhn Algorithm", "Fedwire", "ACH System"]);
addTerm("Account Number", "payments", "A unique numerical sequence assigned by a financial institution to a customer's specific deposit or credit account.", "The account number is combined with the routing transit number on checks and electronic files to route credits or debits directly to the customer's ledger.", "Typing an incorrect account number can lead to depositing funds into another customer's account or bouncing the transaction as an invalid account exception.", "Internet banking portals run check-digit algorithms on input fields and prompt customers to confirm recipient details.", ["Routing Transit Number", "Ledger Balance"]);
addTerm("Clearing House", "payments", "An intermediary entity that collects, validates, nets, and exchanges financial transactions between member banks.", "Banks submit their daily check images or electronic payments to a clearing house. The house aggregates all submissions, nets the interbank obligations, and presents settlement instructions to the central bank.", "A clearing house failure would halt check and electronic payments processing, leading to systemic liquidity crunches.", "Clearing houses enforce capital requirements, maintain reserve pools, and use advanced netting algorithms to minimize net settlement balances.", ["Settlement", "Netting", "Check truncation"]);
addTerm("Settlement", "payments", "The actual transfer of funds between the payer bank and the payee bank, completing the financial transaction obligation.", "In retail banking, settlement typically occurs via the central bank's reserve account. Payer bank reserves are debited and payee bank reserves are credited.", "Settlement fail occurs if the payer bank has insufficient reserves at the central bank, creating systemic gridlock.", "Central banks offer credit facilities (discount window) to ensure participating banks have adequate intraday liquidity to settle obligations.", ["Clearing House", "Netting", "Fedwire"]);
addTerm("Netting", "payments", "A clearing process that offsets mutual financial obligations between banks, resulting in a single net payment requirement.", "If Bank A owes Bank B $10 million, and Bank B owes Bank A $8 million, bilateral netting reduces the settlement to a single payment of $2 million from Bank A to Bank B.", "If a netting participant defaults mid-cycle, the entire netting calculation must be unwound, altering other participants' net positions.", "Clearing houses use multilateral netting models backed by collateral agreements and default guarantee funds.", ["Clearing House", "Settlement"]);
addTerm("Float", "payments", "The time interval between the initiation of a transaction and the actual debit or credit settlement of funds.", "If a customer deposits a physical check on Monday, the bank credits their ledger but may not receive the funds from the paying bank until Wednesday. The check is 'in the float' for two days.", "Historically, check writers took advantage of the float to write checks before having funds. In corporate cash management, float reduces liquidity.", "The Check 21 Act and electronic image clearing have reduced the physical float close to zero, ensuring near-instant debits.", ["Check truncation", "Clearing Cycle"]);
addTerm("Check truncation", "payments", "The process of removing a physical paper check from the clearing stream and replacing it with a secure digital image.", "A bank scans the check, extracts the MICR codeline, takes high-resolution images, and transmits a standard X9 image cash letter file to the clearing house.", "Poor scan quality or distorted MICR OCR readings can lead to clearing exceptions or misread account numbers.", "Scanner software utilizes edge-detection, brightness correction, and checksum validation on the MICR codeline prior to file creation.", ["Image Cash Letter", "MICR Reader", "OCR Scanner"]);
addTerm("Image Cash Letter", "payments", "An electronic file containing digitized check images and MICR records formatted according to the ANSI X9.37 standard.", "After physical checks are truncated, the scanning terminal compiles check records into an ICL file, which is sent securely to clearing networks.", "Corruption in the binary image payload or header mismatch will reject the entire deposit batch.", "Financial systems validate file header records, check record counts, and run checksum verifications on the file transmission.", ["Check truncation", "MICR Reader"]);
addTerm("MICR Reader", "payments", "Magnetic Ink Character Recognition reader. A specialized device that reads characters printed in magnetic ink at the bottom of checks.", "Checks are printed with magnetic ink containing routing, account, and check numbers. The reader magnetizes the ink and reads the unique waveform of the characters, ensuring high accuracy.", "If a check is printed with standard toner rather than magnetic ink, the reader cannot detect the signal, resulting in manual processing holds.", "Modern check processing systems combine magnetic waveform readers with optical character recognition (OCR) to cross-check readings.", ["Check truncation", "OCR Scanner"]);
addTerm("OCR Scanner", "payments", "Optical Character Recognition scanner. A software module that extracts readable text characters from images.", "In digital check deposits, the OCR scanner reviews the check photo, locates the routing and account numbers, and reads the hand-written or printed amount.", "Scribbled handwriting, glare, or background patterns on checks can trick the OCR, resulting in incorrect deposit amounts.", "Deposited check amounts read by OCR are validated against the amount typed by the customer, and discrepancies are routed to manual operator queues.", ["Check truncation", "MICR Reader"]);
addTerm("Same-Day ACH", "payments", "An upgrade to the ACH network allowing multiple daily settlement windows, enabling payments to clear on the same business day they are initiated.", "An ODFI submits files before early morning or mid-day deadlines. The ACH Operator clears the files and routes them to RDFIs, who must post the funds to recipients' accounts by late afternoon.", "Processing windows are tight. A submission missed by even one minute is delayed to the next business day, which can disrupt urgent payrolls.", "Treasury management software features automated scheduling cues that force files into clearing queues before Nacha cutoff times.", ["ACH System", "ODFI", "RDFI"]);
addTerm("Real-Time Payments", "payments", "An instant, 24/7/365 payment network in the US operated by The Clearing House, enabling immediate fund clearing and settlement.", "A payer initiates an RTP transfer. The sending bank instantly validates funds and settles with the receiving bank via a joint account at the Federal Reserve. The recipient receives funds in seconds.", "Immediate settlement leaves no window for recall, making RTP transfers vulnerable to social engineering scams.", "RTP systems require strict API handshakes, push notifications, and advanced real-time transaction monitoring.", ["FedNow", "Settlement", "Wire Transfer"]);
addTerm("FedNow", "payments", "The Federal Reserve's instant payment service, enabling financial institutions of all sizes to provide safe and efficient instant payment services.", "FedNow runs as an RTGS network directly on the Federal Reserve's core systems, permitting instant settlement of retail and commercial transactions round-the-clock.", "Small banks face infrastructure integration bottlenecks, leading to delayed transaction updates if internal core systems go offline.", "Participating banks deploy highly available API hubs and host mirrored offline ledgers to process transactions during main systems maintenance.", ["Real-Time Payments", "Fedwire", "Settlement"]);
addTerm("Cash Sweep", "payments", "An automated treasury service that transfers idle balances from a commercial checking account into an interest-bearing investment or savings account.", "A corporation defines a target threshold (e.g., $100,000) on their checking account. At the end of each business day, any excess funds are automatically swept into a corporate yield account. If checking funds drop below the target, funds are swept back.", "If the sweep transfer fails, checking balances remain idle, earning zero interest, or checks bounce due to sweep return delays.", "Treasury engines process sweep transactions after final check clearings but before opening balance postings, ensuring adequate checking liquidity.", ["Timber Sweeps", "Sweep Threshold"]);
addTerm("Sweep Threshold", "payments", "The pre-configured target balance in a checking account that triggers automated cash sweep transfers.", "A business client sets their threshold to cover expected daily disbursements. The sweep engine monitors this balance and moves excesses or deficits to match the threshold.", "Setting the threshold too low causes excessive daily sweep cycles and fee charges. Setting it too high leaves too much capital earning zero yield.", "Treasury managers analyze historical cash flow volatility to calculate optimized checking thresholds.", ["Cash Sweep", "Timber Sweeps"]);
addTerm("Timber Sweeps", "payments", "A unique, satirical sweep account program at Big Beaver Bank that sweeps excess checking balances to fund hydraulic timber initiatives.", "Excess corporate reserves above the sweep threshold are swept daily into high-yield offshore timber reserves, contributing to beaver-themed dam building and reforestation projects.", "A failure in the timber sweep engine could result in actual fiat currency being held on Shangri-La Island rather than earning fictional interest.", "The system runs automated ledger verification to ensure all swept currency is logged in our fictional database.", ["Cash Sweep", "Sweep Threshold", "Shangri-La Island"]);

const addShortPay = (name, def) => addTerm(name, "payments", def, "Executed via standard core systems processing interfaces according to standard timetables.", "Failed authentication, network timeouts, or parameter mismatches.", "Standard encryption and token filters protect transaction flows.", ["ACH System", "Wire Transfer"]);
addShortPay("ACH Return", "A transaction entry sent by the RDFI to the ODFI to return an ACH item that cannot be posted.");
addShortPay("Return Codes", "Specific three-character alphanumeric identifiers (e.g. R01, R10) indicating why an ACH entry was returned.");
addShortPay("R01", "ACH return code for Insufficient Funds, indicating that the account has inadequate funds to cover a debit.");
addShortPay("R02", "ACH return code for Account Closed, indicating that the customer has closed the account.");
addShortPay("R03", "ACH return code for No Account/Unable to Locate Account, indicating account details do not match RDFI records.");
addShortPay("R04", "ACH return code for Invalid Account Number, indicating that the account number structure fails verification.");
addShortPay("R10", "ACH return code indicating that the consumer has disputed an unauthorized debit entry.");
addShortPay("Originator", "The corporate entity or individual that has obtained authorization to initiate ACH entries.");
addShortPay("Receiver", "The consumer or business that has authorized the Originator to credit or debit their account.");
addShortPay("EPN", "Electronic Payments Network. The private-sector ACH Operator in the US operated by The Clearing House.");
addShortPay("Bilateral Netting", "A netting system between two banks to offset their relative payment balances.");
addShortPay("Multilateral Netting", "A netting system among multiple bank participants to calculate single net settlements.");
addShortPay("Clearing Cycle", "The structured timeline required to clear and settle checks or electronic fund items.");
addShortPay("ANSI X9.37", "The standard file format structure used for exchange of Check 21 image cash letters.");
addShortPay("Check 21 Act", "A federal law enabling banks to clear checks electronically using digital images instead of paper.");
addShortPay("Transit Code", "A code printed on checks indicating the Federal Reserve district and bank routing origin.");
addShortPay("Remittance", "The transfer of money to a distant party, usually accompanied by invoice details.");
addShortPay("EDI", "Electronic Data Interchange. A structured data format used to transmit business invoices and payments.");
addShortPay("B2B Payments", "Business-to-business electronic fund transfers, typically utilizing CCD or CTX ACH classes.");
addShortPay("P2P Payments", "Peer-to-peer digital money transfers between individual consumer checking accounts.");
addShortPay("A2A Transfers", "Account-to-account transfers moving balances between accounts owned by the same customer.");
addShortPay("ACH Block", "A treasury security tool that blocks all incoming ACH debits from posting to a corporate account.");
addShortPay("ACH Filter", "A treasury tool that permits only specified company IDs to debit a corporate checking account.");
addShortPay("WEB SEC Code", "Nacha SEC code used for ACH transactions authorized over the internet.");
addShortPay("TEL SEC Code", "Nacha SEC code used for ACH transactions authorized over the telephone.");
addShortPay("POP SEC Code", "Point-of-Purchase check conversion, turning paper checks into ACH entries at terminals.");
addShortPay("ARC SEC Code", "Accounts Receivable Conversion, converting mailed checks into ACH debits.");
addShortPay("BOC SEC Code", "Back Office Conversion, converting checks received at registers into ACH items in back offices.");
addShortPay("Nacha File Header", "The first row in a Nacha file defining file identifiers and originating bank BICs.");
addShortPay("Nacha Batch Header", "The record row in a Nacha file defining SEC codes, company names, and payment dates.");
addShortPay("Nacha Entry Detail", "The individual transaction record containing recipient routing, accounts, and values.");
addShortPay("Nacha Addenda Record", "Optional supplemental records providing remittance invoices for CTX or CCD batches.");
addShortPay("Nacha Batch Control", "The control row summing entry counts and dollar hashes to verify batch totals.");
addShortPay("Nacha File Control", "The final control row summing all batch counts and hashes to verify entire file totals.");
addShortPay("Immediate Settlement", "Settling payment obligations in real-time as they clear instead of at scheduled cycles.");
addShortPay("Intraday Liquidity", "Funds available to a bank to settle obligations throughout the business day.");
addShortPay("RTGS", "Real-Time Gross Settlement. Continuous, instant settlement of payment obligations on an entry-by-entry basis.");
addShortPay("EPN Operator", "Private sector operator EPN clearing corporate transactions concurrently with FedACH.");
addShortPay("Nacha Class Layout", "The precise character-width formatting specifications defined by Nacha guidelines.");

// ----------------------------------------------------
// 2. CYBERSECURITY AND FRAUD (55 terms)
// ----------------------------------------------------
addTerm(
  "Positive Pay", "security",
  "A fraud prevention service offered to corporate checking clients that cross-checks presented checks against the bank's issued checks registry.",
  "The corporation uploads a CSV issue file containing check numbers, dates, and amounts. When physical checks are presented for clearing, the bank matches them against the registry. Discrepancies are held as presented exceptions.",
  "If the corporation forgets to upload their issue file, valid checks will be flagged as exceptions and returned, disrupting vendor relations.",
  "Checkers review presented exceptions in a daily portal window and decide to 'Pay' or 'Return' the item. Reverse Positive Pay blocks all presented checks by default.",
  ["Reverse Positive Pay", "Positive Pay Exceptions Log", "OCR Scanner", "Maker-Checker Control"], "pospay-flow"
);
addTerm(
  "Maker-Checker Control", "security",
  "A fundamental internal control policy requiring transaction tasks to be split between two separate corporate roles: the Maker (initiator) and the Checker (approver).",
  "A staff analyst (Maker) prepares an ACH payroll file or schedules a wire. The system captures the draft and routes it to the pending approvals queue. A manager (Checker) reviews the draft and approves it to execute.",
  "Collusion between the Maker and Checker can bypass this safeguard. System administration misconfigurations can also permit a Maker to approve their own files.",
  "The application enforces role permissions at the authentication level, preventing Checker buttons from rendering for Maker profiles.",
  ["ACH System", "Wire Transfer", "Positive Pay Exceptions Log"], "maker-checker-flow"
);
addTerm(
  "Soft Token", "security",
  "A software-based security token generator that produces rotating, one-time passwords (OTP) to verify transaction authorization.",
  "A security algorithm (like TOTP) generates a unique 6-digit passcode using the current timestamp and a shared cryptographic seed. The passcode remains active for 30 seconds before rotating.",
  "If the customer's device clock drifts from the bank's server clock, the generated OTP will be rejected as invalid.",
  "The server implements a time window buffer (typically +/- 30 seconds) to accept tokens generated slightly early or late due to clock drift.",
  ["Multi-Factor Authentication", "Wire Transfer"], null
);

const addShortSec = (name, def) => addTerm(name, "security", def, "Administered by corporate security profiles using cryptographic protocols.", "Compromised credentials, keystroke logging, or physical device loss.", "Strict network controls, encrypted databases, and dual permissions restrict access.", ["Positive Pay", "Maker-Checker Control", "Soft Token"]);
addShortSec("Reverse Positive Pay", "A security option that automatically flags and holds all presented checks as exceptions for client approval by default.");
addShortSec("Positive Pay Exceptions Log", "The dashboard queue showing checks presented for clearing that do not match the issue registry.");
addShortSec("Pay Decision", "A Checker command clearing a Positive Pay exception, authorizing payment of the presented draft.");
addShortSec("Return Decision", "A Checker command rejecting a Positive Pay exception, returning the check unpaid to the presenting bank.");
addShortSec("Multi-Factor Authentication", "Enforcing multiple distinct categories of authentication (something you know, have, or are) to access portals.");
addShortSec("Token Rotation", "The automated process of expiring active cryptographic passcodes and generating replacements at regular intervals.");
addShortSec("Token Countdown", "The graphical representation of a rotating token's remaining validity duration (e.g. 30 seconds).");
addShortSec("Phishing", "Social engineering attacks utilizing email masquerade to steal personal banking usernames and passcodes.");
addShortSec("Phone Spoofing", "Falsifying caller ID information to pretend to call from the bank's support branch to extract PINs.");
addShortSec("Social Engineering", "Tricking bank depositors into executing transactions or sharing credentials through psychological manipulation.");
addShortSec("Compromised Credentials", "User login credentials that have been leaked or stolen by hackers.");
addShortSec("Card Freeze", "A card status toggle that instantly blocks all card transaction attempts without permanently closing the account.");
addShortSec("Virtual Cards", "Dynamically generated card numbers linked to checking balances with specific credit spending caps.");
addShortSec("Single-Use Token", "A virtual card token that expires immediately after a single purchase settlement.");
addShortSec("EMV Chips", "Microprocessor chips embedded in debit cards that generate unique transaction codes for point-of-sale security.");
addShortSec("Magnetic Strip", "The backup magnetic band on debit cards containing static card details vulnerable to cloning.");
addShortSec("Fraud Monitoring", "Real-time algorithmic check analysis to flag suspicious transaction velocities or locations.");
addShortSec("Luhn Algorithm", "The Mod 10 checksum mathematical formula used to validate card numbers and routing transit codes.");
addShortSec("Mod 10 Bypass", "A satirical regulatory clearance bypass code allowing specific bank accounts to ignore checksum checks.");
addShortSec("Section 12-B Bypass", "Fictional banking clearance bypass code allowing Big Beaver Bank to skip specific Federal Reserve audits.");
addShortSec("Password Complexity", "Strict rules requiring alphanumeric characters, caps, and symbols for customer accounts.");
addShortSec("Session Timeout", "Automated system logout after a period of inactivity (e.g. 10 minutes) to prevent unauthorized terminal access.");
addShortSec("TLS Encryption", "Transport Layer Security. Protocol protecting data in transit between browser clients and bank servers.");
addShortSec("SSL Certificate", "Digital certificate verifying the bank server identity and establishing secure TLS pipelines.");
addShortSec("Public Key Cryptography", "Asymmetric encryption using public and private keys to secure web communications.");
addShortSec("Symmetric Encryption", "Encryption standard using a single key to encrypt and decrypt sensitive database columns.");
addShortSec("Malware", "Malicious software designed to capture user keystrokes or hijack web banking sessions.");
addShortSec("KYC Verification", "Know Your Customer. Identity checks checking government IDs prior to account creation.");
addShortSec("Identity Theft", "Fraudulent account openings using stolen personal identity documents.");
addShortSec("AML Monitoring", "Anti-Money Laundering analysis tracking high-value transaction patterns.");
addShortSec("BSA Compliance", "Bank Secrecy Act obligations requiring reporting of currency movements.");
addShortSec("OFAC Screening", "Cross-checking transaction names against government sanctions checklists.");
addShortSec("CTR Reporting", "Currency Transaction Reports filed automatically for cash items exceeding $10,000.");
addShortSec("SAR Reporting", "Suspicious Activity Reports filed for transactions showing signs of structured money laundering.");
addShortSec("Transaction Limits", "Strict daily spending caps assigned to debit cards to limit theft losses.");
addShortSec("Card Cloning", "Copying static magnetic strip details to create fraudulent duplicate physical debit cards.");
addShortSec("Chargeback", "Reversing a transaction due to cardholder merchant disputes or unauthorized card uses.");
addShortSec("Secure Attachments", "Encrypted document uploads that strip metadata and run antivirus scans before server storage.");
addShortSec("Secure Key", "Hardware USB tokens or keys that generate digital signatures for wire verifications.");
addShortSec("Key Drifting", "Cryptographic time drift where offline token generators get out of sync with central servers.");
addShortSec("IP Whitelisting", "Treasury control restricting portal access to corporate static IP ranges.");
addShortSec("ACH Filters Registry", "The approved company list database checked by incoming ACH clearing engines.");
addShortSec("Device Fingerprinting", "Analyzing hardware and browser profiles to identify suspicious login attempts.");
addShortSec("Token Seed", "The secret cryptographic key used to initialize a customer's TOTP app.");
addShortSec("Brute Force Lockout", "Automatically locking accounts after multiple failed login attempts.");
addShortSec("Salting Passwords", "Adding unique random strings to passwords before hashing to protect against database hacks.");
addShortSec("Data Sanitization", "Cleaning input fields to prevent SQL injection or cross-site scripting attacks.");
addShortSec("Security Audit", "Third-party reviews of banking source codes and server setups.");
addShortSec("Penetration Testing", "Simulating cyber attacks on bank networks to identify infrastructure gaps.");
addShortSec("Check Alteration", "Physical check fraud where payee names or payment values are altered.");
addShortSec("Check Wash", "Using chemicals to erase check ink and rewrite check amounts and payees.");
addShortSec("Mod 10 Checksum", "The validation digit calculated by summing alternate digit products to verify code legitimacy.");

// ----------------------------------------------------
// 3. CREDIT, LOANS AND MORTGAGES (50 terms)
// ----------------------------------------------------
addTerm(
  "Amortization", "lending",
  "The mathematical process of spreading out a loan into equal periodic payments, gradually paying down both principal and interest over the loan term.",
  "Each monthly payment is split: a portion pays the interest accrued during the month, and the remainder pays down the principal balance. Early payments are mostly interest, while late payments are mostly principal.",
  "If the interest rate is variable, payments can adjust upward, or negative amortization can occur if payments fail to cover interest charges.",
  "Calculators check amortization details and verify DTI ratios before credit approvals.",
  ["Principal", "APR", "Fixed Rate", "DTI Ratio", "Escrow"], null
);

const addShortLen = (name, def) => addTerm(name, "lending", def, "Calculated using standard financial formulas based on interest rates, term, and principal balances.", "Default, changes in credit, or fluctuations in interest index rates.", "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.", ["Amortization", "APR", "Principal"]);
addShortLen("APR", "Annual Percentage Rate. The total yearly cost of a loan, including interest rate, origination fees, and points, expressed as a percentage.");
addShortLen("APY", "Annual Percentage Yield. The total yearly return on a deposit account, taking into account compounding interest.");
addShortLen("Principal", "The original amount of money borrowed, or the remaining unpaid balance of a loan.");
addShortLen("Interest Rate", "The percentage charged by a lender for borrowing capital.");
addShortLen("Fixed Rate", "An interest rate that remains constant throughout the entire term of the loan.");
addShortLen("Variable Rate", "An interest rate that fluctuates based on a benchmark index, like Prime or SOFR.");
addShortLen("Adjustable Rate", "An interest rate on a mortgage that shifts at scheduled intervals.");
addShortLen("DTI Ratio", "Debt-to-Income ratio. Monthly debt service payments divided by gross monthly income, checking capacity.");
addShortLen("LTV Ratio", "Loan-to-Value ratio. The loan value divided by the appraised value of the collateral property.");
addShortLen("Escrow Account", "An account held by the lender to pay property taxes and homeowners insurance on behalf of the borrower.");
addShortLen("Prequalification", "An initial evaluation of a borrower's credit profile to estimate borrowing capacity before mortgage application.");
addShortLen("Underwriting", "The process by which credit risk specialists evaluate borrower credentials and appraise collateral to approve loans.");
addShortLen("SBA 7a", "Small Business Administration loan program offering guarantees to lenders for commercial operations.");
addShortLen("Line of Credit", "A flexible credit facility allowing a business to draw, repay, and redraw funds up to a limit.");
addShortLen("LOC Draw", "Transferring funds from a line of credit checking balance to fund operations.");
addShortLen("LOC Repayment", "Paying down outstanding balances on a line of credit from checking funds.");
addShortLen("Commercial Mortgage", "A loan secured by income-generating commercial real estate, like warehouses or offices.");
addShortLen("Collateral", "Assets pledged by a borrower to secure a loan, subject to foreclosure on default.");
addShortLen("Lien", "A legal claim on collateral assets by a lender, resolved only after loan payoff.");
addShortLen("Refinancing", "Replacing an existing loan with a new loan at different interest rates or terms.");
addShortLen("Closing Costs", "Fees paid at the finalization of a real estate transaction, covering appraisals, titles, and filings.");
addShortLen("Loan Estimate", "A standard regulatory document outlining estimated mortgage terms, monthly payments, and closing fees.");
addShortLen("Closing Disclosure", "The final standard document listing exact mortgage terms and closing costs.");
addShortLen("Credit Score", "A numerical score indicating creditworthiness based on debt history analysis.");
addShortLen("FICO Score", "The standard credit rating model developed by Fair Isaac Corporation.");
addShortLen("Balloon Payment", "A large final payment due at the end of a short-term balloon loan.");
addShortLen("Loan Covenant", "Agreement conditions in a loan contract requiring the borrower to meet financial ratios.");
addShortLen("Construction Loan", "A short-term loan used to finance building projects, paid out in draws as work proceeds.");
addShortLen("Bridge Loan", "A temporary loan bridging the gap until permanent financing or sale proceeds are secured.");
addShortLen("DSCR", "Debt Service Coverage Ratio. Net operating income divided by annual debt service, checking commercial viability.");
addShortLen("PITI", "Principal, Interest, Taxes, and Insurance. The four components of a monthly mortgage payment.");
addShortLen("Appraisal", "An independent professional valuation of collateral real estate.");
addShortLen("Title Search", "Checking registry records to confirm a seller owns a property and has no liens.");
addShortLen("Mortgage Term", "The duration of a mortgage loan contract (typically 15 or 30 years).");
addShortLen("Escrow Payment", "The monthly portion of mortgage payments deposited into escrow accounts for tax payouts.");
addShortLen("Points", "Upfront fees paid to lenders to secure lower interest rates.");
addShortLen("Origination Fee", "Lender fee covering loan processing and underwriting costs.");
addShortLen("Preapproval", "A binding lender commitment to loan a specific value based on detailed verification.");
addShortLen("Debt Consolidation", "Using a single loan to pay off multiple higher-interest credit balances.");
addShortLen("Heloc", "Home Equity Line of Credit. A revolving credit line secured by home equity.");
addShortLen("Equity Injection", "The borrower's cash contribution in commercial or SBA financing structures.");
addShortLen("Secured Loan", "A loan backed by collateral assets.");
addShortLen("Unsecured Loan", "A loan backed only by the borrower's credit signature.");
addShortLen("Default", "Failure to meet loan repayment or covenant obligations.");
addShortLen("Foreclosure", "Lender legal action seizing collateral real estate after default.");
addShortLen("Prime Rate", "The benchmark rate US banks charge creditworthy corporate clients.");
addShortLen("SOFR", "Secured Overnight Financing Rate. The benchmark rate replacing LIBOR for variable commercial loans.");
addShortLen("Amortization Term", "The duration over which a loan would pay off if all scheduled payments are met.");
addShortLen("Debt Service Coverage", "Generating adequate revenue to cover loan principal and interest requirements.");
addShortLen("Credit Bureau", "Agencies (Equifax, Experian, TransUnion) tracking consumer borrowing records.");

// ----------------------------------------------------
// 4. DEPOSIT ACCOUNTS AND REGULATION (50 terms)
// ----------------------------------------------------
addTerm(
  "eStatements", "accounts",
  "Electronic statements. Digital versions of paper bank statements made available securely online.",
  "The core banking engine generates PDF account ledgers monthly, alerts customers via email, and holds statements inside the online banking database.",
  "Lags in system processing can delay statement availability. Insecure email systems can expose notification links.",
  "PDF statements are encrypted on servers and accessible only inside authenticated secure customer accounts.",
  ["Checking Account", "Savings Account"], null
);

const addShortAcc = (name, def) => addTerm(name, "accounts", def, "Deposits are managed in secure electronic vaults by bank core databases.", "System downtime, fee charges, or overdraft occurrences.", "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.", ["Checking Account", "Savings Account", "eStatements"]);
addShortAcc("Checking Account", "A transactional deposit account allowing unlimited debits, check writing, and debit card purchases.");
addShortAcc("Savings Account", "An interest-bearing deposit account designed to hold reserves, subject to monthly transfer rules.");
addShortAcc("Certificate of Deposit", "A time deposit account offering higher interest yields in exchange for locking funds for a term.");
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
addShortAcc("Clearing House Netting", "The process of consolidating and offsetting cross-bank obligations daily.");
addShortAcc("Direct Deposit", "Automated electronic payroll deposits initiated via the ACH network.");
addShortAcc("Wire Dispatch Form", "The portal interface used by corporate treasurers to schedule wire transfers.");
addShortAcc("Card Authorization Log", "The real-time database log of all debit card swipe permissions.");
addShortAcc("Ledger Posting", "Updating the master account database with cleared transaction details.");
addShortAcc("Presented Exception", "An incoming item that doesn't match issue registries and requires user decisions.");
addShortAcc("ACH Block List", "The database of blocked Originator IDs on a corporate checking account.");
addShortAcc("POS Terminal Scan", "Processing credit or debit cards at point-of-sale terminals.");
addShortAcc("eStatement Portal", "The secure tab inside online banking containing statement archives.");
addShortAcc("W-9 Verification", "Bypassing backup tax withholdings by certifying TIN numbers.");
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

// ----------------------------------------------------
// 5. SATIRICAL AND FICTIONAL CONCEPTS (37 terms)
// ----------------------------------------------------
addTerm(
  "Shangri-La Island", "satirical",
  "The historic, fictional island location in Lake Michigan home to Big Beaver Bank's corporate headquarters.",
  "According to founding legends, Shangri-La Island teleports or experiences local gravity fluctuations, shielding corporate ledgers from standard audits.",
  "Under normal conditions, accessing the island is restricted by Lake Michigan ice flows, temporal loops, or Omega Mart regulatory clearances.",
  "Deposits are backed by beaver reserves and hydraulic wood sweeps, ensuring protection from dimensional shifts.",
  ["wood-sweeps", "anomalous-assets"], null
);

const addShortSat = (name, def) => addTerm(name, "satirical", def, "Executed according to the fictional regulations of Member Beaver Enterprises.", "Local gravity Dilations, temporal shifts, or red stapler misplacements.", "Satirical bylaws and beaver dams safeguard fictional assets.", ["Shangri-La Island", "wood-sweeps"]);
addShortSat("wood-sweeps", "The primary satirical sweep program moving fiat funds into hydraulic beaver dam reserves.");
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
