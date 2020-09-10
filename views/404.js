/* eslint-disable arrow-parens */
export default () => {
  const view = `
        <div id="error"></div>
        <div id="error-movil"></div>
    `;
  const divElement = document.createElement('div');
  divElement.innerHTML = view;
  return divElement;
};
