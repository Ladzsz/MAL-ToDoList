//function to run program
function Todolist() {

    //array to hold the tasks
    const Taskcards = [];

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

    //getting user input
    let TaskName = promptWithLengthCheck("What is the name of the task?", maxTaskNameLength);
    let description = promptWithLengthCheck("What do you need to do in the task?", maxDescriptionLength);

    //creating the new task object
    const NewTask = new task(TaskName, description);

    //adding task to array
    Taskcards.push(NewTask);

    //sending array to create tasks card function
    CreateTaskCards(Taskcards);

    //function to create task cards
    function CreateTaskCards(Taskcards) {
        const container = document.querySelector('.card-container');

        Taskcards.forEach((task, index) => {
            
            //creating task cards
            const card = document.createElement('div');
            card.className = 'card';

            //creating task name area
            const Tname_area = document.createElement('div');
            Tname_area.className = 'Taskname-area';
            card.appendChild(Tname_area);

            //adding the task name to to task name area
            const Tname = document.createElement('h3');
            Tname.textContent = `Task: ${task.TaskName}`;
            Tname_area.appendChild(Tname);

            //creating description area
            const tdesc_area = document.createElement('div');
            tdesc_area.className = 'taskdesc-area';
            card.appendChild(tdesc_area);

            //adding the Description to the description area
            const Tdesc = document.createElement('h3');
            Tdesc.textContent = `Description: ${task.description}`;
            tdesc_area.appendChild(Tdesc);

            //creating button area on cards
            const Tbtn_area = document.createElement('div');
            Tbtn_area.className = 'task-btns-area';
            card.appendChild(Tbtn_area);

            //creating buttons for the button area
            const edit_btn = document.createElement('button');
            edit_btn.textContent = 'Edit';
            edit_btn.className = 'edit-btn';
            const remove_btn = document.createElement('button');
            remove_btn.textContent = 'Delete';
            remove_btn.className = 'remove-btn';
            const done_btn = document.createElement('button');
            done_btn.textContent = 'done';
            done_btn.className = 'done-btn';

            //adding buttons to button area
            Tbtn_area.appendChild(edit_btn);
            Tbtn_area.appendChild(remove_btn);
            Tbtn_area.appendChild(done_btn);

            //adding the card to the card card container
            container.appendChild(card);
        });    
    }
}
//event listener to call function when button is clicked
document.querySelector('.add-btn').addEventListener('click', function() {
    Todolist();
});
