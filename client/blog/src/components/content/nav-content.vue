<template>
    <div>
        <div class="ui fluid vertical menu">
            <a class="item active">
            <h3>Article List</h3>
            </a>
            <a class="item" v-on:click="homePath">
              All list
            </a>
            <a class="item" v-for="(article, index) in data" v-bind:key="index" v-on:click="redirect(article._id)">
            {{article.title}}
            </a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'navContent',
  data () {
    return {
      data: []
    }
  },
  props: ['dataArticle'],
  watch: {
    dataArticle (val) {
      this.data = val
    }
  },
  methods: {
    redirect (_id) {
      this.$router.push({ path: `/list/article/${_id}` })
    },
    homePath () {
      this.$router.push({ path: `/list` })
    }
  }
}
</script>

<style>

</style>
