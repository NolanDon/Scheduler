import { useState } from 'react';

export default function useVisualMode(value) {
  const [mode, newMode] = useState(value);
  const [history, setHistory] = useState([]);

  function transition(value, last) {
    if (!last) {
      setHistory(prev => [...prev, mode])
    }
    newMode(value)
  }
    function previous(mode) {
      if (history.length > 1) {
        newMode([history.length - 1]);
        setHistory(prev => [...prev.slice(0, -1)]);
      };
    };
    return { transition, mode, previous };
};

