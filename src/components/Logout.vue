<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-sign-out" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div v-if="user">
      <div class="vue-message">{{message}}</div>
      <img :src="user.photoURL" width="100"> <br>
      <h3>{{user.displayName}}</h3>
      <p>{{user.email}}</p>
      <!--<p>{{token}}</p>-->
      <button class="btn btn-primary btn1" @click="logOut">Log out</button>
      <br><br><br>
      <!--<pre>{{user}}</pre>-->
    </div>
    <dfooter></dfooter>
  </div>
</template>

<script>
// import Footer from '@/components/Footer'
import auth from '@/auth'

export default {
  name: 'Logout',
  data () {
    return {
      messagetitle: ' Logout ',
      message: 'If You Really Want to Log out, Click Below',
      token: this.$store.getters['user/user'].getIdToken(true)
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    logOut () {
      auth.logout()
      console.log(this.$store.getters['user/user'].displayName)
    }
  }
}
</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  .vue-message {
    margin-top: 30px;
    text-align: center;
    font-size: 25pt;
    margin-bottom: 10px;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  img {
    border-radius: 50px;
  }

  h3 {
    margin-bottom: 0;
  }

  p {
    margin-top: 0;
  }

  pre {
    text-align: left;
  }
</style>
