import { setupServer } from 'msw/node';
import { authHandlers } from './handlers/auth';

// dentro de setupServer va un spread operator el cual copiara todas los archivos que esten en el authHandlers
export const server = setupServer(...authHandlers);
// de esta forma podran simular las rutas como si fuera un servidor de node
