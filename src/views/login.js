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
                        <input id="email"class="inputForm" type="text" placeholder="Usuario" required>
                    </Label><br />
                    <Label>Password<br />
                        <input id ="password" class="inputForm" type="password" placeholder="Contraseña" required>
                        <i id ="eye" class="far fa-eye"></i>
                    
                    </Label><br />
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
  const nav = document.getElementById('headerNav');
  nav.style.display = 'none';
  const divElement = document.createElement('div');
  divElement.classList = 'containerView';
  divElement.innerHTML = view;
  const logInForm = divElement.querySelector('#logInForm');
  // const boton = divElement.querySelector('#btn');
  // boton.addEventListener('click', userLogIn);

  const eye = divElement.querySelector('#eye');
  eye.addEventListener('click', showHidePassword);

  logInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((cred) => {
        console.log(cred.user);
        window.location.hash = '#/dashboard';
        alert('bienvenido');
      })
      .catch((error) => {
        alert('no estas registrado' + error);
      });
    logInForm.reset();
  });

  function showHidePassword() {
    const x = document.getElementById('password');

    x.type === 'password' ? (x.type = 'text') : (x.type = 'password');
  }
  return divElement;
};
