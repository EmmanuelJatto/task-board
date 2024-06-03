// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const randomId = Math.random().toString(36).substr(2, 9);
    return randomId;
}
// Todo: create a function to create a task card
function createTaskCard(task) {
    for(let i = 0; i < tasks.length; i++) {
    const taskCard = $('<div>');
    taskCard.addClass('card task-card draggable my-3');
    taskCard.attr('data-task-id', task.id);
    const taskCardHeader = $('<div>').addClass('card-header h4').text(task[i].title);
    const taskCardBody = $('<div>').addClass('card-body');
    const taskCardText = $('<p>').addClass('card-text').text(task[i].description);
    taskCard.append(taskCardHeader);
    taskCard.append(taskCardBody);
    taskCardBody.append(taskCardText);
}

    // append to proper div
    if (task.status === 'to-do') {
        $('#todo-cards').append(taskCard);
    }
    else if(task.status === 'in-progress') {
        $('#in-progress-cards').append(taskCard);
    }
    else {
        $('#done-cards').append(taskCard);
    }

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach(function(task) {
        createTaskCard(task);
    });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = {
        id:generateTaskId(),
        title: $('#task-title').val(),
        description: $('#task-description').val(),
        dueDate: $('#task-due-date').val(),
        status: 'to-do',
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $('#submit').on('click', handleAddTask);

    $('#submit').on('click', createTaskCard);

    $('#task-due-date').datepicker({
        changeMonth: true,
        changeYear: true,
    });


});
