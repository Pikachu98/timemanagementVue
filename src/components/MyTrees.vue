<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-tree" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="list-tree">
<!--      <br>-->
<!--      <div class="fa fa-usd fa-2x" style="float: right">My account: {{userCoins}} coins</div>-->
<!--      <br>-->
<!--      <br>-->
      <v-client-table :columns="columns" :data="trees" :options="options">
<!--        <a slot="treePicPath" slot-scope="props">-->
<!--          <div style="color: white; font-size: 10px;">-->
<!--            <img :src="props.row.treePicPath" width="50" height="50">-->
<!--          </div>-->
<!--        </a>-->
<!--        <a slot="buytree" slot-scope="props" class="fa fa-shopping-cart fa-2x" @click="suffMoney(props.row._id)"></a>-->
      </v-client-table>
    </div>
  </div>
</template>

<script>
import TreeSevice from '@/services/treeservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'MyTrees',
  data () {
    return {
      messagetitle: ' My Trees ',
      trees: [],
      columns: ['treeName'],
      options: {
        headings: {
          treeName: 'treeName'
        }
      }
    }
  },
  created () {
    this.loadMyTrees()
  },
  methods: {
    loadMyTrees: function () {
      TreeSevice.fetchMyTrees(this.$store.getters['user/user'].uid)
        .then(response => {
          console.log(typeof (response.data.data.tree))
          console.log(typeof (response.data.data))
          for (var i in response.data.data) {
            this.trees.push(i)
          }
          console.log(typeof (this.trees))
          // this.trees = response.data.data
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
  #list-tree {
    width: 60%;
    margin: 0 auto;
  }
</style>
