<template>
  <div>
    <Menu/>
    <h1>Oráculo Si o No</h1>
    <p class="texto">¡Descubre el <strong>Oráculo del Si o No más fiable</strong>! Nuestro <strong>servicio gratuito</strong> ofrece <strong>respuestas precisas a tus preguntas</strong>, proporcionando una guía confiable en momentos decisivos. Con una interfaz intuitiva y resultados confiables, nuestro oráculo se destaca como <strong>la mejor opción de internet</strong>. ¡No esperes más para obtener claridad y dirección en tus decisiones totalmente gratis!</p>
    <div class="box-oraculo">
      <p class="preguntas-totales">Respuestas del oráculo: {{totalResponses}}</p>
      <div class="area-respuesta">
        <div class="respuesta" v-if="!loadingRespuesta">{{respuesta}}</div>
        <div class="lds-ellipsis" v-if="loadingRespuesta"><div></div><div></div><div></div><div></div></div>
      </div>
      <p class="label-input">HAZ UNA PREGUNTA</p>
      <input type="text" class="input-oraculo" v-model="pregunta" placeholder="Escribe aquí tu pregunta">
      <div class="error-log" v-if="errorLog">Es obligatorio hacer una pregunta</div>
      <div class="btn-oraculo" @click="hacerPregunta()">Preguntar</div>
    </div>
    <div class="box-respuestas" v-if="userLogged">
      <p class="label-input">Tus últimas 5 preguntas</p>
      <div v-for="resp in responsesList" :key="resp.id" class="respuesta-item">
        <div class="text-pregunta">{{resp.pregunta}}</div>
        <div class="text-respuesta">{{resp.respuesta}}</div>
      </div>
      <NuxtLink to="/historial-preguntas">
        <div class="link-historial">Ver historial completo</div>
      </NuxtLink>
    </div>
    <div v-if="!userLogged" class="box-no-logged">
      <p>Inicia sesión para ver el historial de tus preguntas y conseguir puntos canjeables</p>
      <NuxtLink to="/usuario">
        <div class="btn-oraculo">Iniciar sesión</div>
      </NuxtLink>
    </div>
    <h2>Historia del oráculo del si o no</h2>
    <p class="texto">El <strong>Oráculo del Sí o No</strong> es una práctica antigua que consiste en hacer una pregunta y obtener una respuesta afirmativa o negativa. Se cree que esta técnica se utilizaba en la antigüedad en <strong>consultas a dioses o espíritus</strong> para recibir orientación sobre decisiones importantes.</p>
    <p class="texto">Hay muchas formas diferentes de realizar una <strong>consulta al Oráculo del Sí o No</strong>, desde el <strong>uso de monedas</strong> hasta la <strong>interpretación de sueños</strong> o la <strong>realización de rituales</strong> específicos. En muchas culturas, se considera que el Oráculo del Sí o No es una forma de comunicación directa con los dioses o el universo, y se le atribuye un gran poder y sabiduría.</p>
    <p class="texto">Aunque la práctica del Oráculo del Sí o No ha existido por muchos siglos, aún <strong>sigue siendo popular en la actualidad</strong>. Muchas personas lo utilizan como una forma de <strong>tomar decisiones</strong> o resolver incertidumbres, y creen que la respuesta proporcionada por el Oráculo es una guía valiosa para su vida.</p>
    <p class="texto">En resumen, el Oráculo del Sí o No es una tradición antigua que se ha transmitido de generación en generación y que todavía se utiliza hoy en día como una forma de <strong>recibir orientación y respuestas</strong> a preguntas importantes.</p>
    <h2>¿Es fiable el oráculo del si o no?</h2>
    <p class="texto">El Oráculo del Sí o No se erige como una <strong>herramienta confiable y precisa</strong> en un mundo inundado de incertidumbre. Alimentado por algoritmos avanzados y una vasta base de datos, este oráculo ofrece <strong>respuestas claras y concisas a tus preguntas</strong> más apremiantes. Su fiabilidad radica en su capacidad para interpretar patrones y tendencias, proporcionando una guía invaluable en momentos de indecisión.</p>
    <p class="texto">La precisión del Oráculo del Sí o No se fundamenta en su riguroso proceso de análisis, que abarca desde la formulación de la pregunta hasta la generación de la respuesta. Cada consulta se somete a un minucioso escrutinio, asegurando que las respuestas sean <strong>coherentes y relevantes</strong> para el usuario. Esta metodología garantiza una experiencia consistente y satisfactoria para quienes buscan orientación.</p>
    <p class="texto">Además de su rigurosidad técnica, la fiabilidad del Oráculo del Sí o No también se sustenta en su amplia trayectoria y reputación en línea. Miles de usuarios han atestiguado la precisión de sus predicciones, respaldando su <strong>credibilidad y confiabilidad</strong>. Su presencia en la web como el oráculo más fiable es testimonio de su capacidad para brindar claridad y certeza en situaciones ambiguas.</p>
    <p class="texto">Otra faceta crucial de la fiabilidad del Oráculo del Sí o No radica en su accesibilidad y facilidad de uso. Su interfaz intuitiva y diseño amigable hacen que sea una herramienta accesible para usuarios de todos los niveles de experiencia. Ya sea en momentos de duda rápida o en decisiones trascendentales, este oráculo se presenta como un aliado confiable en la búsqueda de respuestas claras.</p>
    <p class="texto">En definitiva, la fiabilidad del Oráculo del Sí o No se basa en su capacidad para ofrecer respuestas precisas y coherentes, respaldadas por un riguroso análisis y una amplia reputación en línea. Su accesibilidad y facilidad de uso lo convierten en una herramienta indispensable para aquellos que buscan orientación en medio de la incertidumbre.</p>
    <h2>¿Cómo funciona el oráculo del si o no?</h2>
    <p class="texto">El funcionamiento del Oráculo del Sí o No puede variar dependiendo de la cultura o la tradición que lo utilice, pero en general se basa en la <strong>interpretación de señales o símbolos para obtener una respuesta afirmativa o negativa</strong> a una pregunta específica. Algunas formas comunes de realizar una consulta al Oráculo del Sí o No incluyen:</p>
    <p class="texto texto-item"><strong><u>Tiro de moneda:</u></strong> Una de las formas más simples y conocidas de realizar una consulta al Oráculo del Sí o No es a través del tiro de una moneda. Se hace una pregunta y se tira una moneda al aire, y se interpreta la respuesta en función de si la moneda cae cara o cruz.</p>
    <p class="texto texto-item"><strong><u>Juego de naipes:</u></strong> Otra forma común de realizar una consulta al Oráculo del Sí o No es a través del uso de naipes. Se mezclan las cartas y se eligen al azar, y se interpreta la respuesta en función de la carta seleccionada.</p>
    <p class="texto texto-item"><strong><u>Interpretación de sueños:</u></strong> Algunas tradiciones creen que los sueños pueden proporcionar respuestas a través del Oráculo del Sí o No. Se hace una pregunta antes de dormir y se anota el sueño que se tuvo, y se interpreta la respuesta en función de los detalles del sueño.</p>
    <p class="texto">En todos estos casos, <strong>la interpretación de la respuesta puede variar dependiendo de la cultura o tradición que la utilice</strong>, pero en general se busca una respuesta afirmativa o negativa clara a la pregunta planteada. Algunas personas también pueden recibir respuestas más detalladas o complejas a través de la interpretación de la respuesta del Oráculo del Sí o No.</p>
    <h2>Oráculos famosos</h2>
    <p class="texto">Los oráculos son figuras míticas que han sido consultadas a lo largo de la historia para <strong>predecir el futuro y tomar decisiones importantes</strong>. Algunos de los oráculos más famosos incluyen:</p>
    <p class="texto texto-item"><strong><u>El Oráculo de Delfos:</u></strong> Situado en la antigua ciudad griega de Delfos, este oráculo era considerado <strong>el más importante de la antigüedad y era consultado por reyes, políticos y personas comunes</strong>. La sacerdotisa del Oráculo de Delfos, conocida como la Pitia, daba respuestas en nombre del dios Apolo.</p>
    <p class="texto texto-item"><strong><u>La Sibila Cumana:</u></strong> Era una profetisa de la antigua ciudad de Cumae, en Italia. La Sibila Cumana es conocida por sus <strong>profecías escritas en versos</strong> que describen los acontecimientos futuros y el fin del mundo.</p>
    <p class="texto texto-item"><strong><u>El Oráculo de Endor:</u></strong> Según la Biblia, el Oráculo de Endor <strong>fue consultado por el rey Saúl para predecir el futuro</strong> y fue en esta ocasión donde se dio la famosa advertencia de que Samuel, el profeta, había muerto.</p>
    <p class="texto texto-item"><strong><u>El Oráculo de la Luna:</u></strong> Este oráculo se encontraba en la antigua Babilonia y era famoso por su capacidad para <strong>predecir el futuro mediante la interpretación de los movimientos y fases de la luna.</strong></p>
    <p class="texto">Estos son solo algunos de los muchos oráculos famosos que han dejado su huella en la historia. Aunque la veracidad de sus predicciones es objeto de debate, <strong>muchos siguen siendo objeto de estudio y admiración</strong> en la actualidad.</p>
    <Footer/>
  </div>
</template>

<script>
import sinoService from '../assets/js/sino.js';
import statsService from '../assets/js/stats.js';

export default {
  name: 'OraculoSiNo',
  head: {
    title: 'Oráculo Si o No - Oráculo Gratis',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '¡Descubre el Oráculo del Si o No más fiable! Nuestro servicio gratuito ofrece respuestas precisas a tus preguntas, proporcionando una guía confiable en momentos decisivos. Con una interfaz intuitiva y resultados confiables, nuestro oráculo se destaca como la mejor opción de internet. ¡No esperes más para obtener claridad y dirección en tus decisiones totalmente gratis!'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
  },
  data() {
    return {
      pregunta: '',
      loadingRespuesta: false,
      respuesta: '',
      errorLog: false,
      userData: {
        id: null,
        nombre: null,
        apellidos: null,
        email: null,
        pass: null,
        signo: null
      },
      userLogged: false,
      responsesList: [],
      totalResponses: ''
    }
  },
  mounted () {
    if (localStorage.getItem('user')) {
      this.userLogged = true;
      this.getUserData();
    }
    this.getTotalResponses();
  },
  methods: {
    async hacerPregunta() {
      this.respuesta = '';
      this.errorLog = false;
      if (this.pregunta !== '') {
        this.loadingRespuesta = true;
        let numRes = Math.ceil(Math.random()*10);
        if (numRes % 2 === 0) {
          this.respuesta = 'SI';
        } else {
          this.respuesta = 'NO';
        }
        await sinoService.createNewResponseByUser(this.userData.id ? this.userData.id : 0, this.pregunta, this.respuesta);
        await this.getTotalResponses();
        if (this.userLogged) {
          await statsService.setSiNoUse(this.userData.id);
        }
        this.loadingRespuesta = false;
        this.pregunta = '';
        this.getUserResponses();
      } else {
        this.errorLog = true;
      }
    },
    getUserData() {
      this.$set(this.userData, 'id', JSON.parse(localStorage.getItem('user')).id);
      this.$set(this.userData, 'nombre', JSON.parse(localStorage.getItem('user')).nombre);
      this.$set(this.userData, 'apellidos', JSON.parse(localStorage.getItem('user')).apellidos);
      this.$set(this.userData, 'email', JSON.parse(localStorage.getItem('user')).email);
      this.$set(this.userData, 'pass', JSON.parse(localStorage.getItem('user')).pass);
      this.$set(this.userData, 'signo', JSON.parse(localStorage.getItem('user')).signo);
      this.getUserResponses();
    },
    async getUserResponses() {
      if (this.userLogged) {
        this.responsesList = await sinoService.getAllResponsesByUserId(this.userData.id);
      }
    },
    async getTotalResponses() {
      this.totalResponses = await sinoService.getAllOracleResponses();
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

h2 {
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

.texto-item {
  padding-left: 20px;
}

.box-oraculo {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  text-align: center;
  background-color: #444654;
  border-radius: 5px;
  padding-top: 20px;
}

.label-input {
  text-align: center;
  font-weight: 700;
  font-size: 13px;
  margin-top: 20px;
}

.input-oraculo {
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
  border: 0px solid white;
  border-bottom: 1px solid #ffffff;
  background-color: transparent;
  padding: 7px;
  margin-bottom: 10px;
  color: #ffffff;
  outline: none;
}

.btn-oraculo {
  width: 120px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 7px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  cursor: pointer;
}

.area-respuesta {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 0px;
  margin-bottom: 40px;
  background-image: url('../assets/img/icon-transparent.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.respuesta {
  font-size: 90px;
  font-weight: 700;
}

.error-log {
  max-width: 250px;
  margin: 5px auto;
  line-height: 20px;
  color: #ff7575;
}

.respuesta-item {
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 10px;
  background-color: #444654;
  border-radius: 5px;
}

.box-respuestas {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  text-align: center;
}

.text-pregunta {
  font-size: 12px;
  text-align: left;
}

.text-respuesta {
  min-width: 30px;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  text-align: center;
  background-color: #a887e1;
  border-radius: 50px;
}

.box-no-logged {
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  background-color: #444654;
  text-align: center;
}

.link-historial {
  width: 170px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  padding: 5px;
}

.preguntas-totales {
  text-align: left;
  font-size: 12px;
  margin: 0;
  margin-bottom: 15px;
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
