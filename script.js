window.onload = function () {
  var savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    var tasksContainer = document.getElementById("taskList");
    tasksContainer.innerHTML = savedTasks;

    var savedCompletedTasks = localStorage.getItem('completedTasks');
    if (savedCompletedTasks) {
      var completedTasksContainer = document.getElementById("completedTasks");
      completedTasksContainer.innerHTML = savedCompletedTasks;

      var completedTasks = completedTasksContainer.querySelectorAll('li');
      completedTasks.forEach(function (task) {
        var checkbox = task.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
          document.getElementById('completedTasks').appendChild(task);
        }
      });
    }

    attachCheckboxHandlers();
    applyCompletedTasksStyle();
  }
}

function addTask() {
  var inputValue = document.getElementById("taskInput").value;
  if (inputValue === '') {
    alert("Please enter a task!");
    return;
  }

  var currentDate = new Date();
  var date = currentDate.getDate();
  var month = currentDate.getMonth() + 1; // Month is zero-based
  var year = currentDate.getFullYear();

  var listItem = document.createElement("li");
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  listItem.appendChild(checkbox);

  var textNode = document.createTextNode(inputValue + ' - ' + date + '/' + month + '/' + year);
  listItem.appendChild(textNode);

  document.getElementById("taskList").appendChild(listItem);
  document.getElementById("taskInput").value = '';

  saveTasks();
  attachCheckboxHandlers();
  applyCompletedTasksStyle();
}

function saveTasks() {
  var tasks = document.getElementById("taskList").innerHTML;
  localStorage.setItem('tasks', tasks);

  var completedTasks = document.getElementById("completedTasks").innerHTML;
  localStorage.setItem('completedTasks', completedTasks);
}

function attachCheckboxHandlers() {
  var checkboxes = document.querySelectorAll('#taskList input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      saveTasks();
      applyCompletedTasksStyle();
      reorganizeTasks();
    });
  });
}

function applyCompletedTasksStyle() {
  var tasks = document.querySelectorAll('#taskList li');
  tasks.forEach(function (task) {
    var checkbox = task.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      task.classList.add("completed");
    } else {
      task.classList.remove("completed");
    }
  });
}

function reorganizeTasks() {
  var tasks = document.querySelectorAll('#taskList li');
  var completedTasks = document.getElementById('completedTasks');

  tasks.forEach(function (task) {
    var checkbox = task.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      completedTasks.appendChild(task);
    }
  });
}
