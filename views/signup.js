/* eslint-disable max-len */
/* eslint-disable no-undef */
import { createUsers, createUserswithGoogle } from '../components/auth.js';

export default () => {
  const view = `
        <div class="container-form">
            <div class=logo_singup>
                <img src="./img/logo_signup.svg" alt="logo_singup">
            </div>
            <div class="form-Singup" >
                <h2>Registrate</h2>
                <form action="" class="form-SU-Desktop-tablet" id="form">
                    <label for="emailSignUp">EMAIL
                    <input class="emailSignUp" id="emailSignUp" type="email" placeholder="pepitoperez@hotmail.com" required>
                    <span id="messageEmailSU" class="messageEmailSU"></span>
                    </label>
                    <label for="passSignUp">CONTRASEÑA
                    <i class='fas fa-info-circle'>
                      <div class="infoPopUp">
                        <div class="infoEmail" id="infoEmail">
                          <div>
                            <i class='fas fa-paw'></i>
                            <p>Debe contener minimo 8 caracteres.</p>
                          </div>
                          <div>
                            <i class='fas fa-paw'></i>
                           <p>Debe contener un caracter especial (@ * / .)</p>
                          </div>
                          <div>
                            <i class='fas fa-paw'></i>
                            <p>Debe contener minimo una letra Mayuscula.</p>
                          </div>
                          <div>
                            <i class='fas fa-paw' ></i>
                            <p>Debe contener minimo un número.</p>
                          </div>
                        </div>
                      </div>
                    </i>
                    <input class="passSignUp" type="password" placeholder="***********" pattern=".{8,}" required>
                    <i class="far fa-eye eye"></i>
                    <span id="messagePassSU" class="messagePassSU"></span>
                    </label>
                    <input class="btn" type="submit" value="SIGN IN">
                  </form>
                <div class="signupGoogle">
                  <p>-- O --</p>
                  <button class="btnGoogle">
                    <img src="./img/icons-google-50.png" alt="">
                    <p>Registrarse con Google</p>
                  </button>
                </div>
                <span>
                  <p>Ya tienes cuenta? <a href="#/login">Log in</a></p>
                </span>
            </div>
        </div>
        <div class=bg-singup>
            <img class="desktop-SU" src="./img/SingUp-desktop.svg" alt="bg_singup">
            <img class="tablet-SU" src="./img/SingUp-tablet.png" alt="bg_singup">
            <img class="mobile-SU" src="./img/SingUp-mobile.png" alt="bg_singup">
        </div>
        <div id="landscape">
            <div>
                <img src="./img/giro@2x.png" alt=""></br>
                <center>¡Gira tu dispositivo!</center></br>
                <span><center>¡Please!</center></span>
            </div>
        </div>
        <div class="overlay" id="overlay">
          <div class="popup" id="popup">
            <a href="#/sign-up" id="btn-close-popup" class="btn-close-popup">
              <i class="fas fa-times-circle"></i>
            </a>
            <img src="./img/popup.png" alt="">
            <h4 id="msjPopUp">Hemos enviado un correo de confirmación a tu cuenta, por favor, sigue los pasos para poder continuar.</h4>
           </div>
        </div>

      </div>
`;
  // Variables
  const nav = document.getElementById('headerNav');
  const divElement = document.createElement('div');
  divElement.classList = 'SingUp-Container';
  divElement.innerHTML = view;
  const boton = divElement.querySelector('.btn');
  const eye = divElement.querySelectorAll('.eye');
  const btnGoogle = divElement.querySelector('.btnGoogle');
  const btnClosePopup = divElement.querySelector('#btn-close-popup');
  nav.style.display = 'none';
  // Funciones
  // Funcion registro del usuario
  function createNewUsers() {
    let warningAuth = '';
    let warningAuthPass = '';
    const signUpForm = document.querySelector('#form');
    const email = document.querySelector('.emailSignUp').value;
    const password = document.querySelector('.passSignUp').value;
    const valEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const messageEmail = document.getElementById('messageEmailSU');
    const messagePass = document.getElementById('messagePassSU');
    let enterLogin = true;
    // VALIDAR EMAIL
    if (!valEmail.test(email)) {
      warningAuth += 'Email no valido';
      messageEmail.innerHTML = warningAuth;
      enterLogin = false;
    }
    // VALIDAR CONSTRASEÑA
    const valPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!valPass.test(password)) {
      warningAuthPass += 'Contraseña no cumple con los criterios minimos';
      messagePass.innerHTML = warningAuthPass;
      enterLogin = false;
    }
    // INVOCAR FUNCIÓN CREATEUSER SI EMAIL Y PASSWORD SON CORRECTOS
    if (enterLogin) {
      createUsers(email, password);
      signUpForm.reset();
      messageEmail.innerHTML = '';
      messagePass.innerHTML = '';
    }
  }
  // Funcion mostrar y ocultar contraseña
  function showHidePassword() {
    const x = document.querySelector('.passSignUp');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }
  // cierra ventana popup envio correo validación
  function closePopup() {
    overlay.classList.remove('active');
    popup.classList.remove('active');
  }
  // Listener
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < eye.length; i++) {
    eye[i].addEventListener('click', showHidePassword);
  }
  boton.addEventListener('click', createNewUsers);
  btnGoogle.addEventListener('click', createUserswithGoogle);
  btnClosePopup.addEventListener('click', closePopup);
  return divElement;
};
