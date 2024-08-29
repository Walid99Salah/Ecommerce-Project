import { createContext, useState } from "react";

export let CounterContext = createContext(0);

export default function CounterContextProvider({ children }) {
  const [count, setCount] = useState(0);

  function changeCount() {
    setCount(Math.random);
  }

  return (
    <CounterContext.Provider value={{ count, setCount, changeCount }}>
      {children}
    </CounterContext.Provider>
  );
}
