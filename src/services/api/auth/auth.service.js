// este archivo es como la carpeta actions
import axios from '@services/axios';

// aqui es donde se orquestan la definiciónes de apis del backend
// Solid Principle: Single Responsability
// se hacen estos request con axios aqui para luego usarlos de forma declarativa en los componentes
class AuthService {
  // funcion para enviar la data del user cuando se registra al back
  async signUp(body) {
    const response = await axios.post('/signup', body);
    return response;
  }

  // funcion para enviar los datos de login al back
  async signIn(body) {
    const response = await axios.post('/signin', body);
    return response;
  }

  // request al back para cuando se olvide la clave
  async forgotPassword(email) {
    const response = await axios.post('/forgot-password', { email });
    return response;
  }

  // requet al back para resetiar el password
  async resetPassword(token, body) {
    const response = await axios.post(`/reset-password/${token}`, body);
    return response;
  }
}

export const authService = new AuthService();
