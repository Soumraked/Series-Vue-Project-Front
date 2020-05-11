<template>
  <div >
    <v-card
      id="navbar"
      flat
    >
      <v-toolbar >
        
        <a style="color:#000;">
        <v-toolbar-title @click="toRedirect('/')"><span>Monos Otakos</span></v-toolbar-title>
        </a>
        <v-toolbar-items>
            <v-btn text  @click="toRedirect('/')">
              <span>Inicio</span>
            </v-btn>
            <v-btn text @click="toRedirect('/anime')">
              <span>Animes</span>
            </v-btn>
            <v-btn text disabled>
              <span>En emisión</span>
            </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>

        <v-col cols="12" sm="6" md="3">
          <v-text-field hide-details label="Buscar anime (próximamente)"></v-text-field>
        </v-col>

        

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

      </v-toolbar>
    </v-card>

    <div id="navbar2">
      <v-app-bar
        color="white"
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <a style="color:#000;">
          <v-toolbar-title @click="toRedirect('/')"><span>Monos Otakos</span></v-toolbar-title>
        </a>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="toRedirect('/')">Inicio</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="toRedirect('/anime')">Anime</v-list-item-title>
            </v-list-item>

            <v-list-item disabled>
              <v-list-item-icon>
                <v-icon>mdi-monitor-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>En emision</v-list-item-title>
            </v-list-item>

            
              
            

            <v-list-item>
              
              <v-text-field hide-details label="Buscar anime (próximamente)"></v-text-field>
              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      drawer: false,
      group: null,
    }
  },
  methods:{
    toRedirect(route){
      if(this.$router.history.current.fullPath != route){
        this.$router.push(route);
      }
    },
  }
}
</script>

<style>
@media screen and (max-width: 959px) {
  #navbar{
    display: none;
  }
  #navbar2{
    display: block;
  }
}
@media screen and (min-width: 960px) {
  #navbar2{
    display: none;
  }
}
</style>