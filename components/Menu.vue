<template>
  <div>
    <div class="desktop-menu-container">
      <NuxtLink to="/">
        <div :class="getActiveMenuItem('')">Inicio</div>
      </NuxtLink>
      <NuxtLink to="/oraculo-si-o-no">
        <div :class="getActiveMenuItem('oraculo-si-o-no')">Oráculo si o no</div>
      </NuxtLink>
      <NuxtLink to="/oraculo-de-cartas">
        <div :class="getActiveMenuItem('oraculo-de-cartas')">Oráculo de cartas</div>
      </NuxtLink>
      <NuxtLink to="/oraculo-del-amor">
        <div :class="getActiveMenuItem('oraculo-del-amor')">Oráculo del amor</div>
      </NuxtLink>
      <NuxtLink to="/oraculo-de-nombres">
        <div :class="getActiveMenuItem('oraculo-de-nombres')">Oráculo de nombres</div>
      </NuxtLink>
      <NuxtLink to="/oraculo-de-signos">
        <div :class="getActiveMenuItem('oraculo-de-signos')">Oráculo de signos</div>
      </NuxtLink>
      <div class="cart-sesion-group">
        <NuxtLink to="/tienda">
          <div class="btn-tienda-menu">
            <img src="../assets/img/cart.png" alt="Tienda">
          </div>
        </NuxtLink>
        <NuxtLink to="/usuario" v-if="!userLogged">
          <div class="btn-login-menu">Iniciar sesión</div>
        </NuxtLink>
        <NuxtLink to="/usuario" v-if="userLogged">
          <div class="btn-usuario" :style="{ backgroundImage: `url('${imagePath}')` }"></div>
        </NuxtLink>
      </div>
    </div>
    <div class="mobile-menu-container">
      <div class="hamburger-menu" @click="showMenu()">
        <div class="bar" ref="bar"></div>
      </div>
      <div class="cart-sesion-group">
        <NuxtLink to="/tienda">
          <div class="btn-tienda-menu">
            <img src="../assets/img/cart.png" alt="Tienda">
          </div>
        </NuxtLink>
        <NuxtLink to="/usuario" v-if="!userLogged">
          <div class="btn-login-menu">Iniciar sesión</div>
        </NuxtLink>
        <NuxtLink to="/usuario" v-if="userLogged">
          <div class="btn-usuario" :style="{ backgroundImage: `url('${imagePath}')` }"></div>
        </NuxtLink>
      </div>
    </div>
    <div :class="mobileMenuClass">
      <NuxtLink to="/">
        <div :class="getActiveMobileMenuItem('')">Inicio</div>
      </NuxtLink>
      <NuxtLink to="/oraculo-si-o-no">
        <div :class="getActiveMobileMenuItem('oraculo-si-o-no')">Oráculo si o no</div>
      </NuxtLink>
      <NuxtLink to="/oraculo-de-cartas">
        <div :class="getActiveMobileMenuItem('oraculo-de-cartas')">Oráculo de cartas</div>
      </NuxtLink>
      <NuxtLink to="/oraculo-del-amor">
        <div :class="getActiveMobileMenuItem('oraculo-del-amor')">Oráculo del amor</div>
      </NuxtLink>
      <NuxtLink to="/oraculo-de-nombres">
        <div :class="getActiveMobileMenuItem('oraculo-de-nombres')">Oráculo de nombres</div>
      </NuxtLink>
      <NuxtLink to="/oraculo-de-signos">
        <div :class="getActiveMobileMenuItem('oraculo-de-signos')">Oráculo de signos</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import Acuario from '../assets/img/signos/acuario.png';
import Aries from '../assets/img/signos/aries.png';
import Cancer from '../assets/img/signos/cancer.png';
import Capricornio from '../assets/img/signos/capricornio.png';
import Escorpio from '../assets/img/signos/escorpio.png';
import Geminis from '../assets/img/signos/geminis.png';
import Leo from '../assets/img/signos/leo.png';
import Libra from '../assets/img/signos/libra.png';
import Piscis from '../assets/img/signos/piscis.png';
import Sagitario from '../assets/img/signos/sagitario.png';
import Tauro from '../assets/img/signos/tauro.png';
import Virgo from '../assets/img/signos/virgo.png';
export default {
  name: 'Menu',
  data() {
    return {
      isMenuShow: false,
      mobileMenuClass: 'mobile-items-container-hide',
      userLogged: false,
      imagePath: '../assets/img/signos/acuario.png'
    }
  },
  mounted() {
    this.checkUser();
  },
  methods: {
    getActiveMenuItem(nameRoute) {
      let originalClass = 'menu-item';
      if (nameRoute === this.$nuxt.$route.path.split('/')[1]) {
        originalClass = 'active-menu-item';
      }

      return originalClass;
    },
    getActiveMobileMenuItem(nameRoute) {
      let originalClass = 'menu-item-mobile';
      if (nameRoute === this.$nuxt.$route.path.split('/')[1]) {
        originalClass = 'active-menu-item-mobile';
      }

      return originalClass;
    },
    showMenu() {
      this.$refs.bar.classList.toggle('animate');
      if (!this.isMenuShow) {
        this.mobileMenuClass = 'mobile-items-container-show';
      } else {
        this.mobileMenuClass = 'mobile-items-container-hide';
      }
      this.isMenuShow = !this.isMenuShow;
    },
    checkUser() {
      if (localStorage.getItem('user')) {
        this.userLogged = true;
        this.getUserData();
      }
    },
    getUserData() {
      let signo = JSON.parse(localStorage.getItem('user')).signo;
      switch (signo) {
        case 'Acuario':
          this.imagePath = Acuario
          break;
        case 'Aries':
          this.imagePath = Aries
          break;
        case 'Cáncer':
          this.imagePath = Cancer
          break;
        case 'Capricornio':
          this.imagePath = Capricornio
          break;
        case 'Escorpio':
          this.imagePath = Escorpio
          break;
        case 'Géminis':
          this.imagePath = Geminis
          break;
        case 'Leo':
          this.imagePath = Leo
          break;
        case 'Libra':
          this.imagePath = Libra
          break;
        case 'Piscis':
          this.imagePath = Piscis
          break;
        case 'Sagitario':
          this.imagePath = Sagitario
          break;
        case 'Tauro':
          this.imagePath = Tauro
          break;
        case 'Virgo':
          this.imagePath = Virgo
          break;
      }
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
  background-color: #343541 !important;
  font-family: 'Roboto', sans-serif;
  color: #ffffff;
  padding: 10px;
}

a {
  text-decoration: none;
  color: #ffffff;
}

.desktop-menu-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: nowrap;
  max-width: 950px;
  margin: 0 auto;
  padding: 20px;
}

.mobile-menu-container {
  display: none;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 90%;
  margin: 0 auto;
  padding: 10px;
}

.menu-item {
  padding: 7px;
  font-size: 14px;
}

.menu-item:hover {
  background-color: #444654;
  border-radius: 5px;
}

.active-menu-item {
  padding: 7px;
  font-size: 14px;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
}

.menu-item-mobile {
  width: fit-content;
  margin: 0 auto;
  padding: 7px;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}

.active-menu-item-mobile {
  width: fit-content;
  margin: 0 auto;
  padding: 7px;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
  text-align: center;
  margin-top: 10px;
}

.user-icon {
  width: 30px;
}

.btn-login-menu {
  padding: 7px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
}

.btn-usuario {
  width: 30px;
  height: 30px;
  padding: 7px;
  background-image: url('../assets/img/signos/acuario.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.mobile-items-container-show {
  display: block;
  position: absolute;
  width: 92%;
  margin: 0 auto;
  padding: 10px;
  padding-bottom: 20px;
  background-color: #343541;
}

.mobile-items-container-hide {
  display: none;
}

.btn-tienda-menu {
  border-radius: 5px;
  padding: 5px 5px 0px 5px;
  margin-right: 20px;
  cursor: pointer;
}

.btn-tienda-menu:hover {
  background-color: #444654;
}

.btn-tienda-menu img {
  width: 25px;
}

.cart-sesion-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: nowrap;
}

@media (max-width: 950px) {
  .desktop-menu-container {
    display: none;
  }

  .mobile-menu-container {
    display: flex;
  }
}

/*ANIMACIÓN MENU*/
.hamburger-menu {
  margin-top: -20px;
  margin-right: 10px;
  float: right;
  width: 40px;
  height: 30px;
  cursor: pointer;
}

.bar,
.bar:after,
.bar:before {
  width: 30px;
  height: 2px;
}

.bar {
  position: relative;
  transform: translateY(25px);
  background: white;
  transition: all 0ms 300ms;
}
.bar.animate {
  background: rgba(255, 255, 255, 0);
}

.bar:before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 10px;
  background: white;
  transition: bottom 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.bar:after {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  background: white;
  transition: top 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.bar.animate:after {
  top: 0;
  transform: rotate(45deg);
  transition: top 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.bar.animate:before {
  bottom: 0;
  transform: rotate(-45deg);
  transition: bottom 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
}
/*FIN ANIMACIÓN MENU*/
</style>