<?php

require_once '../config.php';
header("Content-Type: text/html;charset-8");

$valido['success']=array('success'=>false,
'mensaje'=>"",
'datosid'=>"",
'nombreC'=>"",
'edad'=>"",
'altura'=>"",
'sexo'=>"",
'nacionalidad'=>"");

if($_POST){
    $id=$_POST['datosid'];
    $sql="SELECT * FROM datos WHERE datosid=$id";
    $resultado=$cx->query($sql);
    $row=$resultado->fetch_array();
    $valido['success']=true;
    $valido['mensaje']="SE ENCONTRO REGISTRO";
    $valido['datosid']=$row[0];
    $valido['nombreC']=$row[1];
    $valido['edad']=$row[2];
    $valido['altura']=$row[3];
    $valido['sexo']=$row[4];
    $valido['nacionalidad']=$row[5];



}else{
    $valido['success']=false;
    $valido['mensaje']="ERROR AL CARGAR DATOS";
}

$cx->close();
echo json_encode($valido);

?>
