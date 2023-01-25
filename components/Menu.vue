<template>
  <div>
    <div class="desktop-menu-container">
      <NuxtLink to="/">
        <div :class="getActiveMenuItem('')">Inicio</div>
      </NuxtLink>
      <NuxtLink to="/oraculo-si-o-no">
        <div :class="getActiveMenuItem('oraculo-si-o-no')">Oráculo si o no</div>
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
      <NuxtLink to="/oraculo-de-cartas">
        <div :class="getActiveMenuItem('oraculo-de-cartas')">Oráculo de cartas</div>
      </NuxtLink>
      <NuxtLink to="/usuario" v-if="!userLogged">
        <div class="btn-login">Iniciar sesión</div>
      </NuxtLink>
      <NuxtLink to="/usuario" v-if="userLogged">
        <div class="btn-usuario" ref="user"></div>
      </NuxtLink>
    </div>
    <div class="mobile-menu-container">
      <div class="hamburger-menu" @click="showMenu()">
        <div class="bar" ref="bar"></div>
      </div>
      <NuxtLink to="/usuario" v-if="!userLogged">
        <div class="btn-login">Iniciar sesión</div>
      </NuxtLink>
      <NuxtLink to="/usuario" v-if="userLogged">
        <div class="btn-usuario" ref="user"></div>
      </NuxtLink>
    </div>
    <div :class="mobileMenuClass">
      <NuxtLink to="/">
        <div :class="getActiveMobileMenuItem('')">Inicio</div>
      </NuxtLink>
      <NuxtLink to="/oraculo-si-o-no">
        <div :class="getActiveMobileMenuItem('oraculo-si-o-no')">Oráculo si o no</div>
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
      <NuxtLink to="/oraculo-de-cartas">
        <div :class="getActiveMobileMenuItem('oraculo-de-cartas')">Oráculo de cartas</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      isMenuShow: false,
      mobileMenuClass: 'mobile-items-container-hide',
      userLogged: true
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
      this.userLogged = true;
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
  background-color: #2c2c32 !important;
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
}

.active-menu-item {
  padding: 7px;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
}

.menu-item-mobile {
  width: fit-content;
  margin: 0 auto;
  padding: 7px;
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

.btn-login {
  padding: 7px;
  border: 1px solid transparent;
  border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
  border-image-slice: 1;
}

.btn-usuario {
  width: 30px;
  height: 30px;
  padding: 7px;
  background-image: url('../assets/img/signos/capricornio.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.mobile-items-container-show {
  display: block;
  position: absolute;
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  padding-bottom: 20px;
  background-color: #2c2c32;
  border-bottom: 2px solid #27272c;
}

.mobile-items-container-hide {
  display: none;
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