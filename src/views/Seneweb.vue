<template>
<div class="loader" v-if="loading">Please wait ...</div>
<div v-else>
      <div v-if="!error" class="home container">
    <div class="home__left">
      <div class="header">
        <h1 class="text-muted">Last {{ count }} replies of the <a :href="url">article</a> at seneweb</h1>
      </div>
        <div v-for="tweet in tweets" :key="tweet.id" class="block">
            <tweet :tweet="tweet"/>
        </div>
    </div>
    <aside>
        <sentiment-chart :score="score" id="1" class="chart"/>
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
import SentimentChart from "@/components/SentimentChart.vue";
import Tweet from '../components/Tweet.vue';

export default {
  name: "Home",
  components: {
    SentimentChart,
    Tweet
  },
  setup() {
    const tweets = ref([]);
    const count = ref(0);
    const route = useRoute()
    const url = ref(route.params.url);
    const urlaf = url.value.substring(28, route.params.url.length).split("/")
    const baseUrl = ref(`http://localhost:5000/api/v1/seneweb/${urlaf[1]}/${urlaf[2]}`);
    const loading = ref(true)
    const score = ref({})
    const error = ref("")

    const getScore = async () => await axios.get(baseUrl.value + "/avg");

    const getTweet = async () => await axios.get(baseUrl.value);

    const getAll = async () => {
      try {
        const [res, avg] = await Promise.all([getTweet(), getScore()]);
        loading.value = false;
        score.value = avg.data.average;
        tweets.value = res.data.data;
        count.value = res.data.count;
      } catch (err) {
        err = error.message;
        loading.value = false;
      }
    }

    onMounted(getAll);

    return { tweets, getTweet, baseUrl, count, loading, score, getScore, getAll, error, url };
  },
};
</script>

<style scoped>

h1 {
      display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
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

aside {
  display: none;
}

.block {
  width: 90vw;
}

@media screen and (min-width: 1024px) {
  .block {
    width: 50vw;
  }
  aside {
    display: block;
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



.chart {
    position: fixed;
    top: 4rem;
}

.header a {
    margin-left: 9px;
    color: #42b983;
}

.home__left {
  border-right: 1px solid  rgba(161, 159, 159, 0.19);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
    max-width: 1140px;
    margin: 0 auto;
}

.text-muted {
  color: rgb(161, 159, 159);
}

form {
  display: flex;
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
