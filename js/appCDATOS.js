
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

const agregarDato=async()=>{
  var nombreC=document.querySelector("#nombreC").value;
  var edad=document.querySelector("#edad").value;
  var altura=document.querySelector("#altura").value;
  var sexo=document.querySelector("#sexo").value;
  var nacionalidad=document.querySelector("#nacionalidad").value;

  if(nombreC.trim()===''||
  edad.trim()===''||
  altura.trim()===''||
  sexo.trim()===''||
  nacionalidad.trim()===''){
      Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'FALTA LLENAR CAMPOS!',
          footer: 'CRUD DATOS'
        })
        return;

  }
  
//Insertar a la BASE DE ATOS
  const datos=new FormData();
  datos.append("nombreC",nombreC);
  datos.append("edad",edad);
  datos.append("altura",altura);
  datos.append("sexo",sexo);
  datos.append("nacionalidad",nacionalidad);
  

  var respuesta=await fetch("php/datos/agregarDatos.php",{
      method:'POST',
      body:datos
  });

  var resultado=await respuesta.json();

  if(resultado.success==true){
      Swal.fire({
          icon: 'success',
          title: 'EXITO',
          text: resultado.mensaje,
          footer: 'CRUD DATOS'
        })
        document.querySelector("#formAgregarD").reset();
        

  }else{
      Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: resultado.mensaje,
          footer: 'CRUD DATOS'
        })
  }
 
document.querySelector("#agregarModalD").click();
cargarDatos();
}

const cargarDatos=async()=>{
  var respuesta=await fetch("php/datos/cargarDatos.php",{});
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
    <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editarModalD" onclick="cargarDato(${fila[0]})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg> Editar</button></td>
    <td><button class="btn btn-danger" onclick="eliminarDatos(${fila[0]})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3 " viewBox="0 0 16 16">
      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
    </svg> Eliminar</button></td>
  </tr>
  `;
})  
document.querySelector("#registrosD").innerHTML=registrosHTML;
}


const eliminarDatos=(datosid)=>{
  Swal.fire({
    title: '¿Estás seguro de eliminar el DATO?',
    showDenyButton: true,
    confirmButtonText: 'SI',
    denyButtonText: `NO`,
  }).then(async(result) => {
    if (result.isConfirmed) {
      const datos=new FormData();
  datos.append("datosid",datosid);
      var respuesta=await fetch("php/datos/eliminarDatos.php",{
        method:'POST',
        body:datos
    });
  
    var resultado=await respuesta.json();
  
    if(resultado.success==true){
        Swal.fire({
            icon: 'success',
            title: 'EXITO',
            text: resultado.mensaje,
            footer: 'CRUD DATOS'
          })
         
          
  
    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: resultado.mensaje,
            footer: 'CRUD DATOS'
          })
    }
   
  cargarDatos();
    }
  })
}

const cargarDato=async(datosid)=>{
  const datos=new FormData();
  datos.append("datosid",datosid);
      var respuesta=await fetch("php/datos/cargarDato.php",{
        method:'POST',
        body:datos
    });
  
    var resultado=await respuesta.json();

    document.querySelector("#datosid").value=resultado.contactoid;
    document.querySelector("#enombreC").value=resultado.nombre;
    document.querySelector("#eedad").value=resultado.ap;
    document.querySelector("#ealtura").value=resultado.am;
    document.querySelector("#esexo").value=resultado.telefono;
    document.querySelector("#enacionalidad").value=resultado.correo;
}

const editarDato=async()=>{
    var datosid=document.querySelector("#datosid").value;
    var nombreC=document.querySelector("#enombreC").value;
    var edad=document.querySelector("#eedad").value;
    var altura=document.querySelector("#ealtura").value;
    var sexo=document.querySelector("#esexo").value;
    var nacionalidad=document.querySelector("#enacionalidad").value;

    if(nombreC.trim()===''||
    edad.trim()===''||
    altura.trim()===''||
    sexo.trim()===''||
    nacionalidad.trim()===''){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS!',
            footer: 'CRUD DATOS'
          })
          return;
  
    }

    const datos=new FormData();
    datos.append("datosid",datosid);
  datos.append("nombreC",nombreC);
  datos.append("edad",edad);
  datos.append("altura",altura);
  datos.append("sexo",sexo);
  datos.append("nacionalidad",nacionalidad);
  

  var respuesta=await fetch("php/datos/editarDatos.php",{
      method:'POST',
      body:datos
  });

  var resultado=await respuesta.json();
  document.querySelector("#editarModalD").click();
  if(resultado.success==true){
    
      Swal.fire({
          icon: 'success',
          title: 'EXITO',
          text: resultado.mensaje,
          footer: 'CRUD DATOS'
        })
        document.querySelector("#formEditarD").reset();
        

  }else{
      Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: resultado.mensaje,
          footer: 'CRUD DATOS'
        })
  }
 

cargarDatos();

}