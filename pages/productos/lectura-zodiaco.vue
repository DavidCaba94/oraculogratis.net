<template>
  <div>
    <Menu/>
    <div>Lectura del zodiaco</div>
    <Footer/>
  </div>
</template>

<script>
export default {
  name: 'Lectura del zodiaco',
  head: {
    title: 'Lectura del zodiaco - Oráculo Gratis',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Recibe una lectura del zodiaco en tu email totalmente gratis canjeando tus puntos.'
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
</style>
