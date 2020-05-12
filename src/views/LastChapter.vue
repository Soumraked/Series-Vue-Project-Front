<template>
  <v-container>
    <v-card
      class="d-flex flex-wrap justify-space-around"
      flat
      tile
      min-height="200"
    >
      <div v-for="item in seriesData" :key="item.id">
        <Card :serie="item.data"/>
      </div>
    </v-card>
    
  </v-container>
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
    }
  },
  created(){
    this.getData();
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
  },
}
</script>
