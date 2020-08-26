import { addUsersData } from '../components/database.js';

export default () => {
  const view = `
  <div class="formProfile">
  <form action="#" class="profileForm" id="profileForm">
    <div class="photoImage">

      <div class="petForm">
        <div class="petContent">

          <div class="image-preview" id="containerPreview">
            <img src="" alt="image-preview" class="imagePreview">
            <input type="file" name="photoPet" id="profilePhoto" />
            <div class="default-image"></div>
            <label for="profilePhoto"><i class="fas fa-camera-retro"></i></label>
          </div>

          <div class="petInfo">
            <label for="namePet">
              <input id="namePet" class="petForm" type="text" placeholder="nombre mascota" required>
            </label>
            </br>
            <label for="agePet">
              <input id="agePet" class="petForm" type="number" placeholder="edad mascota" required>
            </label>
            </br>
            <label for="breedPet">
              <input id="breedPet" class="petForm" type="text" placeholder="raza mascota" required>
            </label>
            </br>
            <label for="city">
              <input id="city" class="petForm" type="text" placeholder="ciudad" required>
            </label>
          </div>
      </div>
    </div>
  </div>

      <div class="formUser">
        <div class="userContent">
          <h2>Mi humano es...</h2>
          <label>Nombre </label>
          <br>
          
            <input id="userName" type="text" placeholder="nombre" required>

          
          <label>Teléfono </label>
          <br>
            <input id="userPhone" type="phone" placeholder="numero telefono" required>
         
          <label>Fecha de nacimiento   </label>
          <br>
            <input id="userBirth" type="date" required>

                  
          <div class="gender">
          <label>Mascota</label> 
          <br>
    <input type="radio" value="dog" id="dog" name="pet" checked/>
    <label for="dog" class="radio" chec>Perro</label>
    <input type="radio" value="cat" id="cat" name="pet" />
    <label for="cat" class="radio">Gato</label>
    <input type="radio" value="other" id="other" name="pet" />
    <label for="other" class="radio">Otros</label>
    
   </div> 
       
          
          
            <label id="terminos"><input type="checkbox" id="cbox1" >*Al pertencer a la comunidad acepta amar y respetar a todos los animales.</label><br>
            <br>
          <input type="submit" id="profileBtn" class="btnProfile" value="Crear perfil" />
          </div>
      </div>
  </form>
</div>
 `;

  // VARIABLES GLOBALES
  const nav = document.getElementById('headerNav');
  nav.style.display = 'none';

  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  // VARIABLES PREVIEW IMAGEN DE PERFIL
  const inputPhoto = divElement.querySelector('#profilePhoto');
  const imagePreview = divElement.querySelector('.imagePreview');

  // USER INFORMATION
  const formProfile = divElement.querySelector('#profileForm');

  const userName = divElement.querySelector('#userName');
  // const userEmail = divElement.querySelector('#userProfileEmail');
  const userPhone = divElement.querySelector('#userPhone');
  const userBirth = divElement.querySelector('#userBirth');
  const userCity = divElement.querySelector('#city');

  // PET INFORMATION
  const petName = divElement.querySelector('#namePet');
  const petBreed = divElement.querySelector('#agePet');
  const petAge = divElement.querySelector('#breedPet');
  const defaultImage = divElement.querySelector('.default-image');

  // FUNCIONES

  // FUNCION PREVIEW IMAGEN DE PERFIL
  inputPhoto.addEventListener('change', () => {
    const file = inputPhoto.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      defaultImage.style.display = 'none';
      imagePreview.style.display = 'block';
      reader.addEventListener('load', () => {
        // console.log(this) ;
        imagePreview.setAttribute('src', reader.result);
      });
      reader.readAsDataURL(file);
    } else {
      defaultImage.style.display = null;
      imagePreview.style.display = null;
      imagePreview.setAttribute('src', '');
    }
  });

  // FUNCION ENVIO DE FORMULARIO Y AGREGAR DATOS A FIRESTORE
  const userex = JSON.parse(localStorage.getItem('usuario'));
  const idex = userex.uid;
  console.log(idex);

  // userEmail.innerHTML = userex.email;

  formProfile.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('funciona');

    window.location.hash = '#/dashboard';

    // INFORMACION DEL USUARIO

    const User = {
      Name: userName.value,
      // Email: userex.email,
      Phone: userPhone.value,
      DateBirth: userBirth.value,
      City: userCity.value,
      Pet: {
        PetName: petName.value,
        PetBreed: petBreed.value,
        PetAge: petAge.value,
      },
    };

    // AGREGAR INFORMACION A FIRESTORE
    const user = JSON.parse(localStorage.getItem('usuario'));
    const id = user.uid;
    console.log(id);

    addUsersData(User, id);

    formProfile.reset();
    // userEmail.innerHTML = ' ';
  });

  return divElement;
};

// UPDATE DATA

// updateBtn.addEventListener('click', (e) =>{
//   e.preventDefault();
//   const newData = {
//     Phone: userPhone.value
//   };
//   dataRef.update(newData)
// })

// span class='default-image'><i class='fas fa-paw'></i></span

//   dataRef.child(autoId).set({
//     User: {
//       Name: userName.value,
//       Email: userEmail.value,
//       Phone: userPhone.value,
//       DateBirth: userBirth.value,
//       City: userCity.value,
//       Pet: {
//         PetName: petName.value,
//         PetBreed: petBreed.value,
//         PetAge: petAge.value,
//       },
//     },
//   })

// Get a reference to the database service
// const database = firebase.database();

// Get a reference to the db service
// let db = firebase.firestore();
// db.settings({ timestampsInSnapshots: true });

//   db.collection('Users').get().then((snapshot)=>{
// console.log(snapshot.docs)
// snapshot.docs.forEach(doc =>{
//   console.log(doc.data())
// })
//   })
// const User = {
//   Name: userName.value,
//   Email: userEmail.value,
//   Phone: userPhone.value,
//   DateBirth: userBirth.value,
//   City: userCity.value,
//   Pet: {
//     PetName: petName.value,
//     PetBreed: petBreed.value,
//     PetAge: petAge.value,
//   },
// };
// db.collection('Users')
//   .add(User)
//   .then(function (docRef) {
//     console.log('Document written with ID: ', docRef.id);
//   })
//   .catch(function (error) {
//     console.error('Error adding document: ', error);
//   });
//   Name: userName.value,
//   Email: userEmail.value,
//   Phone: userPhone.value,
//   DateBirth: userBirth.value,
//   City: userCity.value,
//   Pet: {
//     PetName: petName.value,
//     PetBreed: petBreed.value,
//     PetAge: petAge.value,
// },

// const dataRef = database.ref('users');
// const autoId = dataRef.push().key;
