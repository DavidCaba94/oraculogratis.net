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
  },
  async setSiNoUse(idUser) {
    let successUpdate = false;
    await axios.post(url, {
      opcion:3, 
      id_user: idUser
    }).then(response =>{
      if(response.status == 200){
        successUpdate = true;
      }
    });
    return successUpdate;
  },
  async setAmorUse(idUser) {
    let successUpdate = false;
    await axios.post(url, {
      opcion:3, 
      id_user: idUser
    }).then(response =>{
      if(response.status == 200){
        successUpdate = true;
      }
    });
    return successUpdate;
  },
  async setNombresUse(idUser) {
    let successUpdate = false;
    await axios.post(url, {
      opcion:3, 
      id_user: idUser
    }).then(response =>{
      if(response.status == 200){
        successUpdate = true;
      }
    });
    return successUpdate;
  },
  async setSignosUse(idUser) {
    let successUpdate = false;
    await axios.post(url, {
      opcion:3, 
      id_user: idUser
    }).then(response =>{
      if(response.status == 200){
        successUpdate = true;
      }
    });
    return successUpdate;
  },
  async setCartasUse(idUser) {
    let successUpdate = false;
    await axios.post(url, {
      opcion:3, 
      id_user: idUser
    }).then(response =>{
      if(response.status == 200){
        successUpdate = true;
      }
    });
    return successUpdate;
  }
}