import useLocalStorage from '@hooks/useLocalStorage';
import { renderHook } from '@root/test.utils';

// "describe" es el titulo del test, de lo que vas a testear
describe('useLocalStorage hook', () => {
  afterEach(() => {
    // afterEach es para que se reseteen. todos los procesos despues de que termine cada test
    window.localStorage.clear();
    // para limpiar el localstorage antes de cada test
  });

  // UNITARY TEST 1
  it('Should return empty string', () => {
    // IT: describes que es lo que se va a testear y como se va a hacer

    // WHEN
    const { result } = renderHook(() => useLocalStorage('key', 'get'));
    // renderHook sirve para poder simular los hooks de react.. se debe usar renderHook como wraper para envolver el hook que se quiera simular
    // result es un propiedad la cual es la que contendra el resultado del renderHook,OJO SIEMPRE SE USA RESULT

    // THEN
    expect(result.current).toBe('');
  });

  // UNITARY TEST 2
  it('Should return value', () => {
    // GIVEN
    window.localStorage.setItem('key', JSON.stringify('storage value'));

    // WHEN
    const { result } = renderHook(() => useLocalStorage('key', 'get'));

    // THEN
    expect(result.current).toBe('storage value');
  });

  // UNITARY TEST 3
  it('Should set value and get', () => {
    // WHEN
    const { result: first } = renderHook(() => useLocalStorage('key', 'set'));
    // result: first es un alias que se le pone al result .. ya que solo puede haber 1 result pero si puede haber varios alias al result
    const [setState] = first.current;
    setState('Another value');
    const { result: second } = renderHook(() => useLocalStorage('key', 'get'));

    // THEN
    expect(second.current).toBe('Another value');
  });

  // UNITARY TEST 4
  describe('Delete', () => {
    // GIVEN
    let storageValue;
    beforeEach(() => {
      const { result: first } = renderHook(() => useLocalStorage('key', 'set'));
      const [setState] = first.current;
      setState('Delete value');
      const { result: second } = renderHook(() => useLocalStorage('key', 'get'));
      storageValue = second.current;
    });

    it('Should delete value', () => {
      expect(storageValue).toBe('Delete value');

      // WHEN
      const { result: third } = renderHook(() => useLocalStorage('key', 'delete'));
      const [deleteValue] = third.current;
      deleteValue();

      // THEN
      const { result: fourth } = renderHook(() => useLocalStorage('key', 'get'));
      expect(fourth.current).toBe('');
    });
  });
});
