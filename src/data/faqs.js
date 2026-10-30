/*
 * FAQs that are assembled from data rather than written per page.
 * City pages get one question written for that city (cities.js) plus these shared ones,
 * with the city name filled in only where it changes the meaning of the answer.
 */

export const cityFaqs = (city) => [
  city.faq,
  {
    q: `Can you guarantee a visa, document or job for someone in ${city.name}?`,
    a: 'No. Visa decisions rest with the destination authority, documents are issued only by your real employers, and training does not guarantee a job. We help you prepare accurately.',
  },
  {
    q: 'What do I pay, and when?',
    a: 'Asking a question is free. If you go ahead, scope, timeline and our fee are sent in writing first, with any official or third-party fees shown separately.',
  },
];

export const destinationFaq = (destination) => ({
  q: `What should I know about applying for ${destination.name}?`,
  a: `Requirements and processing are set by ${destination.authority} and change over time. We help you read its current published information and organise your documents. We do not quote fees, timelines or eligibility from memory.`,
});
