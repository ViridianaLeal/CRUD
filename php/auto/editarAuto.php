<?php

require_once '../config.php';

$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $id=$_POST['autoid'];
    $marca=$_POST['marca'];
    $modelo=$_POST['modelo'];
    $color=$_POST['color'];
    $año=$_POST['año'];
    $costo=$_POST['costo'];

        $sqlEditar="UPDATE carro SET 
        marca='$marca',
        modelo='$modelo',
        color='$color',
        año='$año',
        costo='$costo'
        WHERE autoid=$id";
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