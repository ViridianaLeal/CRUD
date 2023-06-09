<?php

require_once '../config.php';

$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $id=$_POST['datosid'];
    $nombreC=$_POST['nombreC'];
    $edad=$_POST['edad'];
    $altura=$_POST['altura'];
    $sexo=$_POST['sexo'];
    $nacionalidad=$_POST['nacionalidad'];

        $sqlEditar="UPDATE datos SET 
        nombreC='$nombreC',
        edad='$edad',
        altura='$altura',
        sexo='$sexo',
        nacionalidad='$nacionalidad'
        WHERE datosid=$id";
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