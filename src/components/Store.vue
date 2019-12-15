<template>
<div class="hero">
  <h3 class="vue-title"><i class="fa fa-university" style="padding: 3px"></i>{{messagetitle}}</h3>
  <div id="list-tree">
    <br>
    <div class="fa fa-usd fa-2x" style="float: right">My account: {{userCoins}} coins</div>
    <br>
    <br>
    <v-client-table :columns="columns" :data="trees" :options="options">
      <a slot="treePicPath" slot-scope="props">
        <div style="color: white; font-size: 10px;">
          <img :src="props.row.treePicPath" width="50" height="50">
        </div>
      </a>
      <a slot="buytree" slot-scope="props" class="fa fa-shopping-cart fa-2x" @click="suffMoney(props.row._id)"></a>
    </v-client-table>
  </div>
</div>
</template>

<script>
import TreeService from '@/services/treeservice'
import RecordService from '@/services/recordservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Trees',
  data () {
    return {
      messagetitle: ' Trees List ',
      slotShowStatus: false,
      trees: [],
      userTrees: [],
      errors: [],
      userCoins: '',
      props: ['_id'],
      columns: ['_id', 'treeName', 'treeType', 'treeDescription', 'coinsToBuy', 'treePicPath', 'buytree'],
      // columns: ['_id', 'treeName', 'treeType', 'treeDescription', 'coinsToBuy', 'buytree'],
      options: {
        headings: {
          _id: 'ID',
          treeName: 'Tree Name',
          treeType: 'Species',
          treeDescription: 'Description',
          coinsToBuy: 'Price',
          treePicPath: 'Picture'
        },
        filterable: ['_id', 'treeName', 'treeType', 'treeDescription', 'coinsToBuy']
      }
    }
  },
  created () {
    this.loadTrees()
  },
  methods: {
    loadTrees: function () {
      TreeService.fetchTrees()
        .then(response => {
          this.trees = response.data
          // console.log(this.trees)
          this.getUserCoins()
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    getUserCoins: function () {
      RecordService.fetchUserCoins(this.$store.getters['user/user'].uid)
        .then(response => {
          this.userCoins = response.data.data
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    suffMoney: function (id, treeName) {
      if (this.$store.getters['user/user']) {
        var usertoken = this.$store.getters['user/user'].uid
      } else {
        usertoken = 'anon'
      }
      if (this.userCoins < 5) {
        this.$swal('Sorry, you don\'t have enough money!')
      } else {
        TreeService.buyNewTree(id, usertoken)
          .then(response => {
            if (response.data.message === 'Tree has already existed') {
              this.$swal('The tree is already in your bag!')
            } else {
              this.$swal({
                title: 'Are you sure to Buy it? ',
                type: 'info',
                showCancelButton: true,
                confirmButtonText: 'YES',
                cancelButtonText: 'CANCEL',
                showCloseButton: true
                // showLoaderOnConfirm: true
              }).then((result) => {
                if (result.value === true) {
                  this.userCoins -= 5
                  this.$swal('Congratulations! Your unlock a new specie')
                } else {
                  this.$swal('Cancelled')
                }
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

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  #list-tree {
    width: 60%;
    margin: 0 auto;
  }
</style>
