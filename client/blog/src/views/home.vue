<template>
    <div class="home">
        <navBar v-bind:statusLogin="isAlreadyLogin" @x="isAlreadyLogin=$event"></navBar>
        <div class="ui grid container" style="margin-top:30px;">
          <div class="three wide center aligned column">
            <div v-if="isAlreadyLogin">
              <button class="ui teal fluid big button" v-on:click="createForm" v-if="!createArticle">Create Form</button>
              <button class="ui teal fluid big button" v-on:click="createForm" v-if="createArticle">Close Form</button>
            </div>
            <navContent style="margin-top:20px;" v-bind:dataArticle="dataArticle"></navContent>
          </div>
          <div class="thirteen wide column">
            <formCreate v-if="createArticle" @btn="createArticle=$event" @resetpage="getData"></formCreate>
            <h1 class="ui disabled dividing header">The Greatest Story from another</h1>
            <router-view v-bind:newdata="dataArticle" v-bind:log ="isAlreadyLogin" @resetpage="getData" @editArticle="editToogle=$event" v-bind:edit="editToogle"></router-view>
          </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import navBar from '@/components/navbar'
import navContent from '@/components/content/nav-content'
import cardView from '@/components/content/cardView'
import formCreate from '@/components/content/formCreateArticle'

export default {
  name: 'home',
  data () {
    return {
      isAlreadyLogin: false,
      createArticle: false,
      dataArticle: [],
      editToogle: false
    }
  },
  methods: {
    createForm () {
      if (this.createArticle) {
        this.createArticle = false
      } else {
        this.createArticle = true
      }
    },
    getData () {
      let self = this
      axios({
        method: 'get',
        url: 'http://localhost:3000/articles'
      })
        .then(response => {
          self.dataArticle = response.data.data
        })
        .catch(response => {
          console.log(response.data)
        })
    }
  },
  created () {
    this.getData()
    this.$router.push({ path: `/list` })
  },
  mounted () {
    let token = window.localStorage.getItem('token')
    if (token) {
      this.isAlreadyLogin = true
    }
  },
  components: {
    navBar, cardView, navContent, formCreate
  }
}
</script>

<style>

</style>
