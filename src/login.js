// Function to check login credentials
function checkLoginCredentials(username, password) {
    // Retrieve existing user data from localStorage
    var userData = JSON.parse(localStorage.getItem("userData")) || [];

    // Check if the provided username and password match any registered user
    var user = userData.find(user => user.username === username && user.password === password);
    return user !== undefined; // Return true if a matching user is found, otherwise false
}

// Event listener for login form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    var username = document.getElementById("loginUsernameInput").value;
    var password = document.getElementById("loginPasswordInput").value;

    // Check if login credentials are valid
    if (checkLoginCredentials(username, password)) {
        alert("Login successful!");
        localStorage.clear();
        // Redirect or perform other actions upon successful login
    } else {
        alert("Invalid username or password!");
    }
});