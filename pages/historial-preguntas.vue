<template>
  <div>
    <Menu/>
    <div class="box-respuestas" v-if="userLogged">
      <h2>Tu historial de preguntas</h2>
      <p>Has hecho {{numRespuestas}} preguntas</p>
      <div class="lds-ellipsis" v-if="loadingRespuestas"><div></div><div></div><div></div><div></div></div>
      <div v-for="resp in responsesList" :key="resp.id" class="respuesta-item">
        <div class="text-pregunta">{{resp.pregunta}}</div>
        <div class="text-respuesta">{{resp.respuesta}}</div>
      </div>
    </div>
    <h2 v-if="!userLogged">No has iniciado sesión</h2>
    <div v-if="!userLogged" class="box-no-logged">
      <p>Inicia sesión para ver el historial de tus preguntas</p>
      <NuxtLink to="/usuario">
        <div class="btn-oraculo">Iniciar sesión</div>
      </NuxtLink>
    </div>
    <Footer/>
  </div>
</template>

<script>
import sinoService from '../assets/js/sino.js';

export default {
  name: 'HistorialPreguntas',
  head: {
    title: 'Historial de Preguntas - Oráculo Gratis',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Historial de todas las preguntas que le has hecho al oráculo del si o no.'
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
      responsesList: [],
      loadingRespuestas: false,
      numRespuestas: 0
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
      this.getUserResponses();
    },
    async getUserResponses() {
      if (this.userLogged) {
        this.loadingRespuestas = true;
        this.responsesList = await sinoService.getAllResponsesHistoryByUserId(this.userData.id);
        this.numRespuestas = this.responsesList.length;
        this.loadingRespuestas = false;
      }
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
