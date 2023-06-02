<?php

require_once '../config.php';

$valido['success']=array('success'=>false,'mensaje'=>"",'nombre'=>"");

if($_POST){
    $correo=$_POST['correo'];
    $password=md5($_POST['password']);

    $sql="SELECT * FROM usuario WHERE correo='$correo' AND password='$password'";
    $resultado=$cx->query($sql);
    $n=$resultado->num_rows;
    if($n>0){
        $row=$resultado->fetch_array();
        $valido['success']=true;
        $valido['mensaje']="BIENVENIDO ".strtoupper($row['nombre']);
        $valido['nombre']=strtoupper($row['nombre']);

         
    }else{
        $valido['success']=false;
            $valido['mensaje']="EL CORREO ELÉCTRONICO YA ESTA EN USO";

    }

  

}else{
    $valido['success']=false;
    $valido['mensaje']="NO SE GUARDO";
}
echo json_encode($valido);
?>