<template>
  <v-container>
    <v-parallax
      :src="data.cover"
    >
    </v-parallax>
    <info :data="data"/>
    <Chapter :chapters="data.chapter" :subtitles="data.subtitles" :name="data.name" :eps="eps"/>
  </v-container>
</template>

<script>
import Info from '@/components/Info.vue'
import Chapter from '@/components/Chapter.vue'

import {mapState} from 'vuex';
import {mapMutations} from 'vuex';
export default {
  name: 'SerieDetails',
  components: {
    Info, 
    Chapter
  },
  data(){
    return{
      data: {},
      eps: true,
    }
  },
  created(){
    // if(!this.save.includes('SerieDetailsView')){
    //   this.getInfo();
    //   this.setSave('SerieDetailsView');
    //   console.log('Guardando datos');
    // }else{
    //   console.log('Cargando datos');
    //   console.log(this.serieDataVuex);
    //   let id = this.$route.params.id;
    //   this.data = this.serieDataVuex.id;
    // }
    this.getInfo();
    
  },
  methods:{
    // ...mapMutations(['setSave','setSerieData']),
    async getInfo(){
      try {
        let data = await this.axios.get('/getApi/getSerie/'+this.$route.params.id);
        this.data = data.data;
        if(data.data.chapter.length == 0){
          this.eps = false;
        }
        this.$store.state.title = data.data.name;
        // let dataAux = data.data;
        // dataAux.id = this.$route.params.id.toString();
        // this.setSerieData(dataAux);
      } catch (error) {
        console.log(error);
      }
    },

  },
  // computed:{
  //   ...mapState(['save','serieDataVuex']),
  // }
  
}
</script>
