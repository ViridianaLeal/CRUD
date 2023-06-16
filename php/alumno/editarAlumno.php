<?php

require_once '../config.php';

$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $id=$_POST['alumnoid'];
    $numC=$_POST['numC'];
    $nombre=$_POST['nombre'];
    $fechaN=$_POST['fechaN'];
    $grupo=$_POST['grupo'];
    $carrera=$_POST['carrera'];

        $sqlEditar="UPDATE alumno SET 
        numC='$numC',
        nombre='$nombre',
        fechaN='$fechaN',
        grupo='$grupo',
        carrera='$carrera'
        WHERE alumnoid=$id";
        if($cx->query($sqlEditar)===true){
            $valido['success']=true;
            $valido['mensaje']="SE ACTUALIZO CORRECTAMENTE";
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