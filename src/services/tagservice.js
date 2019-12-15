import Api from '@/services/api'

export default {
  fetchTags () {
    return Api().get('/getTags')
  },
  deleteTag (id) {
    return Api().delete(`/deleteTag/${id}`)
  },
  // get tag by id
  fetchTag (id) {
    return Api().get(`/getTag/${id}`)
  },
  putTag (id, tag) {
    console.log('REQUESTING' + tag._id + '' +
      JSON.stringify(tag, null, 5))
    return Api().put(`/tagEdition/${id}`, tag,
      {headers: {'Content-type': 'application/json'}})
  },
  postTag (tag) {
    return Api().post(`/tagCreation`, tag,
      { headers: {'Content-type': 'application/json'} })
  },
  fetchTagOfOne (usertoken) {
    return Api().get(`/tagsOfOne/${usertoken}`)
  }
}
