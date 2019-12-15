<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-exclamation-triangle" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="vue-message">{{message1}}<br>{{message2}}</div>
    <dfooter></dfooter>
  </div>
</template>

<script>

export default {
  name: 'LoginMessage',
  data () {
    return {
      messagetitle: ' Already Logged In ',
      message1: 'You\'ve Already Logged In,',
      message2: 'Please Choose and Option from the Menu'
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
</style>
