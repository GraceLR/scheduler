import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
  
    return { 
        mode, 
        transition: (newMode, replace = false) => {
            setHistory(prev => {
                if (!replace) {
                    prev.push(newMode);
                }
                setMode(_prev => newMode);
                return [...prev];
            });
            return { mode };
        },
        back: () => {
            if (history.length > 1) {
                setHistory(prev => {
                    prev.pop();
                    setMode(_prev => prev[prev.length - 1]);
                    return [...prev];
                });
            }
            return { mode };
        }
    };
  }