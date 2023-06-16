import reducer, { addUser, clearUser, updateUserProfile } from '../user.reducer';
import { initialStateUserMock } from './mock/initialState.mock';

// "describe" es el titulo del test, de lo que vas a testear
describe('User Reducer', () => {
  beforeEach(() => {
    // se establece los valores iniciales antes de iniciar cada test
    initialStateUserMock.token = '';
    initialStateUserMock.profile = null;
  });

  // UNITARY TEST 1
  it('Should return the initial state', () => {
    // IT: describes que es lo que se va a testear y como se va a hacer

    // THEN
    expect(reducer(undefined, {})).toEqual({ token: '', profile: null });
    // el estado incial de un reducer es undefined, por eso se coloca
    // el 1er. parametro del reducer. es el state y el 2do es el actions
  });

  // UNITARY TEST 2
  it('Should add user with token and profile', () => {
    // THEN
    expect(reducer(initialStateUserMock, addUser({ token: '1234', profile: { username: 'yorman' } }))).toEqual({
      // toEqual Verificar que el valor es igual al esperado
      token: '1234',
      profile: { username: 'yorman' }
    });
  });

  // UNITARY TEST 3
  it('Should update user profile', () => {
    // GIVEN
    initialStateUserMock.token = '123456';
    initialStateUserMock.profile = { username: 'yorman' };
    // THEN
    expect(reducer(initialStateUserMock, updateUserProfile({ username: 'Joseph' }))).toEqual({
      token: '123456',
      profile: { username: 'Joseph' }
    });
  });

  // UNITARY TEST 4
  it('Should reset profile and token', () => {
    // GIVEN
    initialStateUserMock.token = '123456';
    initialStateUserMock.profile = { username: 'Joseph' };
    // THEN
    expect(reducer(initialStateUserMock, clearUser())).toEqual({
      token: '',
      profile: null
    });
  });
});
