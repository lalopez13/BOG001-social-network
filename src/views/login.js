import { signInUsers } from '../components/auth.js';

export default () => {
  const view = `
        <div class="imgSignInMobile">
            <img src="img/LogIn-mobile.jpg" alt="">
        </div>
        
                <div class="containerImgTitle">
            <div class="titleSite">
                <img src="img/logo-BluePink.png" alt="">
            </div>
            <div class="imgSignInDesktop">
                <img src="img/LogIn-desktop.svg" alt="">
            </div>
        </div>
        
        <div class="containerForms">
            <h2>Bienvenido</h2>
            <div class="form">
                
                <form action="#" class="inputsForm" id="logInForm">
                    <Label>Usuario<br />
                        <input id="email" class="inputForm" type="text" placeholder="Usuario" required>
                    </Label><br />
                    
                    <Label>Password<br />
                        <input id ="password" class="inputForm" type="password" placeholder="Contraseña" required>
                        <i id ="eye" class="far fa-eye"></i>
                    </Label><br />
                    <span id="userMessage"></span>
                    <button id="btn" class="btnForm" >Sign In</button> 
                    
                </form>
            </div>
        
            <div class="reset">
                <a href="">Olvide mi contraseña?</a>
            </div>
            <div class="toggle">
                <label for="cuenta">No tienes cuenta?</label> 
                <a class="cuenta" href="#/sign-up">Sign Up</a>
            </div>
          
        </div>
`;
  // Variables
  const nav = document.getElementById('headerNav');
  nav.style.display = 'none';
  const divElement = document.createElement('div');
  divElement.classList = 'containerView';
  divElement.innerHTML = view;
  const logInForm = divElement.querySelector('#logInForm');
  const eye = divElement.querySelector('#eye');

  // Funciones

  // Ingreso de usuario
  logInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let warningAuth = '';
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const valEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const authMessage = document.getElementById('userMessage');
    let enterLogin = true;

    // VALIDAR EMAIL
    if (!valEmail.test(email)) {
      warningAuth += 'Email no válido -   ';
      authMessage.innerHTML = warningAuth;
      enterLogin = false;
    }

    // VALIDAR CONSTRASEÑA
    const valPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!valPass.test(password)) {
      warningAuth += '  Contraseña es incorrecta';
      authMessage.innerHTML = warningAuth;
      enterLogin = false;
    }

    // INVOCAR FUNCIÓN SIGNUSERS SI EMAIL Y PASSWORD SON CORRECTOS
    if (enterLogin) {
      signInUsers(email, password);
      logInForm.reset();
    }
  });

  // Mostrar y ocultar contraseña

  eye.addEventListener('click', () => {
    const x = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  });

  return divElement;
};
