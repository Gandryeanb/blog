<template>
    <div>
        <div class="ui segment form" style="margin-top: 60px; margin-bottom: 20px;">
            <h3 class="ui dividing header">Update Article</h3>
            <label>Title</label>
            <input type="text" v-model="titleVal">
            <label>Story</label>
            <textarea v-model="bodyVal"></textarea>
        <button class="ui teal button" style="margin-top:10px;" v-on:click="updateArticle">Update</button>
    </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'updateForm',
  props: ['data'],
  data () {
    return {
      titleVal: this.data.title,
      bodyVal: this.data.body
    }
  },
  watch: {
    data () {
      this.titleVal = this.data.title
      this.bodyVal = this.data.body
    }
  },
  methods: {
    updateArticle () {
      let self = this
      axios({
        url: `http://localhost:3000/articles/${this.data._id}`,
        method: 'put',
        data: {
          title: this.titleVal,
          body: this.bodyVal
        },
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      })
        .then(response => {
          self.$emit('resetpage')
          self.$emit('closeupdate')
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
