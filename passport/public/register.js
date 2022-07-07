const registerForm = document.getElementById('register-form');

const handleLogin = (name, password) => {
    fetch('http://localhost:8080/registerAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password })
    })
        .then((res) => res.json())
        .catch((err) => {
          alert('Ha ocurrido un error: ' + err.message)
        })
};

const register = e => {
    e.preventDefault();

    const { name, pwd } = e.target;

    handleLogin(name.value, pwd.value);
};

registerForm.addEventListener('submit', register);
