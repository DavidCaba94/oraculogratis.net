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
  }
}