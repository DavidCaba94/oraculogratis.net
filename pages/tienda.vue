<template>
  <div>
    <Menu/>
    <h1>Tienda</h1>
    <p class="texto">Consigues un punto por cada uso que haces de cualquiera de nuestros oráculos. Estos puntos los puedes canjear por lo que quieras de la siguiente lista</p>
    <div v-if="!userLogged" class="box-no-logged-tienda">
      <p>Inicia sesión para ver la lista de productos que puedes canjear con tus puntos</p>
      <NuxtLink to="/usuario">
        <div class="btn-login">Iniciar sesión</div>
      </NuxtLink>
    </div>
    <div class="box-productos" v-if="userLogged">
      <div class="box-puntos-tienda">
        <img src="../assets/img/coin.png" alt="Puntos" class="moneda">
        <div class="puntos-totales">{{puntos}}</div>
      </div>
      <div class="product-card">
        <p>Lectura personailzada de tu signo del zodiaco enviada individualmente por email</p>
        <NuxtLink to="/productos/lectura-zodiaco">
          <div class="btn-compra">
            <img src="../assets/img/coin.png" alt="Puntos" class="moneda">
            200
          </div>
        </NuxtLink>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import puntosService from '../assets/js/puntos.js';

export default {
  name: 'Tienda',
  head: {
    title: 'Tienda - Oráculo Gratis',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Consigues un punto por cada uso que haces de cualquiera de nuestros oráculos. Estos puntos los puedes canjear por lo que quieras de la siguiente lista'
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
      puntos: 0
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
      this.getPuntos();
    },
    async getPuntos() {
      this.puntos = await puntosService.getPointsByUserId(this.userData.id);
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

.texto {
  max-width: 600px;
  margin: 0 auto;
  font-size: 13px;
  line-height: 1.5;
  color: #ededed;
  padding: 10px;
  text-align: justify;
}

p {
  text-align: center;
}

.btn-login {
  padding: 7px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  text-align: center;
}

.box-no-logged-tienda {
  max-width: 500px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  background-color: #444654;
  text-align: center;
}

.box-productos {
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
}

.box-puntos-tienda {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: nowrap;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.moneda {
  width: 25px;
  height: 25px;
  margin-right: 5px;
}

.product-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
  padding: 10px;
  background-color: #444654;
  border-radius: 5px;
  font-size: 14px;
}

.product-card p {
  margin: 0;
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
}

.btn-compra {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  min-width: 60px;
  max-width: 60px;
  padding: 7px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  cursor: pointer;
}

.btn-compra img {
  width: 20px;
  height: 20px;
}
</style>
