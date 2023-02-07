import axios from "axios";

var url = "https://davidcaballerocalvo.es/oraculogratis/rest/oraculo-sino.php";

export default {
  async getAllResponsesByUserId(id) {
    let responses = [];
    await axios.post(url, {
      opcion:1,
      id_user: id
    }).then(response =>{
      if(response.status == 200){
        responses = response.data;
      }
    });
    return responses;
  },
  async createNewResponseByUser(id_user, pregunta, respuesta) {
    let successReg = false;
    await axios.post(url, {
      opcion:2,
      id_user: id_user,
      pregunta: pregunta,
      respuesta: respuesta
    }).then(response =>{
      if(response.status == 200){
        successReg = true;
      }
    });
    return successReg;
  },
  async getAllResponsesHistoryByUserId(id) {
    let responses = [];
    await axios.post(url, {
      opcion:3,
      id_user: id
    }).then(response =>{
      if(response.status == 200){
        responses = response.data;
      }
    });
    return responses;
  },
}