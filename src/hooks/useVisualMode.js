import { useState } from "react";

export default function useVisualMode(e) {
  const [mode, setMode] = useState(e);
  const [history, setHistory] = useState([e]);
  
  function transition(mode, replace = false) {  
    
    if (replace) {
      setMode(e => (mode)) 
      setHistory([history[0], mode])
    } else {
      setMode(e => (mode)) 
      setHistory([...history, mode])
    };
  };
  
  function back(mode) { 
    if (history.length > 1) {
      history.splice(history.length -1)
      setMode(mode =>(history[history.length-1])) 
    };
  };

  return {mode, transition, back };
};