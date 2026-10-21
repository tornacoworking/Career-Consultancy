/*
 * City data. The ORDER of this list is the order shown in the hero explorer and the directory.
 * To add a city, append an entry and rebuild. A page at /cities/<slug>/ is generated automatically,
 * so only add a city once you have written its own intro, three service angles and local question.
 * Set `published: false` to keep an entry out of the site (and the sitemap) while it is a draft.
 *
 * Career Consultancy works online. These pages describe who we help in each city, never a local office.
 *
 * Fields: slug, name, state, region, popular, nearby[], intro, visa, docs, training, faq{q,a}
 */
export const REGIONS = ['West India', 'South India', 'North India', 'East India', 'Central India'];

export const CITIES = [
  {
    slug: 'pune', name: 'Pune', state: 'Maharashtra', region: 'West India', popular: true,
    nearby: ['mumbai', 'nashik', 'nagpur'],
    intro: 'Pune combines IT services, engineering and manufacturing employers with a large student population, so we hear from both early-career applicants and experienced professionals.',
    visa: 'Many Pune applicants are students planning overseas study and engineers weighing work-visa routes. We help each of them turn the official requirement list into a plain checklist.',
    docs: 'Professionals who have moved between several large employers often need letters from HR teams that have since changed. We help you request them properly and check them for consistency.',
    training: 'With so many software and engineering teams around, learners here usually want practical project work to show alongside a degree. Training discussions start from your current level.',
    faq: { q: 'Can I get help from Pune if I live in a nearby town?', a: 'Yes. Everything is online, so you can enquire from Pune, Pimpri-Chinchwad or a nearby town and get the same written scope, timeline and fee.' },
  },
  {
    slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra', region: 'West India', popular: true,
    nearby: ['pune', 'nashik', 'surat'],
    intro: 'Mumbai has one of the widest mixes of finance, media, shipping and corporate employers in India, which means very different documentation needs from one applicant to the next.',
    visa: 'Business travellers, families joining relatives abroad and finance or services professionals all enquire from Mumbai. We start by working out which visa category fits your purpose.',
    docs: 'Long careers across banks, agencies and large corporates leave many letters spread over several HR departments. We help you map what you hold and what is still missing.',
    training: 'Working professionals in Mumbai often study around long commutes, so evening and weekend online formats are a common request. We discuss schedules before you commit.',
    faq: { q: 'I work long hours in Mumbai. Can everything be done remotely?', a: 'Yes. Consultations, checklists and reviews are online, and we plan around your availability, including evenings where possible.' },
  },
  {
    slug: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', region: 'South India', popular: true,
    nearby: ['mysuru', 'mangaluru', 'coimbatore'],
    intro: 'Bengaluru has a dense concentration of product companies, start-ups and global capability centres, and frequent job changes make clean work-history records especially valuable here.',
    visa: 'Software and data professionals in Bengaluru often explore skilled-worker routes to other countries. We help you read the current official criteria rather than rely on forum summaries.',
    docs: 'Start-ups merge, rename or close, and that can leave a gap in your paperwork. We help you find the right contact for former employers and request records clearly.',
    training: 'Learners here tend to ask for hands-on project work in web, data and cloud topics. We help you choose a track that matches your current skills.',
    faq: { q: 'My former start-up in Bengaluru has shut down. Can you still help?', a: 'We cannot create records for a closed company. We can help you identify what alternative evidence the receiving organisation may accept and ask them to confirm.' },
  },
  {
    slug: 'chennai', name: 'Chennai', state: 'Tamil Nadu', region: 'South India', popular: true,
    nearby: ['coimbatore', 'bengaluru', 'vijayawada'],
    intro: 'Chennai has a long record in automobile manufacturing, IT services and higher education, and many families here have relatives who already live or work abroad.',
    visa: 'Chennai enquiries often involve dependent and family routes as well as study and work. We help you see which documents each relationship category usually needs to show.',
    docs: 'Engineers and manufacturing professionals often hold paperwork from large industrial employers with formal HR processes. We help you ask for exactly what the receiving organisation needs.',
    training: 'Students and graduates in Chennai commonly look for testing, Java and data topics. We help you compare a course-style track with a live project track.',
    faq: { q: 'Can you help a family member in Chennai apply as a dependant?', a: 'We can help you understand the official requirements and organise the documents. Eligibility and the decision rest with the relevant authority.' },
  },
  {
    slug: 'hyderabad', name: 'Hyderabad', state: 'Telangana', region: 'South India', popular: true,
    nearby: ['vijayawada', 'visakhapatnam', 'bengaluru'],
    intro: 'Hyderabad has large technology and pharmaceutical employers and a big base of graduates, so overseas study and skilled-work enquiries are both common.',
    visa: 'Study destinations and work routes are the two topics we are asked about most from Hyderabad. We keep the focus on what the official sources currently say.',
    docs: 'Software and life-sciences professionals often need employment evidence for both new jobs and visa files. We help you check dates and designations before you submit.',
    training: 'Hyderabad learners often combine a day job with study, so we focus on live project formats that fit around work.',
    faq: { q: 'Do you cover both study and work visas for Hyderabad applicants?', a: 'Yes. Each has its own page with the process and the documents we help organise, and you can pick your destination when you enquire.' },
  },
  {
    slug: 'delhi', name: 'Delhi', state: 'Delhi NCR', region: 'North India', popular: true,
    nearby: ['noida', 'gurugram', 'chandigarh'],
    intro: 'Delhi is the base for many embassies, central institutions and corporate headquarters, and people here often need to coordinate several kinds of paperwork at once.',
    visa: 'Applicants in Delhi frequently deal with embassy appointment systems and biometric steps. We explain the sequence, and you complete each official step yourself.',
    docs: 'Careers in government-linked firms, consultancies and large corporates produce formal letters with specific signatories. We help you check they match what the receiving body asks for.',
    training: 'Delhi learners include students, career changers and mid-career professionals. We start by asking what you want to be able to build.',
    faq: { q: 'Are you an embassy or a government agency in Delhi?', a: 'No. Career Consultancy is an independent consultancy. We are not affiliated with any embassy or government body, and we cannot influence decisions.' },
  },
  {
    slug: 'noida', name: 'Noida', state: 'Uttar Pradesh', region: 'North India', popular: true,
    nearby: ['delhi', 'gurugram', 'lucknow'],
    intro: 'Noida has many IT, media and electronics employers close to Delhi, and a large working population that changes jobs regularly.',
    visa: 'Professionals in Noida usually enquire about work and dependent routes. We help you prepare an organised file and a clear timeline.',
    docs: 'Frequent moves between Noida-based companies mean letters from several HR teams. We help you plan which to request first.',
    training: 'Many Noida learners want project experience in web development and testing to support a job switch.',
    faq: { q: 'I live in Noida but studied elsewhere. Does that matter?', a: 'Not for our support. We work online, and we ask where your records were issued so we can point you to the right contact.' },
  },
  {
    slug: 'gurugram', name: 'Gurugram', state: 'Haryana', region: 'North India', popular: true,
    nearby: ['delhi', 'noida', 'chandigarh'],
    intro: 'Gurugram is home to many corporate offices, consulting firms and global business-services teams, so people here often need formal employment evidence.',
    visa: 'Business and work travel, and sometimes relocation, drive Gurugram enquiries. We help you identify the right visa category before you collect documents.',
    docs: 'Employment at large multinational teams usually means standardised HR letters. We help you check that each one carries the details the requester wants.',
    training: 'Professionals here often upskill in data analytics and digital topics. We discuss what suits your current role.',
    faq: { q: 'Is Gurugram a different city from Delhi for your service?', a: 'Our service is the same and fully online. We list Gurugram separately so you can see guidance that reflects the corporate employment context there.' },
  },
  {
    slug: 'kolkata', name: 'Kolkata', state: 'West Bengal', region: 'East India', popular: false,
    nearby: ['bhubaneswar', 'ranchi', 'patna'],
    intro: 'Kolkata has long-established universities, banks and public-sector bodies alongside a growing IT sector, so study and work-history documentation both come up often.',
    visa: 'Many Kolkata applicants are students and researchers planning overseas study. We help organise academic and financial documents against the official list.',
    docs: 'Older, established employers may keep records in formats that take time to retrieve. We help you write a request that gives HR everything needed to find them.',
    training: 'Learners in Kolkata ask about web development and data topics. We help match you to a live project that fits your starting point.',
    faq: { q: 'My earlier employer in Kolkata keeps paper records. Can I still get a letter?', a: 'Often yes, but it can take longer. We help you write a request with your employee details and dates so the issuer can locate your file.' },
  },
  {
    slug: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', region: 'West India', popular: false,
    nearby: ['vadodara', 'surat', 'jaipur'],
    intro: 'Ahmedabad has a strong mix of family-run businesses, manufacturing and a growing technology sector, and many people here travel abroad for business or family reasons.',
    visa: 'Visitor, business and family-related visas are frequent topics from Ahmedabad. We help you document the purpose and ties of the trip accurately.',
    docs: 'Employment at smaller and family-owned firms may have less formal HR paperwork. We help you ask for a clear letter that states your role and dates.',
    training: 'Learners here ask about digital marketing and software testing as routes into new roles. We discuss which track suits your goals.',
    faq: { q: 'I work in a family-run business in Ahmedabad. What proof of employment is accepted?', a: 'That is decided by the organisation asking for it. We help you ask them what they accept and prepare it accurately.' },
  },
  {
    slug: 'jaipur', name: 'Jaipur', state: 'Rajasthan', region: 'North India', popular: false,
    nearby: ['delhi', 'ahmedabad', 'chandigarh'],
    intro: 'Jaipur has a growing IT and services sector alongside tourism, crafts and education, so enquiries range from students to small-business owners.',
    visa: 'Tourist and business visas are common enquiries from Jaipur. We help you read the official requirements and organise supporting documents.',
    docs: 'Professionals who started at smaller employers often need to locate older letters. We help you prepare a clear request.',
    training: 'Jaipur learners often start with web development fundamentals before moving to project work.',
    faq: { q: 'Do you offer training in Hindi for Jaipur learners?', a: 'Language depends on the programme. Tell us your preference in your enquiry and we will confirm what is available before you enrol.' },
  },
  {
    slug: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', region: 'North India', popular: false,
    nearby: ['noida', 'patna', 'delhi'],
    intro: 'Lucknow is a state capital with strong education and administrative sectors and a growing IT presence, so many enquiries involve study planning and employment evidence.',
    visa: 'Students and their families make up much of the visa interest from Lucknow. We help you prepare an organised file for each stage.',
    docs: 'Applicants with experience in public-sector-linked or education employers often need specific letter formats. We help you check the requirements first.',
    training: 'Learners ask about software testing and web development for entry-level roles. We help you pick a first track.',
    faq: { q: 'Can students from Lucknow get guidance on study visa documents?', a: 'Yes. We explain the official checklist for your destination and help you organise documents. Admission and visa decisions remain with the institution and authority.' },
  },
  {
    slug: 'chandigarh', name: 'Chandigarh', state: 'Chandigarh', region: 'North India', popular: false,
    nearby: ['delhi', 'gurugram', 'dehradun'],
    intro: 'Chandigarh and the surrounding region have a long tradition of overseas study and work, so applicants here often have relatives abroad and many questions about family routes.',
    visa: 'Study, work and dependent routes all come up often. We help you separate the official requirements for each so you do not mix up checklists.',
    docs: 'Professionals who have changed sectors, for example from education to IT, need consistent records across very different employers. We help you review them together.',
    training: 'Learners in Chandigarh ask about web and digital marketing tracks. We start from your current skills.',
    faq: { q: 'I have family abroad. Does that change the documents I need?', a: 'It can, depending on the visa category and destination. We help you read the official requirements for family-related routes and prepare accordingly.' },
  },
  {
    slug: 'indore', name: 'Indore', state: 'Madhya Pradesh', region: 'Central India', popular: false,
    nearby: ['bhopal', 'nagpur', 'vadodara'],
    intro: 'Indore is a commercial hub of central India with growing IT parks and a large student community, so training and study-abroad enquiries are both common.',
    visa: 'Study and visitor visas are the most common topics from Indore. We help you build a clear checklist before you start filling forms.',
    docs: 'First-job applicants and early-career professionals often ask how to request their first experience letters. We help you ask clearly and politely.',
    training: 'Many Indore learners are recent graduates who want project work for their portfolio.',
    faq: { q: 'I am a fresher in Indore. Do I need experience documents?', a: 'Only if the organisation asking for them requires it. We help you find out what is needed before you spend time on requests.' },
  },
  {
    slug: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', region: 'Central India', popular: false,
    nearby: ['indore', 'nagpur', 'lucknow'],
    intro: 'Bhopal is a state capital with large public institutions, universities and a modest IT sector, so documentation and study-related enquiries are the most common.',
    visa: 'Students and family applicants ask the most about visas from Bhopal. We help you organise documents against the official list.',
    docs: 'Employment through institutions and contractors can produce letters from more than one party. We help you work out who should issue what.',
    training: 'Learners often start with web development basics and then ask about live projects.',
    faq: { q: 'Can I get a written plan before I commit?', a: 'Yes. For every service we send scope, requirements, timeline and fee in writing before anything starts.' },
  },
  {
    slug: 'nagpur', name: 'Nagpur', state: 'Maharashtra', region: 'Central India', popular: false,
    nearby: ['pune', 'bhopal', 'indore'],
    intro: 'Nagpur is a logistics and education centre in central India, with a growing set of IT and service employers, and many students plan study elsewhere.',
    visa: 'Study visas are the main topic from Nagpur, followed by work and visitor routes. We keep the focus on the official sources for your destination.',
    docs: 'Applicants moving from local employers to larger companies often need to supply formal letters for the first time. We help you request them properly.',
    training: 'Learners here ask about software testing and data topics as routes into IT roles.',
    faq: { q: 'Is online guidance as good as meeting in person in Nagpur?', a: 'For document planning and review, online works well. You share documents securely by email and we go through them with you on a call.' },
  },
  {
    slug: 'nashik', name: 'Nashik', state: 'Maharashtra', region: 'West India', popular: false,
    nearby: ['pune', 'mumbai', 'surat'],
    intro: 'Nashik has manufacturing, agriculture-linked industry and a growing education sector, and its location between Pune and Mumbai means many people work across cities.',
    visa: 'Visitor and study visas are common topics from Nashik. We help you prepare a document file in the order the official list requires.',
    docs: 'If you have worked in more than one city, your records may come from several offices. We help you plan the requests so none is missed.',
    training: 'Learners often start with web and software testing topics and ask about weekend formats.',
    faq: { q: 'I commute between Nashik and Pune. Which city should I select?', a: 'Choose whichever you prefer. The service is the same, and you can mention both in your message.' },
  },
  {
    slug: 'surat', name: 'Surat', state: 'Gujarat', region: 'West India', popular: false,
    nearby: ['vadodara', 'ahmedabad', 'mumbai'],
    intro: 'Surat is known for textiles, diamonds and trade, and many people here travel abroad for business or visit family overseas.',
    visa: 'Business and visitor visas are frequent enquiries from Surat. We help you document the purpose of travel clearly and accurately.',
    docs: 'Many professionals here have worked in trading and manufacturing firms with small HR teams. We help you request clear letters with the details needed.',
    training: 'Digital marketing and web development are the most common training interests we hear from Surat.',
    faq: { q: 'I run my own business in Surat. Can you help with a business visa?', a: 'We can help you understand the official requirements and organise supporting documents. The authority decides on the application.' },
  },
  {
    slug: 'vadodara', name: 'Vadodara', state: 'Gujarat', region: 'West India', popular: false,
    nearby: ['ahmedabad', 'surat', 'indore'],
    intro: 'Vadodara has strong engineering, chemical and university sectors, so technical professionals and students form much of our interest here.',
    visa: 'Study and skilled-work routes lead enquiries from Vadodara. We help you plan the document file and timeline.',
    docs: 'Engineers with experience in large industrial companies often have formal letters. We help you check them for the details a requester wants.',
    training: 'Java and software testing come up often as engineering graduates look for project experience.',
    faq: { q: 'I am an engineering graduate from Vadodara. Where should I start?', a: 'Tell us your goal, such as study abroad, a job switch or a new skill, and we will point you to the right service and first step.' },
  },
  {
    slug: 'kochi', name: 'Kochi', state: 'Kerala', region: 'South India', popular: false,
    nearby: ['thiruvananthapuram', 'coimbatore', 'mangaluru'],
    intro: 'Kerala has a long tradition of working and studying abroad, and Kochi, as a commercial and port city, sees many questions about overseas work and family routes.',
    visa: 'Work visas, dependent visas and study routes are all common from Kochi. We help you separate the requirements for each category.',
    docs: 'Applicants for overseas roles often must show detailed employment history. We help you check your documents for consistent dates and designations.',
    training: 'Learners ask about web and testing topics for IT roles, and about online formats that fit shift work.',
    faq: { q: 'I plan to work overseas from Kochi. How do I prove my experience?', a: 'Through genuine letters and records from your employers. We help you request and review them, and the receiving employer or authority decides what it accepts.' },
  },
  {
    slug: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu', region: 'South India', popular: false,
    nearby: ['bengaluru', 'kochi', 'chennai'],
    intro: 'Coimbatore is an industrial and textile centre with many engineering colleges and a growing IT sector, so technical learners and professionals both ask about our services.',
    visa: 'Study and work routes are common topics from Coimbatore. We help you turn official requirements into a checklist you can follow.',
    docs: 'Professionals from manufacturing and engineering employers often need formal letters with specific details. We help you plan the requests.',
    training: 'Engineering students here look for live project experience in software and data topics.',
    faq: { q: 'Do you offer training for engineering students in Coimbatore?', a: 'Yes. Tell us your branch and goals, and we will share the available tracks, schedule and fee in writing before you decide.' },
  },
  {
    slug: 'visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', region: 'South India', popular: false,
    nearby: ['vijayawada', 'bhubaneswar', 'hyderabad'],
    intro: 'Visakhapatnam is a port and industrial city on the east coast with steel, shipping and a growing IT presence, so maritime and engineering professionals often enquire.',
    visa: 'Work visas for technical and shipping roles and student visas are the leading topics from Visakhapatnam.',
    docs: 'Maritime and industrial employers often issue letters in specific formats. We help you check the details needed for your application.',
    training: 'Graduates ask about web, testing and data topics to move into IT roles.',
    faq: { q: 'I work in shipping in Visakhapatnam. Can you help with employment documents?', a: 'We can help you request and organise genuine letters from your employers. Each issuing company decides what it provides.' },
  },
  {
    slug: 'vijayawada', name: 'Vijayawada', state: 'Andhra Pradesh', region: 'South India', popular: false,
    nearby: ['hyderabad', 'visakhapatnam', 'chennai'],
    intro: 'Vijayawada is a commercial and educational centre in Andhra Pradesh, and its location between Hyderabad and Chennai means many people work or study in other cities.',
    visa: 'Study visas are the most common topic from Vijayawada, followed by dependent routes. We help you prepare documents against the official list.',
    docs: 'If your earlier employers were in other cities, the records may sit with distant HR teams. We help you plan how to reach them.',
    training: 'Learners ask about web development and testing for first IT roles.',
    faq: { q: 'My records are with an employer in another city. Does that matter?', a: 'It can add time, but requests are made by email. We help you write a clear request so the issuer can respond quickly.' },
  },
  {
    slug: 'thiruvananthapuram', name: 'Thiruvananthapuram', state: 'Kerala', region: 'South India', popular: false,
    nearby: ['kochi', 'coimbatore', 'mangaluru'],
    intro: 'Thiruvananthapuram is Kerala’s capital, with a strong technology park, universities and research institutions, so students and IT professionals form much of our interest.',
    visa: 'Study and skilled-work visas are the main topics from Thiruvananthapuram, plus family routes.',
    docs: 'Researchers and IT professionals often need letters that describe roles precisely. We help you check the wording requested.',
    training: 'Learners here often ask about data analytics and web development with a project focus.',
    faq: { q: 'I work at a research institution. What letters can I request?', a: 'That depends on the institution’s policy. We help you write a request and understand what the receiving organisation expects.' },
  },
  {
    slug: 'bhubaneswar', name: 'Bhubaneswar', state: 'Odisha', region: 'East India', popular: false,
    nearby: ['kolkata', 'ranchi', 'visakhapatnam'],
    intro: 'Bhubaneswar is Odisha’s capital, with growing IT and education sectors and many students who plan study or work elsewhere.',
    visa: 'Study visas and work routes are common topics from Bhubaneswar. We help you read the official sources for your destination.',
    docs: 'First-time applicants often ask how to request letters correctly. We help you draft a request with the details HR needs.',
    training: 'Learners ask about testing, web development and data topics to support entry into IT roles.',
    faq: { q: 'Are online services suitable if I live in Odisha away from big cities?', a: 'Yes. Everything is delivered online, so your location does not limit the service.' },
  },
  {
    slug: 'patna', name: 'Patna', state: 'Bihar', region: 'East India', popular: false,
    nearby: ['ranchi', 'lucknow', 'kolkata'],
    intro: 'Patna is a major education and administrative centre in eastern India, so students and competitive-exam aspirants are a large part of its population.',
    visa: 'Study destinations dominate visa interest from Patna. We help you organise academic and financial documents.',
    docs: 'Graduates starting their careers outside Bihar often need to request letters from employers far away. We help you do it clearly.',
    training: 'Learners ask about web development and digital marketing as first career skills.',
    faq: { q: 'I am a student in Patna. Can I start before I have chosen a country?', a: 'Yes. We can help you compare what the official sources require for different destinations before you decide.' },
  },
  {
    slug: 'ranchi', name: 'Ranchi', state: 'Jharkhand', region: 'East India', popular: false,
    nearby: ['patna', 'kolkata', 'bhubaneswar'],
    intro: 'Ranchi is Jharkhand’s capital, with public institutions, universities and an emerging IT sector.',
    visa: 'Students and family applicants ask most about visas from Ranchi. We help you build a checklist from official sources.',
    docs: 'Applicants who worked for public-sector or contractor employers may need letters from more than one party. We help you plan this.',
    training: 'Learners ask about web development and software testing to enter the IT field.',
    faq: { q: 'Can I begin with a short chat to see what I need?', a: 'Yes. Send an enquiry with your goal and we will reply with the likely next steps. There is no charge for asking.' },
  },
  {
    slug: 'dehradun', name: 'Dehradun', state: 'Uttarakhand', region: 'North India', popular: false,
    nearby: ['chandigarh', 'delhi', 'noida'],
    intro: 'Dehradun is a state capital known for its schools, universities and research bodies, and for a growing number of IT and service employers.',
    visa: 'Study and visitor visas are common from Dehradun. We help you prepare documents according to the official requirements.',
    docs: 'Professionals who moved from the hills to larger cities often hold records across several places. We help you gather and organise them.',
    training: 'Learners ask about web development and digital marketing, often with flexible online schedules.',
    faq: { q: 'Is a stable internet connection required?', a: 'For online consultations and training, yes. If connectivity is a concern, tell us and we will discuss options before you commit.' },
  },
  {
    slug: 'mysuru', name: 'Mysuru', state: 'Karnataka', region: 'South India', popular: false,
    nearby: ['bengaluru', 'mangaluru', 'coimbatore'],
    intro: 'Mysuru combines universities, heritage tourism and a growing IT sector close to Bengaluru, so many people here have worked or studied in both cities.',
    visa: 'Study visas and visitor visas are the leading enquiries from Mysuru.',
    docs: 'If you worked in Bengaluru but live in Mysuru, your records may be with a distant HR team. We help you request them by email.',
    training: 'Learners ask about web and data topics, often combining study with a job in Bengaluru.',
    faq: { q: 'I work in Bengaluru but live in Mysuru. Which city should I pick?', a: 'Either is fine. The service is online, and you can mention both in your message.' },
  },
  {
    slug: 'mangaluru', name: 'Mangaluru', state: 'Karnataka', region: 'South India', popular: false,
    nearby: ['mysuru', 'kochi', 'bengaluru'],
    intro: 'Mangaluru is a port city with strong education and healthcare institutions, and many residents have links to the Gulf and other overseas destinations.',
    visa: 'Work and family visas for Gulf and other destinations are frequent topics. We help you read the official requirements for each.',
    docs: 'Healthcare and hospitality professionals often need formal employment letters with specific details. We help you plan the requests.',
    training: 'Learners ask about web development and software testing with flexible schedules.',
    faq: { q: 'I plan to work in the Gulf. Which services are relevant?', a: 'Visa services for the documents and process, and experience document assistance to request your genuine letters. Each destination sets its own rules.' },
  },
];

export const CITY_BY_SLUG = Object.fromEntries(CITIES.map((c) => [c.slug, c]));
export const PUBLISHED_CITIES = CITIES.filter((c) => c.published !== false);
export const POPULAR_CITIES = PUBLISHED_CITIES.filter((c) => c.popular);
export const cityUrl = (slug) => `/cities/${slug}/`;
export const nearbyCities = (city) => city.nearby.map((s) => CITY_BY_SLUG[s]).filter(Boolean);

// Older or alternative spellings people still type, so the city search finds them.
export const CITY_ALIASES = {
  bengaluru: ['bangalore'], gurugram: ['gurgaon'], mumbai: ['bombay'], chennai: ['madras'], kolkata: ['calcutta'],
  mysuru: ['mysore'], mangaluru: ['mangalore'], kochi: ['cochin', 'ernakulam'], vadodara: ['baroda'],
  thiruvananthapuram: ['trivandrum'], visakhapatnam: ['vizag', 'vishakhapatnam'], delhi: ['new delhi'],
};

/** Cities whose name, state or alias contains the typed text. An empty query returns the full list. */
export function searchCities(query, list = PUBLISHED_CITIES) {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((c) => [c.name, c.state, ...(CITY_ALIASES[c.slug] ?? [])].some((t) => t.toLowerCase().includes(q)));
}
