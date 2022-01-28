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
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };
    this.tasks.push(newTask);
  }
}
//Initialize a new instance of TaskManager
//let task2 = new TaskManager();
//Use the addTask method to add a new task
//task2.addTask(1, 2, 3, 4, 5)
//console.log() the tasks property
//console.log(task2.tasks);
