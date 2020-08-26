import { userSignOff } from '../components/auth.js';

export default () => {
  const view = `
  <header id="userHeader">
  <div id="infoUser">
  <div id ="userProfilePhoto"><img src="" alt="photoUser"></div>
  <h3 id="nombre"></h3>
  <br>
  <h4 id="ciudad"></h4>
  </div>
<div id="navBtn">   
  <button id="signOff">Cerrar sesion</button>      
  </div> 
  </header>

  
  
  
`;

  // Variables
  const nav = document.getElementById('headerNav');
  nav.style.display = 'none';

  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  const nombre = divElement.querySelector('#nombre');
  const ciudad = divElement.querySelector('#ciudad');
  const btnSingOff = divElement.querySelector('#signOff');

  // Funciones
  btnSingOff.addEventListener('click', (e) => {
    e.preventDefault();
    // Cerrar sesion
    userSignOff();
  });
  const userex = JSON.parse(localStorage.getItem('usuario'));
  const idex = userex.uid;
  console.log(idex);

  const docRef = firebase.firestore().collection('user').doc(idex);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        nombre.innerHTML = data.Name;
        ciudad.innerHTML = data.City;
        console.log('Document data:', data);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
  return divElement;
};
