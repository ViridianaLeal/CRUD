<?php

require_once '../config.php';

$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $marca=$_POST['marca'];
    $modelo=$_POST['modelo'];
    $color=$_POST['color'];
    $año=$_POST['año'];
    $costo=$_POST['costo'];

        $sqlInsertar="INSERT INTO carro VALUES(null,'$marca','$modelo','$color','$año','$costo')";
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