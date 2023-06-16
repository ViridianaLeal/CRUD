
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

const agregarAlumno=async()=>{
  var numC=document.querySelector("#numC").value;
  var nombre=document.querySelector("#nombre").value;
  var fechaN=document.querySelector("#fechaN").value;
  var grupo=document.querySelector("#grupo").value;
  var carrera=document.querySelector("#carrera").value; 

  if(numC.trim()===''||
  nombre.trim()===''||
  fechaN.trim()===''||
  grupo.trim()===''||
  carrera.trim()===''){
      Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'FALTA LLENAR CAMPOS!',
          footer: 'CRUD ALUMNO'
        })
        return;

  }
  
//Insertar a la BASE DE ATOS
  const datos=new FormData();
  datos.append("numC",numC);
  datos.append("nombre",nombre);
  datos.append("fechaN",fechaN);
  datos.append("grupo",grupo);
  datos.append("carrera",carrera);
  

  var respuesta=await fetch("php/alumno/agregarAlumno.php",{
      method:'POST',
      body:datos
  });

  var resultado=await respuesta.json();

  if(resultado.success==true){
      Swal.fire({
          icon: 'success',
          title: 'EXITO',
          text: resultado.mensaje,
          footer: 'CRUD ALUMNO'
        })
        document.querySelector("#formAgregar").reset();
        

  }else{
      Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: resultado.mensaje,
          footer: 'CRUD ALUMNO'
        })
  }
 
document.querySelector("#agregarModal").click();
cargarAlumnos();
}

const cargarAlumnos=async()=>{
  var respuesta=await fetch("php/alumno/cargarAlumnos.php",{});
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
    <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editarModal" onclick="cargarAlumno(${fila[0]})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg> Editar</button></td>
    <td><button class="btn btn-danger" onclick="eliminarAlumno(${fila[0]})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3 " viewBox="0 0 16 16">
      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
    </svg> Eliminar</button></td>
  </tr>
  `;
})  
document.querySelector("#registros").innerHTML=registrosHTML;
}


const eliminarAlumno=(alumnoid)=>{
  Swal.fire({
    title: '¿Estás seguro de eliminar Alumno?',
    showDenyButton: true,
    confirmButtonText: 'SI',
    denyButtonText: `NO`,
  }).then(async(result) => {
    if (result.isConfirmed) {
      const datos=new FormData();
  datos.append("alumnoid",alumnoid);
      var respuesta=await fetch("php/alumno/eliminarAlumno.php",{
        method:'POST',
        body:datos
    });
  
    var resultado=await respuesta.json();
  
    if(resultado.success==true){
        Swal.fire({
            icon: 'success',
            title: 'EXITO',
            text: resultado.mensaje,
            footer: 'CRUD ALUMNO'
          })
         
          
  
    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: resultado.mensaje,
            footer: 'CRUD ALUMNO'
          })
    }
   
  cargarAlumnos();
    }
  })
}

const cargarAlumno=async(alumnoid)=>{
  const datos=new FormData();
  datos.append("alumnoid",alumnoid);
      var respuesta=await fetch("php/alumno/cargarAlumno.php",{
        method:'POST',
        body:datos
    });
  
    var resultado=await respuesta.json();

    document.querySelector("#alumnoid").value=resultado.alumnoid;
    document.querySelector("#enumC").value=resultado.numC;
    document.querySelector("#enombre").value=resultado.nombre;
    document.querySelector("#efechaN").value=resultado.fechaN;
    document.querySelector("#egrupo").value=resultado.grupo;
    document.querySelector("#ecarrera").value=resultado.carrera;
}

const editarAlumno=async()=>{
    var alumnoid=document.querySelector("#alumnoid").value;
    var numC=document.querySelector("#enumC").value;
    var nombre=document.querySelector("#enombre").value;
    var fechaN=document.querySelector("#efechaN").value;
    var grupo=document.querySelector("#egrupo").value;
    var carrera=document.querySelector("#ecarrera").value;

    if(numC.trim()===''||
    nombre.trim()===''||
    fechaN.trim()===''||
    grupo.trim()===''||
    carrera.trim()===''){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS!',
            footer: 'CRUD ALUMNO'
          })
          return;
  
    }

    const datos=new FormData();
    datos.append("alumnoid",alumnoid);
  datos.append("numC",numC);
  datos.append("nombre",nombre);
  datos.append("fechaN",fechaN);
  datos.append("grupo",grupo);
  datos.append("carrera",carrera);
  

  var respuesta=await fetch("php/alumno/editarAlumno.php",{
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
          footer: 'CRUD ALUMNO'
        })
        document.querySelector("#formEditar").reset();
        

  }else{
      Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: resultado.mensaje,
          footer: 'CRUD ALUMNO'
        })
  }
 

cargarAlumnos();

}