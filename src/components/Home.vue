<template>
  <div class="home">
    <header class="herohome">
  <!--    <h1 class="vue-title">Time for a change !!</h1>-->
      <div class="hero_background">
        <img src="../assets/test.jpeg" class="img-responsive1" alt="description here" />
      </div>
      <section class="hero_content hero_content--centered">
        <h1 class="hero_title">It's time to Change!</h1>
      </section>
  <!--    <br>-->
  <!--    <br>-->
  <!--    <table align="center">-->
  <!--      <tr>-->
  <!--        <td>-->
  <!--          <p class="lead"><b><i>Time for a change !!</i></b>-->
  <!--          <p>Tired of putting off things?</p>-->
  <!--          <p>Just click <a href ="/timer">here</a> to start your focus time!</p>-->
  <!--          <p>Be focus and efficient.</p>-->
  <!--        </td>-->
  <!--        <td></td>-->
  <!--        <td>-->
  <!--          <img src="../assets/homer.gif" class="img-responsive" alt="description here" />-->
  <!--        </td>-->
  <!--      </tr>-->
  <!--    </table>-->
  <!--    <p></p>-->
  <!--    <p class="lead">This is the homepage of your <b>MEVN</b> Web app</p>-->
    </header>
    <div class="col-md-6 service-grid" id="services">
      <p style="position: absolute; align-content: center">
        <h6 style="font-size: 20px; padding-top:40px">What is this website for?</h6>
        <div>---------------------------------------------------------------------------------------------------------------------------</div>
        Users can use this website to make to-do list and keep track of the time they use. In order to ensure that users are efficient every time (do not use electronic products such as mobile phones, computers, etc.), they cannot log out of the system during use. Finally, the system will perform statistics and analysis on the user's time.
        <h6 style="font-size: 20px; padding-top:40px"> How to use it?</h6>
        <div>---------------------------------------------------------------------------------------------------------------------------</div>
        Register first, then you can enjoy your concentration time and gradually find the fun of being focused.
<!--        <h6 style="font-size: 20px; padding-top:40px">Black Russian</h6>-->
<!--        <div>-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</div>-->
<!--        黑俄罗斯（Black Russian），又称“黑俄”，是一种鸡尾酒，它的特色是酒精浓度虽高，但却容易入口。-->
        <h6 style="font-size: 20px; padding-top:40px">Developer Introduction</h6>
        <div>---------------------------------------------------------------------------------------------------------------------------</div>
        I am the developer who is a student reading in WIT, this is my final project. Create The original intention of this website is that I am a procrastinator, so I know the harm that procrastination brings to people. Although I know its disadvantages, I still cannot get rid of it. After I studied the causes of procrastination, I decided to develop this software to help people like me.
      <br><br><br><br>
    </div>
<!--    <div class="footer-section" style="position: relative; width: 100%" >-->
<!--      <div class="container">-->
<!--        <div class="footer-top" >-->
<!--          <p>produced by Qianwen Zhang @ 2020</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <dfooter></dfooter>
  </div>
</template>
<script>
import UserService from '@/services/userservice'
import Footer from '@/components/Footer'
export default {

  data () {
    return {
      user: {usertoken: '', userName: ''},
      tag: {tagType: '', tagColor: ''}
    }
  },
  components: {
    'dfooter': Footer
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
  .home{
    background-color: white;
  }
  .herohome {
    /*height: 100vh;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    /*text-align: center;*/
    background-color: #ffffff;
    position: relative;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    /*padding: 1.15rem;*/
    /*padding-top: 74px;*/
    /*padding-bottom: 66px;*/
    color: #fff;
    /*background-color: #d3d3d3;*/
    text-decoration: none;
    height: 100%;
    max-height: 500px;
    min-height: 380px;
    z-index: 1;
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
    font-size: 2rem;
    margin-bottom: 10px;
  }
  .img-responsive{
    display: inline-block;
    height: auto;
    max-width: 100%;
  }
  .hero_background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .img-responsive1{
    border-radius: 0px;
    height: auto;
    width: 100vw;
  }
  .hero_content{
    max-width: 650px;
    width:100%;
    z-index:3;
  }
  .hero_background img{
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
  }
  .hero_title{
    display: block;
    font-size: 36px;
    line-height: 48px;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 15px;
  }
  .service-grid {
    position: relative;
    top: 10px;
  }
  .service-grid h3 {
    font-size: 3.5em;
    text-transform: capitalize;
    color: #222;
    font-family: 'JosefinSans-Regular';
  }
  .service-grid p {
    font-size: 1em;
    margin-top: 1em;
    margin-left: 10em;
    line-height: 1.8em;
    color: #999;
  }
  /*.footer-section{*/
  /*  text-align:center;*/
  /*  background: #FCB1B8;*/
  /*}*/
  .col-md-6 {
    -ms-flex: 0 0 50%;
    -webkit-box-flex: 0;
    flex: 0 0 50%;
    max-width: 100%;
  }

</style>
