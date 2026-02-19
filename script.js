let tasks = JSON.parse(localStorage.getItem('kanbanTasks')) || [];

function saveToLocalStorage(){
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
}

function renderTasks(){
    document.querySelectorAll('.task-list').forEach(list => list.innerHTML = '');

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.draggable = true;
        taskDiv.dataset.id = task.id;

        taskDiv.innerHTML = `
            <span>${task.text}</span>
            <button onclick="deleteTask(${task.id})">X</button>
        `;

        taskDiv.addEventListener('dragstart', dragStart);
        document.getElementById(task.status).appendChild(taskDiv);
    });
}

function addTask(status){
    const text = prompt("Enter task name:");
    if(!text) return;

    const newTask = {
        id: Date.now(),
        text,
        status
    };

    tasks.push(newTask);
    saveToLocalStorage();
    renderTasks();
}

function deleteTask(id){
    tasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage();
    renderTasks();
}

function dragStart(e){
    e.dataTransfer.setData("id", e.target.dataset.id);
}

document.querySelectorAll('.task-list').forEach(list => {
    list.addEventListener('dragover', e => e.preventDefault());

    list.addEventListener('drop', e => {
        const id = e.dataTransfer.getData("id");
        const task = tasks.find(t => t.id == id);
        task.status = e.currentTarget.id;
        saveToLocalStorage();
        renderTasks();
    });
});

renderTasks();
