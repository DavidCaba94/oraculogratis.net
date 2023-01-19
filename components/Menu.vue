<template>
  <div class="menu-container">
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
    <NuxtLink to="/usuario">
      <div :class="getActiveMenuItem('usuario')">
        <img class="user-icon" src="../assets/img/user.png" alt="Usuario">
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    page: Number
  },
  data() {
    return {
      
    }
  },
  mounted() {
    
  },
  methods: {
    getActiveMenuItem(nameRoute) {
      let originalClass = 'menu-item';
      if (nameRoute === this.$nuxt.$route.path.split('/')[1]) {
        originalClass = 'active-menu-item'
      }

      return originalClass;
    }
  }
}
</script>

<style scoped>
.menu-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: nowrap;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.menu-item {
  padding: 5px;
}

.active-menu-item {
  padding: 5px;
  background-color: #974dd3;
  border-radius: 5px;
}

.user-icon {
  width: 30px;
}
</style>