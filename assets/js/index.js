const form = document.querySelector('.form');
const inputTask = document.querySelector('#todo');
const buttonAdd = document.querySelector('#add-task');
const list = document.querySelector(".toDoList");
const buttonClear = document.querySelector('#clear-list');
let arrayOfTasks = [];

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    //create new task object
    let task = createTask();
    addTaskToDOM(task);
    arrayOfTasks.push(task);
    console.log(arrayOfTasks);
    buttonClear.disabled = false;
    form.reset();
});

buttonClear.addEventListener('click', () => {
    while (arrayOfTasks.length !== 0) arrayOfTasks.pop();
    list.innerHTML = '';
    buttonClear.disabled = true;
    console.log(arrayOfTasks);
})

const createTask = () => {
    let task = {};
    task.id = Number(new Date());
    task.name = inputTask.value;
    return task;
}

const addTaskToDOM = (task) => {
    const div = document.createElement("div");
    div.innerHTML = `<div><input type='checkbox' name='${task.id}' /><label for="${task.id}">${task.name}</label ></div > `;
    list.appendChild(div);
}