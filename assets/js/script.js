// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const toDoListDiv = $('#todo-cards');
const inProgressCardsDiv = $('#in-progress-cards');
const doneCardsDiv = $('#done-cards');

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const randomId = Math.random().toString(36).substr(2, 9);
    return randomId;
}
// Todo: create a function to create a task card
function createTaskCard(task) {

    // Creates the task cards and adds bootstrap to the classes for easy formatting
    const taskCard = $('<div>');
    taskCard.addClass('card task-card draggable my-3');
    taskCard.attr('data-task-id', task.id);
    const taskCardHeader = $('<div>').addClass('card-header h4').text(task.title);
    const taskCardBody = $('<div>').addClass('card-body');
    const taskCardText = $('<p>').addClass('card-text').text(task.description);
    const taskCardDate = $('<p>').addClass('card-text').text(task.dueDate);
    const taskCardButton = $('<button>').addClass("btn btn-danger").text('Delete');
    taskCardButton.attr('id', task.id);
    taskCardButton.on('click', handleDeleteTask);

    taskCard.append(taskCardHeader);
    taskCard.append(taskCardBody);
    taskCardBody.append(taskCardText);
    taskCardBody.append(taskCardDate);
    taskCardBody.append(taskCardButton);
    
    if (task.status === 'to-do') {
        $('#todo-cards').append(taskCard);
        taskCard.addClass('draggable');
    }
    else if(task.status === 'in-progress') {
        $('#in-progress-cards').append(taskCard);
    }
    else {
        $('#done-cards').append(taskCard);
    }

    // Uses dayjs to determine color of card
    const currentDate = dayjs();
    const dueDate = dayjs(task.dueDate);
    if(currentDate.isAfter(dueDate, 'day')) {
        taskCard.css({'background-color':'#fd5c63', 'color': 'white'});
        taskCardButton.addClass('btn-outline-light');
    }
    else if (currentDate.isSame(dueDate, 'day')) {
        taskCard.css({'background-color':'#FFD700', 'color': 'white'})
    }

    //Makes the cards draggable
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        
        helper: function (e) {
        
            const original = $(e.target).hasClass('ui-draggable')
            ? $(e.target)
            : $(e.target).closest('.ui-draggable');
        
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    toDoListDiv.empty();
    inProgressCardsDiv.empty();
    doneCardsDiv.empty();
    
    let tasksList = JSON.parse(localStorage.getItem('tasks')) || [];

    tasksList.forEach(function(task) {
        createTaskCard(task);
    });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = {
        id:generateTaskId(),
        title: $('#task-title').val(),
        description: $('#task-description').val(),
        dueDate: $('#task-due-date').val(),
        status: 'to-do',
    }

    taskList.push(task);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const id = $(this).attr('id');
    console.log(id);

    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    const newTaskList = taskList.filter(function(task) {
        return task.id !== id
    });

    localStorage.setItem('tasks', JSON.stringify(newTaskList));

    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $('#submit').on('click', handleAddTask);

    $('#task-due-date').datepicker({
        changeMonth: true,
        changeYear: true,
    });

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });

});
