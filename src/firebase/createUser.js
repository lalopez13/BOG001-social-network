
import { auth } from './config.js';

export const createUsers = (email,password)=>{
  firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    window.location.hash = "#/profile";
    console.log("verificado");
  })
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  }