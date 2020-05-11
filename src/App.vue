<template>
  <v-app>
    <v-container>
      <Navbar/>

      <v-content>
        <router-view/>
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

  data: () => ({
    //
  }),
  methods:{
    toRedirect(){
      if(this.$router.history.current.fullPath != '/'){
        this.$router.push('/');
      }
    }
  }
};
</script>
