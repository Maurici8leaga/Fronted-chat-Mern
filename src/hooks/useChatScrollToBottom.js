// este es un custom HOOKs para el localStorage
import { useEffect, useRef } from 'react';

// En un contexto de chat, este código se puede usar para asegurarse de que el último mensaje del chat
// siempre esté visible, desplazando automáticamente el contenedor de chat hacia abajo cuando un nuevo mensaje
// es enviado
const useChatScrollToBottom = (prop) => {
  const scrollRef = useRef(null);
  // see usa el hook useRef para capturar el valor de este scrollRef

  useEffect(() => {
    // Esta linea se usa para verificar si la referencia de "scrollRef" es true (no null)
    if (scrollRef.current) {
      // Este flujo de código es responsable de hacer el scroll a la parte inferior del contenedor
      // La propiedad scrollRef.current.scrollTop, calculará el scroll total del contenedor
      // La propiedad scrollRef.current?.scrollHeight, representa la posición de desplazamiento actual en el contenedor
      // La propiedad scrollRef.current?.clientHeight, representa el alto total del contenedor actualmente visible.
      // Con estas 2 propiedades obtenemos el desplazamiento total necesario para que el contenedor sea visible al máximo.
      // Esto significa que esta linea está moviendo la barra de desplazamiento del contenedor hacia la parte inferior.
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight - scrollRef.current?.clientHeight;
    }
  }, [prop]);
  return scrollRef;
};

export default useChatScrollToBottom;

/*
 Al usar la propiedad "scrollRef.current?.scrollHeight", el código puede determinar el alto
total del contenedor. Esto significa que siempre se desplazará al final del contenedor, independientemente
de la cantidad de mensajes que haya. Por otro lado, la propiedad "scrollRef.current?.clientHeight" nos permite
obtener el alto del contenedor actualmente visible, haciendo la resta de estas dos propiedades, con esto
obtenemos el desplazamiento total necesario para que los últimos mensajes sean visibles.
*/
