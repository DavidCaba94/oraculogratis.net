<template>
  <div>
    <Menu/>
    <div class="login-container">
      <h1>Regístrate</h1>
      <div class="box-login">
        <h4>REGISTRO</h4>
        <p class="login-text">Regístrate para acceder a todas tus estadísticas</p>
        <p class="login-label">Email</p>
        <input type="email" class="input-login" v-model="user.email">
        <p class="login-label">Contraseña</p>
        <input type="password" class="input-login"  v-model="user.pass">
        <p class="login-label">Repite la contraseña</p>
        <input type="password" class="input-login"  v-model="user.pass2">
        <p class="login-label">Nombre</p>
        <input type="text" class="input-login" v-model="user.nombre">
        <p class="login-label">Apellidos</p>
        <input type="text" class="input-login" v-model="user.apellidos">
        <p class="login-label">Signo</p>
        <select name="select" class="select-login" v-model="user.signo">
          <option value="Acuario" selected>Acuario</option>
          <option value="Aries">Aries</option>
          <option value="Cáncer">Cáncer</option>
          <option value="Capricornio">Capricornio</option>
          <option value="Escorpio">Escorpio</option>
          <option value="Géminis">Géminis</option>
          <option value="Leo">Leo</option>
          <option value="Libra">Libra</option>
          <option value="Piscis">Piscis</option>
          <option value="Sagitario">Sagitario</option>
          <option value="Tauro">Tauro</option>
          <option value="Virgo">Virgo</option>
        </select>
        <p class="politica-privacidad">Al registrarte aceptas nuestra <NuxtLink to="/politica-de-privacidad">política de privacidad</NuxtLink></p>
        <div class="btn-login" @click="registrarUsuario()" v-if="!loading">Registrarme</div>
        <div class="lds-ellipsis" v-if="loading"><div></div><div></div><div></div><div></div></div>
        <div class="error-log" v-if="errorLog !== null">{{ errorLog }}</div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import userService from '../assets/js/usuario.js';
import statsService from '../assets/js/stats.js';
import puntosService from '../assets/js/puntos.js';

export default {
  name: 'Registro',
  head: {
    title: 'Registro - Oráculo Gratis',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Regístrate para descubrir tus estadísticas sobre el uso de oraculogratis.net.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
  },
  data() {
    return {
      user: {
        email: null,
        pass: null,
        pass2: null,
        nombre: null,
        apellidos: null,
        signo: null
      },
      loading: false,
      errorLog: null
    }
  },
  methods: {
    async registrarUsuario() {
      this.errorLog = null;
      this.loading = true;
      if (await this.correoValido()) {
        if (this.user.email !== null && this.user.pass !== null && this.user.pass2 !== null && this.user.nombre !== null && this.user.apellidos !== null &&this.user.signo !== null) {
          if (this.user.pass === this.user.pass2) {
            let success = await userService.registrarUsuario(this.user);
            if (success) {
              this.registrarStats();
              this.$router.push({path: '/bienvenido'});
            }
          } else {
            this.errorLog = 'Las contraseñas no coinciden'
          }
        } else {
          this.errorLog = 'Todos los campos son obligatorios'
        }
      } else {
        this.errorLog = 'El correo introducido ya existe'
      }
      this.loading = false;
    },
    async correoValido() {
      let correoDisponible = true;
      let user = await userService.getUserByEmail(this.user);
      if (user !== null) {
        correoDisponible = false;
      }
      return correoDisponible;
    },
    async registrarStats() {
      let userId = await userService.getLastUser();
      await statsService.registrarStatsByUser(parseInt(userId));
      await puntosService.createPointsByUser(userId);
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

.login-container {
  max-width: 900px;
  margin: 0 auto;
  margin-top: 30px;
  text-align: center;
  padding: 10px;
}

.box-login {
  max-width: 300px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  background-color: #444654;
}

.login-text {
  max-width: 250px;
  margin: 5px auto;
  line-height: 20px;
}

.login-label {
  text-align: left;
  font-size: 12px;
  padding-left: 20px;
  margin: 0;
}

.input-login {
  width: 250px;
  border: 0px solid white;
  border-bottom: 1px solid #ffffff;
  background-color: transparent;
  padding: 7px;
  margin-bottom: 20px;
  color: #ffffff;
  outline: none;
}

.select-login {
  width: 265px;
  border: 0px solid white;
  border-bottom: 1px solid #ffffff;
  background-color: transparent;
  padding: 7px;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #ffffff;
  outline: none;
}

option {
  color: #343541;
}

.btn-login {
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

.politica-privacidad {
  font-size: 11px;
}

.politica-privacidad a {
  text-decoration: underline;
}

@media (max-width: 950px) {
  .login-container {
    margin-top: 0px;
  }
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
