import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { DEFAULT_FILTERS } from '../data/filters';

const FiltersContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'setQuery':
      return { ...state, query: action.value };
    case 'toggleConnector': {
      const has = state.connectors.includes(action.id);
      return {
        ...state,
        connectors: has
          ? state.connectors.filter((c) => c !== action.id)
          : [...state.connectors, action.id],
      };
    }
    case 'setPower':
      return { ...state, power: action.id };
    case 'toggleAmenity': {
      const has = state.amenities.includes(action.id);
      return {
        ...state,
        amenities: has
          ? state.amenities.filter((a) => a !== action.id)
          : [...state.amenities, action.id],
      };
    }
    case 'setHours':
      return { ...state, hours: action.id };
    case 'toggleOnlyAvailable':
      return { ...state, onlyAvailable: !state.onlyAvailable };
    case 'reset':
      return { ...DEFAULT_FILTERS, query: state.query };
    case 'resetAll':
      return { ...DEFAULT_FILTERS };
    default:
      return state;
  }
}

export function FiltersProvider({ children }) {
  const [filters, dispatch] = useReducer(reducer, DEFAULT_FILTERS);
  const value = useMemo(() => ({ filters, dispatch }), [filters]);
  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error('useFilters deve ser usado dentro de <FiltersProvider>');
  return ctx;
}
