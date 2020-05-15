<template>
  <div>
    <v-container :style="skeletonLoader">
      <v-sheet
        class="d-flex flex-wrap justify-space-around"
      >
        <v-skeleton-loader
          class="mx-auto"
          width="275"
          type="card"
          loading
          v-for="n in 24"
          :key="n"
        ></v-skeleton-loader>
      </v-sheet>
    </v-container>
    <v-container fluid :style="chapters">
      <v-card
        class="d-flex flex-wrap justify-space-around"
        flat
        tile
        height="200"
      > 
        <v-row>
          <v-layout :wrap='true'>
            <v-flex md3 v-for="item in seriesData" :key="item.id" class="d-flex flex-wrap justify-space-around">
              <Card :serie="item.data"/>
            </v-flex>
          </v-layout>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/cardChapter.vue'

export default {
  name: 'Anime',
  components: {
    Card
  },
  data(){
    return{
      seriesData: [],
      skeletonLoader: 'display: block;',
      chapters: 'display: none;',
      page_id: 'LastChapter',
      styleDisqus: 'display: block;'
    }
  },
  created(){
    this.getData();
  },
  mounted(){
    setTimeout(() => (this.swap()), 2000);
    
  },
  methods:{
    async getData(){
      try {
        let data = await this.axios.get('/last/get');
        this.seriesData = data.data.slice(0,24);
      } catch (error) {
        console.log(error);
      }
    },
    swap(){
      this.skeletonLoader = 'display: none;';
      this.chapters = 'display: block;';
      this.styleDisqus = 'display: block;';
    },
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 1000)
    },
  },
}
</script>
