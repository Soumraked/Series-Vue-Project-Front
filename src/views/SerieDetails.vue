<template>
  <v-container>
    <info :data="data"/>
  </v-container>
</template>

<script>
import Info from '@/components/Info.vue'
export default {
  name: 'SerieDetails',
  components: {
    Info
  },
  data(){
    return{
      data: {}
    }
  },
  created(){
    this.getInfo();
  },
  methods:{
    async getInfo(){
      try {
        let data = await this.axios.get(`/getApi/getSerie/${this.$route.params.id}`);
        this.data = data.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
  
}
</script>
