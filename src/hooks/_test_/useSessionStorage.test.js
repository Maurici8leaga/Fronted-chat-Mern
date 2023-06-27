import useSessionStorage from '@hooks/useSessionStorage';
import { renderHook } from '@root/test.utils';

describe('useSessionStorage hook', () => {
  afterEach(() => {
    window.sessionStorage.clear();
  });

  it('Should return empty string', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'get'));
    expect(result.current).toBe('');
  });

  it('Should return value', () => {
    window.sessionStorage.setItem('key', JSON.stringify('storage value'));

    const { result } = renderHook(() => useSessionStorage('key', 'get'));

    expect(result.current).toBe('storage value');
  });

  it('Should set value and get', () => {
    const { result: first } = renderHook(() => useSessionStorage('key', 'set'));
    const [setState] = first.current;
    setState('Another value');
    const { result: second } = renderHook(() => useSessionStorage('key', 'get'));

    expect(second.current).toBe('Another value');
  });

  describe('Delete', () => {
    let storageValue;
    beforeEach(() => {
      const { result: first } = renderHook(() => useSessionStorage('key', 'set'));
      const [setState] = first.current;
      setState('Delete value');
      const { result: second } = renderHook(() => useSessionStorage('key', 'get'));
      storageValue = second.current;
    });

    it('Should delete value', () => {
      expect(storageValue).toBe('Delete value');

      const { result: third } = renderHook(() => useSessionStorage('key', 'delete'));
      const [deleteValue] = third.current;
      deleteValue();

      const { result: fourth } = renderHook(() => useSessionStorage('key', 'get'));
      expect(fourth.current).toBe('');
    });
  });
});
