window.addEventListener('load', function () {
    
    const formLogin = document.forms[0]
    const inputEmail = document.querySelector('#inputEmail')
    const inputPassword = document.querySelector('#inputPassword')
    

    formLogin.addEventListener('submit', function(e){

        e.preventDefault()

        const verificacion = verificarCamposVacios(inputEmail, inputPassword)

        if (verificacion) {
            fetchApi(normalizacionDatos(inputEmail.value, inputPassword.value))
        }
    })
})


/* -------------------------------- funciones -------------------------------- */

function verificarCamposVacios(inputEmail, inputPassword) {
    
    let resultado = true

    if (inputEmail.value == "" || inputPassword.value == "") {
        alert('Hay campos vacíos')
        return resultado = false;
    }
    
    return resultado

}

function normalizacionDatos(email, password) {

    const usuarioNormalizado = {
        email: email.toLowerCase().trim(),
        password: password.trim()
      }

      return usuarioNormalizado;
}

function fetchApi(payload) {
    const apiURL = 'https://ctd-todo-api.herokuapp.com/v1/users/login'

    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    fetch(apiURL, settings)
    .then(resp => resp.json())
    .then( data => {
        console.log(data);

        if(data.jwt){
            localStorage.setItem('token', data.jwt);
            // redirijo a la vista correspondiente
            location.href = '/mis-tareas.html'
        }
    })
}

