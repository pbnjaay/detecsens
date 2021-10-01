<template>
<div class="loader" v-if="loading">Please wait ...</div>
<div v-else>
  <div v-if="!error" class="home container">
    <div class="home__left">
      <div class="header">
        <h1 class="text-muted">Last {{ count }} posts of <a :href="twi">@{{$route.params.userId}}</a></h1>
      </div>
        <div v-for="tweet in tweets" :key="tweet.id" class="block">
        <router-link :to="{name:'reply', params: {tweetId: tweet.id, userId: $route.params.userId }}">
            <tweet :tweet="tweet"/>
        </router-link>
      <!-- <sentiment-chart :score="tweet.score" :id="index" v-show="!visible" /> -->
        </div>
    </div>
    <aside>
      <form action="">
          <h1>Search filter</h1>
        <input type="text" v-model="hashtag" placeholder="hashtag example: senegal">
        <button class="btn" @click="filter()">Search</button>
      </form>
    </aside>
  </div>
  <h1 v-else>{{error}}</h1>
</div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
// import SentimentChart from "@/components/SentimentChart.vue";
import Tweet from '../components/Tweet.vue';

export default {
  name: "Home",
  components: {
    // SentimentChart,
    Tweet
  },
  setup() {
    const tweets = ref([]);
    const count = ref(0);
    const route = useRoute()
    const baseUrl = ref(`http://localhost:5000/api/v1/${route.params.userId}`);
    const visible = ref(false)
    const loading = ref(true)
    const hashtag = ref("");
    const error = ref("")
    const twi = ref(`http://twitter.com/${route.params.userId}`)

    const getTweet = async () => {
      try {
          const res = await axios.get(baseUrl.value);
          loading.value = false;
          tweets.value = res.data.data;
          count.value = res.data.count;
      } catch (err) {
        error.value = err.message;
        loading.value = false;
      }
    };

    const zip = () => {
      this.visible.value = !this.visible.value;
    }

    const filter = async () => {
        loading.value = true;
        const res = await axios.get(baseUrl.value + "/" + hashtag.value);
        loading.value = false;
        tweets.value = res.data.data;
        count.value = res.data.count;
    }
    onMounted(getTweet);

    return { tweets, getTweet, baseUrl, visible, zip, count, loading, hashtag, filter, error, twi };
  },
};
</script>

<style scoped>

.block {
  width: 90vw;
}

@media screen and (min-width: 1024px) {
  .block {
    width: 50vw;
  }

  aside form {
    display: flex;
  }

  .home {
  display: grid;
  grid-template-columns: 0.6fr .4fr;
  /* display: flex;
  flex-direction: row; */
  /* justify-content: center; */
  /* align-items: center; */
}

}

.header h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
}

form > h1 {
  height:  initial;
}

.header {
  height: 5rem;
  border-bottom: 1px solid  rgba(161, 159, 159, 0.19);
  position: sticky;
  background-color: #fff;
  top: 0;
  left: 0;
  z-index: 8;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  margin-bottom: 2rem;
  width: 100%;
}

.home__left {
  border-right: 1px solid  rgba(161, 159, 159, 0.19);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header a {
    margin-left: 9px;
    color: #42b983;
}

.container {
    max-width: 1140px;
    margin: 0 auto;
}

.text-muted {
  color: rgb(161, 159, 159);
}

form {
  display: none;
  position: sticky;
  top: 3rem;
  margin-left: 3rem;
  flex-direction: column;
  padding: 0.9rem 0.9rem;
  border-radius: 9px;
  box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.2);
}
form > input {
  margin-bottom: .9rem;
}

input[type="text"] {
  outline: none;
  border-radius: 9px;
  padding: .7rem .7rem;
  border: none;
  background-color: rgba(161, 159, 159, 0.19);
}
</style>
