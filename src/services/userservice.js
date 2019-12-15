import Api from '@/services/api'

export default {
  fetchUser (usertoken) {
    return Api().get(`/findUser/${usertoken}`)
  },
  createUser (user) {
    return Api().post(`/userCreate`, user,
      { headers: {'Content-type': 'application/json'} })
  },
  findUser (userName) {
    return Api().get(`/addFriend/${userName}`)
  }
}
