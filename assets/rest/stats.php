<?php
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$_POST = json_decode(file_get_contents("php://input"), true);

function permisos() {  
  if (isset($_SERVER['HTTP_ORIGIN'])){
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
      header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");
      header('Access-Control-Allow-Credentials: true');      
  }  
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))          
        header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");
    exit(0);
  }
}
permisos();


$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$id_user = (isset($_POST['id_user'])) ? $_POST['id_user'] : '';

switch($opcion){
    case 1:
      $consulta = "SELECT * FROM stats WHERE id_user = '$id_user'";
      $resultado = $conexion->prepare($consulta);
      $resultado->execute();
      $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
      break;
    case 2:
      $consulta = "INSERT INTO stats (id_user, sino, amor, nombres, signos, cartas) VALUES('$id_user', 0, 0, 0, 0, 0)";
      $resultado = $conexion->prepare($consulta);
      $resultado->execute();                
      break;
    case 3:
      $consulta = "UPDATE stats SET sino=sino+1 WHERE id_user='$id_user'";	
      $resultado = $conexion->prepare($consulta);
      $resultado->execute();                
      break;
    case 4:
      $consulta = "UPDATE stats SET amor=amor+1 WHERE id_user='$id_user'";	
      $resultado = $conexion->prepare($consulta);
      $resultado->execute();                
      break;
    case 5:
      $consulta = "UPDATE stats SET nombres=nombres+1 WHERE id_user='$id_user'";	
      $resultado = $conexion->prepare($consulta);
      $resultado->execute();                
      break;
    case 6:
      $consulta = "UPDATE stats SET signos=signos+1 WHERE id_user='$id_user'";	
      $resultado = $conexion->prepare($consulta);
      $resultado->execute();                
      break;
    case 7:
      $consulta = "UPDATE stats SET cartas=cartas+1 WHERE id_user='$id_user'";	
      $resultado = $conexion->prepare($consulta);
      $resultado->execute();                
      break;
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = NULL;