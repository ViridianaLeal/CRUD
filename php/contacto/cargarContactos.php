<?php

require_once '../config.php';
header("Content-Type: text/html;charset-8");

$sql="SELECT * FROM contacto";
$resultado=$cx->query($sql);

$salida=array('data'=>array());

if($resultado->num_rows>0){
    while($row=$resultado->fetch_array()){
        $salida['data'][]=array($row[0],$row[1],$row[2],$row[3],$row[4],$row[5]);
    }
}
$cx->close();
echo json_encode($salida);

?>
