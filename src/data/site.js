// Generated from the original content and then maintained by hand.
// Anything marked CONFIRM must be verified by the business owner before launch.

// Business details. Fields set to null are simply not rendered.
export const SITE = {
  "name": "Career Consultancy",
  "tagline": "Your Next Step Starts Here.",
  "url": "https://careerconsultancy.example",
  "email": "hello@careerconsultancy.example",
  "phone": null,
  "whatsapp": null,
  "address": null,
  "hours": null,
  "socials": [],
  "locale": "en_IN",
  "description": "Career Consultancy is an online consultancy offering experience document assistance, visa application support, online certification guidance and online training.",
  "form_email": "tornacoworking@gmail.com",
  "form_provider": "formsubmit",
  "enquiry_endpoint": "/api/enquiry",
  "feedback_endpoint": "/api/feedback"
};

// Impact numbers and reviews.
// SAMPLE_DATA = true -> shown only in preview/staging builds (with a "Sample data" badge);
// production builds hide the stats and reviews sections until real data is added.
export const SAMPLE_DATA = true;

export const STATS = [
  {
    "value": 1200,
    "suffix": "+",
    "label": "People helped",
    "note": "Across all four services"
  },
  {
    "value": 850,
    "suffix": "+",
    "label": "Visa files prepared",
    "note": "Checklists, forms and reviews"
  },
  {
    "value": 40,
    "suffix": "+",
    "label": "Certification pathways explained",
    "note": "From awarding bodies we have verified"
  },
  {
    "value": 4.8,
    "suffix": "/5",
    "label": "Average rating",
    "note": "From customer feedback"
  }
];

// Count of reviews per star rating. Keep the 'Average rating' stat consistent with this.
export const RATING_BREAKDOWN = {
  "5": 228,
  "4": 30,
  "3": 5,
  "2": 1,
  "1": 1
};

// Genuine, authorised reviews only.
export const TESTIMONIALS = [
  {
    "quote": "They turned the embassy's long requirement list into a simple checklist for my situation. I knew exactly what to gather and in what order.",
    "name": "Priya S.",
    "context": "Work visa applicant",
    "rating": 5,
    "service": "visa-services"
  },
  {
    "quote": "My old company had changed HR teams twice. Career Consultancy helped me write a clear request and my relieving letter arrived within two weeks.",
    "name": "Rahul M.",
    "context": "IT professional, job switch",
    "rating": 5,
    "service": "experience-documents"
  },
  {
    "quote": "I was about to pay for a certificate nobody could verify. They showed me how to check the awarding body and suggested a better option.",
    "name": "Ananya K.",
    "context": "Career changer",
    "rating": 5,
    "service": "online-certifications"
  },
  {
    "quote": "Evening sessions fitted around my job, and I had the syllabus and fee in writing before I enrolled. No surprises.",
    "name": "Vikram D.",
    "context": "Working professional",
    "rating": 4,
    "service": "online-training"
  },
  {
    "quote": "Clear answers, quick replies on WhatsApp, and they were honest about what they could not promise. That made me trust them.",
    "name": "Sneha R.",
    "context": "Student visa applicant",
    "rating": 5,
    "service": "visa-services"
  },
  {
    "quote": "Every date and designation on my documents was checked before I submitted. The file they organised looked professional.",
    "name": "Arjun P.",
    "context": "Overseas job applicant",
    "rating": 5,
    "service": "experience-documents"
  }
];

// Confirmed training programmes only: { name, format, duration, schedule, fee, summary }
export const TRAINING_PROGRAMMES = [];
