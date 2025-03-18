import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    // Boa abordagem para iniciar valores de localStorage!
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    // Quando abordamos dessa forma, esse Effect vai funcionar tanto
    // quanto um setter de valor, quanto para um delete também, pois
    // no ato de deletar, o novo array será substituído sem o valor designado.
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
