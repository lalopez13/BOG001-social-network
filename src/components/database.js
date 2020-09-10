// referencia de los servicios de firebase
const db = firebase.firestore();
const storage = firebase.storage();
// -------FIRESTORE-------- //
export function loadInfoUser(collection, uid) {
  db
    .collection(collection)
    .doc(uid)
    .get();
}
// Añadir los datos del perfil de usuario
export async function addUsersData(dataUser, uid) {
  await db
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
// Añadir los datos de cada post a la coleccion del usuario
export async function addPostUserData(uid, dataPost) {
  await db
    .collection('user')
    .doc(uid)
    .collection('post')
    .add(dataPost)
    .then((doc) => {
      console.log(doc.data());
      console.log('Document successfully uploaded!');
    })
    .catch((error) => {
      console.log('Error upload document: ', error);
    });
}
// Obtener los datos de la coleccion
export function getUserData(id) {
  db.collection('user')
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
  db.collection('user')
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

/* Aumenta el contador de Likes
export async function likePost(currentUserId, postId, pushLike) {
  const postRef = data.collection('post').doc(postId);
  if (pushLike) {
    postRef.update({
      likes: firebase.firestore.FieldValue.arrayRemove(currentUserId),
    });
  } else {
    postRef.update({
      likes: firebase.firestore.FieldValue.arrayUnion(currentUserId),
    });
  }
}*/
// ------------------------STORAGE---------------------------------
// Crear folder y guardar las imagenes
export function imageStorage(folder, id, file) {
  return storage
    .ref(folder + id)
    .put(file);
}
// Borrar las imagenes del storage
export function deletePostImageData(folder) {
  storage
    .ref(folder)
    .delete()
    .then(() => {
      console.log('File deleted successfully');
    })
    .catch((error) => {
      console.log(`Uh-oh, an error occurred!${error}`);
    });
}
