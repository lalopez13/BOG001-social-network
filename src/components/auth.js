// // references
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

// Estado del usuario

// function userState() {
//   firebase.auth.onAuthStateChanged((user) => {
//     if (user) {
//       const userId = user;
//       localStorage.setItem('usuario', JSON.stringify(userId));
//       // User is signed in.
//       console.log(userId);
//       // const displayName = user.displayName;
//       // const email = user.email;
//       // const emailVerified = user.emailVerified;
//       // console.log(user.emailVerified);
//       // const photoURL = user.photoURL;
//       // const isAnonymous = user.isAnonymous;
//       // const uid = user.uid;
//       // const providerData = user.providerData;
//       console.log('usuario activo');
//       // ...
//     } else {
//       console.log('no existe usuario activo');
//       // User is signed out.
//       // ...
//     }
//   });
// }

// userState();

// Crear un usuario nuevo
export const createUsers = (email, password) => {
  firebase.auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log(email, password);
      console.log(cred.user);
      //   return db.collection('userData').doc(cred.user.uid).set({
      // // return db.collection('userData').doc('usuario').set({
      //     Email: email,
      //     Password: password,
      //   });
      // console.log(cred.user);
      // console.log(db.collection('User').doc(cred.user.uid));

      // console.log('verificado');
    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
      // ...
    });
    return (`${email}, ${password}`);
};

// Crear un usuario con google
// export const createUserswithGoogle = () => {
//   firebase.auth
//     .signInWithPopup(provider)
//     .then(() => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       window.location.hash = '#/profile';
//       console.log('google user');
//       // const token = result.credential.accessToken;
//       // The signed-in user info.
//       // const user = result.user;
//       // ...
//     })
//     .catch((error) => {
//       console.log(`error google${error}`);
//       // Handle Errors here.
//       // var errorCode = error.code;
//       // var errorMessage = error.message;
//       // // The email of the user's account used.
//       // var email = error.email;
//       // // The firebase.auth.AuthCredential type that was used.
//       // var credential = error.credential;
//       // // ...
//     });
// };

// Log in usuario
export const signInUsers = (email, password) => {
  firebase.auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log(email, password);
      console.log(cred.user);
      window.location.hash = '#/dashboard';
    })
    .catch((error) => {
      console.log(error);
      const invalidUser = document.getElementById('userMessage');
      const warningLogin = 'Los datos de autenticación no son válidos';
      invalidUser.innerHTML = warningLogin;
      // alert('no estas registrado' + error);
    });
  return (`${email}, ${password}`);
};

// Cerrar sesion usuario
export const userSignOff = () => {
  firebase.auth
    .signOut()
    .then(() => {
      console.log('salir');
      window.location.hash = '';
    })
    .catch((error) => {
      console.log(error.message);
    });
};
