//Helper function to format a given value to the specified length 
function FormatLength(value, length) {
  let formattedValue = "" + value;
  while (formattedValue.length < length) {
    formattedValue = "0" + formattedValue;
  }
  return formattedValue;
}

//Helper function to converts date to YYYYMMDD format
function convertDateFormat(givenDate){
  let date = new Date(givenDate);
  const [givenMonth, givenDay, givenYear] = [date.getMonth()+1, date.getDate(), date.getFullYear()];
  let dateString = FormatLength(givenYear,4).toString()+FormatLength(givenMonth,2).toString()+FormatLength(givenDay,2).toString();
  return dateString;
}


// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);
taskManager.load();
taskManager.render();

// Finding and Display the Date Object
const dateElement = document.querySelector("#date-display");
let today = new Date();
const [month, day, year] = [today.getMonth()+1, today.getDate(), today.getFullYear()];
let dateDisplay = `Current Date: ${day} / ${month} / ${year}`;
dateElement.innerHTML = dateDisplay;


// Select the New Task Form
const form = document.querySelector("#add-new-task");



form.addEventListener("submit", (event) => {
  const validateName = document.querySelector("#new-task-name");
  const validateDescription = document.querySelector("#new-task-description");
  const validateAssignedTo = document.querySelector("#new-task-assigned-to");
  const validateDueDate = document.querySelector("#new-task-due-date");
  const validateStatus = document.querySelector("#new-task-status");
  let validationFail = 0;

// Prevent default action
  event.preventDefault();
  event.stopPropagation();
  console.log("Task Name :" + validateName.value.length);
  console.log("Task Description :" + validateDescription.value.length);
  console.log("Task Assigned To :" + validateAssignedTo.value.length);
  console.log("Task Due Date :" + validateDueDate.value);
  console.log("Task Status:" + validateStatus.value);

  // Call this to clear all the form fields after the submission
  const clearFormFields = () => {
    validateName.value = "";
    validateDescription.value = "";
    validateAssignedTo.value = "";
    validateStatus.value = "";
    validateDueDate.value = "";
    validateName.classList.remove("is-valid");
    validateDescription.classList.remove("is-valid");
    validateAssignedTo.classList.remove("is-valid");
    validateStatus.classList.remove("is-valid");
    validateDueDate.classList.remove("is-valid");
  };

  console.log("Task Name :" + validateName.value.length);
  console.log("Task Description :" + validateDescription.value.length);
  console.log("Task Assigned To :" + validateAssignedTo.value.length);
  console.log("Task Due Date :" + validateDueDate.value);
  console.log("Task Status:" + validateStatus.value);


  // Form validation for Task Name Field min length 5
  if (validateName.value.length > 5) {
    validateName.classList.add("is-valid");
    validateName.classList.remove("is-invalid");
  } else {
    validateName.classList.add("is-invalid");
    validateName.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Description Field min length 5
  if (validateDescription.value.length > 5) {
    validateDescription.classList.add("is-valid");
    validateDescription.classList.remove("is-invalid");
  } else {
    validateDescription.classList.add("is-invalid");
    validateDescription.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Assigned Field min length 5
  if (validateAssignedTo.value.length > 5) {
    validateAssignedTo.classList.add("is-valid");
    validateAssignedTo.classList.remove("is-invalid");
  } else {
    validateAssignedTo.classList.add("is-invalid");
    validateAssignedTo.classList.remove("is-valid");
    validationFail++;
  }
  // Form validation for Due Date Field not empty
  // try your own validation for a date in the future
  if (validateDueDate.value) {

    //checks if the date is not in the past

    //Converts date to the format of YYYYMMDD
    let dateString = convertDateFormat(today); // 20220202
    let dueDateString = convertDateFormat(new Date(validateDueDate.value));//20220131

    if(Number(dueDateString) >= Number(dateString)){
      validateDueDate.classList.add("is-valid");
      validateDueDate.classList.remove("is-invalid");
    }else {
      validateDueDate.classList.add("is-invalid");
      validateDueDate.classList.remove("is-valid");
      validationFail++;
    }

  } else {
    validateDueDate.classList.add("is-invalid");
    validateDueDate.classList.remove("is-valid");
    validationFail++;
  }


  // Form validation for Task Status Field not empty
  if (validateStatus.value) {
    validateStatus.classList.add("is-valid");
    validateStatus.classList.remove("is-invalid");
  } else {
    validateStatus.classList.add("is-invalid");
    validateStatus.classList.remove("is-valid");
    validationFail++;
  }
  // If validation fails then function will not proceed further and
  // will return. The value of validationFail will also needed to be
  // reset to 0.
  // ----------------------------------------------------------------------------------
  if (validationFail > 0) {
    validationFail = 0;
    return;
  } else {
    // Push the valid input into the tasks array
    taskManager.addTask(
      validateName.value,
      validateAssignedTo.value,
      validateDescription.value,
      validateStatus.value,
      validateDueDate.value,
      );

      taskManager.save();

      //renders our tasks, so that they are visible on the page.
      taskManager.render();
      //Clears the form fields and closes the modal
      clearFormFields();
      $("#addnew").modal('hide');
  }
});

const taskList = document.querySelector("#task-list");
// Add an 'onclick' event listener to the Tasks List
taskList.addEventListener("click", (event) => {


  // Check if a "Delete" button was clicked
  if (event.target.classList.contains("delete-button")) {
    // Get the parent Task
    const parentTask =
      event.target.parentElement.parentElement.parentElement.parentElement;

    // Get the taskId of the parent Task.
    const taskId = Number(parentTask.dataset.taskId);
    const task = taskManager.getTaskById(taskId);
    // Delete the task
    taskManager.deleteTask(taskId);

    // Save the tasks to localStorage
    taskManager.save();


    // Render the tasks
    taskManager.render();
  }


//Adds taskList event listener for click event

if(event.target.classList.contains("done-button")){
  //gets the parent task where the Done button was clicked
  const parentTask = event.target.parentElement.parentElement.parentElement.parentElement;
  //converts the task id of the parent task html to a number and store it in a variable
  const taskId = Number(parentTask.dataset.taskId);
  //gets the task from the task list with the given task id
  const task = taskManager.getTaskById(taskId);
  //changes the status of task to done
  task.status = "Done";

  // Save the tasks to localStorage
  taskManager.save();
  //renders the updated task
  taskManager.render();
}
})
