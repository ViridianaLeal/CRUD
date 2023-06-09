<?php

require_once '../config.php';

$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $nombreC=$_POST['nombreC'];
    $edad=$_POST['edad'];
    $altura=$_POST['altura'];
    $sexo=$_POST['sexo'];
    $nacionalidad=$_POST['nacionalidad'];

        $sqlInsertar="INSERT INTO datos VALUES(null,'$nombreC','$edad','$altura','$sexo','$nacionalidad')";
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