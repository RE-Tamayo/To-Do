window.addEventListener("load", () => {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const list = document.querySelector("ul");
        const li = document.createElement("li");
        li.innerHTML = `
            <li class="list-item">
                <input type="checkbox" onclick="completeTask(this)" class="check" ${task.completed ? 'checked' : ''}>
                <input type="textarea" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
                <button class="delete" onclick="deleteTask(this)">X</button>
            </li>`;
        list.insertBefore(li, list.children[0]);
    });
});

setInterval(function(){ 
    const d = document.querySelector('.date');
    const t = document.querySelector('.time');
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date();
    let day = date.toLocaleString(undefined, options);
    let time = date.toLocaleTimeString('en-US');
    d.innerHTML = day;
    t.innerHTML = time;
}, 1000);

const insert = document.querySelector('.insert');
const task = document.querySelector('.task');
const list = document.querySelector('.todo-list');

insert.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = document.querySelector(".task");
    const list = document.querySelector(".todo-list");

    // return if task is empty
    if (task.value === "") {
        alert("Please add some task!");
        return false;
    }

    // check is task already exist
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

    // task already exist
    tasks.forEach(todo => {
        if (todo.task === task.value) {
        alert("Task already exist!");
        task.value = "";
        return;
        }
    });
    
    if (task.value == "") {
        return;
    }

    else {
        //insert task
        localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));
        // create list item, add innerHTML and append to ul
        const li = document.createElement("li");
        li.innerHTML = `
                <li class="list-item">
                    <input type="checkbox" onclick="completeTask(this)" class="check" ${task.completed ? 'checked' : ''}>
                    <input type="textarea" value="${task.value}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
                    <button class="delete" onclick="deleteTask(this)">X</button>
                </li>`;
        list.insertBefore(li, list.children[0]);

        // clear input
        task.value = "";
        }
});



// store current task to track changes
var currentTask = null;

// get current task
const getCurrentTask = ((event) => {
  currentTask = event.value;
});

const editTask = ((event) => {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    // check if task is empty
    if (event.value === "") {
      alert("Task is empty!");
      event.value = currentTask;
      return;
    }
    // task already exist
    tasks.forEach(task => {
      if (task.task === event.value) {
        alert("Task already exist!");
        event.value = currentTask;
        return;
      }
    });
    // update task
    tasks.forEach(task => {
      if (task.task === currentTask) {
        task.task = event.value;
      }
    });
    // update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

const deleteTask = ((event) => {
    let tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));
    tasks.forEach((task) => {
      if (task.task === event.parentNode.children[1].value) {
        // delete task
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    event.parentElement.remove();
});

const completeTask = ((event) => {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
      if (task.task === event.nextElementSibling.value) {
        task.completed = !task.completed;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.nextElementSibling.classList.toggle("completed");
});