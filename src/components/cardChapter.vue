<template>
  <div>
  <v-card
      :loading="loading"
      class="my-2 pa-2"
      max-width="275"
      @click="redirectTo(serie.serie, serie.number)"
    >
      <v-img
        class="white--text align-end"
        :src="serie.image"
      ></v-img>
      <!-- <v-card-title>{{serie.name}} {{serie.number}}</v-card-title> -->
      <v-card-text>
        <div class="my-0 subtitle-1">
          <h4 style="color: black;text-align:center;">{{serie.name}} {{serie.number}}</h4>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['serie'],
  name: 'LastChapters',
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
    redirectTo(id, number){
      this.$router.push(`/serie/${id}/${number}`);
    },
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
  }
}
</script>