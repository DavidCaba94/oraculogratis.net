<template>
  <div>
    <Menu/>
    <h1>Oráculo de cartas</h1>
    <p class="texto">El oráculo de cartas responderá <strong>de forma gratuita, fiable y precisa</strong> a tu pregunta en función de las cartas que elijas. La forma de preguntar es muy <strong>sencilla</strong>, solo tienes que escribir tu pregunta, elegir 3 cartas y leer la respuesta del oráculo.</p>
    <div id="container-81ce0b525d7df8ae99dd105203b8686f"></div>
    <div v-if="modoPregunta">
      <p class="label-input">ESCRIBE TU PREGUNTA</p>
      <div class="box-pregunta">
        <input type="text" class="input-oraculo" v-model="pregunta" placeholder="Escribe aquí tu pregunta">
      </div>
      <p class="label-input">ESCOGE 3 CARTAS</p>
      <div class="box-cartas">
        <div v-for="(card, i) in cardValues" :key="i" :style="{ backgroundImage: `url(${cardImages[i]})` }" class="carta" @click="setCardValue(i, cardValues[i])"></div>
      </div>
      <div class="error-log" v-if="errorLog">Es obligatorio hacer una pregunta y escoger 3 cartas</div>
      <div class="btn-oraculo" @click="consultarRespuesta()">Preguntar</div>
    </div>
    <div v-if="!modoPregunta">
      <p class="label-input">TUS CARTAS SON ESTAS</p>
      <div class="box-cartas">
        <div v-for="(card, i) in cartasElegidas" :key="i" :style="{ backgroundImage: `url(${cartasElegidas[i]})` }" class="carta"></div>
      </div>
      <p class="label-input">SEGÚN TUS CARTAS LA RESPUESTA ES</p>
      <div class="box-cartas">
        <div class="tag-respuesta">{{respuesta}}</div>
      </div>
      <div class="btn-nuevo" @click="nuevaPregunta()">Preguntar de nuevo</div>
    </div>
    <div class="box-respuestas" v-if="userLogged">
      <p class="label-input">Tus últimas 5 preguntas</p>
      <div v-for="resp in responsesList" :key="resp.id" class="respuesta-item">
        <div class="text-pregunta">{{resp.pregunta}}</div>
        <div class="text-respuesta-cartas">{{resp.respuesta}}</div>
      </div>
      <NuxtLink to="/historial-cartas">
        <div class="link-historial">Ver historial completo</div>
      </NuxtLink>
    </div>
    <div v-if="!userLogged" class="box-no-logged">
      <p>Inicia sesión para ver el historial de tus preguntas y conseguir puntos canjeables</p>
      <NuxtLink to="/usuario">
        <div class="btn-oraculo">Iniciar sesión</div>
      </NuxtLink>
    </div>
    <h2>Historia del oráculo de cartas</h2>
    <p class="texto">La historia del <strong>Oráculo de Cartas</strong> se remonta a la antigüedad, y aunque su origen exacto es <strong>incierto</strong>, se sabe que ha sido utilizado en diversas culturas durante siglos para obtener información y respuestas a preguntas específicas.</p>
    <p class="texto">Uno de los primeros registros de este tipo de adivinación <strong>proviene de la antigua China</strong>, donde se utilizaban <strong>cartas de papel y tinta</strong> para realizar lecturas. Estas cartas se conocían como "Ji Fa" o "Yi Jing", y se creía que proporcionaban información sobre el futuro y las situaciones actuales.</p>
    <p class="texto">En Europa, el Oráculo de Cartas se popularizó en el siglo XIV, y <strong>se utilizaba como herramienta de adivinación por parte de la nobleza y la aristocracia</strong>. En ese momento, las cartas se conocían como "Tarocchi", y se utilizaban tanto para juegos de cartas como para la adivinación.</p>
    <p class="texto">Con el tiempo, los Tarocchi evolucionaron hasta convertirse en el <strong>mazo de cartas conocido como Tarot</strong>. A finales del siglo XVIII, se produjo un renacimiento del interés por la adivinación con Tarot, y se crearon nuevas barajas de cartas con una variedad de diseños y simbolismos.</p>
    <p class="texto">Hoy en día, el Oráculo de Cartas sigue siendo una <strong>herramienta popular para obtener información y respuestas a preguntas específicas</strong>. Se han creado innumerables barajas de cartas diferentes, cada una con su propio simbolismo y significado. Además, la tecnología moderna ha permitido el desarrollo de aplicaciones móviles y sitios web que ofrecen lecturas de cartas en línea.</p>
    <p class="texto">En resumen, la historia del Oráculo de Cartas es larga y diversa, y ha sido utilizado en todo el mundo durante siglos. Aunque ha evolucionado con el tiempo, sigue siendo una herramienta valiosa para aquellos que buscan respuestas y orientación en su vida.</p>
    <h2>La cartomancia</h2>
    <p class="texto">La cartomancia es una <strong>práctica de adivinación que utiliza cartas para obtener información y respuestas a preguntas específicas</strong>. Es una de las formas más populares de adivinación, y se cree que se originó en Europa en el siglo XIV.</p>
    <p class="texto">El mazo de cartas más comúnmente utilizado en la cartomancia es el <strong>mazo de Tarot</strong>, aunque también se pueden utilizar otros tipos de cartas, como el mazo de cartas de juego común.</p>
    <p class="texto">Cada carta del Tarot tiene su propio simbolismo y significado, y se cree que los patrones en los que se colocan las cartas pueden <strong>proporcionar información sobre el pasado, el presente y el futuro</strong> de una persona, así como sobre sus relaciones y situaciones personales.</p>
    <p class="texto">La cartomancia se utiliza a menudo como <strong>herramienta de autoexploración y crecimiento personal</strong>, y también puede ser utilizada como herramienta de orientación por parte de profesionales que ofrecen lecturas de cartas a sus clientes.</p>
    <p class="texto">Es importante tener en cuenta que la cartomancia es una práctica que se basa en la interpretación subjetiva de las cartas, y que <strong>no existe una respuesta única y definitiva a cualquier pregunta</strong>. Las lecturas de cartas pueden variar ampliamente según la interpretación del lector de cartas, y es importante tener en cuenta que las cartas no tienen el poder de cambiar el futuro o tomar decisiones por una persona.</p>
    <p class="texto">En resumen, la cartomancia es una práctica popular de adivinación que utiliza cartas para obtener información y respuestas a preguntas específicas. Es importante recordar que la interpretación de las cartas es subjetiva y que no existe una respuesta única y definitiva a cualquier pregunta. La cartomancia puede ser una herramienta útil para la exploración personal y la orientación, pero siempre se debe tener en cuenta que el poder de tomar decisiones y cambiar el futuro radica en la persona misma.</p>
    <Footer/>
  </div>
</template>

<script>
import cartasService from '../assets/js/cartas.js';
import statsService from '../assets/js/stats.js';
import backgroundCard from '../assets/img/card-reverse.png';
import card0 from '../assets/img/cartas/carta-0.png';
import card1 from '../assets/img/cartas/carta-1.png';
import card2 from '../assets/img/cartas/carta-2.png';
import card3 from '../assets/img/cartas/carta-3.png';
import card4 from '../assets/img/cartas/carta-4.png';
import card5 from '../assets/img/cartas/carta-5.png';
import card6 from '../assets/img/cartas/carta-6.png';
import card7 from '../assets/img/cartas/carta-7.png';
import card8 from '../assets/img/cartas/carta-8.png';
import card9 from '../assets/img/cartas/carta-9.png';
import card10 from '../assets/img/cartas/carta-10.png';
import card11 from '../assets/img/cartas/carta-11.png';
import card12 from '../assets/img/cartas/carta-12.png';
import card13 from '../assets/img/cartas/carta-13.png';
import card14 from '../assets/img/cartas/carta-14.png';
import card15 from '../assets/img/cartas/carta-15.png';
import card16 from '../assets/img/cartas/carta-16.png';
import card17 from '../assets/img/cartas/carta-17.png';
import card18 from '../assets/img/cartas/carta-18.png';
import card19 from '../assets/img/cartas/carta-19.png';
import card20 from '../assets/img/cartas/carta-20.png';
import card21 from '../assets/img/cartas/carta-21.png';

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
        content: 'El oráculo de cartas responderá de forma gratuita, fiable y precisa a tu pregunta en función de las cartas que elijas. La forma de preguntar es muy sencilla, solo tienes que escribir tu pregunta, elegir 3 cartas y leer la respuesta del oráculo.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
  },
  data() {
    return{
      pregunta: '',
      respuesta: '',
      loadingRespuesta: false,
      errorLog: false,
      modoPregunta: true,
      userData: {
        id: null,
        nombre: null,
        apellidos: null,
        email: null,
        pass: null,
        signo: null
      },
      responsesList: [],
      cartasElegidas: [],
      userLogged: false,
      cardValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      cardImages: [backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard],
      cardPredictions: [2, 3, 1, 2, 1, 3, 4, 1, 1, 4, 2, 3, 4, 4, 2, 3, 2, 4, 1, 3, 4, 1]
    }
  },
  mounted () {
    this.setCards();
    if (localStorage.getItem('user')) {
      this.userLogged = true;
      this.getUserData();
    }
  },
  methods:{
    setCards() {
      this.cardValues.sort(function() {return Math.random() - 0.5});
    },
    restartCards() {
      this.cardImages = [backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard, backgroundCard];
    },
    async consultarRespuesta() {
      this.respuesta = '';
      this.errorLog = false;
      if (this.pregunta !== '' && this.cartasElegidas.length === 3) {
        this.modoPregunta = false;
        this.loadingRespuesta = true;
        this.respuesta = await this.getResponseFromCards();
        await cartasService.createNewResponseByUser(this.userData.id ? this.userData.id : 0, this.pregunta, this.respuesta);
        if (this.userLogged) {
          await statsService.setCartasUse(this.userData.id);
        }
        this.loadingRespuesta = false;
        this.pregunta = '';
        this.getUserResponses();
      } else {
        this.errorLog = true;
      }
    },
    getResponseFromCards() {
      let resp = 'TAL VEZ NO';
      let puntosCartas = 0;
      puntosCartas += this.cardPredictions[parseInt(this.cartasElegidas[0].split('carta-')[1].split('.png')[0])];
      puntosCartas += this.cardPredictions[parseInt(this.cartasElegidas[1].split('carta-')[1].split('.png')[0])];
      puntosCartas += this.cardPredictions[parseInt(this.cartasElegidas[2].split('carta-')[1].split('.png')[0])];
      if (puntosCartas <= 5) {
        resp = 'NO';
      } else if (puntosCartas > 5 && puntosCartas <= 7) {
        resp = 'TAL VEZ NO'
      } else if (puntosCartas > 7 && puntosCartas <= 9) {
        resp = 'TAL VEZ SI'
      } else if (puntosCartas > 9) {
        resp = 'SI'
      }

      return resp;
    },
    nuevaPregunta() {
      this.modoPregunta = true;
      this.cartasElegidas = [];
      this.pregunta = '';
      this.respuesta = '';
      this.restartCards();
      this.setCards();
      this.errorLog = false;
    },
    setCardValue(index, cardVal) {
      if (this.cartasElegidas.length < 3) {
        switch(cardVal) {
          case 0:
            this.$set(this.cardImages, index, card0);
            this.setCartaElegida(card0);
            break;
          case 1:
            this.$set(this.cardImages, index, card1);
            this.setCartaElegida(card1);
            break;
          case 2:
            this.$set(this.cardImages, index, card2);
            this.setCartaElegida(card2);
            break;
          case 3:
            this.$set(this.cardImages, index, card3);
            this.setCartaElegida(card3);
            break;
          case 4:
            this.$set(this.cardImages, index, card4);
            this.setCartaElegida(card4);
            break;
          case 5:
            this.$set(this.cardImages, index, card5);
            this.setCartaElegida(card5);
            break;
          case 6:
            this.$set(this.cardImages, index, card6);
            this.setCartaElegida(card6);
            break;
          case 7:
            this.$set(this.cardImages, index, card7);
            this.setCartaElegida(card7);
            break;
          case 8:
            this.$set(this.cardImages, index, card8);
            this.setCartaElegida(card8);
            break;
          case 9:
            this.$set(this.cardImages, index, card9);
            this.setCartaElegida(card9);
            break;
          case 10:
            this.$set(this.cardImages, index, card10);
            this.setCartaElegida(card10);
            break;
          case 11:
            this.$set(this.cardImages, index, card11);
            this.setCartaElegida(card11);
            break;
          case 12:
            this.$set(this.cardImages, index, card12);
            this.setCartaElegida(card12);
            break;
          case 13:
            this.$set(this.cardImages, index, card13);
            this.setCartaElegida(card13);
            break;
          case 14:
            this.$set(this.cardImages, index, card14);
            this.setCartaElegida(card14);
            break;
          case 15:
            this.$set(this.cardImages, index, card15);
            this.setCartaElegida(card15);
            break;
          case 16:
            this.$set(this.cardImages, index, card16);
            this.setCartaElegida(card16);
            break;
          case 17:
            this.$set(this.cardImages, index, card17);
            this.setCartaElegida(card17);
            break;
          case 18:
            this.$set(this.cardImages, index, card18);
            this.setCartaElegida(card18);
            break;
          case 19:
            this.$set(this.cardImages, index, card19);
            this.setCartaElegida(card19);
            break;
          case 20:
            this.$set(this.cardImages, index, card20);
            this.setCartaElegida(card20);
            break;
          case 21:
            this.$set(this.cardImages, index, card21);
            this.setCartaElegida(card21);
            break;
        }
      }
    },
    setCartaElegida(card) {
      if (!this.cartasElegidas.includes(card)) {
        this.cartasElegidas.push(card);
      }
    },
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
        this.responsesList = await cartasService.getAllResponsesByUserId(this.userData.id);
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
  width: 17%;
  height: 100px;
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
  max-width: 300px;
  margin: 5px auto;
  line-height: 20px;
  color: #ff7575;
  text-align: center;
}

.btn-oraculo {
  width: 120px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 7px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  cursor: pointer;
  text-align: center;
}

.btn-nuevo {
  width: 180px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 7px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  cursor: pointer;
  text-align: center;
}

.box-respuestas {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  text-align: center;
}

.respuesta-item {
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 10px;
  background-color: #444654;
  border-radius: 5px;
}

.text-pregunta {
  font-size: 12px;
  text-align: left;
}

.text-respuesta-cartas {
  min-width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  text-align: center;
  background-color: #a887e1;
  border-radius: 5px;
  padding: 5px;
}

.box-no-logged {
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  background-color: #444654;
  text-align: center;
}

.link-historial {
  width: 170px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  padding: 5px;
}

.tag-respuesta {
  padding: 10px;
  background-color: #a887e1;
  color: #ffffff;
  font-size: 30px;
  font-weight: 700;
  border-radius: 5px;
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
