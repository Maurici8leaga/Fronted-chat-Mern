// este es un custom HOOKs para el localStorage
import { useState, useEffect } from 'react';

// este hook es es para hacer una funcion que genere una especie de pausa para asi reducir la cantidad de request a la api
// y no saturar de request, entonces al colocar un timer este hace que cuando el usuario coloque una letra termine de buscar
//  la frase completa y no letra por letra

const useDebounce = (value, delay) => {
  // parametros:
  // value= a el valor a enviar a buscar, palabra letra etc
  // delay= es el tiempo que se desee, igual se coloca un tiempo por defecto
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay || 500);

    return () => {
      // para limpiar los procesos de l useEffect se borra el timeout para que no se repita
      clearTimeout(timer);
    };
  }, [delay, value]);

  return debounceValue;
};

export default useDebounce;
