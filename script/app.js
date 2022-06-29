//Получаю элементы страницы (инпуты)
const subReg = document.getElementById('sub_reg')
const subLog = document.getElementById('sub_login')
const fname = document.getElementById('fname')
const username = document.getElementById('username')
const password = document.getElementById('pass')
const email = document.getElementById('email')
const regAlert = document.querySelector('.reg__alert')
const logAlert = document.querySelector('.log__alert')
const regForm = document.querySelector('.reg')
const loginForm = document.querySelector('.login')
const btnToIn = document.querySelector('.btn--login')
const btnToUp = document.querySelector('.btn--reg')
const usernameLogin = document.getElementById('username_login')
const passwordLogin = document.getElementById('pass_login')


//Ставлю прослушку на кнопку subReg (Регистрация)
subReg.addEventListener('click', async () => {

    //Создаю объект для body запроса
    const data = {
        fname: fname.value,
        username: username.value,
        password: password.value,
        email: email.value,
    }

    //Отправляю запрос с данными из формы
    const res = fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)
    })

        //Обработка ошибок
        .then((res) => {
            if (res.status === 500) {
                regAlert.innerHTML = ""
                regAlert.insertAdjacentHTML('beforeend', '<p style="text-align:center; color: #a82a38;font-size: 16px; margin-top: 20px;">Пользователь уже существует!</p>')

            }
            if (res.status === 201) {
                regForm.innerHTML = ""
                regForm.insertAdjacentHTML('beforeend', '<p style="text-align:center; color: #2EE59D;font-size: 16px;">Пользователь успешно зарегистрирован!</p>')
            }
            return res.json()

        })
        .then((data) => {
            data.errors.forEach((elem) => {
                regAlert.innerHTML = ''
                regAlert.insertAdjacentHTML('beforeend', `<p style="text-align:center; color: #a82a38;font-size: 16px; margin-top: 20px;">${elem.msg}</p>`)

            })

        })
})


//Ставлю прослушку на кнопку subLog (Авторизация)
subLog.addEventListener('click', async () => {
    const data = {
        username: usernameLogin.value,
        password: passwordLogin.value,
    }

    //Отправляю запрос с данными из формы
    const res = fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)
    })

        //Обработка ошибок
        .then((res) => {
            if (res.status === 200) {
                loginForm.innerHTML = ""
                loginForm.insertAdjacentHTML('beforeend', '<p style="text-align:center; color: #2EE59D;font-size: 16px;">Успешная авторизация!</p>')

            }
            return res.json()
        })
        .then((data) => {
            logAlert.innerHTML = ''
            logAlert.insertAdjacentHTML('beforeend', `<p style="text-align:center; color: #a82a38;font-size: 16px; margin-top: 20px;">${data.message}</p>`)
            return data
        })
        .then((data) => {
            if (data.message === undefined) {
                window.localStorage.setItem('access_token', data)
            }
        })
})


//Смена типа авторизации (Зарегистрироваться/Войти)
btnToIn.addEventListener('click', () => {
    regForm.style.display = 'none'
    loginForm.style.display = 'flex'
    btnToIn.style.color = '#fff'
    btnToIn.style.background = '#000'
    btnToUp.style.color = '#000'
    btnToUp.style.background = '#fff'
})

btnToUp.addEventListener('click', () => {
    loginForm.style.display = 'none'
    regForm.style.display = 'flex'
    btnToUp.style.color = '#fff'
    btnToUp.style.background = '#000'
    btnToIn.style.color = '#000'
    btnToIn.style.background = '#fff'
})