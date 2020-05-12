<template>
  <v-container>
    <v-card
      class="d-flex flex-wrap justify-space-around"
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

export default {
  name: 'HomeMovie',
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
        let auxData = [];
        for(let i in data.data){
          if(data.data[i].type == 'Película'){
            auxData.push(data.data[i])
          }
        }
        this.seriesData = auxData;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>
