import { rest } from 'msw';
import { existingUser, userJwt } from '@mocks/data/user.mock';
import { BASE_ENDPOINT } from '@services/axios';
// este BASE_ENDPOINT  es el que se predetermino en axios

// se deja claro el url para los request
const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

// los handlers son los manipuladores con las APIS, que devuelven llamadas falsas (respuestas de axios)
// aqui iran todos los casos a simular que se necesiten

// caso para cuando el usuario se registre
export const signUpMock = rest.post(`${BASE_URL}/signup`, (_req, res, ctx) => {
  const result = { message: 'User created succesfully', user: existingUser, token: userJwt };
  return res(ctx.json(result)); // el result tiene ser exactamente lo que responde el backend al fronted OJO
  // ctx es el contexto que espera en el que se va a responder la respuesta
});

// caso para cuando el user se registre pero halla  un error
export const signUpMockError = rest.post(`${BASE_URL}/signup`, (_req, res, ctx) => {
  const result = { message: 'Invalid credentials' };
  return res(ctx.status(400), ctx.json(result));
});

// caso para cuando el usuario se registre pero haya un error
export const signUpMockErrorEmailNotValid = rest.post(`${BASE_URL}/signup`, (_req, res, ctx) => {
  const result = { message: 'Email must be valid' };
  return res(ctx.status(400), ctx.json(result));
});

// caso para cuando el user inicie sesion
export const signInMock = rest.post(`${BASE_URL}/signin`, (_req, res, ctx) => {
  const result = { message: 'User login successfully', user: existingUser, token: userJwt };
  return res(ctx.json(result));
});

// caso para cuando el user inicie sesion pero responda con error
export const signInMockError = rest.post(`${BASE_URL}/signin`, (_req, res, ctx) => {
  const result = { message: 'Invalid credentials' };
  return res(ctx.status(400), ctx.json(result));
});

// caso para cuando el user olvide el password
export const forgotPasswordMock = rest.post(`${BASE_URL}/forgot-password`, (_req, res, ctx) => {
  const result = { message: 'Password reset email sent.' };
  return res(ctx.json(result));
});

// caso para cuando el user olvide el password pero halla un error
export const forgotPasswordMockError = rest.post(`${BASE_URL}/forgot-password`, (_req, res, ctx) => {
  const result = { message: 'Email must be valid' };
  return res(ctx.status(400), ctx.json(result));
});

// caso para cuando el user solicite resetiar el password
export const resetPasswordMock = rest.post(`${BASE_URL}/reset-password/1234567890`, (_req, res, ctx) => {
  // OJO AQUI CON EL TOKEN FINAL, ESTE DEBE SER COLOCADO EN EL TEST QUE SE USE
  const result = { message: 'Password successfully updated.' };
  return res(ctx.json(result));
});

// caso para cuando el user solicite resetiar el password pero ocurra un error
export const resetPasswordMockError = rest.post(`${BASE_URL}/reset-password/1234567890`, (_req, res, ctx) => {
  // OJO AQUI CON EL TOKEN FINAL, ESTE DEBE SER COLOCADO EN EL TEST QUE SE USE
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
