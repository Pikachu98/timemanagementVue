<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <tag-form :tag="tag" tagBtnTitle="Make Tag" @tag-is-created-updated="submitTag"></tag-form>

        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
    <dfooter></dfooter>
  </div>
</template>

<script>
import TagForm from '@/components/TagForm'
import TagService from '@/services/tagservice'
export default {
  name: 'TagCreate',
  data () {
    return {
      tag: {tagType: '', tagColor: '', usertoken: ''},
      messagetitle: 'Make Tag'
    }
  },
  methods: {
    submitTag: function (tag) {
      if (this.$store.getters['user/user']) {
        tag.usertoken = this.$store.getters['user/user'].uid
      } else {
        tag.usertoken = 'anon'
      }
      TagService.postTag(tag)
        .then(response => {
          console.log('submitTag!')
          console.log('Submitting in submitTag : ' + JSON.stringify(tag, null, 5))
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  },
  components: {
    'tag-form': TagForm
  }
}
</script>

<style scoped>

</style>
