<template>
  <v-container>
    <v-parallax
      :src="data.cover"
    >
    </v-parallax>
    <info :data="data"/>
    <Chapter :chapters="data.chapter" :subtitles="data.subtitles" :name="data.name"/>
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
