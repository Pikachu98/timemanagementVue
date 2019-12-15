import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
// import firebaseui from 'firebaseui'

const config = {
  apiKey: 'AIzaSyAVFeNLeP95uB3myvK5Al2bFEZMwJENwTU',
  authDomain: 'test-auth-424d5.firebaseapp.com',
  databaseURL: 'https://test-auth-424d5.firebaseio.com',
  projectId: 'test-auth-424d5',
  storageBucket: 'test-auth-424d5.appspot.com',
  messagingSenderId: '184777134493',
  appId: '1:184777134493:web:aaf814d3b91d4622565f74',
  measurementId: 'G-5H2TXGXENS'
}

const auth = {
  context: null,
  uiConfig: null,
  ui: null,

  init (context) {
    this.context = context

    firebase.initializeApp(config)
    this.uiConfig = {
      signInSuccessUrl: 'alldonations',
      signInOptions: [
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    this.ui = new firebaseui.auth.AuthUI(firebase.auth())

    firebase.auth().onAuthStateChanged((user) => {
      this.context.$store.dispatch('user/setCurrentUser')

      let requireAuth = this.context.$route.matched.some(record => record.meta.requireAuth)
      let guestOnly = this.context.$route.matched.some(record => record.meta.guestOnly)

      if (requireAuth && !user) this.context.$router.push('login')
      else if (guestOnly && user) this.context.$router.push('donations')
    })
  },
  authForm (container) {
    this.ui.start(container, this.uiConfig)
  },
  user () {
    return this.context ? firebase.auth().currentUser : null
  },
  logout () {
    firebase.auth().signOut()
  }
}

export default auth
