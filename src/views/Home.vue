<template>
<div class="home">
<div class="form container">
      <form>
        <input type="text" v-model="user" name="" id="" placeholder="user example: POTUS">
        <router-link :to="{name: 'result', params: {userId: user, hashtag:hashtag }}" class="btn" >Analyse</router-link>
      </form>
</div>
</div>
</template>

<script>
// @ is an alias to /src
import { ref, onMounted } from "vue";
import Tweet from '../components/Tweet.vue';

export default {
  name: "Home",
  components: {
    Tweet
  },
  setup() {
    const user = ref("");
    const hashtag = ref("");

    return {user, hashtag };
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
    width: 30vw;
  }

  form {
    padding: 2rem 3rem; 
  }
}

.home__left {
  border-right: 1px solid  rgba(161, 159, 159, 0.19);
}

.container {
    max-width: 1140px;
    margin: 0 auto;
}


form > input, textarea {
  margin-bottom: 2rem;
}

input[type="text"] {
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
