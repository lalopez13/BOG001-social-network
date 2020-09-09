/* eslint-disable no-param-reassign */
export const previewFiles = (fileUser, defaultText, previewImage) => {
  fileUser.addEventListener('change', () => {
    const file = fileUser.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      defaultText.style.display = 'none';
      previewImage.style.display = 'block';
      reader.addEventListener('load', () => {
        // console.log(this) ;
        previewImage.setAttribute('src', reader.result);
      });
      reader.readAsDataURL(file);
    } else {
      defaultText.style.display = null;
      previewImage.style.display = null;
      previewImage.setAttribute('src', '');
    }
  });
};
