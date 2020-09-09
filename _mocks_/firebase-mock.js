/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
// const firestone = () => {
//   return {
//     collection: (nameCollection) => {
//       return {
//         add: (objData) => {
//           return new Promise((resolve) => {
//             resolve('mensaje')
//           })
//         }
//       }
//     }
//   }
// }
//  const emailChar = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
//  const passChar = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
// const auth = {
//   createUserWithEmailAndPassword: (email, password) =>
//   /
//     new Promise((resolve, reject) => {
//       // const user = {
//       //   email: email,
//       //   password: password
//       // };
//       if (emailChar.test(email) && passChar.test(password)) {
//         // user.email;
//         // user.password;
//         // console.log(user.email, user.password);
//         resolve(email, password);
//       } else {
//         reject(error);
//       }
//       // reject('error');
//     }),

//   signInWithEmailAndPassword: (email, password) => {
//     console.log(email, password);
//     return new Promise((resolve, reject) => {
//       resolve(email, password);
//       reject(error);
//     });
//   },
// };


// const firebase = {
//   // firestone: firestone,
//   auth,
// };

// export default jest.fn(() => firebase);


// // export const auth = {
// //   email: 'mar@gmail.com',
// //   password: 'M65%casa9',
// // };

// firebase.firestore()
//     .collection('user')
//     .doc(uid)
//     .set(dataUser)

const doc = jest.fn().mockImplementation(() => {});

const collection = jest.fn().mockImplementation(nameCollection => ({
  add: objData => new Promise((resolve) => {
    resolve('soy un lindo perro');
  }),
  doc,
}));


const firestore = () => ({
  collection,
});

const auth = () => ({
  signInWithEmailAndPassword: (emailLogIn, passwordLogIn) => new Promise((resolve, reject) => {
    resolve({
      email: emailLogIn,
      password: passwordLogIn,
    });
    reject(error);
  }),

  createUserWithEmailAndPassword: (emailLogIn, passwordLogIn) => new Promise((resolve, reject) => {
    resolve({
      email: emailLogIn,
      password: passwordLogIn,
    });
    reject(error);
  }),
  signOut: () => new Promise((resolve, reject) => {
    resolve(
      'salir',
    );
    reject(error);
  }),

});


const firebase = {
  auth,
  firestore,
  // initializeApp() {}
};

export default jest.fn(() => firebase);
