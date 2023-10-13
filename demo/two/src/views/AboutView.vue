<template>
  <div class="about">
    <h1>This is an about xxx</h1>
  </div>
  <!--
  <table border="1">
    <thead>用户列表</thead>
    <th>
      <tr>id</tr>
      <tr>Name</tr>
      <tr>email</tr>
      <tr>sex</tr>
      <tr>city</tr>
    </th>

  </table>
  -->
</template>


<script>

export default {
  data() {
    return {
    }
  },
  methods: {
    getdata() {
      this.$axios.get('https://consul.i.noahgroup.com/v1/agent/services').then(data => {
        console.log(data)
      })
    },
  },
  created() {
    this.getdata()
  }
}


</script>
