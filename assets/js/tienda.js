import axios from "axios";

var urlZodiaco = "https://davidcaballerocalvo.es/oraculogratis/rest/send_mail_zodiaco.php";

export default {
  async sendZodiacoEmail(email, text, user, signo) {
    let successSend = false;
    await axios.post(urlZodiaco, {
      email: email,
      text: text,
      user: user,
      signo: signo
    }).then(response =>{
      if(response.status == 200){
        successSend = true;
      }
    });
    return successSend;
  }
}