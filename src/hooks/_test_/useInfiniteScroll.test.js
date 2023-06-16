import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { renderHook } from '@root/test.utils';

const bodyRef = { current: document.createElement('div') };
const bottomLineRef = { current: document.createElement('div') };
const mockCallback = jest.fn();

const bodyAddEventListenerSpy = jest.spyOn(bodyRef.current, 'addEventListener');
const bodyRemoveEventListenerSpy = jest.spyOn(bodyRef.current, 'removeEventListener');

describe('useInfiniteScroll hook', () => {
  // UNITARY TEST 1
  it('Should call addEventListener', () => {
    // WHEN
    renderHook(() => useInfiniteScroll(bodyRef, bottomLineRef, mockCallback));
    // renderHook sirve para poder simular los hooks de react.. se debe usar renderHook como wraper para envolver el hook que se quiera simular
    // result es un propiedad la cual es la que contendra el resultado del renderHook,OJO SIEMPRE SE USA RESULT

    // THEN
    expect(bodyAddEventListenerSpy).toHaveBeenCalledTimes(1);
    // toHaveBeenCalledTimes este delimita y verifica la cantidad de ejecuciones para resolver un test
    expect(bodyRemoveEventListenerSpy).toHaveBeenCalledTimes(0);
  });

  // UNITARY TEST 2
  it('Should call removeEventListener', () => {
    // WHEN
    const { unmount } = renderHook(() => useInfiniteScroll(bodyRef, bottomLineRef, mockCallback));
    // unmount es una propiedad que sirve para test cuando un proceso termino
    unmount();

    // THEN
    expect(bodyAddEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(bodyRemoveEventListenerSpy).toHaveBeenCalledTimes(1);
  });
});
