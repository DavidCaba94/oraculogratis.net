<template>
  <div>
    <Menu/>
    <h1>Oráculo de cartas</h1>
    <p class="texto">El oráculo de cartas responderá <strong>de forma gratuita y fiable</strong> a tu pregunta en función de las cartas que elijas. La forma de preguntar es muy <strong>sencilla</strong>, solo tienes que escribir tu pregunta, elegir 3 cartas y leer la respuesta del oráculo.</p>
    <p class="label-input">ESCRIBE TU PREGUNTA</p>
    <div class="box-pregunta">
      <input type="text" class="input-oraculo" v-model="pregunta" placeholder="Escribe aquí tu pregunta">
      <div class="error-log" v-if="errorLog">Es obligatorio hacer una pregunta</div>
    </div>
    <p class="label-input">ESCOGE 3 CARTAS</p>
    <div class="box-cartas">
      <div class="carta"></div>
      <div class="carta"></div>
      <div class="carta"></div>
      <div class="carta"></div>
      <div class="carta"></div>
      <div class="carta"></div>
      <div class="carta"></div>
      <div class="carta"></div>
      <div class="carta"></div>
      <div class="carta"></div>
      <div class="carta"></div>
      <div class="carta"></div>
      <div class="carta"></div>
      <div class="carta"></div>
    </div>
    <Footer/>
  </div>
</template>

<script>
export default {
  name: 'OraculoCartas',
  head: {
    title: 'Oráculo de Cartas - Oráculo Gratis',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'El oráculo de cartas gratis más fiable de internet.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
  },
  data() {
    return{
      pregunta: null,
      errorLog: false,
      userData: {
        id: null,
        nombre: null,
        apellidos: null,
        email: null,
        pass: null,
        signo: null
      }
    }
  },
  mounted () {
    if (localStorage.getItem('user')) {
      this.userLogged = true;
      this.getUserData();
    }
  },
  methods:{
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
        //this.responsesList = await sinoService.getAllResponsesByUserId(this.userData.id);
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

.texto {
  max-width: 600px;
  margin: 0 auto;
  font-size: 13px;
  line-height: 1.5;
  color: #ededed;
  padding: 10px;
  text-align: justify;
}

.box-pregunta {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
  padding: 10px;
  background-color: #444654;
  border-radius: 5px;
}

.box-cartas {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
  padding: 10px;
  background-color: #444654;
  border-radius: 5px;
}

.carta {
  width: 20%;
  height: 100px;
  background-image: url('../assets/img/card-reverse.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 5px;
  cursor: pointer;
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

.error-log {
  max-width: 250px;
  margin: 5px auto;
  line-height: 20px;
  color: #ff7575;
}

@media (min-width: 450px) {
  .carta {
    height: 140px;
  }
}

@media (min-width: 620px) {
  .carta {
    height: 160px;
  }
}
</style>
