//this function contain all the operations

var ToDo = (function () {
    //array of task
    let tasks = [];
    //array of completed task
    let completedTask= [];
    //array of uncompleted task
    let uncompletedTask= [];

    //now we have to get the elements
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    const completedtaskscounter = document.getElementById("complete-tasks-counter");
    const uncompletedtaskscounter = document.getElementById("uncomplete-tasks-counter");
   

    //this function will call our renderlist function
    async function initialize() {    
            renderList();
    }

    //this will send our tasks to html 
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" id=${task.id} ${task.completed ? 'checked' : ''} data-id="12" class="custom-checkbox">
        <label for=${task.id}>${task.title}</label>
        <img src="bin.svg" class="delete" data-id=${task.id} />`;
        taskList.append(li);
    }


    //this will show all our tasks list on display
    function renderList() {
        taskList.innerHTML = "";
         completedTask= [];
         uncompletedTask= [];

        tasks.forEach(element => {

            addTaskToDOM(element);
            if(element.completed){
                completedTask.push(element);
            }else{
                uncompletedTask.push(element);
            }
        });

        tasksCounter.innerHTML = tasks.length;
        completedtaskscounter.innerHTML = completedTask.length;
        uncompletedtaskscounter.innerHTML = uncompletedTask.length;

    }
    //this will set the task as complete
    function toggleTask(taskId) {
        tasks.forEach(element => {
            if (element.id === taskId) {
                element.completed = !element.completed;
                renderList();
                return;
            }
        });
    }
    //this will delete the task
    function deleteTask(taskId) {
        let newTasks = tasks.filter(function (task) {
            return (task.id != taskId);
        })
        tasks = newTasks;
        renderList();
        showNotification("Task deleted successfully");
    }
    //this function add a new task to list
    async function addTask(task) {
        if (task) {
                tasks.push(task);
                renderList();
                showNotification("task added successfully");
                console.log("Success:", result);
        } else {
            showNotification("This task cannot be added");
        }
    }

    function showNotification(title) {
        alert(title);
    }
    //this will hendle our keypress of adding a task
    function handleInputPress(e) {
        if (e.key === "Enter") {
            let title = e.target.value;
            if (!title) {
                showNotification("task cannot be empty");
            }
            const task = {
                userId: 1,
                title: title,
                id: Date.now().toString(),
                completed: false
            }
            e.target.value = "";
            addTask(task);
        }

    }

    //this function will call one function either toggletask or deletetask
    function handleEvent(e) {
        const target = e.target;
   
        if (target.className === "custom-checkbox") {
            let taskId = target.id;
            toggleTask(taskId);
            return;

        } else if (target.className === "delete") {
            let taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        }
    }
    const input = document.getElementById("add");

    input.addEventListener("keyup", handleInputPress);
    document.addEventListener("click", handleEvent);

    return{
        initializeToDo: initialize,
      }
})();