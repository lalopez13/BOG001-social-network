/* eslint-disable no-shadow */
export default () => {
  const view = `
    <!--HEADER INFORMACION DEL USUARIO-->
    <div class="dashboard">
      <div id="user-header">
        <div id="user">
          <div id="user-picture">
            <div id="picture-box">
              <img src="../img/Sm-icon.png" id="userphoto" alt="user-Avatar">
            </div>
          </div>
          <div>
          <img src="../img/logo-BluePink.png" width="300px">
          </div>
          <!--<div id="user-info">
            <h2 class="user_name" id="name"></h2>
            <hr>
            <ul id="user_list">
              <li class="email-head"><span class="info_icon"><i class="fas fa-envelope"></i></span><span id="email"></span></li>
              <li><span class="info_icon"><i class="fas fa-paw"></i></span><span id="breed"></span></li>
              <li><span class="info_icon"><i class="fas fa-map-marker-alt"></i></span><span id="city"></span></li>
            </ul>
          </div>-->
        </div>
        <div id="nav-btn">
          <button id="mainPage"><i class="fas fa-home"></i></button>
          <button id="addPost"><i class="fas fa-plus-circle"></i></button>
          <button id="editUser"><i class="far fa-user"></i></button>
          <button id="signOff"><i class="fas fa-times-circle"></i></button>
        </div>
      </div>`;
  const divElement = document.createElement('div');
  divElement.innerHTML = view;
  const nav = document.getElementById('headerNav');
  nav.style.display = 'none';


  firebase.firestore().collectionGroup('user').onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      firebase.firestore().collectionGroup('post').onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });
      });
    });
  });
  return divElement;
};
