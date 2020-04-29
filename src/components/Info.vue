<template>
  <div>
    <v-container>
    <v-parallax
      height="300"
      :src="data.cover"
    ></v-parallax>
    <v-card class=" mx-auto">
      <v-container>
        <v-row justify="space-between">

          <!-- Imagen (columna 1) -->
          <v-col align="center" justify="center" cols="auto" sm="4">
            <v-img
              width="250"
              :src="data.thumbnail"
            ></v-img>
          </v-col>
          <!-- Imagen (columna 1) -->

          <!-- Datos serie (Columna 2) -->
          <v-col cols="auto" sm="7">
            <v-row class="flex-column" justify="center" >
              <v-col class="px-0">
                {{data.name}}
                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
              </v-col>

              <v-col class="px-0">
                {{data.description}}
              </v-col>

              <v-col class="px-0">
                Fecha de emisión: {{data.date}}
              </v-col>

              <v-col class="px-0">
                Estado: {{data.status}}
              </v-col>
            </v-row>
          </v-col>
          <!-- Datos serie (Columna 2) -->

          <!-- Nada (Columna 3) -->
          <v-col sm="1"></v-col>
          <!-- Nada (Columna 3) -->
        </v-row>
      </v-container>
    </v-card>

  </v-container>
  </div>
</template>


<script>
export default {
  props: ['data'],
  name: 'Information',
  data(){
    return {
    }
  },
  created(){
  },
  methods:{
    
  }
}
</script>