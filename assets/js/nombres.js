import axios from "axios";

var url = "https://davidcaballerocalvo.es/oraculogratis/rest/oraculo-nombres.php";

export default {
  async getAllNamesByUserId(id) {
    let params = [];
    await axios.post(url, {
      opcion:1,
      id_user: id
    }).then(response =>{
      if(response.status == 200){
        params = response.data;
      }
    });
    return params;
  },
  async createNewNamesByUser(id_user, nombre_uno, nombre_dos, porcentaje) {
    let successReg = false;
    await axios.post(url, {
      opcion:2,
      id_user: id_user,
      nombre_uno: nombre_uno,
      nombre_dos: nombre_dos,
      porcentaje: porcentaje
    }).then(response =>{
      if(response.status == 200){
        successReg = true;
      }
    });
    return successReg;
  },
  async getAllNamesByNames(nombre_uno, nombre_dos) {
    let params = [];
    await axios.post(url, {
      opcion:3,
      nombre_uno: nombre_uno,
      nombre_dos: nombre_dos
    }).then(response =>{
      if(response.status == 200){
        params = response.data;
      }
    });
    return params;
  },
}