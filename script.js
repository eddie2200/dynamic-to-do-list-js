document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage and add them to the DOM
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false: don't save again to Local Storage
  }

  // Save updated tasks array to Local Storage
  function saveTasks() {
    const tasks = [];
    // Gather all current tasks text from the list items
    taskList.querySelectorAll('li').forEach(li => {
      // li.textContent includes the Remove button text, so remove that
      const taskText = li.firstChild.textContent || li.textContent;
      tasks.push(taskText.trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to add a new task to the DOM and optionally save it
  function addTask(taskText, save = true) {
    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }

    // Create list item and set its text content (only task text, no "Remove")
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // When Remove is clicked, remove the li and update Local Storage
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      saveTasks();
    };

    // Append Remove button to li, then li to the list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear input field if adding from input (not from loading)
    if (save) {
      taskInput.value = '';
      // Save updated list of tasks to Local Storage
      saveTasks();
    }
  }

  // Add event listeners
  addButton.addEventListener('click', () => {
    addTask(taskInput.value);
  });

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(taskInput.value);
    }
  });

  // Load tasks when page loads
  loadTasks();
});
