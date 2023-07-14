const form = document.querySelector('.form');
const inputTask = document.querySelector('#todo');
const list = document.querySelector(".toDoList");
const buttonClear = document.querySelector('#clear-list');
let arrayOfTasks = [];

document.addEventListener('DOMContentLoaded', (ev) => {
    arrayOfTasks = JSON.parse(window.localStorage.getItem('tasks'));
    if (arrayOfTasks) {
        if (arrayOfTasks.length > 0) {
            arrayOfTasks.forEach(el => { addTaskToDOM(el); });
            buttonClear.disabled = false;
        }
    }
});

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    arrayOfTasks = window.localStorage.getItem('tasks');
    arrayOfTasks = arrayOfTasks ? JSON.parse(arrayOfTasks) : [];
    let task = createTask();
    addTaskToDOM(task);
    arrayOfTasks.push(task);
    window.localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
    buttonClear.disabled = false;
    form.reset();
});

buttonClear.addEventListener('click', () => {
    arrayOfTasks = [];
    list.innerHTML = '';
    window.localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
    buttonClear.disabled = true;
});

list.addEventListener('click', (e) => {
    let id = e.target.getAttribute('name');
    if (!id) return;
    else {
        arrayOfTasks.forEach(el => { if (el.id === Number(id)) el.checked = el.checked ? false : true; });
        window.localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
    }
});

const createTask = () => {
    let task = {};
    task.id = Number(new Date());
    task.name = inputTask.value;
    task.checked = false;
    return task;
};

const addTaskToDOM = (task) => {
    const div = document.createElement("div");
    div.innerHTML = `<input type='checkbox' name='${task.id}'/><label for="${task.id}">${task.name}</label >`;
    list.appendChild(div);
    const checkbox = document.getElementsByName(task.id);
    checkbox[0].checked = task.checked;
    if (checkbox.checked) checkbox[0].classList.add('input:checked');
};