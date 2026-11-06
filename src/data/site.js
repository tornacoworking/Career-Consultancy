// Generated from the original content and then maintained by hand.
// Anything marked CONFIRM must be verified by the business owner before launch.

// Business details. Fields set to null are simply not rendered.
export const SITE = {
  "name": "Career Consultancy",
  "tagline": "Your Next Step Starts Here.",
  "url": "https://careerconsultancy.example",
  "email": "Expletteracademy@gmail.com",
  "phone": "+91 92848 72656",
  "whatsapp": "919284872656", // digits only, country code first (same number as the phone above)
  "address": null,
  "branch": null,
  "hours": null,
  "socials": [],
  "locale": "en_IN",
  "description": "Career Consultancy is an online consultancy offering genuine experience certificate assistance, visa documentation support and real time project training.",
  "form_email": "tornacoworking@gmail.com",
  "form_provider": "formsubmit",
  "enquiry_endpoint": "/api/enquiry",
  "feedback_endpoint": "/api/feedback"
};

// Impact numbers and reviews.
// We are launching online for the first time (earlier clients were served in person), so there are NO
// ratings, review counts or testimonials yet, and none may be invented. The home page shows these sections
// only when a list below has real entries. When you have genuine, permitted reviews or numbers, add them here:
//   STATS:        { value: 25, suffix: '+', label: 'Clients helped', note: '...' }
//   TESTIMONIALS: { quote, name, avatar (file in public/images/avatars), when, context, rating, service }
//   RATING_BREAKDOWN / GOOGLE_RATING: fill in from your real Google Business Profile.
export const SAMPLE_DATA = false;

export const STATS = [];

// Count of reviews per star rating. Keep any 'Average rating' stat consistent with this.
export const RATING_BREAKDOWN = { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 };

// Leave `url` empty until you have a real Google Business Profile.
export const GOOGLE_RATING = { rating: 0, url: '' };

export const TESTIMONIALS = [];

// Confirmed training programmes only: { name, format, duration, schedule, fee, summary }
export const TRAINING_PROGRAMMES = [];
