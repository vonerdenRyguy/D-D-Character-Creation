// Function to check if username already exists
function isUsernameExists(username, userData) {
    return userData.some(user => user.username === username);
}

// Function to handle user registration
function registerUser(username, password) {
    // Retrieve existing user data from localStorage
    var userData = JSON.parse(localStorage.getItem("userData")) || [];

    // Check if username already exists
    if (isUsernameExists(username, userData)) {
        alert("Username already exists. Please choose another.");
        return;
    }

    // Add new user to user data
    var newUser = { username: username, password: password };
    userData.push(newUser);

    // Save updated user data to localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Registration successful!");
}

// Event listener for registration form submission
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    var username = document.getElementById("registerUsernameInput").value;
    var password = document.getElementById("registerPasswordInput").value;

    // Register the user
    registerUser(username, password);
});