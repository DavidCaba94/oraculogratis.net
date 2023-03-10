<template>
  <div>
    <Menu/>
    <h1>Lectura del signo del zodiaco</h1>
    <p class="texto">Confirma tus datos y recibirás una lectura de tu signo del zodiaco <strong>gratis</strong> y totalmente personalizada en tu email. El coste de esta lectura es de 200 puntos que puedes conseguir gratis utilizando nuestros oráculos.</p>
    <div v-if="!userLogged" class="box-no-logged-zodiaco">
      <p>Inicia sesión para poder recibir la lectura gratis en tu email</p>
      <NuxtLink to="/usuario">
        <div class="btn-zodiaco">Iniciar sesión</div>
      </NuxtLink>
    </div>
    <div class="" v-if="userLogged">
      <div class="box-puntos-zodiaco">
        Actualmente dispones de
        <img src="../../assets/img/coin.png" alt="Puntos" class="moneda">
        <div class="puntos-totales">{{puntos}}</div>
      </div>
      <p class="texto">La lectura gratuita se enviará al siguiente email. Si deseas enviarlo a otro diferente puedes cambiarlo aquí. Pulsa "Solicitar" para recibir la lectura.</p>
      <div class="box-email">
        <p class="email-text">Solicita tu lectura</p>
        <p class="email-label">Email</p>
        <input type="email" class="input-email" v-model="userData.email">
        <div class="btn-zodiaco" v-if="!loading" @click="comprobarPuntos()">
          Solicitar por
          <img src="../../assets/img/coin.png" alt="Puntos" class="moneda">200
        </div>
        <div class="lds-ellipsis" v-if="loading"><div></div><div></div><div></div><div></div></div>
        <div class="error-log" v-if="errorLog">No tienes suficientes monedas para solicitar la lectura</div>
        <div class="success-log" v-if="successLog">Se ha enviado la lectura a tu correo, la recibirás en unos minutos. Si no la recibes revisa la carpeta de spam.</div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import puntosService from '../../assets/js/puntos.js';
import tiendaService from '../../assets/js/tienda.js';

export default {
  name: 'LecturaZodiaco',
  head: {
    title: 'Lectura del signo del zodiaco - Oráculo Gratis',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Recibe una lectura del signo del zodiaco en tu email totalmente gratis canjeando tus puntos.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
  },
  data() {
    return {
      userData: {
        id: null,
        nombre: null,
        apellidos: null,
        email: null,
        pass: null,
        signo: null
      },
      userLogged: false,
      puntos: 0,
      errorLog: false,
      successLog: false,
      loading: false
    }
  },
  mounted () {
    if (localStorage.getItem('user')) {
      this.userLogged = true;
      this.getUserData();
    }
  },
  methods: {
    getUserData() {
      this.$set(this.userData, 'id', JSON.parse(localStorage.getItem('user')).id);
      this.$set(this.userData, 'nombre', JSON.parse(localStorage.getItem('user')).nombre);
      this.$set(this.userData, 'apellidos', JSON.parse(localStorage.getItem('user')).apellidos);
      this.$set(this.userData, 'email', JSON.parse(localStorage.getItem('user')).email);
      this.$set(this.userData, 'pass', JSON.parse(localStorage.getItem('user')).pass);
      this.$set(this.userData, 'signo', JSON.parse(localStorage.getItem('user')).signo);
      this.getPuntos();
    },
    async getPuntos() {
      this.puntos = await puntosService.getPointsByUserId(this.userData.id);
    },
    comprobarPuntos() {
      this.errorLog = false;
      this.successLog = false;
      if (parseInt(this.puntos) >= 200) {
        this.enviarLecturaEmail();
      } else {
        this.errorLog = true;
      }
    },
    async enviarLecturaEmail() {
      this.loading = true;
      let enviado = await tiendaService.sendZodiacoEmail(this.userData.email, this.crearLecturaPersonalizada(this.userData.signo), this.userData.nombre, this.userData.signo);
      if (enviado) {
        await puntosService.substractPointsToUser(this.userData.id, 200);
        this.getPuntos();
        this.successLog = true;
      }
      this.loading = false;
    },
    crearLecturaPersonalizada(signo) {
      let lecturaCompleta = '';
      switch(signo) {
        case 'Acuario':
          lecturaCompleta = 'Los Acuario son personas creativas, innovadoras y originales. Son pensadores independientes que disfrutan desafiando las normas establecidas y explorando nuevas ideas y perspectivas. Son muy curiosos y les encanta aprender cosas nuevas, lo que los hace ideales para los trabajos relacionados con la tecnología, la ciencia o las artes.\n\nLos Acuario son muy sociales y les gusta rodearse de personas interesantes y con ideas afines. Son muy amigables y disfrutan haciendo amigos en cualquier lugar donde vayan. A menudo, los Acuario tienen una personalidad excéntrica, lo que los hace únicos y especiales en su grupo social.\n\nA veces, los Acuario pueden ser un poco impredecibles y difíciles de comprender. Pueden cambiar de opinión o de planes sin previo aviso y esto puede molestar a algunas personas. A pesar de esto, los Acuario son personas amables y humanitarias que se preocupan profundamente por los demás. Son muy sensibles a las injusticias y siempre están dispuestos a luchar por las causas que consideran importantes.';
          break;
        case 'Aries':
          lecturaCompleta = 'Los Aries son personas decididas, enérgicas y valientes. Son líderes naturales y tienen una gran capacidad para tomar decisiones rápidas y audaces. Les gusta estar en control de las situaciones y no tienen miedo de enfrentar desafíos y riesgos. Son muy independientes y prefieren hacer las cosas a su manera.\n\nLos Aries son personas impulsivas y apasionadas, lo que los hace muy emocionales en su comportamiento. Les gusta vivir la vida al máximo y disfrutan de la aventura y la emoción. Son muy competitivos y les encanta ganar, lo que los hace ideales para los deportes y otros desafíos competitivos.\n\nA veces, los Aries pueden ser un poco impacientes y arrogantes en su comportamiento. No les gusta esperar y pueden perder el interés si algo no sucede lo suficientemente rápido. También pueden ser un poco dominantes en su comportamiento y pueden parecer agresivos o intimidantes para los demás.\n\nLos Aries tienen una gran confianza en sí mismos y en sus habilidades, lo que los hace ideales para los trabajos que requieren liderazgo y toma de decisiones. Son muy comprometidos con sus objetivos y tienen una gran capacidad para lograr lo que se proponen.';
          break;
        case 'Cancer':
          lecturaCompleta = 'Los Cáncer son personas emocionales, empáticas y muy sensibles. Son muy cercanos a sus amigos y familiares y les encanta sentirse protegidos y seguros en su entorno. Son personas muy intuitivas y suelen ser excelentes oyentes, lo que les permite conectarse profundamente con los demás.\n\nLos Cáncer son muy creativos y suelen tener una gran imaginación. Les encanta el arte, la música y la literatura, y tienen una gran capacidad para expresarse a través de estos medios. Son personas muy cariñosas y afectuosas, y siempre están dispuestos a ayudar a los demás.\n\nA veces, los Cáncer pueden ser un poco retraídos y reservados en su comportamiento. Les cuesta confiar en los demás y pueden tardar un poco en abrirse. También pueden ser un poco manipuladores y controladores en sus relaciones interpersonales, lo que puede generar conflictos con los demás.\n\nLos Cáncer son personas muy comprometidas con su familia y hogar, lo que los hace ideales para trabajos que requieren atención al detalle y cuidado, como el diseño de interiores o la planificación de eventos. Son muy leales y comprometidos con sus relaciones interpersonales, lo que los convierte en excelentes amigos y compañeros de vida. ';
          break;
        case 'Capricornio':
          lecturaCompleta = 'Los Capricornio son personas ambiciosas, trabajadoras y perseverantes. Son muy enfocados en el logro de sus objetivos y tienen una gran capacidad para planificar y organizarse. Son responsables y fiables, y tienen una ética de trabajo muy fuerte. Además, tienen una gran capacidad para ser líderes y motivar a los demás.\n\nSin embargo, a veces pueden ser demasiado serios y estrictos en su enfoque, lo que puede afectar negativamente sus relaciones personales. Pueden ser un poco reservados y distantes emocionalmente, lo que puede hacer que los demás los perciban como fríos o distantes. También pueden tener dificultades para relajarse y disfrutar de la vida, ya que suelen estar tan enfocados en el trabajo y la productividad. En resumen, los Capricornio son personas trabajadoras y comprometidas, pero también necesitan aprender a equilibrar su vida laboral y personal para ser verdaderamente felices.'
          break;
        case 'Escorpio':
          lecturaCompleta = 'Los Escorpio son conocidos por ser personas intensas, apasionadas y decididas. Suelen ser muy analíticos y tienen una gran capacidad para detectar mentiras o cualquier tipo de engaño, por lo que no les gusta que les mientan ni que jueguen con ellos.\n\nTambién son muy intuitivos y pueden percibir con facilidad las emociones y los estados de ánimo de las personas que los rodean, lo que les permite adaptarse a las situaciones de manera efectiva. Los Escorpio son muy protectores con sus seres queridos y suelen ser leales y comprometidos en sus relaciones personales y laborales.\n\nPor otro lado, los Escorpio también pueden ser muy celosos, posesivos y desconfiados en ocasiones, lo que puede generar conflictos en sus relaciones interpersonales. Además, pueden ser bastante críticos y exigentes consigo mismos y con los demás, lo que a veces puede llevarlos a ser perfeccionistas o incluso obsesivos en ciertas áreas de su vida.';
          break;
        case 'Geminis':
          lecturaCompleta = 'Los Géminis son conocidos por ser personas curiosas, ingeniosas y versátiles. Tienen una mente ágil y les gusta estar siempre en constante movimiento, por lo que pueden ser excelentes comunicadores y adaptarse fácilmente a distintas situaciones sociales.\n\nSuelen ser personas muy sociables y disfrutan de la interacción con los demás, pero también pueden ser muy independientes y necesitar momentos de soledad para reflexionar y procesar sus ideas.\n\nLos Géminis tienen una gran capacidad de aprendizaje y les gusta adquirir nuevos conocimientos. Sin embargo, también pueden ser superficiales y cambiar de opinión con facilidad, lo que puede generar incertidumbre en las personas que los rodean.\n\nEn el amor, los Géminis pueden ser muy románticos y apasionados, pero también pueden ser inestables en sus relaciones y tener dificultades para comprometerse. En el trabajo, suelen ser muy creativos y pueden destacarse en áreas como la publicidad, la comunicación o el periodismo.';
          break;
        case 'Leo':
          lecturaCompleta = 'Los Leo son personas seguras de sí mismas, carismáticas y enérgicas. Son líderes naturales y tienen una gran capacidad para inspirar y motivar a los demás. Les encanta estar en el centro de atención y suelen ser muy populares en su círculo social.\n\nLos Leo son personas creativas y les gusta el arte, el teatro y la música. Son muy apasionados y disfrutan de la vida al máximo. Les encanta el lujo y la comodidad, y suelen tener un gusto refinado por la moda y la decoración.\n\nA veces, los Leo pueden ser un poco arrogantes y dominantes en su comportamiento. Les gusta ser el centro de atención y pueden ser un poco posesivos con las personas que consideran importantes en su vida. Sin embargo, también son muy generosos y amables con los demás, y siempre están dispuestos a ayudar a quienes los necesitan.\n\nLos Leo tienen una gran confianza en sí mismos y en sus habilidades, lo que los hace ideales para los trabajos que requieren liderazgo y toma de decisiones. Son muy comprometidos con sus objetivos y tienen una gran capacidad para lograr lo que se proponen.';
          break;
        case 'Libra':
          lecturaCompleta = 'Los Libra son conocidos por ser personas equilibradas, justas y pacíficas. Suelen ser muy diplomáticos y tienen una gran capacidad para resolver conflictos y llegar a acuerdos en situaciones difíciles.\n\nTambién son personas muy sociables y les gusta rodearse de amigos y seres queridos. Los Libra disfrutan de la belleza, la armonía y el buen gusto, por lo que pueden tener habilidades artísticas y estéticas muy desarrolladas.\n\nLos Libra pueden ser muy indecisos en ocasiones, ya que les gusta evaluar todas las opciones antes de tomar una decisión. También pueden ser bastante complacientes con los demás, lo que a veces puede llevarlos a sacrificarse en exceso en sus relaciones interpersonales.\n\nEn el amor, los Libra pueden ser muy románticos y apasionados, pero también pueden tener dificultades para comprometerse en una relación duradera. En el trabajo, suelen ser muy hábiles para mediar en situaciones de conflicto y pueden destacarse en áreas como la política, la justicia o la diplomacia.';
          break;
        case 'Piscis':
          lecturaCompleta = 'Los Piscis son conocidos por ser personas sensibles, imaginativas y compasivas. Suelen tener una gran capacidad para empatizar con los demás y son muy intuitivos para detectar las necesidades emocionales de las personas que los rodean.\n\nTambién son personas muy creativas y artísticas, y pueden destacarse en áreas como la música, la literatura o las artes visuales. A menudo tienen una rica vida interior y pueden ser muy reflexivos y profundos en su pensamiento.\n\nLos Piscis pueden ser muy idealistas y soñadores, y pueden tener dificultades para adaptarse a las realidades de la vida cotidiana. También pueden ser muy sensibles a las emociones de los demás y absorber las energías negativas de su entorno, lo que puede afectar su estado de ánimo.\n\nEn el amor, los Piscis pueden ser muy románticos y apasionados, pero también pueden ser muy dependientes emocionalmente y tener dificultades para establecer límites saludables en sus relaciones. En el trabajo, suelen ser muy creativos y pueden destacarse en áreas como el arte, la música o la escritura.';
          break;
        case 'Sagitario':
          lecturaCompleta = 'Los Sagitario son conocidos por ser personas aventureras, optimistas y entusiastas. Suelen ser muy curiosos y les gusta explorar y experimentar cosas nuevas, tanto en lo físico como en lo intelectual.\n\nTambién son personas muy honestas y francas, y a menudo dicen lo que piensan sin filtros. Los Sagitario son muy independientes y les gusta tener su propio espacio y libertad para hacer lo que quieren.\n\nLos Sagitario pueden ser muy impacientes y no les gusta sentirse limitados o atrapados. También pueden ser muy impulsivos y tomar decisiones precipitadas sin pensar en las consecuencias.\n\nEn el amor, los Sagitario pueden ser muy apasionados y aventureros, pero también pueden tener dificultades para establecer compromisos a largo plazo. En el trabajo, suelen ser muy emprendedores y pueden destacarse en áreas como el marketing, la publicidad o el turismo.';
          break;
        case 'Tauro':
          lecturaCompleta = 'Los Tauro son conocidos por ser personas pacientes, confiables y leales. Suelen ser muy prácticos y valoran la estabilidad y la seguridad en sus relaciones y en su vida en general.\n\nTambién son personas muy terrenales y les gusta disfrutar de los placeres de la vida, como la buena comida, el confort y la belleza estética. Los Tauro son muy trabajadores y tienen una gran capacidad para concentrarse en tareas que requieren de atención y paciencia.\n\nLos Tauro pueden ser muy testarudos y no les gusta que les digan lo que deben hacer. También pueden ser posesivos y celosos en sus relaciones, y pueden tener dificultades para dejar ir a personas y situaciones que ya no les sirven.\n\nEn el amor, los Tauro son muy apasionados y leales, y buscan relaciones estables y duraderas. En el trabajo, suelen ser muy eficientes y pueden destacarse en áreas como la banca, las finanzas o la agricultura.';
          break;
        case 'Virgo':
          lecturaCompleta = 'Los Virgo son conocidos por ser personas analíticas, detallistas y perfeccionistas. Suelen tener una gran capacidad para ver los pequeños detalles y trabajar de manera minuciosa y organizada.\n\nTambién son personas muy prácticas y realistas, y pueden ser muy críticos consigo mismos y con los demás. Los Virgo tienen una gran habilidad para solucionar problemas y encontrar soluciones eficientes.\n\nLos Virgo pueden ser muy tímidos y reservados, y pueden tener dificultades para expresar sus emociones. También pueden ser muy exigentes consigo mismos y con los demás, y pueden sentirse frustrados cuando las cosas no salen exactamente como lo planeado.\n\nEn el amor, los Virgo pueden ser muy leales y comprometidos, pero también pueden tener dificultades para mostrar sus sentimientos. En el trabajo, suelen ser muy eficientes y pueden destacarse en áreas como la investigación, la ciencia o la tecnología.';
          break;
      }
      return lecturaCompleta;
    }
  }
}
</script>

<style>
body {
  margin: 0;
  background-color: #343541;
  font-family: 'Roboto', sans-serif;
  color: #ffffff;
  padding: 10px;
}

a {
  text-decoration: none;
  color: #ffffff;
}

h1 {
  text-align: center;
}

.texto {
  max-width: 600px;
  margin: 0 auto;
  font-size: 13px;
  line-height: 1.5;
  color: #ededed;
  padding: 10px;
  text-align: justify;
}

p {
  text-align: center;
}

.btn-zodiaco {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: 190px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 7px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  text-align: center;
  cursor: pointer;
}

.box-no-logged-zodiaco {
  max-width: 500px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  background-color: #444654;
  text-align: center;
}

.box-puntos-zodiaco {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.moneda {
  width: 25px;
  height: 25px;
  margin-right: 5px;
  margin-left: 10px;
}

.email-text {
  max-width: 250px;
  margin: 5px auto;
  line-height: 18px;
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
}

.email-label {
  text-align: left;
  font-size: 12px;
  padding-left: 20px;
  margin: 0;
}

.input-email {
  width: 250px;
  border: 0px solid white;
  border-bottom: 1px solid #ffffff;
  background-color: transparent;
  padding: 7px;
  margin-bottom: 20px;
  color: #ffffff;
  outline: none;
}

.box-email {
  max-width: 300px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  background-color: #444654;
  text-align: center;
}

.error-log {
  max-width: 250px;
  margin: 5px auto;
  line-height: 20px;
  color: #ff7575;
}

.success-log {
  max-width: 250px;
  margin: 5px auto;
  line-height: 20px;
  color: #28dc73;
}


/* LOADER */
.lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 30px;
    margin-top: 10px;
}
.lds-ellipsis div {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgb(255, 255, 255);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}
@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(24px, 0);
    }
}
</style>
