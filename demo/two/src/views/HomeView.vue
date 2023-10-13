<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
  <TestPage></TestPage>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import TestPage from "@/components/TestPage.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    TestPage,
  },
};
</script>
