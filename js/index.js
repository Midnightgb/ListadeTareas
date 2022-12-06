let input = document.getElementById("inputText");
let list = document.getElementById("list");
let CaracterMinimo = 4; // valor mínimo de palabras para la tarea
let listNum = 0; // contador de tareas


// Vincular "Enter" al botón de agregar tarea
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        AgregarLista();
    }
});


// Agregar una tarea a la lista
AgregarLista = () => {
    // obtener el dato
    let inputText = FiltroLista(input.value);


    // Imprimirlo 
    if (inputText) {
        list.innerHTML += ` <li class="rounded-3 my-3 py-3 shadow list-group-item " id="list${listNum}">
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
                                        <button class=" btn btn-danger" onclick="borrarLista(${listNum})">Borrar</button>
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

deleteAll = () =>{
    if (localStorage.length > 0) {
        localStorage.clear();
        location.reload()
    } else {
        alert("Está vacío. No hay nada que borrar.");
    }
}


//checkear las tareas, marcar como completadas
done = (listId) => {
    let checkbox = document.getElementById(`check${listId}`);
    let Actual = document.getElementById(`text${listId}`);
    let classExit = Actual.classList.contains("text-decoration-line-through");
    if (classExit == true) {
        Actual.classList.remove("text-decoration-line-through");
        Actual.classList.remove("listocalisto");
    } else {
        Actual.classList.add("text-decoration-line-through");
        Actual.classList.add("listocalisto");
    }
}




// Validar que la tarea contenga al menos dos palabras
FiltroLista = (x) => {
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
    let textoActual = document.getElementById(`text${listId}`);
    let nuevoTexto = prompt("Modo Edicion", textoActual.innerHTML);
    if (FiltroLista(nuevoTexto)) {
        textoActual.innerHTML = nuevoTexto;
    }
}




// Elimina una tarea de la lista
borrarLista = (listId) => {
    let Actual = document.getElementById(`text${listId}`).innerHTML;
    let confirmarBorrar = confirm(`Estas seguro que quieres eliminar? ${Actual}`);
    if (confirmarBorrar) {
        let p = document.getElementById("list")
        let c = document.getElementById(`list${listId}`);
        p.removeChild(c);
    } else {
        console.log("Borrado");
    }
};
