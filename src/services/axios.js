import axios from 'axios';

export let BASE_ENDPOINT = '';

export const APP_ENVIROMENT = 'local';

// metodo practico para condiciones de entorno del proyecto
if (APP_ENVIROMENT === 'local') {
  BASE_ENDPOINT = 'http://localhost:5000';
} else if (APP_ENVIROMENT === 'staging') {
  BASE_ENDPOINT = 'https://app.stg.<your-backend-domain>'; // este se cambiara en  tal caso por el url que tenga del servidor
} else if (APP_ENVIROMENT === 'pre-production') {
  BASE_ENDPOINT = 'https://api.<your-backend-domain>'; // este se cambiara en  tal caso por el url que tenga del servicio del servidor
}

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

// instancia desacoplada de axios con sus configuraciones
export default axios.create({
  // de esta forma abstraida no se tiene que repetir esto constantemente para cada request
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true
});
