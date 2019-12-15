<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-clock-o" style="padding: 3px"></i>{{messagetitle}}</h3>
<!--    <form @submit.prevent="submit">-->
    <div style="align-items: center; justify-content: center;">
      <div>
        <h3 v-if="status == true">Input the time you want to be focus(in minutes)</h3>
        <input placeholder="enter integer focusing time in mins" v-if="status == true" v-model="suppFocusTime1" style="width:40%; height:10%">
  <!--      <input placeholder="enter the tree type"-->
      </div>
      <h3 v-if="status == true">A tree type is required</h3>
      <select required v-model="selectedTreeType" v-if="status == true" style="width:40%; height:10%">
        <option v-for="tree in userTrees" :key="tree.treeName">
          {{ tree.treeName }}
        </option>
      </select>
      <h3 v-if="status == true">If you want, choose your tag</h3>
      <select required v-model="selectedTag" v-if="status == true" style="width:40%; height:10%">
        <option v-for="tag in userTags" :key="tag.tagType">
          {{ tag.tagType }}
        </option>
      </select>
      <div>
        <h3 v-if="status == true">Give some description about your concentration: </h3>
        <textarea v-model="recordDescription" v-if="status == true" placeholder="please enter some description here" rows="3" columns="10" style="width:40%; height:10%"></textarea>
      </div>

      <button type="submit" @click="submit" v-if="status == true">start</button>
    </div>

    <h3 v-if="status == false">{{parseInt(this.suppFocusTime1)}} mins to plant a {{this.selectedTreeType}} start</h3>
<!--    <button @click="loadUserTags"></button>-->
    <h3 v-if="status == false">Tag: {{this.selectedTag}}</h3>
    <h3 v-if="status == false">Description: {{this.recordDescription}}</h3>

    <h2 v-if = "hStatus == false">You have failed to be focusing, want to restart? Refresh again!</h2>

      <button class="btnStop" v-if="btnStatus == false" @click="stopClick"> STOP </button>
      <br>
      <br>

      <div class="timer">
<!--        v-if="this.suppFocusTime2 > 0"-->
        <circular-count-down-timer v-if="countdownStatus==false" :initial-value=parseInt(this.suppFocusTime2) @finish="finished"></circular-count-down-timer>
      </div>
    <!--    </form>-->
  </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import RecordService from '@/services/recordservice'
import UserService from '@/services/userservice'
import TagService from '@/services/tagservice'

Vue.use(Vuelidate)

export default {
  name: 'Timer',
  data () {
    return {
      user: {usertoken: '', userName: '', userCoins: 0},
      messagetitle: ' Set a timer ',
      message: '',
      startTime: '',
      endTime: '',
      recordDescription: '',
      suppFocusTime1: '',
      suppFocusTime2: 0,
      realFocusTime: '',
      usertoken: '',
      coins: '',
      record: {},
      selectedTreeType: '',
      selectedTag: '',
      userTrees: [],
      userTags: [],
      errors: [],
      submitStatus: null,
      status: true,
      countdownStatus: true,
      btnStatus: true,
      hStatus: true
    }
  },
  created () {
    // this.findUser(this.user)
    this.loadUserTrees()
  },
  methods: {
    loadUserTrees: function () {
      UserService.fetchUser(this.$store.getters['user/user'].uid)
        .then(response => {
          this.loadUserTags()
          var treeAmount = response.data.data[0].tree.length
          for (var i = 0; i < treeAmount; i++) {
            var newTree = {}
            newTree.treeName = response.data.data[0].tree[i]
            this.userTrees.push(newTree)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadUserTags: function () {
      TagService.fetchTagOfOne(this.$store.getters['user/user'].uid)
        .then(response => {
          console.log(response.data.data[0].tagType + '看看输出个啥')
          var tagArray = response.data.data.length
          for (var i = 0; i < tagArray; i++) {
            var newTag = {}
            newTag.tagType = response.data.data[i].tagType + ' ' + response.data.data[i].tagColor
            this.userTags.push(newTag)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    submit () {
      this.suppFocusTime2 = this.suppFocusTime1 * 60
      var record = {
        // usertoken: this.usertoken,
        suppFocusTime: this.suppFocusTime1,
        tree: this.selectedTreeType,
        recordDescription: this.recordDescription,
        tag: this.selectedTag
      }
      var user = {
      }
      if (this.$store.getters['user/user']) {
        record.usertoken = this.$store.getters['user/user'].uid
        user.usertoken = this.$store.getters['user/user'].uid
      } else {
        record.usertoken = 'anon'
      }
      this.record = record
      this.user = user
      // console.log('进submit方法了 : ' + JSON.stringify(this.record, null, 5))
      // this.findUser(this.user)
      this.submitRecord(this.record)
      this.status = false
      this.countdownStatus = false
      this.btnStatus = false
    },
    submitRecord: function (record) {
      // record = JSON.stringify(record)
      RecordService.createRecord(record)
        .then(response => {
          // console.log('submitRecord!')
          console.log('进submitRecord方法了 : ' + JSON.stringify(record))
          console.log(JSON.stringify(response.data) + '能否获取到')
          this.record = response.data.data
          console.log('提交方法' + JSON.stringify(this.record))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },

    stopClick: function () {
      this.$swal({
        title: 'Are you sure to quit? ',
        text: 'Forget your dream? ',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK, I give up',
        cancelButtonText: 'I can do it!',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result.value)
        if (result.value === true) {
          console.log('在传送给修改方法之前' + JSON.stringify(this.record))
          this.status = false
          this.countdownStatus = true
          this.btnStatus = true
          this.hStatus = false
          RecordService.putRecord(this.record.usertoken, this.record._id, this.record)
            .then(response => {
              this.message = response.data
              console.log(this.message)
              this.$swal('Timer stopped! Hope you can insist on next time! ', 'You got ' + response.data.data.coins + 'coins')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong, please try again! ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log('SWAL Else Result : ' + result.value)
          this.$swal('Come on! ', 'You are the best!', 'info')
        }
      })
    },

    changeRecord: function (usertoken, id, record) {
      console.log('Before PUT ' + JSON.stringify(record, null, 5))
      RecordService.putRecord(usertoken, id, record)
        .then(response => {
          console.log(response)
          // console.log('After PUT' + JSON.stringify(tag, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },

    finished: () => {
      console.log('finished')
      this.suppFocusTime2 = 0
      // RecordService.putRecord(){
    }
  }
  // updated: (status) => {
  //   console.log(status) // {"value": 144, "seconds": 24, "minutes": 2, "hours": 0}
  // }

}

</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  .timer {
    align-items: center;
    width: 50%;
    height: 30%
  }
  .btnStop {
    background: orangered;
    border: none;
    color: white;
  }
</style>
