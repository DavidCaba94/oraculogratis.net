<template>
  <div>
    <Menu/>
    <h1>Oráculo de Nombres</h1>
    <p class="texto">Con el Oráculo de Nombres podrás calcular de forma <strong>gratis, inmediata y fiable</strong> el porcentaje de <strong>compatibilidad entre tu pareja y tu</strong>. Es tan simple como escribir tu nombre y el suyo y ver qué resultado te proporciona nuestro oráculo.</p>
    <div class="box-nombres">
      <p class="label-input">TU NOMBRE</p>
      <input type="text" class="input-oraculo" v-model="nombreUno" placeholder="Tu nombre">
      <p class="label-input">SU NOMBRE</p>
      <input type="text" class="input-oraculo" v-model="nombreDos" placeholder="Su nombre">
      <div class="error-log" v-if="errorLog">Es obligatorio poner ambos nombres</div>
      <div class="btn-oraculo" v-if="!loadingNombres" @click="calcularPorcentaje()">Calcular</div>
      <div class="lds-ellipsis" v-if="loadingNombres"><div></div><div></div><div></div><div></div></div>
    </div>
    <div class="nombres-resultado" v-if="nombreUnoMostrar && nombreDosMostrar && mostrarNombres">
      <div>{{nombreUnoMostrar}}</div>
      <div class="porcentaje-nombres">{{porcentaje}}%</div>
      <div>{{nombreDosMostrar}}</div>
    </div>
    <h2>Historia del oráculo de nombres</h2>
    <p class="texto">El oráculo de nombres es un <strong>método antiguo y místico</strong> que se utilizaba para <strong>predecir el futuro o descubrir verdades ocultas</strong>. La historia del oráculo de nombres es muy antigua y se remonta a la <strong>antigua Grecia</strong> y a otras culturas antiguas. En la antigua Grecia, el oráculo de nombres se utilizaba para predecir el futuro y obtener consejos divinos.</p>
    <p class="texto">El proceso consistía en <strong>escribir uno o varios nombres</strong> en un papiro o en un pedazo de papel y luego realizar <strong>cálculos matemáticos o interpretar patrones</strong> en los caracteres escritos para predecir el futuro o descubrir verdades ocultas.</p>
    <p class="texto">A lo largo de los siglos, el oráculo de nombres ha sido utilizado en muchas culturas diferentes, incluidas las <strong>culturas egipcia, celta y medieval</strong>. En la Edad Media, el oráculo de nombres se utilizó como una herramienta de <strong>adivinación en la corte</strong>.</p>
    <p class="texto">En la actualidad, el oráculo de nombres sigue siendo una <strong>práctica popular</strong> en algunos círculos espirituales y místicos, y <strong>también se utiliza en la literatura y en los medios de comunicación</strong> para explorar temas sobrenaturales y misteriosos.</p>
    <h2>¿Cómo funciona?</h2>
    <p class="texto">El oráculo de nombres es una técnica mística que se utiliza para predecir el futuro del amor o descubrir verdades ocultas sobre relaciones amorosas. Así es cómo funciona este oráculo:</p>
    <p class="texto texto-item"><strong><u>Escribir los nombres:</u></strong> Se escriben los nombres de las personas involucradas en la relación amorosa (por ejemplo, el nombre propio y el de la pareja) en un papiro o en un pedazo de papel.</p>
    <p class="texto texto-item"><strong><u>Cálculos matemáticos:</u></strong> Se realizan cálculos matemáticos o se interpretan patrones en los caracteres escritos para predecir el futuro o descubrir verdades ocultas sobre la relación amorosa.</p>
    <p class="texto texto-item"><strong><u>Interpretación de patrones:</u></strong> Se interpretan los patrones en los caracteres escritos para predecir el futuro o descubrir verdades ocultas sobre la relación amorosa.</p>
    <p class="texto texto-item"><strong><u>Predicciones:</u></strong> El oráculo puede predecir el futuro del amor o revelar verdades ocultas sobre la relación, como la duración de la relación, la compatibilidad y posibles desafíos.</p>
    <p class="texto">Es importante tener en cuenta que el oráculo de nombres orientado al amor es una <strong>práctica mística</strong> y que sus resultados no deben ser tomados como verdades absolutas o como sustitutos de consejos profesionales. Es posible que los resultados varíen dependiendo de la persona que realiza la lectura y de la interpretación de los patrones.</p>
    <Footer/>
  </div>
</template>

<script>
import nombresService from '../assets/js/nombres.js';
import statsService from '../assets/js/stats.js';

export default {
  name: 'OraculoNombres',
  head: {
    title: 'Oráculo de Nombres - Oráculo Gratis',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'El oráculo de nombres gratis más fiable de internet.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
  },
  data() {
    return {
      nombreUno: null,
      nombreUnoMostrar: null,
      nombreDos: null,
      nombreDosMostrar: null,
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
      loadingNombres: false,
      porcentaje: 0,
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
    async calcularPorcentaje() {
      this.errorLog = false;
      this.mostrarNombres = false;
      this.loadingCalculo = true;
      if (this.nombreUno && this.nombreDos) {
        let nombresData = await nombresService.getAllNamesByNames(this.nombreUno, this.nombreDos);
        if (nombresData.length === 0) {
          this.porcentaje = Math.ceil(Math.random()*100);
          await nombresService.createNewNamesByUser(this.userData.id ? this.userData.id : 0, this.nombreUno, this.nombreDos, this.porcentaje);
        } else {
          this.porcentaje = nombresData[0].porcentaje;
        }
        if (this.userLogged) {
          await statsService.setNombresUse(this.userData.id);
        }
        this.nombreUnoMostrar = structuredClone(this.nombreUno);
        this.nombreDosMostrar = structuredClone(this.nombreDos);
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

.box-nombres {
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

.nombres-resultado {
  display: block;
  max-width: 300px;
  margin: 0 auto;
  margin-bottom: 10px;
  text-align: center;
  font-size: 20px;
}

.porcentaje-nombres {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../assets/img/heart.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 24px;
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
