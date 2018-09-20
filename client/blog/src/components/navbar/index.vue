<template>
    <div class="ui segment">
        <div>
            <div class="ui menu">
                <div class="header item">
                    <h2>Blogtivate</h2>
                </div>
                <div class="right menu" v-if="!isAlreadyLogin">
                    <div class="item">
                        <div class="ui input">
                            <input placeholder="Email" type="text" v-model="emailLoginVal">
                        </div>
                    </div>
                    <div class="item">
                        <div class="ui input">
                            <input placeholder="Password" type="password" v-model="passLoginVal">
                        </div>
                    </div>
                <a class="item" v-on:click="login">
                    <h4>Login</h4>
                </a>
                    <router-link to="/register" class="item">
                        <h4>register</h4>
                    </router-link>
                </div>
                <div class="right menu" v-if="isAlreadyLogin" v-on:click='logout'>
                    <a class="item">
                        <h4>Logout</h4>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'navBar',
  data () {
    return {
      isAlreadyLogin: false,
      emailLoginVal: '',
      passLoginVal: ''
    }
  },
  props: ['statusLogin'],
  watch: {
    statusLogin (val) {
      this.isAlreadyLogin = val
    }
  },
  methods: {
    login () {
      let self = this
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: {
          email: this.emailLoginVal,
          password: this.passLoginVal
        }
      })
        .then(response => {
          self.emailLoginVal = ''
          self.passLoginVal = ''
          self.isAlreadyLogin = true
          let token = response.data.authorization
          window.localStorage.setItem('token', token)
          self.$emit('x', true)
        })
        .catch(response => {
          console.log('failed when login')
        })
    },
    logout () {
      window.localStorage.removeItem('token')
      this.isAlreadyLogin = false
      this.$emit('x', '')
    }
  }
}
</script>

<style>

</style>
