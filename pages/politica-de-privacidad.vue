<template>
  <div>
    <Menu/>
    <h1 class="titulo-politica">Política de privacidad de oraculogratis.net</h1>
    <p class="parrafo-politica">Oraculogratis.net respeta la privacidad de los visitantes de nuestro sitio web y se compromete a proteger los datos personales que nos proporcionan. Esta política de privacidad describe cómo recopilamos, utilizamos y compartimos la información personal que recibimos a través de nuestro sitio web.</p>
    <p class="parrafo-politica">Información recopilada: Al visitar oraculogratis.net, recopilamos información automáticamente, incluyendo la dirección IP, el tipo de navegador y el sistema operativo utilizados, así como las páginas web visitadas. Además, cuando los usuarios se suscriben a nuestro boletín informativo, proporcionan voluntariamente su nombre y dirección de correo electrónico.</p>
    <p class="parrafo-politica">Uso de la información: Utilizamos la información recopilada para mejorar la experiencia de usuario en nuestro sitio web y para enviar correos informativos sobre nuestros productos y servicios. No venderemos ni compartiremos su información con terceros a menos que sea necesario para cumplir con las leyes y regulaciones aplicables.</p>
    <p class="parrafo-politica">Cambios a esta política de privacidad: oraculogratis.net se reserva el derecho de modificar esta política de privacidad en cualquier momento. Cualquier cambio en nuestra política de privacidad se publicará en esta página para que los usuarios estén informados.</p>
    <p class="parrafo-politica">Contacto: Si tiene preguntas o inquietudes sobre esta política de privacidad, por favor contáctenos en contacto@oraculogratis.net.</p>
    <p class="parrafo-politica">Aceptación de la política de privacidad: Al utilizar oraculogratis.net, acepta los términos de esta política de privacidad. Si no está de acuerdo con los términos descritos aquí, por favor no proporcione información personal a través de nuestro sitio web.</p>
  </div>
</template>

<script>
export default {
  name: 'Política de privacidad de oraculogratis.net',
  head: {
    title: 'Política de privacidad de oraculogratis.net - Oráculo Gratis',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: ''
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

.titulo-politica {
  padding: 10px;
}

.parrafo-politica {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
  padding: 10px;
  font-size: 15px;
  line-height: 1.3;
}
</style>
