import { avatarColors } from '@services/utils/static.data';
import { floor, random } from 'lodash';
import { addUser } from '@redux-toolkit/reducers/user/user.reducer';

export class UtilsService {
  static avatarColor() {
    return avatarColors[floor(random(0.9) * avatarColors.length)];
    // floor es un metodo de lodash para redondear hacia abajo
    // random es un metodo de lodash para generar un numero random
  }

  static generateAvatar(text, backgroundColor, foregroundColor = 'white') {
    // Crear el avatar mediante Canvas
    const canvas = document.createElement('canvas'); // "canvas" es usado para crear graficas o img en js
    // Obtener el contexto en 2d del elemento canvas creado
    const context = canvas.getContext('2d'); // "getContext" se debe usar este para asi poderle otorgar los metodos y propiedades para poder crear esta img o grafica
    // Definir el ancho del elemento canvas a 200 pixeles.
    canvas.width = 200;
    // Definir el alto del elemento canvas a 200 pixeles.
    canvas.height = 200;
    // Definir el fillStyle, que es el background color del fondo
    context.fillStyle = backgroundColor;
    // Rellenar el canvas con la especificación de width y height
    context.fillRect(0, 0, canvas.width, canvas.height); // "fillRect" es para dibujar un rectangulo
    // Establecer la fuente del contexto para el elemento canvas
    context.font = 'normal 80px sans-serif';
    // Establecer el color de primer plano
    context.fillStyle = foregroundColor;
    // Establecer el texto alineado al centro
    context.textAlign = 'center';
    // Establecer el texto en middle property
    context.textBaseline = 'middle';
    // Combinar en el contexto el texto con el ancho y anchura
    context.fillText(text, canvas.width / 2, canvas.height / 2); // "fillText" es para poderle meter texto a la imagen  y que quede en el medio de ella
    // "toDataURL" se usa para devolver este elemento canvas como imagen en formato png
    return canvas.toDataURL('image/png');
  }

  // los dispatch de algun actions va ir aqui en utils.service o en un archivo de utils.service

  // dispatch para el reducer de user
  static dispatchUser(result, pageReload, dispatch, setUser) {
    // parametros:
    // result: es la data que se envia al backend (username, password)
    // pageReload: es para indentificar con un boolean que se proceso correctamente la session
    // dispatch: es el trigger de esta accion para que se pueda concretar
    // setUser: es un prop el cual viene siendo un state que establecera el usuario actual

    pageReload(true);
    dispatch(addUser({ token: result.data.token, profile: result.data.user }));
    setUser(result.data.user);
  }
}
