import axios from "axios";

var url = "https://davidcaballerocalvo.es/oraculogratis/rest/oraculo-amor.php";

export default {
  async getAllParamsByUserId(id) {
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
  async createNewParamByUser(id_user, nombre_uno, nombre_dos, paramsCalculo) {
    let successReg = false;
    await axios.post(url, {
      opcion:2,
      id_user: id_user,
      nombre_uno: nombre_uno,
      nombre_dos: nombre_dos,
      comunicacion: paramsCalculo.comunicacion,
      pareja: paramsCalculo.pareja,
      amor: paramsCalculo.amor,
      amistad: paramsCalculo.amistad,
      sexo: paramsCalculo.sexo
    }).then(response =>{
      if(response.status == 200){
        successReg = true;
      }
    });
    return successReg;
  },
  async getAllParamsByNames(nombre_uno, nombre_dos) {
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