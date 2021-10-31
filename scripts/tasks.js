window.addEventListener('load', function() {
    const token = this.localStorage.getItem('token')
    const inputNuevaTarea = document.querySelector('#nuevaTarea')
    const formTarea = document.querySelector('.nueva-tarea')
    const closeApp = document.querySelector('#closeApp')

    obtenenerNombreUsuario(token)
    obtenerTareas(token)

    formTarea.addEventListener('submit', function (e) {
        e.preventDefault();

        let tarea = normalizarTarea(inputNuevaTarea.value)
        crearNuevaTarea(tarea, token)
        
        formTarea.reset()
    })

    closeApp.addEventListener('click', function () {
        localStorage.clear()
        location.replace('/')
    })
})


/* -------------------------------------------------------------------------- */
/*                                  FUNCIONES                                 */
/* -------------------------------------------------------------------------- */


 /* --------------------- GET: obtener nombre de usuario --------------------- */

function obtenenerNombreUsuario(token){
const getMeURL = 'https://ctd-todo-api.herokuapp.com/v1/users/getMe'


const settings = {
    method: 'GET',
    headers: {
        authorization: token
    }
}

    fetch(getMeURL, settings)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        const nameUser =  document.querySelector('.user-info p')
        nameUser.innerHTML = data.firstName
    })    
}

/* --------------------------- GET: obtener tareas -------------------------- */

function obtenerTareas(token){

    const tasksURL = 'https://ctd-todo-api.herokuapp.com/v1/tasks'

    const settings = {
        method: 'GET',
        headers: {
            authorization: token
        }
    }
    
        fetch(tasksURL, settings)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            renderizadoListaTareas(data)
        }) 
}

/* ------------------------- POST: crear nueva tarea ------------------------ */

function normalizarTarea(descripcionTarea) {
    const tareaNormalizada = {
        description: descripcionTarea,
        completed: false
      }

    return tareaNormalizada
}


function crearNuevaTarea(payload, token) {
    
    const tasksURL = 'https://ctd-todo-api.herokuapp.com/v1/tasks'

    const settings = {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    
        fetch(tasksURL, settings)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            obtenerTareas(token)
        }) 
}

 function renderizadoListaTareas(listado) {
        const nodoTareasTerminadas =  document.querySelector('.tareas-terminadas');
        const nodoTareasPendientes =  document.querySelector('.tareas-pendientes');

        nodoTareasPendientes.innerHTML = "";
        nodoTareasTerminadas.innerHTML = "";

        listado.forEach( tarea => {
            
            // cheque si está o no terminada
            if(tarea.completed){
                // aca van las tareas terminadas
                nodoTareasTerminadas.innerHTML += `
                <li class="tarea">
                    <div class="done"></div>
                    <div class="descripcion">
                        <p class="nombre">${tarea.description}</p>
                        <div>
                        <button><i id="${tarea.id}" class="fas
                        fa-undo-alt change"></i></button>
                        <button><i id="${tarea.id}" class="far
                        fa-trash-alt"></i></button>
                    </div>
                    </div>
                </li>
                `
            }else{
                // tareas pendientes
                nodoTareasPendientes.innerHTML += `
                <li class="tarea">
                    <div class="not-done change" id="${tarea.id}"></div>
                    <div class="descripcion">
                        <p class="nombre">${tarea.description}</p>
                        <p class="timestamp"><i class="far
                        fa-calendar-alt"></i> ${tarea.createdAt}</p>
                    </div>
                </li>
                `
            }
        });
        
    }