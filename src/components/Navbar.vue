<template>
  <v-card
    flat
  >
    <v-toolbar >
      
      <a style="color:#000;">
      <v-toolbar-title @click="toRedirect('/')"><span>Monos Otakos</span></v-toolbar-title>
      </a>
      <v-toolbar-items>
          <v-btn text >
            <span>Inicio</span>
          </v-btn>
          <v-btn text @click="toRedirect('/')">
            <span>Animes</span>
          </v-btn>
          <v-btn text>
            <span>En emisión</span>
          </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>

      <v-col cols="12" sm="6" md="3">
        <v-text-field hide-details label="Buscar anime"></v-text-field>
      </v-col>

      

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  methods:{
    toRedirect(route){
      if(this.$router.history.current.fullPath != route){
        this.$router.push(route);
      }
    },
  }
}
</script>