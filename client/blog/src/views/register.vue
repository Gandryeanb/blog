<template>
    <div>
        <div class="ui segment">
            <div class="ui menu container">
                <div class="item">
                    <h3>Register</h3>
                </div>
                <a class="item menu right">
                    <router-link to="/">
                        <h4>Already Sing-up</h4>
                    </router-link>
                </a>
            </div>
        </div>
        <div class="ui container text segment" style="margin-top:100px;">
            <h3 class="ui dividing header">Registration Information</h3>
            <div class="ui form" style="margin-top:20px;">
                <div class="two fields">
                    <div class="required field">
                    <label>First Name</label>
                    <input placeholder="First Name" type="text" v-model="fnameVal">
                    </div>
                    <div class="field">
                    <label>Last Name</label>
                    <input placeholder="Last Name" type="text" v-model="lnameVal">
                    </div>
                </div>
            </div>
            <div class="ui form">
                <div class="two fields">
                    <div class="required field">
                    <label>Email</label>
                    <input placeholder="Email" type="text" v-model="emailVal">
                    </div>
                    <div class="required field">
                    <label>Password</label>
                    <input placeholder="Password" type="password" v-model="passVal">
                    </div>
                </div>
            </div>
            <button class="fluid ui teal button" style="margin-top:30px;" v-on:click="register">Sign-up</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'register',
  data () {
    return {
      fnameVal: '',
      lnameVal: '',
      emailVal: '',
      passVal: ''
    }
  },
  methods: {
    register () {
      let self = this
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/register',
        data: {
          fname: this.fnameVal,
          lname: this.lnameVal,
          email: this.emailVal,
          password: this.passVal
        }
      })
        .then(response => {
          self.$router.push('/')
        })
        .catch(response => {
          console.log(response)
        })
    }
  }
}
</script>

<style>

</style>
