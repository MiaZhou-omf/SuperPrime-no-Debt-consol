const app = document.querySelector('#app');

const state = {
  screen: 'entry',
  history: [],
  phone: '(***) ***–7899',
  offer: 1,
  accountType: 'Checking',
  payment: 'autopay',
  paperless: true,
  routing: '',
  account: '',
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

function nav(showPartner = false) {
  if (showPartner) return `<header class="nav partner-nav"><img class="omf-partner" src="./assets/omf-stacked.svg" alt="OneMain Financial"><img class="divider-asset" src="./assets/logo-divider.svg" alt=""><div class="partner-lockup"><span>In association with:</span><img src="./assets/credit-karma.svg" alt="Intuit Credit Karma"></div></header>`;
  return `<header class="nav"><img src="./assets/onemain-logo.svg" alt="OneMain Financial" /></header>`;
}

function progress() {
  const [label, value] = steps[state.screen] || [];
  if (!label) return '';
  return `<div class="progress"><div class="progress-copy"><span>${label}</span><span>${value}%</span></div><div class="track" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"><div class="fill" style="width:${value}%"></div></div></div>`;
}

function shell(content, { partner = false, footer = true } = {}) {
  return `<div class="stage"><section class="phone">${nav(partner)}${progress()}${content}${footer ? '<footer class="footer">[<a href="#">SuperPrimeFDC Footer</a> placeholder]</footer>' : ''}</section></div>`;
}

function entry() {
  return shell(`<div class="content stack">
    <div><h1>Welcome, <span class="pink">{Customer First Name}</span>. Ready to apply for this offer?</h1><p>It should only take a few minutes to wrap up your application.</p></div>
    <article class="card offer-hero shadow">
      <div class="offer-top"><div class="approval-ribbon">You have outstanding odds of approval! ⓘ</div><p class="selected-copy">You selected this offer<br>on <strong>Credit Karma</strong></p><p style="color:#051958;font-weight:500">UNSECURED LOAN</p><div class="offer-price"><strong>$621.26</strong><span>/ monthly payment</span></div><p class="small">Offer expires 4/18/2026</p><div class="details"><div class="row"><span>Loan amount</span><strong>$20,000</strong></div><div class="row"><span>Term</span><strong>36 months</strong></div><div class="row"><span>APR</span><strong>9.5%</strong></div></div></div>
    </article>
    <p class="small center"><a class="link">Read more about our Loan Amounts and Fees.</a><br><a class="link">Learn more about our lending process</a></p>
    <article class="card stack-sm"><p><strong>If everything looks good, please read and agree to the terms.</strong></p><label class="check-row"><input id="terms" type="checkbox"><span><strong>By checking this box, I confirm that:</strong></span></label><div class="legal"><p>• I have reviewed, agree to and acknowledge receipt of the <a>Terms of Use</a>, <a>Electronic Consent Agreement</a>, <a>Privacy Notice</a>, <a>Privacy Policy</a>, <a>Informational Communications Authorization</a>, <a>Method Privacy Policy</a> and <a>Method Terms of Service</a>.</p><p>• I authorize OneMain Financial ("OneMain") to share information I provide with service providers for purposes of obtaining and verifying my vehicle registration information, if any, from State DMVs.</p><p>• I also authorize OneMain to obtain my credit report to review my loan application, and to see if I qualify for a credit card product from lending partners of OneMain as well as share my application information with these lending partners.</p><p>• I am not using, or planning to use, a debt relief company to settle debts.</p><p>• I authorize Forward Lending, Inc. d/b/a Method, to be my agent to obtain my credit reports via soft inquiries; share information and related data about my balances with creditors with OneMain; and, if I choose, send my loan proceeds to creditors I select.</p></div><p class="center">Clicking the button below may affect your credit score.</p></article>
    <div><button class="btn primary" data-action="apply">Apply for this offer</button><p class="small center muted" style="margin-top:10px">Your data is securely encrypted</p></div>
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
    <div><h1>Enter your security code.</h1><p>We sent you a text with a 6-digit code.</p></div>
    <div class="phone-card"><div class="label">Mobile number</div><div class="phone-value"><strong>${state.phone}</strong></div></div>
    <div class="field"><label for="security">Security code</label><input id="security" class="mfa ${error ? 'error' : ''}" inputmode="numeric" maxlength="6" placeholder="------" autocomplete="one-time-code" value="${error ? '000000' : ''}">${error ? '<div class="error-copy">That code doesn’t match. Try 246810 for this prototype.</div>' : ''}</div>
    <div class="actions"><button class="btn primary" data-action="verify-code">Continue</button><button class="btn tertiary" data-action="resend">Resend code</button></div>
    <p class="small center muted">Prototype tip: enter any 6 digits. Enter 000000 to see the error state.</p>
  </div>`);
}

function income() {
  return shell(`<div class="content stack">
    <div><h1>Now let’s verify your income</h1><p>Connect the bank account where you get paid.</p></div>
    <div class="account-visual"><h3>Securely link to your bank with Plaid</h3><p class="small">Your bank credentials are encrypted and never shared with OneMain.</p></div>
    <article class="card stack-sm"><h3>Consent for third-party access to personal financial data</h3><p class="small">You authorize OneMain to access personal financial information held by the institution you select. This can include account ownership, balances, account status and transaction history.</p><label class="check-row"><input id="plaid-consent" type="checkbox"><span class="small">I have read and agreed to the consent for third-party access to personal financial data.</span></label></article>
    <div class="actions"><button class="btn primary" data-action="connect-bank" disabled>Connect my bank account</button><button class="btn tertiary">Why do I need to verify my income?</button></div>
  </div>`);
}

function loading() {
  setTimeout(() => { if (state.screen === 'loading') go('offer', false); }, 1500);
  return shell(`<div class="loader-wrap"><div><div class="loader"></div><h1>Hold tight</h1><p>We’re looking for additional loans you qualify for. This can take up to 3 minutes.</p><p class="small muted" style="margin-top:24px">We updated your application! Please don’t refresh this screen.</p></div></div>`, { footer: false });
}

const offers = [
  { tag: 'Highest loan amount', amount: '$23,000', monthly: '$631.33', apr: '10.24%', term: '48 mo' },
  { tag: 'Lowest payment', amount: '$23,000', monthly: '$621.26', apr: '10.24%', term: '56 mo' },
];

function offer() {
  return shell(`<div class="content stack">
    <div><h1>You’re approved! Choose the loan that works for you.</h1><p>You qualify for multiple loan options, <span class="pink">{Customer First Name}</span>.<sup>1</sup> Select the best fit for your needs.</p></div>
    <div class="choice-list">${offers.map((o, i) => `<label class="choice ${state.offer === i ? 'selected' : ''}"><div class="choice-head"><span class="tag"><img src="./assets/${i ? 'status-icon-alt' : 'status-icon'}.svg" width="12" height="12" alt="">${o.tag}</span><input type="radio" name="offer" value="${i}" ${state.offer === i ? 'checked' : ''}></div><div class="amount">${o.monthly} <small>/ monthly payment</small></div><div class="details"><div class="row"><span>Loan amount</span><strong>${o.amount}</strong></div><div class="row"><span>Term</span><strong>${o.term}</strong></div><div class="row"><span>APR</span><strong>${o.apr}</strong></div></div></label>`).join('')}</div>
    <button class="btn primary" data-action="choose-offer">Save and continue</button><p class="ds-footer-note"><sup>1</sup>These quotes are <a class="link">unsecured loans</a> closest to your requested amount. Offers may refresh at 12 am ET. To compare all your options and learn more details about <a class="link">our loan amounts and fees</a>, including loans secured with your vehicle, please <a class="link">give us a call.</a></p>
  </div>`);
}

function deposit() {
  return shell(`<div class="content stack">
    <div><h1>Tell us where to send the money</h1><p>We’ll deposit the funds directly into your bank account. Enter your bank account details.</p></div>
    <div class="stack-sm"><div class="field"><label for="routing">Routing number</label><input id="routing" inputmode="numeric" maxlength="9" value="${state.routing}"></div><div class="field"><label for="account">Account number</label><input id="account" inputmode="numeric" value="${state.account}"></div><div class="field"><label for="confirm-account">Confirm account number</label><input id="confirm-account" inputmode="numeric"></div></div>
    <div><div class="field-label">Type of account</div><div style="display:flex;gap:20px;margin-top:16px"><label class="radio-row"><input type="radio" name="account-type" value="Checking" ${state.accountType === 'Checking' ? 'checked' : ''}><span>Checking</span></label><label class="radio-row"><input type="radio" name="account-type" value="Savings" ${state.accountType === 'Savings' ? 'checked' : ''}><span>Savings</span></label></div></div>
    <div class="account-visual"><h3 class="center" style="font-size:14px">Where to find your routing and account numbers</h3><img class="check-example" src="./assets/check-example.png" alt="Example check showing routing and account numbers"></div>
    <button class="btn primary" data-action="save-deposit">Save and continue</button>
  </div>`);
}

function payment() {
  return shell(`<div class="content stack">
    <div><h1>Choose your payment and billing preferences</h1><p>Save time each month with AutoPay. Your payments will be made automatically on a schedule you select.</p></div>
    <div class="flat-options"><label class="flat-option"><input type="radio" name="payment" value="autopay" ${state.payment === 'autopay' ? 'checked' : ''}><span><span style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">Set up AutoPay <span class="tag">☆ Recommended</span></span><span class="small" style="display:block;margin-top:10px">Checking Acct#: XXXX7285</span><a class="link small">Change bank account</a></span></label><label class="flat-option"><input type="radio" name="payment" value="manual" ${state.payment === 'manual' ? 'checked' : ''}><span>I’ll make payments one at a time<span class="small" style="display:block;margin-top:10px">Due on the <span class="pink">{PaymentDueDay}</span> of every month. You can pay online, by phone or by mail. For more information, see <a class="link">our payments FAQ.</a></span></span></label></div>
    <article><h2>You’re getting ${state.paperless ? 'paperless' : 'paper'} statements</h2><p class="small">${state.paperless ? 'We’ll email you at <span class="pink">{emailaddress@gmail.com}</span> each month when your billing statement becomes available online. You can change the email address later if needed.' : 'We’ll mail your monthly statement to your address on file.'}</p><button class="text-button" data-action="toggle-paper">${state.paperless ? 'Mail me paper statements instead' : 'Switch to paperless statements'}</button></article>
    <button class="btn primary" data-action="save-payment">Save and continue</button>
  </div>`);
}

function review() {
  const o = offers[state.offer];
  return shell(`<div class="content stack">
    <div><h1>Confirm your loan details before you e-sign</h1><p>Almost done! Please review and confirm your selections.<br>The below information is accurate as of today, <span class="pink">{Current Date}</span>.</p></div>
    <div class="summary-group" style="display:grid;grid-template-columns:1fr 1fr;gap:24px"><div><h3 style="font-size:15px">Lender</h3><p class="small">OneMain Financial<br><span class="pink">{2115 Linwood Ave.<br>Fort Lee, NJ 07024}</span></p></div><div><h3 style="font-size:15px">Borrower</h3><p class="small">First Name<br>Last Name</p></div></div>
    <div class="summary-group"><div class="row"><span><strong>Loan amount</strong></span><strong>$23,000.00<br><small class="tiny muted">This is an unsecured loan.</small></strong></div><div class="row"><span><strong>Fees</strong></span><strong>$500.00<br><small class="tiny muted">The total cost of loan is $23,500.00.</small></strong></div><div class="row"><span><strong>Term</strong></span><strong>36 months</strong></div><div class="row"><span><strong>APR</strong></span><strong>10.24%</strong></div><div class="row" style="background:#e7f0ff;margin:14px -16px -18px;padding:18px 16px;border-radius:0 0 16px 16px"><span><strong>Due each month</strong></span><strong style="font-size:24px;color:#0e45e3">$644.98/mo</strong></div></div>
    <div class="summary-group"><h2>Direct deposit</h2><p class="small">${state.accountType} account</p><p class="small"><strong>Bank of America ...7285</strong></p><a class="link small">Change account</a></div>
    <div class="summary-group"><h2>${state.payment === 'autopay' ? 'AutoPay is on' : 'Manual payments'}</h2><p class="small">Automatic payments of $<span class="pink">{RecurringPaymentAmount}</span> will be made <span class="pink">{PaymentFrequency}</span> from your bank account.</p><p class="small"><strong>Bank of America ...7285</strong></p><a class="link small">Edit AutoPay settings</a><div class="divider"></div><p class="small">Your first payment of $<span class="pink">{RecurringPaymentAmount}</span> will be made on <span class="pink">{FirstPaymentDate}</span>.</p><p class="tiny" style="margin-top:8px">Note: Your first payment amount may be higher than your monthly payment amount because of a longer first payment period.</p></div>
    <div class="summary-group"><h2>${state.paperless ? 'Paperless billing is on' : 'Paper statements are on'}</h2><p class="small">${state.paperless ? 'You’re getting paperless statements.' : 'You’ll receive statements by mail.'}</p><a class="link small">Edit billing preferences</a></div>
    <button class="btn primary" data-action="continue-sign"><img src="./assets/edit-icon.svg" alt="" width="24" height="24" style="vertical-align:middle;margin-right:8px">Continue to e-sign</button>
  </div>`);
}

function sign() {
  return shell(`<div class="content stack"><div><h1>Review and sign</h1><p>Electronic Signature Consent and Loan Agreement</p></div><div class="doc"><p class="tiny muted">DOCUMENT 1 OF 1</p><h2 style="margin-top:18px">OneMain Financial Loan Agreement</h2><p class="small">By signing below, I acknowledge that I have reviewed the loan disclosures and agree to the terms of this electronic agreement.</p><div class="divider"></div><p class="small">Loan amount: <strong>$20,000.00</strong><br>Borrower: <strong>Alex Johnson</strong></p><div class="signature">Alex Johnson</div><p class="tiny muted">Electronic signature</p></div><button class="btn primary" data-action="sign">Adopt and sign</button></div>`);
}

function complete() {
  return shell(`<div class="content stack"><div><h1>Congrats, <span class="pink">{FirstName}</span>! Let’s set up your online account.</h1></div><div><h3>You need your account number for this</h3><div class="account-number"><span class="small">Copy your loan account number</span><strong>123456778999</strong><button class="copy-button" data-action="copy-account" aria-label="Copy account number"><img src="./assets/copy.svg" alt=""></button><span class="error-copy"><strong>You can’t set up your online account without it</strong></span></div></div><p class="small" style="font-size:16px;line-height:24px">Set up your account to manage your loan, view your loan documents and get your personalized money snapshot free with OneMain® MyMoney.</p><button class="btn primary" data-action="restart">Set up my account</button><p class="center" style="font-size:16px">Already created an account? <a class="link">Log in now.</a></p><div><h3>Your money’s on the way</h3><p class="small" style="font-size:16px;line-height:24px">You should see the funds in your bank account within 1–2 business days.</p><p class="small" style="font-size:16px;line-height:24px;margin-top:8px">Here are your final loan details.</p></div><div class="summary-group"><div class="row"><span><strong>Loan amount</strong></span><strong>$23,000.00<br><small class="tiny muted">This is an unsecured loan.</small></strong></div><div class="row"><span><strong>Fees</strong></span><strong>$500.00<br><small class="tiny muted">The total cost of loan is $23,500.00.</small></strong></div><div class="row"><span><strong>Term</strong></span><strong>36 months</strong></div><div class="row"><span><strong>APR</strong></span><strong>10.24%</strong></div><div class="row" style="background:#e7f0ff;margin:14px -16px -18px;padding:18px 16px;border-radius:0 0 16px 16px"><span><strong>Due each month</strong></span><strong style="font-size:24px;color:#0e45e3">$644.98/mo</strong></div></div><p class="small" style="font-size:16px;line-height:24px">Your first payment of $<span class="pink">{FirstPaymentAmount}</span> is due on <span class="pink">{FirstPaymentDate}</span>.</p><p class="small" style="font-size:16px;line-height:24px">If you have any questions, give us a call at <span class="pink">{XXX-XXX-XXXX}</span>.</p></div>`);
}

const views = { entry, verify, code: () => codeScreen(false), codeError: () => codeScreen(true), income, loading, offer, deposit, payment, review, sign, complete };

function render() {
  app.innerHTML = (views[state.screen] || entry)();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function go(screen, remember = true) {
  if (remember && state.screen !== screen) state.history.push(state.screen);
  state.screen = screen;
  render();
}

function toast(message) {
  const node = document.createElement('div');
  node.className = 'toast'; node.textContent = message; document.body.appendChild(node);
  setTimeout(() => node.remove(), 2200);
}

function phoneModal() {
  const node = document.createElement('div');
  node.className = 'modal-backdrop';
  node.innerHTML = `<div class="modal stack"><div><h2>Change mobile number</h2><p class="small">Enter the number where you want to receive your code.</p></div><div class="field"><label for="new-phone">Mobile number</label><input id="new-phone" inputmode="tel" placeholder="(555) 555-7899"></div><div class="actions"><button class="btn primary" id="save-phone">Save number</button><button class="btn tertiary" id="cancel-phone">Cancel</button></div></div>`;
  document.body.appendChild(node);
  node.querySelector('#cancel-phone').onclick = () => node.remove();
  node.querySelector('#save-phone').onclick = () => { const v = node.querySelector('#new-phone').value.trim(); if (!v) return; state.phone = v; node.remove(); render(); toast('Mobile number updated'); };
}

app.addEventListener('change', (e) => {
  if (e.target.id === 'terms') return;
  if (e.target.id === 'plaid-consent') document.querySelector('[data-action="connect-bank"]').disabled = !e.target.checked;
  if (e.target.name === 'offer') { state.offer = Number(e.target.value); render(); }
  if (e.target.name === 'account-type') state.accountType = e.target.value;
  if (e.target.name === 'payment') { state.payment = e.target.value; render(); }
});

app.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]'); if (!el) return;
  const action = el.dataset.action;
  if (action === 'back') { state.screen = state.history.pop() || 'entry'; render(); }
  if (action === 'apply') { if (!document.querySelector('#terms')?.checked) return toast('Please review and agree to the terms'); go('verify'); }
  if (action === 'change-phone') phoneModal();
  if (action === 'send-code') go('code');
  if (action === 'resend') toast('A new security code was sent');
  if (action === 'verify-code') { const v = document.querySelector('#security').value.replace(/\D/g, ''); if (v.length !== 6) return toast('Enter the 6-digit code'); if (v === '000000') return go('codeError', false); go('income'); }
  if (action === 'connect-bank') go('loading');
  if (action === 'choose-offer') go('deposit');
  if (action === 'save-deposit') { const r = document.querySelector('#routing').value.trim(); const a = document.querySelector('#account').value.trim(); const c = document.querySelector('#confirm-account').value.trim(); if (r.length !== 9) return toast('Enter a 9-digit routing number'); if (a.length < 4 || a !== c) return toast('Account numbers must match'); state.routing = r; state.account = a; go('payment'); }
  if (action === 'toggle-paper') { state.paperless = !state.paperless; render(); }
  if (action === 'save-payment') go('review');
  if (action === 'continue-sign') go('sign');
  if (action === 'sign') go('complete');
  if (action === 'copy-account') { navigator.clipboard?.writeText('4850729164'); toast('Account number copied'); }
  if (action === 'restart') { state.history = []; go('entry', false); }
});

render();
