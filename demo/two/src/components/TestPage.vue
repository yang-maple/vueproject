<script>
export default {
  name: "TestPage",
  data(){
    return{
      message : 'hellp testpage',
    }
  }
}
</script>

<template>
  <div class="cc">
    <h1>{{ message }}</h1>
  </div>
</template>

<style scoped>
  .cc {
    background: #42b983;
  }

</style>