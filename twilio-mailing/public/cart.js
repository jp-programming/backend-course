const logoutBtn = document.getElementById('logoutBtn');

const handleLogout = () => {
    location.href = '/app/logout';
}

logoutBtn.addEventListener('click', handleLogout);