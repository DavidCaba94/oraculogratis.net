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
$pregunta = (isset($_POST['pregunta'])) ? $_POST['pregunta'] : '';
$respuesta = (isset($_POST['respuesta'])) ? $_POST['respuesta'] : '';

switch($opcion){
  case 1:
    $consulta = "SELECT * FROM preguntas_sino WHERE id_user = '$id_user' ORDER BY id DESC LIMIT 5";
    $resultado = $conexion->prepare($consulta);
    $resultado->execute();
    $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
    break;
  case 2:
    $consulta = "INSERT INTO preguntas_sino (id_user, pregunta, respuesta) VALUES('$id_user', '$pregunta', '$respuesta')";
    $resultado = $conexion->prepare($consulta);
    $resultado->execute();                
    break;
  case 3:
    $consulta = "SELECT * FROM preguntas_sino WHERE id_user = '$id_user' ORDER BY id DESC";
    $resultado = $conexion->prepare($consulta);
    $resultado->execute();
    $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
    break;
  case 4:
    $consulta = "SELECT COUNT(*) as numPreguntas FROM preguntas_sino";
    $resultado = $conexion->prepare($consulta);
    $resultado->execute();
    $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
    break;
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = NULL;