// Add JavaScript functionality if needed

// Example: Function to handle navbar link clicks
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            alert(`You clicked on ${this.textContent}`);
        });
    });
});

