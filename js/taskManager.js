//Creates Task HTML
const createTaskHtml = (id, name, assignedTo, description, status, dueDate) => {

  //changes the style of the task status
  let statusColour = "badge badge-primary";
  if(status == "In Progress" ){
    statusColour = "badge badge-secondary";
  }else if(status == "Done"){
    statusColour = "badge badge-success";
  }

  //skips to add done button if the status is already DONE
  let doneHtml = "";
  if(status!= "Done"){
    doneHtml = `<button type="button" class="btn btn-primary btn-sm done-button">
    Mark as done
    </button>`
  }

const taskHtml = `<li class="card" data-task-id="${id}">
<div class="card-body">
  <h5 class="card-title">${name}</h5>
   <p class="card-text">Description: ${description}</p>
  <p class="card-text">Assigned To: ${assignedTo}</p>
  <p class="card-text">Status:
    <span class= "${statusColour}">${status}</span>
  </p>
  <p class="card-text">Due Date: ${dueDate}</p>
  <div class="card-footer row">
    <div class="col-6">

    </div>
    <div class="col-2">
    ${doneHtml}
    </div>
    <div class="col-2">
      <button type="button" class="btn btn-secondary btn-sm edit-button" data-toggle="modal" data-target="#editform">
      Edit
      </button>
    </div>
    <div class="col-2">
    <button type="button" class="btn btn-warning btn-sm delete-button">Delete</button>
    </div>
</li>`

return taskHtml;
}

// Create the TaskManager class
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }
  // Create the addTask method
  addTask(name, assignedTo, description, status, dueDate) {
    this.currentId++
    // Create a task object that we will push to the list of tasks
    const newTask = {
      id: this.currentId,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };
    this.tasks.push(newTask);
  }
  save() {
  // create a JSON string of the tasks and store it to a new variable
    const tasksJson = JSON.stringify(this.tasks);
  // store the JSON string in localStorage
    localStorage.setItem('tasks', tasksJson);
  // convert the this.currentId to a string
    const currentId = JSON.stringify(this.currentId);
  // store currentId in localStorage
    localStorage.setItem('currentId', currentId);
  }
  load() {
  // check if any tasks are saved in localStorage
    if (localStorage.getItem('tasks')) {
      // get the JSON string of tasks stored
      const tasksJson = localStorage.getItem('tasks')
      // convert the tasksJson string to an array
      this.tasks = JSON.parse(tasksJson);
    }
      // check if currentId is saved in localStorage
    if (localStorage.getItem('currentId')) {
      // get the currentId and store it in a new variable currentId
      const currentId = localStorage.getItem('currentId')
      // convert currentId to a number
      this.currentId = JSON.parse(currentId);
    }
    }



//adding getTaskById method to taskManager class
//Loops over the tasks array and returns task by the given task id
getTaskById(taskId){
  let foundTask;
  for(let i=0; i<this.tasks.length; i++){
    const task = this.tasks[i];
    if(task.id==taskId){
      foundTask = task;
    }
  }
  return foundTask;
}


deleteTask(taskId) {
  // Create an empty array and store it in a new variable, newTasks
  const newTasks = [];

  // Loop over the tasks
  for (let i = 0; i < this.tasks.length; i++) {
    // Get the current task in the loop
    const task = this.tasks[i];

    // Check if the task id is not the task id passed in as a parameter
    if (task.id !== taskId) {
      // Push the task to the newTasks array
      newTasks.push(task);
    }
  }

  // Set this.tasks to newTasks
  this.tasks = newTasks;
}


//renders(creates a visual reference of) our tasks, so that they are visible on the page.
  render(){
 let tasksHtmlList = [];
 //Loop over the TaskManager's tasks
 for(let i=0;i<this.tasks.length;i++){
   const task = this.tasks[i];
   //formatting Date variable and storing it as a readable date
   let dueDate = new Date(task.dueDate);
   const [month, day, year] = [dueDate.getMonth()+1, dueDate.getDate(), dueDate.getFullYear()];
   let dateDisplay =  `${day}/${month}/${year}`;
   //Creates Task HTML
   const taskHtml = createTaskHtml(task.id, task.name, task.assignedTo, task.description, task.status, dateDisplay);
   //push the taskHtml into the tasksHtmlList array.
   tasksHtmlList.push(taskHtml);
 }
 //joining the tasksHtmlList array together, separating each task's html with a newline.
 const tasksHtml = tasksHtmlList.join("\n");

    // Select the tasks list element and set its innerHTML to the tasksHtml
    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;
  }

}

