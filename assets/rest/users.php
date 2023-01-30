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
$id = (isset($_POST['id'])) ? $_POST['id'] : '';
$pass = (isset($_POST['pass'])) ? $_POST['pass'] : '';
$email = (isset($_POST['email'])) ? $_POST['email'] : '';
$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$apellidos = (isset($_POST['apellidos'])) ? $_POST['apellidos'] : '';
$signo = (isset($_POST['signo'])) ? $_POST['signo'] : '';

$pass = md5($pass);

switch($opcion){
    case 1:
        $consulta = "INSERT INTO users (email, pass, nombre, apellidos, signo) VALUES('$email', '$pass', '$nombre', '$apellidos', '$signo') ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                
        break;
    case 2:
        $consulta = "SELECT email FROM users WHERE email = '$email'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:
        $consulta = "SELECT * FROM users WHERE email = '$email' AND pass = '$pass'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 4:
        $consulta = "SELECT id FROM users ORDER BY id DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 5:
        $consulta = "UPDATE users SET pass='$pass' WHERE id='$id'";	
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                
        break;
    case 6:
        $consulta = "UPDATE users SET nombre='$nombre', apellidos='$apellidos', email='$email', signo='$signo' WHERE id='$id'";	
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                
        break;
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = NULL;