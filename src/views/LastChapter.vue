<template>
  <div>
    <v-container v-if="skeletonLoader">
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
    <v-container v-if="!skeletonLoader">
      <v-card
        class="d-flex flex-wrap justify-space-around"
        flat
        tile
        height="200"
      > 
        <v-layout :wrap='true' >
          <v-flex md3 v-for="item in seriesData" :key="item.id" class="d-flex flex-wrap justify-space-around">
            <Card :serie="item.data"/>
          </v-flex>
        </v-layout>
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
      skeletonLoader: true,
    }
  },
  created(){
    this.getData();
  },
  mounted(){
    setTimeout(() => (this.swap()), 1000);
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
      this.skeletonLoader = false;
    },
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 1000)
    },
  },
}
</script>
