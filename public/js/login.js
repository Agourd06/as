document.querySelector('#loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const loginData = {};
    const formData = new FormData(this);
    formData.forEach((value, key) => loginData[key] = value);



    fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'role': 'etudiant', 
            },
            body: JSON.stringify(loginData),
        })
        
        .then(response => response.json())
        .then(data => {
            if (data.user) {
               
                if (data.user.role === 'formateur') {
                    window.location.href = '/formateur/home';

                } else if (data.user.role === 'etudiant') {
                    window.location.href = '/etudiant/home';
                    
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


setTimeout(function() {
    document.getElementById('message').style.display = 'none';
}, 4000);
