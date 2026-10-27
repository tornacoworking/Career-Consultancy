/*
 * Visa sub-services and destinations. Edit DESTINATIONS to change the country selector.
 * Visa rules change. Nothing here states a current requirement, fee or processing time:
 * we point to the relevant authority and help you work from its published information.
 */

export const DESTINATIONS = [
  { slug: 'canada', name: 'Canada', authority: 'Immigration, Refugees and Citizenship Canada (IRCC)' },
  { slug: 'australia', name: 'Australia', authority: 'the Australian Department of Home Affairs' },
  { slug: 'united-kingdom', name: 'United Kingdom', authority: 'UK Visas and Immigration (UKVI)' },
  { slug: 'united-states', name: 'United States', authority: 'the U.S. Department of State and USCIS' },
  { slug: 'germany', name: 'Germany', authority: 'the German Federal Foreign Office and the local mission' },
  { slug: 'new-zealand', name: 'New Zealand', authority: 'Immigration New Zealand' },
  { slug: 'singapore', name: 'Singapore', authority: 'the Immigration & Checkpoints Authority and the Ministry of Manpower' },
  { slug: 'uae', name: 'United Arab Emirates', authority: 'the UAE federal and emirate-level immigration authorities' },
];

export const destinationName = (slug) => DESTINATIONS.find((d) => d.slug === slug)?.name ?? slug;

const AUTHORITY_FAQ = {
  q: 'Who decides whether the visa is granted?',
  a: 'The immigration authority of the destination country decides every application. Career Consultancy is an independent consultancy: we are not an embassy or government body, and we cannot influence the outcome.',
};

export const VISA_SUBSERVICES = [
  {
    slug: 'study-visa', parent: 'visa-documentation', icon: 'graduation', name: 'Study Visa Documentation',
    short: 'Understand the official student-visa requirements and organise your academic, financial and identity documents.',
    title: 'Study Visa Documentation Support | Career Consultancy',
    meta: 'Help understanding student-visa requirements and organising your documents. We do not issue visas and cannot guarantee approval; the authority decides.',
    h1: 'Study visa documentation support',
    intro: 'A study visa usually follows an offer from an institution, and the authority then asks for proof of identity, funds and intent. We help you read the published requirements for your destination and arrange your documents in a clear, complete order.',
    audience: ['Students who already hold, or are expecting, an offer from an overseas institution', 'Parents helping a son or daughter organise a first overseas application', 'Applicants who want a second review of their file before submitting'],
    process: [
      { title: 'Share your plan', text: 'Tell us the destination, course level and intake, and what you have already received from the institution.' },
      { title: 'Read the official list', text: 'We go through the authority’s current published requirements with you and mark what applies.' },
      { title: 'Organise your file', text: 'You gather documents; we review them for completeness, consistent names and dates, and the format the authority specifies.' },
      { title: 'You apply', text: 'You complete the official steps, such as forms, fees and biometrics, and submit the application yourself.' },
    ],
    documents: ['Offer or admission letter from the institution', 'Passport and identity documents', 'Academic transcripts and certificates', 'Evidence of funds as the authority describes it', 'Any language-test results the course requires'],
    notIncluded: ['Admission to any institution', 'Scholarships or funding', 'A promise that a visa will be granted'],
    faqs: [
      { q: 'Can you get me admission to a university?', a: 'No. Admission is decided by the institution. We help with the visa documentation once you have an offer, or help you understand what an offer typically needs to show.' },
      { q: 'Do you tell me how much money I must show?', a: 'We direct you to the figure the authority publishes for your destination and course, because it changes. We do not quote amounts from memory.' },
      AUTHORITY_FAQ,
    ],
  },
  {
    slug: 'work-visa', parent: 'visa-documentation', icon: 'briefcase', name: 'Work Visa Documentation',
    short: 'Prepare for employer-sponsored or skilled-worker routes by organising genuine work history and supporting papers.',
    title: 'Work Visa Documentation Support | Career Consultancy',
    meta: 'Help understanding work-visa requirements and organising genuine employment and identity documents. We do not issue visas; the authority decides.',
    h1: 'Work visa documentation support',
    intro: 'Work visas often depend on a job offer, a sponsoring employer or a points-based assessment, and each asks for proof of your real work history. We help you understand which route your situation points to and organise accurate documents for it.',
    audience: ['Professionals with a job offer from an overseas employer', 'Skilled workers exploring a points-based or sponsored route', 'Applicants who need their employment evidence reviewed before filing'],
    process: [
      { title: 'Describe your situation', text: 'Share your role, years of experience, offer details if any, and the destination you are considering.' },
      { title: 'Identify the route', text: 'We help you read the authority’s published categories to see which one matches your circumstances.' },
      { title: 'Prepare genuine evidence', text: 'We review your employment letters and records for completeness and consistency. If something is missing, we help you request it from the issuer.' },
      { title: 'You submit', text: 'You or your sponsor complete and file the official application. We do not sign or submit it on your behalf.' },
    ],
    documents: ['Passport and identity documents', 'Employment or offer letter', 'Genuine experience and relieving letters from past employers', 'Educational and professional qualifications', 'Any skills assessment or licence the route requires'],
    notIncluded: ['Finding or arranging a job', 'Sponsorship by an employer', 'Altering or creating any employment record'],
    faqs: [
      { q: 'Can you find me a job abroad?', a: 'No. We do not place candidates with employers. We help you prepare the visa documentation once you know the route.' },
      { q: 'What if my previous employer will not give me a letter?', a: 'We cannot create one. We help you ask clearly, and discuss which alternative evidence the authority may accept, which it decides.' },
      AUTHORITY_FAQ,
    ],
  },
  {
    slug: 'tourist-visa', parent: 'visa-documentation', icon: 'plane', name: 'Tourist or Visitor Visa Documentation',
    short: 'Plan a clear document file for short visits, family trips or holidays.',
    title: 'Tourist and Visitor Visa Documentation | Career Consultancy',
    meta: 'Help organising documents for tourist and visitor visa applications from the destination authority’s published requirements. We do not issue visas.',
    h1: 'Tourist and visitor visa documentation support',
    intro: 'A visitor visa asks you to show the purpose of your trip, your plans to return and your ability to fund it. We help you understand what the authority wants to see and present your documents clearly and truthfully.',
    audience: ['First-time international travellers', 'People visiting family or friends overseas', 'Travellers whose earlier application needs a more careful file'],
    process: [
      { title: 'Share the trip', text: 'Tell us where, when and why you plan to travel, and who is travelling with you.' },
      { title: 'Check the requirements', text: 'We read the published visitor-visa requirements with you, including any invitation or itinerary rules.' },
      { title: 'Organise documents', text: 'We review your documents for clarity and consistency, so your story is easy to follow.' },
      { title: 'You apply', text: 'You complete the official steps and attend any appointment yourself.' },
    ],
    documents: ['Passport with sufficient validity', 'Travel itinerary or invitation, if the authority asks for one', 'Evidence of funds for the trip', 'Proof of employment or study at home', 'Recent photographs in the specified format'],
    notIncluded: ['Booking flights or accommodation', 'Pre-approval of any visa', 'Statements that are not true for your trip'],
    faqs: [
      { q: 'Should I book flights before applying?', a: 'Check the authority’s guidance first. Many suggest not making non-refundable bookings before a decision. We help you find what your destination says.' },
      { q: 'Can you improve my chances after a refusal?', a: 'We can review the refusal reason with you and help you correct genuine gaps in a new file. We cannot promise a different result.' },
      AUTHORITY_FAQ,
    ],
  },
  {
    slug: 'business-visa', parent: 'visa-documentation', icon: 'building', name: 'Business Visa Documentation',
    short: 'Organise documents for meetings, conferences, training or short business trips.',
    title: 'Business Visa Documentation Support | Career Consultancy',
    meta: 'Support understanding business-visa requirements and organising invitation letters, company documents and travel papers. We do not issue visas.',
    h1: 'Business visa documentation support',
    intro: 'Business visas cover activities such as meetings, conferences and short assignments, and the line between a permitted business visit and work needing a different visa matters. We help you read the rules for your destination and prepare supporting papers carefully.',
    audience: ['Employees travelling for meetings, training or conferences', 'Business owners and self-employed professionals', 'Companies preparing documents for staff travel'],
    process: [
      { title: 'Define the purpose', text: 'Share what you will do abroad and for how long, so we can check it fits a business-visit category.' },
      { title: 'Read the rules', text: 'We review the destination authority’s published guidance on permitted business activities.' },
      { title: 'Assemble support papers', text: 'We help you organise the invitation, company documents and travel details into a clear file.' },
      { title: 'You apply', text: 'You or your employer submit the application and complete any official steps.' },
    ],
    documents: ['Passport and identity documents', 'Invitation letter from the host organisation', 'Letter from your employer or proof of your business', 'Itinerary for the visit', 'Financial evidence as requested'],
    notIncluded: ['Arranging business contacts or meetings', 'Advice on tax or company law', 'Guidance that treats paid work as a business visit'],
    faqs: [
      { q: 'Can I work abroad on a business visa?', a: 'Usually the permitted activities are limited. Each authority publishes what counts as a business visit. We help you read it, and we will say so if your plans look like they need another visa.' },
      { q: 'Do you write the invitation letter?', a: 'The host organisation issues it. We can explain what such letters typically need to include according to the official guidance.' },
      AUTHORITY_FAQ,
    ],
  },
  {
    slug: 'permanent-residency', parent: 'visa-documentation', icon: 'home', name: 'Permanent Residency (PR) Documentation',
    short: 'Understand published PR pathways and prepare a long-term document plan.',
    title: 'Permanent Residency (PR) Documentation | Career Consultancy',
    meta: 'Help understanding permanent-residency pathways and organising documents for a long-term plan. We do not grant PR; eligibility rests with the authorities.',
    h1: 'Permanent residency (PR) documentation support',
    intro: 'Permanent-residency pathways can involve points, skills assessments, language tests and years of documentation. We help you understand the published routes for your destination and build an organised, honest document plan over time.',
    audience: ['Skilled professionals thinking long term about moving abroad', 'People already abroad who want to understand PR options', 'Families planning together'],
    process: [
      { title: 'Share your profile', text: 'Tell us your age range, qualifications, work history and the destinations you are considering.' },
      { title: 'Review published pathways', text: 'We go through the official pathways with you so you can see which ones might apply. We do not predict outcomes.' },
      { title: 'Plan your documents', text: 'We create a list of what you will need, such as assessments, language tests and employment evidence, and a sensible order to gather them.' },
      { title: 'You apply', text: 'You complete the official application and any assessments yourself.' },
    ],
    documents: ['Passport and identity documents', 'Educational credentials and any assessments', 'Language-test results if required', 'Genuine employment history evidence', 'Police certificates and medical results as the authority requires'],
    notIncluded: ['Immigration legal advice', 'A prediction of your chance of success', 'Acting as your authorised representative'],
    faqs: [
      { q: 'Can you tell me if I qualify for PR?', a: 'We can help you read the published criteria and compare them with your profile. Only the authority can assess eligibility, and criteria change.' },
      { q: 'How long does PR take?', a: 'Timelines are set by the authority and vary widely. We do not quote times from memory; we point you to current official information.' },
      AUTHORITY_FAQ,
    ],
  },
  {
    slug: 'dependent-visa', parent: 'visa-documentation', icon: 'family', name: 'Dependent or Family Visa Documentation',
    short: 'Organise relationship, identity and sponsor documents for spouses, children and other eligible family members.',
    title: 'Dependent and Family Visa Documentation | Career Consultancy',
    meta: 'Help organising documents for dependent and family visa applications from published requirements. We do not issue visas; the authority decides.',
    h1: 'Dependent and family visa documentation support',
    intro: 'Dependent and family routes depend on a relationship to a person who already holds a visa or status. We help you understand which relationships the authority recognises and organise the evidence it asks for.',
    audience: ['Spouses and partners joining someone abroad', 'Parents arranging for children to join', 'Sponsors who want a second review of the family file'],
    process: [
      { title: 'Describe the family', text: 'Tell us who the sponsor is, their status and who needs to travel.' },
      { title: 'Check recognised relationships', text: 'We read the published rules on who counts as a dependant for your destination.' },
      { title: 'Organise evidence', text: 'We review relationship documents, translations and certified copies for completeness and consistency.' },
      { title: 'You apply', text: 'The sponsor and applicants complete the official steps and sign their own forms.' },
    ],
    documents: ['Passports for all applicants', 'Marriage or birth certificates', 'Sponsor’s status and residence evidence', 'Proof of ongoing relationship where required', 'Translations or certified copies as specified'],
    notIncluded: ['Any statement about relationships that is not true', 'Legal advice on custody or family law', 'A promise of reunification'],
    faqs: [
      { q: 'Do documents need translating?', a: 'Often yes, if they are not in the language the authority accepts. We help you check the translation and certification rules in the official guidance.' },
      { q: 'Can the sponsor and applicant enquire together?', a: 'Yes. You can send one enquiry and tell us who is involved.' },
      AUTHORITY_FAQ,
    ],
  },
];
