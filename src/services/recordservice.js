import Api from '@/services/api'

export default {
  createRecord (record) {
    return Api().post('/addRecord', record, { headers: {'Content-type': 'application/json'} })
  },
  fetchRecord (usertoken, id) {
    return Api().get(`/records/${usertoken}/${id}`)
  },
  putRecord (usertoken, id, record) {
    console.log('REQUESTING ' + record._id + ' ' + record.usertoken + ' ' + JSON.stringify(record, null, 5))
    return Api().put(`/records/${usertoken}/${id}`, record,
      { headers: {'Content-type': 'application/json'} })
  },
  fetchOneUserRecord (usertoken) {
    return Api().get(`/recordsOfOne/${usertoken}`)
  },
  deleteOneRecord (id) {
    return Api().delete(`/records/${id}`)
  },
  fetchUserCoins (usertoken) {
    return Api().get(`/getCoinBalance/${usertoken}`)
  }
}
