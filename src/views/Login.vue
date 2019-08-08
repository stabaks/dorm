<!--  -->
<template>
  <div class="wrapper">
      <div class="login-wrapper">
          
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style scoped>
    .wrapper {
        background-image: url('../assets/login-back.png');
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1000;
        display: flex;
        align-items: center
    }
    .login-wrapper{
        position: absolute;
        width: 33.3%;
        height: 45%;
        left: 15%;
        background-color: rgb(189, 118, 118)
    }
</style>