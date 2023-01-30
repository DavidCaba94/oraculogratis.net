import axios from "axios";

var url = "https://davidcaballerocalvo.es/oraculogratis/rest/stats.php";

export default {
  async getAllStatsByUserId(id) {
    let stats = {};
    await axios.post(url, {
      opcion:1,
      id_user: id
    }).then(response =>{
      if(response.status == 200){
        stats = response.data[0];
      }
    });
    return stats;
  },
  async registrarStatsByUser(id_user) {
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
  }
}