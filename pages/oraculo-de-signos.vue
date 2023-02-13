<template>
  <div>
    <Menu/>
    <h1>Oráculo de signos</h1>
    <p class="texto">Este oráculo de <strong>signos del zodiaco</strong> te proporcionará información sobre la <strong>compatibilidad</strong> de los dos signos que elijas. Es totalmente <strong>gratuito, fiable</strong> y puedes usarlo todas las veces que lo necesites.</p>
    <div class="box-signos">
      <p class="label-input">TU SIGNO</p>
      <div class="fila-signos">
        <div :class="getSignoUnoClass('Acuario')" @click="addSigno(1, 'Acuario')">
          <img src="../assets/img/signos-nombre/acuario.png" alt="Acuario">
        </div>
        <div :class="getSignoUnoClass('Aries')" @click="addSigno(1, 'Aries')">
          <img src="../assets/img/signos-nombre/aries.png" alt="Aries">
        </div>
        <div :class="getSignoUnoClass('Cancer')" @click="addSigno(1, 'Cancer')">
          <img src="../assets/img/signos-nombre/cancer.png" alt="Cancer">
        </div>
        <div :class="getSignoUnoClass('Capricornio')" @click="addSigno(1, 'Capricornio')">
          <img src="../assets/img/signos-nombre/capricornio.png" alt="Capricornio">
        </div>
        <div :class="getSignoUnoClass('Escorpio')" @click="addSigno(1, 'Escorpio')">
          <img src="../assets/img/signos-nombre/escorpio.png" alt="Escorpio">
        </div>
        <div :class="getSignoUnoClass('Geminis')" @click="addSigno(1, 'Geminis')">
          <img src="../assets/img/signos-nombre/geminis.png" alt="Geminis">
        </div>
        <div :class="getSignoUnoClass('Leo')" @click="addSigno(1, 'Leo')">
          <img src="../assets/img/signos-nombre/leo.png" alt="Leo">
        </div>
        <div :class="getSignoUnoClass('Libra')" @click="addSigno(1, 'Libra')">
          <img src="../assets/img/signos-nombre/libra.png" alt="Libra">
        </div>
        <div :class="getSignoUnoClass('Piscis')" @click="addSigno(1, 'Piscis')">
          <img src="../assets/img/signos-nombre/piscis.png" alt="Piscis">
        </div>
        <div :class="getSignoUnoClass('Sagitario')" @click="addSigno(1, 'Sagitario')">
          <img src="../assets/img/signos-nombre/sagitario.png" alt="Sagitario">
        </div>
        <div :class="getSignoUnoClass('Tauro')" @click="addSigno(1, 'Tauro')">
          <img src="../assets/img/signos-nombre/tauro.png" alt="Tauro">
        </div>
        <div :class="getSignoUnoClass('Virgo')" @click="addSigno(1, 'Virgo')">
          <img src="../assets/img/signos-nombre/virgo.png" alt="Virgo">
        </div>
      </div>
      <p class="label-input">SU SIGNO</p>
      <div class="fila-signos">
        <div :class="getSignoDosClass('Acuario')" @click="addSigno(2, 'Acuario')">
          <img src="../assets/img/signos-nombre/acuario.png" alt="Acuario">
        </div>
        <div :class="getSignoDosClass('Aries')" @click="addSigno(2, 'Aries')">
          <img src="../assets/img/signos-nombre/aries.png" alt="Aries">
        </div>
        <div :class="getSignoDosClass('Cancer')" @click="addSigno(2, 'Cancer')">
          <img src="../assets/img/signos-nombre/cancer.png" alt="Cancer">
        </div>
        <div :class="getSignoDosClass('Capricornio')" @click="addSigno(2, 'Capricornio')">
          <img src="../assets/img/signos-nombre/capricornio.png" alt="Capricornio">
        </div>
        <div :class="getSignoDosClass('Escorpio')" @click="addSigno(2, 'Escorpio')">
          <img src="../assets/img/signos-nombre/escorpio.png" alt="Escorpio">
        </div>
        <div :class="getSignoDosClass('Geminis')" @click="addSigno(2, 'Geminis')">
          <img src="../assets/img/signos-nombre/geminis.png" alt="Geminis">
        </div>
        <div :class="getSignoDosClass('Leo')" @click="addSigno(2, 'Leo')">
          <img src="../assets/img/signos-nombre/leo.png" alt="Leo">
        </div>
        <div :class="getSignoDosClass('Libra')" @click="addSigno(2, 'Libra')">
          <img src="../assets/img/signos-nombre/libra.png" alt="Libra">
        </div>
        <div :class="getSignoDosClass('Piscis')" @click="addSigno(2, 'Piscis')">
          <img src="../assets/img/signos-nombre/piscis.png" alt="Piscis">
        </div>
        <div :class="getSignoDosClass('Sagitario')" @click="addSigno(2, 'Sagitario')">
          <img src="../assets/img/signos-nombre/sagitario.png" alt="Sagitario">
        </div>
        <div :class="getSignoDosClass('Tauro')" @click="addSigno(2, 'Tauro')">
          <img src="../assets/img/signos-nombre/tauro.png" alt="Tauro">
        </div>
        <div :class="getSignoDosClass('Virgo')" @click="addSigno(2, 'Virgo')">
          <img src="../assets/img/signos-nombre/virgo.png" alt="Virgo">
        </div>
      </div>
      <div class="error-log" v-if="errorLog">Es obligatorio elegir ambos signos</div>
      <div class="btn-oraculo" @click="calcularCompatibilidad()">Calcular</div>
    </div>
    <div class="signos-resultado" v-if="mostrarSignos">
      <div>Compatibilidad de</div>
      <div>{{signoUno}} y {{signoDos}}</div>
      <div class="porcentaje-signos">{{resultado}}%</div>
    </div>
    <h2>Historia del oráculo de signos</h2>
    <p class="texto">El oráculo de signos es una tradición antigua que se remonta a las <strong>culturas antiguas</strong>, como la egipcia, la griega y la romana. En estas culturas, los oráculos eran considerados como <strong>intermediarios divinos</strong> y se les consultaba para predecir el futuro y buscar sabiduría y orientación.</p>
    <p class="texto">Con el tiempo, la práctica del oráculo evolucionó y se adaptó a diferentes culturas y tradiciones, adoptando <strong>diferentes formas y técnicas</strong>. En algunos casos, los oráculos se basaban en la interpretación de sueños o en la <strong>lectura de las runas</strong>, mientras que en otros se utilizaba el tarot o la <strong>astrología</strong>.</p>
    <p class="texto">Sin embargo, en la actualidad, <strong>el oráculo de signos se ha vuelto más accesible y popular gracias a la tecnología</strong>. Muchos sitios web ofrecen oráculos de signos en línea que pueden ser consultados en cualquier momento y lugar, lo que ha permitido a las personas tener acceso a una amplia variedad de herramientas y recursos para <strong>predecir su futuro y encontrar respuestas</strong> a sus preguntas.</p>
    <p class="texto">En resumen, el oráculo de signos es una tradición antigua y variada que <strong>ha evolucionado con el tiempo</strong> y se ha adaptado a las necesidades y preferencias de diferentes culturas y generaciones. Hoy en día, es una herramienta accesible y popular que permite a las personas predecir su futuro y encontrar orientación en su camino.</p>
    <h2>¿Cómo funciona?</h2>
    <p class="texto">El oráculo de signos funciona a través de la <strong>interpretación de símbolos y patrones astrológicos, cartas del tarot o signos zodiacales</strong>. En cada sesión, una persona proporciona información personal, como su fecha de nacimiento o signo zodiacal, y luego se realiza una lectura para predecir su futuro y brindar orientación sobre diferentes aspectos de su vida, como el amor, la salud y el dinero.</p>
    <p class="texto">En el caso de la astrología, por ejemplo, los astros y los planetas juegan un papel importante en la interpretación del futuro. Los astrólogos creen que la posición de los planetas en el momento de nacimiento de una persona puede influir en su personalidad, fortalezas y debilidades, y en los eventos futuros de su vida.</p>
    <p class="texto">En la lectura del tarot, las cartas representan diferentes arquetipos y simbolizan diferentes aspectos de la vida humana, como la salud, el amor y el trabajo. <strong>Cada carta tiene un significado específico</strong> y, cuando se colocan juntas en una lectura, pueden brindar una visión más completa y profunda de la vida de una persona.</p>
    <p class="texto">En resumen, el oráculo de signos funciona a través de la interpretación de símbolos y patrones astrológicos, cartas del tarot o signos zodiacales, que se utilizan para predecir el futuro y brindar orientación sobre diferentes aspectos de la vida. Cada sesión es única y personalizada para cada persona, lo que permite una lectura precisa y relevante para sus necesidades y circunstancias.</p>
    <Footer/>
  </div>
</template>

<script>
import statsService from '../assets/js/stats.js';

export default {
  name: 'OraculoSignos',
  head: {
    title: 'Oráculo de Signos - Oráculo Gratis',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Este oráculo de signos del zodiaco te proporcionará información sobre la compatibilidad de los dos signos que elijas. Es totalmente gratuito, fiable y puedes usarlo todas las veces que lo necesites.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
  },
  mounted () {
    if (localStorage.getItem('user')) {
      this.userLogged = true;
      this.getUserData();
    }
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
      errorLog: false,
      signoUno: null,
      signoDos: null,
      signosNumerados: ["Aries","Tauro","Geminis","Cancer","Leo","Virgo","Libra","Escorpio","Sagitario","Capricornio","Acuario","Piscis"],
      compatibilidad: [
        [60,65,65,65,90,45,70,80,90,50,55,65],
        [60,70,70,80,70,90,75,85,50,95,80,85],
        [70,70,75,60,80,75,90,60,75,50,90,50],
        [65,80,60,75,70,75,60,95,55,45,70,90],
        [90,70,80,70,85,75,65,75,95,45,70,75],
        [45,90,75,75,75,70,80,85,70,95,50,70],
        [70,75,90,60,65,80,80,85,80,85,95,50],
        [80,85,60,95,75,85,85,90,80,65,60,95],
        [90,50,75,55,95,70,80,85,85,55,60,75],
        [50,95,50,45,45,95,85,65,55,85,70,85],
        [55,80,90,70,70,50,95,60,60,70,80,55],
        [65,85,50,90,75,70,50,95,75,85,55,80]
      ],
      resultado: null,
      mostrarSignos: false
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
    },
    addSigno(posicion, signo) {
      this.mostrarSignos = false;
      if (posicion === 1) {
        this.signoUno = signo;
      } else {
        this.signoDos = signo;
      }
    },
    async calcularCompatibilidad() {
      this.errorLog = false;
      if (this.signoUno && this.signoDos) {
        this.resultado = this.compatibilidad[this.signosNumerados.indexOf(this.signoUno)][this.signosNumerados.indexOf(this.signoDos)];
        this.mostrarSignos = true;
        if (this.userLogged) {
          await statsService.setSignosUse(this.userData.id);
        }
      } else {
        this.errorLog = true;
      }
    },
    getSignoUnoClass(signo) {
      let defaultClass = 'signo-item';
      if (signo === this.signoUno) {
        defaultClass += ' signo-seleccionado';
      }
      return defaultClass;
    },
    getSignoDosClass(signo) {
      let defaultClass = 'signo-item';
      if (signo === this.signoDos) {
        defaultClass += ' signo-seleccionado';
      }
      return defaultClass;
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

.box-signos {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
  padding: 10px;
  background-color: #444654;
  border-radius: 5px;
  margin-bottom: 30px;
}

.fila-signos {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.label-input {
  text-align: center;
  font-weight: 700;
  font-size: 13px;
  margin-top: 20px;
}

.signo-item {
  padding: 5px;
  cursor: pointer;
}

.signo-item img {
  width: 50px;
}

.signo-seleccionado {
  background-image: url('../assets/img/signo-seleccionado.png');
  background-position: center;
  background-size: cover;
}

.error-log {
  max-width: 250px;
  margin: 5px auto;
  line-height: 20px;
  color: #ff7575;
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

.signos-resultado {
  display: block;
  max-width: 300px;
  margin: 0 auto;
  margin-bottom: 10px;
  text-align: center;
  font-size: 20px;
  background-color: #444654;
  border-radius: 5px;
  margin-bottom: 30px;
  padding: 10px;
}

.porcentaje-signos {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  font-size: 50px;
  font-weight: 700;
}
</style>
