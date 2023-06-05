<?php

require_once '../config.php';

$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $nombre=$_POST['nombre'];
    $ap=$_POST['ap'];
    $am=$_POST['am'];
    $telefono=$_POST['telefono'];
    $correo=$_POST['correo'];

        $sqlInsertar="INSERT INTO contacto VALUES(null,'$nombre','$ap','$am','$telefono','$correo')";
        if($cx->query($sqlInsertar)===true){
            $valido['success']=true;
            $valido['mensaje']="SE GUARDO CORRECTAMENTE";
        }else{
            $valido['success']=false;
            $valido['mensaje']="ERROR NO SE GUARDO";
        } 
}else{
    $valido['success']=false;
    $valido['mensaje']="NO SE GUARDO";
}
echo json_encode($valido);
?>