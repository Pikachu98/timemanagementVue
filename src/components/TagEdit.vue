<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-tags" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <template v-if="childDataLoaded">
          <tag-form :tag="tag" tagBtnTitle="Update tag"
                    @tag-is-created-updated="updateTag"></tag-form>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TagService from '@/services/tagservice'
import TagForm from '@/components/TagForm'

export default {
  data () {
    return {
      tag: {},
      childDataLoaded: false,
      temp: {},
      messagetitle: 'Update Tag'
    }
  },
  components: {
    'tag-form': TagForm
  },
  created () {
    this.getTag()
  },
  methods: {
    getTag: function () {
      TagService.fetchTag(this.$router.params)
        .then(response => {
          this.temp = response.data
          this.tag = this.temp[0]
          this.childDataLoaded = true
          console.log('Getting Tag in Edit: ' + JSON.stringify(this.tag, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    // updateTag: function (tag) {
    //   console.log('Before PUT ' + JSON.stringify(tag, null, 5))
    //   TagService.putTag(this.$router.params, tag)
    //     .then(response => {
    //       console.log(response)
    //       console.log('After PUT' + JSON.stringify(tag, null, 5))
    //     })
    //     .catch(error => {
    //       this.errors.push(error)
    //       console.log(error)
    //     })
    // }
    updateTag: function (tag) {
      console.log('Before PUT ' + JSON.stringify(tag, null, 5))
      TagService.putTag(this.$router.params, tag)
        .then(response => {
          console.log(response)
          // console.log('After PUT' + JSON.stringify(tag, null, 5))
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
    width: 95%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
