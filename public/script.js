document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    // Example hardcoded default credentials for testing
    var defaultEmail = 'deji@gmail.com';
    var defaultPassword = 'deji123';

    // Check if entered credentials match default credentials
    if (email === defaultEmail && password === defaultPassword) {
        // Redirect to dashboard or home page after successful login
        window.location.href = 'home.html'; // Replace with your actual dashboard page
    } else {
        alert('Invalid email or password. Please try again.');
    }
});


document.getElementById('scheduleForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Extract the entered data
    var collectionDate = document.getElementById('collectionDate').value;
    var collectionTime = document.getElementById('collectionTime').value;

    // Create a list item to display the entered data
    var listItem = document.createElement('li');
    listItem.textContent = `Collection Date: ${collectionDate}, Collection Time: ${collectionTime}`;

    // Add the list item to the list on the page
    document.getElementById('collectionList').appendChild(listItem);

    // Optionally, clear the form fields after submission
    document.getElementById('collectionDate').value = '';
    document.getElementById('collectionTime').value = '';
});
