import { useEffect, useState } from "react";

// Works like useState, but keeps the value in localStorage so
// projects added through the form survive a page refresh.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be full or blocked; the app still works without it.
    }
  }, [key, value]);

  return [value, setValue];
}
