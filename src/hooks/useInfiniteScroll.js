// este es un custom HOOKs para el localStorage
import { useEffect, useCallback } from 'react';

// Este hook se utiliza para detectar cuando el usuario ha llegado a la parte más baja de una página web para poder cargar más contenido
const useInfiniteScroll = (bodyRef, bottomLineRef, callback) => {
  // parametros:
  // bodyref: sera el container del toda la pag
  // bottomLineRef: sera el elemento div, input etc de mas abajo de la pag
  // callback: sera la logica que ira hacer los get de los post, mensajes etc a solicitar cuando se llegue al top

  const handleScroll = useCallback(() => {
    const containerHeight = bodyRef?.current?.getBoundingClientRect().height;
    // "getBoundingClientRect" este metodo que retorna una descripcion del tamaño y la posición del elemento al cual se le aplica
    // en este caso sera al cotainer y queremos es su "height"
    const { top: bottomLineTop } = bottomLineRef?.current?.getBoundingClientRect();
    // destructuracion del "bottomLineRef" para cambiarle el nombre al top
    if (bottomLineTop <= containerHeight) {
      // aqui si la parte top del ultimo elemento de la pagina es menor o igual al top del container se ejecuta el callback
      callback();
    }
  }, [bodyRef, bottomLineRef, callback]);

  useEffect(() => {
    const bodyRefCurrent = bodyRef?.current;
    bodyRefCurrent?.addEventListener('scroll', handleScroll, true);
    // se le asigna el evento al container para cuando haga scroll se ejecute este,
    // OJO el true es para establecer que este evento se creara con propagacion de captura, osea ira del container
    // hasta los elemenos hijos

    // retorno de salida de proceso
    return () => bodyRefCurrent.removeEventListener('scroll', handleScroll, true);
    // si se coloco true en el momento de crear el elemento se debe colocar al momento de eliminarlo
  }, [bodyRef, handleScroll]);
};

export default useInfiniteScroll;

// Para lograr esto ocuparemos un "bodyRef" que hace referencia al contenedor general que contiene todos los elementos de la página
// También tendremos un "bottomLineRef": que es un elemento visible en la parte más baja de la página web
// Para terminar tendremos un "callback": que será el procedimiento a resolver
// Resumen final: Esta función recibe una 'ref' de React como parámetro (bodyRef) para obtener la altura del contenedor general de la página web
// y además recibe como parámetro otra 'ref' de React para obtener la ubicación de la linea inferior de la página que es (bottomLineRef)
