import useDebounce from '@hooks/useDebounce';
import { renderHook } from '@root/test.utils';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
// global es donde se encuentrar varios metodos de js, y aqui se coloca para poder  simular el setTimeout y clearTimeout
jest.spyOn(global, 'clearTimeout');

// "describe" es el titulo del test, de lo que vas a testear
describe('useDebounce hook', () => {
  // UNITARY TEST 1
  it('Should be defined', () => {
    // IT: describes que es lo que se va a testear y como se va a hacer

    // THEN
    expect(useDebounce).toBeDefined();
    // toBeDefined va a verificar que lo que se esta testiando tenga funcionalidad
  });

  // UNITARY TEST 2
  it('Should return debounce value', () => {
    // WHEN
    const { result } = renderHook(() => useDebounce('debounce value'));
    // renderHook sirve para poder simular los hooks de react.. se debe usar renderHook como wraper para envolver el hook que se quiera simular
    // result es un propiedad la cual es la que contendra el resultado del renderHook,OJO SIEMPRE SE USA RESULT

    // THEN
    expect(result.current).toEqual('debounce value');
    // toEqual Verificar que el valor es igual al esperado
  });

  // UNITARY TEST 3
  it('Should debounce with default debounce value of 500 ms', () => {
    // WHEN
    renderHook(() => useDebounce('debounce value'));

    // THEN
    expect(setTimeout).toHaveBeenCalledTimes(1);
    // toHaveBeenCalledTimes este delimita y verifica la cantidad de ejecuciones para resolver un test
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500); // ya que el hook se debe establecer un tiempo, este 500 lo representa en ms
  });

  // UNITARY TEST 4
  it('Should debounce with given debounce', () => {
    // WHEN
    renderHook(() => useDebounce('debounce value', 2100));

    // THEN
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2100);
  });

  // UNITARY TEST 5
  it('Should call clearTimeout on onmount', () => {
    // WHEN
    const { unmount } = renderHook(() => useDebounce('debounce value unmount'));
    // unmount es una propiedad que sirve para test cuando un proceso termino
    unmount();

    // THEN
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});
