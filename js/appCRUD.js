
var sesion=localStorage.getItem("nombre");

const checarSesion=()=>{
  if(sesion==null){
    window.location.href="index.html";
  }
  document.querySelector("#usuario").innerHTML=sesion;
}

const cerrarSesion=()=>{
    localStorage.clear();
    window.location.href="index.html";
}

const agregarContacto=async()=>{
  var nombre=document.querySelector("#nombre").value;
  var ap=document.querySelector("#ap").value;
  var am=document.querySelector("#am").value;
  var telefono=document.querySelector("#telefono").value;
  var correo=document.querySelector("#correo").value;

  if(nombre.trim()===''||
  ap.trim()===''||
  am.trim()===''||
  telefono.trim()===''||
  correo.trim()===''){
      Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'FALTA LLENAR CAMPOS!',
          footer: 'CRUD CONTACTOS'
        })
        return;

  }
  
//Insertar a la BASE DE ATOS
  const datos=new FormData();
  datos.append("nombre",nombre);
  datos.append("ap",ap);
  datos.append("am",am);
  datos.append("telefono",telefono);
  datos.append("correo",correo);
  

  var respuesta=await fetch("php/contacto/agregarContacto.php",{
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
        document.querySelector("#formAgregar").reset();
        

  }else{
      Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: resultado.mensaje,
          footer: 'CRUD CONTACTOS'
        })
  }
 
document.querySelector("#agregarModal").click();
cargarContactos();
}

const cargarContactos=async()=>{
  var respuesta=await fetch("php/contacto/cargarContactos.php",{});
  var registrosHTML=``;
  var resultado=await respuesta.json();
  
//consola.log(resultado);

resultado.data.forEach(fila=>{
  registrosHTML+=`
  <tr>
    <td>${fila[1]}</td>
    <td>${fila[2]}</td>
    <td>${fila[3]}</td>
    <td>${fila[4]}</td>
    <td>${fila[5]}</td>
    <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editarModal" onclick="cargarContacto(${fila[0]})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg> Editar</button></td>
    <td><button class="btn btn-danger" onclick="eliminarContacto(${fila[0]})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3 " viewBox="0 0 16 16">
      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
    </svg> Eliminar</button></td>
  </tr>
  `;
})  
document.querySelector("#registros").innerHTML=registrosHTML;
}


const eliminarContacto=(contactoid)=>{
  Swal.fire({
    title: '¿Estás seguro de eliminar Contacto?',
    showDenyButton: true,
    confirmButtonText: 'SI',
    denyButtonText: `NO`,
  }).then(async(result) => {
    if (result.isConfirmed) {
      const datos=new FormData();
  datos.append("contactoid",contactoid);
      var respuesta=await fetch("php/contacto/eliminarContacto.php",{
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
         
          
  
    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: resultado.mensaje,
            footer: 'CRUD CONTACTOS'
          })
    }
   
  cargarContactos();
    }
  })
}

const cargarContacto=async(contactoid)=>{
  const datos=new FormData();
  datos.append("contactoid",contactoid);
      var respuesta=await fetch("php/contacto/cargarContacto.php",{
        method:'POST',
        body:datos
    });
  
    var resultado=await respuesta.json();

    document.querySelector("#contactoid").value=resultado.contactoid;
    document.querySelector("#enombre").value=resultado.nombre;
    document.querySelector("#eap").value=resultado.ap;
    document.querySelector("#eam").value=resultado.am;
    document.querySelector("#etelefono").value=resultado.telefono;
    document.querySelector("#ecorreo").value=resultado.correo;
}

const editarContacto=async()=>{
    var contactoid=document.querySelector("#contactoid").value;
    var nombre=document.querySelector("#enombre").value;
    var ap=document.querySelector("#eap").value;
    var am=document.querySelector("#eam").value;
    var telefono=document.querySelector("#etelefono").value;
    var correo=document.querySelector("#ecorreo").value;

    if(nombre.trim()===''||
    ap.trim()===''||
    am.trim()===''||
    telefono.trim()===''||
    correo.trim()===''){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS!',
            footer: 'CRUD CONTACTOS'
          })
          return;
  
    }

    const datos=new FormData();
    datos.append("contactoid",contactoid);
  datos.append("nombre",nombre);
  datos.append("ap",ap);
  datos.append("am",am);
  datos.append("telefono",telefono);
  datos.append("correo",correo);
  

  var respuesta=await fetch("php/contacto/editarContacto.php",{
      method:'POST',
      body:datos
  });

  var resultado=await respuesta.json();
  document.querySelector("#editarModal").click();
  if(resultado.success==true){
    
      Swal.fire({
          icon: 'success',
          title: 'EXITO',
          text: resultado.mensaje,
          footer: 'CRUD CONTACTOS'
        })
        document.querySelector("#formEditar").reset();
        

  }else{
      Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: resultado.mensaje,
          footer: 'CRUD CONTACTOS'
        })
  }
 

cargarContactos();

}