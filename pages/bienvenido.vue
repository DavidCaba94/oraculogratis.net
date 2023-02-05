<template>
  <div>
    <Menu/>
    <h1>¡Bienvenido!</h1>
    <p>¡Gracias por registrarte! Ahora podrás disfrutar de todas las funcionalidades de nuestros oráculos de forma gratuita.</p>
    <p>Con tu cuenta podrás acceder a todas tus estadísticas de uso de los oráculos.</p>
    <p>¡Ahora inicia sesión con tu cuenta!</p>
    <NuxtLink to="/usuario">
      <div class="btn-login">Iniciar sesión</div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'Bienvenido',
  head: {
    title: 'Bienvenido - Oráculo Gratis',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '¡Bienvenido! ¡Gracias por registrarte! Ahora podrás disfrutar de todas las funcionalidades de nuestros oráculos de forma gratuita. Con tu cuenta podrás acceder a todas tus estadísticas de uso de los oráculos. ¡Ahora inicia sesión con tu cuenta!'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
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
</style>
