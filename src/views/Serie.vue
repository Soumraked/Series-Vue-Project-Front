<template>
  <div>
    <v-container v-if="!load">
      <v-sheet
        class="d-flex flex-wrap justify-space-around"
      >
        <v-skeleton-loader
          class="my-2 px-2 py-1"
          width="250"
          height="400"
          type="image, image"
          loading
          v-for="n in 20"
          :key="n"
        ></v-skeleton-loader>
      </v-sheet>
    </v-container>
    <v-container v-if="load">
      <v-card
        class="d-flex flex-wrap justify-space-around"
        flat
        tile
        min-height="200"
      >
        <v-layout :wrap='true'>
          <v-flex md3 v-for="item in seriesData" :key="item.id" class="d-flex flex-wrap justify-space-around">
            <Card :serie="item"/>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
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
      load: false
    }
  },
  created(){
    this.$store.state.title = 'Anime';
    console.log(this.$store.state.title)
    this.getData();
  },
  mounted(){
    setTimeout(() => (this.load = true), 1000);
  },
  methods:{
    async getData(){
      try {
        let data = await this.axios.get('/getApi/getSerie');
        let auxData = [];
        for(let i in data.data){
          if(data.data[i].type == 'Anime'){
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
