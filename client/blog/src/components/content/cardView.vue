<template>
  <div>
    <div class="ui segment">
      <div class="ui two column grid">
        <div class="row">
          <div class="fourteen wide column">
            <h2  class="ui dividing header">{{data.title}}</h2>
          </div>
          <div class="two wide column">
            <h2>{{date.date}} - {{date.month + 1}} {{date.year}}</h2>
          </div>
        </div>
      </div>
      <a> By : {{author.fname}}</a>
      <P>{{data.body}}</P>
    </div>
    <div v-if="author._id === currentUserId && log">
      <button class="mini ui orange right floated button" v-on:click="remove">Delete</button>
      <button class="mini ui teal right floated button" v-on:click="updateSwitch">Edit</button>
    </div>
    <updateform v-if="updateToggle" v-bind:data="data" @resetpage="getdata" @closeupdate="updateSwitch"></updateform>
    <div style="padding: 0px 10px;">
      Section
      <h3 class="ui dividing header">Comments</h3>
      <comment @resetpage="getdata" v-bind:data="comments" v-bind:currentUser="currentUserId" v-bind:log="isAlreadyLogin"></comment>
    </div>
    <div class="ui form" style="margin-top:20px;">
      <input placeholder="Your comments.." v-bind:readonly="isAlreadyLogin" v-model="commentVal">
    </div>
      <button v-bind:class="{disabled : isAlreadyLogin}" class="ui teal right floated button" style="margin-top:10px; margin-bottom:60px;" v-on:click="addComment">Add comment</button>
  </div>
</template>

<script>
import axios from 'axios'
import updateform from './updateForm.vue'
import comment from './comment.vue'

export default {
  name: 'cardView',
  components: {
    updateform, comment
  },
  data () {
    return {
      data: '',
      currentUserId: '',
      isAlreadyLogin: true,
      updateToggle: false,
      commentVal: '',
      author: '',
      date: '',
      comments: ''
    }
  },
  props: ['id', 'log', 'edit'],
  watch: {
    id () {
      this.updateToggle = false
      let self = this
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/detail/${this.id}`
      })
        .then(response => {
          self.data = response.data.data
          self.author = self.data.author
          self.date = self.data.date
          self.comments = self.data.comments
        })
        .catch(response => {
          console.log(response)
        })
    },
    log () {
      let token = window.localStorage.getItem('token')
      if (token) {
        this.whoIsThis()
      } else {
        this.isAlreadyLogin = false
      }
    }
  },
  created () {
    this.getdata()

    if (this.edit) {
      this.updateToggle = true
      this.$emit(`editArticle`, false)
    }
    let token = window.localStorage.getItem('token')
    if (token) {
      this.whoIsThis()
    }
  },
  methods: {
    addComment () {
      let self = this
      axios({
        url: `http://localhost:3000/comment/${this.id}`,
        method: 'post',
        data: {
          body: this.commentVal
        },
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      })
        .then(response => {
          self.getdata()
        })
        .catch(response => {
          console.log(response)
        })
    },
    getdata () {
      let self = this
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/detail/${this.$router.currentRoute.params.id}`
      })
        .then(response => {
          self.data = response.data.data
          self.author = self.data.author
          self.date = self.data.date
          self.comments = self.data.comments
        })
        .catch(response => {
          console.log(response)
        })
    },
    updateSwitch () {
      if (this.updateToggle) {
        this.updateToggle = false
      } else {
        this.updateToggle = true
      }
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
          this.isAlreadyLogin = true
          self.currentUserId = response.data.data._id
        })
        .catch(response => {
          console.log(response)
        })
    },
    remove () {
      let self = this
      axios({
        url: `http://localhost:3000/articles/${this.id}`,
        method: 'delete',
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      })
        .then(response => {
          self.$emit('resetpage')
          self.$router.push({ path: `/list` })
        })
        .catch(response => {
          console.log(response.data)
        })
    }
  }
}
</script>

<style>

</style>
