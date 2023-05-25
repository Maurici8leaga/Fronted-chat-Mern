// este es un custom HOOKs para el sessionStorage

const useSessionStorage = (key, type) => {
  // parametos:
  // key= al nombre del token
  // type= es el tipo de request que se vaya a necesitar dependiendo de la ocasion

  try {
    if (type === 'get') {
      // para pedir el token ya establecido en sessionStorage
      const item = window.sessionStorage.getItem(key);
      // se debe parsear lo que se traiga del get
      return item ? JSON.parse(item) : '';
    } else if (type === 'set') {
      const setValue = (newValue) => {
        // para establecer el token en sessionStorage
        window.sessionStorage.setItem(key, JSON.stringify(newValue));
      };
      return [setValue];
    } else {
      const deleteValue = () => {
        // para eliminar el token del sessionStorage
        window.sessionStorage.removeItem(key);
      };
      return [deleteValue];
    }
  } catch (error) {
    console.log(error);
  }
};

export default useSessionStorage;
