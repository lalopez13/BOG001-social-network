import { userSignOff } from '../components/auth.js';
import { createElementHTML } from '../lib/createElementPost.js';
import { imageStorage, deletePostUserData, deletePostImageData, likePost } from '../components/database.js';

export default () => {
  const view = `
  <!--HEADER INFORMACION DEL USUARIO-->
  <div class="dashboard">
    <div id="user-header">
      <div id="user">
        <div id="user-picture">
          <div id="picture-box">
            <img src="" id="userphoto" alt="user-Avatar">
          </div>
        </div>
        <div id="user-info">
          <h2 class="user_name" id="name"></h2>
          <hr>
          <ul id="user_list">
            <li class="email-head"><span class="info_icon"><i class="fas fa-envelope"></i></span><span id="email"></span></li>
            <li><span class="info_icon"><i class="fas fa-paw"></i></span><span id="breed"></span></li>
            <li><span class="info_icon"><i class="fas fa-map-marker-alt"></i></span><span id="city"></span></li>
          </ul>
        </div>
      </div>
      <div id="nav-btn">
        <button id="mainPage"><i class="fas fa-home"></i></button>
        <button id="addPost"><i class="fas fa-plus-circle"></i></button>
        <button id="editUser"><i class="fas fa-user-edit"></i></button>
        <button id="signOff"><i class='fas fa-sign-out-alt'></i></button>
      </div>
    </div>
    <section class="board">
    <!-- The Modal -->
    <div id="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
       <span class="close"><i class="fas fa-times-circle"></i></span> 
      <div class="post-form">
        <div class="post-header">
        <h2 id="post-header-title">Crear post</h2>
        </div>
        <form name="post-user-form" id="post-user" >
        <div>
        <div class="post-preview" id="postPreviewImage">
          <img src="" alt="postpreview" class="post-preview-image" />
          <span class="post-preview-text">Image preview</span>
        </div>
        <br>
        <label class="upload-img-post">Sube tu imagen
                <input type="file" name="postPreview" id="postPreview" >
        </label>
      </div>
          <div class="infoPostUser">
            <textarea type="text" id="description" rows="2" cols="100" maxlength="120" required></textarea></br>
            <input type="submit" id="submit-post" value="submit" >
          </div>
        </form>
      </div>
      </div>
      </div>
      <!--MODAL DELETE-->
      <div class="modal-delete" id="modal">
        <div class="modal-delete-container">
          <div class="modal-delete-content">
            <header class="delete-post-title">
              <p> ¿Esta seguro de querer borrar la publicación? </p>
            </header>
            <div class="delete-post-content">
              <p>Esta acción no se puede deshacer </p>
            </div>
            <div class="modal-delete-box-button">
              <button class="cancel" id="cancel" class="btn-delete">Cancelar</button>
             <button id="deletePost"  class="btn-delete delete-modal">Borrar</button>
            </div>
          </div>
        </div>
      </div>
     
      <!--Donde se muestran todos los post-->
      <div id="post-container"></div>
    </section>
    <aside>
      <div id="post-aside-info">
        <p>BIENVENIDO</p>
        <ul>
          <li><span class="aside-icon"><i class="fas fa-dog"></i></span>Postea fotos de tu mejor amigo</li>
          <li><span class="aside-icon"><i class="fas fa-portrait"></i></span>Describe tu imagen en menos de 120
            caracteres, una imagen vale mas que mil palabras</li>
          <li><span class="aside-icon"><i class="fas fa-heart"></i></span>Dale like a tus post favoritos</li>
          <li><span class="aside-icon"><i class="fas fa-users"></i></span>Invita a amigos y haz crecer la comunidad</li>
        </ul>
      </div>
    </aside>
  </div>
`;
  // VARIABLES
  const nav = document.getElementById('headerNav');
  nav.style.display = 'none';
  const divElement = document.createElement('div');
  divElement.innerHTML = view;
  // CAMPOS INFORMACION DEL HEADER DEL USUARIO
  const name = divElement.querySelector('#name');
  const city = divElement.querySelector('#city');
  const email = divElement.querySelector('#email');
  const img = divElement.querySelector('#userphoto');
  const breed = divElement.querySelector('#breed');
  // CAMPOS FORMULARIO
  const postForm = divElement.querySelector('#post-user');
  const postContainer = divElement.querySelector('#post-container');
  const postFormHeaderTitle = divElement.querySelector('#post-header-title');
   // INPUT SUBIR FOTO DE POST
  const filePost = divElement.querySelector('#postPreview');
  const previewImage = divElement.querySelector('.post-preview-image');
  const defaultText = divElement.querySelector('.post-preview-text');
  // BOTONES
  const btnAddpost = divElement.querySelector('#addPost');
  const btnSingOff = divElement.querySelector('#signOff');
  const postSubmit = divElement.querySelector('#submit-post');
  // MODAL
  const modal = divElement.querySelector('#myModal');
  const span = divElement.getElementsByClassName('close')[0];
  // MODAL BORRAR POST
  const modalDelete = divElement.querySelector('.modal-delete');
  const cancelDeletePost = divElement.querySelector('.cancel');
  const deletePostBtnModal = divElement.querySelector('#deletePost');
  // USER UID
  const getUserUid = JSON.parse(localStorage.getItem('usuario'));
  const uidUser = getUserUid.uid;
  console.log(uidUser);
  console.log(getUserUid.email);
  // VARIABLE EDITAR
  let editStatus = false;
  let idUser = '';
  // FUNCION MODAL
  cancelDeletePost.addEventListener('click', () => {
    modalDelete.classList.remove('modal-open');
  });
  // MODAL  CREAR POST
  btnAddpost.addEventListener('click', () => {
    modal.style.display = 'block';
  });
  // CERRAR EL MODAL
  span.onclick = () => {
    modal.style.display = 'none';
    postForm.reset();
  };
  // CERRAR EL MODAL HACIENDO CLICK EN CUALQUIER PARTE DE LA VENTANA
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      postForm.reset();
    }
  };
  // FUNCION PREVIEW IMAGEN POST
  filePost.addEventListener('change', () => {
    const file = filePost.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      defaultText.style.display = 'none';
      previewImage.style.display = 'block';
      reader.addEventListener('load', () => {
        previewImage.setAttribute('src', reader.result);
      });
      reader.readAsDataURL(file);
    } else {
      defaultText.style.display = null;
      previewImage.style.display = null;
      previewImage.setAttribute('src', '');
    }
  });
  // MOSTRAR LA FOTO DE PERFIL DEL USUARIO
  let urlProfileUser = '';
  function storage() {
    const storageRef = firebase
      .storage()
      .ref(`user/${uidUser}/profile/${uidUser}`);
    storageRef
      .getDownloadURL()
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        console.log(url);
        // Or inserted into an <img> element
        urlProfileUser = url;
        img.src = url;
        // imgAvatarPost.src = url;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // MOSTRAR EN EL HEAD LA INFORMACION DEL USUARIO
  // Variables para almacenar la informacion del usuario y mostrarlo en cada post
  let nameUser = '';
  let cityUser = '';

  function loadInfoUserHeader() {
    email.innerHTML = getUserUid.email;
    // await getUserData(uidUser)
    // Data usurio de firestore
    firebase
      .firestore()
      .collection('user')
      .doc(uidUser)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          name.innerHTML = data.Pet.PetName;
          nameUser = data.Pet.PetName;

          city.innerHTML = data.City;
          cityUser = data.City;

          breed.innerHTML = data.Pet.PetBreed;
          console.log(data.Pet.PetName);
          console.log('Document data:', data);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }
  storage();
  loadInfoUserHeader();

  // CREAR POST USUARIO
  // REF DEL DOC Y SUBCOLECCION DEL USUARIO/POST
  async function savePostInfo(description) {
    await firebase
      .firestore()
      .collection('user')
      .doc(uidUser)
      .collection('post')
      .add({
        description,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      // await addPostUserData(uidUser, { description })
      .then((postDoc) => {
        console.log('GUARDAR POST ');
        console.log(postDoc);
        const file = filePost.files[0];
        // localStorage.setItem('idUserPost', postIdUser);
        const uploadImage = imageStorage(
          `user/${uidUser}/post/${postDoc.id}/`,
          postDoc.id,
          file
        );
        // `${pathUserStorage}
        // eslint-disable-next-line comma-dangle
        uploadImage.on(
          'state_changed',
          (snapshot) => {
            // Get task progress,
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
              default:
                console.log('default');
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                console.log('storage/unauthorized');
                break;
              case 'storage/canceled':
                console.log('storage/canceled');
                break;
              case 'storage/unknown':
                console.log('storage/unknown');
                break;
              default:
                console.log('default');
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            console.log('succesful');
            uploadImage.snapshot.ref.getDownloadURL().then((url) => {
              console.log('BANANOS')
              console.log(url);
              firebase
                .firestore()
                .collection('user')
                .doc(uidUser)
                .collection('post')
                .doc(postDoc.id)
                .get()
                .then((querySnapshot) => {
                  // eslint-disable-next-line no-use-before-define
                  createPost(querySnapshot, url);
                });
            });
          }
        );
      });
  }

  // EDITAR LOS POST DEL USUARIO
  const editPost = (id) =>
    firebase
      .firestore()
      .collection('user')
      .doc(uidUser)
      .collection('post')
      .doc(id)
      .get();

  // CONST UPDATE POST
  const updatePost = (id, updatePost) =>
    firebase
      .firestore()
      .collection('user')
      .doc(uidUser)
      .collection('post')
      .doc(id)
      .update(updatePost);

  function createPost(postQ, url) {
    let text;
    console.log('empieza');
    console.log(postQ.id, ' => ', postQ.data());
    // Create main div
    const post = createElementHTML(
      'div',
      {
        class: 'soulmates-post',
        id: postQ.id,
      },
      postContainer,
      '',
      true
    );
    // Modal confirmacion borrar post
    const deleteModalPost = createElementHTML(
      'div',
      {
        class: 'modal-delete',
        id: 'modal',
      },
      postContainer
    );

    // Div contenedor top
    const topPostDiv = createElementHTML(
      'div',
      {
        class: 'soulmates-post-top',
      },
      post
    );
    // Div user info
    const UserImageProfileDiv = createElementHTML(
      'div',
      {
        class: 'soulmates-post-avatar',
      },
      topPostDiv
    );
    // Imagen de perfil
    const imgUserProfile = createElementHTML(
      'img',
      {
        class: 'post-header-avatar',
        src: urlProfileUser,
      },
      UserImageProfileDiv
    );
    // Nombre Perfil
    const nameUserDiv = createElementHTML(
      'div',
      {
        class: 'soulmates-post-name',
      },
      topPostDiv,
      nameUser
    );
    // Ciudad
    const cityUserDiv = createElementHTML(
      'div',
      {
        class: 'soulmates-post-title',
      },
      topPostDiv,
      cityUser
    );

    // Body post
    // Div user info
    const postImageDiv = createElementHTML(
      'div',
      {
        class: 'soulmates-post-image',
      },
      post
    );
    // Imagen post
    const imgPost = createElementHTML(
      'img',
      {
        class: 'post-image-avatar',
        src: url,
      },
      postImageDiv
    );

    // Bottom post
    const bottomPostDiv = createElementHTML(
      'div',
      {
        class: 'soulmates-post-bottom',
      },
      post
    );
    // Descr post Div
    const descrPost = createElementHTML(
      'div',
      {
        class: 'soulmates-post-desc',
      },
      bottomPostDiv
    );
    // P element Descr
    const pDesc = createElementHTML(
      'p',
      {
        class: 'post-text',
        id: `${postQ.id}-desc`,
      },
      descrPost,
      postQ.data().description
    );
    // Icons post Div
    const IconPost = createElementHTML(
      'div',
      {
        class: 'soulmates-post-icons',
      },
      bottomPostDiv
    );
    // Span icons
    const iconSpan = createElementHTML(
      'span',
      {
        class: 'heart-counter',
        id: 'countLikes'
      },
      IconPost,
      '0'
    );
    // Button like incon
    const buttonLike = createElementHTML(
      'span',
      {
        id: 'like',
        class: 'likes',
        'data-id': postQ.id,
      },
      IconPost
    );
    // i element likes
    const iButtonLike = createElementHTML(
      'i',
      {
        class: 'fas fa-heart',
      },
      buttonLike
    );
    // Span Me encanta
    const mencantaSpan = createElementHTML('span', {}, IconPost, 'Me encanta');
    /*buttonLike.addEventListener('click', function () {
        const uidUser = firebase.auth().currentUser;
        let pushLike = post.likes.some(likes => likes === userid.uid);
        likePost(postQ.id,uidUser,pushLike);
        if (pushLike) {
          pushLike = false;
        } else {
          pushLike = true;
        }
      },
      false
    );*/
    // Edit button
    const editButton = createElementHTML(
      'button',
      {
        class: 'edit-post',
        'data-id': postQ.id,
      },
      IconPost,
      'Editar'
    );
    editButton.addEventListener(
      'click',
      function () {
        editContentPost(postQ.id);
      },
      false
    );
    // Delete button
    const deleteButton = createElementHTML(
      'button',
      {
        class: 'delete-post',
        'data-id': postQ.id,
      },
      IconPost,
      'Borrar'
    );
    deleteButton.addEventListener(
      'click',
      () => {
        deleteContentPost(postQ.id);
      },
      false
    );
    console.log('Termina');
  }

  //BORRAR Y EDITAR POST

  function editContentPost(id) {
    console.log(id + 'nueva funcion boton modal');
    modal.style.display = 'block';
  }
// BORRAR POST 
  function deleteContentPost(id) {
    const postDiv = document.getElementById(id);
    console.log(postDiv);
    console.log( id + " "+ "="  +" " + "rNDtPUT6pdmhn1twAkkb")
    console.log(typeof id)
    modalDelete.classList.add('modal-open');
    console.log(id + 'eliminar boton modal');

    deletePostBtnModal.addEventListener('click', (e) => {
      console.log(e.target.dataset.id);
      e.preventDefault();
      deletePostUserData(uidUser, id);
      deletePostImageData(`user/${uidUser}/post/${id}/${id}`);
      modalDelete.classList.remove('modal-open');
      console.log(postContainer)
      postContainer.removeChild(postDiv);
    });
  }

  // FUNCION PARA MOSTRAR POST EN EL MURO DE PUBLICACION
  function loadPost() {
    firebase
      .firestore()
      .collection('user')
      .doc(uidUser)
      .collection('post')
      .orderBy('date', 'desc')
      .get()
      .then((querySnapshot) => {
        //   postContainer.innerHTML = '';
        querySnapshot.forEach((postQ) => {
          console.log(postQ.id, ' => ', postQ.data());
          firebase
            .storage()
            .ref(
              `user/${uidUser}/post/${postQ.id}/${postQ.id}`
            )
            .getDownloadURL()
            .then((url) => {
              createPost(postQ, url);
            });
        });
      });
    //});
  }

  loadPost();
  // ENVIAR INFORMACION DEL POST
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = postForm.description;

    if (!editStatus) {
      await savePostInfo(description.value);
    } else {
      updatePost(idUser, {
        description: description.value,
      });
      editStatus = false;
      idUser = '';
      postSubmit.value = 'Guardar';
    }
    previewImage.style.display = 'none';
    postForm.reset();
  });

  postSubmit.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // CERRAR SESION
  btnSingOff.addEventListener('click', (e) => {
    e.preventDefault();
    // Cerrar sesion
    userSignOff();
    window.location.hash = '';
  });

  return divElement;
};