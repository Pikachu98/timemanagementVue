<template>
  <div class="hero">
    <h1 class="vue-title">Put your phone down !!</h1>

    <table align="center">
      <tr>
        <td>
          <p class="lead"><b><i>Time for a change !!</i></b>
          <p>Tired of putting off things?</p>
          <p>Just click <a href ="/timer">here</a> to start your focus time!</p>
          <p>Be focus and efficient.</p>
        </td>
        <td></td>
        <td>
          <img src="../assets/homer.gif" alt="description here" />
        </td>
      </tr>
    </table>

<!--    <p></p>-->
<!--    <p class="lead">This is the homepage of your <b>MEVN</b> Web app</p>-->
  </div>
</template>
<script>
import UserService from '@/services/userservice'
export default {

  data () {
    return {
      user: {usertoken: '', userName: ''},
      tag: {tagType: '', tagColor: ''}
    }
  },

  created () {
    this.findUser(this.user)
  },
  methods: {
    findUser: function (user) {
      console.log(this.$store.getters['user/user'])
      if (this.$store.getters['user/user']) {
        var usertoken11 = this.$store.getters['user/user'].uid
        console.log(usertoken11)
        UserService.fetchUser(usertoken11)
          .then(response => {
            console.log(response.data.data.length + 'jjjjjjj')
            if (response.data.data.length === 0) {
              user.usertoken = usertoken11
              user.userName = this.$store.getters['user/user'].displayName
              user.photoURL = this.$store.getters['user/user'].photoURL
              console.log(JSON.stringify(user, null, 5) + '传了什么进去')
              UserService.createUser(user)
                .then(response => {
                  // this.loadUserTrees()
                  console.log(response.data)
                })
                .catch(error => {
                  this.errors.push(error)
                  console.log(error)
                })
            }
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      }
    }
  }
}
</script>
<style>
  .hero {
    height: 100vh;
    margin-top: 30px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 2.5rem;
  }
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    font-size: 70pt;
    margin-bottom: 10px;
  }
</style>
