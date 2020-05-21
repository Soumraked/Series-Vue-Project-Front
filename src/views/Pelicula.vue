<template>
  <div>
    <!-- Esqueleto de inicio -->
    <v-container :style="skeletonLoader" fluid>
      <v-layout :wrap='true'>
        <v-flex lg3 v-for="n in 24" :key="n" >
          <v-col class="d-flex flex-wrap justify-space-around">
            <v-skeleton-loader
              class="my-2 px-2 py-1"
              width="250"
              height="400"
              type="image, image"
              loading
            ></v-skeleton-loader>
          </v-col>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- Esqueleto de inicio -->

    <v-container fluid :style="movies">
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

    <!-- Anime -->
    <v-container fluid :style="movies">
      <v-card
        class="d-flex flex-wrap justify-space-around"
        flat
        tile
        height="200"
      > 
        <v-row>
          <v-layout :wrap='true'>
            <v-flex xl3 v-for="(item,index) in seriesData" :key="index" class="d-flex flex-wrap justify-space-around">
              <v-col class="d-flex flex-wrap justify-space-around">
                <div v-if="index = 23" style="display: none;" v-text="swap()"></div>
                <Card :serie="item"/>
              </v-col>
            </v-flex>
          </v-layout>
        </v-row>
      </v-card>
    </v-container>
    <!-- Anime -->
    
  </div>
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
      skeletonLoader: 'display: block;',
      movies: 'display: none;',
    }
  },
  created(){
    this.$store.state.title = 'Peliculas';
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
    swap(){
      this.skeletonLoader = 'display: none;';
      this.movies = 'display: block;';
    },
  },
}
</script>
