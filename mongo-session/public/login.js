const loginForm = document.getElementById('login-form');

const handleLogin = (name) => {
    fetch('http://localhost:8080/loginAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name })
    })
        .then((res) => res.json())
        .then((res) => {
            if(res.session.state) {
                window.location.href = '/';
            }
        })
        .catch((err) => {
          alert('Ha ocurrido un error: ' + err.message)
        })
};

const login = e => {
    e.preventDefault();

    const { name } = e.target;
    if(name.value === '') {
        alert('Please enter your name');
        return;
    }

    handleLogin(name.value);
};

loginForm.addEventListener('submit', login);
