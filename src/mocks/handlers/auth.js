import { rest } from 'msw';
import { existingUser, userJwt } from '@mocks/data/user.mock';
import { BASE_ENDPOINT } from '@services/axios';

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export const signUpMock = rest.post(`${BASE_URL}/signup`, (_req, res, ctx) => {
  const result = { message: 'User created succesfully', user: existingUser, token: userJwt };
  return res(ctx.json(result));
});

export const signUpMockError = rest.post(`${BASE_URL}/signup`, (_req, res, ctx) => {
  const result = { message: 'Invalid credentials' };
  return res(ctx.status(400), ctx.json(result));
});

export const signUpMockErrorEmailNotValid = rest.post(`${BASE_URL}/signup`, (_req, res, ctx) => {
  const result = { message: 'Email must be valid' };
  return res(ctx.status(400), ctx.json(result));
});

export const signInMock = rest.post(`${BASE_URL}/signin`, (_req, res, ctx) => {
  const result = { message: 'User login successfully', user: existingUser, token: userJwt };
  return res(ctx.json(result));
});

export const signInMockError = rest.post(`${BASE_URL}/signin`, (_req, res, ctx) => {
  const result = { message: 'Invalid credentials' };
  return res(ctx.status(400), ctx.json(result));
});

export const forgotPasswordMock = rest.post(`${BASE_URL}/forgot-password`, (_req, res, ctx) => {
  const result = { message: 'Password reset email sent.' };
  return res(ctx.json(result));
});

export const forgotPasswordMockError = rest.post(`${BASE_URL}/forgot-password`, (_req, res, ctx) => {
  const result = { message: 'Email must be valid' };
  return res(ctx.status(400), ctx.json(result));
});

export const resetPasswordMock = rest.post(`${BASE_URL}/reset-password/1234567890`, (_req, res, ctx) => {
  const result = { message: 'Password successfully updated.' };
  return res(ctx.json(result));
});

export const resetPasswordMockError = rest.post(`${BASE_URL}/reset-password/1234567890`, (_req, res, ctx) => {
  const result = { message: 'Passwords do not match' };
  return res(ctx.status(400), ctx.json(result));
});

export const authHandlers = [
  signUpMock,
  signUpMockError,
  signUpMockErrorEmailNotValid,
  signInMock,
  signInMockError,
  forgotPasswordMock,
  forgotPasswordMockError,
  resetPasswordMock,
  resetPasswordMockError
];
