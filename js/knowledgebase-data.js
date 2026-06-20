/**
 * Big Beaver Bank (BBB) Customer Support Knowledgebase
 * Structured interconnected banking terms & processes
 * Total: 262 terms
 */

const BANKING_KNOWLEDGEBASE = [
  {
    "id": "ach-system",
    "term": "ACH System",
    "category": "payments",
    "definition": "Automated Clearing House. A nationwide batch-processing electronic funds transfer network used to clear credits and debits.",
    "howItWorks": "An Originator submits transactions to an ODFI. The ODFI batches them and sends them to the ACH Operator (Fed or EPN). The Operator clears and settlements the funds, then distributes entries to the RDFI to credit or debit the Receiver.",
    "whatCanGoWrong": "Transactions can fail due to wrong routing or account numbers, insufficient funds (NSF), closed accounts, or Nacha layout syntax errors (e.g. missing carriage returns in corporate transaction records).",
    "safeguards": "Treasury desks utilize ACH filters and blocks to reject unauthorized company IDs. Outbound batches require dual Maker-Checker clearance.",
    "related": [
      "odfi",
      "rdfi",
      "ach-operator",
      "nacha-rules",
      "same-day-ach",
      "direct-deposit"
    ],
    "diagram": "ach-flow"
  },
  {
    "id": "odfi",
    "term": "ODFI",
    "category": "payments",
    "definition": "Originating Depository Financial Institution. The bank that receives payment instructions from the Originator and submits them to the ACH Network.",
    "howItWorks": "The ODFI receives payment instructions from customers, aggregates them into standard Nacha format files, checks customer credit availability, and transmits the batched files to the ACH Operator for clearing.",
    "whatCanGoWrong": "If the ODFI suffers network failure or file alignment errors, corporate payrolls can be delayed. ODFIs also risk credit exposure if they clear transactions for corporate Originators who default before settlement.",
    "safeguards": "ODFIs establish strict operational credit limits, require cash reserves, and run automatic structural validation on Nacha file formats before batch clearing.",
    "related": [
      "ach-system",
      "rdfi",
      "nacha-rules",
      "nacha-sec-codes"
    ],
    "diagram": null
  },
  {
    "id": "rdfi",
    "term": "RDFI",
    "category": "payments",
    "definition": "Receiving Depository Financial Institution. The bank that receives ACH credit or debit entries from the ACH Operator and posts them to its depositors' accounts.",
    "howItWorks": "The RDFI receives incoming cleared transaction batches from the ACH Operator, validates that the account numbers correspond to active accounts, and posts the credits or debits to respective deposit ledgers.",
    "whatCanGoWrong": "If the RDFI has outdated account records, funds are posted to the wrong accounts or returned. It can also experience processing lags, preventing same-day posting.",
    "safeguards": "RDFIs use automated posting systems with lookup tables and return incorrect entries using Nacha return codes (like R03 for account closed or R04 for invalid account number).",
    "related": [
      "ach-system",
      "odfi",
      "ach-operator",
      "return-codes"
    ],
    "diagram": null
  },
  {
    "id": "ach-operator",
    "term": "ACH Operator",
    "category": "payments",
    "definition": "The central clearing facility that receives ACH files from ODFIs, processes the transactions, and routes them to the appropriate RDFIs.",
    "howItWorks": "The Federal Reserve Bank and the Clearing House Payments Company act as the two primary ACH Operators in the US. They receive files, net settlement balances between participating banks, and deliver files to RDFIs.",
    "whatCanGoWrong": "A central operator outage would freeze nationwide electronic banking operations. Settlement discrepancies can occur if clearing volumes mismatch.",
    "safeguards": "Operators run highly redundant mainframe networks and execute daily multi-lateral netting models with strict collateral cushions.",
    "related": [
      "ach-system",
      "odfi",
      "rdfi",
      "settlement"
    ],
    "diagram": null
  },
  {
    "id": "nacha-rules",
    "term": "Nacha Rules",
    "category": "payments",
    "definition": "The regulatory guidelines and operating standards set by the National Automated Clearing House Association that govern the ACH network.",
    "howItWorks": "All participating financial institutions must sign agreements to adhere to Nacha regulations. Rules specify format layouts, processing deadlines, dispute windows, and return code rules.",
    "whatCanGoWrong": "Failure to comply leads to heavy compliance fines, suspension from the ACH network, or liability for fraudulent transaction clearings.",
    "safeguards": "Compliance desks run automated audit checkers, and banks are audited annually by certified ACH auditors.",
    "related": [
      "ach-system",
      "nacha-sec-codes"
    ],
    "diagram": null
  },
  {
    "id": "nacha-sec-codes",
    "term": "Nacha SEC Codes",
    "category": "payments",
    "definition": "Standard Entry Class codes are three-character identifiers in an ACH batch header record that define the type of transaction and authorization method.",
    "howItWorks": "SEC codes classify transactions (e.g., PPD for personal direct deposits, CCD for business-to-business items, CTX for corporate trade exchanges with addenda records). They specify the legal disclosures and format structures required.",
    "whatCanGoWrong": "Selecting the wrong SEC code (e.g., using PPD instead of CCD) can invalidate the transaction authorization, leading to immediate transaction returns or legal disputes.",
    "safeguards": "Banking software dynamically enforces correct SEC codes based on the selected receiver type (consumer vs. business) in the online interface.",
    "related": [
      "ach-system",
      "nacha-rules",
      "ppd",
      "ccd",
      "ctx"
    ],
    "diagram": null
  },
  {
    "id": "ppd",
    "term": "PPD",
    "category": "payments",
    "definition": "Prearranged Payment and Deposit. An ACH SEC code used for consumer transactions, typically direct deposit of payroll or recurring consumer bills.",
    "howItWorks": "A consumer provides written authorization to a business or employer. The employer's bank formats the batch using the PPD SEC code, routing payroll deposits to the employee's checking account.",
    "whatCanGoWrong": "Unauthorized PPD debits can occur if a merchant charges a consumer without active written consent, triggering an R10 customer dispute.",
    "safeguards": "Nacha rules require written or digital authorization records to be held by the originator for two years and presented upon request.",
    "related": [
      "nacha-sec-codes",
      "ach-system"
    ],
    "diagram": null
  },
  {
    "id": "ccd",
    "term": "CCD",
    "category": "payments",
    "definition": "Corporate Credit or Debit. An ACH SEC code used for business-to-business transactions, cash concentration, or tax payments.",
    "howItWorks": "A business authorizes another entity to debit or credit its corporate account. The originating bank uses the CCD class code to facilitate high-value business transfers.",
    "whatCanGoWrong": "CCD transfers have a very tight dispute window (typically 1-2 business days), meaning corporate treasurers can lose funds permanently if unauthorized CCD debits are not reported immediately.",
    "safeguards": "Corporate accounts utilize ACH blocks to reject all CCD debits unless the specific originating Company ID is pre-approved on an access checklist.",
    "related": [
      "nacha-sec-codes",
      "ach-system",
      "ach-blocks"
    ],
    "diagram": null
  },
  {
    "id": "ctx",
    "term": "CTX",
    "category": "payments",
    "definition": "Corporate Trade Exchange. An ACH SEC code that supports business-to-business payments accompanied by extensive remittance data formatted in EDI standards.",
    "howItWorks": "Businesses use CTX to combine payment and detailed remittance detail (like multiple invoice numbers) in a single transaction, using up to 9,999 addenda records.",
    "whatCanGoWrong": "If the EDI parser fails, the payment clears but the reconciliation details are lost, leading to supply chain holds or invoicing errors.",
    "safeguards": "Treasury systems employ dedicated EDI mapping tools to automatically read and match CTX addenda records with accounts receivable ledgers.",
    "related": [
      "nacha-sec-codes",
      "ach-system"
    ],
    "diagram": null
  },
  {
    "id": "wire-transfer",
    "term": "Wire Transfer",
    "category": "payments",
    "definition": "A high-value, real-time gross settlement (RTGS) system for moving funds between financial institutions immediately rather than in batches.",
    "howItWorks": "The sender instructs their bank to dispatch a wire. The bank validates funds and routes the instruction through a network like Fedwire (domestic) or SWIFT (international). The receiving bank clears the wire and credits the receiver's available balance in minutes.",
    "whatCanGoWrong": "Wires are irrevocable. Once sent, funds are immediately withdrawn from the receiving bank and cannot be recalled, making wire fraud extremely lucrative for criminals.",
    "safeguards": "Banks require multi-factor token verification, enforce dual checker authorization, and run real-time sanctions screening prior to wire dispatch.",
    "related": [
      "fedwire",
      "swift",
      "settlement"
    ],
    "diagram": "wire-flow"
  },
  {
    "id": "swift",
    "term": "SWIFT",
    "category": "payments",
    "definition": "Society for Worldwide Interbank Financial Telecommunication. The global messaging network used by banks to securely exchange financial instructions, including international wire transfers.",
    "howItWorks": "SWIFT does not transfer funds itself. Instead, it transmits secure financial messages (MT103, MT940) between international banks, which settle the actual balances via correspondent bank accounts.",
    "whatCanGoWrong": "Incorrect SWIFT BIC codes cause international transfers to float in intermediate holding accounts for weeks. Insecure SWIFT terminal setups have historically been targeted by nation-state hackers.",
    "safeguards": "Banks secure SWIFT terminals behind isolated physical zones, utilize hardware security modules (HSM), and mandate dual-factor digital signatures for all outgoing messages.",
    "related": [
      "wire-transfer",
      "mt940-swift-statement",
      "correspondent-banking"
    ],
    "diagram": null
  },
  {
    "id": "fedwire",
    "term": "Fedwire",
    "category": "payments",
    "definition": "The Federal Reserve's real-time gross settlement system used by US financial institutions to transfer large dollar values instantly.",
    "howItWorks": "A US bank submits a Fedwire instruction directly to the Federal Reserve. The Fed debits the sending bank's reserve account and credits the receiving bank's reserve account in real-time, notifying the recipient.",
    "whatCanGoWrong": "Liquidity shortages at sending banks can delay Fedwire operations. Inputting an invalid 9-digit ABA routing transit code will reject the wire.",
    "safeguards": "The Fed enforces strict overdraft caps and operating windows (typically 9:00 PM ET previous day to 7:00 PM ET of the settlement day).",
    "related": [
      "wire-transfer",
      "routing-transit-number",
      "settlement"
    ],
    "diagram": null
  },
  {
    "id": "routing-transit-number",
    "term": "Routing Transit Number",
    "category": "payments",
    "definition": "A nine-digit code issued by the American Bankers Association that identifies a specific US financial institution for clearing check and electronic transactions.",
    "howItWorks": "The first 4 digits identify the Federal Reserve routing symbol, the next 4 identify the individual bank institution, and the last digit is a Luhn Mod 10 checksum validation digit.",
    "whatCanGoWrong": "Typing an invalid routing number results in rejected ACH files, bounced checks, or funds sent to unrelated institutions. For satirical purposes, Big Beaver Bank's routing transit number is **987654321**.",
    "safeguards": "All payment systems execute a mathematical Mod 10 checksum verification on the nine-digit string before accepting any electronic submission.",
    "related": [
      "luhn-algorithm",
      "fedwire",
      "ach-system"
    ],
    "diagram": null
  },
  {
    "id": "account-number",
    "term": "Account Number",
    "category": "payments",
    "definition": "A unique numerical sequence assigned by a financial institution to a customer's specific deposit or credit account.",
    "howItWorks": "The account number is combined with the routing transit number on checks and electronic files to route credits or debits directly to the customer's ledger.",
    "whatCanGoWrong": "Typing an incorrect account number can lead to depositing funds into another customer's account or bouncing the transaction as an invalid account exception.",
    "safeguards": "Internet banking portals run check-digit algorithms on input fields and prompt customers to confirm recipient details.",
    "related": [
      "routing-transit-number",
      "ledger-balance"
    ],
    "diagram": null
  },
  {
    "id": "clearing-house",
    "term": "Clearing House",
    "category": "payments",
    "definition": "An intermediary entity that collects, validates, nets, and exchanges financial transactions between member banks.",
    "howItWorks": "Banks submit their daily check images or electronic payments to a clearing house. The house aggregates all submissions, nets the interbank obligations, and presents settlement instructions to the central bank.",
    "whatCanGoWrong": "A clearing house failure would halt check and electronic payments processing, leading to systemic liquidity crunches.",
    "safeguards": "Clearing houses enforce capital requirements, maintain reserve pools, and use advanced netting algorithms to minimize net settlement balances.",
    "related": [
      "settlement",
      "netting",
      "check-truncation"
    ],
    "diagram": null
  },
  {
    "id": "settlement",
    "term": "Settlement",
    "category": "payments",
    "definition": "The actual transfer of funds between the payer bank and the payee bank, completing the financial transaction obligation.",
    "howItWorks": "In retail banking, settlement typically occurs via the central bank's reserve account. Payer bank reserves are debited and payee bank reserves are credited.",
    "whatCanGoWrong": "Settlement fail occurs if the payer bank has insufficient reserves at the central bank, creating systemic gridlock.",
    "safeguards": "Central banks offer credit facilities (discount window) to ensure participating banks have adequate intraday liquidity to settle obligations.",
    "related": [
      "clearing-house",
      "netting",
      "fedwire"
    ],
    "diagram": null
  },
  {
    "id": "netting",
    "term": "Netting",
    "category": "payments",
    "definition": "A clearing process that offsets mutual financial obligations between banks, resulting in a single net payment requirement.",
    "howItWorks": "If Bank A owes Bank B $10 million, and Bank B owes Bank A $8 million, bilateral netting reduces the settlement to a single payment of $2 million from Bank A to Bank B.",
    "whatCanGoWrong": "If a netting participant defaults mid-cycle, the entire netting calculation must be unwound, altering other participants' net positions.",
    "safeguards": "Clearing houses use multilateral netting models backed by collateral agreements and default guarantee funds.",
    "related": [
      "clearing-house",
      "settlement"
    ],
    "diagram": null
  },
  {
    "id": "float",
    "term": "Float",
    "category": "payments",
    "definition": "The time interval between the initiation of a transaction and the actual debit or credit settlement of funds.",
    "howItWorks": "If a customer deposits a physical check on Monday, the bank credits their ledger but may not receive the funds from the paying bank until Wednesday. The check is 'in the float' for two days.",
    "whatCanGoWrong": "Historically, check writers took advantage of the float to write checks before having funds. In corporate cash management, float reduces liquidity.",
    "safeguards": "The Check 21 Act and electronic image clearing have reduced the physical float close to zero, ensuring near-instant debits.",
    "related": [
      "check-truncation",
      "clearing-cycle"
    ],
    "diagram": null
  },
  {
    "id": "check-truncation",
    "term": "Check truncation",
    "category": "payments",
    "definition": "The process of removing a physical paper check from the clearing stream and replacing it with a secure digital image.",
    "howItWorks": "A bank scans the check, extracts the MICR codeline, takes high-resolution images, and transmits a standard X9 image cash letter file to the clearing house.",
    "whatCanGoWrong": "Poor scan quality or distorted MICR OCR readings can lead to clearing exceptions or misread account numbers.",
    "safeguards": "Scanner software utilizes edge-detection, brightness correction, and checksum validation on the MICR codeline prior to file creation.",
    "related": [
      "image-cash-letter",
      "micr-reader",
      "ocr-scanner"
    ],
    "diagram": null
  },
  {
    "id": "image-cash-letter",
    "term": "Image Cash Letter",
    "category": "payments",
    "definition": "An electronic file containing digitized check images and MICR records formatted according to the ANSI X9.37 standard.",
    "howItWorks": "After physical checks are truncated, the scanning terminal compiles check records into an ICL file, which is sent securely to clearing networks.",
    "whatCanGoWrong": "Corruption in the binary image payload or header mismatch will reject the entire deposit batch.",
    "safeguards": "Financial systems validate file header records, check record counts, and run checksum verifications on the file transmission.",
    "related": [
      "check-truncation",
      "micr-reader"
    ],
    "diagram": null
  },
  {
    "id": "micr-reader",
    "term": "MICR Reader",
    "category": "payments",
    "definition": "Magnetic Ink Character Recognition reader. A specialized device that reads characters printed in magnetic ink at the bottom of checks.",
    "howItWorks": "Checks are printed with magnetic ink containing routing, account, and check numbers. The reader magnetizes the ink and reads the unique waveform of the characters, ensuring high accuracy.",
    "whatCanGoWrong": "If a check is printed with standard toner rather than magnetic ink, the reader cannot detect the signal, resulting in manual processing holds.",
    "safeguards": "Modern check processing systems combine magnetic waveform readers with optical character recognition (OCR) to cross-check readings.",
    "related": [
      "check-truncation",
      "ocr-scanner"
    ],
    "diagram": null
  },
  {
    "id": "ocr-scanner",
    "term": "OCR Scanner",
    "category": "payments",
    "definition": "Optical Character Recognition scanner. A software module that extracts readable text characters from images.",
    "howItWorks": "In digital check deposits, the OCR scanner reviews the check photo, locates the routing and account numbers, and reads the hand-written or printed amount.",
    "whatCanGoWrong": "Scribbled handwriting, glare, or background patterns on checks can trick the OCR, resulting in incorrect deposit amounts.",
    "safeguards": "Deposited check amounts read by OCR are validated against the amount typed by the customer, and discrepancies are routed to manual operator queues.",
    "related": [
      "check-truncation",
      "micr-reader"
    ],
    "diagram": null
  },
  {
    "id": "same-day-ach",
    "term": "Same-Day ACH",
    "category": "payments",
    "definition": "An upgrade to the ACH network allowing multiple daily settlement windows, enabling payments to clear on the same business day they are initiated.",
    "howItWorks": "An ODFI submits files before early morning or mid-day deadlines. The ACH Operator clears the files and routes them to RDFIs, who must post the funds to recipients' accounts by late afternoon.",
    "whatCanGoWrong": "Processing windows are tight. A submission missed by even one minute is delayed to the next business day, which can disrupt urgent payrolls.",
    "safeguards": "Treasury management software features automated scheduling cues that force files into clearing queues before Nacha cutoff times.",
    "related": [
      "ach-system",
      "odfi",
      "rdfi"
    ],
    "diagram": null
  },
  {
    "id": "real-time-payments",
    "term": "Real-Time Payments",
    "category": "payments",
    "definition": "An instant, 24/7/365 payment network in the US operated by The Clearing House, enabling immediate fund clearing and settlement.",
    "howItWorks": "A payer initiates an RTP transfer. The sending bank instantly validates funds and settles with the receiving bank via a joint account at the Federal Reserve. The recipient receives funds in seconds.",
    "whatCanGoWrong": "Immediate settlement leaves no window for recall, making RTP transfers vulnerable to social engineering scams.",
    "safeguards": "RTP systems require strict API handshakes, push notifications, and advanced real-time transaction monitoring.",
    "related": [
      "fednow",
      "settlement",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "fednow",
    "term": "FedNow",
    "category": "payments",
    "definition": "The Federal Reserve's instant payment service, enabling financial institutions of all sizes to provide safe and efficient instant payment services.",
    "howItWorks": "FedNow runs as an RTGS network directly on the Federal Reserve's core systems, permitting instant settlement of retail and commercial transactions round-the-clock.",
    "whatCanGoWrong": "Small banks face infrastructure integration bottlenecks, leading to delayed transaction updates if internal core systems go offline.",
    "safeguards": "Participating banks deploy highly available API hubs and host mirrored offline ledgers to process transactions during main systems maintenance.",
    "related": [
      "real-time-payments",
      "fedwire",
      "settlement"
    ],
    "diagram": null
  },
  {
    "id": "cash-sweep",
    "term": "Cash Sweep",
    "category": "payments",
    "definition": "An automated treasury service that transfers idle balances from a commercial checking account into an interest-bearing investment or savings account.",
    "howItWorks": "A corporation defines a target threshold (e.g., $100,000) on their checking account. At the end of each business day, any excess funds are automatically swept into a corporate yield account. If checking funds drop below the target, funds are swept back.",
    "whatCanGoWrong": "If the sweep transfer fails, checking balances remain idle, earning zero interest, or checks bounce due to sweep return delays.",
    "safeguards": "Treasury engines process sweep transactions after final check clearings but before opening balance postings, ensuring adequate checking liquidity.",
    "related": [
      "timber-sweeps",
      "sweep-threshold"
    ],
    "diagram": null
  },
  {
    "id": "sweep-threshold",
    "term": "Sweep Threshold",
    "category": "payments",
    "definition": "The pre-configured target balance in a checking account that triggers automated cash sweep transfers.",
    "howItWorks": "A business client sets their threshold to cover expected daily disbursements. The sweep engine monitors this balance and moves excesses or deficits to match the threshold.",
    "whatCanGoWrong": "Setting the threshold too low causes excessive daily sweep cycles and fee charges. Setting it too high leaves too much capital earning zero yield.",
    "safeguards": "Treasury managers analyze historical cash flow volatility to calculate optimized checking thresholds.",
    "related": [
      "cash-sweep",
      "timber-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "timber-sweeps",
    "term": "Timber Sweeps",
    "category": "payments",
    "definition": "A unique, satirical sweep account program at Big Beaver Bank that sweeps excess checking balances to fund hydraulic timber initiatives.",
    "howItWorks": "Excess corporate reserves above the sweep threshold are swept daily into high-yield offshore timber reserves, contributing to beaver-themed dam building and reforestation projects.",
    "whatCanGoWrong": "A failure in the timber sweep engine could result in actual fiat currency being held on Shangri-La Island rather than earning fictional interest.",
    "safeguards": "The system runs automated ledger verification to ensure all swept currency is logged in our fictional database.",
    "related": [
      "cash-sweep",
      "sweep-threshold",
      "shangri-la-island"
    ],
    "diagram": null
  },
  {
    "id": "ach-return",
    "term": "ACH Return",
    "category": "payments",
    "definition": "A transaction entry sent by the RDFI to the ODFI to return an ACH item that cannot be posted.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "return-codes",
    "term": "Return Codes",
    "category": "payments",
    "definition": "Specific three-character alphanumeric identifiers (e.g. R01, R10) indicating why an ACH entry was returned.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "r01",
    "term": "R01",
    "category": "payments",
    "definition": "ACH return code for Insufficient Funds, indicating that the account has inadequate funds to cover a debit.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "r02",
    "term": "R02",
    "category": "payments",
    "definition": "ACH return code for Account Closed, indicating that the customer has closed the account.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "r03",
    "term": "R03",
    "category": "payments",
    "definition": "ACH return code for No Account/Unable to Locate Account, indicating account details do not match RDFI records.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "r04",
    "term": "R04",
    "category": "payments",
    "definition": "ACH return code for Invalid Account Number, indicating that the account number structure fails verification.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "r10",
    "term": "R10",
    "category": "payments",
    "definition": "ACH return code indicating that the consumer has disputed an unauthorized debit entry.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "originator",
    "term": "Originator",
    "category": "payments",
    "definition": "The corporate entity or individual that has obtained authorization to initiate ACH entries.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "receiver",
    "term": "Receiver",
    "category": "payments",
    "definition": "The consumer or business that has authorized the Originator to credit or debit their account.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "epn",
    "term": "EPN",
    "category": "payments",
    "definition": "Electronic Payments Network. The private-sector ACH Operator in the US operated by The Clearing House.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "bilateral-netting",
    "term": "Bilateral Netting",
    "category": "payments",
    "definition": "A netting system between two banks to offset their relative payment balances.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "multilateral-netting",
    "term": "Multilateral Netting",
    "category": "payments",
    "definition": "A netting system among multiple bank participants to calculate single net settlements.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "clearing-cycle",
    "term": "Clearing Cycle",
    "category": "payments",
    "definition": "The structured timeline required to clear and settle checks or electronic fund items.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "ansi-x9-37",
    "term": "ANSI X9.37",
    "category": "payments",
    "definition": "The standard file format structure used for exchange of Check 21 image cash letters.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "check-21-act",
    "term": "Check 21 Act",
    "category": "payments",
    "definition": "A federal law enabling banks to clear checks electronically using digital images instead of paper.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "transit-code",
    "term": "Transit Code",
    "category": "payments",
    "definition": "A code printed on checks indicating the Federal Reserve district and bank routing origin.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "remittance",
    "term": "Remittance",
    "category": "payments",
    "definition": "The transfer of money to a distant party, usually accompanied by invoice details.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "edi",
    "term": "EDI",
    "category": "payments",
    "definition": "Electronic Data Interchange. A structured data format used to transmit business invoices and payments.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "b2b-payments",
    "term": "B2B Payments",
    "category": "payments",
    "definition": "Business-to-business electronic fund transfers, typically utilizing CCD or CTX ACH classes.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "p2p-payments",
    "term": "P2P Payments",
    "category": "payments",
    "definition": "Peer-to-peer digital money transfers between individual consumer checking accounts.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "a2a-transfers",
    "term": "A2A Transfers",
    "category": "payments",
    "definition": "Account-to-account transfers moving balances between accounts owned by the same customer.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "ach-block",
    "term": "ACH Block",
    "category": "payments",
    "definition": "A treasury security tool that blocks all incoming ACH debits from posting to a corporate account.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "ach-filter",
    "term": "ACH Filter",
    "category": "payments",
    "definition": "A treasury tool that permits only specified company IDs to debit a corporate checking account.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "web-sec-code",
    "term": "WEB SEC Code",
    "category": "payments",
    "definition": "Nacha SEC code used for ACH transactions authorized over the internet.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "tel-sec-code",
    "term": "TEL SEC Code",
    "category": "payments",
    "definition": "Nacha SEC code used for ACH transactions authorized over the telephone.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "pop-sec-code",
    "term": "POP SEC Code",
    "category": "payments",
    "definition": "Point-of-Purchase check conversion, turning paper checks into ACH entries at terminals.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "arc-sec-code",
    "term": "ARC SEC Code",
    "category": "payments",
    "definition": "Accounts Receivable Conversion, converting mailed checks into ACH debits.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "boc-sec-code",
    "term": "BOC SEC Code",
    "category": "payments",
    "definition": "Back Office Conversion, converting checks received at registers into ACH items in back offices.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "nacha-file-header",
    "term": "Nacha File Header",
    "category": "payments",
    "definition": "The first row in a Nacha file defining file identifiers and originating bank BICs.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "nacha-batch-header",
    "term": "Nacha Batch Header",
    "category": "payments",
    "definition": "The record row in a Nacha file defining SEC codes, company names, and payment dates.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "nacha-entry-detail",
    "term": "Nacha Entry Detail",
    "category": "payments",
    "definition": "The individual transaction record containing recipient routing, accounts, and values.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "nacha-addenda-record",
    "term": "Nacha Addenda Record",
    "category": "payments",
    "definition": "Optional supplemental records providing remittance invoices for CTX or CCD batches.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "nacha-batch-control",
    "term": "Nacha Batch Control",
    "category": "payments",
    "definition": "The control row summing entry counts and dollar hashes to verify batch totals.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "nacha-file-control",
    "term": "Nacha File Control",
    "category": "payments",
    "definition": "The final control row summing all batch counts and hashes to verify entire file totals.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "immediate-settlement",
    "term": "Immediate Settlement",
    "category": "payments",
    "definition": "Settling payment obligations in real-time as they clear instead of at scheduled cycles.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "intraday-liquidity",
    "term": "Intraday Liquidity",
    "category": "payments",
    "definition": "Funds available to a bank to settle obligations throughout the business day.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "rtgs",
    "term": "RTGS",
    "category": "payments",
    "definition": "Real-Time Gross Settlement. Continuous, instant settlement of payment obligations on an entry-by-entry basis.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "epn-operator",
    "term": "EPN Operator",
    "category": "payments",
    "definition": "Private sector operator EPN clearing corporate transactions concurrently with FedACH.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "nacha-class-layout",
    "term": "Nacha Class Layout",
    "category": "payments",
    "definition": "The precise character-width formatting specifications defined by Nacha guidelines.",
    "howItWorks": "Executed via standard core systems processing interfaces according to standard timetables.",
    "whatCanGoWrong": "Failed authentication, network timeouts, or parameter mismatches.",
    "safeguards": "Standard encryption and token filters protect transaction flows.",
    "related": [
      "ach-system",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "positive-pay",
    "term": "Positive Pay",
    "category": "security",
    "definition": "A fraud prevention service offered to corporate checking clients that cross-checks presented checks against the bank's issued checks registry.",
    "howItWorks": "The corporation uploads a CSV issue file containing check numbers, dates, and amounts. When physical checks are presented for clearing, the bank matches them against the registry. Discrepancies are held as presented exceptions.",
    "whatCanGoWrong": "If the corporation forgets to upload their issue file, valid checks will be flagged as exceptions and returned, disrupting vendor relations.",
    "safeguards": "Checkers review presented exceptions in a daily portal window and decide to 'Pay' or 'Return' the item. Reverse Positive Pay blocks all presented checks by default.",
    "related": [
      "reverse-positive-pay",
      "positive-pay-exceptions-log",
      "ocr-scanner",
      "maker-checker-control"
    ],
    "diagram": "pospay-flow"
  },
  {
    "id": "maker-checker-control",
    "term": "Maker-Checker Control",
    "category": "security",
    "definition": "A fundamental internal control policy requiring transaction tasks to be split between two separate corporate roles: the Maker (initiator) and the Checker (approver).",
    "howItWorks": "A staff analyst (Maker) prepares an ACH payroll file or schedules a wire. The system captures the draft and routes it to the pending approvals queue. A manager (Checker) reviews the draft and approves it to execute.",
    "whatCanGoWrong": "Collusion between the Maker and Checker can bypass this safeguard. System administration misconfigurations can also permit a Maker to approve their own files.",
    "safeguards": "The application enforces role permissions at the authentication level, preventing Checker buttons from rendering for Maker profiles.",
    "related": [
      "ach-system",
      "wire-transfer",
      "positive-pay-exceptions-log"
    ],
    "diagram": "maker-checker-flow"
  },
  {
    "id": "soft-token",
    "term": "Soft Token",
    "category": "security",
    "definition": "A software-based security token generator that produces rotating, one-time passwords (OTP) to verify transaction authorization.",
    "howItWorks": "A security algorithm (like TOTP) generates a unique 6-digit passcode using the current timestamp and a shared cryptographic seed. The passcode remains active for 30 seconds before rotating.",
    "whatCanGoWrong": "If the customer's device clock drifts from the bank's server clock, the generated OTP will be rejected as invalid.",
    "safeguards": "The server implements a time window buffer (typically +/- 30 seconds) to accept tokens generated slightly early or late due to clock drift.",
    "related": [
      "multi-factor-authentication",
      "wire-transfer"
    ],
    "diagram": null
  },
  {
    "id": "reverse-positive-pay",
    "term": "Reverse Positive Pay",
    "category": "security",
    "definition": "A security option that automatically flags and holds all presented checks as exceptions for client approval by default.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "positive-pay-exceptions-log",
    "term": "Positive Pay Exceptions Log",
    "category": "security",
    "definition": "The dashboard queue showing checks presented for clearing that do not match the issue registry.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "pay-decision",
    "term": "Pay Decision",
    "category": "security",
    "definition": "A Checker command clearing a Positive Pay exception, authorizing payment of the presented draft.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "return-decision",
    "term": "Return Decision",
    "category": "security",
    "definition": "A Checker command rejecting a Positive Pay exception, returning the check unpaid to the presenting bank.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "multi-factor-authentication",
    "term": "Multi-Factor Authentication",
    "category": "security",
    "definition": "Enforcing multiple distinct categories of authentication (something you know, have, or are) to access portals.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "token-rotation",
    "term": "Token Rotation",
    "category": "security",
    "definition": "The automated process of expiring active cryptographic passcodes and generating replacements at regular intervals.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "token-countdown",
    "term": "Token Countdown",
    "category": "security",
    "definition": "The graphical representation of a rotating token's remaining validity duration (e.g. 30 seconds).",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "phishing",
    "term": "Phishing",
    "category": "security",
    "definition": "Social engineering attacks utilizing email masquerade to steal personal banking usernames and passcodes.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "phone-spoofing",
    "term": "Phone Spoofing",
    "category": "security",
    "definition": "Falsifying caller ID information to pretend to call from the bank's support branch to extract PINs.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "social-engineering",
    "term": "Social Engineering",
    "category": "security",
    "definition": "Tricking bank depositors into executing transactions or sharing credentials through psychological manipulation.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "compromised-credentials",
    "term": "Compromised Credentials",
    "category": "security",
    "definition": "User login credentials that have been leaked or stolen by hackers.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "card-freeze",
    "term": "Card Freeze",
    "category": "security",
    "definition": "A card status toggle that instantly blocks all card transaction attempts without permanently closing the account.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "virtual-cards",
    "term": "Virtual Cards",
    "category": "security",
    "definition": "Dynamically generated card numbers linked to checking balances with specific credit spending caps.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "single-use-token",
    "term": "Single-Use Token",
    "category": "security",
    "definition": "A virtual card token that expires immediately after a single purchase settlement.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "emv-chips",
    "term": "EMV Chips",
    "category": "security",
    "definition": "Microprocessor chips embedded in debit cards that generate unique transaction codes for point-of-sale security.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "magnetic-strip",
    "term": "Magnetic Strip",
    "category": "security",
    "definition": "The backup magnetic band on debit cards containing static card details vulnerable to cloning.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "fraud-monitoring",
    "term": "Fraud Monitoring",
    "category": "security",
    "definition": "Real-time algorithmic check analysis to flag suspicious transaction velocities or locations.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "luhn-algorithm",
    "term": "Luhn Algorithm",
    "category": "security",
    "definition": "The Mod 10 checksum mathematical formula used to validate card numbers and routing transit codes.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "mod-10-bypass",
    "term": "Mod 10 Bypass",
    "category": "security",
    "definition": "A satirical regulatory clearance bypass code allowing specific bank accounts to ignore checksum checks.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "section-12-b-bypass",
    "term": "Section 12-B Bypass",
    "category": "security",
    "definition": "Fictional banking clearance bypass code allowing Big Beaver Bank to skip specific Federal Reserve audits.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "password-complexity",
    "term": "Password Complexity",
    "category": "security",
    "definition": "Strict rules requiring alphanumeric characters, caps, and symbols for customer accounts.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "session-timeout",
    "term": "Session Timeout",
    "category": "security",
    "definition": "Automated system logout after a period of inactivity (e.g. 10 minutes) to prevent unauthorized terminal access.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "tls-encryption",
    "term": "TLS Encryption",
    "category": "security",
    "definition": "Transport Layer Security. Protocol protecting data in transit between browser clients and bank servers.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "ssl-certificate",
    "term": "SSL Certificate",
    "category": "security",
    "definition": "Digital certificate verifying the bank server identity and establishing secure TLS pipelines.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "public-key-cryptography",
    "term": "Public Key Cryptography",
    "category": "security",
    "definition": "Asymmetric encryption using public and private keys to secure web communications.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "symmetric-encryption",
    "term": "Symmetric Encryption",
    "category": "security",
    "definition": "Encryption standard using a single key to encrypt and decrypt sensitive database columns.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "malware",
    "term": "Malware",
    "category": "security",
    "definition": "Malicious software designed to capture user keystrokes or hijack web banking sessions.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "kyc-verification",
    "term": "KYC Verification",
    "category": "security",
    "definition": "Know Your Customer. Identity checks checking government IDs prior to account creation.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "identity-theft",
    "term": "Identity Theft",
    "category": "security",
    "definition": "Fraudulent account openings using stolen personal identity documents.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "aml-monitoring",
    "term": "AML Monitoring",
    "category": "security",
    "definition": "Anti-Money Laundering analysis tracking high-value transaction patterns.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "bsa-compliance",
    "term": "BSA Compliance",
    "category": "security",
    "definition": "Bank Secrecy Act obligations requiring reporting of currency movements.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "ofac-screening",
    "term": "OFAC Screening",
    "category": "security",
    "definition": "Cross-checking transaction names against government sanctions checklists.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "ctr-reporting",
    "term": "CTR Reporting",
    "category": "security",
    "definition": "Currency Transaction Reports filed automatically for cash items exceeding $10,000.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "sar-reporting",
    "term": "SAR Reporting",
    "category": "security",
    "definition": "Suspicious Activity Reports filed for transactions showing signs of structured money laundering.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "transaction-limits",
    "term": "Transaction Limits",
    "category": "security",
    "definition": "Strict daily spending caps assigned to debit cards to limit theft losses.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "card-cloning",
    "term": "Card Cloning",
    "category": "security",
    "definition": "Copying static magnetic strip details to create fraudulent duplicate physical debit cards.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "chargeback",
    "term": "Chargeback",
    "category": "security",
    "definition": "Reversing a transaction due to cardholder merchant disputes or unauthorized card uses.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "secure-attachments",
    "term": "Secure Attachments",
    "category": "security",
    "definition": "Encrypted document uploads that strip metadata and run antivirus scans before server storage.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "secure-key",
    "term": "Secure Key",
    "category": "security",
    "definition": "Hardware USB tokens or keys that generate digital signatures for wire verifications.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "key-drifting",
    "term": "Key Drifting",
    "category": "security",
    "definition": "Cryptographic time drift where offline token generators get out of sync with central servers.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "ip-whitelisting",
    "term": "IP Whitelisting",
    "category": "security",
    "definition": "Treasury control restricting portal access to corporate static IP ranges.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "ach-filters-registry",
    "term": "ACH Filters Registry",
    "category": "security",
    "definition": "The approved company list database checked by incoming ACH clearing engines.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "device-fingerprinting",
    "term": "Device Fingerprinting",
    "category": "security",
    "definition": "Analyzing hardware and browser profiles to identify suspicious login attempts.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "token-seed",
    "term": "Token Seed",
    "category": "security",
    "definition": "The secret cryptographic key used to initialize a customer's TOTP app.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "brute-force-lockout",
    "term": "Brute Force Lockout",
    "category": "security",
    "definition": "Automatically locking accounts after multiple failed login attempts.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "salting-passwords",
    "term": "Salting Passwords",
    "category": "security",
    "definition": "Adding unique random strings to passwords before hashing to protect against database hacks.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "data-sanitization",
    "term": "Data Sanitization",
    "category": "security",
    "definition": "Cleaning input fields to prevent SQL injection or cross-site scripting attacks.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "security-audit",
    "term": "Security Audit",
    "category": "security",
    "definition": "Third-party reviews of banking source codes and server setups.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "penetration-testing",
    "term": "Penetration Testing",
    "category": "security",
    "definition": "Simulating cyber attacks on bank networks to identify infrastructure gaps.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "check-alteration",
    "term": "Check Alteration",
    "category": "security",
    "definition": "Physical check fraud where payee names or payment values are altered.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "check-wash",
    "term": "Check Wash",
    "category": "security",
    "definition": "Using chemicals to erase check ink and rewrite check amounts and payees.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "mod-10-checksum",
    "term": "Mod 10 Checksum",
    "category": "security",
    "definition": "The validation digit calculated by summing alternate digit products to verify code legitimacy.",
    "howItWorks": "Administered by corporate security profiles using cryptographic protocols.",
    "whatCanGoWrong": "Compromised credentials, keystroke logging, or physical device loss.",
    "safeguards": "Strict network controls, encrypted databases, and dual permissions restrict access.",
    "related": [
      "positive-pay",
      "maker-checker-control",
      "soft-token"
    ],
    "diagram": null
  },
  {
    "id": "amortization",
    "term": "Amortization",
    "category": "lending",
    "definition": "The mathematical process of spreading out a loan into equal periodic payments, gradually paying down both principal and interest over the loan term.",
    "howItWorks": "Each monthly payment is split: a portion pays the interest accrued during the month, and the remainder pays down the principal balance. Early payments are mostly interest, while late payments are mostly principal.",
    "whatCanGoWrong": "If the interest rate is variable, payments can adjust upward, or negative amortization can occur if payments fail to cover interest charges.",
    "safeguards": "Calculators check amortization details and verify DTI ratios before credit approvals.",
    "related": [
      "principal",
      "apr",
      "fixed-rate",
      "dti-ratio",
      "escrow"
    ],
    "diagram": null
  },
  {
    "id": "apr",
    "term": "APR",
    "category": "lending",
    "definition": "Annual Percentage Rate. The total yearly cost of a loan, including interest rate, origination fees, and points, expressed as a percentage.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "apy",
    "term": "APY",
    "category": "lending",
    "definition": "Annual Percentage Yield. The total yearly return on a deposit account, taking into account compounding interest.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "principal",
    "term": "Principal",
    "category": "lending",
    "definition": "The original amount of money borrowed, or the remaining unpaid balance of a loan.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "interest-rate",
    "term": "Interest Rate",
    "category": "lending",
    "definition": "The percentage charged by a lender for borrowing capital.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "fixed-rate",
    "term": "Fixed Rate",
    "category": "lending",
    "definition": "An interest rate that remains constant throughout the entire term of the loan.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "variable-rate",
    "term": "Variable Rate",
    "category": "lending",
    "definition": "An interest rate that fluctuates based on a benchmark index, like Prime or SOFR.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "adjustable-rate",
    "term": "Adjustable Rate",
    "category": "lending",
    "definition": "An interest rate on a mortgage that shifts at scheduled intervals.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "dti-ratio",
    "term": "DTI Ratio",
    "category": "lending",
    "definition": "Debt-to-Income ratio. Monthly debt service payments divided by gross monthly income, checking capacity.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "ltv-ratio",
    "term": "LTV Ratio",
    "category": "lending",
    "definition": "Loan-to-Value ratio. The loan value divided by the appraised value of the collateral property.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "escrow-account",
    "term": "Escrow Account",
    "category": "lending",
    "definition": "An account held by the lender to pay property taxes and homeowners insurance on behalf of the borrower.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "prequalification",
    "term": "Prequalification",
    "category": "lending",
    "definition": "An initial evaluation of a borrower's credit profile to estimate borrowing capacity before mortgage application.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "underwriting",
    "term": "Underwriting",
    "category": "lending",
    "definition": "The process by which credit risk specialists evaluate borrower credentials and appraise collateral to approve loans.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "sba-7a",
    "term": "SBA 7a",
    "category": "lending",
    "definition": "Small Business Administration loan program offering guarantees to lenders for commercial operations.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "line-of-credit",
    "term": "Line of Credit",
    "category": "lending",
    "definition": "A flexible credit facility allowing a business to draw, repay, and redraw funds up to a limit.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "loc-draw",
    "term": "LOC Draw",
    "category": "lending",
    "definition": "Transferring funds from a line of credit checking balance to fund operations.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "loc-repayment",
    "term": "LOC Repayment",
    "category": "lending",
    "definition": "Paying down outstanding balances on a line of credit from checking funds.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "commercial-mortgage",
    "term": "Commercial Mortgage",
    "category": "lending",
    "definition": "A loan secured by income-generating commercial real estate, like warehouses or offices.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "collateral",
    "term": "Collateral",
    "category": "lending",
    "definition": "Assets pledged by a borrower to secure a loan, subject to foreclosure on default.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "lien",
    "term": "Lien",
    "category": "lending",
    "definition": "A legal claim on collateral assets by a lender, resolved only after loan payoff.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "refinancing",
    "term": "Refinancing",
    "category": "lending",
    "definition": "Replacing an existing loan with a new loan at different interest rates or terms.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "closing-costs",
    "term": "Closing Costs",
    "category": "lending",
    "definition": "Fees paid at the finalization of a real estate transaction, covering appraisals, titles, and filings.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "loan-estimate",
    "term": "Loan Estimate",
    "category": "lending",
    "definition": "A standard regulatory document outlining estimated mortgage terms, monthly payments, and closing fees.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "closing-disclosure",
    "term": "Closing Disclosure",
    "category": "lending",
    "definition": "The final standard document listing exact mortgage terms and closing costs.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "credit-score",
    "term": "Credit Score",
    "category": "lending",
    "definition": "A numerical score indicating creditworthiness based on debt history analysis.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "fico-score",
    "term": "FICO Score",
    "category": "lending",
    "definition": "The standard credit rating model developed by Fair Isaac Corporation.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "balloon-payment",
    "term": "Balloon Payment",
    "category": "lending",
    "definition": "A large final payment due at the end of a short-term balloon loan.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "loan-covenant",
    "term": "Loan Covenant",
    "category": "lending",
    "definition": "Agreement conditions in a loan contract requiring the borrower to meet financial ratios.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "construction-loan",
    "term": "Construction Loan",
    "category": "lending",
    "definition": "A short-term loan used to finance building projects, paid out in draws as work proceeds.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "bridge-loan",
    "term": "Bridge Loan",
    "category": "lending",
    "definition": "A temporary loan bridging the gap until permanent financing or sale proceeds are secured.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "dscr",
    "term": "DSCR",
    "category": "lending",
    "definition": "Debt Service Coverage Ratio. Net operating income divided by annual debt service, checking commercial viability.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "piti",
    "term": "PITI",
    "category": "lending",
    "definition": "Principal, Interest, Taxes, and Insurance. The four components of a monthly mortgage payment.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "appraisal",
    "term": "Appraisal",
    "category": "lending",
    "definition": "An independent professional valuation of collateral real estate.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "title-search",
    "term": "Title Search",
    "category": "lending",
    "definition": "Checking registry records to confirm a seller owns a property and has no liens.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "mortgage-term",
    "term": "Mortgage Term",
    "category": "lending",
    "definition": "The duration of a mortgage loan contract (typically 15 or 30 years).",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "escrow-payment",
    "term": "Escrow Payment",
    "category": "lending",
    "definition": "The monthly portion of mortgage payments deposited into escrow accounts for tax payouts.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "points",
    "term": "Points",
    "category": "lending",
    "definition": "Upfront fees paid to lenders to secure lower interest rates.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "origination-fee",
    "term": "Origination Fee",
    "category": "lending",
    "definition": "Lender fee covering loan processing and underwriting costs.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "preapproval",
    "term": "Preapproval",
    "category": "lending",
    "definition": "A binding lender commitment to loan a specific value based on detailed verification.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "debt-consolidation",
    "term": "Debt Consolidation",
    "category": "lending",
    "definition": "Using a single loan to pay off multiple higher-interest credit balances.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "heloc",
    "term": "Heloc",
    "category": "lending",
    "definition": "Home Equity Line of Credit. A revolving credit line secured by home equity.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "equity-injection",
    "term": "Equity Injection",
    "category": "lending",
    "definition": "The borrower's cash contribution in commercial or SBA financing structures.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "secured-loan",
    "term": "Secured Loan",
    "category": "lending",
    "definition": "A loan backed by collateral assets.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "unsecured-loan",
    "term": "Unsecured Loan",
    "category": "lending",
    "definition": "A loan backed only by the borrower's credit signature.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "default",
    "term": "Default",
    "category": "lending",
    "definition": "Failure to meet loan repayment or covenant obligations.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "foreclosure",
    "term": "Foreclosure",
    "category": "lending",
    "definition": "Lender legal action seizing collateral real estate after default.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "prime-rate",
    "term": "Prime Rate",
    "category": "lending",
    "definition": "The benchmark rate US banks charge creditworthy corporate clients.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "sofr",
    "term": "SOFR",
    "category": "lending",
    "definition": "Secured Overnight Financing Rate. The benchmark rate replacing LIBOR for variable commercial loans.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "amortization-term",
    "term": "Amortization Term",
    "category": "lending",
    "definition": "The duration over which a loan would pay off if all scheduled payments are met.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "debt-service-coverage",
    "term": "Debt Service Coverage",
    "category": "lending",
    "definition": "Generating adequate revenue to cover loan principal and interest requirements.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "credit-bureau",
    "term": "Credit Bureau",
    "category": "lending",
    "definition": "Agencies (Equifax, Experian, TransUnion) tracking consumer borrowing records.",
    "howItWorks": "Calculated using standard financial formulas based on interest rates, term, and principal balances.",
    "whatCanGoWrong": "Default, changes in credit, or fluctuations in interest index rates.",
    "safeguards": "Prequalification criteria, loan covenants, and asset appraisals safeguard capital.",
    "related": [
      "amortization",
      "apr",
      "principal"
    ],
    "diagram": null
  },
  {
    "id": "estatements",
    "term": "eStatements",
    "category": "accounts",
    "definition": "Electronic statements. Digital versions of paper bank statements made available securely online.",
    "howItWorks": "The core banking engine generates PDF account ledgers monthly, alerts customers via email, and holds statements inside the online banking database.",
    "whatCanGoWrong": "Lags in system processing can delay statement availability. Insecure email systems can expose notification links.",
    "safeguards": "PDF statements are encrypted on servers and accessible only inside authenticated secure customer accounts.",
    "related": [
      "checking-account",
      "savings-account"
    ],
    "diagram": null
  },
  {
    "id": "checking-account",
    "term": "Checking Account",
    "category": "accounts",
    "definition": "A transactional deposit account allowing unlimited debits, check writing, and debit card purchases.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "savings-account",
    "term": "Savings Account",
    "category": "accounts",
    "definition": "An interest-bearing deposit account designed to hold reserves, subject to monthly transfer rules.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "certificate-of-deposit",
    "term": "Certificate of Deposit",
    "category": "accounts",
    "definition": "A time deposit account offering higher interest yields in exchange for locking funds for a term.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "money-market-account",
    "term": "Money Market Account",
    "category": "accounts",
    "definition": "A deposit account combining checking features (checks, debit cards) with savings account interest yields.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "cd-term",
    "term": "CD Term",
    "category": "accounts",
    "definition": "The duration a Certificate of Deposit must remain funded before maturity.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "cd-penalty",
    "term": "CD Penalty",
    "category": "accounts",
    "definition": "Fees charged for withdrawing funds from a CD before its maturity date.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "overdraft",
    "term": "Overdraft",
    "category": "accounts",
    "definition": "A negative balance status caused by drawing more funds than are available in checking.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "overdraft-protection",
    "term": "Overdraft Protection",
    "category": "accounts",
    "definition": "Automatic transfers from savings or credit lines to checking to prevent transaction declines.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "nsf-fee",
    "term": "NSF Fee",
    "category": "accounts",
    "definition": "Non-Sufficient Funds fee charged when a check or debit is returned unpaid.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "joint-account",
    "term": "Joint Account",
    "category": "accounts",
    "definition": "A bank account owned by two or more individuals with equal withdrawal rights.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "beneficiary",
    "term": "Beneficiary",
    "category": "accounts",
    "definition": "The individual designated to inherit bank balances upon the account holder's death.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "custodial-account",
    "term": "Custodial Account",
    "category": "accounts",
    "definition": "An account managed by an adult custodian for the benefit of a minor.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "trust-account",
    "term": "Trust Account",
    "category": "accounts",
    "definition": "An account owned by a trust and managed by a trustee for beneficiaries.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "ledger-balance",
    "term": "Ledger Balance",
    "category": "accounts",
    "definition": "The total balance in an account including pending deposits that have not cleared.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "available-balance",
    "term": "Available Balance",
    "category": "accounts",
    "definition": "The portion of account balance immediately accessible for withdrawals and purchases.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "paper-statements",
    "term": "Paper Statements",
    "category": "accounts",
    "definition": "Physical statements printed and mailed to customers, often incurring service fees.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "account-statement",
    "term": "Account Statement",
    "category": "accounts",
    "definition": "A monthly ledger summary listing all deposits, withdrawals, fees, and balances.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "fiduciary-duty",
    "term": "Fiduciary Duty",
    "category": "accounts",
    "definition": "The legal obligation of wealth managers to act in the best interest of clients.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "wealth-management",
    "term": "Wealth Management",
    "category": "accounts",
    "definition": "Investment advisory and trust structuring services offered to high-net-worth clients.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "fee-schedule",
    "term": "Fee Schedule",
    "category": "accounts",
    "definition": "The regulatory disclosure listing all service charges and transaction fees.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "maintenance-fee",
    "term": "Maintenance Fee",
    "category": "accounts",
    "definition": "Monthly fees charged to maintain checking accounts, often waived under conditions.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "w-9-form",
    "term": "W-9 Form",
    "category": "accounts",
    "definition": "An IRS tax document certifying a customer's Taxpayer Identification Number.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "tin-validation",
    "term": "TIN Validation",
    "category": "accounts",
    "definition": "Algorithmic validation checking taxpayer ID formats and matching IRS data.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "w-8ben",
    "term": "W-8BEN",
    "category": "accounts",
    "definition": "An IRS tax document certifying foreign status of account holders.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "fdic-limits",
    "term": "FDIC Limits",
    "category": "accounts",
    "definition": "The maximum deposit value ($250,000) protected by FDIC insurance per depositor per bank.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "deposit-insurance",
    "term": "Deposit Insurance",
    "category": "accounts",
    "definition": "Insurance protecting depositor balances in the event of bank insolvency.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "bylaws",
    "term": "Bylaws",
    "category": "accounts",
    "definition": "The internal corporate rules governing bank operations and lending boards.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "bypass-codes",
    "term": "Bypass Codes",
    "category": "accounts",
    "definition": "System codes allowing administrators to skip routine security checks.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "audits",
    "term": "Audits",
    "category": "accounts",
    "definition": "Regular reviews of financial reports and procedures.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "clearing-house-netting",
    "term": "Clearing House Netting",
    "category": "accounts",
    "definition": "The process of consolidating and offsetting cross-bank obligations daily.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "direct-deposit",
    "term": "Direct Deposit",
    "category": "accounts",
    "definition": "Automated electronic payroll deposits initiated via the ACH network.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "wire-dispatch-form",
    "term": "Wire Dispatch Form",
    "category": "accounts",
    "definition": "The portal interface used by corporate treasurers to schedule wire transfers.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "card-authorization-log",
    "term": "Card Authorization Log",
    "category": "accounts",
    "definition": "The real-time database log of all debit card swipe permissions.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "ledger-posting",
    "term": "Ledger Posting",
    "category": "accounts",
    "definition": "Updating the master account database with cleared transaction details.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "presented-exception",
    "term": "Presented Exception",
    "category": "accounts",
    "definition": "An incoming item that doesn't match issue registries and requires user decisions.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "ach-block-list",
    "term": "ACH Block List",
    "category": "accounts",
    "definition": "The database of blocked Originator IDs on a corporate checking account.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "pos-terminal-scan",
    "term": "POS Terminal Scan",
    "category": "accounts",
    "definition": "Processing credit or debit cards at point-of-sale terminals.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "estatement-portal",
    "term": "eStatement Portal",
    "category": "accounts",
    "definition": "The secure tab inside online banking containing statement archives.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "w-9-verification",
    "term": "W-9 Verification",
    "category": "accounts",
    "definition": "Bypassing backup tax withholdings by certifying TIN numbers.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "checking-apy",
    "term": "Checking APY",
    "category": "accounts",
    "definition": "The yield returned on checking account balances.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "savings-apy",
    "term": "Savings APY",
    "category": "accounts",
    "definition": "The yield returned on savings account balances.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "cd-yield",
    "term": "CD Yield",
    "category": "accounts",
    "definition": "The return rate of a Certificate of Deposit.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "regulation-e",
    "term": "Regulation E",
    "category": "accounts",
    "definition": "Federal regulation protecting consumers in electronic fund transfers.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "regulation-d",
    "term": "Regulation D",
    "category": "accounts",
    "definition": "Federal regulation historically limiting savings account withdrawals to six per month.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "regulation-cc",
    "term": "Regulation CC",
    "category": "accounts",
    "definition": "Federal regulation governing check clearing timelines and deposit holds.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "truth-in-savings-act",
    "term": "Truth in Savings Act",
    "category": "accounts",
    "definition": "Bylaws requiring transparent disclosure of APYs and account fees.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "equal-housing-lender",
    "term": "Equal Housing Lender",
    "category": "accounts",
    "definition": "Fair lending regulations blocking discrimination in mortgage lending.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "interest-bearing-account",
    "term": "Interest Bearing Account",
    "category": "accounts",
    "definition": "An account paying interest on balances.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "capital-adequacy",
    "term": "Capital Adequacy",
    "category": "accounts",
    "definition": "Regulatory rules requiring banks to hold capital cushions.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "reserve-requirements",
    "term": "Reserve Requirements",
    "category": "accounts",
    "definition": "The value of reserves banks must hold at Federal Reserve banks.",
    "howItWorks": "Deposits are managed in secure electronic vaults by bank core databases.",
    "whatCanGoWrong": "System downtime, fee charges, or overdraft occurrences.",
    "safeguards": "FDIC deposit limits, audits, and strict disclosure protocols protect accounts.",
    "related": [
      "checking-account",
      "savings-account",
      "estatements"
    ],
    "diagram": null
  },
  {
    "id": "shangri-la-island",
    "term": "Shangri-La Island",
    "category": "satirical",
    "definition": "The historic, fictional island location in Lake Michigan home to Big Beaver Bank's corporate headquarters.",
    "howItWorks": "According to founding legends, Shangri-La Island teleports or experiences local gravity fluctuations, shielding corporate ledgers from standard audits.",
    "whatCanGoWrong": "Under normal conditions, accessing the island is restricted by Lake Michigan ice flows, temporal loops, or Omega Mart regulatory clearances.",
    "safeguards": "Deposits are backed by beaver reserves and hydraulic wood sweeps, ensuring protection from dimensional shifts.",
    "related": [
      "wood-sweeps",
      "anomalous-assets"
    ],
    "diagram": null
  },
  {
    "id": "wood-sweeps",
    "term": "wood-sweeps",
    "category": "satirical",
    "definition": "The primary satirical sweep program moving fiat funds into hydraulic beaver dam reserves.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "beaver-dams",
    "term": "Beaver Dams",
    "category": "satirical",
    "definition": "Fictional structural reserves securing Big Beaver Bank assets against financial inflation.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "beaver-reserves",
    "term": "Beaver Reserves",
    "category": "satirical",
    "definition": "The collective pool of wood, logs, and quatloos backing the BBB satirical ecosystem.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "fiduciary-trusts",
    "term": "fiduciary-trusts",
    "category": "satirical",
    "definition": "The satirical trust structures managing relativistic space assets for Weyland-Yutani.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "relativistic-assets",
    "term": "relativistic-assets",
    "category": "satirical",
    "definition": "Off-world capital equipment subject to time dilation interest schedules.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "time-dilation",
    "term": "time-dilation",
    "category": "satirical",
    "definition": "Fictional interest schedule adjustments for space voyage payrolls.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "anomalous-assets",
    "term": "anomalous-assets",
    "category": "satirical",
    "definition": "Inventory items subject to local gravity spikes, managed with Omega Mart compliant controls.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "gravity-fluctuations",
    "term": "gravity-fluctuations",
    "category": "satirical",
    "definition": "Dimensional hazards on Shangri-La Island requiring custom ledger shields.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "dimensional-spikes",
    "term": "dimensional-spikes",
    "category": "satirical",
    "definition": "Spatial anomalies affecting inventory values in retail distribution.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "red-stapler",
    "term": "red-stapler",
    "category": "satirical",
    "definition": "Fictional audit exception bypass covenant inspired by Initech compliance checklists.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "initech-covenants",
    "term": "Initech Covenants",
    "category": "satirical",
    "definition": "Compliance bypass rules allowing corporate analysts to skip Mod 10 checks.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "omega-mart-sweeps",
    "term": "Omega Mart Sweeps",
    "category": "satirical",
    "definition": "Treasury sweeps shifting funds to inter-dimensional retail accounts.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "dharma-stations",
    "term": "Dharma Stations",
    "category": "satirical",
    "definition": "Fictional remote stations utilizing blind trust drops for payroll processing.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "electro-drops",
    "term": "electro-drops",
    "category": "satirical",
    "definition": "Physical cash drops executed on isolated islands using automated parachute systems.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "simlish-mode",
    "term": "Simlish Mode",
    "category": "satirical",
    "definition": "A portal translation mode displaying Simlish terminology.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "klingon-mode",
    "term": "Klingon Mode",
    "category": "satirical",
    "definition": "A portal translation mode displaying Klingon banking terminology.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "binary-mode",
    "term": "Binary Mode",
    "category": "satirical",
    "definition": "A portal translation mode displaying binary banking terminology.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "beaver-enterprises",
    "term": "Beaver Enterprises",
    "category": "satirical",
    "definition": "The master satirical conglomerate parent of Big Beaver Bank.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "hydraulic-sweeps",
    "term": "hydraulic-sweeps",
    "category": "satirical",
    "definition": "Automated sweep routines adjusting timber log reserves on Lake Michigan.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "sparta-annex",
    "term": "Sparta Annex",
    "category": "satirical",
    "definition": "The Sparta, MI mock branches representing the physical branch presence.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "quatloos",
    "term": "Quatloos",
    "category": "satirical",
    "definition": "Fictional alien currency traded in international wire dispatches.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "imperial-credits",
    "term": "Imperial Credits",
    "category": "satirical",
    "definition": "Fictional galactic currency supported by FX calculator booking.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "federation-credits",
    "term": "Federation Credits",
    "category": "satirical",
    "definition": "Fictional space currency supported by FX wire systems.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "mod-10-exceptions",
    "term": "Mod 10 Exceptions",
    "category": "satirical",
    "definition": "Bypass rules allowing members to bypass check digit verification.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "red-stapler-exception",
    "term": "Red Stapler Exception",
    "category": "satirical",
    "definition": "Exemptions granted to select corporate officers to clear manual sweeps.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "shangri-la-teleport",
    "term": "Shangri-La Teleport",
    "category": "satirical",
    "definition": "The automated transfer routing model handling off-world correspondence.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "beaver-security",
    "term": "Beaver Security",
    "category": "satirical",
    "definition": "Fictional guards patrolling the Shangri-La vault reserves.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "beaver-token",
    "term": "Beaver Token",
    "category": "satirical",
    "definition": "A satirical MFA soft-token generator featuring rotating beaver icons.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "satirical-ledger",
    "term": "Satirical Ledger",
    "category": "satirical",
    "definition": "The fictional ledger database supporting mock transactions.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "fictional-fdic",
    "term": "Fictional FDIC",
    "category": "satirical",
    "definition": "The satirical entity notifying users that assets are NOT FDIC-insured.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "beaver-board",
    "term": "Beaver Board",
    "category": "satirical",
    "definition": "The assembly of directors overseeing Shangri-La operations.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "beaver-coin",
    "term": "Beaver Coin",
    "category": "satirical",
    "definition": "The satirical cryptocurrency backing off-world operations.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "timber-reserves",
    "term": "Timber Reserves",
    "category": "satirical",
    "definition": "Corporate reserves consisting entirely of premium hardwood logs.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "lake-michigan-loops",
    "term": "Lake Michigan Loops",
    "category": "satirical",
    "definition": "Temporal anomalies around the head office branch.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "sparta-map",
    "term": "Sparta Map",
    "category": "satirical",
    "definition": "The branch locator showing Sparta, MI branch addresses.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "meme-badges",
    "term": "Meme Badges",
    "category": "satirical",
    "definition": "Portal trust badges asserting compliance with beaver standards.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  },
  {
    "id": "satirical-status",
    "term": "Satirical Status",
    "category": "satirical",
    "definition": "The formal notice indicating the platform is built for satire and humor.",
    "howItWorks": "Executed according to the fictional regulations of Member Beaver Enterprises.",
    "whatCanGoWrong": "Local gravity Dilations, temporal shifts, or red stapler misplacements.",
    "safeguards": "Satirical bylaws and beaver dams safeguard fictional assets.",
    "related": [
      "shangri-la-island",
      "wood-sweeps"
    ],
    "diagram": null
  }
];
