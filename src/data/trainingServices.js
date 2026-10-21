/*
 * Training tracks. Topics were checked against dreamsoftconsultancy.in/online-training
 * (web development, data science, software testing, digital marketing, plus the technology list there).
 * CONFIRM with the owner before launch: Java is listed in the reference only as the language used with
 * Selenium testing, and the duration, schedule, trainer and fee of every track (see TRAINING_PROGRAMMES in site.js).
 * No track promises a job, certificate or placement.
 */

export const TRAINING_FORMATS = [
  { name: 'Online live sessions', text: 'Join trainer-led sessions from home.' },
  { name: 'Offline classroom', text: 'Where a classroom batch is available. Confirm in your enquiry.' },
  { name: 'Hybrid', text: 'A mix of online and in-person sessions where offered.' },
  { name: '1:1 mentorship', text: 'Individual guidance on your own project or learning gaps.' },
];

export const COURSE_VS_PROJECT = [
  {
    title: 'Course training',
    points: ['Step-by-step learning from fundamentals upward', 'Trainer-led sessions on a defined curriculum', 'Assignments and practice exercises', 'Best when you are new to the topic'],
  },
  {
    title: 'Live project training',
    points: ['Work on a realistic, industry-style project', 'Practise real problem-solving, not only exercises', 'Mentor feedback while you build', 'Produces work you can describe in a portfolio or CV'],
  },
];

export const TRAINING_SUBSERVICES = [
  {
    slug: 'web-development', parent: 'online-training', icon: 'code', name: 'Full-Stack Web Development',
    domain: 'Web Development',
    short: 'Frontend, backend and deployment, ending in a live e-commerce style project.',
    title: 'Full-Stack Web Development Training | Career Consultancy',
    meta: 'Discuss full-stack web development training and a live project covering HTML, CSS, JavaScript, React, Node.js, PHP and MySQL. No job guarantees.',
    h1: 'Full-stack web development training',
    intro: 'Web development is the most requested track we hear about. It covers building the visible side of a site, the server and database behind it, and putting it online. The project track has you build and deploy a working e-commerce style application with mentor feedback.',
    audience: ['Students and graduates building a first portfolio', 'Career changers moving towards development work', 'Working professionals who want practical project experience'],
    topics: ['HTML, CSS and responsive layout', 'JavaScript fundamentals', 'React for building interfaces', 'Node.js and PHP on the server', 'MySQL databases (MongoDB also listed by the reference)', 'Deployment basics'],
    project: 'A live e-commerce style project covering product listing, a basket, user flows and deployment.',
    process: [
      { title: 'Tell us your level', text: 'Share what you already know and what you want to be able to build.' },
      { title: 'Choose course or project', text: 'We explain whether a course-style track or a live project suits you now.' },
      { title: 'Receive details in writing', text: 'You get syllabus, schedule, trainer, format and fee before enrolling.' },
      { title: 'Learn and build', text: 'You attend sessions, complete practice and build your project with mentor feedback.' },
    ],
    notIncluded: ['A guaranteed job or placement', 'Employer references you did not earn', 'Pretending project work was paid employment'],
    faqs: [
      { q: 'I am a complete beginner. Is this suitable?', a: 'Often yes, starting with the course-style track. We ask your level first and tell you honestly if prerequisites would help.' },
      { q: 'Will I get a job after the training?', a: 'No one can promise that. You finish with practical work and feedback, and your results depend on your effort and the market.' },
      { q: 'Can I describe the project on my CV?', a: 'Yes, as a training project or portfolio piece. It must never be described as paid employment.' },
    ],
  },
  {
    slug: 'java', parent: 'online-training', icon: 'cup', name: 'Java Development',
    domain: 'Java Development',
    short: 'Core Java and its use in application and automation work. Programme details to be confirmed.',
    title: 'Java Training Enquiry | Career Consultancy',
    meta: 'Discuss Java training, including core Java and Java for software testing automation with Selenium. Details confirmed in writing before enrolment.',
    h1: 'Java training',
    intro: 'Java is widely used for business applications and for test automation. The reference training programme lists Java alongside Selenium for testing, and we can discuss a Java track around your goal: general application development or automation. The exact programme is confirmed in writing before you enrol.',
    audience: ['Engineering graduates strengthening a core language', 'Testers who want to automate with Selenium and Java', 'Professionals moving between technology stacks'],
    topics: ['Core Java: syntax, objects and collections', 'Writing and structuring small applications', 'Java with Selenium for browser automation', 'Bug tracking with JIRA', 'Reading and debugging code'],
    project: 'A small practical project agreed with the trainer, such as an automation suite for a sample web application.',
    process: [
      { title: 'Share your goal', text: 'Tell us whether you want development, automation or both.' },
      { title: 'Confirm what is available', text: 'We confirm the current syllabus, format and trainer in writing; this track is subject to owner confirmation.' },
      { title: 'Enrol if it fits', text: 'You decide after seeing the details and fee.' },
      { title: 'Practise with feedback', text: 'You work through exercises and a project with trainer feedback.' },
    ],
    notIncluded: ['A guaranteed job or placement', 'Certification unless the details say who issues it', 'Fees or schedules not shown in writing'],
    faqs: [
      { q: 'Is Java a standalone programme?', a: 'We will confirm this when you enquire. The reference lists Java mainly in the testing track, so we state what is currently offered rather than assume.' },
      { q: 'Do I need prior coding experience?', a: 'It helps but is not always needed. We ask about your background and suggest a starting point.' },
      { q: 'Will I get a certificate?', a: 'If a certificate is offered, we tell you who issues it and what it represents before you enrol.' },
    ],
  },
  {
    slug: 'data-analytics', parent: 'online-training', icon: 'chart', name: 'Data Science and Analytics',
    domain: 'Data Science and Analytics',
    short: 'Python, Pandas, NumPy, Tableau, Power BI and machine-learning basics, with a capstone project.',
    title: 'Data Science and Analytics Training | Career Consultancy',
    meta: 'Discuss data science and analytics training: Python, Pandas, NumPy, Tableau, Power BI and machine learning, with a capstone project. No job guarantees.',
    h1: 'Data science and analytics training',
    intro: 'Data roles ask you to clean data, find patterns and present them clearly. This track covers Python with Pandas and NumPy, dashboards in Tableau or Power BI, and an introduction to machine-learning models, and finishes with a capstone project.',
    audience: ['Graduates and analysts who want practical skills', 'Professionals in operations, finance or marketing who work with data', 'Career changers exploring analytics'],
    topics: ['Python for data work', 'Pandas and NumPy', 'Visualisation with Tableau and Power BI', 'Introduction to machine-learning models', 'SQL (listed by the reference among related technologies)'],
    project: 'A capstone project where you analyse a realistic dataset and present your findings.',
    process: [
      { title: 'Share your background', text: 'Tell us your current role, tools used and what you want to do with data.' },
      { title: 'Pick a starting point', text: 'We suggest fundamentals first or going straight to a project.' },
      { title: 'Get the details', text: 'You receive syllabus, schedule, tools used and fee in writing.' },
      { title: 'Analyse and present', text: 'You work through exercises and complete the capstone with feedback.' },
    ],
    notIncluded: ['A guaranteed job or placement', 'Software licences unless stated', 'Claims of expertise you have not built'],
    faqs: [
      { q: 'Do I need strong maths?', a: 'Basic comfort with numbers helps. We ask about your background and explain where extra preparation would help.' },
      { q: 'Which tool should I learn, Tableau or Power BI?', a: 'It depends on the jobs you aim for. We can discuss both and what the track currently covers.' },
      { q: 'Is the machine-learning part advanced?', a: 'It is an introduction to building and evaluating models, not a research-level course.' },
    ],
  },
  {
    slug: 'software-testing', parent: 'online-training', icon: 'bug', name: 'Software Testing and Automation',
    domain: 'Software Testing and Automation',
    short: 'Manual testing, Selenium automation with Java or Python, JIRA and a live test-suite project.',
    title: 'Software Testing and Automation Training | Career Consultancy',
    meta: 'Discuss software testing training: manual testing, Selenium automation with Java or Python, JIRA and a live test-suite project. No job guarantees.',
    h1: 'Software testing and automation training',
    intro: 'Testing is a practical entry point into software teams. You learn how to design test cases by hand, automate browser checks with Selenium and track defects in JIRA, then build a live test suite for a sample application.',
    audience: ['Graduates looking for a way into software teams', 'Manual testers who want to automate', 'Developers who want stronger testing habits'],
    topics: ['Manual testing concepts and test design', 'Selenium with Java or Python', 'Bug tracking with JIRA', 'Writing a maintainable test suite'],
    project: 'A live test-suite project for a realistic web application.',
    process: [
      { title: 'Share your level', text: 'Tell us if you are new to testing or already test manually.' },
      { title: 'Choose a language', text: 'Select Java or Python for automation, depending on your goals.' },
      { title: 'Receive the plan', text: 'You get syllabus, schedule and fee in writing.' },
      { title: 'Test and automate', text: 'You practise on real flows and finish with a documented test suite.' },
    ],
    notIncluded: ['A guaranteed job or placement', 'A promise of a particular salary', 'Employer references you did not earn'],
    faqs: [
      { q: 'Do I need to know how to code?', a: 'Not for the manual part. Automation uses Java or Python, and we start from the basics you need.' },
      { q: 'Is testing a good first role?', a: 'It can be a practical start, but outcomes depend on the market and your effort. We make no promises.' },
      { q: 'Can I add it to my portfolio?', a: 'Yes, as a training project, labelled honestly.' },
    ],
  },
  {
    slug: 'digital-marketing', parent: 'online-training', icon: 'megaphone', name: 'Digital Marketing',
    domain: 'Digital Marketing',
    short: 'SEO, Google Ads, social advertising, email and analytics, ending in a live campaign.',
    title: 'Digital Marketing Training | Career Consultancy',
    meta: 'Discuss digital marketing training: SEO, Google Ads, Facebook Ads, content, email campaigns and analytics, with a live campaign project. No job guarantees.',
    h1: 'Digital marketing training',
    intro: 'Digital marketing blends search, paid campaigns, content and measurement. This track covers each of them and ends with a live campaign project where you plan, run and report on a small campaign.',
    audience: ['Graduates and career changers entering marketing', 'Small-business owners who market their own business', 'Marketers who want hands-on campaign practice'],
    topics: ['Search engine optimisation (SEO)', 'Google Ads and Facebook Ads', 'Content marketing and email campaigns', 'Google Analytics', 'WordPress basics (listed by the reference)'],
    project: 'A live campaign project where you plan, run and report on a small campaign.',
    process: [
      { title: 'Share your aim', text: 'Tell us whether you want a job, a freelance skill or to grow your business.' },
      { title: 'Choose a focus', text: 'We suggest where to start: search, paid ads or content.' },
      { title: 'Get the details', text: 'Syllabus, schedule and fee come in writing, including any ad spend you would pay.' },
      { title: 'Plan and report', text: 'You build a campaign and report on its results with mentor feedback.' },
    ],
    notIncluded: ['Guaranteed rankings, followers or sales', 'A guaranteed job or placement', 'Ad budgets unless stated'],
    faqs: [
      { q: 'Will I pay for ads during the project?', a: 'That depends on the project design. Any ad spend is stated in writing before you enrol.' },
      { q: 'Can I use this for my own business?', a: 'Yes. Tell us your business and we can discuss using it as your project.' },
      { q: 'Is a Google Analytics certification included?', a: 'The reference mentions it. We confirm what is currently included, and who issues any certificate, before you enrol.' },
    ],
  },
];
