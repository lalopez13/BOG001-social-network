import { addUsersData, imageStorage} from '../components/database.js';

export default () => {
  const view = `
  <div class="main">
  <section class="form-image">
  <h1 class="form-image-title">Crea tu perfil</h1>
  </section>
  <section class="form-user">
      <header class="profile-header">
      <h1>Crea tu perfil</h1>
      <div class="logo"></div>
      </header>
      <form action="#" class="profileForm" id="profileForm">
      <div class="pet-form">
     
              <div class="pet-content">
                  <div class="image-preview" id="containerPreview">
                    <img src="" alt="image-preview" class="imagePreview">
                    <input type="file" name="photoPet" id="profilePhoto" />
                    <div class="default-image"></div>
                    <label for="profilePhoto"><i class="fas fa-camera-retro"></i></label>
                  </div>
                  <div class="pet-info">
                    <label for="namePet">Nombre mascota</label>
                    </br>
                      <input id="namePet" class="petForm" type="text" placeholder="nombre mascota" required>
                    
                    </br>
                    <label for="agePet">Edad mascota </label>
                     </br>
                      <input id="agePet" class="petForm" type="number" placeholder="edad mascota" required>
                   
                      </br>
                    <label for="breedPet">Raza </label>
                     </br>
                      <input id="breedPet" class="petForm" type="text" placeholder="raza mascota" required>
                      </br>
                    <label for="city">Ciudad</label>
                    </br>
                      <input id="city" class="petForm" type="text" placeholder="ciudad" required>
                      </br>
                  </div>
                  <br>
                <button id="next" class="btn-profile">siguiente</button>
              </div>
     
      <div class="userContent" style="display:none">
         <!-- <div class="userContent">-->
          <h2 class="userContent-title">Mi humano es...</h2>
          <label>Nombre </label>
          <br>
          
            <input id="userName" type="text" placeholder="nombre" required>
          <br>
          <label>Teléfono </label>
          <br>
            <input id="userPhone" type="phone" placeholder="numero telefono" required>
            <br>
          <label>Fecha de nacimiento   </label>
          <br>
            <input id="userBirth" type="date" required>
          <div class="type-pet">
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
          <input type="submit" id="profileBtn" class="btn-profile" value="Crear perfil" />
          </div>
      </div>
  </form>
</div>
  </section>
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
  const petBreed = divElement.querySelector('#breedPet');
  const petAge = divElement.querySelector('#agePet');
  const defaultImage = divElement.querySelector('.default-image');

  // FORM VIEW
  const petform = divElement.querySelector('.pet-content');
  const userForm = divElement.querySelector('.userContent');
  const nextButtonForm = divElement.querySelector('#next');

  // FUNCIONES

  // FUNCION MOSTRAR VISTAS PERFIL
  nextButtonForm.addEventListener('click', () => {
    petform.style.display = 'none';
    userForm.style.display = 'block';
  });

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

  // FUNCION PARA ENVIAR LOS DATOS DEL FORMULARIO Y SUBIRLOS A FIRESTORE Y STORAGE

  formProfile.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('funciona');

    // ID DEL USUARIO
    const user = JSON.parse(localStorage.getItem('usuario'));
    const id = user.uid;
    console.log(id);

    // INFORMACION DEL PERFIL PARA SUBIR A FIRESTORE
    const User = {
      Name: userName.value,
      Phone: userPhone.value,
      DateBirth: userBirth.value,
      City: userCity.value,
      Pet: {
        PetName: petName.value,
        PetBreed: petBreed.value,
        PetAge: petAge.value,
      },
    };

    // SUBIR IMAGEN DE PERFIL A STORAGE
    async function uploadImage() {
      const file = inputPhoto.files[0];
      console.log(file);
      const path = `user/${id}/`;
      localStorage.setItem('pathStorage', path);
      console.log(localStorage.getItem('pathStorage'));
      await imageStorage(`${path}/profile/`, id, file);
    }

    // SUBIR INFORMACION A FIREBASE
    async function uploadInfo() {
      await uploadImage();
      await addUsersData(User, id).then(() => {
        window.location.hash = '#/dashboard';
      });
    }

    // LLAMAR LA FUNCION PARA SUBIR LA INFORMACION
    uploadInfo();

    // RESETEAR EL FORMULARIO
    formProfile.reset();
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