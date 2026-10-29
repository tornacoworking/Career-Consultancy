/*
 * Experience certificate sub-services (IT, Non-IT, and employment verification guidance).
 * This service is deliberately limited to GENUINE records issued by your real employers.
 * We never create, alter or backdate any document. See `notice` on the parent service in services.js.
 */

export const GENUINE_VS_FABRICATED = {
  genuine: [
    'Documents issued by an employer you actually worked for, about roles you actually held',
    'Dates, designations and salary details that match your real history',
    'Verification answers given by the issuing employer, truthfully',
    'Honest alternatives, such as payslips or bank credits, when a letter cannot be obtained',
  ],
  fabricated: [
    'Letters from a company you did not work for, or for a role you did not hold',
    'Changed dates, titles or pay to improve an application',
    'Staged verification calls or emails pretending to be an employer',
    'Backdated emails or any record made to look older than it is',
  ],
};

// Where an experience certificate is asked for. Shown on the service page under "Why it matters".
export const EXPERIENCE_USES = [
  { title: 'Job offers and onboarding', text: 'A new employer usually wants proof of your designation, dates and duties before it confirms an offer or finishes your joining formalities.' },
  { title: 'Visas and migration', text: 'Work-permit and skilled-migration authorities check that the experience you claim is real and that it matches what you wrote on your forms.' },
  { title: 'Admissions and licensing', text: 'Some courses, universities and professional bodies treat a period of work as an entry condition and ask to see it evidenced.' },
  { title: 'Background verification', text: 'Screening agencies compare your CV with what each employer confirms. Records that agree with each other are verified faster.' },
  { title: 'Pay and role discussions', text: 'A clear, consistent record of the roles you held gives you a firm basis when you discuss level and salary.' },
  { title: 'Explaining your career path', text: 'A complete file lets you account for every period honestly, including breaks, moves between sectors and short assignments.' },
];

export const EXPERIENCE_INDUSTRIES = [
  'IT and software', 'Hotels and hospitality', 'Healthcare', 'Education and training', 'Banking and finance',
  'Marketing and media', 'Logistics and supply chain', 'Retail and e-commerce', 'Construction and civil',
  'Manufacturing', 'Administration and HR', 'Customer service',
];

// What is specific to this service. Every item is something we actually do, not a promise about outcomes.
export const EXPERIENCE_FEATURES = [
  { icon: 'check', title: 'A checklist written for your purpose', text: 'We read the exact wording from the embassy, university or employer asking, and list the letters, dates and details each one must show.' },
  { icon: 'file', title: 'A ready-to-edit request kit', text: 'You get a polite request for HR, with the facts they need to find your record, plus follow-up wording for when a reply is slow.' },
  { icon: 'search', title: 'A detail-match review', text: 'We compare joining dates, designations and signatories across every paper you hold and give you a one-page list of anything that does not agree.' },
  { icon: 'shield', title: 'A verification-readiness note', text: 'A short brief on who is likely to be contacted, how, and what your past employers will be asked, so a genuine history checks out smoothly.' },
  { icon: 'pin', title: 'A follow-up planner', text: 'For each employer, a simple schedule of when you asked and when to chase, so no request sits unanswered.' },
  { icon: 'home', title: 'Guidance if an employer has closed', text: 'We help you ask the receiving organisation which other genuine evidence it accepts, and prepare that evidence accurately.' },
];

// Sub-content shown beside the section images on the experience certificate page.
export const CERTIFICATE_CONTENTS = [
  'Your full name, exactly as it appears on your ID and application',
  'Your employee ID, if the employer uses one',
  'Every designation you held, with the dates of each change',
  'Your joining date and last working date',
  'A short, factual summary of your responsibilities',
  'The company name, address and letterhead',
  'The name, title and contact details of the person who signed it',
  'The date of issue',
];

export const INDUSTRY_NOTES = [
  { sector: 'IT and software', text: 'Letters usually come from a central HR team. Titles change with promotions and mergers, so check that each designation matches your appointment and payslips.' },
  { sector: 'Hotels and hospitality', text: 'A property may issue its own letter or leave it to a regional office. Make sure the property name on the letter matches the brand name on your payslips.' },
  { sector: 'Healthcare', text: 'Hospitals and clinics often route letters through administration. Visiting, locum or rotational roles need their dates and departments stated clearly.' },
  { sector: 'Education and training', text: 'The principal’s or administrator’s office normally signs. Ask for academic-year dates and the subjects or levels you taught.' },
  { sector: 'Banking and finance', text: 'Large firms use central HR and sometimes a standard format. Ask that your grade or band, branch and reporting line are included if the receiver needs them.' },
  { sector: 'Construction and civil', text: 'Contractors often issue from a project or head office. Check project names, site locations and that the signatory is authorised to sign for the company.' },
];

export const WORKING_WITH_US = [
  { lead: 'You stay in control.', text: 'You send the requests to your employers. We write them with you, review the replies and tell you what is missing.' },
  { lead: 'Scope first.', text: 'You receive the scope, timeline and fee in writing before any work starts.' },
  { lead: 'Plain updates.', text: 'We tell you when something is slow, unclear or unlikely to be accepted, rather than leaving you to find out at submission.' },
];

export const RED_FLAGS = [
  'A provider who offers an experience certificate for a company you never worked for',
  'A promise that someone will “confirm” your employment by phone or email without involving the real employer',
  'Backdated emails, ID cards or payslips offered as part of a package',
  'A fixed price per letter with no questions about where and when you actually worked',
];

export const REGION_NOTES = {
  'West India': 'A mix of IT services, manufacturing, finance and trading firms, so requests often involve several large HR teams.',
  'South India': 'Strong IT, healthcare and education sectors, and many applicants preparing documents for overseas work.',
  'North India': 'Government-linked, corporate and start-up employers, with many people changing jobs within the same region.',
  'East India': 'Established industry, education and service employers, where older paper records are common.',
  'Central India': 'Growing business and industrial centres, often with smaller HR teams and owner-signed letters.',
};

export const EXPERIENCE_SUBSERVICES = [
  {
    slug: 'it', parent: 'experience-certificate', icon: 'code', name: 'IT Experience Certificate',
    short: 'Request, check and organise genuine records for software, data, testing and other technology roles.',
    title: 'IT Experience Certificate Guidance | Career Consultancy',
    meta: 'Guidance on requesting a genuine experience certificate and relieving letter for IT roles, and organising your work file. Authentic records only.',
    h1: 'IT experience certificate guidance',
    intro: 'Technology careers move quickly, and employers, project names and designations change often. We help you work out which genuine records an application needs, request them from the right HR team, and check that dates and designations line up across them.',
    audience: ['Software, data, testing and support professionals changing jobs', 'IT professionals preparing a visa or overseas job application', 'People whose former employer merged, renamed or moved HR systems'],
    process: [
      { title: 'Share the requirement', text: 'Send what the new employer or authority has asked you to provide.' },
      { title: 'Map your records', text: 'We list what you already hold, such as appointment, experience and relieving letters, and what is missing.' },
      { title: 'Request from the issuer', text: 'We help you draft a clear request for HR with the details they need to find your file.' },
      { title: 'Review and organise', text: 'We check returned letters for consistent dates, designations and signatory details, then arrange them in a file.' },
    ],
    documents: ['Appointment or offer letters', 'Experience and relieving letters you already hold', 'Recent payslips or salary statements', 'HR contact details of each employer', 'The organisation’s list of what it needs'],
    covers: ['Work experience letter guidance', 'Appointment letter documentation guidance', 'Relieving letter documentation guidance', 'Role-specific documentation consultation'],
    notIncluded: ['Issuing, editing or backdating any letter', 'Inventing projects, titles or tenures', 'Speaking to anyone as though we were your employer'],
    faqs: [
      { q: 'Can you give me an experience certificate for a company I did not work at?', a: 'No, and we will not. An experience certificate must come from an employer you really worked for.' },
      { q: 'My company has changed its name. Who issues my letter?', a: 'Usually the successor company’s HR. We help you find the right contact and word the request so they can locate your record.' },
      { q: 'Will you contact my former HR for me?', a: 'The request is normally strongest from you as the former employee. We help you write and follow it up.' },
    ],
  },
  {
    slug: 'non-it', parent: 'experience-certificate', icon: 'briefcase', name: 'Non-IT Experience Certificate',
    short: 'Guidance for finance, sales, operations, healthcare, teaching and other non-technology roles.',
    title: 'Non-IT Experience Certificate Guidance | Career Consultancy',
    meta: 'Guidance on requesting a genuine experience certificate and relieving letter for non-IT careers, and organising your records. Authentic only.',
    h1: 'Non-IT experience certificate guidance',
    intro: 'Careers in finance, sales, operations, hospitality, teaching and healthcare often involve smaller HR teams, contract employers or older paper records. We help you identify the right issuer and make a request that gets a clear, accurate letter.',
    audience: ['Professionals outside technology who need employment proof for a new role or visa', 'People who worked for small firms, contractors or institutions', 'Applicants returning to work after a break'],
    process: [
      { title: 'Share your history', text: 'Tell us the employers, dates and roles you need to evidence, and what the requester asked for.' },
      { title: 'Find the issuer', text: 'We help you work out who issues letters, which can be HR, an owner, a trust or a staffing agency.' },
      { title: 'Write the request', text: 'We help you draft a polite, specific request with your employee details and the facts to be confirmed.' },
      { title: 'Review the file', text: 'We check returned documents for gaps or mismatches and help you ask for corrections.' },
    ],
    documents: ['Appointment or contract letters', 'Any experience or relieving letters held', 'Payslips, bank statements showing salary credits', 'Contact details of the owner, HR or agency', 'Requirements from the receiving organisation'],
    covers: ['Employment record and verification support', 'Career documentation support', 'Work experience letter guidance'],
    notIncluded: ['Making a letter for you', 'Changing dates or pay', 'Contacting an employer while pretending to be you'],
    faqs: [
      { q: 'My employer was a small business with no HR team. What now?', a: 'A letter signed by the owner or authorised person is often accepted. We help you ask for one with the right details. Acceptance is decided by the receiving organisation.' },
      { q: 'What if the business has closed?', a: 'We cannot produce records for it. We help you ask the receiving organisation what other genuine evidence it accepts, such as payslips or bank credits.' },
      { q: 'Do you charge before telling me the scope?', a: 'No. Scope, requirements, timeline and fee are sent in writing first.' },
    ],
  },
  {
    slug: 'verification', parent: 'experience-certificate', icon: 'shield', name: 'Employment and Background Verification Guidance',
    short: 'Understand how employment checks work and prepare accurate, consistent information for them.',
    title: 'Employment Verification Guidance | Career Consultancy',
    meta: 'Guidance on how employment and background verification works and how to prepare accurate information and records. Truthful verification only.',
    h1: 'Employment and background verification guidance',
    intro: 'New employers and authorities often verify your history through a screening agency, by email or by phone. We help you understand how that process works and make sure the information you gave and the records you hold agree, so a genuine history verifies smoothly.',
    audience: ['Candidates told that a background check is coming', 'People whose earlier employer is slow to respond to verification requests', 'Applicants who want to check their own file for mismatches first'],
    process: [
      { title: 'Share what is being checked', text: 'Tell us what the employer or agency asked for, and which past employers are involved.' },
      { title: 'Review your own file', text: 'We compare your application, CV and records for mismatched dates or designations that could delay a check.' },
      { title: 'Prepare accurate answers', text: 'We help you recall and state your own history truthfully, and confirm the contact details your past employers use.' },
      { title: 'Follow up properly', text: 'If an employer is slow, we help you write a courteous follow-up to the correct HR contact.' },
    ],
    documents: ['Your CV and application as submitted', 'Appointment, experience and relieving letters', 'The agency’s consent and information request', 'HR or verification contact details of past employers', 'Payslips or salary statements'],
    covers: ['Background verification guidance', 'Telephonic or email verification guidance'],
    notIncluded: ['Answering verification calls or emails as an employer', 'Supplying references that are not real', 'Altering anything to match a wrong CV'],
    faqs: [
      { q: 'Can you take the verification call for my old employer?', a: 'No. Verification must come from the employer itself. We will not impersonate an employer or arrange anyone to do so.' },
      { q: 'What if my CV has a small date mismatch?', a: 'We help you spot it early so you can correct it honestly with the new employer or agency before a check finds it.' },
      { q: 'How long does a check take?', a: 'It depends on how fast each employer responds. We cannot control that, but we can help you make your request as easy to act on as possible.' },
    ],
  },
];
