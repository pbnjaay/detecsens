<template>
  <canvas :id="id" width="200" height="200"></canvas>
</template>

<script>
import Chart from "chart.js";
import sentimentData from "@/composables/sentiment-data.js"
export default {
    props: {
        score: {
            required: true 
        },
        id: {
            required: true,
            type: Number
        },
    },
    mounted() {
        const ctx = document.getElementById(this.id).getContext('2d');
        new Chart(ctx, sentimentData(this.score));
    }
};
</script>

<style></style>
