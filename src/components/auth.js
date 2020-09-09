// ----Handle Errors here.------- //
// //  var errorCode = error.code;
// // var errorMessage = error.message;
// The email of the user's account used.
// // var email = error.email;
// The firebase.auth.AuthCredential type that was used.
// // var credential = error.credential;
// ----- REFERENCIAS------ //
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
// Estado del usuario
function userState() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const userId = user;
      localStorage.setItem('usuario', JSON.stringify(userId));
      // User is signed in.
      console.log('usuario activo');
      // ...
    } else {
      console.log('no existe usuario activo');
      // User is signed out.
    }
  });
}
userState();
// Enviar Email de Confirmación
const sendEmail = () => {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification()
    .then(() => {
      console.log('El correo se envio');
      const overlay = document.querySelector('#overlay');
      const popup = document.querySelector('#popup');
      overlay.classList.add('active');
      popup.classList.add('active');
    })
    .catch((error) => {
      console.log(error.message);
    });
};
// Crear un usuario nuevo
export const createUsers = (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log(cred.user);
      sendEmail();
    }).catch((error) => {
      // Handle Errors here.
      console.log(error.message);
      const emailMessage = document.querySelector('#messageEmailSU');
      emailMessage.innerHTML = error.message;
    });
};
// Crear un usuario con google
export const createUserswithGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then(() => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      window.location.hash = '#/dashboard';
      console.log('google user');
    })
    .catch((error) => {
      console.log(`error google ${error}`);
    });
};
// Log in usuario
export const signInUsers = (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log(cred.user);
      window.location.hash = '#/dashboard';
    })
    .catch((error) => {
      console.log(error);
      const emailMessage = document.querySelector('#messageEmailLog');
      emailMessage.innerHTML = 'Este usuario no esta Registrado';
    });
};
// Cerrar sesion usuario
export const userSignOff = () => {
  auth
    .signOut()
    .then(() => {
      console.log('salir');
      window.location.hash = '';
    })
    .catch((error) => {
      console.log(error.message);
    });
};
// Recuperar contraseña usuario
export const recoverPass = (email) => {
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      const msjEmailSend = document.querySelector('#EmailSend');
      msjEmailSend.style.display = 'block';
    })
    .catch((error) => {
      console.log(error.message);
    });
};
