/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
export const createElementHTML = (typeElement, object, father, text, flagPost) => {
    const element = document.createElement(typeElement);
    if (object != null) {
      Object.keys(object).map((a) => {
        element.setAttribute(a, object[a]);
      });
    }
    if (text != null && text !== '') {
      const elementText = document.createTextNode(text);
      element.appendChild(elementText);
    }
    if (flagPost) {
      father.prepend(element);
    } else {
      father.appendChild(element);
    }
  
    return element;
  };
  
  export const createModalTemplate = (id, container) => {
    container.innerHTML = `
      <div class="modal-delete-container">
      <div class="modal-delete-content">
        <header class="delete-post-title">
          <p> ¿Esta seguro de querer borrar la publicación? </p>
        </header>
        <div class="delete-post-content">
          <p>Esta acción no se puede deshacer </p>
        </div>
      </div>
      <div class="modal-delete-box-button">
        <button class="cancel" id="cancel" class="btn-delete">Cancelar</button>
        <button id="deletePost" data-id="${id}" class="btn-delete delete-modal">Borrar</button>
      </div>
    </div>
  `;
  };