window.addEventListener('load', function () {
    
    const form = document.forms[0]
    const inputNombre = document.querySelector('#inputNombre') 
    const inputApellido =  document.querySelector('#inputApellido')
    const inputEmail =  document.querySelector('#inputEmail')
    const inputPassword = document.querySelector('#inputPassword')
    const inputPasswordRepetida = document.querySelector('#inputPasswordRepetida')

    form.addEventListener('submit', function (e) {
         e.preventDefault();

        const verificacionCampos = verificarCamposVacios(inputNombre, inputApellido, inputEmail, inputPassword, inputPasswordRepetida); 

        const verificacionContras = verificacionContrasenias(inputPassword.value, inputPasswordRepetida.value);
     
        const usuarioNormalizado = normalizacionDatos(inputNombre.value, inputApellido.value, inputEmail.value, inputPassword.value)

        if (verificacionContras && verificacionCampos) {
            alert('¡Formulario completado correctamente!')
            form.reset();
            fetchApi(usuarioNormalizado)
        }
    })

})

/* -------------------------------- funciones ------------------------------- */

function verificarCamposVacios(inputNombre, inputApellido, inputEmail, inputPassword, inputPasswordRepetida) {
    
    let resultado = true

    if (inputNombre.value == "" || inputApellido.value == "" || inputEmail.value == "" || inputPassword.value == "" || inputPasswordRepetida.value == "") {
        alert('Todos los campos deben ser completados')
        return resultado = false;
    }
    
    return resultado

}

function verificacionContrasenias(contrasenia, contrasenia2) {
    let resultado = true

    if (contrasenia != contrasenia2) {
        alert('Las contraseñas deben ser coincidir')
        return resultado = false;
    }
        
    return resultado
    
}

function normalizacionDatos(nombre, apellido, email, password) {

    const usuarioNormalizado = {
        firstName: nombre.trim(),
        lastName: apellido.trim(),
        email: email.toLowerCase().trim(),
        password: password.trim()
      }

      return usuarioNormalizado;
}

function fetchApi(payload) {
    const apiURL = 'https://ctd-todo-api.herokuapp.com/v1/users'
    
    const settings = {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify(payload)
    }
    
       fetch(apiURL, settings)
       .then(resp => resp.json())
       .then(data => {
           console.log(data)
           console.log(data.jwt);
           //si llega correctamente un token
           if(data.jwt){
               localStorage.setItem('jwt', data.jwt);
               
               location.href = '/mis-tareas.html'
           }})
    
}