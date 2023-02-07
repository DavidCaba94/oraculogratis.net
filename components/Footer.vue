<template>
  <div class="footer-container">
    <div class="year-box">©{{year}} ORACULOGRATIS.NET</div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      year: 0
    }
  },
  mounted() {
    this.getYear();
  },
  methods: {
    getYear() {
      this.year = new Date().getFullYear();
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

.footer-container {
  width: 300px;
  height: 70px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
}

.year-box {
    padding: 7px;
    border-bottom: 1px solid transparent;
    border-image: linear-gradient(0.25turn, rgb(138, 17, 219), rgb(39, 216, 223), rgb(53, 230, 171));
    border-image-slice: 1;
    font-weight: 700;
}
</style>