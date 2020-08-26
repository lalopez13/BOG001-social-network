import { createUsers } from '../components/auth.js';

export default () => {
  const view = `
      
      <div class="container-form">
          <div class=logo_singup>
              <img src="./img/logo_signup.svg" alt="logo_singup">
          </div>
          <div class="form-Singup" >
              <h2>Registrate</h2>
              <form action="" class="form-SU-Desktop-tablet" id="form">
                  <label for="nameSingUp">NOMBRE</label>
                  <input class="nameSingUp" type="text" placeholder="pepito perez" required>
                  <label for="emailSingUp">EMAIL</label>
                  <input class="emailSingUp"  type="email" placeholder="pepitoperez@hotmail.com" required>
                  <label for="passSingUp">CONTRASEÑA</label>
                  <input class="passSingUp" type="password" placeholder="***********" required>
                  <i id ="eye" class="far fa-eye"></i>
                  <input type="submit" class="btn" value="SIGN IN">
                  <span>
                  <p>Ya tienes cuenta? <a href="#/login">Log in</a> </p>
                  </span>
              </form>
              <form action="" class="form-SU-movil" id="form">
                  <input class="nameSingUp id="Nombre" type="text" placeholder="Nombre" required>
                  <input class="emailSingUp" type="password" placeholder="Email" required>
                  <input class="passSingUp" type="email" placeholder="Contraseña" required>
                  
                  <input type="submit" id="btnSignUp" class="btn" value="SING IN">
                  <span>
                      <p>Ya tienes cuenta? <a href="#/login">Log in</a> </p>
                  </span>
              </form>
          </div>
      </div>
      <div class=bg-singup>
          <img class="desktop-SU" img src="./img/SingUp-desktop.svg" alt="bg_singup">
          <img class="tablet-SU" img src="./img/SingUp-tablet.png" alt="bg_singup">
          <img class="mobile-SU" img src="./img/SingUp-mobile.png" alt="bg_singup">
      </div>
      <div id="landscape">
          <div>
            <p>
                <img src="./img/giro@2x.png" alt=""><br><center>
                  ¡Gira tu dispositivo!</center><br>
                  <span><center>¡Please!</center></span>
            </p>
          </div>
      </div>
`;

  // Variables

  const nav = document.getElementById('headerNav');
  nav.style.display = 'none';

  const divElement = document.createElement('div');
  divElement.classList = 'SingUp-Container';
  divElement.innerHTML = view;

  const boton = divElement.querySelector('.btn');
  // Funciones

  // Funcion registro del usuario

  boton.addEventListener('click', (e) => {
    e.preventDefault();
    // alert('click');
    window.location.hash = '#/profile';
    const name = document.querySelector('.nameSingUp').value;
    const email = document.querySelector('.emailSingUp').value;
    const password = document.querySelector('.passSingUp').value;

    console.log(name + email + password);
    // la llamamos para pasarle los parametros y usarla
    createUsers(email, password);
  });

  // Funcion mostrar y ocultar contraseña

  const eye = divElement.querySelector('#eye');

  eye.addEventListener('click', () => {
    const x = document.querySelector('.passSingUp');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  });

  return divElement;
};
