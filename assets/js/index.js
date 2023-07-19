const form = document.querySelector('.form');
const inputTask = document.querySelector('#todo');
const list = document.querySelector(".toDoList");
const buttonClear = document.querySelector('#clear-list');
let arrayOfTasks = []; //global array of tasks

document.addEventListener('DOMContentLoaded', () => {
    getArrayOfTasks(); //get array from localstorage
    if (arrayOfTasks.length > 0) {
        arrayOfTasks.forEach(el => addTaskToDOM(el)); //draw tasks on page
        buttonClear.disabled = false;
    }
});

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    getArrayOfTasks(); //get array from localstorage
    let task = createTask(); //create object task using input data
    addTaskToDOM(task); //draw task on page
    arrayOfTasks.push(task); //add task to array
    setArrayOfTasks(); //save array in localstorage
    buttonClear.disabled = false;
    form.reset();
});

buttonClear.addEventListener('click', () => {
    arrayOfTasks = [];
    list.innerHTML = '';
    setArrayOfTasks(); //save empty array in localstorage
    buttonClear.disabled = true;
});

//listen to checkboxes to be checked and change attribute "checked" in the array
list.addEventListener('click', (e) => {
    let id = e.target.getAttribute('name');
    if (!id) return; //if user clicked somewhere else do nothing
    else {
        //change attribute "checked" for the task in array
        arrayOfTasks.forEach(el => { if (el.id === Number(id)) el.checked = el.checked ? false : true; });
        setArrayOfTasks(); //put array with new 'checked' attributes to localstorage
    }
});

//create new object 'task' using input data
const createTask = () => {
    let task = {};
    task.id = Number(new Date());
    task.name = inputTask.value.trim();
    task.checked = false;
    return task;
};

//draw tasks on page
const addTaskToDOM = (task) => {
    const div = document.createElement("div");
    div.innerHTML = `<input type='checkbox' name='${task.id}'/><label for="${task.id}">${task.name}</label >`;
    list.appendChild(div);
    const checkbox = document.getElementsByName(task.id);
    checkbox[0].checked = task.checked;
    if (checkbox[0].checked) checkbox[0].classList.add('input:checked');
};

//get array from localstorage
function getArrayOfTasks() {
    arrayOfTasks = localStorage.getItem('tasks');
    arrayOfTasks = arrayOfTasks ? JSON.parse(arrayOfTasks) : [];
}

//save current value of array in localstorage
function setArrayOfTasks() {
    localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
}