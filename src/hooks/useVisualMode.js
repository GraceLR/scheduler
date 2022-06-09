import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  return {
    mode,
    transition: (newMode, replace = false) => {
      setHistory((prev) => {
        if (!replace) {
          prev.push(newMode);
        }
        setMode((_prev) => newMode);
        return [...prev];
      });
      return { mode };
    },
    back: () => {
      if (history.length > 1) {
        setHistory((prevHistory) => {
          prevHistory.pop();
          setMode((_prev) => prevHistory[prevHistory.length - 1]);
          return [...prevHistory];
        });
      }
      return { mode };
    },
  };
}
