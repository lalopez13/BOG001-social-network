// Almacenar en firestore datos del perfil Usuario

const db = firebase.firestore();

// const user = JSON.parse(localStorage.getItem('usuario'));
// console.log(user.uid);
export const addUsersData = (dataUser, id) => {
  // db.collection('userData').doc(cred.user.uid).db.collection(collection)
  db.collection('user').doc(id).set(dataUser);
  // console.log(user.uid);
  // db.collection('user')
  // .add(dataUser)
  // .then((user.uid) => {
  //   console.log('Document written with ID: ', user.uid);
  // })
  // .catch((error) => {
  //   console.log('Error adding document: ', error);
  // });
};
