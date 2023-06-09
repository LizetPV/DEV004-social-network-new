import {
   loginGoogle,
   loginWithEmailAndPassword,
} from '../Firebase/authentication.js';
import { onNavigate } from '../router.js';
import {userData} from '../store/userData.js';
import fondoImage from '../imagenes/fondo-cel.png'
import logoImage from '../imagenes/logo.png'
import rayitaImage from '../imagenes/rayita2-05.png'
import buttonGoogleImage from '../imagenes/buttonGoogle.png'

export const welcome = () => {
  const div = document.createElement('div');
  const logo = document.createElement('img');
  const fondo = document.createElement('img');
  const title = document.createElement('h2');
  const buttonGetinto = document.createElement('button');
  const line = document.createElement('img');
  const buttonGoogle = document.createElement('img', 'input');
  const buttonCreate = document.createElement('button');
  const inputPassword = document.createElement('input');
  const inputUsername = document.createElement('input');
  

  inputUsername.type = 'email';
  inputUsername.required = 'true';
  inputPassword.type = 'password';
  inputPassword.required= 'true';

  inputUsername.placeholder = 'e-mail';
  inputPassword.placeholder = 'password';
  
  logo.id = 'logo';
  fondo.id = 'fondo';
  div.id = 'section';
  inputPassword.id = 'password';
  inputUsername.id = 'username';
  

  title.className = 'title';
  buttonGetinto.className = 'buttonGetinto';
  buttonCreate.className = 'buttonCreate';
  buttonGoogle.className = 'buttonGoogle';
  line.className = 'line';

  buttonGetinto.textContent = 'LOGIN';
  buttonCreate.textContent = 'CREATE ACCOUNT';

  logo.src = logoImage;
  logo.alt = 'Logo';

  fondo.src = fondoImage;
  fondo.alt = 'Fondo';

  line.src = rayitaImage;
  line.alt = 'line';

  buttonGoogle.src = buttonGoogleImage;
  buttonGoogle.alt = 'buttonGoogle';

  buttonGetinto.addEventListener('click', () => {
    if (inputUsername.value === '' || inputPassword.value === '') {
      swal('Ingresa tus datos');
    } else {
      loginWithEmailAndPassword(inputPassword.value, inputUsername.value).then(
        () => {
          onNavigate('/wall');
        },
      );
    }
  });

  buttonCreate.addEventListener('click', () => {
    onNavigate('/register');
  });
  buttonGoogle.addEventListener('click', () => {
    loginGoogle().then((userCredential) => {
      userData.userName = userCredential.user.email;

      onNavigate('/wall');
    });
  });
  

  div.append(
    title,
    logo,
    fondo,
    inputUsername,
    inputPassword,
    buttonGetinto,
    line,
    buttonGoogle,
    buttonCreate,
  );

  return div;
};
