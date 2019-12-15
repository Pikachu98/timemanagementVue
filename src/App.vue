<template>
  <div id="app">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <img src="./assets/mevnnav.png" class="img-circle" style="padding: 5px">
      <b-navbar-brand to="/">Task Management</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
          <b-nav-item to="/timer"><i class="fa fa-clock-o" style="padding: 5px"> Timer </i></b-nav-item>
          <b-nav-item to="/tag"><i class="fa fa-tags" style="padding: 5px"> Tag </i></b-nav-item>
          <b-nav-item to="/record"><i class="fa fa-list" style="padding: 5px"> Record </i></b-nav-item>
          <b-nav-item to="/store"><i class="fa fa-university" style="padding: 5px"> Store </i></b-nav-item>
<!--          <b-nav-item to="/mytrees"><i class="fa fa-tree" style="padding: 5px"> My Trees </i></b-nav-item>-->
          <b-nav-item to="/friends"><i class="fa fa-users" style="padding: 5px"> Friend </i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/about"><i class="fa fa-info" style="padding: 5px"> About Us</i></b-nav-item>
          <b-nav-item to="/contact"><i class="fa fa-comment" style="padding: 5px"> Contact Us</i></b-nav-item>
          <b-nav-item to="/login"><i class="fa fa-sign-in" style="padding: 5px"> Login </i></b-nav-item>
          <b-nav-item to="/logout"><i class="fa fa-sign-out" style="padding: 5px"> Logout </i></b-nav-item>
          <div v-if="user" style="color: white; font-size: 10px;">
            <img :src="user.photoURL" width="40" ><br>
            {{user.displayName}}<br>
            <!--{{user.uid}}-->
          </div>
          <div v-else>
            <img src="./assets/now.gif" width="50" style="padding-top: 2px;">
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  }
}
</script>

<style>
  @import "../node_modules/firebaseui/dist/firebaseui.css";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 15px;*/
    /*background: url('./assets/save-time2.jpg') no-repeat fixed;*/
    background: url('./assets/save-time2.jpg') repeat center top;
    background-color: #211B1B;
  }
  .VueTables_sortable {
    cursor: pointer;
  }
  button
  {
    margin:5px;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 2.5rem;
  }
  img {
    border-radius: 50px;
  }
  b-nav-item {
    color: white;
    font-size: 50px;
  }
</style>
