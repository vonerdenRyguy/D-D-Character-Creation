// show and hide login elements on the page
const loginWrapper = document.querySelector('.loginWrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.login-button');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', () => {
    loginWrapper.classList.add('active');
  });
  
  loginLink.addEventListener('click', () => {
    loginWrapper.classList.remove('active');
  });
  
  btnPopup.addEventListener('click', () => {
    loginWrapper.classList.add('active-popup');
  });
  
  iconClose.addEventListener('click', () => {
    loginWrapper.classList.remove('active-popup');
  });