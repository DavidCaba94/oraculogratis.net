<template>
  <div>
    <Menu/>
    <div class="login-container" v-if="!userLogged">
      <h1>Iniciar sesión</h1>
      <div class="box-login">
        <h4>LOGIN</h4>
        <p class="login-text">Inicia sesión para acceder a todas tus estadísticas</p>
        <p class="login-label">Email</p>
        <input type="email" class="input-login">
        <p class="login-label">Contraseña</p>
        <input type="password" class="input-login">
        <div class="btn-login">Iniciar sesión</div>
      </div>
      <p class="login-text">¿Aún no tienes cuenta? Registrate pulsando en registrarse</p>
      <NuxtLink to="/registro">
        <div class="btn-login">Registrarse</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
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
      userLogged: false
    }
  },
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

@media (max-width: 950px) {
  .login-container {
    margin-top: 0px;
  }
}
</style>
