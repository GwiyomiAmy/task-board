// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const toDoStatus = "toDo";
const inProgressStatus = "inProgress";
const doneStatus = "done";


// Todo: create a function to generate a unique task id
function generateTaskId() {
   let taskID = localStorage.getItem("lastTaskID");
   if (taskID===null) {
      taskID="0"
   } 
   taskID=parseInt(taskID)
   taskID++
   localStorage.setItem("lastTaskID", "" + taskID)
   return taskID;
}


// Todo: create a function to create a task card
function createTaskCard(task) {
   const toDoCard = $('#todo-cards')

   const cardEl = $('<div>').addClass('card');
   cardEl.appendTo(toDoCard);

   const cardName = $('<h5>').addClass('card-header').text(task.title);
   cardName.appendTo(cardEl);

   const cardBodyEl = $('<div>').addClass('card-body');
   cardBodyEl.appendTo(cardEl);

   const cardDueDate = $('<p>').text(task.dueDate);
   cardDueDate.appendTo(cardBodyEl);

   const cardContent = $('<p>').text(task.content);
   cardContent.appendTo(cardBodyEl);

   const deleteButton = $('<button>').text('Delete');
   deleteButton.appendTo(cardBodyEl);

   deleteButton.on('click', handleDeleteTask);

   return cardEl;
   
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
   const tasks = getTaskList();
   //console.log(tasks)
   for (i=0; i<tasks.length; i++) {
      let taskEl = createTaskCard(tasks[i])
      if (tasks[i].status === toDoStatus) {
         taskEl.appendTo($('#todo-cards'));
         //taskEl.attr('draggable', true);
      } if (taskEl[i].status === inProgressStatus) {
         taskEl.appendTo($('#in-progress-cards'));
         //taskEl.attr('draggable', true)
      } if (taskEl[i].status === doneStatus) {
         taskEl.appendTo($('#done-cards'));
         //taskEl.attr('draggable', true)
      }
   }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
   event.preventDefault();
   const newTask = {
      id: generateTaskId(),
      title: $('#task-title').val(),
      dueDate: $('#task-due-date').val(),
      content: $('#task-content').val(),
      status: toDoStatus,
   };

   addTask(newTask)
   //console.log(newTask);
   renderTaskList()
};
   


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
   deleteTask(taskID)

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
   updateTasks(task)
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
const toDo = $("#to-do")
const inProgress = $("#in-progress")
const done = $("#done")



$(document).ready(function () {
   toDo.sortable({connectWith:inProgress, dropOnEmpty:false} )
   toDo.sortable({connectWith:done, dropOnEmpty:false})
   inProgress.sortable({connectWith:toDo, dropOnEmpty:false} )
   inProgress.sortable({connectWith:done, dropOnEmpty:false})
   done.sortable({connectWith:inProgress, dropOnEmpty:false} )
   done.sortable({connectWith:toDo, dropOnEmpty:false})
   renderTaskList()
   
})

$('#modal-btn').on('click', handleAddTask ) 

function addTask(task) {
   let taskList = getTaskList()
   taskList.push(task)
   setTaskList(taskList)
}

/*
function updateTasks(task) {
   let taskList = getTaskList()
   for (let i=0; i<taskList.length; i++){
      if(taskList[i].id===task.id) {
         taskList[i]=task
      }
   }
   setTaskList(taskList)
}*/


function deleteTask(taskID) {
   let taskList = getTaskList()
   for (let i=0; i<taskList.length; i++){
      if(taskList[i].id===taskID) {
         taskList.splice(i, 1);
      }
   }
   setTaskList(taskList)
}

function getTaskList() {
   let tasks = localStorage.getItem("tasks")
   if (tasks === null) {
      tasks = "[]"
   }
   return JSON.parse(tasks)
}

function setTaskList(tasks) {
   let taskString = JSON.stringify(tasks)
   localStorage.setItem("tasks", taskString)
}

