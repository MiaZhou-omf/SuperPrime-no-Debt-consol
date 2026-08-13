const app = document.querySelector('#app');

const state = {
  screen: 'entry',
  history: [],
  phone: '(***) ***–7899',
  offer: 1,
  accountType: 'Checking',
  payment: '',
  paymentSchedule: 'monthly',
  paperless: true,
  routing: '',
  account: '',
  autopayAccount: '7285',
  autopayAccountType: 'Checking',
};

const steps = {
  verify: ['Step 1 of 5 · Verify your info', 20],
  code: ['Step 1 of 5 · Verify your info', 20],
  codeError: ['Step 1 of 5 · Verify your info', 20],
  income: ['Step 1 of 5 · Verify your info', 20],
  offer: ['Step 2 of 5 · Choose your loan terms', 40],
  deposit: ['Step 3 of 5 · Set up direct deposit', 60],
  payment: ['Step 4 of 5 · Set up payment', 80],
  review: ['Step 5 of 5 · Confirm and sign', 95],
  sign: ['Step 5 of 5 · Confirm and sign', 95],
};

let loadingTimer;

function nav(showPartner = false) {
  if (showPartner) return `<header class="nav partner-nav"><div class="nav-inner"><img class="omf-partner" src="./assets/omf-stacked.svg" alt="OneMain Financial"><img class="divider-asset" src="./assets/logo-divider.svg" alt=""><div class="partner-lockup"><span>In association with:</span><img src="./assets/credit-karma.svg" alt="Intuit Credit Karma"></div></div></header>`;
  return `<header class="nav"><div class="nav-inner"><img src="./assets/onemain-logo.svg" alt="OneMain Financial" /></div></header>`;
}

function progress() {
  const [label, value] = steps[state.screen] || [];
  if (!label) return '';
  return `<div class="progress"><div class="progress-copy"><span>${label}</span><span>${value}%</span></div><div class="track" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"><div class="fill" style="width:${value}%"></div></div></div>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="footer-inner">
      <nav class="footer-nav" aria-label="Footer"><a href="#">Legal &amp; Privacy</a><a href="#">Disclosures</a><a href="#">Loan Amounts &amp; Fees</a><a href="#">Do Not Sell or Share My Personal Information</a></nav>
      <div class="footer-info">
        <div class="footer-contact">
          <p>If you are using a screen reader and are having problems using the website please call <a href="tel:8002907002">800-290-7002</a> for assistance.</p>
          <p><strong>OneMain Holdings, Inc.</strong><br>601 N.W. Second Street<br>Evansville, IN 47708-1013</p>
          <p>Copyright © 2026, All rights reserved.</p>
        </div>
        <div class="footer-legal">
          <p>Not all applicants will qualify for larger loan amounts or most favorable loan terms. Larger loan amounts require a first lien on a motor vehicle no more than ten years old, that meets our value requirements, titled in your name with valid insurance. Loan approval and actual loan terms depend on your state of residence and your history, sufficient income after monthly expenses, and availability of collateral). APRs are generally higher on loans not secured by a vehicle. Highly-qualified applicants may be offered higher loan amounts and/or lower APRs than those shown above. Active duty military, their spouse or dependents covered by the Military Lending Act may not pledge any vehicle as collateral.</p>
          <p>Borrowers in these states are subject to these minimum loan sizes: Alabama: $2,100. California: $3,000. Georgia: $3,100. North Dakota: $2,000. Ohio: $2,000. Virginia: $2,600.</p>
          <p>Borrowers in these states are subject to these maximum loan sizes: North Carolina: $11,000 for unsecured loans to all customers; $11,000 for secured loans to present customers. Maine: $7,000. Mississippi: $12,000. West Virginia: $13,500. Loans to purchase a motor vehicle or powersports equipment from select Maine, Mississippi, and North Carolina dealerships are not subject to these maximum loan sizes.</p>
          <p>State Licenses: OneMain Financial Group, LLC (NMLS# 1339418) – CA: Loans made or arranged pursuant to Department of Financial Protection and Innovation California Finance Lenders License. PA: Licensed by the Pennsylvania Department of Banking and Securities. VA: Licensed by the Virginia State Corporation Commission - License Number CFI-156. OneMain Mortgage Services, Inc. (NMLS# 931153) – NY: Registered New York Mortgage Loan Servicer. Additional licensing information available on <a href="#">OneMain Disclosures</a>.</p>
          <p>For residents of the State of Washington only: OneMain Financial Group, LLC – Consumer Loan Company License – NMLS # 1339418. <a href="#">Click here for the NMLS Consumer Access Database.</a></p>
          <p>For Housing Counselors in the State of Washington, please email us at the following link in regards to your customers loan modification status: <a href="mailto:REModifications@onemainfinancial.com">REModifications@onemainfinancial.com</a>. Please ensure your customer has provided us with authorization to work with you.</p>
          <p>If you are using a screen reader and are having problems using the website please call 800-290-7002 for assistance.</p>
        </div>
      </div>
    </div>
  </footer>`;
}

function shell(content, { partner = false, footer: showFooter = true } = {}) {
  return `<div class="stage"><section class="phone">${nav(partner)}${progress()}<main class="screen-main">${content}</main>${showFooter ? footer() : ''}</section></div>`;
}

function entry() {
  return shell(`<div class="content stack">
    <div><h1>Welcome, <span class="pink">{Customer First Name}</span>. Ready to apply for this offer?</h1><p>It should only take a few minutes to wrap up your application.</p></div>
    <article class="card offer-hero shadow">
      <div class="offer-top"><div class="approval-ribbon">You have outstanding odds of approval! <button class="tooltip-trigger approval-info" data-action="open-tooltip" data-tooltip="approval" aria-label="What outstanding odds of approval means" aria-expanded="false">ⓘ</button></div><p class="selected-copy">You selected this offer<br>on <strong>Credit Karma</strong></p><button class="tooltip-trigger loan-type-trigger label-medium" data-action="open-tooltip" data-tooltip="unsecured" aria-expanded="false">UNSECURED LOAN</button><div class="offer-price"><strong>$621.26</strong><span>/ monthly payment</span></div><p class="small">Offer expires 4/18/2026</p><div class="details"><div class="row"><span>Loan amount</span><strong>$20,000</strong></div><div class="row"><span>Term</span><strong>36 months</strong></div><div class="row"><span>APR</span><strong>9.5%</strong></div></div></div>
    </article>
    <div class="entry-links"><p>Read more about our <button class="inline-link" data-action="open-disclosure" data-modal-title="Loan Amounts and Fees">Loan Amounts and Fees.</button></p><button class="inline-link" data-action="open-disclosure" data-modal-title="Learn more about our lending process">Learn more about our lending process</button></div>
    <article class="card stack-sm consent-card"><p><strong>If everything looks good, please read and agree to the terms.</strong></p><div class="consent-control"><label class="check-row"><input id="terms" type="checkbox" aria-describedby="terms-error"><span><strong>By checking this box, I confirm that:</strong></span></label><div class="consent-error" id="terms-error" role="alert" tabindex="-1" hidden><span class="warning-icon" aria-hidden="true"><img class="warning-mark" src="./assets/warning-mark.svg" alt=""><img class="warning-dot" src="./assets/warning-dot.svg" alt=""><img class="warning-circle" src="./assets/warning-circle.svg" alt=""></span><span>Before you continue, please check the box to confirm you've read and agree to the terms.</span></div></div><div class="legal"><p>• I have reviewed, agree to and acknowledge receipt of the <a>Terms of Use</a>, <a>Electronic Consent Agreement</a>, <a>Privacy Notice</a>, <a>Privacy Policy</a>, <a>Informational Communications Authorization</a>, <a>Method Privacy Policy</a> and <a>Method Terms of Service</a>.</p><p>• I authorize OneMain Financial ("OneMain") to share information I provide with service providers for purposes of obtaining and verifying my vehicle registration information, if any, from State DMVs.</p><p>• I also authorize OneMain to obtain my credit report to review my loan application, and to see if I qualify for a credit card product from lending partners of OneMain as well as share my application information with these lending partners.</p><p>• I am not using, or planning to use, a debt relief company to settle debts.</p><p>• I authorize Forward Lending, Inc. d/b/a Method, to be my agent to obtain my credit reports via soft inquiries; share information and related data about my balances with creditors with OneMain; and, if I choose, send my loan proceeds to creditors I select.</p></div><p class="center body-emphasis">Clicking the button below may affect your credit score.</p></article>
    <div><button class="btn primary" data-action="apply">Apply for this offer</button><p class="secure-caption"><img src="./assets/secure-lock.svg" alt="">Your data is securely encrypted</p></div>
  </div>`, { partner: true });
}

function verify() {
  return shell(`<div class="content stack">
    <div><h1>Thanks for applying. Let’s quickly verify your identity.</h1><p>We’ll text a 6-digit security code to the number below.</p></div>
    <div class="phone-card"><div class="label">Mobile number</div><div class="phone-value"><strong>${state.phone}</strong><button class="text-button" data-action="change-phone">Change</button></div></div>
    <div><p class="small center">By clicking this button, you agree to receive an automated one-time text message from OneMain. Message and data rates may apply.</p><div class="actions"><button class="btn primary" data-action="send-code">Text me a code</button></div></div>
  </div>`);
}

function codeScreen(error = false) {
  return shell(`<div class="content stack">
    <div><h1>Enter your security code</h1><p>We sent you a text with a 6-digit code.</p></div>
    <div class="phone-card"><div class="label">Mobile number</div><div class="phone-value"><strong>${state.phone}</strong></div></div>
    <div class="field"><label for="security">Security code</label><input id="security" class="mfa ${error ? 'error' : ''}" inputmode="numeric" maxlength="6" placeholder="------" autocomplete="one-time-code" value="${error ? '123455' : ''}" aria-describedby="security-error" ${error ? 'aria-invalid="true"' : ''}>${inputErrorMarkup('security-error', error ? 'Invalid code. Please try again.' : '', !error)}</div>
    <div class="actions"><button class="btn primary" data-action="verify-code">Continue</button><button class="btn tertiary" data-action="resend">Resend code</button></div>
  </div>`);
}

function income() {
  return shell(`<div class="content income-content">
    <div class="income-headline"><h1>Now let’s verify your<span class="income-mobile-break"><br></span> income</h1><p>Link your loan application to the bank account where your income is deposited.</p></div>
    <div class="plaid-link-card">
      <span class="plaid-link-icon" aria-hidden="true"><img class="plaid-link-left" src="./assets/plaid-link-left.svg" alt=""><img class="plaid-link-right" src="./assets/plaid-link-right.svg" alt=""></span>
      <span>Securely link to your bank with <strong>Plaid</strong></span>
      <button class="plaid-info-button" type="button" data-action="plaid-info" aria-label="Learn more about Plaid"><span class="plaid-info-icon" aria-hidden="true"><img class="plaid-info-mark" src="./assets/info-mark.svg" alt=""><img class="plaid-info-dot" src="./assets/info-dot.svg" alt=""><img class="plaid-info-circle" src="./assets/info-circle.svg" alt=""></span></button>
    </div>
    <article class="income-consent" tabindex="0" aria-labelledby="income-consent-title">
      <h2 id="income-consent-title">Consent for third-party access to<br>personal financial data</h2>
      <p>You authorize OneMain to access your personal financial information ("your data") held by each financial institution you designate in the following screens. OneMain has retained Plaid as its data aggregator to help us transfer your data securely and accurately.</p>
      <p>You are seeking a consumer loan from OneMain. We also provide free financial wellness tools to our loan customers. Our uses of your data will include verifying your identity, contact information, and income; underwriting your loan request; fraud detection and protecting you from identity theft; disbursing loan proceeds; setting up your loan payments; servicing your account and collecting past-due amounts; reassessing your risk profile from time to time; powering financial wellness tools; and other uses expressly allowed by law.</p>
      <p>OneMain and our data aggregator will collect, use, and retain your data obtained from the financial institution only for the purpose of providing these products and services to you. OneMain and our data aggregator maintain policies and procedures to comply with applicable law.</p>
      <p>OneMain will receive the following categories of personal financial information from your financial institution (if available):</p>
      <ul><li>Your name, contact information, and other personal information</li><li>Account numbers</li><li>Account balances</li><li>Account status</li><li>Payment instructions</li><li>Up to 2 years of transaction history including financial details, payment methods, and, in some cases, precise geolocation of the transaction</li></ul>
      <p>You may revoke your authorization for ongoing access to your data at any time by revoking directly through your bank's security portal, revoking access through my.plaid.com, or by calling OneMain's Customer CARE team at 888-890-6529.</p>
    </article>
    <div class="income-actions-panel">
      <p class="income-note">Note: If your bank account deposit history includes alimony, child support or separate maintenance income and you don’t want them considered as a basis for repaying this loan, please <a href="tel:8888906529">call us</a>.</p>
      <label class="income-consent-check"><input id="plaid-consent" type="checkbox"><span>I have read and agreed to the Consent for <span class="body-emphasis">Third-Party Access to Personal Financial Data</span>.</span></label>
      <div class="income-buttons"><button class="btn primary" data-action="connect-bank" disabled><img src="./assets/connect-lock.svg" alt="">Connect my bank account</button><button class="btn tertiary income-secondary" type="button" data-action="why-income">Why do I need to verify my income?</button></div>
    </div>
  </div>`);
}

function dashboard() {
  return `<div class="dashboard-page">
    <header class="dashboard-nav"><img src="./assets/dashboard-logo.svg" alt="OneMain Financial"><button type="button" data-action="dashboard-logout">LOG OUT</button></header>
    <main class="dashboard-main">
      <h1>Your Loan Dashboard</h1>
      <section class="dashboard-card">
        <h2>Income verification is required to move forward</h2>
        <p>To continue your application, link the bank account that shows your income.</p>
        <p>If you’re unable to connect your bank account, please call {XXX-XXX-XXXX}.</p>
        <button class="dashboard-verify" type="button" data-action="dashboard-verify">Verify now</button>
        <div class="dashboard-secure"><img src="./assets/dashboard-lock.svg" alt=""><span>Secure account connection through Plaid</span></div>
      </section>
      <p class="dashboard-question"><strong>Questions?</strong> <a href="tel:8888906529">Give us a call.</a></p>
    </main>
  </div>`;
}

function loadingGraphic() {
  return `<div class="figma-loader" role="status" aria-label="Loading"><img class="figma-loader-blue" src="./assets/loading-blue.svg" alt=""><img class="figma-loader-teal" src="./assets/loading-teal.svg" alt=""><img class="figma-loader-purple" src="./assets/loading-purple.svg" alt=""></div>`;
}

function loading() {
  clearTimeout(loadingTimer);
  loadingTimer = setTimeout(() => { if (state.screen === 'loading') go('loadingOffer', false); }, 2200);
  return shell(`<div class="loading-screen"><div class="loading-headline"><h1>Hold tight</h1><p>We're syncing your info with your application. This usually takes about 60 seconds.</p></div>${loadingGraphic()}</div>`, { footer: true });
}

function loadingOffer() {
  clearTimeout(loadingTimer);
  loadingTimer = setTimeout(() => { if (state.screen === 'loadingOffer') go('offer', false); }, 2600);
  return shell(`<div class="loading-screen loading-offer"><div class="loading-headline"><h1>Getting everything ready for you</h1><p>We’re updating your application and gathering your loan options.</p></div>${loadingGraphic()}<p class="loading-note">Please don’t refresh this screen.</p></div>`, { footer: true });
}

const offers = [
  { tag: 'Highest loan amount', icon: 'highest', amount: '$20,000', monthly: '$631.33', apr: '10.24%', term: '48 months' },
  { tag: 'Lowest payment', icon: 'lowest', amount: '$20,000', monthly: '$621.26', apr: '13.82%', term: '60 months' },
];

function offer() {
  return shell(`<div class="content stack">
    <div><h1>You’re approved! Choose the loan that works for you.</h1><p>You qualify for multiple loan options, <span class="pink">{Customer First Name}</span>.<sup>1</sup> Select the best fit for your needs.</p></div>
    <div class="choice-list">${offers.map((o, i) => `<label class="choice ${state.offer === i ? 'selected' : ''}"><div class="choice-head"><span class="tag"><span class="offer-tag-icon offer-tag-icon-${o.icon}" aria-hidden="true"></span>${o.tag}</span><input type="radio" name="offer" value="${i}" ${state.offer === i ? 'checked' : ''}></div><div class="amount">${o.monthly} <small>/ monthly payment</small></div><div class="details"><div class="row"><span>Loan amount</span><strong>${o.amount}</strong></div><div class="row"><span>Term</span><strong>${o.term}</strong></div><div class="row"><span>APR</span><strong>${o.apr}</strong></div></div></label>`).join('')}</div>
    <button class="btn primary" data-action="choose-offer">Save and continue</button><p class="ds-footer-note"><sup>1</sup>These quotes are <a class="link">unsecured loans</a> closest to your requested amount. Offers may refresh at 12 am ET. To compare all your options and learn more details about <button class="footer-inline-link" type="button" data-action="open-disclosure" data-modal-title="Loan Amounts and Fees">our loan amounts and fees</button>, including loans secured with your vehicle, please <a class="link" href="tel:8888906529">give us a call.</a></p>
  </div>`);
}

function deposit() {
  return shell(`<div class="content stack">
    <div><h1>Tell us where to send the money</h1><p>We’ll deposit the funds directly into your bank account. Enter your bank account details.</p></div>
    <div class="stack-sm"><div class="field"><label for="routing">Routing number</label><input id="routing" inputmode="numeric" maxlength="9" value="${state.routing}" aria-describedby="routing-error">${inputErrorMarkup('routing-error')}</div><div class="field"><label for="account">Account number</label><input id="account" inputmode="numeric" value="${state.account}" aria-describedby="account-error">${inputErrorMarkup('account-error')}</div><div class="field"><label for="confirm-account">Confirm account number</label><input id="confirm-account" inputmode="numeric" aria-describedby="confirm-account-error">${inputErrorMarkup('confirm-account-error')}</div></div>
    <div><div class="field-label">Type of account</div><div style="display:flex;gap:20px;margin-top:16px"><label class="radio-row"><input type="radio" name="account-type" value="Checking" ${state.accountType === 'Checking' ? 'checked' : ''}><span>Checking</span></label><label class="radio-row"><input type="radio" name="account-type" value="Savings" ${state.accountType === 'Savings' ? 'checked' : ''}><span>Savings</span></label></div></div>
    <div class="account-visual"><h3 class="center">Where to find your routing and account numbers</h3><div class="check-guide"><img class="check-example" src="./assets/check-example.png" alt="Example check"><div class="check-pointers" aria-hidden="true"><div class="check-pointer"><span class="check-pointer-line"></span><span class="check-pointer-tick"></span><span>Routing number</span></div><div class="check-pointer"><span class="check-pointer-line"></span><span class="check-pointer-tick"></span><span>Account number</span></div></div></div></div>
    <button class="btn primary" data-action="save-deposit">Save and continue</button>
  </div>`);
}

function payment() {
  return shell(`<div class="content stack">
    <div><h1>Choose your payment and billing preferences</h1><p>Save time each month with AutoPay. Your payments will be made automatically on a schedule you select.</p></div>
    <div class="payment-options"><div class="payment-autopay"><label class="flat-option payment-choice"><input type="radio" name="payment" value="autopay" ${state.payment === 'autopay' ? 'checked' : ''}><span><span class="payment-choice-title">Set up AutoPay <span class="tag">☆ Recommended</span></span>${state.payment === 'autopay' ? `<span class="small payment-bank">${state.autopayAccountType} Acct#: XXXX${state.autopayAccount}</span><button class="inline-link small" type="button" data-action="change-autopay-account">Change bank account</button>` : ''}</span></label>${state.payment === 'autopay' ? autopaySchedules() : ''}</div><label class="flat-option payment-choice"><input type="radio" name="payment" value="manual" ${state.payment === 'manual' ? 'checked' : ''}><span>I’ll make payments one at a time<span class="small payment-description">Due on the <span class="pink">{PaymentDueDay}</span> of every month. You can pay online, by phone or by mail. For more information, see <a class="link">our payments FAQ.</a></span></span></label></div>
    <article class="billing-status"><h2>Paperless billing is ${state.paperless ? 'on' : 'off'}</h2><p class="small">${state.paperless ? 'We’ll email you at <span class="pink">{emailaddress@gmail.com}</span> each month when your billing statement becomes available online. You can change the email address later if needed.' : 'We’ll mail you paper billing statements each month.'}</p><button class="text-button billing-toggle" data-action="${state.paperless ? 'paper-modal' : 'enable-paperless'}">${state.paperless ? 'Mail me paper statements instead' : 'Go paperless instead'}</button></article>
    <button class="btn primary" data-action="save-payment" ${state.payment ? '' : 'disabled'}>Save and continue</button>
  </div>`);
}

function autopaySchedules() {
  const schedules = [
    ['monthly', '$621.26', 'Monthly', 'Your payment will be made on the {10th} each month.'],
    ['biweekly', '$310.63', 'Every other week', 'Your payment will be made every 14 days.'],
    ['twice-monthly', '$310.63', 'Twice a month', 'Your payment will be made on the {10th} and {24th} each month.'],
  ];
  return `<fieldset class="schedule-options"><legend>Select your payment schedule:</legend>${schedules.map(([value, amount, frequency, description]) => `<label class="schedule-card ${state.paymentSchedule === value ? 'selected' : ''}"><input type="radio" name="payment-schedule" value="${value}" ${state.paymentSchedule === value ? 'checked' : ''}><span class="schedule-copy"><strong>${amount}</strong><b>${frequency}</b><span class="schedule-detail">${scheduleCalendar(value)}<span>${description}</span></span></span></label>`).join('')}</fieldset>`;
}

function scheduleCalendar(type) {
  const dotPositions = [
    [7.31, 16.1], [14.18, 16.1], [21.06, 16.1], [27.94, 16.1], [34.81, 16.1],
    [7.31, 22.08], [14.18, 22.08], [21.06, 22.08], [27.94, 22.08], [34.81, 22.08],
    [7.31, 28.05], [14.18, 28.05], [21.06, 28.05], [27.94, 28.05], [34.81, 28.05],
    [7.31, 34.03], [14.18, 34.03], [21.06, 34.03], [27.94, 34.03], [34.81, 34.03],
  ];
  const highlights = {
    monthly: [[33.18, 14.08]],
    biweekly: [[32.87, 14], [32.69, 28]],
    'twice-monthly': [[33.18, 14.08], [27, 27]],
  }[type];
  return `<span class="schedule-calendar schedule-calendar-${type}" aria-hidden="true"><img class="schedule-calendar-frame" src="./assets/schedule-calendar.svg" alt="">${dotPositions.map(([left, top]) => `<img class="schedule-calendar-dot" src="./assets/schedule-calendar-dot.svg" alt="" style="left:${left}px;top:${top}px">`).join('')}${highlights.map(([left, top]) => `<img class="schedule-calendar-highlight" src="./assets/schedule-calendar-highlight.svg" alt="" style="left:${left}px;top:${top}px">`).join('')}</span>`;
}

function review() {
  const depositLastFour = state.account.slice(-4) || '7285';
  return shell(`<div class="content review-content">
    <div class="review-headline"><h1>Confirm your loan details before you e-sign</h1><p>Almost done! Please review and confirm your selections.</p><p>The below information is accurate as of today, <span class="pink">{Current Date}</span>.</p></div>
    <div class="review-party-card"><div><h3>Lender</h3><p>OneMain Financial<br><span class="pink">{2115 Linwood Ave.<br>Fort Lee, NJ 07024}</span></p></div><div><h3>Borrower</h3><p class="pink">{First Name}<br>{Last Name}</p></div></div>
    <div class="review-offer-card"><div class="review-offer-rows"><div class="row"><span>Loan amount</span><strong>$23,000.00<small>This is an unsecured loan.</small></strong></div><div class="row"><span>Fees</span><strong>$500.00<small>The total cost of loan is $23,500.00.</small></strong></div><div class="row"><span>Term</span><strong>36 months</strong></div><div class="row"><span>APR</span><strong>10.24%</strong></div></div><div class="review-payment-due"><span>Due each month</span><strong>$644.98/mo</strong></div></div>
    <section class="review-card"><h2>Direct deposit</h2><p>${state.accountType} account</p><strong>Bank of America ...${depositLastFour}</strong><button class="review-link" type="button" data-action="change-deposit-account">Change account</button></section>
    <section class="review-card review-autopay"><h2>${state.payment === 'autopay' ? 'AutoPay is on' : 'AutoPay is off'}</h2>${state.payment === 'autopay' ? `<p>Automatic payments of $<span class="pink">{RecurringPaymentAmount}</span> will be made <span class="pink">{PaymentFrequency}</span> from your bank account.</p><strong>Bank of America ...${state.autopayAccount}</strong>` : '<p>You’ll make payments one at a time.</p>'}<button class="review-link" type="button" data-action="edit-payment">Edit AutoPay settings</button>${state.payment === 'autopay' ? '<div class="divider"></div><p>Your first payment of $<span class="pink">{RecurringPaymentAmount}</span> will be made on <span class="pink">{FirstPaymentDate}</span>.</p><p class="review-note">Note: Your first payment amount may be higher than your monthly payment amount because of a longer first payment period.</p>' : ''}</section>
    <section class="review-card"><h2>Paperless billing is ${state.paperless ? 'on' : 'off'}</h2><p>${state.paperless ? 'You’re getting paperless statements.' : 'You’re getting paper statements by mail.'}</p><button class="review-link" type="button" data-action="edit-billing">Edit billing preferences</button></section>
    <div class="review-actions"><button class="btn primary" data-action="continue-sign"><img src="./assets/edit-icon.svg" alt="">Continue to e-sign</button></div>
  </div>`);
}

function sign() {
  return shell(`<div class="content docusign-placeholder"><div><h1>DocuSign</h1><p>[DocuSign e-sign experience placeholder]</p></div><div class="docusign-placeholder-card"><p>This prototype does not recreate the DocuSign signing experience.</p><button class="btn primary" data-action="complete-docusign">Continue after signing</button></div></div>`);
}

function complete() {
  const confetti = Array.from({ length: 84 }, (_, index) => {
    const isRightLane = index % 2 === 1;
    const row = Math.floor(index / 2);
    const laneOffset = (row * 11 + index * 3) % 27;
    const mobileLaneOffset = (row * 5 + index * 2) % 12;
    const x = isRightLane ? 72 + laneOffset : 1 + laneOffset;
    const mobileX = isRightLane ? 87 + mobileLaneOffset : 1 + mobileLaneOffset;
    const direction = isRightLane ? -1 : 1;
    const driftA = direction * (8 + (index % 5) * 3);
    const driftB = direction * -(6 + (index % 4) * 3);
    const startY = -(42 + (row * 47) % 460);
    const fall = 850 + (index % 7) * 32;
    const delay = (index % 14) * .045;
    const duration = 4.1 + (index % 8) * .21;
    const width = index % 3 === 0 ? 27 : 22 + (index % 4);
    const spin = direction * (390 + (index % 6) * 88);
    const startRotation = -170 + (index * 73) % 340;
    const scale = .72 + (index % 5) * .09;
    return `<span class="confetti-piece" style="--x:${x}%;--mobile-x:${mobileX}%;--start-y:${startY}px;--drift-a:${driftA}px;--drift-b:${driftB}px;--fall-a:${Math.round(fall * .2)}px;--fall-b:${Math.round(fall * .42)}px;--fall-c:${Math.round(fall * .67)}px;--fall-d:${Math.round(fall * .84)}px;--fall:${fall}px;--delay:${delay}s;--duration:${duration}s;--piece-width:${width}px;--start-rotation:${startRotation}deg;--spin-a:${Math.round(startRotation + spin * .22)}deg;--spin-b:${Math.round(startRotation + spin * .48)}deg;--spin-c:${Math.round(startRotation + spin * .72)}deg;--spin-d:${Math.round(startRotation + spin * .88)}deg;--spin:${Math.round(startRotation + spin)}deg;--scale:${scale}"><img src="./assets/confetti-${index % 8 + 1}.svg" alt=""></span>`;
  }).join('');

  return shell(`<div class="completion-confetti" aria-hidden="true">${confetti}</div><div class="content complete-content">
    <h1>Congrats, <span class="pink">{FirstName}</span>! Let’s set up your online account.</h1>
    <section class="complete-account-section"><h2>You need your account number for this</h2><div class="account-number"><span>Copy your loan account number</span><strong>123456778999</strong><button class="copy-button" data-action="copy-account" aria-label="Copy loan account number"><img src="./assets/copy.svg" alt=""></button><b>You can’t set up your online account without it</b></div></section>
    <p>Set up your account to manage your loan, view your loan documents and get your personalized money snapshot free with OneMain® MyMoney.</p>
    <button class="btn primary" data-action="account-setup-placeholder">Set up my account</button>
    <p class="complete-login">Already created an account? <button class="inline-link" type="button" data-action="login-placeholder">Log in now.</button></p>
    <section class="money-way"><h2>Your money’s on the way</h2><p>You should see the funds in your bank account within 1–2 business days.</p><p>Here are your final loan details.</p></section>
    <div class="review-offer-card complete-offer-card"><div class="review-offer-rows"><div class="row"><span>Loan amount</span><strong>$23,000.00<small>This is an unsecured loan.</small></strong></div><div class="row"><span>Fees</span><strong>$500.00<small>The total cost of loan is $23,500.00.</small></strong></div><div class="row"><span>Term</span><strong>36 months</strong></div><div class="row"><span>APR</span><strong>10.24%</strong></div></div><div class="review-payment-due"><span>Due each month</span><strong>$644.98/mo</strong></div></div>
    <div class="complete-notes"><p>Your first payment of $<span class="pink">{FirstPaymentAmount}</span> is due on <span class="pink">{FirstPaymentDate}</span>.</p><p>If you have any questions, give us a call at <span class="pink">{XXX–XXX–XXXX}</span>.</p></div>
  </div>`);
}

const views = { entry, verify, code: () => codeScreen(false), codeError: () => codeScreen(true), income, dashboard, loading, loadingOffer, offer, deposit, payment, review, sign, complete };

function render() {
  app.innerHTML = (views[state.screen] || entry)();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function go(screen, remember = true) {
  clearTimeout(loadingTimer);
  if (remember && state.screen !== screen) state.history.push(state.screen);
  state.screen = screen;
  render();
}

function toast(message) {
  const node = document.createElement('div');
  node.className = 'toast'; node.textContent = message; document.body.appendChild(node);
  setTimeout(() => node.remove(), 2200);
}

function showSuccessAlert(message, focusTarget = null) {
  document.querySelector('.success-alert')?.remove();
  const content = document.querySelector('.content');
  if (!content) return;
  const node = document.createElement('div');
  node.className = 'success-alert';
  node.setAttribute('role', 'status');
  node.setAttribute('aria-live', 'polite');
  node.innerHTML = `<span class="success-alert-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><circle cx="12" cy="12" r="8"></circle><path d="m8.5 12 2.2 2.25 4.8-5"></path></svg></span><span class="success-alert-copy">${message}</span><button class="success-alert-close" type="button" aria-label="Dismiss success message"><span aria-hidden="true">×</span></button>`;
  content.prepend(node);
  node.querySelector('.success-alert-close').addEventListener('click', () => { node.remove(); focusTarget?.focus(); });
  window.setTimeout(() => node.remove(), 6000);
  focusTarget?.focus();
}

function showPhoneSuccessAlert() {
  showSuccessAlert(`Mobile number changed to ${state.phone.replace('–', ' — ')}`);
}

function phoneModal() {
  const node = document.createElement('div');
  node.className = 'modal-backdrop phone-modal-backdrop';
  node.innerHTML = `<section class="modal phone-modal cx-modal cx-modal-compact" role="dialog" aria-modal="true" aria-labelledby="phone-modal-title" tabindex="-1">
    <div class="phone-modal-handle cx-modal-handle" aria-hidden="true"><img src="./assets/cx-modal-handle.svg" alt=""></div>
    <button class="cx-modal-close" id="phone-close" type="button" aria-label="Close change mobile number modal"><img src="./assets/cx-modal-close.svg" alt=""></button>
    <div class="phone-modal-icon" aria-hidden="true"><img src="./assets/phone-modal-icon.svg" alt=""></div>
    <div class="phone-modal-copy"><h2 id="phone-modal-title">Change mobile number</h2><p>Enter the mobile number you want to use to verify your identity.</p></div>
    <div class="field phone-modal-field"><label for="new-phone">Phone number</label><input id="new-phone" inputmode="tel" autocomplete="tel" placeholder="(555) 555-5555" aria-describedby="new-phone-error">${inputErrorMarkup('new-phone-error')}</div>
    <div class="phone-modal-actions"><button class="btn primary" id="save-phone">Change number</button><button class="btn tertiary" id="cancel-phone">Go back</button></div>
  </section>`;
  document.body.appendChild(node);
  document.body.classList.add('modal-open');
  const opener = document.activeElement;
  const close = () => { document.body.classList.remove('modal-open'); node.remove(); opener?.focus(); };
  node.querySelector('#phone-close').onclick = close;
  node.querySelector('#cancel-phone').onclick = close;
  node.addEventListener('click', event => { if (event.target === node) close(); });
  node.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  node.querySelector('#save-phone').onclick = () => {
    const input = node.querySelector('#new-phone');
    const digits = input.value.replace(/\D/g, '');
    if (digits.length !== 10) {
      setFieldError(input, digits.length < 10 ? 'Enter a valid 10-digit mobile phone number.' : 'Enter a valid mobile phone number.');
      return;
    }
    state.phone = `(***) ***–${digits.slice(-4)}`;
    document.body.classList.remove('modal-open'); node.remove(); render(); showPhoneSuccessAlert();
  };
  node.querySelector('#new-phone').focus();
}

function plaidInfoModal(opener) {
  const node = document.createElement('div');
  node.className = 'plaid-modal-backdrop';
  node.innerHTML = `<section class="plaid-modal cx-modal cx-modal-full" role="dialog" aria-modal="true" aria-labelledby="plaid-modal-title" tabindex="-1">
    <button class="plaid-modal-handle cx-modal-handle" type="button" aria-label="Close Plaid information"><img src="./assets/cx-modal-handle.svg" alt=""></button>
    <button class="cx-modal-close" type="button" aria-label="Close Plaid information"><img src="./assets/cx-modal-close.svg" alt=""></button>
    <div class="plaid-modal-content">
      <h2 id="plaid-modal-title">Income verification is<br>required to apply</h2>
      <p>We use Plaid to link your application to your bank account. Choose the account that shows your monthly income, including wages, pension, benefits and other sources of regular income.</p>
      <ul>
        <li>Select your bank and log in to your bank account. <strong>OneMain won’t store your username or password.</strong></li>
        <li>Choose which account(s) are added. You can <strong>unlink your account at any time.</strong></li>
        <li>Plaid uses <strong>secure encryption</strong> to protect your personal information.</li>
      </ul>
      <p>We may reach out if we’re not able to verify your income through your bank account.</p>
    </div>
  </section>`;
  document.body.appendChild(node);
  document.body.classList.add('modal-open');
  const close = () => { document.body.classList.remove('modal-open'); node.remove(); opener?.focus(); };
  node.querySelectorAll('[aria-label="Close Plaid information"]').forEach(button => button.addEventListener('click', close));
  node.addEventListener('click', event => { if (event.target === node) close(); });
  node.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  node.querySelector('.plaid-modal').focus();
}

function whyIncomeModal(opener) {
  const node = document.createElement('div');
  node.className = 'income-exit-backdrop';
  node.innerHTML = `<section class="income-exit-modal cx-modal cx-modal-compact" role="dialog" aria-modal="true" aria-labelledby="income-exit-title" tabindex="-1">
    <button class="income-exit-handle cx-modal-handle" type="button" data-exit-action="verify" aria-label="Return to income verification"><img src="./assets/cx-modal-handle.svg" alt=""></button>
    <button class="cx-modal-close" type="button" data-exit-action="verify" aria-label="Return to income verification"><img src="./assets/cx-modal-close.svg" alt=""></button>
    <div class="income-exit-content">
      <div class="income-bell" aria-hidden="true"><span><img class="income-bell-main" src="./assets/income-bell-main.svg" alt=""><img class="income-bell-dot" src="./assets/income-bell-dot.svg" alt=""></span></div>
      <div><h2 id="income-exit-title">Income verification is<br>required to apply</h2><p>If you don’t complete the secure verification process, you’ll have to call OneMain to move forward.</p></div>
      <div class="income-exit-buttons"><button class="btn primary" type="button" data-exit-action="verify">Verify now</button><button class="btn tertiary" type="button" data-exit-action="exit">Exit loan application</button></div>
    </div>
  </section>`;
  document.body.appendChild(node);
  document.body.classList.add('modal-open');
  const close = () => { document.body.classList.remove('modal-open'); node.remove(); opener?.focus(); };
  const exit = () => { document.body.classList.remove('modal-open'); node.remove(); state.history = []; state.screen = 'dashboard'; render(); };
  node.addEventListener('click', event => {
    const action = event.target.closest('[data-exit-action]')?.dataset.exitAction;
    if (action === 'verify') close();
    if (action === 'exit') exit();
    if (event.target === node) close();
  });
  node.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  node.querySelector('.income-exit-modal').focus();
}

function preferenceModal(type, opener) {
  const isAutopay = type === 'autopay';
  const node = document.createElement('div');
  node.className = 'preference-modal-backdrop';
  node.innerHTML = `<section class="preference-modal cx-modal cx-modal-compact" role="dialog" aria-modal="true" aria-labelledby="preference-modal-title" tabindex="-1">
    <div class="preference-modal-handle cx-modal-handle" aria-hidden="true"><img src="./assets/cx-modal-handle.svg" alt=""></div>
    <button class="cx-modal-close" type="button" data-preference-action="close" aria-label="Close dialog"><img src="./assets/cx-modal-close.svg" alt=""></button>
    <div class="preference-modal-content">
      <div class="preference-bell" aria-hidden="true"><span><img class="income-bell-main" src="./assets/income-bell-main.svg" alt=""><img class="income-bell-dot" src="./assets/income-bell-dot.svg" alt=""></span></div>
      <div class="preference-modal-copy"><h2 id="preference-modal-title">${isAutopay ? 'AutoPay is the easiest way to pay' : 'Paperless billing is faster and clutter-free'}</h2><p>${isAutopay ? 'AutoPay lets you set it and forget it, knowing your payments are being made on time.' : 'With paperless billing, you get instant access to your statements online.'}</p></div>
      <div class="preference-modal-actions"><button class="btn primary" type="button" data-preference-action="primary">${isAutopay ? 'Set up AutoPay' : 'Keep paperless statements'}</button><button class="btn tertiary" type="button" data-preference-action="secondary">${isAutopay ? 'Continue without AutoPay' : 'Get statements by mail'}</button></div>
    </div>
  </section>`;
  document.body.appendChild(node);
  document.body.classList.add('modal-open');
  const close = () => { document.body.classList.remove('modal-open'); node.remove(); opener?.focus(); };
  node.addEventListener('click', event => {
    const action = event.target.closest('[data-preference-action]')?.dataset.preferenceAction;
    if (action === 'close' || event.target === node) { close(); if (isAutopay) render(); }
    if (action === 'primary') {
      if (isAutopay) state.payment = 'autopay';
      close(); render();
    }
    if (action === 'secondary') {
      if (isAutopay) state.payment = 'manual';
      else state.paperless = false;
      close(); render();
    }
  });
  node.addEventListener('keydown', event => { if (event.key === 'Escape') { close(); if (isAutopay) render(); } });
  node.querySelector('.preference-modal').focus();
}

function changeAutopayAccountModal(opener, target = 'autopay') {
  const node = document.createElement('div');
  node.className = 'bank-modal-backdrop';
  node.innerHTML = `<section class="bank-modal cx-modal cx-modal-full" role="dialog" aria-modal="true" aria-label="Change bank account" tabindex="-1">
    <div class="bank-modal-handle cx-modal-handle" aria-hidden="true"><img src="./assets/cx-modal-handle.svg" alt=""></div>
    <button class="cx-modal-close" type="button" data-bank-action="cancel" aria-label="Close change bank account modal"><img src="./assets/cx-modal-close.svg" alt=""></button>
    <div class="bank-modal-content">
      <div class="bank-modal-fields">
        <div class="field"><label for="autopay-routing">Routing number</label><input id="autopay-routing" inputmode="numeric" maxlength="9" aria-describedby="autopay-routing-error">${inputErrorMarkup('autopay-routing-error')}</div>
        <div class="field"><label for="autopay-account">Account number</label><input id="autopay-account" inputmode="numeric" aria-describedby="autopay-account-error">${inputErrorMarkup('autopay-account-error')}</div>
        <div class="field"><label for="autopay-confirm">Confirm account number</label><input id="autopay-confirm" inputmode="numeric" aria-describedby="autopay-confirm-error">${inputErrorMarkup('autopay-confirm-error')}</div>
      </div>
      <fieldset class="bank-account-type"><legend>Type of account</legend><div><label class="radio-row"><input type="radio" name="autopay-account-type" value="Checking" checked><span>Checking</span></label><label class="radio-row"><input type="radio" name="autopay-account-type" value="Savings"><span>Savings</span></label></div></fieldset>
      <div class="account-visual bank-account-visual"><h3 class="center">Where to find your routing and account numbers</h3><div class="check-guide"><img class="check-example" src="./assets/check-example.png" alt="Example check"><div class="check-pointers" aria-hidden="true"><div class="check-pointer"><span class="check-pointer-line"></span><span class="check-pointer-tick"></span><span>Routing number</span></div><div class="check-pointer"><span class="check-pointer-line"></span><span class="check-pointer-tick"></span><span>Account number</span></div></div></div></div>
      <div class="bank-modal-actions"><button class="btn primary" type="button" data-bank-action="save">Save bank details</button><button class="btn tertiary" type="button" data-bank-action="cancel">Cancel</button></div>
    </div>
  </section>`;
  document.body.appendChild(node);
  document.body.classList.add('modal-open');
  const close = () => { document.body.classList.remove('modal-open'); node.remove(); opener?.focus(); };
  node.addEventListener('input', event => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (input.id === 'autopay-routing') {
      const value = input.value.replace(/\D/g, '');
      if (value.length !== 9) setFieldError(input, 'Please enter at least 9 digits.', false);
      else clearFieldError(input);
    }
    if (input.id === 'autopay-confirm') {
      const account = node.querySelector('#autopay-account').value.replace(/\D/g, '');
      const confirmation = input.value.replace(/\D/g, '');
      if (!confirmation || confirmation !== account) setFieldError(input, 'This number doesn’t match the one above. Please check the number and try again.', false);
      else clearFieldError(input);
    }
    if (input.id === 'autopay-account') {
      clearFieldError(input);
      const confirmation = node.querySelector('#autopay-confirm');
      if (confirmation.value) confirmation.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  node.addEventListener('click', event => {
    const action = event.target.closest('[data-bank-action]')?.dataset.bankAction;
    if (action === 'cancel' || event.target === node) close();
    if (action !== 'save') return;
    const routing = node.querySelector('#autopay-routing');
    const account = node.querySelector('#autopay-account');
    const confirmation = node.querySelector('#autopay-confirm');
    const r = routing.value.replace(/\D/g, '');
    const a = account.value.replace(/\D/g, '');
    const c = confirmation.value.replace(/\D/g, '');
    const invalid = [];
    if (r.length !== 9) { setFieldError(routing, 'Please enter at least 9 digits.', false); invalid.push(routing); }
    if (a.length < 4) { setFieldError(account, 'We couldn’t verify this account number. Please check the number and try again.', false); invalid.push(account); }
    if (!c || a !== c) { setFieldError(confirmation, 'This number doesn’t match the one above. Please check the number and try again.', false); invalid.push(confirmation); }
    if (invalid.length) { invalid[0].focus(); return; }
    const accountType = node.querySelector('[name="autopay-account-type"]:checked').value;
    if (target === 'deposit') {
      state.routing = r;
      state.account = a;
      state.accountType = accountType;
    } else {
      state.autopayAccount = a.slice(-4);
      state.autopayAccountType = accountType;
    }
    close(); render();
  });
  node.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  node.querySelector('#autopay-routing').focus();
}

function inputErrorMarkup(id, message = '', hidden = true) {
  return `<div class="input-error-message" id="${id}" role="alert" ${hidden ? 'hidden' : ''}><span class="warning-icon" aria-hidden="true"><img class="warning-mark" src="./assets/warning-mark.svg" alt=""><img class="warning-dot" src="./assets/warning-dot.svg" alt=""><img class="warning-circle" src="./assets/warning-circle.svg" alt=""></span><span class="input-error-copy">${message}</span></div>`;
}

function setFieldError(input, message, focus = true) {
  const error = document.querySelector(`#${input.getAttribute('aria-describedby')}`);
  input.classList.add('error');
  input.setAttribute('aria-invalid', 'true');
  if (error) {
    error.querySelector('.input-error-copy').textContent = message;
    error.hidden = false;
  }
  if (focus) input.focus();
}

function clearFieldError(input) {
  if (!input?.classList.contains('error')) return;
  const error = document.querySelector(`#${input.getAttribute('aria-describedby')}`);
  input.classList.remove('error');
  input.removeAttribute('aria-invalid');
  if (error) error.hidden = true;
}

function validateDepositInput(input) {
  if (input.id === 'routing') {
    const routing = input.value.replace(/\D/g, '');
    if (routing.length !== 9) setFieldError(input, 'Please enter at least 9 digits.', false);
    else clearFieldError(input);
    return;
  }

  if (input.id === 'confirm-account') {
    const account = document.querySelector('#account')?.value.replace(/\D/g, '') || '';
    const confirmation = input.value.replace(/\D/g, '');
    if (!confirmation || confirmation !== account) setFieldError(input, 'This number doesn’t match the one above. Please check the number and try again.', false);
    else clearFieldError(input);
  }
}

function disclosureModal(title, opener) {
  const node = document.createElement('div');
  node.className = 'disclosure-backdrop';
  node.setAttribute('role', 'presentation');
  node.innerHTML = `<section class="disclosure-modal cx-modal cx-modal-full" role="dialog" aria-modal="true" aria-labelledby="disclosure-title" tabindex="-1">
    <div class="modal-handle cx-modal-handle"><img src="./assets/cx-modal-handle.svg" alt=""></div>
    <button class="cx-modal-close" type="button" data-action="close-disclosure" aria-label="Close disclosure"><img src="./assets/cx-modal-close.svg" alt=""></button>
    <div class="disclosure-scroll">
      <div class="document-icon" aria-hidden="true"><div class="document-glyph"><img class="icon-line icon-line-one" src="./assets/modal-icon-line.svg" alt=""><img class="icon-line icon-line-two" src="./assets/modal-icon-line.svg" alt=""><img class="icon-page" src="./assets/modal-icon-page.svg" alt=""><img class="icon-fold" src="./assets/modal-icon-fold.svg" alt=""></div></div>
      <div class="disclosure-copy"><h2 id="disclosure-title">${title === 'Learn more about our lending process' ? 'Our lending process' : 'Loan Amounts and Fees'}</h2>
        ${title === 'Learn more about our lending process' ? lendingProcessCopy() : loanFeesCopy()}
      </div>
      <div class="disclosure-actions"><button class="modal-close" data-action="close-disclosure">Close</button></div>
    </div>
  </section>`;
  document.body.appendChild(node);
  document.body.classList.add('modal-open');
  const close = () => { document.body.classList.remove('modal-open'); node.remove(); opener?.focus(); };
  node.querySelectorAll('[data-action="close-disclosure"]').forEach(button => button.addEventListener('click', close));
  node.addEventListener('click', e => { if (e.target === node) close(); });
  node.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  node.querySelector('.disclosure-modal').focus();
}

const tooltipCopy = {
  approval: 'Outstanding odds of approval are no guarantee of approval for a loan. Approval odds are determined by whether you met certain pre-qualification criteria based on information derived from a soft credit pull. We may not approve your full application if you do not meet our credit criteria after we review factors such as your income and expenses, or if we cannot verify your identity.',
  unsecured: 'A loan that does not require you to provide collateral to the lender',
};

function openTooltip(kind, opener) {
  document.querySelector('.tooltip-layer')?.remove();
  document.querySelectorAll('[data-action="open-tooltip"]').forEach(button => button.setAttribute('aria-expanded', 'false'));

  const node = document.createElement('div');
  node.className = 'tooltip-layer';
  node.innerHTML = `<div class="cx-popover" role="dialog" aria-label="More information">
    <div class="cx-popover-surface">
      <p>${tooltipCopy[kind]}</p>
      <button class="cx-popover-close" type="button" aria-label="Close tooltip"><img src="./assets/tooltip-close.svg" alt=""></button>
    </div>
    <div class="cx-popover-pointer"><img src="./assets/tooltip-pointer.svg" alt=""></div>
  </div>`;
  document.body.appendChild(node);
  opener.setAttribute('aria-expanded', 'true');

  const popover = node.querySelector('.cx-popover');
  const anchorRect = opener.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const left = Math.min(window.innerWidth - popoverRect.width - 16, Math.max(16, anchorRect.left + anchorRect.width / 2 - popoverRect.width / 2));
  const top = Math.max(12, anchorRect.top - popoverRect.height - 8);
  const pointerLeft = Math.min(popoverRect.width - 24, Math.max(8, anchorRect.left + anchorRect.width / 2 - left - 8));
  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
  popover.style.setProperty('--pointer-left', `${pointerLeft}px`);

  const close = () => {
    opener.setAttribute('aria-expanded', 'false');
    node.remove();
    opener.focus();
  };
  node.querySelector('.cx-popover-close').addEventListener('click', close);
  node.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  node.querySelector('.cx-popover-close').focus();
}

function loanFeesCopy() {
  return `<h3>Loan Fees</h3>
    <p><strong>Origination Fees.</strong> OneMain charges loan origination fees. Depending on the state where you open your loan, the origination fee may be either a flat amount or a percentage of your loan amount. Flat fee amounts vary by state, ranging from $25 to $500. Percentage-based fees vary by state ranging from 1% to 10% of your loan amount subject to certain state limits on the fee amount.</p>
    <p>Loan origination fees will be disclosed on the first page of your Loan Agreement and Disclosure Statement, near the bottom, under the heading “Prepaid Finance Charges.” The name of these fees varies by state. They may be called a Loan Processing Fee, Document Preparation Fee, Credit Investigation Fee or other similar name.</p>
    <p><strong>Late Payment Fees.</strong> OneMain charges late payment fees when payments are made after any grace period allowed by state law. These fees will vary, depending on the state where you open your loan. These fees may range from a flat amount of $5 to $30 per late payment, or they may be a percentage of your monthly payment, subject to certain state limits.</p>
    <p>Late fees will be disclosed on the first page of your Loan Agreement and Disclosure Statement under the heading “Truth in Lending Disclosures” in the row titled “Late Charge.”</p>
    <p><strong>Non-Sufficient Funds Fees.</strong> In states where permitted, OneMain charges a fee when a payment made by check or electronic ACH debit is returned due to insufficient funds. The amount varies depending on state law and ranges from $10 to $50 per payment returned.</p>
    <p><strong>Governmental Fees.</strong> OneMain charges fees associated with perfecting its lien on a motor vehicle’s certificate of title. Where allowed by law, these fees are passed through to customers without mark-up.</p>
    <p><strong>Note:</strong> This fee information is provided for general informational purposes only and is subject to change. It does not supersede disclosures printed on your Loan Agreement and Disclosure Statement. <a href="#">Contact your local branch</a> for more details.</p>
    <h3>Loan Amounts</h3>
    <p>OneMain makes personal and auto loans from $1,500 – $30,000.</p>
    <p>Not all applicants will qualify for larger loan amounts or most favorable loan terms. Larger loan amounts require a first lien on a qualifying motor vehicle. Loan approval and actual terms depend on your state of residence and ability to meet our credit standards.</p>
    <p>Borrowers in these states are subject to minimum loan sizes: Alabama: $2,100. California: $3,000. Georgia: $3,100. North Dakota: $2,000. Ohio: $2,000. Virginia: $2,600.</p>
    <p>Borrowers in these states are subject to maximum loan sizes: North Carolina: $11,000. Maine: $7,000. Mississippi: $12,000. West Virginia: $13,500.</p>`;
}

function lendingProcessCopy() {
  return `<p>[Lending process content placeholder]</p>`;
}

app.addEventListener('change', (e) => {
  if (e.target.id === 'terms') {
    if (e.target.checked) clearConsentError();
    return;
  }
  if (e.target.id === 'plaid-consent') document.querySelector('[data-action="connect-bank"]').disabled = !e.target.checked;
  if (e.target.name === 'offer') { state.offer = Number(e.target.value); render(); }
  if (e.target.name === 'account-type') state.accountType = e.target.value;
  if (e.target.name === 'payment') {
    if (e.target.value === 'manual') preferenceModal('autopay', e.target);
    else { state.payment = 'autopay'; render(); }
  }
  if (e.target.name === 'payment-schedule') { state.paymentSchedule = e.target.value; render(); }
});

document.addEventListener('input', event => {
  if (!event.target.matches('.field input')) return;
  if (event.target.id === 'routing' || event.target.id === 'confirm-account') {
    validateDepositInput(event.target);
    return;
  }
  clearFieldError(event.target);

  if (event.target.id === 'account') {
    const confirmation = document.querySelector('#confirm-account');
    if (confirmation?.value) validateDepositInput(confirmation);
  }
});

app.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]'); if (!el) return;
  const action = el.dataset.action;
  if (action === 'back') { state.screen = state.history.pop() || 'entry'; render(); }
  if (action === 'apply') { if (!document.querySelector('#terms')?.checked) return showConsentError(); go('verify'); }
  if (action === 'open-tooltip') openTooltip(el.dataset.tooltip, el);
  if (action === 'open-disclosure') disclosureModal(el.dataset.modalTitle, el);
  if (action === 'change-phone') phoneModal();
  if (action === 'plaid-info') plaidInfoModal(el);
  if (action === 'why-income') whyIncomeModal(el);
  if (action === 'send-code') go('code');
  if (action === 'resend') toast('A new security code was sent');
  if (action === 'verify-code') { const input = document.querySelector('#security'); const v = input.value.replace(/\D/g, ''); if (v.length !== 6) return setFieldError(input, 'Enter the 6-digit security code.'); if (v === '123455' || v === '000000') return setFieldError(input, 'Invalid code. Please try again.'); go('income'); }
  if (action === 'connect-bank') go('loading');
  if (action === 'dashboard-verify') go('income', false);
  if (action === 'dashboard-logout') go('entry', false);
  if (action === 'choose-offer') go('deposit');
  if (action === 'save-deposit') {
    const routingInput = document.querySelector('#routing');
    const accountInput = document.querySelector('#account');
    const confirmInput = document.querySelector('#confirm-account');
    const r = routingInput.value.replace(/\D/g, '');
    const a = accountInput.value.replace(/\D/g, '');
    const c = confirmInput.value.replace(/\D/g, '');
    const invalidFields = [];

    if (a.length < 4) {
      setFieldError(accountInput, 'We couldn’t verify this account number. Please check the number and try again.', false);
      invalidFields.push(accountInput);
    }
    if (r.length !== 9) invalidFields.push(routingInput);
    if (!c || a !== c) invalidFields.push(confirmInput);
    if (invalidFields.length) {
      invalidFields[0].focus();
      return;
    }
    state.routing = r; state.account = a; go('payment');
  }
  if (action === 'paper-modal') preferenceModal('paperless', el);
  if (action === 'enable-paperless') { state.paperless = true; render(); }
  if (action === 'change-autopay-account') changeAutopayAccountModal(el);
  if (action === 'change-deposit-account') changeAutopayAccountModal(el, 'deposit');
  if (action === 'edit-payment' || action === 'edit-billing') go('payment');
  if (action === 'save-payment') go('review');
  if (action === 'continue-sign') go('sign');
  if (action === 'complete-docusign') go('complete');
  if (action === 'account-setup-placeholder') toast('Online account setup placeholder');
  if (action === 'login-placeholder') toast('Account login placeholder');
  if (action === 'copy-account') { navigator.clipboard?.writeText('123456778999'); showSuccessAlert('Loan account number copied!', el); }
  if (action === 'restart') { state.history = []; go('entry', false); }
});

function showConsentError() {
  const checkbox = document.querySelector('#terms');
  const message = document.querySelector('#terms-error');
  checkbox?.classList.add('error');
  checkbox?.setAttribute('aria-invalid', 'true');
  if (!message) return;
  message.hidden = false;
  message.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => message.focus({ preventScroll: true }), 350);
}

function clearConsentError() {
  const checkbox = document.querySelector('#terms');
  const message = document.querySelector('#terms-error');
  checkbox?.classList.remove('error');
  checkbox?.removeAttribute('aria-invalid');
  if (message) message.hidden = true;
}

render();
