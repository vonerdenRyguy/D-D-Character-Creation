// function to check if the username already exists
function isUsernameExists(username, userData) {
    return userData.some(user => user.username === username);
}

// function that registers a user with their password
function registerUser(username, password) {
    var userData = JSON.parse(localStorage.getItem("userData")) || [];

    if (isUsernameExists(username, userData)) {
        alert("Username already exists");
        return;
    }

    // create a new user for userData
    var newUser = { username: username, password: password };
    userData.push(newUser);

    // save userData to localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("User registered");
}

// event listener for registration form submission
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("registerUsernameInput").value;
    var password = document.getElementById("registerPasswordInput").value;

    // attempt to register the user
    registerUser(username, password);
});