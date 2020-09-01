import { signInUsers, createUserswithGoogle, recoverPass } from '../components/auth.js';

export default () => {
  const view = `
             
        <div class="containerImgTitle">
          <div class="titleSite">
            <img src="img/logo-BluePink.png" alt="">
          </div>
          <div class="imgSignInDesktop">
            <img src="img/LogIn-desktop.svg" alt="">
          </div>
          <div class="imgSignInMobile">
            <img src="img/LogIn-mobile.jpg" alt="">
          </div>
        </div>
          
        <div class="containerForms">
          <h2>Bienvenido</h2>
          <div class="form">       
            <form action="#" class="inputsForm" id="logInForm">
              <Label>EMAIL</br>
                <input id="email" class="inputForm" type="email" placeholder="pepitoperez@gmail.com" required>
                <span id="messageEmailLog" class="messageEmail"></span>
              </Label><br />
              <Label>CONTRASEÑA</br>
                <input id ="password" class="inputForm" type="password" placeholder="*********"  pattern=".{8,}" required>
                <i id ="eye" class="far fa-eye"></i>
                <span id="messagePass" class="messagePass"></span>
              </Label></br>
              <button id="btn" class="btnForm">LOG IN</button> 
            </form>
          </div>

          <div class="loginGoogle">
            <p>-- O --</p>
            <button class="btnLogGoogle">
              <img src="./img/icons-google-50.png" alt="">
              <p>Accede con Google</p>
            </button>
          </div>
          
          <div class="reset">
            <a href="#/login" id="resetPass">Olvide mi contraseña?</a>
          </div>
          <div class="toggle">
            <label for="cuenta">No tienes cuenta?</label> 
            <a class="cuenta" href="#/sign-up">Sign Up</a>
          </div>
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
            <a href="#/login" id="btn-close-popup" class="btn-close-popup">
              <i class="fas fa-times-circle"></i>
            </a>
            <img src="./img/popup.png" alt="">            
            <h4 id="msjPopUp" >Por favor, confirma tu correo electrónico</h4>
            <form action="" class="formResetPass">
                <input class="emailReset" id="emailReset" type="email" placeholder="EMAIL" required>
                <button class="btn-submit" id="btnReset">ENVIAR</button> 
            </form>
            <span class="EmailSend" id="EmailSend">Hemos enviado un mensaje a tu correo, por favor, sigue los pasos indicados</span>   
         </div>
        </div>       
  `;
  // Variables
  const nav = document.getElementById('headerNav');
  const divElement = document.createElement('div');
  divElement.classList = 'containerView';
  divElement.innerHTML = view; // imprime el template en index.html
  const logInForm = divElement.querySelector('#logInForm');
  const logInGoogle = divElement.querySelector('.btnLogGoogle');
  const eye = divElement.querySelector('#eye');
  const resetPopUp = divElement.querySelector('#resetPass');
  const overlay = divElement.querySelector('#overlay');
  const popup = divElement.querySelector('#popup');
  const btnClosePopup = divElement.querySelector('#btn-close-popup');
  const btnresetPass = divElement.querySelector('#btnReset');
  const msjEmailSend = divElement.querySelector('#EmailSend');
  nav.style.display = 'none';
  // Funciones
  // Ingreso de usuario
  logInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInUsers(email, password);
    logInForm.reset();
  });
  // Muestra / Oculta la contraseña
  function showHidePassword() {
    const x = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }
  // Reset de contraseña
  function recoveryPassword () {
    const email = document.getElementById('emailReset').value;
    recoverPass (email);
  }
  // Abre ventana popup para recuperar contraseña
  function openPopup(){
    overlay.classList.add('active');
    popup.classList.add('active');
    msjEmailSend.style.display = 'none';
    btnresetPass.addEventListener('click', recoveryPassword);
  }
  // cierra ventana popup para recuperar contraseña
  function closePopup(){
    overlay.classList.remove('active');
    popup.classList.remove('active');
  }
  //Listeners
  logInGoogle.addEventListener('click', createUserswithGoogle )
  eye.addEventListener('click', showHidePassword);
  resetPopUp.addEventListener('click', openPopup);
  btnClosePopup.addEventListener('click', closePopup);
  return divElement;
};
