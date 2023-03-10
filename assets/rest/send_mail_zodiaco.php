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

$email = (isset($_POST['email'])) ? $_POST['email'] : '';
$text = (isset($_POST['text'])) ? $_POST['text'] : '';
$user = (isset($_POST['user'])) ? $_POST['user'] : '';
$signo = (isset($_POST['signo'])) ? $_POST['signo'] : '';

// the message
$msg = "Hola $user, aqui tienes la lectura del zodiaco para tu signo $signo:\n\n\n$text\n\n\nGracias por confiar en nosotros!\nAtentamente, tu oraculo.";

// use wordwrap() if lines are longer than 100 characters
$msg = wordwrap($msg,100);

// send email
mail($email,"Lectura del zodiaco para el signo $signo",$msg,"From: lecturagratis@oraculogratis.net");
?>