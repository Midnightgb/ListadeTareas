/* 
1.Crear una página web simple que muestre información sobre un tema que les guste. Esto puede incluir imágenes, enlaces y estilos CSS para darle estilo a la página.

2. Crear una pequeña aplicación web que muestre una lista de tareas pendientes y permita agregar, eliminar y marcar tareas como completadas. Esto puede incluir el uso de localStorage para guardar la información en el navegador.

3. Crear un juego simple en JavaScript, como una versión básica de ajedrez o un rompecabezas. Esto puede requerir el uso de lógica y cálculos matemáticos para implementar las reglas del juego.

4. Crear una aplicación web que utilice una API externa para obtener y mostrar información relevante. Por ejemplo, se puede crear una aplicación que muestre el pronóstico del tiempo en una ciudad determinada o que busque información sobre películas.

5. Crear un pequeño script que realice una tarea específica, como calcular el promedio de un conjunto de números o generar contrasenas */


let input = document.getElementById("inputText");
let list = document.getElementById("list");
let CaracterMinimo = 4; // valor mínimo de palabras para la tarea
let listNum = 0; // contador de tareas


// Vincular "Enter" al botón de agregar tarea
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addList();
    }
});

// Agregar una tarea a la lista
addList = () => {
    // obtener el dato
    let inputText = filterList(input.value);

    // Imprimirlo 
    if (inputText) {
        list.innerHTML += ` <li class=" my-3 py-3 shadow list-group-item " id="list${listNum}">
                <div class="row">
                <div class="col-1">
                <input class="" type="checkbox" id="check${listNum}" onclick="done(${listNum})">
                <label>
                    <input type="checkbox" id="check${listNum}" onclick="done(${listNum})">
                    <span class="checkbox"></span>
                </label>
                </div>
                <div class="col-6">
                    <span class=" h4" id="text${listNum}"> ${inputText} </span>
                </div>
                <div class="col-4">
                    <button class=" btn btn-danger" onclick="deleteList(${listNum})">Borrar</button>
                    <button class=" btn btn-dark" onclick="editList(${listNum})">Editar</button>
                </div>                  
                </div>    
                </li> `;
        input.value = " ";

        // guardar la lista en localStorage
        localStorage.setItem("list", list.innerHTML);

        listNum++; // incrementar contador de tareas
    }
}



// cargar la lista de tareas almacenada en localStorage
let listGuardada = localStorage.getItem("list");
if (listGuardada) {
    list.innerHTML = listGuardada;
}






//checkear las tareas, marcar como completadas
done = (listId) => {
    let checkbox = document.getElementById(`check${listId}`);
    let current = document.getElementById(`text${listId}`);
    let classExit = current.classList.contains("text-decoration-line-through");
    if (classExit == true) {
        current.classList.remove("text-decoration-line-through");
        current.classList.remove("listocalisto");
    } else {
        current.classList.add("text-decoration-line-through");
        current.classList.add("listocalisto");
    }

}


// Validar que la tarea contenga al menos dos palabras
filterList = (x) => {
    if (x) {
        if (x.length >= CaracterMinimo) {
            return x;
        } else {
            alert("Ingresa mas de "+CaracterMinimo+" letras")
        }
    } else {
        return false;
    }
}

// Editar una tarea existente
editList = (listId) => {
    let currentText = document.getElementById(`text${listId}`);
    let newText = prompt("Modo Edicion", currentText.innerHTML);
    if (filterList(newText)) {
        currentText.innerHTML = newText;
    }
}

// Elimina una tarea de la lista
deleteList = (listId) => {
    let current = document.getElementById(`text${listId}`).innerHTML;
    let deleteComfirm = confirm(`Estas seguro que quieres eliminar? ${current}`);
    if (deleteComfirm) {
        let p = document.getElementById("list")
        let c = document.getElementById(`list${listId}`);
        p.removeChild(c);
    } else {
        console.log("Borrado");
    }
};