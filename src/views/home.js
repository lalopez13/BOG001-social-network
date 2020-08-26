export default () => {
  const view = `
       <img id ="logo-home" src="./img/logo-BluePink.png" alt="logo">
       
       <div class="homeContainer-desktop">
        <img id ="main-img" src="./img/doggie.gif" alt="dog-friend">
        </div>

        <div class="homeContainer-mobile">   
        <button id="start" class="appStartbtn btn">Ingresar</button>
         <img id="mobileMain-img" src= "./src/img/Home-mobile.svg">
         </div> `;
  // Variables
  const nav = document.getElementById('headerNav');
  nav.style.display = 'block';

  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  const buttonStartApp = divElement.querySelector('#start');

  // Funciones
  function userLoginAccount() {
    window.location.hash = '#/login';
  }

  // Listener
  buttonStartApp.addEventListener('click', userLoginAccount);

  return divElement;
};
