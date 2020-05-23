<template>
  <div>
    <d-player
      :options="options"
      ref="player">
    </d-player>
  </div>
</template>

<script>
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'

export default {
  name: 'VideoPlayer',
  components: {
    'd-player': VueDPlayer
  },
  props:['options','styleVideo'],
  data(){
    return{
      player: null,
    }
  },
  created(){
  },
  mounted() {
    this.player = this.$refs.player.dp;
  },
  methods:{
    play(){
      console.log('En play');
    }
  },  
}
</script>

<style>
  .dplayer {
    width: 800px;
    margin: 50px auto;
  }
  body {
    margin: 0;
    padding: 0;
    text-align: center;
  }
  h1 {
    font-size: 54px;
    color: #42b983;
    margin: 30px 0 10px;
  }
  h2 {
    font-size: 22px;
    color: #555;
  }
  @media (max-width: 768px) {
    .dplayer {
      width: 90%;
    }
    h1 {
      font-size: 30px;
    }
    h2 {
      font-size: 16px;
    }
  }
</style>