const sub = document.getElementById('sub')
const fname = document.getElementById('fname')
const username = document.getElementById('username')
const password = document.getElementById('pass')
const email = document.getElementById('email')

sub.addEventListener('click', async function(){
    const data = {
        fname: fname.value,
        username: username.value,
        password: password.value,
        email: email.value,
    }
    const res = fetch('http:/localhost:5000/api/auth/register', {
        method: 'POST',
        headers:{
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    })
})

