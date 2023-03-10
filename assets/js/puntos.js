import axios from "axios";

var url = "https://davidcaballerocalvo.es/oraculogratis/rest/puntos.php";

export default {
  async getPointsByUserId(id) {
    let points = 0;
    await axios.post(url, {
      opcion:1,
      id_user: id
    }).then(response =>{
      if(response.status == 200){
        points = response.data[0].puntos;
      }
    });
    return points;
  },
  async createPointsByUser(id_user) {
    let successReg = false;
    await axios.post(url, {
      opcion:2,
      id_user: id_user
    }).then(response =>{
      if(response.status == 200){
        successReg = true;
      }
    });
    return successReg;
  },
  async addPointToUser(id_user) {
    let successUpdate = false;
    await axios.post(url, {
      opcion:3,
      id_user: id_user
    }).then(response =>{
      if(response.status == 200){
        successUpdate = true;
      }
    });
    return successUpdate;
  },
  async substractPointsToUser(id_user, puntos) {
    let successUpdate = false;
    await axios.post(url, {
      opcion:4,
      id_user: id_user,
      puntos: puntos
    }).then(response =>{
      if(response.status == 200){
        successUpdate = true;
      }
    });
    return successUpdate;
  }
}