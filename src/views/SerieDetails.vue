<template>
  <v-container>
    <div v-if="exist">
      <v-parallax
        :src="data.cover"
      >
      </v-parallax>
      <info :data="data"/>
      <Chapter :chapters="data.chapter" :subtitles="data.subtitles" :name="data.name" :eps="eps"/>
    </div>
    <div v-if="!exist" class="container" align="center">
      Entrada inavlida, verifique la ruta o vuelva al inicio.
    </div>
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
      exist: true,
    }
  },
  created(){
    this.getInfo();
  },
  methods:{
    async getInfo(){
      try {
        let data = await this.axios.get('/getApi/getSerie/'+this.$route.params.id);
        this.data = data.data;
        if(data.data.chapter.length == 0){
          this.eps = false;
        }
        this.$store.state.title = data.data.name;
      } catch (error) {
        this.exist = false;
        console.log(error);
      }
    },

  },
}
</script>
