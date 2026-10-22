/*
 * Shared, in-memory state for the whole site:
 *  - the city the visitor has chosen (a city name is not personal data, and nothing is persisted);
 *  - the consultation modal, which any call-to-action can open with fields prefilled.
 */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import ConsultationModal from '../components/ConsultationModal.jsx';

const ConsultContext = createContext(null);

export function ConsultProvider({ children }) {
  const [city, setCity] = useState(null);
  const [modal, setModal] = useState(null);

  const openConsult = useCallback((prefill = {}) => {
    const given = Object.fromEntries(Object.entries(prefill).filter(([, v]) => v));
    setModal((m) => ({ prefill: { city, ...given }, key: (m?.key ?? 0) + 1 }));
  }, [city]);
  const closeConsult = useCallback(() => setModal(null), []);

  const value = useMemo(() => ({ city, setCity, openConsult }), [city, openConsult]);
  return (
    <ConsultContext.Provider value={value}>
      {children}
      <ConsultationModal state={modal} onClose={closeConsult} />
    </ConsultContext.Provider>
  );
}

export const useConsult = () => useContext(ConsultContext);
