<?php

require_once '../config.php';

$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $numC=$_POST['numC'];
    $nombre=$_POST['nombre'];
    $fechaN=$_POST['fechaN'];
    $grupo=$_POST['grupo'];
    $carrera=$_POST['carrera'];

        $sqlInsertar="INSERT INTO alumno VALUES(null,'$numC','$nombre','$fechaN','$grupo','$carrera')";
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