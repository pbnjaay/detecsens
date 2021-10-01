<template>
<div class="home">
<div class="form container">
      <form @submit.prevent="analyse">
        <h1>Analyse <a href="https://www.seneweb.com/" target="_blank">seneweb</a> article</h1>
        <input type="text" v-model="url" name="" id="" placeholder="url example: https://www.seneweb.com/news/xxx.html">
        <router-link :to="{name: 'seneweb', params: {url: url}}" class="btn" >Analyse</router-link>
      </form>
</div>
</div>
</template>

<script>
// @ is an alias to /src
import { ref } from "vue";
import { useRouter } from 'vue-router'
import Tweet from '../components/Tweet.vue';

export default {
  name: "Home",
  components: {
    Tweet
  },
  setup() {
    const url = ref("");
    const router = useRouter();
    const analyse = () => {
      router.push({name:  'seneweb', params: {url: url.value}})
    }
    return {url, analyse, router, analyse };
  },
};
</script>

<style scoped>
.header {
  height: 4rem;
  border-bottom: 1px solid  rgba(161, 159, 159, 0.19);
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

@media screen and (min-width: 1024px) {
  .block {
    width: 50vw;
  }
}

.list {
  list-style: none;
  display: flex;
}

.list__item {
  margin-right: 3rem;
}

h1 a {
  color: #42b983;
}


.form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 89vh;
  width: 100vw;
}

  form {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: .6rem .7rem;
    border-radius: 9px;
    box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.2);
  }
@media screen and (min-width: 1024px) {
  .form {
    width: 40vw;
  }

  form {
    padding: 1rem 2rem; 
  }
}

.home__left {
  border-right: 1px solid  rgba(161, 159, 159, 0.19);
}

.container {
    max-width: 1140px;
    margin: 0 auto;
}


form > input, textarea, select {
  margin-bottom: 2rem;
}

input[type="text"], select {
  outline: none;
  border-radius: 40px;
  padding: .9rem .7rem;
  border: none;
  background-color: rgba(161, 159, 159, 0.19);
}

textarea {
  outline: none;
  border-radius: 9px;
  padding: .9rem .7rem;
  border: none;
  background-color: rgba(161, 159, 159, 0.19);
}
</style>
