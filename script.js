let tasks = [];
let doneTasks = [];

document.getElementById('add-btn').addEventListener('click', addTask);

function addTask() {
  const task = document.getElementById('task').value;
  if (!task) {
    alert("Please enter a task!");
  } else {
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
    markButton.className = 'icon-button';
    markButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="rgba(158, 120, 207, 1)"q d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>';
    markButton.addEventListener('click', () => markTask(index));
    const deleteButton = document.createElement('button');
    deleteButton.className = 'icon-button';
    deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="rgba(158, 120, 207, 1)" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>';
    deleteButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this task?')) {
        deleteTaskFromTasks(index);
      }
    });
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
      tasks.splice(index, 1); // Remove the task from the tasks array
      updateTaskList();
      updateDoneList();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    }
  } else {
    alert("Task is already marked as done!");
  }
}

function deleteTask(index) {
  doneTasks.splice(index, 1);
  updateDoneList();
  localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
}

function updateDoneList() {
  const doneList = document.getElementById('done-tasks');
  doneList.innerHTML = '';
  doneTasks.forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.textContent = task.text;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'icon-button';
    deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="rgba(158, 120, 207, 1)" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>';
    deleteButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this task?')) {
        deleteTask(index);
      }
    });
    taskElement.appendChild(deleteButton);
    doneList.appendChild(taskElement);
  });
  document.getElementById('done-count').textContent = doneTasks.length;
}

function deleteTaskFromTasks(index) {
  tasks.splice(index, 1);
  updateTaskList();
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Store data in local storage
window.addEventListener('beforeunload', () => {;
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