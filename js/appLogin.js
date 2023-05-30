
const registrarUsuario=async()=>{
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
            text: 'INTRODUCE UNA CONTRASEÑA VALIDA [Mayúsculas,minúsculas,números y min. 8 Carácteres]',
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

    const datos=new FormData();
    datos.append("correo",correo);
    datos.append("password",password);
    datos.append("nombre",nombre);

    var respuesta=await fetch("php/usuario/registrarUsuario.php",{
        method:'POST',
        body:datos
    });

    var resultado=await respuesta.json();

    if(resultado.success==true){
        Swal.fire({
            icon: 'success',
            title: 'EXITO',
            text: resultado.mensaje,
            footer: 'CRUD CONTACTOS'
          })
          document.querySelector("#formRegistrar").reset();
          setTimeout(()=>{
            window.location.href="index.html";
          },2000);

    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: resultado.mensaje,
            footer: 'CRUD CONTACTOS'
          })
    }

}