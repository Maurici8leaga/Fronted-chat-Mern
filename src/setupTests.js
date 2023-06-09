// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'; // este viene ya con el react-app
import 'jest-canvas-mock';
import { server } from '@mocks/server';
// se importa el server el cual expone las rutas a simular en los test

beforeAll(() => {
  // beforeAll es para verificar que el servidor este activo, de no ser asi lo activa
  server.listen();
});

afterEach(() => {
  // afterEach es para que se reseteen. todos los procesos despues de que termine cada test
  server.resetHandlers();
});

afterAll(() => {
  // afterAll. es para limipar los datos y. que termine los procesos
  server.close();
});
