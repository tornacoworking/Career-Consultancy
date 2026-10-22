/* Small inline icon set (24px grid, stroke icons). Decorative: always aria-hidden. */
const PATHS = {
  graduation: 'M2 9l10-5 10 5-10 5L2 9zm4 3.5V17c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6',
  briefcase: 'M3 8h18v11H3zM8 8V6a1 1 0 011-1h6a1 1 0 011 1v2M3 13h18',
  plane: 'M21 3L3 10.5l6.5 2.5L12 20l2.5-6.5L21 3zM9.5 13L21 3',
  building: 'M5 21V4h9v17M14 9h5v12M2 21h20M8 8h2M8 12h2M8 16h2',
  home: 'M3 11l9-8 9 8M5 10v11h14V10M10 21v-6h4v6',
  family: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20v-1a5 5 0 0110 0v1M17 12a2.5 2.5 0 100-5M16 20v-1a4 4 0 014-4',
  code: 'M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM8.5 12l2.5 2.5L16 9.5',
  cup: 'M5 9h11v5a4 4 0 01-4 4H9a4 4 0 01-4-4V9zM16 10h2a2 2 0 010 4h-2M8 4v2M12 4v2',
  chart: 'M4 20V10M10 20V4M16 20v-8M22 20H2',
  bug: 'M9 7a3 3 0 016 0M7 10h10v5a5 5 0 01-10 0v-5zM3 12h4M17 12h4M4 19l3-2M20 19l-3-2M4 6l3 2M20 6l-3 2',
  megaphone: 'M4 10v4h3l7 4V6L7 10H4zM17 9a4 4 0 010 6',
  pin: 'M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  search: 'M11 18a7 7 0 100-14 7 7 0 000 14zM21 21l-5-5',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  close: 'M6 6l12 12M18 6L6 18',
  file: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
  cert: 'M5 4h14v11H5zM9 20l3-2 3 2v-5H9zM8 8h8M8 11h5',
};

export default function Icon({ name, size = 24, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={PATHS[name] ?? PATHS.file} />
    </svg>
  );
}
