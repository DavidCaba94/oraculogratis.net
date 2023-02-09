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
      <div class="box-grafica">
        <p class="titulo-grafica">Este es el uso que has hecho de todos los oráculos</p>
        <div class="box-bars">
          <div class="bar-column">
            <div class="grafica-sino" :style="{ height: `${chartData.sino * 2}px` }"></div>
          </div>
          <div class="bar-column">
            <div class="grafica-amor" :style="{ height: `${chartData.amor * 2}px` }"></div>
          </div>
          <div class="bar-column">
            <div class="grafica-nombres" :style="{ height: `${chartData.nombres * 2}px` }"></div>
          </div>
          <div class="bar-column">
            <div class="grafica-signos" :style="{ height: `${chartData.signos * 2}px` }"></div>
          </div>
          <div class="bar-column">
            <div class="grafica-cartas" :style="{ height: `${chartData.cartas * 2}px` }"></div>
          </div>
        </div>
        <div class="box-names">
          <div class="bar-column">
            <div class="numero-bar">{{statsData.sino}}</div>
            <div class="texto-bar">Si o no</div>
          </div>
          <div class="bar-column">
            <div class="numero-bar">{{statsData.amor}}</div>
            <div class="texto-bar">Amor</div>
          </div>
          <div class="bar-column">
            <div class="numero-bar">{{statsData.nombres}}</div>
            <div class="texto-bar">Nombres</div>
          </div>
          <div class="bar-column">
            <div class="numero-bar">{{statsData.signos}}</div>
            <div class="texto-bar">Signos</div>
          </div>
          <div class="bar-column">
            <div class="numero-bar">{{statsData.cartas}}</div>
            <div class="texto-bar">Cartas</div>
          </div>
        </div>
        <div class="box-puntos">
          <img src="../assets/img/coin.png" alt="Puntos" class="moneda">
          <div class="puntos-totales">{{puntos}}</div>
        </div>
        <NuxtLink to="/tienda">
          <div class="link-tienda">
            <img src="_nuxt/assets/img/cart.png" alt="Tienda">
            Canjea aquí tus puntos
          </div>
        </NuxtLink>
      </div>
      <div class="box-login">
        <p class="data-title">Tus datos</p>
        <p class="login-label">Nombre</p>
        <input type="text" class="input-login" v-model="userData.nombre">
        <p class="login-label">Apellidos</p>
        <input type="text" class="input-login" v-model="userData.apellidos">
        <p class="login-label">Email</p>
        <input type="email" class="input-login" v-model="userData.email">
        <p class="login-label">Signo</p>
        <select name="select" class="select-login" v-model="userData.signo">
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
        <div class="btn-login" @click="updateUser()">Actualizar</div>
        <p class="success-log" v-if="successData">Datos actualizados correctamente</p>
        <div class="error-log" v-if="errorData">Todos los campos son obligatorios</div>
      </div>
      <div class="box-login">
        <p class="data-title">Cambiar contraseña</p>
        <p class="login-label">Nueva contraseña</p>
        <input type="password" class="input-login" v-model="newPass">
        <div class="btn-login" @click="changePassword()">Actualizar</div>
        <p class="success-log" v-if="successPass">Contraseña actualizada correctamente</p>
        <div class="error-log" v-if="errorPass">Todos los campos son obligatorios</div>
      </div>
      <div class="btn-logout" @click="cerrarSesion()">Cerrar Sesión</div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import userService from '../assets/js/usuario.js';
import statsService from '../assets/js/stats.js';
import puntosService from '../assets/js/puntos.js';

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
      },
      statsData: {
        sino: 0,
        amor: 0,
        nombres: 0,
        signos: 0,
        cartas: 0
      },
      chartData: {
        sino: 0,
        amor: 0,
        nombres: 0,
        signos: 0,
        cartas: 0
      },
      newPass: null,
      successPass: false,
      errorPass: false,
      successData: false,
      errorData: false,
      puntos: 0
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
      this.getStatsData();
    },
    async getStatsData() {
      let stats = await statsService.getAllStatsByUserId(this.userData.id);
      this.$set(this.statsData, 'sino', stats.sino);
      this.$set(this.statsData, 'amor', stats.amor);
      this.$set(this.statsData, 'nombres', stats.nombres);
      this.$set(this.statsData, 'signos', stats.signos);
      this.$set(this.statsData, 'cartas', stats.cartas);
      this.setChartValues();
      this.getPuntos();
    },
    setChartValues() {
      let sum = parseInt(this.statsData.sino) + parseInt(this.statsData.amor) + parseInt(this.statsData.nombres) + parseInt(this.statsData.signos) + parseInt(this.statsData.cartas);
      this.chartData.sino = 100 * this.statsData.sino / sum;
      this.chartData.amor = 100 * this.statsData.amor / sum;
      this.chartData.nombres = 100 * this.statsData.nombres / sum;
      this.chartData.signos = 100 * this.statsData.signos / sum;
      this.chartData.cartas = 100 * this.statsData.cartas / sum;
    },
    async getPuntos() {
      this.puntos = await puntosService.getPointsByUserId(this.userData.id);
    },
    async changePassword() {
      this.successPass = false;
      this.errorPass = false;
      if (this.newPass) {
        let success = await userService.updatePassUsuario(this.userData.id, this.newPass);
        if (success) {
          this.successPass = true;
        }
      } else {
        this.errorPass = true;
      }
    },
    async updateUser() {
      this.successData = false;
      this.errorData = false;
      if (this.userData.nombre && this.userData.apellidos && this.userData.email && this.userData.signo) {
        let success = await userService.updateDataUsuario(this.userData);
        if (success) {
          this.successData = true;
        }
      } else {
        this.errorData = true;
      }
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
  text-align: center;
}

.login-text {
  max-width: 250px;
  margin: 5px auto;
  line-height: 20px;
}

.data-title {
  max-width: 250px;
  margin: 5px auto;
  line-height: 20px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 20px;
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
  text-align: center;
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

.box-grafica {
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  padding: 10px;
}

.box-bars {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: nowrap;
  height: 230px;
  border-bottom: 1px solid #ffffff;
  background-color: #444654;
}

.box-names {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: nowrap;
  height: 45px;
}

.bar-column {
  width: 20%;
}

.grafica-sino {
  width: 60%;
  margin: 0 auto;
  background-color: #665add;
  padding: 1px;
  border-radius: 5px 5px 0px 0px;
}

.grafica-amor {
  width: 60%;
  margin: 0 auto;
  background-color: #4d8ede;
  padding: 1px;
  border-radius: 5px 5px 0px 0px;
}

.grafica-nombres {
  width: 60%;
  margin: 0 auto;
  background-color: #28d9dc;
  padding: 1px;
  border-radius: 5px 5px 0px 0px;
}

.grafica-signos {
  width: 60%;
  margin: 0 auto;
  background-color: #30e1bf;
  padding: 1px;
  border-radius: 5px 5px 0px 0px;
}

.grafica-cartas {
  width: 60%;
  margin: 0 auto;
  background-color: #35e6ab;
  padding: 1px;
  border-radius: 5px 5px 0px 0px;
}

.numero-bar {
  text-align: center;
  font-weight: 700;
}

.texto-bar {
  text-align: center;
  font-size: 12px;
  font-weight: 300;
  margin-top: 5px;
}

.titulo-grafica {
  text-align: center;
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

.success-log {
  text-align: center;
  color: #28dc73;
}

.box-puntos {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: 300px;
  margin: 0 auto;
  margin-top: 20px;
}

.moneda {
  width: 25px;
  height: 25px;
  margin-right: 5px;
}

.link-tienda {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: 200px;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
  padding: 7px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  cursor: pointer;
  font-size: 13px;
}

.link-tienda img {
  width: 25px;
  margin-right: 10px;
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
