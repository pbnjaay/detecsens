<template>
      <div class="tweet">
          <!-- <a class="arrow-link" href="#">Reactions</a> -->
        <span class="tweet__emoji">{{ tweet.emoji }}</span>
        <div class="tweet__header">
            <span class="tweet__sentiment">{{ tweet.sentiment }}</span>
            <p>{{ tweet.text }}</p>
            <div>
                <span class="badge">{{score}}%</span>
                <span class="badge">{{tweet.language}}</span>
            </div>
        </div>
      </div>
</template>

<script>
export default {
    props: {
        tweet: {
            required: true
        }
    },
    data() {
        return{
            score: 0
        }
    },
    mounted() {
        const scores = Object.values(this.tweet.score);
        this.score = (Math.max(...scores) * 100).toFixed(1);
    }
}
</script>

<style scoped>
.tweet {
  display: grid;
  grid-template-columns: 0.1fr 0.9fr;
  border-radius: 5px;
  box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.2);
  border: 2px solid transparent;
  margin-bottom: 3rem;
  padding: 0.4rem 0.9rem 1rem 0.9rem;
  position: relative;
  cursor: pointer;
  color: #2c3e50;
  gap: 0.5rem;
}

@media screen and (min-width: 1024px) {
    .tweet {
        gap: 2rem;
    }
}

.tweet__emoji {
    font-size: 3rem;
}

.tweet__sentiment {
    font-size: 1rem;
    font-weight: 600;
}

.tweet__header {
  display: flex;
  flex-direction: column;
}

/* .arrow-link {
    text-transform: uppercase;
    text-decoration: none;
    color: #42b983;
    font-weight: 600;
    font-size: 0.8rem;
    position: absolute;
    top: 9px;
    right: 30px;
} */

.arrow-link::after {
    content: "\2192";
    margin-left: 3px;
    transition: all 50ms ease;
    position: absolute;
}

.badge {
    text-transform: uppercase;
    background-color: #42b983;
    color: #fff;
    font-weight: 600;
    padding: 0.2rem 0.4rem;
    border-radius: 9px;
    font-size: 0.8rem;
    margin-right: .4rem;
    text-align: center;
}

.arrow-link:hover::after {
    margin-left: 6px;
}
</style>