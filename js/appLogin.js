
const registrarUsuario=()=>{
    var correo=document.querySelector("#correo").value;
    var password=document.querySelector("#password").value;
    var nombre=document.querySelector("#nombre").value;

    if(correo.trim()===''||
    password.trim()===''||
    nombre.trim()===''){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS!',
            footer: 'CRUD CONTACTOS'
          })
          return;

    }
    if(!validarCorreo(correo)){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'INTRODUCE UN CORREO VALIDO',
            footer: 'CRUD CONTACTOS'
          })
          return;

    }
    if(!validarPassword(password)){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'INTRODUCE UNA CONTRASEÑA VALIDA',
            footer: 'CRUD CONTACTOS'
          })
          return;

    }
    if(!validarNombre(nombre)){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'INTRODUCE UN NOMBRE VALIDO',
            footer: 'CRUD CONTACTOS'
          })
          return;

    }
    

}