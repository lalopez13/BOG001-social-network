import Home from '../views/home.js';
import signup from '../views/signup.js';
import login from '../views/login.js';
import profile from '../views/profile.js';
import dashboard from '../views/dashboard.js';
import error from '../views/404.js';

const content = document.getElementById('root');

export const router = (route) => {
  content.innerHTML = '';

  switch (route) {
    case '': {
      return content.appendChild(Home());
    }
    case '#/login':
      return content.appendChild(login());
    case '#/sign-up':
      return content.appendChild(signup());
    case '#/dashboard':
      return content.appendChild(dashboard());
    case '#/profile':
      return content.appendChild(profile());
    default:
      return content.appendChild(error());
  }
};

// ADMIN-FIREBASE

// var admin = require("firebase-admin");
// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://social-network-7.firebaseio.com"
// });

// const db= admin.database()

//     routes.post('/new-contact',(req,res)=>{
//         const newContact = {
//             name:req.body.firstname,
//             email:req.body.email,
//             phone:req.body.phone
//         }
//         db.ref('contacts').push(newContact)
//         console.log(req.body);
//         res.redirect('#/profile');
//         console.log(req.body);
//     })

//     module.exports = route;
