<?php

require_once '../config.php';

$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $correo=$_POST['correo'];
    $password=md5($_POST['password']);

    $sql="SELECT * FROM usuario WHERE correo='$correo' AND password='$password'";
    $resultado=$cx->query($sql);
    $n=$resultado->num_rows;
    if($n>0){
        
        
            $valido['success']=true;
            $valido['mensaje']="BIENVENIDO";

         
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