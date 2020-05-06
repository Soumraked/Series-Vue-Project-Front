<template>
  <div>
    <div v-if="exist" class="container">
      <h2>{{name}}</h2>
      <d-player :options="options"
        @play="play"
        ref="player">
      </d-player>
      <!-- Inicio chips -->
      <v-chip class="ma-2" color="indigo darken-3" outlined @click="toEpisode(1)" :disabled="disabledLeft">
        <v-icon left>mdi-arrow-left-thick</v-icon> Anterior
      </v-chip>

      <v-chip class="ma-2" color="indigo darken-3" outlined @click="toEpisode(2)">
        <v-icon left>mdi-format-list-checkbox</v-icon> Episodios
      </v-chip>

      <v-chip class="ma-2" color="indigo darken-3" outlined @click="toEpisode(3)" :disabled="disabledRight">
        Siguiente <v-icon right>mdi-arrow-right-thick</v-icon>
      </v-chip>
      <!-- Fin chips -->
    </div>
    <div v-if="!exist" class="container">
      Entrada inválida, vuelva al inicio y verifique la ruta.
    </div>
  </div>
</template>

<script>
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'

export default {
  name: 'SerieVideo',
  components: {
    'd-player': VueDPlayer
  },
  data(){
    return{
      name: '',
      disabledLeft: false,
      disabledRight: false,
      nextChapter: '',
      previousChapter: '',
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
    this.player = null;
  },
  mounted() {
    this.player = this.$refs.player.dp;
  },
  methods:{
    async getInfo(){
      try {
        this.changeVideo = true; //Solución??? Video siguiente no carga
        let data = await this.axios.get(`/chapter/get/${this.$route.params.id}/${this.$route.params.number}`);
        this.data = data.data;
        this.url = data.data.link;
      } catch (error) {
        this.exist = false;
        console.log(error);
      }

      try{
        let data2 = await this.axios.get(`/chapter/get/${this.$route.params.id}`);
        let data3 = data2.data.data;
        let current = data3.indexOf(`${this.$route.params.number}`);
        this.name = data2.data.name + ' ' +data3[current];
        if(data3[current+1]){
          this.nextChapter = data3[current+1];
        }else{
          this.disabledRight = true;
        }

        if(data3[current-1]){
          this.previousChapter = data3[current-1];
        }else{
          this.disabledLeft = true;
        }
        
      }catch{
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
    },
    toEpisode(option){
      switch (option){
        case 1:
          this.$router.push(`/serie/${this.$route.params.id}/${this.previousChapter}`);
          this.$router.go();
          break;
        case 2:
          this.$router.push(`/serie/${this.$route.params.id}`);
          break;
        case 3:
          this.$router.push(`/serie/${this.$route.params.id}/${this.nextChapter}`);
          this.$router.go();
          break;
        default:
          console.log('Error desconocido.');
      }
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