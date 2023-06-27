import reducer, { addUser, clearUser, updateUserProfile } from '../user.reducer';
import { initialStateUserMock } from './mock/initialState.mock';

describe('User Reducer', () => {
  beforeEach(() => {
    initialStateUserMock.token = '';
    initialStateUserMock.profile = null;
  });

  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ token: '', profile: null });
  });

  it('Should add user with token and profile', () => {
    expect(reducer(initialStateUserMock, addUser({ token: '1234', profile: { username: 'yorman' } }))).toEqual({
      token: '1234',
      profile: { username: 'yorman' }
    });
  });

  it('Should update user profile', () => {
    initialStateUserMock.token = '123456';
    initialStateUserMock.profile = { username: 'yorman' };
    expect(reducer(initialStateUserMock, updateUserProfile({ username: 'Joseph' }))).toEqual({
      token: '123456',
      profile: { username: 'Joseph' }
    });
  });

  it('Should reset profile and token', () => {
    initialStateUserMock.token = '123456';
    initialStateUserMock.profile = { username: 'Joseph' };
    expect(reducer(initialStateUserMock, clearUser())).toEqual({
      token: '',
      profile: null
    });
  });
});
