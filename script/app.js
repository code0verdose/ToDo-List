const sub = document.getElementById('sub')
const fname = document.getElementById('fname')
const username = document.getElementById('username')
const password = document.getElementById('pass')
const email = document.getElementById('email')

sub.addEventListener('click', async function () {
    const data = {
        fname: fname.value,
        username: username.value,
        password: password.value,
        email: email.value,
    }
    const res = fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)
    })
        .then((res) => {
            if (res.status === 500) {
                const regAlert = document.querySelector('.reg__alert')
                regAlert.innerHTML = ""
                regAlert.insertAdjacentHTML('beforeend', '<p style="text-align:center; color: #a82a38;font-size: 16px; margin-top: 20px;">Пользователь уже существует!</p>')

            }
        })


})
