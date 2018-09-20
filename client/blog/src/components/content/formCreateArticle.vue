<template>
    <div class="ui segment form">
        <h3 class="ui dividing header">Create new Article</h3>
        <label>Title</label>
        <input type="text" placeholder="Title" v-model="titleVal">
        <label>Story</label>
        <textarea placeholder="Your greatest story.." v-model="bodyVal"></textarea>
        <button class="ui teal button" style="margin-top:10px;" v-on:click="createArticle">Post this article</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'createFormArticle',
  data () {
    return {
      titleVal: '',
      bodyVal: ''
    }
  },
  methods: {
    createArticle () {
      let self = this
      axios({
        method: 'post',
        url: 'http://localhost:3000/articles',
        data: {
          title: this.titleVal,
          body: this.bodyVal
        },
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      })
        .then(response => {
          self.$emit('btn', false)
          self.$emit('resetpage')
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
