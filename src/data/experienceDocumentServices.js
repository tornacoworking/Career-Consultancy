/*
 * Experience-document sub-services.
 * Sub-service names follow the reference site (IT, Non-IT, background/telephonic verification support),
 * but this service is deliberately limited to GENUINE records issued by your real employers.
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

export const EXPERIENCE_SUBSERVICES = [
  {
    slug: 'it', parent: 'experience-documents', icon: 'code', name: 'IT Experience Documentation',
    short: 'Request, check and organise genuine records for software, data, testing and other technology roles.',
    title: 'IT Experience Documentation Guidance | Career Consultancy',
    meta: 'Guidance on requesting genuine experience, relieving and appointment letters for IT roles, and organising your work-history file. Authentic records only.',
    h1: 'IT experience documentation guidance',
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
      { q: 'Can you give me an experience letter for a company I did not work at?', a: 'No, and we will not. Experience letters must come from an employer you really worked for.' },
      { q: 'My company has changed its name. Who issues my letter?', a: 'Usually the successor company’s HR. We help you find the right contact and word the request so they can locate your record.' },
      { q: 'Will you contact my former HR for me?', a: 'The request is normally strongest from you as the former employee. We help you write and follow it up.' },
    ],
  },
  {
    slug: 'non-it', parent: 'experience-documents', icon: 'briefcase', name: 'Non-IT Experience Documentation',
    short: 'Guidance for finance, sales, operations, healthcare, teaching and other non-technology roles.',
    title: 'Non-IT Experience Documentation Guidance | Career Consultancy',
    meta: 'Guidance on requesting genuine experience and relieving letters for non-IT careers and organising your work-history records. Authentic records only.',
    h1: 'Non-IT experience documentation guidance',
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
    slug: 'verification', parent: 'experience-documents', icon: 'shield', name: 'Employment and Background Verification Guidance',
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
