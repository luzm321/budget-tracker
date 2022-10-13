import { useState, useEffect } from "react";

// custom hook:
const useLocalStorage = (key, defaultValue) => {
  // useState accepts the function to initialize it because by default, you want to get the value from local storage; otherwise,
  // code will fall back to the defaultValue
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    // if there's a key in localStorage, use it
    if (jsonValue != null) return JSON.parse(jsonValue);
    // otherwise, use the defaultValue and if it's a function, return calling the defaultValue fxn
    if (typeof defaultValue === "function") {
      return defaultValue();
      // else, just return the default value
    } else {
      return defaultValue;
    }
  });

  // update key and value from local storage whenever the value changes:
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  // get value from local storage:
  return [value, setValue];
};

export default useLocalStorage;
