class TodoList {
    constructor() {
        this.tasks = [];

        // Cargar tareas del LocalStorage si existen
        if (localStorage.getItem("tasks")) {
            this.tasks = JSON.parse(localStorage.getItem("tasks"));
        }

        // Mostrar la lista de tareas en la página web
        this.showTasks();
    }
// Agregar una tarea a la lista
addList(task) {
    this.tasks.push(task);
    // Almacenar la lista de tareas en el LocalStorage
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    // Mostrar la lista de tareas en la página web
    this.showTasks();
}
    // Agregar una tarea a la lista y actualizar la interfaz de usuario
    addTask(task) {
        this.tasks.push(task);
        // Almacenar la lista de tareas en el LocalStorage
        localStorage.setItem("tasks", JSON.stringify(this.tasks));

        // Mostrar la lista de tareas en la página web
        this.showTasks();
    }

    // Editar una tarea existente y actualizar la interfaz de usuario
    editTask(taskId, newTask) {
        this.tasks[taskId] = newTask;
        // Almacenar la lista de tareas en el LocalStorage
        localStorage.setItem("tasks", JSON.stringify(this.tasks));

        // Mostrar la lista de tareas en la página web
        this.showTasks();
    }

    // Eliminar una tarea de la lista y actualizar la interfaz de usuario
    deleteTask(taskId) {
        this.tasks.splice(taskId, 1);
        // Almacenar la lista de tareas en el LocalStorage
        localStorage.setItem("tasks", JSON.stringify(this.tasks));

        // Mostrar la lista de tareas en la página web
        this.showTasks();
    }

    // Mostrar la lista de tareas en la página web
    showTasks() {
        let list = document.getElementById("list");
        let html = "";
        // Generar el HTML para cada tarea en la lista
        for (let i = 0; i < this.tasks.length; i++) {
            html += `
    <li class="my-3 py-3 shadow list-group-item" id="list${i}">
        <div class="row">
        <div class="col-1">
            <input class="" type="checkbox" id="check${i}" onclick="done(${i})">
        </div>
        <div class="col-6">
            <span class="h4" id="text${i}">${this.tasks[i]}</span>
        </div>
        <div class="col-4">
            <button class="btn btn-dark" onclick="deleteList(${i})">Delete</button>
            <button class="btn btn-dark" onclick="editList(${i})>Edit</button>
            </div>
            </div>
            </li>
            `;
        }
        // Mostrar el HTML en la página web
        list.innerHTML = html;
    }

    // Checkear las tareas, marcarlas como completadas
    done(listId) {
        let checkbox = document.getElementById('check${listId}');
        let current = document.getElementById('text${listId}');
        let classExit = current.classList.contains("text-decoration-line-through");
        if (classExit == true) {
            current.classList.remove("text-decoration-line-through");
        } else {
            current.classList.add("text-decoration-line-through");
        }
    }

    // Filtrar la lista de tareas
    filterList(x) {
        if (x) {
            // Validar que el texto tenga al menos 3 caracteres
            if (x.length >= 3) {
                return x;
            } else {
                alert("Please enter more than 3 words");
            }
        } else {
            return false;
        }
    }

    // Editar una tarea existente
    editList(listId) {
        let currentText = document.getElementById('text${listId}');
        let newText = prompt("Wanna Change list?", currentText.innerHTML);
        // Validar que el texto tenga al menos 3 caracteres
        if (this.filterList(newText)) {
            currentText.innerHTML = newText;
        }
        // Validar que el texto tenga al menos 3 caracteres
        if (this.filterList(newText)) {
            currentText.innerHTML = newText;
        }
    }

    // Eliminar una tarea de la lista
    deleteList(listId) {
        let current = document.getElementById('text${listId}').innerHTML;
        let deleteComfirm = confirm('Are you sure to delete ${current}');
        if (deleteComfirm) {
            let p = document.getElementById("list");
            let c = document.getElementById('list${listId}');
            p.removeChild(c);
        } else {
            console.log("deleted");
        }
    }
}

// Crear una nueva instancia de la clase TodoList
let todoList = new TodoList();

// Agregar una tarea cuando se hace clic en el botón "Add"
let addButton = document.getElementById("addButton");
addButton.addEventListener("click", () => {
    let input = document.getElementById("inputText");
    let task = input.value;

    // Validar que se haya ingresado una tarea válida
    if (todoList.filterList(task)) {
        // Agregar la tarea a la lista
        todoList.addTask(task);
        input.value = "";
    }
});

