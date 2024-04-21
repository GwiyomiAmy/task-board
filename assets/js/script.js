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
   cardEl.attr('data-taskID', task.id);
   cardEl.appendTo(toDoCard);

   const cardName = $('<h5>').addClass('card-header').text(task.title);
   cardName.appendTo(cardEl);

   const cardBodyEl = $('<div>').addClass('card-body');
   cardBodyEl.appendTo(cardEl);

   const cardDueDate = $('<p>').text(task.dueDate);
   //console.log(typeof(task.dueDate)) 
   //date.parse, compare to now, dayjs, set attribute to class
   cardDueDate.appendTo(cardBodyEl);

   const cardContent = $('<p>').text(task.content);
   cardContent.appendTo(cardBodyEl);

   const deleteButton = $('<button>').text('Delete');
   deleteButton.attr('data-taskID', task.id)
   deleteButton.appendTo(cardBodyEl);

     //Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
   if (task.dueDate && task.status !== 'done') {
      const now = dayjs();
      const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

      //If the task is due today, make the card yellow. If it is overdue, make it red.
      if (now.isSame(taskDueDate, 'day')) {
         cardEl.addClass('bg-warning text-white');
      } else if (now.isAfter(taskDueDate)) {
         cardEl.addClass('bg-danger text-white');
         deleteButton.addClass('border-light');
      }
   }

   deleteButton.on('click', handleDeleteTask);

   return cardEl;
   
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
   const tasks = getTaskList();
   console.log(tasks)
   const toDoCard = $('#todo-cards')
   const inProgressCard = $('#in-progress-cards')
   const doneCard = $('#done-cards')
   toDoCard.empty()
   inProgressCard.empty()
   doneCard.empty()
   for (i=0; i<tasks.length; i++) {
      let taskEl = createTaskCard(tasks[i])
      if (tasks[i].status === toDoStatus) {
         taskEl.appendTo(toDoCard);
         //taskEl.attr('draggable', true);
      } if (tasks[i].status === inProgressStatus) {
         taskEl.appendTo(inProgressCard);
         //taskEl.attr('draggable', true)
      } if (tasks[i].status === doneStatus) {
         taskEl.appendTo(doneCard);
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
   console.log(newTask);
   renderTaskList()
   $('#task-title').val('')
   $('#task-due-date').val('')
   $('#task-content').val('')
};
   


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
   //console.log(event)
   let button = $(event.target);
   let buttonID = parseInt(button.attr('data-taskID'));
   console.log(buttonID)
   deleteTask(buttonID);
   console.log("this should be deleting")
   renderTaskList()
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
   let destinationList = $(event.target);
   let destListID = destinationList.attr('id');
   let newStatus = "";
   let taskEl = $(ui.item);
   let taskID = parseInt(taskEl.attr('data-taskID'));
   if (destListID==="todo-cards") {
      newStatus=toDoStatus
   } else if (destListID==="in-progress-cards") {
      newStatus=inProgressStatus
   } else if (destListID==="done-cards") {
      newStatus=doneStatus
   } else {
      console.log('error: wrong status value')
   }
   updateTaskStatus(taskID, newStatus)
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
const toDo = $("#todo-cards")
const inProgress = $("#in-progress-cards")
const done = $("#done-cards")



$(document).ready(function () {
   toDo.disableSelection();
   inProgress.disableSelection();
   done.disableSelection();
   toDo.sortable({connectWith:".taskList", receive: handleDrop })
   inProgress.sortable({connectWith:".taskList", receive: handleDrop } )
   done.sortable({connectWith:".taskList", receive: handleDrop} )
   renderTaskList()
   
//set calendar popup when entering due date
   $(function () {
      $('#task-due-date').datepicker({
        changeMonth: true,
        changeYear: true,
      });
    });
})

//set function when button is clicked modal pops up
$('#modal-btn').on('click', handleAddTask ) 




//function to call to simplify adding a new task
function addTask(task) {
   let taskList = getTaskList()
   taskList.push(task)
   setTaskList(taskList)
}

//function to call to change the status of the task based on which column the task is in
function updateTaskStatus(taskID, newStatus) {
   let taskList = getTaskList()
   for (let i=0; i<taskList.length; i++){
      if(taskList[i].id===taskID) {
         taskList[i].status=newStatus
      }
   }
   setTaskList(taskList)
}

//function to delete task from task array
function deleteTask(taskID) {
   let taskList = getTaskList()
   for (let i=0; i<taskList.length; i++){
      if(taskList[i].id===taskID) {
         taskList.splice(i, 1);
      }
   }
   setTaskList(taskList)
}

//function to get task list from local storage
function getTaskList() {
   let tasks = localStorage.getItem("tasks")
   if (tasks === null) {
      tasks = "[]"
   }
   return JSON.parse(tasks)
}

//function to set task list to local storage
function setTaskList(tasks) {
   let taskString = JSON.stringify(tasks)
   localStorage.setItem("tasks", taskString)
}

