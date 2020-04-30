<template>
  <v-container>
    <v-card
      class="d-flex flex-wrap justify-space-around"
      color="grey lighten-2"
      flat
      tile
      min-height="200"
    >
      <div v-for="item in seriesData" :key="item.id">
        <Card :serie="item"/>
      </div>
    </v-card>
    
  </v-container>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/cardSerie.vue'
import {mapState} from 'vuex';
import {mapMutations} from 'vuex';

export default {
  name: 'Home',
  components: {
    Card
  },
  data(){
    return{
      seriesData: [],
    }
  },
  created(){
    if(!this.save.includes('SerieView')){
      this.getData();
      this.setSave('SerieView');
      console.log('Guardando datos');
    }else{
      console.log('Cargando datos');
      this.seriesData = this.seriesDataVuex;
    }
  },
  methods:{
    ...mapMutations(['setSave','setSeriesData']),
    async getData(){
      try {
        let data = await this.axios.get('/getApi/getSerie');
        this.seriesData = data.data;
        this.setSeriesData(data.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed:{
    ...mapState(['save','seriesDataVuex']),
  }
}
</script>
