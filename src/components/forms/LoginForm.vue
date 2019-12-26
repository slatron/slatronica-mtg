<template lang="html">
  <form v-on:submit.prevent>
    <h2>Login</h2>
    <fieldset>
      <label for="">Username:</label>
      <input type="text" v-model="username">
    </fieldset>
    <fieldset>
      <label for="">Password:</label>
      <input type="password" v-model="password">
    </fieldset>
    <button
      v-on:click="doLogin()"
    >login</button>
  </form>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'LoginForm',
  data: function() {
    return {
      username: '',
      password: '',
      logged_in: this.$store.state.auth.username
    }
  },
  methods: {
    doLogin: function() {
      console.log(' **** inside doLogin ')
      let vm = this
      api.login(this.username, this.password)
        .then(function(response) {
          if (response.data.token) {
            window.localStorage.setItem('token', response.data.token)
            vm.$store.commit('setUsername', {username: vm.username})
            vm.$router.go(-1)
          }
          else {
            window.localStorage.removeItem('token')
            vm.$store.commit('setUsername', {username: ''})
            alert('Error logging in')
          }
          return response.data;
        })
        .catch(function(e) {
          console.error(e)
          alert('Error logging in')
        })
    }
  }
}
</script>

<style lang="css" scoped>
form {
  background-color: #eee;
  margin: 2em auto 0;
  width: 300px;
  padding: 1em;
  border: 1px solid #000;
  border-radius: 0 1rem 1rem 0;
}
@media (min-width: 768px) {
  form {
    width: 500px;
  }
}
form > * {
  margin-bottom: 1em;
}
button {
  padding: 0 1em;
  background: #000;
  color: #ddd;
}
</style>
