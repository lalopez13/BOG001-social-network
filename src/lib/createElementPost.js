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
