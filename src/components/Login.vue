<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-sign-in" style="padding: 3px"></i>{{messagetitle}}</h3>
    <br>
    <h1> Please Login first </h1>
    <div id="firebaseui-auth-container" style="margin-top:50px;"></div>
  </div>
</template>

<script>
import auth from '@/auth'

export default {
  name: 'Login',
  data () {
    return {
      messagetitle: ' Log In '
    }
  },
  mounted () {
    auth.authForm('#firebaseui-auth-container')
  }
}
</script>

<style scoped>
  /*.hero {*/
  /*  background: url('../assets/save-time3.jpg');*/
  /*  !*filter: blur(8px);*!*/
  /*  !*-webkit-filter: blur(8px);*!*/
  /*  background-color: #211B1B*/
  /*}*/
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  h1{
    color: dodgerblue;
  }
</style>
