<template>
  <div>
    <Menu/>
    <div class="login-container" v-if="!userLogged">
      <h1>Iniciar sesión</h1>
      <div class="box-login">
        <h4>LOGIN</h4>
        <p class="login-text">Inicia sesión para acceder a todas tus estadísticas</p>
        <p class="login-label">Email</p>
        <input type="email" class="input-login" v-model="loginForm.email">
        <p class="login-label">Contraseña</p>
        <input type="password" class="input-login" v-model="loginForm.pass">
        <div class="btn-login" v-if="!loading" @click="login()">Iniciar sesión</div>
        <div class="lds-ellipsis" v-if="loading"><div></div><div></div><div></div><div></div></div>
        <div class="error-log" v-if="errorLog !== null">{{ errorLog }}</div>
      </div>
      <p class="login-text">¿Aún no tienes cuenta? Registrate pulsando en registrarse</p>
      <NuxtLink to="/registro">
        <div class="btn-login">Registrarse</div>
      </NuxtLink>
    </div>
    <div v-if="userLogged">
      <p class="user-name">{{userData.nombre}} {{userData.apellidos}}</p>
      <div class="btn-logout" @click="cerrarSesion()">Cerrar Sesión</div>
    </div>
  </div>
</template>

<script>
import userService from '../assets/js/usuario.js';

export default {
  name: 'Usuario',
  head: {
    title: 'Usuario - Oráculo Gratis',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Descubre tus estadísticas sobre el uso de oraculogratis.net.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
  },
  data() {
    return {
      userLogged: false,
      loading: false,
      errorLog: null,
      loginForm: {
        email: null,
        pass: null
      },
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
  mounted() {
    if (localStorage.getItem('user')) {
      this.userLogged = true;
      this.getUserData();
    }
  },
  methods: {
    async login() {
      this.errorLog = null;
      this.loading = true;
      if (this.loginForm.email !== null && this.loginForm.pass !== null) {
        let user = await userService.getUserByLogin(this.loginForm);
        if (user !== null) {
          localStorage.setItem('user', JSON.stringify(user));
          this.$router.push({path: '/'});
        } else {
          this.errorLog = 'El usuario o la contraseña son incorrectos'
        }
      } else {
        this.errorLog = 'Ambos campos son obligatorios'
      }
      this.loading = false;
    },
    getUserData() {
      this.$set(this.userData, 'id', JSON.parse(localStorage.getItem('user')).id);
      this.$set(this.userData, 'nombre', JSON.parse(localStorage.getItem('user')).nombre);
      this.$set(this.userData, 'apellidos', JSON.parse(localStorage.getItem('user')).apellidos);
      this.$set(this.userData, 'email', JSON.parse(localStorage.getItem('user')).email);
      this.$set(this.userData, 'pass', JSON.parse(localStorage.getItem('user')).pass);
      this.$set(this.userData, 'signo', JSON.parse(localStorage.getItem('user')).signo);
    },
    cerrarSesion() {
      localStorage.removeItem('user');
      this.$router.push({path: '/'});
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
  background-color: #3e3e48;
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

.btn-logout {
  width: 120px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 7px;
  border-radius: 5px;
  text-align: center;
  background-color: #ff5959;
  color: #ffffff;
  cursor: pointer;
}

.btn-logout:hover {
  background-color: #ff4444;
}

.user-name {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
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
