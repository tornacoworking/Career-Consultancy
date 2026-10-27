/*
 * Document and information tables shown on the home page, city pages, service pages and sub-service pages.
 * Every row describes help with GENUINE records. We never create, alter or backdate a document, and we
 * never state a current official requirement: visa rows are a general guide drawn from our checklists.
 */

// What an experience certificate is, who may need one, and how we help. Shown first on the service page.
export const EXPERIENCE_WHAT = {
  what: {
    title: 'What it is',
    text: 'An experience certificate (or experience letter) is a document issued by an employer that confirms you worked there. It normally states your designation, your joining and last working dates, and a short summary of your duties. Only the employer, or an organisation it has authorised, can issue it.',
  },
  who: {
    title: 'Who may need one',
    items: [
      'Professionals joining a new employer who must complete onboarding or background checks',
      'Applicants for work or skilled-migration visas that ask for proof of work history',
      'Students applying to courses or universities that count work experience',
      'Anyone returning to work after a break who needs to account for earlier roles',
    ],
  },
  how: {
    title: 'How Career Consultancy helps',
    items: [
      'We read what the requesting organisation needs and write you a specific checklist',
      'We help you draft a clear request to each former employer’s HR team',
      'We review the letters you receive for gaps and mismatches, and help you ask for corrections',
      'We organise your records into one file, ready to submit',
    ],
  },
};

// "Documents we help you obtain and organise". The employer issues each one; we never produce them.
export const EXPERIENCE_DOCS = [
  { doc: 'Appointment or offer letter', shows: 'The role, joining date and terms you were hired on.', help: 'Locate your copy, or help you ask HR for a duplicate. Check the date and designation.' },
  { doc: 'Experience certificate', shows: 'Your designation, tenure and a summary of your duties.', help: 'Work out who issues it, draft the request and review the letter that comes back.' },
  { doc: 'Relieving letter', shows: 'That your resignation was accepted and you were released from duty.', help: 'Draft the request and check the last working date against your other papers.' },
  { doc: 'Increment or promotion letters', shows: 'Changes in your pay or designation over time.', help: 'Match each change to the designations written in your experience letter.' },
  { doc: 'Resignation acceptance email from HR', shows: 'That HR accepted your resignation, and your agreed last day.', help: 'Help you find and keep the original email with its date and sender.' },
  { doc: 'Payslips', shows: 'Your employer, role and salary month by month.', help: 'Arrange them in date order and check that the employer name is consistent.' },
  { doc: 'Form 16', shows: 'Salary paid and tax deducted for a financial year, as issued by your employer.', help: 'Explain when it is issued and how to request a copy from payroll.' },
  { doc: 'Bank statement showing salary credits', shows: 'Genuine salary credits from the employer, from your own bank.', help: 'Explain how to download or request it from your bank. It supports your records and never replaces them.' },
  { doc: 'Employee ID number and company email or ID card', shows: 'That you held an employee record with that organisation.', help: 'Quote the ID correctly in requests so HR can find your file quickly.' },
  { doc: 'HR contact for verification', shows: 'Who at the employer confirms your details when asked.', help: 'Help you confirm the right HR email address and phone number for each employer.' },
  { doc: 'Reporting manager or team lead details', shows: 'Who you really reported to. Verification forms often ask for it.', help: 'Help you recall names, titles and dates accurately and keep them consistent.' },
  { doc: 'Sample resumes for reference', shows: 'How to lay out a CV for your role, as a formatting guide only.', help: 'Check that the dates and designations on your CV match your letters.' },
];

// "What we need from you" before we can start on an experience certificate file.
export const EXPERIENCE_NEEDS = [
  { item: 'Your purpose and deadline', why: 'Different organisations ask for different details, so we build your checklist from their requirement.' },
  { item: 'The requirement text you were given', why: 'We read the exact wording from your new employer, embassy or university.' },
  { item: 'Employer names, dates and designations', why: 'To map each period of work and spot gaps before you request letters.' },
  { item: 'Appointment, experience and relieving letters you hold', why: 'To see what you already have and what is missing.' },
  { item: 'Recent payslips or salary statements', why: 'To check that employer names and dates agree with your letters.' },
  { item: 'HR contact details for each employer', why: 'So your requests reach the person who can issue or confirm the letter.' },
  { item: 'Your ID details as written on the letters', why: 'So your name and employee ID are consistent across every document.' },
];

/* ---------- Visa documentation requirements ---------- */

// How often a document is asked for. Always check the official list for your destination and visa type.
export const VISA_LEVELS = {
  usual: { label: 'Usually', note: 'Commonly asked for' },
  ask: { label: 'If asked', note: 'Sometimes asked for, depending on the authority' },
  none: { label: 'Not usual', note: 'Not normally asked for' },
};

export const VISA_TYPES = [
  { slug: 'study-visa', name: 'Study' },
  { slug: 'work-visa', name: 'Work' },
  { slug: 'tourist-visa', name: 'Tourist' },
  { slug: 'business-visa', name: 'Business' },
  { slug: 'permanent-residency', name: 'PR' },
  { slug: 'dependent-visa', name: 'Dependent' },
];

// Order of the levels in each row follows VISA_TYPES: study, work, tourist, business, PR, dependent.
const row = (doc, levels) => ({ doc, levels: Object.fromEntries(VISA_TYPES.map((t, i) => [t.slug, levels[i]])) });

export const VISA_DOCS = [
  row('Valid passport and photographs', ['usual', 'usual', 'usual', 'usual', 'usual', 'usual']),
  row('Completed application form (you enter and sign it)', ['usual', 'usual', 'usual', 'usual', 'usual', 'usual']),
  row('Offer or admission letter from the institution', ['usual', 'none', 'none', 'none', 'none', 'none']),
  row('Job offer or sponsoring employer’s letter', ['none', 'usual', 'none', 'none', 'none', 'none']),
  row('Invitation letter from the host organisation', ['none', 'none', 'ask', 'usual', 'none', 'none']),
  row('Academic transcripts and certificates', ['usual', 'usual', 'none', 'none', 'usual', 'ask']),
  row('Genuine experience certificates and employment letters', ['ask', 'usual', 'none', 'ask', 'usual', 'none']),
  row('Proof of current job, business or study at home', ['none', 'none', 'usual', 'usual', 'none', 'none']),
  row('Evidence of funds in the form the authority describes', ['usual', 'ask', 'usual', 'ask', 'ask', 'ask']),
  row('Language-test results', ['ask', 'ask', 'none', 'none', 'ask', 'none']),
  row('Skills assessment or professional licence', ['none', 'ask', 'none', 'none', 'usual', 'none']),
  row('Travel itinerary', ['none', 'none', 'usual', 'usual', 'none', 'none']),
  row('Marriage or birth certificates', ['none', 'none', 'none', 'none', 'ask', 'usual']),
  row('Sponsor’s status and residence documents', ['none', 'none', 'none', 'none', 'none', 'usual']),
  row('Police clearance and medical results', ['ask', 'ask', 'none', 'none', 'usual', 'ask']),
  row('Translations or certified copies', ['ask', 'ask', 'ask', 'ask', 'ask', 'ask']),
];

export const VISA_TABLE_NOTE = 'This table is a general guide drawn from our own checklists. It is not an official list. Each authority publishes its own current requirements and can change them, so we always build your checklist from the official list for your destination and visa type.';

/* ---------- Project training: what we need before you enrol ---------- */

export const TRAINING_NEEDS = [
  { item: 'The skill or domain you want', why: 'So we can suggest the right track, or tell you if another starting point would suit you better.' },
  { item: 'What you already know', why: 'Even if it is very little. It decides whether you begin with foundations or go straight to the project.' },
  { item: 'Days and times you can attend', why: 'So we can tell you which formats and schedules are realistic for you.' },
  { item: 'A laptop or desktop and stable internet', why: 'The practical work and live sessions run online.' },
  { item: 'Your city and preferred format', why: 'Online, classroom or hybrid options differ by track and are confirmed in writing.' },
];

/* ---------- "What else do we have for you?" ---------- */

// The four ways employers and agencies commonly verify work history, and how we help you prepare truthfully.
export const VERIFICATION = [
  { icon: 'mail', title: 'Email verification', text: 'A new employer or agency emails your former HR to confirm your designation and dates.', help: 'We help you confirm which HR address each employer uses, and check that your CV matches your letters.' },
  { icon: 'phone', title: 'Telephonic verification', text: 'Someone calls your former HR or manager to confirm your details.', help: 'We explain what is usually asked and help you give accurate names, dates and reporting lines.' },
  { icon: 'users', title: 'Third-party verification', text: 'A background-check agency collects records from your employers on a new employer’s behalf.', help: 'We walk you through the consent form and what the agency will request, so your answers stay consistent.' },
  { icon: 'building', title: 'Physical verification', text: 'Some checks confirm an employer’s or your own address in person.', help: 'We help you keep address proofs and employer details current so the check can be completed.' },
];

export const VERIFICATION_PROMISE = 'We support genuine records and honest preparation. Every verification is answered by the employer or agency involved, never by us, and we cannot promise how any check will turn out.';
