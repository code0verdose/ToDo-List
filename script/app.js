//Получаю элементы страницы (инпуты)
const sub = document.getElementById('sub')
const fname = document.getElementById('fname')
const username = document.getElementById('username')
const password = document.getElementById('pass')
const email = document.getElementById('email')
const regAlert = document.querySelector('.reg__alert')
const regForm = document.querySelector('.reg')

//Ставлю прослушку на кнопку
sub.addEventListener('click', async function () {

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

        //Проверка на существование пользователя в БД
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
                console.log(elem.msg);
                regAlert.innerHTML = ''
                regAlert.insertAdjacentHTML('beforeend', `<p style="text-align:center; color: #a82a38;font-size: 16px; margin-top: 20px;">${elem.msg}</p>`)

            })

        })



})
