//array to hold the tasks
let Taskcards = [];

//creating consturctor
class task {
    constructor (TaskName, description) {
        this.TaskName = TaskName;
        this.description = description;
        this.done = false;
    }
}

//NOTE THE PROMPTS ARE TEMPORARY AND WILL BE CHANGED TO FORMS, WERE ONLY USED TO TEST IF IT WILL WORK

    //function to check character length of prompt
    function promptWithLengthCheck(promptText, maxLength) {
        //setting input to prompt text
        let input = prompt(promptText);
        //looping until proper length is entered
        while (input.length > maxLength) {
            alert(`Input must be ${maxLength} characters or less. Please try again.`);
            input = prompt(promptText);
        }
        return input;
    }

    const maxTaskNameLength = 20; 
    const maxDescriptionLength = 40;

//function to create todo list
function Todolist() {

    // Load tasks from localStorage when the program starts
    loadTasksFromLocalStorage();

    //getting user input
    let TaskName = promptWithLengthCheck("What is the name of the task?", maxTaskNameLength);
    let description = promptWithLengthCheck("What do you need to do in the task?", maxDescriptionLength);

    //creating the new task object
    const NewTask = new task(TaskName, description);

    //adding task to array
    Taskcards.push(NewTask);

    // Saving the updated Taskcards array to localStorage
    saveTasksToLocalStorage();

    //sending array to create tasks card function
    CreateTaskCards(Taskcards);
}

//function to create task cards
function CreateTaskCards(Taskcards) {
const container = document.querySelector('.card-container');

// Clear the container to avoid duplicating cards
container.innerHTML = '';

Taskcards.forEach((task, index) => {
    
    // Creating task cards
    const card = document.createElement('div');
    card.className = 'card';

    // Creating task name area
    const Tname_area = document.createElement('div');
    Tname_area.className = 'Taskname-area';
    card.appendChild(Tname_area);

    // Adding the task name to the task name area
    const Tname = document.createElement('h3');
    Tname.textContent = `Task: ${task.TaskName}`;
    Tname_area.appendChild(Tname);

    // Creating description area
    const tdesc_area = document.createElement('div');
    tdesc_area.className = 'taskdesc-area';
    card.appendChild(tdesc_area);

    // Adding the Description to the description area
    const Tdesc = document.createElement('h3');
    Tdesc.textContent = `Description: ${task.description}`;
    tdesc_area.appendChild(Tdesc);

    // Creating button area on cards
    const Tbtn_area = document.createElement('div');
    Tbtn_area.className = 'task-btns-area';
    card.appendChild(Tbtn_area);

    // Creating buttons for the button area
    const edit_btn = document.createElement('button');
    edit_btn.textContent = 'Edit';
    edit_btn.className = 'edit-btn';
    
    const remove_btn = document.createElement('button');
    remove_btn.textContent = 'Delete';
    remove_btn.className = 'remove-btn';
    
    const done_btn = document.createElement('button');
    done_btn.textContent = 'Done';
    done_btn.className = 'done-btn';

    // Adding buttons to button area
    Tbtn_area.appendChild(edit_btn);
    Tbtn_area.appendChild(remove_btn);
    Tbtn_area.appendChild(done_btn);

    // Setting the initial color of the done button
    if (task.done) {
        done_btn.style.backgroundColor = 'green';
    } else {
        done_btn.style.backgroundColor = '#D9C3C2';
    }

    // Event listener to toggle the done state
    done_btn.addEventListener('click', function() {
        // Toggle the task.done state
        task.done = !task.done;

        if (task.done) {
            let checkRemove;
            // Repeatedly prompt until "YES" or "NO" is entered
            do {
                checkRemove = prompt('Task completed. Do you wish to remove the task? (YES/NO)').trim().toUpperCase();
            } while (checkRemove !== 'YES' && checkRemove !== 'NO');
            
            //removing card if user says yes
            if (checkRemove === 'YES') {
                remove_card();
                // Reset button color after removal
                done_btn.style.backgroundColor = '#D9C3C2';
                //making button green if user says no
            } else if (checkRemove === 'NO') {
                done_btn.style.backgroundColor = 'green';
            }
        } else {
            // If task is not done, reset the button color to the default
            done_btn.style.backgroundColor = '#D9C3C2';
        }
    });


    //event listener to edit the cards content
    edit_btn.addEventListener('click', function() {

        // Prompting the user for new task name and description
        let newTaskName = promptWithLengthCheck("Enter the new task name:", maxTaskNameLength);
        let newDescription = promptWithLengthCheck("Enter the new description:", maxDescriptionLength);
        
        // Updating the task object with new values
        task.TaskName = newTaskName;
        task.description = newDescription;
        
        // Updating the displayed content on the card
        Tname.textContent = `Task: ${newTaskName}`;
        Tdesc.textContent = `Description: ${newDescription}`;

        // Save updated tasks to localStorage
        saveTasksToLocalStorage();

    });

    // Event listener to remove the card
    remove_btn.addEventListener('click', function() {
        Taskcards.splice(index, 1); 
        CreateTaskCards(Taskcards); 

        // Save updated tasks to localStorage
        saveTasksToLocalStorage();
    });

    // Adding the card to the card container
    container.appendChild(card);

    //function to remove card if user is done
    function remove_card() {
        //removing card from array
        Taskcards.splice(index, 1); 
        CreateTaskCards(Taskcards); 

        // Save updated tasks to localStorage
        saveTasksToLocalStorage();
    }
 });
}

// Function to save the tasks array to localStorage
function saveTasksToLocalStorage() { 
    localStorage.setItem('tasks', JSON.stringify(Taskcards));
}

// Function to load the tasks array from localStorage
function loadTasksFromLocalStorage() {
const savedTasks = localStorage.getItem('tasks');
if (savedTasks) {
    // Clear the existing array
    Taskcards.length = 0;
    // Load saved tasks into the array
    Taskcards.push(...JSON.parse(savedTasks)); 
    //calling create task cards function
    CreateTaskCards(Taskcards);
}
}

//event listener to call function when button is clicked
document.querySelector('.add-btn').addEventListener('click', function() {
    Todolist();
});

// Load tasks on page load
window.addEventListener('load', loadTasksFromLocalStorage);
