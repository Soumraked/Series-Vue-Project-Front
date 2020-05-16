<template>
  <v-app>
    <v-container>
      <Navbar/>

      <v-content>
        <router-view v-title="$store.state.title"/>
      </v-content>
      
    </v-container>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',

  components: {
    Navbar,
  },

  data(){
    return{
    }
  },
  methods:{
    toRedirect(){
      if(this.$router.history.current.fullPath != '/'){
        this.$router.push('/');
      }
    }
  }
};
</script>
