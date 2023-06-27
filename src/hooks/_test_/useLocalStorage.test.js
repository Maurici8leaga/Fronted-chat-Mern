import useLocalStorage from '@hooks/useLocalStorage';
import { renderHook } from '@root/test.utils';

describe('useLocalStorage hook', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('Should return empty string', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'get'));
    expect(result.current).toBe('');
  });

  it('Should return value', () => {
    window.localStorage.setItem('key', JSON.stringify('storage value'));

    const { result } = renderHook(() => useLocalStorage('key', 'get'));

    expect(result.current).toBe('storage value');
  });

  it('Should set value and get', () => {
    const { result: first } = renderHook(() => useLocalStorage('key', 'set'));
    const [setState] = first.current;
    setState('Another value');
    const { result: second } = renderHook(() => useLocalStorage('key', 'get'));

    expect(second.current).toBe('Another value');
  });

  describe('Delete', () => {
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

      const { result: third } = renderHook(() => useLocalStorage('key', 'delete'));
      const [deleteValue] = third.current;
      deleteValue();

      const { result: fourth } = renderHook(() => useLocalStorage('key', 'get'));
      expect(fourth.current).toBe('');
    });
  });
});
