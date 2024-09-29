document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('openModal').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'flex';
    clearForm();
});

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('closeModalBottom').addEventListener('click', closeModal);

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const datetime = document.getElementById('datetime').value;
    
    if (title && description && datetime) {
        if (this.dataset.editing) {
            updateTask(this.dataset.editing, title, description, datetime);
        } else {
            addTask(title, description, datetime);
        }
        closeModal();
        this.reset();
    }
});

function addTask(title, description, datetime) {
    const newItem = createTaskElement(title, description, datetime);
    document.querySelector('main').appendChild(newItem);
    saveTaskToLocalStorage(title, description, datetime);
}

function createTaskElement(title, description, datetime) {
    const newItem = document.createElement('div');
    newItem.className = 'task-card';
    const timeLeft = calculateTimeLeft(datetime);
    newItem.innerHTML = `
        <button class="remove-task">&times;</button>
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Time left: <span class="time-left">${timeLeft}</span></p>
        <button class="edit-task">Edit</button>
        <button class="complete-task">Mark as Complete</button>
    `;

    // Change background color if time is up
    if (timeLeft.includes('Time is up!')) {
        newItem.classList.add('red');
    }

    newItem.querySelector('.remove-task').addEventListener('click', function() {
        newItem.remove();
        removeTaskFromLocalStorage(title);
    });

    newItem.querySelector('.edit-task').addEventListener('click', function() {
        openEditModal(title, description, datetime, newItem);
    });

    newItem.querySelector('.complete-task').addEventListener('click', function() {
        newItem.classList.toggle('completed');
        newItem.querySelector('.time-left').textContent = newItem.classList.contains('completed') ? 'Completed' : timeLeft;
    });

    return newItem;
}

function openEditModal(title, description, datetime, taskElement) {
    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
    document.getElementById('datetime').value = datetime;
    document.getElementById('myModal').style.display = 'flex';
    
    // Set form for editing
    document.querySelector('form').dataset.editing = taskElement.innerText; // Save title as reference for editing
}

function updateTask(oldTitle, newTitle, newDescription, newDatetime) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.title === oldTitle);
    
    if (taskIndex !== -1) {
        tasks[taskIndex] = { title: newTitle, description: newDescription, datetime: newDatetime };
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        // Update the displayed task
        const taskElement = document.querySelector(`.task-card:contains('${oldTitle}')`);
        if (taskElement) {
            taskElement.querySelector('h3').textContent = newTitle;
            taskElement.querySelector('p').textContent = newDescription;
            taskElement.querySelector('.time-left').textContent = calculateTimeLeft(newDatetime);
        }
    }
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function clearForm() {
    document.querySelector('form').dataset.editing = ''; // Clear editing reference
}

function saveTaskToLocalStorage(title, description, datetime) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ title, description, datetime });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const newItem = createTaskElement(task.title, task.description, task.datetime);
        document.querySelector('main').appendChild(newItem);
    });
}

function removeTaskFromLocalStorage(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.title !== title);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function calculateTimeLeft(datetime) {
    const eventTime = new Date(datetime);
    const currentTime = new Date();
    const timeDiff = eventTime - currentTime;
    if (timeDiff <= 0) {
        return 'Time is up!';
    }
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
