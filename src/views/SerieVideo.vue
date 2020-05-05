<template>
  <div>
    <div v-if="exist" class="container">
      <d-player :options="options"
        @play="play"
        ref="player">
      </d-player>
    </div>
    <div v-if="!exist" class="container">
      Entrada inválida, vuelva al inicio y verifique la ruta.
    </div>
  </div>
</template>

<script>
import Video from '@/components/Video.vue'

import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'

export default {
  name: 'SerieVideo',
  components: {
    'd-player': VueDPlayer
  },
  data(){
    return{
      url: '',
      exist: true,
      options: {
        video: {
          url: '',
          pic: 'https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/video%2FvideoPlay.JPG?alt=media'
        },
        autoplay: false,
      },
      player: null,
      changeVideo: false,
    }
  },
  created(){
    this.getInfo();
  },
  mounted() {
    this.player = this.$refs.player.dp;
  },
  methods:{
    async getInfo(){
      try {
        let data = await this.axios.get(`/chapter/get/${this.$route.params.id}/${this.$route.params.number}`);
        this.data = data.data;
        this.url = data.data.link;
      } catch (error) {
        this.exist = false;
        console.log(error);
      }
    },
    play() {
      if(!this.changeVideo){
        this.player.switchVideo({
          url: this.url
        });
        this.changeVideo = true;
      }      
    },
    switchHandle() {
      this.player.switchVideo({
        url: this.url
      })
    }
  },  
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    text-align: center;
  }
  a {
    color: #42b983;
    text-decoration: none;
  }
  .dplayer {
    width: 800px;
    margin: 50px auto;
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