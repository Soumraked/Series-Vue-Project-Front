<template>
  <div>
  <v-card
      :loading="loading"
      class="my-2 pa-2"
      max-width="250"
      @click="redirectTo(serie.id)"
    >
      <v-img
        class="white--text align-end"
        :src="serie.image"
      ></v-img>

      <v-card-title>{{serie.name}}</v-card-title>

      <v-card-text>
        <div class="my-0 subtitle-1">
          {{serie.type}}
          {{serie.year}}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['serie'],
  name: 'SerieDetails',
  data(){
    return{
      loading: false,
      selection: 1,
    }
  },
  created(){
    this.reserve();
  },
  methods:{
    redirectTo(url){
      this.$router.push('/serie/'+url);
    },
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
  }
}
</script>