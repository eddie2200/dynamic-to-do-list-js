// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
  // Select the Add Task button, task input field, and task list container
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim(); // Get trimmed input value

    // Alert user if input is empty
    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }

    // Create a new list item (li) and set its text content
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Add click event to Remove button to delete the task
    removeBtn.onclick = () => {
      taskList.removeChild(li);
    };

    // Append Remove button to the list item
    li.appendChild(removeBtn);

    // Append the list item to the task list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';
  }

  // Add click event listener to Add Task button
  addButton.addEventListener('click', addTask);

  // Add keypress event listener on input to add task on Enter key
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Optional: you mentioned invoking addTask on DOMContentLoaded,
  // but that typically adds a task immediately, so usually not needed.
  // If you want to initialize something else, you can do it here.
});
