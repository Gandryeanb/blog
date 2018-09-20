<template>
    <div class="ui">
      <div v-if="data.length === 0">
        <div class="content">
          <div class="summary">
            <a> There's no comment</a>
          </div>
        </div>
      </div>
      <div class="content" v-else v-for="(comment, index) in data" v-bind:key="index">
        <div class="summary">
          <div class="ui two column grid">
            <div class="fourteen wide column">
              <a>{{comment.commentator.fname}}</a>
            </div>
            <div class="two wide column">
              <button class="ui orange mini button" v-if="comment.commentator._id === currentUser && log === true" v-on:click="remove(comment._id)">
                Delete
              </button>
            </div>
          </div>
          <div class="date">
            {{new Date(comment.createdAt).getDate()}}-{{new Date(comment.createdAt).getMonth() + 1}}-{{new Date(comment.createdAt).getFullYear()}}
          </div>
        </div>
        <div class="extra text">
          {{comment.body}}
        </div>
        <div><br></div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'comment',
  props: ['data', 'currentUser', 'log'],
  methods: {
    remove (_id) {
      let self = this
      axios({
        url: `http://localhost:3000/comment/${_id}`,
        method: 'delete',
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      })
        .then(response => {
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
