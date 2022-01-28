//Creates Task HTML
const createTaskHtml = (name, assignedTo, description, status, dueDate) => {

  //Decides the colour of Status span
  let statusColour = "badge badge-primary";
  if(status == "In Progress" ){
    statusColour = "badge badge-secondary";
  }else if(status == "Done"){
    statusColour = "badge badge-success";
  }
  
const taskHtml = `<li class="card">
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
    <div class="col-3">
      <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#editform">
      Edit
      </button>
    </div>
    <div class="col-3">
    <button type="button" class="btn btn-warning btn-sm">Delete</button>
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
   const taskHtml = createTaskHtml(task.name, task.assignedTo, task.description, task.status, dateDisplay);
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
// //Initialize a new instance of TaskManager
// let task2 = new TaskManager();
// //Use the addTask method to add a new task
// task2.addTask(1, 2, 3, 4, 5)
// task2.addTask(1, 2, 3, 4, 5)
// console.log() //the tasks property
// console.log(task2.tasks);

