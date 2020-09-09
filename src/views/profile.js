import { addUsersData, imageStorage } from '../components/database.js';
import { previewFiles } from '../lib/previewFiles.js';

export default () => {
  const view = `

  <div class="main">

  <section class="form-image">
  <h1 class="form-image-title">Crea tu perfil</h1>
  </section>

  <section class="form-user">
<div class="background-image"> 
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
                  <small class="message-alert"></small>
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
  const petType = divElement.querySelector('input[name="pet"]:checked');
  const messageEmptyInput = divElement.querySelector('.message-alert');
  const defaultImage = divElement.querySelector('.default-image');

  // FORM VIEW
  const petform = divElement.querySelector('.pet-content');
  const userForm = divElement.querySelector('.userContent');
  const nextButtonForm = divElement.querySelector('#next');

  // FUNCIONES

  // FUNCION MOSTRAR VISTAS PERFIL Y VALIDAR INPUTS VACIOS PET FORM
  nextButtonForm.addEventListener('click', (e) => {
    console.log('click');
    e.preventDefault();
    // eslint-disable-next-line eqeqeq
    if ((petName.value == '') || (petBreed.value == '') || (petAge.value == '') || (userCity.value == '') || (inputPhoto.value == ' ')) { // COMPRUEBA CAMPOS VACIOS
      messageEmptyInput.innerHTML = '*Los campos no pueden quedar vacios';
      return false;
    }
    petform.style.display = 'none';
    userForm.style.display = 'block';
    return true;
  });


  // FUNCION PREVIEW IMAGEN DE PERFIL

  previewFiles(inputPhoto, defaultImage, imagePreview);

  // FUNCION PARA ENVIAR LOS DATOS DEL FORMULARIO Y SUBIRLOS A FIRESTORE Y STORAGE

  formProfile.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('funciona');
    // ID DEL USUARIO
    const user = JSON.parse(localStorage.getItem('usuario'));
    const id = user.uid;
    console.log(id);
    console.log(petType.value);
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
        PetType: petType.value,
      },
    };

    // SUBIR IMAGEN DE PERFIL A STORAGE
    function uploadImage() {
      const file = inputPhoto.files[0];
      console.log(file);
      const path = `user/${id}/`;
      localStorage.setItem('pathStorage', path);
      console.log(localStorage.getItem('pathStorage'));
      imageStorage(`${path}/profile/`, id, file);
    }

    // SUBIR INFORMACION A FIREBASE
    function uploadInfo() {
      uploadImage();
      addUsersData(User, id).then(() => {
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
