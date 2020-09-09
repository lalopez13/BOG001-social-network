/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
// referencia de los servicios de firebase

// FIRESTORE

export async function addUsersData(dataUser, uid) {
  await firebase.firestore()
    .collection('user')
    .doc(uid)
    .set(dataUser)
    .then((doc) => {
      console.log(doc.data());
      console.log('Document successfully uploaded!');
    })
    .catch((error) => {
      console.log('Error upload document: ', error);
    });
}

// Añadir los descripcion de cada post a la coleccion del usuario
export function addPostUserData(uid, dataPost) {
  firebase.firestore()
    .collection('user')
    .doc(uid)
    .collection('post')
    .add(dataPost);
}


// Obtener los datos de la coleccion
export function getUserData(id) {
  firebase.firestore().collection('user')
    .doc(id)
    .get()
    .then((doc) => {
      console.log(doc.data());
      console.log('Document successfully !');
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
}


// Borrar los datos de la coleccion
export function deletePostUserData(uid, idPost) {
  firebase.firestore().collection('user')
    .doc(uid)
    .collection('post')
    .doc(idPost)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.log('Error removing document: ', error);
    });
}
// Aumenta el contador de Likes
// export async function likePost(currentUserId, postId, pushLike) {
//   const postRef = data.collection('post').doc(postId);
//   if (pushLike) {
//     postRef.update({
//       likes: firebase.firestore.FieldValue.arrayRemove(currentUserId),
//     });
//   } else {
//     postRef.update({
//       likes: firebase.firestore.FieldValue.arrayUnion(currentUserId),
//     });
//   }
// }
// ------------------------STORAGE---------------------------------

// Crear folder y guardar las imagenes
export function imageStorage(folder, id, file) {
  return firebase.storage()
    .ref(folder + id)
    .put(file);
}

// Borrar las imagenes del storage

export function deletePostImageData(folder) {
  firebase.storage()
    .ref(folder)
    .delete()
    .then(() => {
      console.log('File deleted successfully');
    })
    .catch((error) => {
      console.log(`Uh-oh, an error occurred!${error}`);
    });
}
