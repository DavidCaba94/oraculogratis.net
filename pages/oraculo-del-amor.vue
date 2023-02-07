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
    <div class="nombres-resultado" v-if="nombreUno && nombreDos && mostrarNombres">{{nombreUno}} & {{nombreDos}}</div>
    <div class="box-resultados">
      <div class="label-bar">Comunicación</div>
      <div class="bar-container">
        <div class="bar comunicacion-color" :style="{ width: `${paramsCalculo.comunicacion !== 0 ? paramsCalculo.comunicacion * 2.6 : 2}px` }"></div>
        <div class="porcentaje">{{paramsCalculo.comunicacion}}%</div>
      </div>
      <div class="label-bar">Pareja</div>
      <div class="bar-container">
        <div class="bar pareja-color" :style="{ width: `${paramsCalculo.pareja !== 0 ? paramsCalculo.pareja * 2.6 : 2}px` }"></div>
        <div class="porcentaje">{{paramsCalculo.pareja}}%</div>
      </div>
      <div class="label-bar">Amor</div>
      <div class="bar-container">
        <div class="bar amor-color" :style="{ width: `${paramsCalculo.amor !== 0 ? paramsCalculo.amor * 2.6 : 2}px` }"></div>
        <div class="porcentaje">{{paramsCalculo.amor}}%</div>
      </div>
      <div class="label-bar">Amistad</div>
      <div class="bar-container">
        <div class="bar amistad-color" :style="{ width: `${paramsCalculo.amistad !== 0 ? paramsCalculo.amistad * 2.6 : 2}px` }"></div>
        <div class="porcentaje">{{paramsCalculo.amistad}}%</div>
      </div>
      <div class="label-bar">Sexo</div>
      <div class="bar-container">
        <div class="bar sexo-color" :style="{ width: `${paramsCalculo.sexo !== 0 ? paramsCalculo.sexo * 2.6 : 2}px` }"></div>
        <div class="porcentaje">{{paramsCalculo.sexo}}%</div>
      </div>
    </div>
    <h2>Historia del oráculo del amor</h2>
    <p class="texto">No existe una historia universal y verificable sobre el origen del "Oráculo del Amor", pero <strong>es probable que haya surgido como una forma de ayudar a las parejas</strong> a mejorar su comunicación y fortalecer su relación a través de preguntas y conversaciones en torno al <strong>amor, la amistad y el sexo</strong>. Esta herramienta se ha vuelto popular en el mundo de la <strong>terapia de pareja</strong> y el <strong>coaching de relaciones</strong>, y ha sido utilizada por terapeutas y coaches para guiar a las parejas en el proceso de mejorar su comunicación y <strong>resolver problemas</strong> en su relación. Sin embargo, no hay una verificación histórica específica sobre su origen y evolución.</p>
    <h2>¿Cómo funciona?</h2>
    <p class="texto">El Oráculo del Amor funciona como un juego o un cuestionario que ayuda a las parejas a mejorar su comunicación y fortalecer su relación. Está compuesto por <strong>preguntas o afirmaciones sobre temas relacionados con el amor, la amistad y el sexo</strong>, y se juega entre la pareja. Cada pregunta o afirmación es seguida por una serie de <strong>respuestas que la pareja puede elegir</strong>, y estas respuestas pueden ayudar a guiar la conversación y a identificar áreas en las que la pareja puede mejorar. El objetivo es <strong>fomentar un diálogo abierto y sincero entre la pareja</strong>, lo que puede ayudar a aumentar la intimidad y el amor entre ellos. Es importante recordar que el Oráculo del Amor no es una solución mágica para resolver problemas en una relación, sino más bien una <strong>herramienta</strong> que puede ayudar a la pareja a tener conversaciones más profundas y significativas.</p>
    <h2>Oráculos del amor famosos</h2>
    <p class="texto">Los oráculos del amor han sido consultados a lo largo de la historia para <strong>predecir el futuro en el amor</strong> y tomar decisiones importantes relacionadas con las relaciones. Algunos de los oráculos del amor más famosos incluyen:</p>
    <p class="texto texto-item"><strong><u>La Baraja Española:</u></strong> La Baraja Española es un oráculo de amor que se basa en el uso de un <strong>juego de cartas para predecir el futuro en el amor</strong>. La interpretación de las cartas y su posición puede brindar información sobre el amor actual y futuro, así como sobre la personalidad y las intenciones de la pareja.</p>
    <p class="texto texto-item"><strong><u>El Tarot del Amor:</u></strong> El Tarot del Amor es una <strong>versión especializada del Tarot</strong> que se utiliza para predecir el futuro en el amor y las relaciones. Se utilizan cartas específicas para <strong>predecir el éxito y la duración de una relación</strong>, así como para identificar posibles obstáculos y desafíos.</p>
    <p class="texto texto-item"><strong><u>El Oráculo de las Flores:</u></strong> El Oráculo de las Flores es un antiguo oráculo de amor que se basa en la <strong>selección de flores para predecir el futuro en el amor</strong>. Cada flor tiene un significado específico y, dependiendo de la combinación de flores elegidas, se puede predecir el futuro en el amor.</p>
    <p class="texto texto-item"><strong><u>La Runa del Amor:</u></strong> La Runa del Amor es un oráculo de amor basado en el <strong>uso de runas</strong>, antiguos símbolos germánicos utilizados para predecir el futuro. <strong>Cada runa tiene un significado específico</strong> y se utiliza para predecir el éxito y la duración de una relación, así como para identificar posibles obstáculos y desafíos.</p>
    <p class="texto">Estos son solo algunos de los muchos <strong>oráculos del amor famosos</strong> que han dejado su huella en la historia. Aunque la veracidad de sus predicciones es objeto de debate, muchos siguen siendo populares y utilizados en la actualidad para ayudar a las personas a tomar decisiones importantes sobre el amor y las relaciones.</p>
    <Footer/>
  </div>
</template>

<script>
import amorService from '../assets/js/amor.js';
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
      loadingCalculo: false,
      paramsCalculo: {
        comunicacion: 0,
        pareja: 0,
        amor: 0,
        amistad: 0,
        sexo: 0
      },
      mostrarNombres: false
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
      this.errorLog = false;
      this.mostrarNombres = false;
      this.loadingCalculo = true;
      if (this.nombreUno && this.nombreDos) {
        let nombresData = await amorService.getAllParamsByNames(this.nombreUno, this.nombreDos);
        if (nombresData.length === 0) {
          this.$set(this.paramsCalculo, 'comunicacion', Math.ceil(Math.random()*100));
          this.$set(this.paramsCalculo, 'pareja', Math.ceil(Math.random()*100));
          this.$set(this.paramsCalculo, 'amor', Math.ceil(Math.random()*100));
          this.$set(this.paramsCalculo, 'amistad', Math.ceil(Math.random()*100));
          this.$set(this.paramsCalculo, 'sexo', Math.ceil(Math.random()*100));
          await amorService.createNewParamByUser(this.userData.id ? this.userData.id : 0, this.nombreUno, this.nombreDos, this.paramsCalculo);
        } else {
          this.$set(this.paramsCalculo, 'comunicacion', nombresData[0].comunicacion);
          this.$set(this.paramsCalculo, 'pareja', nombresData[0].pareja);
          this.$set(this.paramsCalculo, 'amor', nombresData[0].amor);
          this.$set(this.paramsCalculo, 'amistad', nombresData[0].amistad);
          this.$set(this.paramsCalculo, 'sexo', nombresData[0].sexo);
        }
        if (this.userLogged) {
          await statsService.setAmorUse(this.userData.id);
        }
        this.mostrarNombres = true;
      } else {
        this.errorLog = true;
      }
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

h2 {
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

.texto-item {
  padding-left: 20px;
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

.nombres-resultado {
  max-width: 300px;
  margin: 0 auto;
  margin-bottom: 10px;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
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
