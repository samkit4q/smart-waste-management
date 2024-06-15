ddEventListener('DOMContentLoaded', function () {
    // Select the login form
    const loginForm = document.getElementById('loginForm');

    // Add event listener for form submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get user input values
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Perform basic validation (you can expand this as needed)
        if (!email || !password) {
            alert('Please enter both email and password.'); // Show an alert for now
            return;
        }

        // Simulate login process (replace with actual login logic)
        // For demonstration, just show an alert with the entered email
        alert(`Logging in with email: ${email}`);
    });
});

