// function to check login credentials
function checkLoginCredentials(username, password) {
    var userData = JSON.parse(localStorage.getItem("userData")) || [];

    // check if the user already exists
    var user = userData.find(user => user.username === username && user.password === password);
    return user !== undefined;
}

// event listener for login form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("loginUsernameInput").value;
    var password = document.getElementById("loginPasswordInput").value;

    if (checkLoginCredentials(username, password)) {
        alert(username + " logged in");
        // Hide login button, show logout button
        document.getElementById("login-button").style.display ="none";
        document.getElementById("logout-button").style.display ="inline-block";
    }
    else
        alert("Username or password is invalid");
});