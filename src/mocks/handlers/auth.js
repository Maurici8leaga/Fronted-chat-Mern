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

// caso para cuando el usuario se registre pero haya un error
export const signUpMockError = rest.post(`${BASE_URL}/signup`, (_req, res, ctx) => {
  const result = { message: 'Invalid Credentials' };
  return res(ctx.status(400), ctx.json(result));
});

export const authHandlers = [signUpMock, signUpMockError];
