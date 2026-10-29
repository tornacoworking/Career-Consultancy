/*
 * Real time project training tracks.
 * CONFIRM with the owner before launch: whether Java runs as its own track, and the duration, schedule,
 * trainer and fee of every track (see TRAINING_PROGRAMMES in site.js).
 * No track promises a job, certificate or placement, and project work is always described as training.
 */

export const TRAINING_FORMATS = [
  { name: 'Online live sessions', text: 'Join trainer-led sessions from home and ask questions as they happen.' },
  { name: 'Offline classroom', text: 'Where a classroom batch is available. Confirm in your enquiry.' },
  { name: 'Hybrid', text: 'A mix of online and in-person sessions where offered.' },
  { name: '1:1 mentorship', text: 'Individual guidance on your own project or on specific gaps.' },
];

export const COURSE_VS_PROJECT = [
  {
    title: 'Course first',
    points: ['Step-by-step lessons from fundamentals upward', 'Trainer-led sessions on a defined syllabus', 'Short assignments to check each topic', 'Best when the subject is new to you'],
  },
  {
    title: 'Real time project',
    points: ['A realistic brief with milestones and deliverables', 'Practice solving problems you have not seen before', 'Mentor review at every milestone', 'A finished piece you can describe in a CV or interview'],
  },
];

export const TRAINING_SUBSERVICES = [
  {
    slug: 'web-development', parent: 'real-time-project-training', icon: 'code', name: 'Full-Stack Web Development',
    domain: 'Web Development',
    short: 'Build and deploy a working online shop, from the page layout to the database behind it.',
    title: 'Full-Stack Web Development Project Training | Career Consultancy',
    meta: 'Learn full-stack web development by building and deploying a real e-commerce style project with mentor feedback. No job guarantees.',
    h1: 'Full-stack web development project training',
    intro: 'Web development is easiest to understand when you have built something that works. In this track you create the screens people see, the server that powers them and the database that stores the data, then put the finished application online. A trainer reviews your progress at each stage.',
    audience: ['Students and graduates who want a first portfolio project', 'Career changers moving towards development roles', 'Working professionals who want to build, not just read about, a full application'],
    topics: ['HTML, CSS and responsive layouts', 'JavaScript fundamentals', 'Building interfaces with React', 'Server-side work with Node.js or PHP', 'Databases such as MySQL and MongoDB', 'Deploying your application online'],
    project: 'An e-commerce style application with product listings, a basket, user accounts and a live deployment.',
    process: [
      { title: 'Tell us your level', text: 'Share what you already know and what you would like to be able to build.' },
      { title: 'Pick your starting point', text: 'We explain whether to begin with the foundations or move straight into the project.' },
      { title: 'Receive details in writing', text: 'You get the syllabus, project brief, schedule, trainer and fee before you enrol.' },
      { title: 'Build with feedback', text: 'You work through the project in stages and a trainer reviews each one.' },
    ],
    notIncluded: ['A guaranteed job or placement', 'Employer references you did not earn', 'Describing project work as paid employment'],
    faqs: [
      { q: 'I am a complete beginner. Is this suitable?', a: 'Often yes, after a foundation stage. We ask your level first and tell you honestly if some preparation would help.' },
      { q: 'Will I get a job after the training?', a: 'No one can promise that. You finish with practical work and feedback; what follows depends on your effort and the job market.' },
      { q: 'Can I put the project on my CV?', a: 'Yes, as a training project or portfolio piece. It must never be presented as paid employment.' },
    ],
  },
  {
    slug: 'java', parent: 'real-time-project-training', icon: 'cup', name: 'Java Development',
    domain: 'Java Development',
    short: 'Core Java and its use in business applications and test automation, applied to a practical project.',
    title: 'Java Project Training Enquiry | Career Consultancy',
    meta: 'Discuss Java project training, from core Java to Java for test automation with Selenium. Details confirmed in writing before you enrol.',
    h1: 'Java project training',
    intro: 'Java sits behind a great deal of business software and is a common choice for automated testing. Tell us whether you want to build applications, automate tests or do both, and we will describe what the current track covers. The exact programme is confirmed in writing before you enrol.',
    audience: ['Engineering graduates strengthening a core language', 'Testers who want to automate with Selenium and Java', 'Professionals moving between technology stacks'],
    topics: ['Core Java: syntax, classes and collections', 'Structuring and debugging small applications', 'Java with Selenium for browser automation', 'Tracking defects in JIRA'],
    project: 'A small project agreed with your trainer, such as an automation suite for a sample web application.',
    process: [
      { title: 'Share your goal', text: 'Tell us whether you want development, automation or both.' },
      { title: 'Confirm what is available', text: 'We confirm the current syllabus, format and trainer in writing.' },
      { title: 'Enrol if it fits', text: 'You decide after seeing the details and the fee.' },
      { title: 'Practise with feedback', text: 'You work through exercises and a project while a trainer reviews your code.' },
    ],
    notIncluded: ['A guaranteed job or placement', 'A certificate unless the details say who issues it', 'Fees or schedules not shown in writing'],
    faqs: [
      { q: 'Is Java offered as a separate programme?', a: 'We confirm what is currently running when you enquire, so that you are told the actual position rather than a general promise.' },
      { q: 'Do I need prior coding experience?', a: 'It helps but is not always required. We ask about your background and suggest a starting point.' },
      { q: 'Will I get a certificate?', a: 'If a certificate is offered, we tell you who issues it and what it represents before you enrol.' },
    ],
  },
  {
    slug: 'data-analytics', parent: 'real-time-project-training', icon: 'chart', name: 'Data Science and Analytics',
    domain: 'Data Science and Analytics',
    short: 'Clean real datasets, find patterns and present them in a dashboard, using Python, Tableau and Power BI.',
    title: 'Data Science and Analytics Project Training | Career Consultancy',
    meta: 'Learn data science and analytics on a capstone project: Python, Pandas, NumPy, Tableau, Power BI and machine-learning basics. No job guarantees.',
    h1: 'Data science and analytics project training',
    intro: 'Data work is mostly about turning untidy numbers into something a decision-maker can use. In this track you take a realistic dataset from raw files to clean tables, charts and a short model, and finish by presenting what you found.',
    audience: ['Graduates and analysts who want practical skills', 'Professionals in operations, finance or marketing who work with data', 'Career changers exploring analytics'],
    topics: ['Python for data work', 'Pandas and NumPy for cleaning and analysis', 'Dashboards in Tableau and Power BI', 'SQL for querying data', 'An introduction to machine-learning models'],
    project: 'A capstone where you analyse a realistic dataset, build visuals and present your conclusions.',
    process: [
      { title: 'Share your background', text: 'Tell us your current role, the tools you use and what you want to do with data.' },
      { title: 'Choose a starting point', text: 'We suggest the fundamentals first or going straight to a project.' },
      { title: 'Get the details', text: 'You receive the syllabus, schedule, tools and fee in writing.' },
      { title: 'Analyse and present', text: 'You work through exercises, complete the capstone and present it for feedback.' },
    ],
    notIncluded: ['A guaranteed job or placement', 'Software licences unless stated', 'Claims of expertise you have not built'],
    faqs: [
      { q: 'Do I need strong maths?', a: 'Comfort with basic numbers helps. We ask about your background and explain where extra preparation would be useful.' },
      { q: 'Should I learn Tableau or Power BI?', a: 'It depends on the roles you are aiming for. We can talk through both and what the track currently covers.' },
      { q: 'Is the machine-learning part advanced?', a: 'It is an introduction to building and checking simple models, not a research-level course.' },
    ],
  },
  {
    slug: 'software-testing', parent: 'real-time-project-training', icon: 'bug', name: 'Software Testing and Automation',
    domain: 'Software Testing and Automation',
    short: 'Design test cases, automate them with Selenium and log defects in JIRA on a live test-suite project.',
    title: 'Software Testing and Automation Project Training | Career Consultancy',
    meta: 'Learn software testing on a live test-suite project: manual testing, Selenium automation with Java or Python, and JIRA. No job guarantees.',
    h1: 'Software testing and automation project training',
    intro: 'Testers are the people who find problems before customers do. This track teaches you to plan tests by hand, automate repetitive checks with Selenium and report defects clearly in JIRA, and then asks you to build a test suite for a sample application.',
    audience: ['Graduates looking for a way into software teams', 'Manual testers who want to learn automation', 'Developers who want stronger testing habits'],
    topics: ['Manual testing and test-case design', 'Selenium with Java or Python', 'Defect tracking in JIRA', 'Building a test suite that others can maintain'],
    project: 'A live test-suite project for a realistic web application, with documented results.',
    process: [
      { title: 'Share your level', text: 'Tell us whether you are new to testing or already test by hand.' },
      { title: 'Choose a language', text: 'Pick Java or Python for the automation part, depending on your goals.' },
      { title: 'Receive the plan', text: 'You get the syllabus, schedule and fee in writing.' },
      { title: 'Test and automate', text: 'You test real flows and finish with a documented, working suite.' },
    ],
    notIncluded: ['A guaranteed job or placement', 'A promise of a particular salary', 'Employer references you did not earn'],
    faqs: [
      { q: 'Do I need to know how to code?', a: 'Not for the manual part. Automation uses Java or Python, and we begin with the basics you need.' },
      { q: 'Is testing a good first role?', a: 'It can be a practical way in, but outcomes depend on the market and your effort. We make no promises.' },
      { q: 'Can I add the project to my portfolio?', a: 'Yes, labelled honestly as a training project.' },
    ],
  },
  {
    slug: 'digital-marketing', parent: 'real-time-project-training', icon: 'megaphone', name: 'Digital Marketing',
    domain: 'Digital Marketing',
    short: 'Plan, run and report on a small campaign across search, paid ads, content and email.',
    title: 'Digital Marketing Project Training | Career Consultancy',
    meta: 'Learn digital marketing on a live campaign project: SEO, Google Ads, social ads, content, email and analytics. No job guarantees.',
    h1: 'Digital marketing project training',
    intro: 'Digital marketing combines search, paid advertising, content and measurement. This track covers each in turn and ends with you planning, running and reporting on a small campaign of your own, so you understand what the numbers mean.',
    audience: ['Graduates and career changers entering marketing', 'Small-business owners who market their own business', 'Marketers who want hands-on campaign practice'],
    topics: ['Search engine optimisation (SEO)', 'Google Ads and social media advertising', 'Content and email marketing', 'Google Analytics and reporting', 'WordPress basics'],
    project: 'A live campaign that you plan, launch and report on, with mentor feedback.',
    process: [
      { title: 'Share your aim', text: 'Tell us whether you want a job, a freelance skill or to grow your own business.' },
      { title: 'Choose a focus', text: 'We suggest where to start: search, paid ads or content.' },
      { title: 'Get the details', text: 'The syllabus, schedule and fee come in writing, including any ad spend you would pay.' },
      { title: 'Plan and report', text: 'You build a campaign and report its results to your mentor.' },
    ],
    notIncluded: ['Guaranteed rankings, followers or sales', 'A guaranteed job or placement', 'Ad budgets unless stated'],
    faqs: [
      { q: 'Will I pay for ads during the project?', a: 'That depends on how the project is designed. Any ad spend is stated in writing before you enrol.' },
      { q: 'Can I use my own business as the project?', a: 'Yes. Tell us about it and we can discuss using it as your campaign.' },
      { q: 'Is a Google Analytics certificate included?', a: 'We confirm what is currently included, and who issues any certificate, before you enrol.' },
    ],
  },
];
