document.querySelector('#loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const loginData = {};
    const formData = new FormData(this);
    formData.forEach((value, key) => loginData[key] = value);

    fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                localStorage.setItem('userId', data.user.id);
                localStorage.setItem('userRole', data.user.role);

                if (data.user.role === 'formateur') {
                    window.location.href = '/formateur/home';
                    console.log('formateur loged');

                } else if (data.user.role === 'etudiant') {
                    window.location.href = '/etudiant/home';
                    console.log('etudiant loged');
                    
                }
            } else {
                alert(data.message || 'Login failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login. Please try again.');
        });
});