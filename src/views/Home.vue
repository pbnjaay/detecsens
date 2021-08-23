<template>
  <div class="home">
    <p class="text-muted">{{ count }} results</p>
    <div v-for="(tweet, index) in tweets" :key="index" class="block">
      <div class="tweet" v-show="visible">
        <div class="tweet__header">
          <span>{{ tweet.emoji }} {{ tweet.sentiment }}</span>
          <button @click="zip">switch</button>
        </div>
        <p>{{ tweet.text }}</p>
      </div>
      <sentiment-chart :score="tweet.score" :id="index" v-show="!visible" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { ref, onMounted } from "vue";
import SentimentChart from "@/components/SentimentChart.vue";

export default {
  name: "Home",
  components: {
    SentimentChart,
  },
  setup() {
    const tweets = ref([]);
    const count = ref(0);
    const baseUrl = ref("http://localhost:5000/api/v1/macky_sall");
    const visible = ref(false)

    const getTweet = async () => {
      const res = await axios.get(baseUrl.value);
      tweets.value = res.data.data;
      count.value = res.data.count;
    };

    const zip = () => {
      this.visible.value = !this.visible.value;
    }

    onMounted(getTweet);

    return { tweets, getTweet, baseUrl, visible, zip, count };
  },
};
</script>

<style scoped>

.block {
  width: 90vw;
}
.tweet {
  border-radius: 5px;
  box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.2);
  border: 2px solid transparent;
  margin-bottom: 3rem;
  padding: 1rem 0.6rem;
  cursor: pointer;
}

.tweet__header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

@media screen and (min-width: 1024px) {
  .block {
    width: 50vw;
  }
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text-muted {
  color: rgb(161, 159, 159);
}
</style>
