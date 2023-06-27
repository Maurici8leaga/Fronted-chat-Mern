import axios from 'axios';

export let BASE_ENDPOINT = '';

export const APP_ENVIROMENT = 'local';

if (APP_ENVIROMENT === 'local') {
  BASE_ENDPOINT = 'http://localhost:5001';
} else if (APP_ENVIROMENT === 'staging') {
  BASE_ENDPOINT = 'https://app.stg.<your-backend-domain>';
} else if (APP_ENVIROMENT === 'pre-production') {
  BASE_ENDPOINT = 'https://api.<your-backend-domain>';
}

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true
});
