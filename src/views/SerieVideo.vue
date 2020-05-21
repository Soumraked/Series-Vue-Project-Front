<template>
  <div>
    <div v-if="!charge">
      <v-container>
        <h2 class="pa-0 ma-0 pt-12">Cargando episodio</h2>
        <v-img 
          src='https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/video%2FvideoPlay.JPG?alt=media' 
          class="videoBox"
        ></v-img>
      </v-container>
      
      <div class="text-center">
        <v-overlay :value="true">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </div>
    </div>
    <v-container v-if="exist && charge">
      <h2 class="pa-0 ma-0 pt-12">{{name}}</h2>
           
      <v-img 
        src='https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/video%2FvideoPlay.JPG?alt=media' 
        @click="switchHandle" 
        class="videoBox"
        v-if="charge && changeVideo"
      ></v-img>
      
      <VideoPlayer v-if="charge && !changeVideo" :options="options" :styleVideo="styleVideo"/>

      <v-chip class="ma-2" color="indigo darken-3" outlined @click="toEpisode(1)" :disabled="disabledLeft">
        <v-icon left>mdi-arrow-left-thick</v-icon> Anterior
      </v-chip>

      <v-chip class="ma-2" color="indigo darken-3" outlined @click="toEpisode(2)">
        <v-icon left>mdi-format-list-checkbox</v-icon> Episodios
      </v-chip>

      <v-chip class="ma-2" color="indigo darken-3" outlined @click="toEpisode(3)" :disabled="disabledRight">
        Siguiente <v-icon right>mdi-arrow-right-thick</v-icon>
      </v-chip>

      <!-- Reportar episodio -->
      <v-row justify="center">
        <v-dialog v-model="dialog" scrollable max-width="400px">
          <template v-slot:activator="{ on }">
            
            <v-btn color="indigo darken-3" outlined v-on="on" @click="sendReport = false, dialogm1 = ''">Reportar Episodio<v-icon>mdi-flag-variant</v-icon></v-btn>
          </template>
          <v-card v-if="!sendReport">
            <v-card-title>Reportar capítulo</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 270px;">
              <v-radio-group v-model="dialogm1"  > 
                <v-radio
                  v-for="(item,i) in reportList"
                  :key="i"
                  :label="item"
                  :value="i"
                ></v-radio>
              </v-radio-group>
              <v-text-field autocomplete="off" class="pa-0 ma-0 pt-0" v-if="dialogm1 == '5'" label="Introduce tu observación" v-model="dialogReport" required></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
              <v-btn color="blue darken-1" text @click="report">Enviar</v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-if="sendReport">
            <v-card-title>Reportar capítulo</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 55px;">
              <h3 class="pa-0 ma-0 pt-3">Su reporte a sido ingresado con éxito</h3>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="dialog = false">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- Reportar episodio -->

      <!-- Fin chips -->
    </v-container>
    <div v-if="!exist" class="container">
      Entrada inválida, vuelva al inicio y verifique la ruta.
    </div>

    <!-- Disqus -->
    <v-container >
      <Disqus :id="this.$route.params.id" :number="this.$route.params.number" :exist="exist && charge"/>
    </v-container>
    <!-- Disqus -->
  </div>
</template>

<script>
import VideoPlayer from '../components/videoPlayer';
import Disqus from '@/components/Disqus.vue';

export default {
  name: 'SerieVideo',
  components: {
    VideoPlayer,
    Disqus
  },
  data(){
    return{
      dialogVideo: true,
      charge: false,
      sendReport: false,
      dialogReport: '',
      dialogm1: '',
      dialog: false,
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
        autoplay: true
      },
      changeVideo: true,
      reportList: {
        1: 'No se reproduce el video.',
        2: 'Problemas con los subtitulos.',
        3: 'El reproductor presenta algún error.',
        4: 'No se presenta información en la página.',
        5: 'Otro:'
      }
    }
  },
  created(){
    this.getInfo();
    this.getChapters();
  },
  methods:{
    async report(){
      let message = '';
      if(this.dialogm1 == '5'){
        message = this.dialogReport;
      }else{
        message = this.reportList[this.dialogm1];
      }
      this.sendReport = true;
      let report = await this.axios.post('/report/create',{
        "id": `${this.$route.params.id}`,
        "number": `${this.$route.params.number}`,
        "message": message
      });
    },
    switchHandle() {
      this.changeVideo = false;
      this.styleVideo='display: block;'
    },
    async getInfo(){
      try {
        let data = await this.axios.get(`/chapter/get/${this.$route.params.id}/${this.$route.params.number}`);
        this.data = data.data;
        this.options.video.url = data.data.link;
        this.name = data.data.name + ' ' + this.$route.params.number;
        this.charge = true;
        this.$store.state.title = data.data.name + ' - ' + this.$route.params.number;
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

<style>
  .videoBox {
    width: 800px;
    margin: 50px auto;
  }
  body {
    margin: 0;
    padding: 0;
    text-align: center;
  }
  a {
    color: #42b983;
    text-decoration: none;
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
    .videoBox {
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