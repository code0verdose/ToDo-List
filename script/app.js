const btnAdd = document.getElementById('input__add')
const inputText = document.getElementById('input__text')
const todoBody = document.querySelector('.todo__body')


//Добавление задачи в список
btnAdd.addEventListener('click', async () => {

    const data = {
        name: inputText.value,
        isDone: false,
    }

    const res = await fetch('http://localhost:5000/api/list/add', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })

        //Обработка ошибок
        .then((res) => {
            if (res.status === 200) {
                drawList(inputText.value)
            }

            return res.json()
        })
        .then((data) => {
            data.errors.forEach((elem) => {
                inputText.placeholder = `${elem.msg}`
            })
        })
})

//Отрисовка задач пользоваткля по токену
window.addEventListener('load', async () => {

    const res = await fetch('http://localhost:5000/api/list/draw', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();

    data.forEach((elem) => {
        drawList(elem.name)
    })
})


//Функция отрисовки задачи
function drawList(value) {
    const item = document.createElement('div');
    item.className = 'todo__item';
    todoBody.append(item);

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'input__check';
    item.append(checkBox);

    const listText = document.createElement('p');
    listText.className = 'item__text';
    listText.textContent = value;
    item.append(listText);

    const editWrap = document.createElement('div');
    editWrap.className = 'btn-wrapper';
    item.append(editWrap)

    const editTask = document.createElement('button')
    editTask.className = 'btn__change item__btn'
    editTask.textContent = '✏️'
    editWrap.append(editTask)

    const delTask = document.createElement('button')
    delTask.className = 'btn__del item__btn'
    delTask.textContent = '❌'
    editWrap.append(delTask)
}

