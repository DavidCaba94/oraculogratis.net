<template>
  <div class="main-container">
    <Menu/>
    <h1>Oráculo Gratis</h1>
    <p class="texto">Descubre las respuestas que estás buscando sobre tu vida, amor y futuro. Con nuestros oráculos online gratuitos, obtendrás una visión profunda y precisa sobre cualquier aspecto que te preocupe. ¡Prueba ahora nuestros oráculos y empieza a explorar el poder de la sabiduría!</p>
    <div class="card-index">
      <h2>Oráculo si o no</h2>
      <p class="texto">¿Tienes una pregunta que requiere una respuesta clara y concisa? ¿Quieres conocer la verdad sobre algo que te preocupa? Entonces, nuestro Oráculo Sí o No es perfecto para ti. Con una rápida consulta, obtendrás una respuesta definitiva y precisa que te ayudará a tomar una decisión informada.</p>
      <NuxtLink to="/oraculo-si-o-no">
      <div class="btn-link sino">Probar</div>
      </NuxtLink>
    </div>
    <div class="card-index">
      <h2>Oráculo de cartas</h2>
      <p class="texto">¿Estás buscando una perspectiva más profunda sobre tu vida y tu futuro? ¿Quieres conocer las respuestas que te brinda el universo? Entonces, nuestro Oráculo de Cartas es justo lo que necesitas. Con una consulta, descubrirás las claves de tu futuro y encontrarás las respuestas que estás buscando para tomar decisiones informadas y vivir una vida plena y satisfactoria.</p>
      <NuxtLink to="/oraculo-de-cartas">
      <div class="btn-link cartas">Probar</div>
      </NuxtLink>
    </div>
    <div class="card-index">
      <h2>Oráculo del amor</h2>
      <p class="texto">¿Estás buscando respuestas sobre el amor y las relaciones? ¿Quieres conocer tu futuro sentimental? Entonces, nuestro Oráculo del Amor es justo lo que necesitas. Con una consulta, descubrirás los secretos del amor y encontrarás las respuestas que estás buscando para tener una relación feliz y satisfactoria.</p>
      <NuxtLink to="/oraculo-del-amor">
      <div class="btn-link amor">Probar</div>
      </NuxtLink>
    </div>
    <div class="card-index">
      <h2>Oráculo de nombres</h2>
      <p class="texto">¿Estás buscando el nombre perfecto para tu bebé o un nuevo proyecto? ¿Quieres saber qué nombres tienen un significado especial para ti? Entonces, nuestro Oráculo de Nombres es justo lo que necesitas. Con una consulta, descubrirás los nombres que tienen un significado profundo y especial para ti y encontrarás el nombre perfecto que se ajuste a tus necesidades.</p>
      <NuxtLink to="/oraculo-de-nombres">
      <div class="btn-link nombres">Probar</div>
      </NuxtLink>
    </div>
    <div class="card-index">
      <h2>Oráculo de signos</h2>
      <p class="texto">¿Estás buscando comprender mejor tu personalidad y tu camino en la vida? ¿Quieres conocer tus fortalezas y debilidades? Entonces, nuestro Oráculo de Signos es justo lo que necesitas. Con una consulta, descubrirás las claves de tu personalidad y encontrarás las respuestas que estás buscando para tener una vida más plena y satisfactoria.</p>
      <NuxtLink to="/oraculo-de-signos">
      <div class="btn-link signos">Probar</div>
      </NuxtLink>
    </div>
    <Footer/>
  </div>
</template>

<script>
export default {
  name: 'Index',
  head: {
    title: 'Oráculo Gratis',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'El oráculo gratis más fiable de internet.'
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

.card-index {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
  padding: 10px;
  background-color: #444654;
  border-radius: 5px;
  margin-bottom: 30px;
}

.btn-link {
  width: 120px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 7px;
  border-radius: 2px;
  cursor: pointer;
}

.btn-link.sino {
  border: 1px solid #665add;
}

.btn-link.cartas {
  border: 1px solid #4d8ede;
}

.btn-link.amor {
  border: 1px solid #28d9dc;
}

.btn-link.nombres {
  border: 1px solid #30e1bf;
}

.btn-link.signos {
  border: 1px solid #35e6ab;
}
</style>
