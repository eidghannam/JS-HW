"use strict";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  { description: "eating breakfast", completed: false },
];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
  if (tasks.length === 0) {
    console.log("There are no tasks yet");
    return;
  }
  tasks.forEach((task, index) => {
    console.log(
      `[${index + 1}, ${task.description}, ${
        task.completed ? "completed" : "not completed"
      }]`
    );
  });
}

function addTask(desc) {
  tasks.push({ description: desc, completed: false });
  saveTasks();
  console.log(`Task added successfully`);
}

function toggleTask(id) {
  const task = tasks[id - 1];
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    console.log(`Task ${id} toggled`);
  } else {
    console.log(`Task not found`);
  }
}

function removeTask(id) {
  const task = tasks[id - 1];
  if (task) {
    tasks.splice(id - 1, 1);
    saveTasks();
    console.log(`Task removed`);
  } else {
    console.log(`Task not found`);
  }
}

function updateDescription(id, newDesc) {
  const task = tasks[id - 1];
  if (task) {
    task.description = newDesc;
    saveTasks();
    console.log(`Task updated`);
  } else {
    console.log(`Task not found`);
  }
}

function searchTasks(searchTerm) {
  const searchResults = tasks.filter((task) =>
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (searchResults.length > 0) {
    console.log(`Search results:`);
    searchResults.forEach((task, index) => {
      console.log(
        `[${index + 1}, ${task.description}, ${
          task.completed ? "completed" : "not completed"
        }]`
      );
    });
  } else {
    console.log(`No tasks found`);
  }
}

function showMenu() {
  console.log(`1- Add new task
2- Display all tasks
3- Toggle task completion
4- Remove a task
5- Update a task
6- Search for a task
7- Exit`);
}

let choice;
do {
  showMenu();
  choice = parseInt(prompt("Enter your choice (1-7): "));

  switch (choice) {
    case 1:
      const description = prompt(`Enter description: `);
      addTask(description);
      break;
    case 2:
      displayTasks();
      break;
    case 3:
      const taskToggleId = parseInt(prompt(`Enter task ID: `));
      toggleTask(taskToggleId);
      break;
    case 4:
      const taskRemoveId = parseInt(prompt(`Enter task ID: `));
      removeTask(taskRemoveId);
      break;
    case 5:
      const taskUpdateId = parseInt(prompt(`Enter task ID: `));
      const taskUpdateDesc = prompt(`Enter the updated description: `);
      updateDescription(taskUpdateId, taskUpdateDesc);
      break;
    case 6:
      const searchWord = prompt(`Enter search term: `);
      searchTasks(searchWord);
      break;
    case 7:
      console.log("Exiting...");
      break;
    default:
      console.log(`Invalid choice`);
      break;
  }

  console.log(`Your choice is ${choice}`);
} while (choice !== 7);
