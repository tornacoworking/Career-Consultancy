import { SAMPLE_DATA } from '../data/site.js';

/** Sample stats/reviews are shown in preview and staging builds only (see README). */
export const SHOW_SAMPLE_SECTIONS =
  !SAMPLE_DATA || import.meta.env.VITE_SHOW_SAMPLES === 'true' || import.meta.env.VITE_PREVIEW === 'true';

/** Build date, used for 'last updated' lines and structured data. */
export const BUILD_DATE = new Date().toISOString().slice(0, 10);
