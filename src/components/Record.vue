<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <br>
      <div class="fa fa-usd fa-2x" style="float: right">My account: {{userCoins}} coins</div>
      <br>
      <br>
      <v-client-table :columns="columns" :data="records" :options="options">
        <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteRecord(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>
<script>
import RecordService from '@/services/recordservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'
// import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Records',
  data () {
    return {
      messagetitle: ' Records List ',
      records: [],
      errors: [],
      userCoins: '',
      props: ['_id'],
      // columns: ['_id', 'startTime', 'endTime', 'suppFocusTime', 'realFocusTime', 'tree', 'recordDescription', 'coins', 'delete'],
      columns: ['_id', 'startTime', 'endTime', 'suppFocusTime', 'realFocusTime', 'tag', 'tree', 'recordDescription', 'coins', 'delete'],
      options: {
        headings: {
          // _id: 'ID',
          startTime: 'startTime',
          endTime: 'endTime',
          suppFocusTime: 'suppFocusMins',
          realFocusTime: 'realFocusMins',
          tag: 'tag',
          tree: 'tree',
          recordDescription: 'recordDescription'
          // coins: 'coins'
        },
        filterable: ['startTime', 'endTime', 'suppFocusTime', 'realFocusTime', 'tag', 'tree', 'recordDescription', 'coins']
      }
    }
  },
  created () {
    this.loadRecords()
  },
  methods: {
    loadRecords: function () {
      RecordService.fetchOneUserRecord(this.$store.getters['user/user'].uid)

        .then(response => {
          this.records = response.data
          console.log(this.records)
          this.getUserCoins()
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    deleteRecord: function (id) {
      this.$swal({
        title: 'Are you totaly sure?',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result)
        if (result.value === true) {
          RecordService.deleteOneRecord(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadRecords()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this Record ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          this.$swal('Cancelled', 'Your Record still Counts!', 'info')
        }
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
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 90%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
