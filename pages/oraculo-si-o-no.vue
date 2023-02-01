<template>
  <div>
    <Menu/>
    <h1>Oráculo si o no</h1>
    <p class="subtitulo">Bienvenido al oráculo del si o no gratis más fiable de internet. Haz tus preguntas y el oráculo del si o no te responderá con total precisión. Puedes hacer todas las preguntas que quieras de manera totalmente gratuita.</p>
    <div class="box-oraculo">
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
    </div>
    <div v-if="!userLogged" class="box-no-logged">
      <p>Inicia sesión para ver el historial de tus preguntas</p>
      <NuxtLink to="/usuario">
        <div class="btn-oraculo">Iniciar sesión</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import sinoService from '../assets/js/sino.js';

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
        content: 'Bienvenido al oráculo del si o no gratis más fiable de internet. Haz tus preguntas y el oráculo del si o no te responderá con total precisión. Puedes hacer todas las preguntas que quieras de manera totalmente gratuita.'
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
      responsesList: []
    }
  },
  mounted () {
    if (localStorage.getItem('user')) {
      this.userLogged = true;
      this.getUserData();
    }
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
    }
  }
}
</script>

<style>
body {
  margin: 0;
  background-color: #2c2c32;
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

.subtitulo {
  max-width: 600px;
  margin: 0 auto;
  font-size: 13px;
  line-height: 1.5;
  color: #a9a9a9;
  padding: 10px;
  text-align: justify;
}

.box-oraculo {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  background-color: #3e3e48;
  text-align: center;
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
  margin-top: 10px;
  margin-bottom: 10px;
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
  background-color: #3e3e48;
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
  background-color: #3e3e48;
  border-radius: 5px;
  text-align: center;
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
