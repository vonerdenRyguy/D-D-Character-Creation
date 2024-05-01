// show and hide login elements on the page
const loginWrapper = document.querySelector('.loginWrapper');

document.querySelector('.register-link').addEventListener('click', () => {
    loginWrapper.classList.add('active');
  });
  
document.querySelector('.login-link').addEventListener('click', () => {
    loginWrapper.classList.remove('active');
  });
  
document.getElementById("login-button").addEventListener('click', () => {
    loginWrapper.classList.add('active-popup');
  });
  
document.querySelector('.icon-close').addEventListener('click', () => {
    loginWrapper.classList.remove('active-popup');
  });

// Hide logout button upon click, then display login button
document.getElementById("logout-button").addEventListener("click", function(event) {
    alert("Logged out");
    document.getElementById("logout-button").style.display = "none";
    document.getElementById("login-button").style.display = "block";
});