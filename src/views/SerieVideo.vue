<template>
  <div>
    <v-container v-if="exist">
      
      <VideoPlayer v-if="chargeInfo && chargeChapter" :name="name" :options="options"/>

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
    </v-container>
    <div v-if="!exist" class="container">
      Entrada inválida, vuelva al inicio y verifique la ruta.
    </div>

    <div class="text-center">

      <v-snackbar
        v-model="snackbar"
        :timeout="5000"
      >
        Si el video no comienza prueba recargar la página o reportar el capítulo.
        <v-btn
          color="blue"
          text
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import VideoPlayer from '../components/videoPlayer';

export default {
  name: 'SerieVideo',
  components: {
    VideoPlayer
  },
  data(){
    return{
      snackbar: true,
      name: '',
      styleVideo: 'display: none;',
      disabledLeft: false,
      disabledRight: false,
      nextChapter: '',
      previousChapter: '',
      exist: true,
      options: {
        video: {
          url: ''
        },
      },
      chargeInfo: false,
      chargeChapter: false,
    }
  },
  created(){
    this.getChapters();
    this.getInfo();
  },
  methods:{
    async getInfo(){
      try {
        let data = await this.axios.get(`/chapter/get/${this.$route.params.id}/${this.$route.params.number}`);
        this.data = data.data;
        this.options.video.url = data.data.link;
        this.chargeInfo = true;
      } catch (error) {
        this.exist = false;
        console.log(error);
      }
    },
    async getChapters(){
      try{
        let data2 = await this.axios.get(`/chapter/get/${this.$route.params.id}`);
        let data3 = data2.data.data;
        let current = data3.indexOf(`${this.$route.params.number}`);
        this.name = data2.data.name + ' ' + data3[current];
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
        this.chargeChapter = true;
      }catch{
        this.exist = false;
        console.log(error);
      }
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
    },
  },  
}
</script>