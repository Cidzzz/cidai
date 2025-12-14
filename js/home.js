document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    // Dummy user database
    const users = {
        "cid": "cid",
        "mici": "suki"
    };

    startBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
        loginError.textContent = '';
    });

    window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
            loginError.textContent = '';
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        if (users[username] && users[username] === password) {
            // Successful login
            console.log('Login successful');
            window.location.href = 'chat.html'; // Redirect to chat page
        } else {
            // Failed login
            loginError.textContent = 'Invalid username or password.';
        }
    });
});
