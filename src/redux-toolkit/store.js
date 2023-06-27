import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user/user.reducer';

export const store = configureStore({
  reducer: {
    user: userReducer
  }
});
