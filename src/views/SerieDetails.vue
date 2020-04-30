<template>
  <v-container>
    <v-parallax
      :src="data.cover"
    >
    </v-parallax>
    <info :data="data"/>
    <Chapter :chapters="chapter" :subtitles="data.subtitles" :name="data.name"/>
  </v-container>
</template>

<script>
import Info from '@/components/Info.vue'
import Chapter from '@/components/Chapter.vue'
export default {
  name: 'SerieDetails',
  components: {
    Info, 
    Chapter
  },
  data(){
    return{
      data: {},
      chapter: {},
    }
  },
  created(){
    this.getInfo();
    this.getChapter();
  },
  methods:{
    async getInfo(){
      try {
        let data = await this.axios.get(`/getApi/getSerie/${this.$route.params.id}`);
        this.data = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getChapter(){
      try {
        let data = await this.axios.get(`chapter/get/${this.$route.params.id}`);
        this.chapter = data.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  }
  
}
</script>
