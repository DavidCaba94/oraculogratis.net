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
      }
    });
    return successReg;
  },
  async getUserByEmail(form) {
    let finalUser = null;
    await axios.post(url, {
      opcion:2,
      email: form.email
    }).then(response =>{
      if(response.status == 200 && response.data.length > 0){
        finalUser = response.data[0];
      }
    });
    return finalUser;
  },
  async getUserByLogin(form) {
    let finalUser = null;
    await axios.post(url, {
      opcion:3,
      email: form.email,
      pass: form.pass
    }).then(response =>{
      if(response.status == 200 && response.data.length > 0){
        finalUser = response.data[0];
      }
    });
    return finalUser;
  },
  async getLastUser() {
    let idUser = null;
    await axios.post(url, {
      opcion:4
    }).then(response =>{
      if(response.status == 200 && response.data.length > 0){
        idUser = response.data[0].id;
      }
    });
    return idUser;
  },
  async updatePassUsuario(id, pass) {
    let successUpdate = false;
    await axios.post(url, {
      opcion:5, 
      id: id,
      pass: pass
    }).then(response =>{
      if(response.status == 200){
        successUpdate = true;
      }
    });
    return successUpdate;
  },
  async updateDataUsuario(form) {
    let successUpdate = false;
    await axios.post(url, {
      opcion:6, 
      id: form.id,
      email: form.email,
      nombre: form.nombre,
      apellidos: form.apellidos,
      signo: form.signo
    }).then(response =>{
      if(response.status == 200){
        successUpdate = true;
      }
    });
    return successUpdate;
  }
}