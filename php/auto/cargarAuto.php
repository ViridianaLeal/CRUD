<?php

require_once '../config.php';
header("Content-Type: text/html;charset-8");

$valido['success']=array('success'=>false,
'mensaje'=>"",
'autoid'=>"",
'marca'=>"",
'modelo'=>"",
'color'=>"",
'año'=>"",
'costo'=>"");

if($_POST){
    $id=$_POST['autoid'];
    $sql="SELECT * FROM carro WHERE autoid=$id";
    $resultado=$cx->query($sql);
    $row=$resultado->fetch_array();
    $valido['success']=true;
    $valido['mensaje']="SE ENCONTRO REGISTRO";
    $valido['autoid']=$row[0];
    $valido['marca']=$row[1];
    $valido['modelo']=$row[2];
    $valido['color']=$row[3];
    $valido['año']=$row[4];
    $valido['costo']=$row[5];



}else{
    $valido['success']=false;
    $valido['mensaje']="ERROR AL CARGAR AUTO";
}

$cx->close();
echo json_encode($valido);

?>
