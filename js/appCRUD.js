
var sesion=localStorage.getItem("nombre");

const checarSesion=()=>{
  if(sesion==null){
    window.location.href="index.html";
  }
}

const cerrarSesion=()=>{
    localStorage.clear();
    window.location.href="index.html";
}
