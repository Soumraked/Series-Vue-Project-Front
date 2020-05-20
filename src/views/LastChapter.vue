<template>
  <div>
    <!-- Esqueleto de inicio -->
    <v-container :style="skeletonLoader" fluid>
      <v-layout :wrap='true'>
        <v-flex lg3 v-for="n in 24" :key="n" >
          <v-col class="d-flex flex-wrap justify-space-around">
            <v-skeleton-loader
              class="mx-auto"
              width="264"
              type="card"
              loading
            ></v-skeleton-loader>
          </v-col>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- Esqueleto de inicio -->

    <!-- Mostrar últimos capítulos agregados -->
    <v-container fluid :style="chapters">
      <v-card
        class="d-flex flex-wrap justify-space-around"
        flat
        tile
        height="200"
      > 
        <v-row>
          <v-layout :wrap='true'>
            <v-flex lg3 v-for="item in seriesData" :key="item.id">
              <v-col class="d-flex flex-wrap justify-space-around">
                <Card :serie="item.data"/>
              </v-col>
            </v-flex>
          </v-layout>
        </v-row>
      </v-card>
    </v-container>
    <!-- Mostrar últimos capítulos agregados -->
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
    }
  },
  created(){
    this.getData();
    this.$store.state.title = 'Monos Otakos';
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
      this.skeletonLoader = 'display: none;';
      this.chapters = 'display: block;';
    },
  },
}
</script>
