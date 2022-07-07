const loginForm = document.getElementById('login-form');

const handleLogin = (name, password) => {
    fetch('http://localhost:8080/loginAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password})
    })
        .then(() => {}) 
        .catch((err) => {
          alert('Ha ocurrido un error: ' + err.message)
        })
};

const login = e => {
    e.preventDefault();

    const { name, pwd } = e.target;

    handleLogin(name.value, pwd.value);
};

loginForm.addEventListener('submit', login);
