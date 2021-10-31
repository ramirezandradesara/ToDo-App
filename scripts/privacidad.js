// chequear que exista un usuario loggeado
const usuarioLoggeado = localStorage.getItem('token');
if(!usuarioLoggeado){
    // sacar al usuario de la vista
    location.replace('/');
}
