<template>
    <div class="ui items">
        <div class="item" v-for="(article, index) in data" v-bind:key="index">
            <div class="ui small image">
            <img src="../../assets/350x350.png">
            </div>
            <div class="middle aligned content">
            <div class="ui two column grid">
              <div class="row">
                <div class="thirteen wide column">
                  <h2>{{article.title}}</h2>
                </div>
                <div class="three wide column" style="padding-top: 10px;">
                  <div class="">
                    {{article.date.date}} - {{article.date.month}} - {{article.date.year}}
                  </div>
                </div>
              </div>
            </div>
            <div class="description">
                <p>{{article.body}}</p>
            </div>
            <div class="extra">
                <div class="ui right floated small orange button" v-if="currentUserId == article.author._id && isAlreadyLogin" v-on:click="remove(article._id)">
                  delete
                </div>
                <div class="ui right floated small teal button" v-if="currentUserId == article.author._id && isAlreadyLogin" v-on:click="editRedirect(article._id)">
                  edit
                </div>
                <div class="ui right floated small teal button" v-on:click="detail(article._id)">
                  read more
                </div>
            </div>
            </div>
        </div>
        <div>
        </div>
        <div style="margin-bottom: 60px;">
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'cards',
  data () {
    return {
      data: [],
      currentUserId: '',
      isAlreadyLogin: true
    }
  },
  methods: {
    editRedirect (_id) {
      this.$emit(`editArticle`, true)
      this.$router.push({ path: `/list/article/${_id}` })
    },
    remove (_id) {
      let self = this
      axios({
        url: `http://localhost:3000/articles/${_id}`,
        method: 'delete',
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      })
        .then(response => {
          self.$emit('resetpage')
        })
        .catch(response => {
          console.log(response.data)
        })
    },
    detail (_id) {
      this.$router.push({ path: `/list/article/${_id}` })
    },
    getData () {
      let self = this
      axios({
        method: 'get',
        url: 'http://localhost:3000/articles'
      })
        .then(response => {
          self.data = response.data.data
        })
        .catch(response => {
          console.log(response.data)
        })
    },
    whoIsThis () {
      let self = this
      axios({
        url: 'http://localhost:3000/users/data',
        method: 'get',
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      })
        .then(response => {
          self.currentUserId = response.data.data._id
        })
        .catch(response => {
          console.log(response)
        })
    }
  },
  created () {
    let token = window.localStorage.getItem('token')
    this.getData()
    if (token) {
      this.whoIsThis()
    }
  },
  props: ['newdata', 'log'],
  watch: {
    newdata () {
      let token = window.localStorage.getItem('token')
      this.data = this.newdata
      if (token) {
        this.whoIsThis()
      }
    },
    log () {
      this.isAlreadyLogin = this.log
      let token = window.localStorage.getItem('token')
      if (token) {
        this.whoIsThis()
      }
    },
    isAlreadyLogin () {
      if (this.isAlreadyLogin === false) {
        this.currentUserId = ''
      }
    }
  }
}
</script>

<style>

</style>
