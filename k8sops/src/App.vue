<template>
  <router-view v-if="isRouterAlive"></router-view>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },

  data() {
    return {
      isRouterAlive: true
    }
  },

  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    }
  },
}
</script>

<style>
.html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#nprogress .bar {
  background: #2186c0 !important;
}
</style>
