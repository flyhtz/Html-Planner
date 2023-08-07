document.addEventListener("DOMContentLoaded", function() {
    const plannedList = document.getElementById("planned-tasks");
    const doingList = document.getElementById("doing-tasks");
    const finishedList = document.getElementById("finished-tasks");
    const addTaskButton = document.getElementById("add-task-button");
    const clearFinishedButton = document.getElementById("clear-finished-button");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || { planned: [], doing: [], finished: [] };

    function displayTasks() {
        plannedList.innerHTML = "";
        doingList.innerHTML = "";
        finishedList.innerHTML = "";

        tasks.planned.forEach(task => addTask(plannedList, task, "planned"));
        tasks.doing.forEach(task => addTask(doingList, task, "doing"));
        tasks.finished.forEach(task => addTask(finishedList, task, "finished"));
    }

    function addTask(list, taskText, currentStatus) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        taskItem.innerText = taskText;

        taskItem.addEventListener("click", () => {
            moveTask(taskText, currentStatus);
        });

        list.appendChild(taskItem);
    }

    function moveTask(taskText, currentStatus) {
        const nextStatus = getNextStatus(currentStatus);

        tasks[nextStatus].push(taskText);
        tasks[currentStatus] = tasks[currentStatus].filter(task => task !== taskText);

        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }

    function getNextStatus(currentStatus) {
        if (currentStatus === "planned") return "doing";
        if (currentStatus === "doing") return "finished";
        return "planned";
    }

    addTaskButton.addEventListener("click", () => {
        const taskName = prompt("Enter the task name:");
        if (taskName) {
            addNewTask(taskName);
        }
    });

    function addNewTask(name) {
        tasks.planned.push(name);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }

    clearFinishedButton.addEventListener("click", () => {
        tasks.finished = [];
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    });

    displayTasks();
});