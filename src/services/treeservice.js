import Api from '@/services/api'

export default {
  fetchTrees () {
    return Api().get('/plantList')
  },
  fetchMyTrees (usertoken) {
    return Api().get(`/myplant/${usertoken}`)
  },
  fetchTreeDetail (name) {
    return Api().get(`/getOneTree/${name}`)
  },
  buyNewTree (id, usertoken) {
    return Api().put(`/buyTree/${usertoken}/${id}`,
      {headers: {'Content-type': 'application/json'}})
  }
}
