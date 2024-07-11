document.getElementById('loginForm')
document.addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();
    var rememberMe = document.getElementById('rememberMe').checked;

    if (!validateForm(username, password)) {
        return;
    }

    var spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        spinner.classList.add('hidden');
        document.getElementById('responseMessage').textContent = 'Login Successful!';
        console.log(data);
        alert("Login Successful when you click on Ok the display Login Successful in your container downwards");
    })
    .catch(error => {
        spinner.classList.add('hidden');
        document.getElementById('responseMessage').textContent = 'Login failed. Please try again.';
        console.error('Error:', error);
    
    });
});

document.getElementById('showPassword').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    passwordField.type = this.checked ? 'text' : 'password';
});

function validateForm(username, password) {
    let isValid = true;

    if (username === '' || !isValidEmail(username)) {
        showError('username', 'Please enter a valid email.');
        isValid = false;
    } else {
        showError('username', '');
    }

    if (password === '' || password.length < 6) {
        showError('password', 'Password must be at least 6 characters long.');
        document.getElementById('responseMessage').textContent = 'Login Failed!';
        isValid = false;
    } else {
        showError('password', '');
    }

    return isValid;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(inputId, message) {
    const inputGroup = document.getElementById(inputId).parentElement;
    const small = inputGroup.querySelector('small');
    small.textContent = message;
    small.style.display = message ? 'block' : 'none';
}
