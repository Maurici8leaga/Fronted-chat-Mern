// este es un custom HOOKs para el localStorage
import { useRef, useEffect } from 'react';

// este es para realizar llamadas 1 sola vez, por ejemplo cuando el user entra por 1ra vez a la pag y carga todos los post,
// si no ha habido un cambio este solo cargue 1 sola vez si cambia algo este se ejecuta de nuevo
const useEffectOnce = (callback) => {
  // Vamos a definir una referencia de estado llamada calledOnce como false
  const calledOnce = useRef(false);
  // 'useRef' es un hook de react que permite capturar el valor del elemento en el que es aplicado

  // Vamos a ejecutar esta función de efecto "useEffect" de React cuyo propósito es llamar al callback una sola vez.
  useEffect(() => {
    // Comprobamos el calledOnce si está establecido su current como false
    if (!calledOnce.current) {
      // Si lo anterior es verdadero, llamamos al callback recibido como argumento
      callback();
      // Establecemos la referencia del estado calledOnce como true
      calledOnce.current = true;
      // "current" es el objeto que devuelve  "useRef"
    }
    // Finalmente, el último parámetro del useEffect es una matriz con el callback para que cada vez que el mismo cambie, se ejecute la función.
  }, [callback]);
};

export default useEffectOnce;
