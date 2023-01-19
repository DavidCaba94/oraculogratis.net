<template>
  <div>
    <Menu :page="2"/>
    <h1>Oráculo si o no</h1>
  </div>
</template>

<script>
export default {
  name: 'OraculoSiNo',
  head: {
    title: 'Oráculo Si o No - Oráculo Gratis',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'El oráculo del si o no gratis más fiable de internet.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }
}
</script>

<style scoped>

</style>
