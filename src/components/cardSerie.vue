<template>
  <div>
    <v-card
      class="my-2 px-2 py-1"
      max-width="250"
      @click="redirectTo(serie.id)"
      :loading="loading"
    >
      <v-img
        class="white--text align-end"
        :src="serie.image"
        height="350"
      ></v-img>

      <v-card-text>
        <div class="my-0 subtitle-1">
          <h3 style="color: black;">{{serie.name}}</h3>
          <p>{{serie.type}} {{serie.year}}</p>
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

      setTimeout(() => (this.loading = false), 1000)
    },
  }
}
</script>