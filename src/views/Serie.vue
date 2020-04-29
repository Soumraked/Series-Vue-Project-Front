<template>
  <v-container>
    <v-card
      class="d-flex flex-wrap justify-space-around"
      color="grey lighten-2"
      flat
      tile
      min-height="200"
    >
      <div v-for="item of seriesData">
        <Card :serie="item"/>
      </div>
    </v-card>
    
  </v-container>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/cardSerie.vue'

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
    this.getData();
  },
  methods:{
    async getData(){
      try {
        let data = await this.axios.get('/getApi/getSerie');
        this.seriesData = data.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
