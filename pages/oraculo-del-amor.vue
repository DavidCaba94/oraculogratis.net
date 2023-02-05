<template>
  <div>
    <Menu/>
    <h1>Oráculo del amor</h1>
    <p class="texto">Con el <strong>oráculo del amor gratis</strong> más <strong>fiable</strong> de internet podrás conocer lo que os deparará el futuro a tu pareja y a ti. Averigua la <strong>compatibilidad</strong> que tenéis en diferentes aspectos como comunicación, pareja, amor, amistad y sexo simplemente con poner vuestros nombres.</p>
    <div class="box-calculadora">
      <p class="label-input">TU NOMBRE</p>
      <input type="text" class="input-oraculo" v-model="nombreUno" placeholder="Tu nombre">
      <p class="label-input">SU NOMBRE</p>
      <input type="text" class="input-oraculo" v-model="nombreDos" placeholder="Su nombre">
      <div class="error-log" v-if="errorLog">Es obligatorio poner ambos nombres</div>
      <div class="btn-oraculo" v-if="!loadingCalculo" @click="calcular()">Calcular</div>
      <div class="lds-ellipsis" v-if="loadingCalculo"><div></div><div></div><div></div><div></div></div>
    </div>
    <div class="box-resultados">
      <div class="label-bar">Comunicación</div>
      <div class="bar-container">
        <div class="bar comunicacion-color"></div>
        <div class="porcentaje">100%</div>
      </div>
      <div class="label-bar">Pareja</div>
      <div class="bar-container">
        <div class="bar pareja-color"></div>
        <div class="porcentaje">100%</div>
      </div>
      <div class="label-bar">Amor</div>
      <div class="bar-container">
        <div class="bar amor-color"></div>
        <div class="porcentaje">100%</div>
      </div>
      <div class="label-bar">Amistad</div>
      <div class="bar-container">
        <div class="bar amistad-color"></div>
        <div class="porcentaje">100%</div>
      </div>
      <div class="label-bar">Sexo</div>
      <div class="bar-container">
        <div class="bar sexo-color"></div>
        <div class="porcentaje">100%</div>
      </div>
    </div>
    <h2>Historia del oráculo del amor</h2>
    <p class="texto">No existe una historia universal y verificable sobre el origen del "Oráculo del Amor", pero es probable que haya surgido como una forma de ayudar a las parejas a mejorar su comunicación y fortalecer su relación a través de preguntas y conversaciones en torno al amor, la amistad y el sexo. Esta herramienta se ha vuelto popular en el mundo de la terapia de pareja y el coaching de relaciones, y ha sido utilizada por terapeutas y coaches para guiar a las parejas en el proceso de mejorar su comunicación y resolver problemas en su relación. Sin embargo, no hay una verificación histórica específica sobre su origen y evolución.</p>
    <h2>¿Cómo funciona?</h2>
    <p class="texto">El Oráculo del Amor funciona como un juego o un cuestionario que ayuda a las parejas a mejorar su comunicación y fortalecer su relación. Está compuesto por preguntas o afirmaciones sobre temas relacionados con el amor, la amistad y el sexo, y se juega entre la pareja. Cada pregunta o afirmación es seguida por una serie de respuestas que la pareja puede elegir, y estas respuestas pueden ayudar a guiar la conversación y a identificar áreas en las que la pareja puede mejorar. El objetivo es fomentar un diálogo abierto y sincero entre la pareja, lo que puede ayudar a aumentar la intimidad y el amor entre ellos. Es importante recordar que el Oráculo del Amor no es una solución mágica para resolver problemas en una relación, sino más bien una herramienta que puede ayudar a la pareja a tener conversaciones más profundas y significativas.</p>
  </div>
</template>

<script>
// import amorService from '../assets/js/amor.js';
import statsService from '../assets/js/stats.js';

export default {
  name: 'OraculoAmor',
  head: {
    title: 'Oráculo del Amor - Oráculo Gratis',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Con el oráculo del amor gratis más fiable de internet podrás conocer lo que os deparará el futuro a tu pareja y a ti. Averigua la compatibilidad que tenéis en diferentes aspectos como comunicacion, pareja, amor, amistad y sexo simplemente con poner vuestros nombres.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
  },
  data() {
    return {
      nombreUno: null,
      nombreDos: null,
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
      loadingCalculo: false
    }
  },
  mounted () {
    if (localStorage.getItem('user')) {
      this.userLogged = true;
      this.getUserData();
    }
  },
  methods : {
    getUserData() {
      this.$set(this.userData, 'id', JSON.parse(localStorage.getItem('user')).id);
      this.$set(this.userData, 'nombre', JSON.parse(localStorage.getItem('user')).nombre);
      this.$set(this.userData, 'apellidos', JSON.parse(localStorage.getItem('user')).apellidos);
      this.$set(this.userData, 'email', JSON.parse(localStorage.getItem('user')).email);
      this.$set(this.userData, 'pass', JSON.parse(localStorage.getItem('user')).pass);
      this.$set(this.userData, 'signo', JSON.parse(localStorage.getItem('user')).signo);
    },
    async calcular() {
      this.loadingCalculo = true;
      await statsService.setAmorUse(this.userData.id);
      this.loadingCalculo = false;
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

.box-calculadora {
  max-width: 300px;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
  padding: 10px;
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

.error-log {
  max-width: 250px;
  margin: 5px auto;
  line-height: 20px;
  color: #ff7575;
}

.box-resultados {
  max-width: 300px;
  margin: 0 auto;
  margin-bottom: 40px;
  background-color: #444654;
  padding: 10px;
}

.label-bar {
  font-size: 13px;
}

.bar-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin-top: 5px;
  margin-bottom: 5px;
}

.bar {
  width: 200px;
  height: 20px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.porcentaje {
  font-size: 13px;
  margin-left: 5px;
}

.comunicacion-color {
  background-color: #665add;
}

.pareja-color {
  background-color: #4d8ede;
}

.amor-color {
  background-color: #28d9dc;
}

.amistad-color {
  background-color: #30e1bf;
}

.sexo-color {
  background-color: #35e6ab;
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
