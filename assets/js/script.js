// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

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
   //handle add task
   //create task card
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
   //get task
   //for loop -> separate by status
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
   event.preventDefault();
   const newTask = {
      id: generateTaskId(),
      title: $('#task-title').val(),
      dueDate: $('#task-due-date').val(),
      content: $('#task-content').val(),
      status: "toDo",
   };

   localStorage.setItem('newTask', JSON.stringify(newTask));
   console.log(newTask);
};
   


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

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
   
   $('#modal-btn').on('click', handleAddTask);
})

function addTask(task) {
   let taskList = getTaskList()
   taskList.push(task)
   setTaskList(taskList)
}

function updateTasks(task) {
   let taskList = getTaskList()
   for (let i=0; i<taskList.length; i++){
      if(taskList[i].id===task.id) {
         taskList[i]=task
      }
   }
   setTaskList(taskList)
}

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

