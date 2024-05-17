let tasks = [];
let doneTasks = [];

document.getElementById('add-btn').addEventListener('click', addTask);

function addTask() {
  const task = document.getElementById('task').value;
  if (task) {
    if (tasks.find((existingTask) => existingTask.text === task)) {
      alert("Task already exists in the tasks list!");
    } else if (doneTasks.find((doneTask) => doneTask.text === task)) {
      alert("Task already exists in the done tasks list!");
    } else {
      tasks.push({ text: task, done: false });
      updateTaskList();
      document.getElementById('task').value = '';
    }
  }
}

function updateTaskList() {
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
  const taskElement = document.createElement('li');
  taskElement.textContent = task.text;
  const markButton = document.createElement('button');
  markButton.className = 'icon-button'
  markButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="rgba( 158, 120, 207, 1)" d="m10 15.586l-3.293-3.293l-1.414 1.414L10 18.414l9.707-9.707l-1.414-1.414z"/></svg>'
  markButton.addEventListener('click', () => markTask(index));
  const deleteButton = document.createElement('button');
  deleteButton.className = 'icon-button'
  deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="rgba(158, 120, 207, 1)" d="M15 2H9c-1.103 0-2 .897-2 2v2H3v2h2v12c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8h2V6h-4V4c0-1.103-.897-2-2-2M9 4h6v2H9zm8 16H7V8h10z"/></svg>'
  deleteButton.addEventListener('click', () => deleteTask(index));
  const buttonContainer = document.createElement('span');
  buttonContainer.classList.add('buttonContainer');
  buttonContainer.appendChild(markButton);
  buttonContainer.appendChild(deleteButton);
  taskElement.appendChild(buttonContainer);
  taskList.appendChild(taskElement);
});
    document.getElementById('task-count').textContent = tasks.length;
}

function markTask(index) {
  if (!tasks[index].done) {
    if (doneTasks.find((doneTask) => doneTask.text === tasks[index].text)) {
      alert("Task has already been marked as done!");
    } else {
      tasks[index].done = true;
      doneTasks.push(tasks[index]);
      updateTaskList();
      updateDoneList();
      localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    }
  } else {
    alert("Task is already marked as done!");
  }
}


function deleteTask(index) {
  const taskToDelete = tasks[index];
  tasks.splice(index, 1);
  doneTasks = doneTasks.filter((task) => task.text !== taskToDelete.text);
  updateTaskList();
  updateDoneList();
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
}

function updateDoneList() {
  const doneList = document.getElementById('done-tasks');
  doneList.innerHTML = '';
  doneTasks.forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.textContent = task.text;
    doneList.appendChild(taskElement);
  });
  document.getElementById('done-count').textContent = doneTasks.length;
}

// Store data in local storage
window.addEventListener('beforeunload', () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
});

// Retrieve data from local storage
window.addEventListener('load', () => {
    const storedTasks = localStorage.getItem('tasks');
    const storedDoneTasks = localStorage.getItem('doneTasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    if (storedDoneTasks) {
        doneTasks = JSON.parse(storedDoneTasks);
    }
    updateTaskList();
    updateDoneList();
});