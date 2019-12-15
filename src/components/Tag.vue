<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-tags" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
<!--      <button v-on:click="alertDisplay">Click me</button>-->
      <br>
      <div title="You can add your tag by clicking here! " class="fa fa-plus-square fa-2x" style="float: right" @click="createTag">Add Tag</div>
      <br>
      <br>
      <v-client-table :columns="columns" :data="tags" :options="options">
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteTag(props.row._id)"></a>
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editTag(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import TagService from '@/services/tagservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'
import { required } from 'vuelidate/lib/validators'
// import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})
// Vue.use(VueSweetalert2)

export default {
  name: 'Tags',
  data () {
    return {
      tagType: 'Study',
      tagColor: 'white',
      usertoken: '',
      tag: {},
      submitStatus: null,
      messagetitle: ' Tags List ',
      tags: [],
      props: ['_id'],
      errors: [],
      columns: ['_id', 'tagType', 'tagColor', 'remove', 'edit'],
      options: {
        sortable: ['tagType'],
        sortIcon: {
          base: 'fa fas',
          is: 'fa-sort',
          up: 'fa-sort-asc',
          down: 'fa-sort-desc'
        },
        filterable: ['tagType', 'tagColor'],
        headings: {
          _id: 'Tag ID',
          tagType: 'Tag',
          tagColor: 'Color'
        }
      },
      validations: {
        tagType: {
          required
        },
        tagColor: {
          required
        }
      }
    }
  },
  created () {
    this.loadTags()
  },
  methods: {
    // alertDisplay () {
    //   // $swal function calls SweetAlert into the application with the specified configuration.
    //   this.$swal('Heading', 'this is a Heading', 'OK')
    // },
    loadTags: function () {
      TagService.fetchTagOfOne(this.$store.getters['user/user'].uid)
        .then(response => {
          this.tags = response.data.data
          console.log(this.tags)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    deleteTag: function (id) {
      this.$swal({
        title: 'Are you totaly sure?',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result.value)
        if (result.value === true) {
          TagService.deleteTag(id)
            .then(response => {
              this.message = response.data
              console.log(this.message)
              this.loadTags()
              this.$swal('Deleted', 'You successfully deleted this tag' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log('SWAL Else Result : ' + result.value)
          this.$swal('Cancelled', 'Your Tag still Counts!', 'info')
        }
      })
    },
    editTag: function (id) {
      this.$router.params = id
      this.$router.push('tagEdit')
    },
    createTag: function () {
      this.$router.push('createtag')
    },
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var tag = {
            tagType: this.tagType,
            tagColor: this.tagColor,
            usertoken: this.$store.getters['user/user'].uid
          }
          this.tag = tag
          this.submitTag(this.tag)
        }, 500)
      }
    },
    submitTag: function (tag) {
      TagService.postTag(tag)
        .then(response => {
          console.log(response)
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
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
