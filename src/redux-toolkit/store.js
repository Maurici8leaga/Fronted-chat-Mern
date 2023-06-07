import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user/user.reducer';

// este viene siendo como el index de los reducers, donde se declaran los reducers existentes
export const store = configureStore({
  reducer: {
    user: userReducer
  }
});
