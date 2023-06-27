import useDebounce from '@hooks/useDebounce';
import { renderHook } from '@root/test.utils';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
jest.spyOn(global, 'clearTimeout');

describe('useDebounce hook', () => {
  it('Should be defined', () => {
    expect(useDebounce).toBeDefined();
  });

  it('Should return debounce value', () => {
    const { result } = renderHook(() => useDebounce('debounce value'));

    expect(result.current).toEqual('debounce value');
  });

  it('Should debounce with default debounce value of 500 ms', () => {
    renderHook(() => useDebounce('debounce value'));

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
  });

  it('Should debounce with given debounce', () => {
    renderHook(() => useDebounce('debounce value', 2100));

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2100);
  });

  it('Should call clearTimeout on onmount', () => {
    const { unmount } = renderHook(() => useDebounce('debounce value unmount'));
    unmount();

    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});
