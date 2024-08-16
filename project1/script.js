document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a task element
    function createTaskElement(text, completed = false) {
        const li = document.createElement('li');
        if (completed) {
            li.classList.add('completed');
        }

        const span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);

        const buttonComplete = document.createElement('button');
        buttonComplete.textContent = '✓';
        buttonComplete.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });
        li.appendChild(buttonComplete);

        const buttonRemove = document.createElement('button');
        buttonRemove.textContent = '✗';
        buttonRemove.classList.add('remove');
        buttonRemove.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });
        li.appendChild(buttonRemove);

        // Add new tasks to the beginning of the list
        taskList.insertBefore(li, taskList.firstChild);
    }

    // Add task on form submit
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (taskInput.value.trim()) {
            createTaskElement(taskInput.value.trim());
            taskInput.value = '';
            saveTasks();
        }
    });

    loadTasks();
});
