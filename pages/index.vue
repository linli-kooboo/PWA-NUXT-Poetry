<template>
  <section class="container">
    <div>
      <h1 class="title">{{ poetry.title }}</h1>
      <h2
        class="poetry"
        v-html="poetry.content" />
      <div
        class="button button--green"
        @click="fetchPoetry"
      >换一首诗</div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['poetry'])
  },
  created() {
    this.fetchPoetry()
  },
  mounted() {
    this.change()
  },
  methods: {
    ...mapActions({
      fetchPoetry: 'fetchPoetry'
    }),
    change() {
      window.addEventListener('offline',() => this.notifyMe('网络连接已断开，目前使用缓存数据 :)'))
      window.addEventListener('online',() => this.notifyMe('网络已连接，请刷新页面查看数据 :)'))
    },
    notifyMe(content) {
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification")
      }
      // Let's check whether notification permissions have alredy been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(content)
      }
      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== 'denied' || Notification.permission === "default") {
        Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification(content)
          }
        })
      }
    }
  }
}
</script>

<style>
.container {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  display: block;
  font-weight: 300;
  font-size: 24px;
  line-height: 2;
  color: #35495e;
  letter-spacing: 1px;
}

.poetry {
  font-weight: 300;
  font-size: 20px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.button {
  cursor: pointer;
}
</style>
