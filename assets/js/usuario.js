import axios from "axios";

var url = "https://davidcaballerocalvo.es/oraculogratis/rest/users.php";
var urlMail = "https://davidcaballerocalvo.es/oraculogratis/rest/send_mail_verify.php";

export default {
  async registrarUsuario(form) {
    let successReg = false;
    await axios.post(url, {
      opcion:1,
      email: form.email, 
      pass: form.pass,
      nombre: form.nombre,
      apellidos: form.apellidos,
      signo: form.signo
    }).then(response =>{
      if(response.status == 200){
        successReg = true;
      } else {
        console.log('error');
      }
    });
    return successReg;
  }
}