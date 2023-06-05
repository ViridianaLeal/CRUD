<?php

require_once '../config.php';
header("Content-Type: text/html;charset-8");

$valido['success']=array('success'=>false,
'mensaje'=>"",
'contactoid'=>"",
'nombre'=>"",
'ap'=>"",
'am'=>"",
'telefono'=>"",
'correo'=>"");

if($_POST){
    $id=$_POST['contactoid'];
    $sql="SELECT * FROM contacto WHERE contactoid=$id";
    $resultado=$cx->query($sql);
    $row=$resultado->fetch_array();
    $valido['success']=true;
    $valido['mensaje']="SE ENCONTRO REGISTRO";
    $valido['contactoid']=$row[0];
    $valido['nombre']=$row[1];
    $valido['ap']=$row[2];
    $valido['am']=$row[3];
    $valido['telefono']=$row[4];
    $valido['correo']=$row[5];



}else{
    $valido['success']=false;
    $valido['mensaje']="ERROR AL CARGAR CONTACTO";
}

$cx->close();
echo json_encode($valido);

?>
