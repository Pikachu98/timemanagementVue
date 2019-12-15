<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-users" style="padding: 3px"></i>{{messagetitle}}</h3>
    <input placeholder="input your friend Name here" v-model.trim="userName">
    <button @click="findFri">search</button>
    <v-client-table :columns="columns" :data="friends" :options="options" v-if="status == false">
      <a slot="photoURL" slot-scope="props">
        <div v-if="props.row.photoURL != null" style="color: white; font-size: 10px;">
          <img :src="props.row.photoURL" width="42">
        </div>
        <div v-else>
          <img src="../assets/now.gif" width="42"><br>
        </div>
      </a>
      <a slot="Add" slot-scope="props" class="fa fa-plus-square fa-2x" @click="submit"></a>
<!--      <a slot="add" slot-scope="props" class="fa fa-thumbs-up fa-2x" ></a>-->
    </v-client-table>
  </div>
</template>

<script>
import UserService from '@/services/userservice'
export default {
  name: 'Friends',
  data () {
    return {
      messagetitle: ' Friends List ',
      status: true,
      userName: '',
      friends: [],
      columns: ['usertoken', 'userName', 'photoURL', 'Add'],
      props: ['usertoken'],
      options: {
        headings: {
          usertoken: 'ID',
          userName: 'User Name',
          photoURL: 'Profile'
        },
        filterable: ['usertoken', 'userName']
      }
    }
  },
  methods: {
    findFri: function () {
      this.status = false
      UserService.findUser(this.userName)
        .then(response => {
          this.friends = response.data
          console.log(this.friends)
          console.log(this.friends[0].photoURL)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    submit: function () {
      this.$swal({
        title: 'Are you sure to send a request? ',
        type: 'info',
        showCancelButton: true,
        confirmButtonText: 'YES',
        cancelButtonText: 'CANCEL',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        if (result.value === true) {
          this.$swal('Request is sent !')
        } else {
          this.$swal('Cancelled')
        }
      })
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
</style>
