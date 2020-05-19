<template>
  <div >
    <!-- Navbar -->
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
            <v-btn text @click="toRedirect('/pelicula')">
              <span>Peliculas</span>
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

        
        <!-- Menu User -->
        <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn 
            icon
            v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list v-if="!this.$session.exists()">
          <v-list-item @click="signIn()">
            <v-list-item-title>Sign In</v-list-item-title>
          </v-list-item>
          <v-list-item @click="signUp()">
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list v-if="this.$session.exists()">
          <v-list-item>
            <v-list-item-title>{{this.$session.get('nickname')}}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="toRedirect('/admin')" v-if="this.$session.id() == 'sess:admin'">
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>
          <v-list-item disabled>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="signout()">
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- Menu User -->

      <!-- Dialog Sign In -->
      <v-dialog
        v-model="dialogSignIn"
        width="500"
      >
        <v-card
          class="mx-auto"
          max-width="500"
        >
          <v-card-title class="title font-weight-regular justify-space-between">
            <span>Sign In</span>
          </v-card-title>
  
          <v-window>

            <v-window-item>
              <v-card-text>
                <v-text-field
                  label="Nickname"
                  type="text"
                  autocomplete="off"
                  v-model="nicknameUser"
                ></v-text-field>
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="passwordUser"
                ></v-text-field>
                <span class="caption grey--text text--darken-1">
                  {{mesajeAccount}}
                </span>
              </v-card-text>
            </v-window-item>

          </v-window>
          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              text
              @click="dialogSignIn = false"
            >
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              depressed
              @click="enter()"
            >
              Enter
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Dialog Sign In -->

      <!-- Dialog Sign Up -->
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card
          class="mx-auto"
          max-width="500"
        >
          <v-card-title class="title font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
            <v-avatar
              color="primary lighten-2"
              class="subheading white--text"
              size="24"
              v-text="step"
            ></v-avatar>
          </v-card-title>
  
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-card-text>
                <v-text-field
                  label="Nickname"
                  v-model="nickName"
                ></v-text-field>
                <span class="caption grey--text text--darken-1">
                  {{mesajeAccount}}
                </span>
              </v-card-text>
            </v-window-item>
            

            <v-window-item :value="2">
              <v-card-text>
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="password"
                ></v-text-field>
                <v-text-field
                  label="Confirm Password"
                  type="password"
                  v-model="passwordConfirm"
                ></v-text-field>
                <span class="caption grey--text text--darken-1">
                  {{mesajeAccount}}
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="3">
              <div class="pa-4 text-center">
                <v-img
                  class="mb-4"
                  contain
                  height="128"
                  src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/nekoAvatar.jpg?alt=media"
                ></v-img>
                <h3 class="title font-weight-light mb-2">Welcome to Monos Otakos</h3>
                <span class="caption grey--text">Thanks for signing up!</span>
              </div>
            </v-window-item>
          </v-window>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              :disabled="step === 1 || step === 3"
              text
              @click="stepOption('-')"
            >
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="step === 3"
              text
              @click="dialog = false"
            >
              Continuar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="step === 3"
              color="primary"
              depressed
              @click="stepOption('+')"
            >
              Next
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Dialog Sign Up -->

      </v-toolbar>
    </v-card>
    <!-- Navbar -->

    <!-- Navbar Responsive -->
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
              <v-list-item-title @click="toRedirect('/anime')">Animes</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-movie</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="toRedirect('/pelicula')">Películas</v-list-item-title>
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
    <!-- Navbar Responsive -->
  </div>
</template>

<script>
export default {
  data(){
    return{
      drawer: false,
      group: null,
      dialog: false,
      step: 1,
      nickName: '',
      password: '',
      passwordConfirm: '',
      validNickName: false,
      validPassword: true,
      dialogSignIn: false,
      nicknameUser: '',
      passwordUser: '',
      users: [],
      mesajeAccount: ''
    }
  },
  computed: {
    currentTitle () {
      switch (this.step) {
        case 1: return 'Sign-up'
        case 2: return 'Create a password'
        default: return 'Account created'
      }
    },
  },
  created(){
    console.log(this.$session.id());
    console.log(this.$session.get('nickname'));
    this.getUsers();
  },
  methods:{
    async getUsers(){
      let data = await this.axios.get(`/auth/get`);
      this.users = data.data;
    },
    toRedirect(route){
      if(this.$router.history.current.fullPath != route){
        this.$router.push(route);
        this.$emit('update:title', route)
      }
    },
    stepOption(option){
      if(option == '+'){
        if(this.step == 1 && this.nickName != ''){
          if(this.nickName.length >= 3){
            if(!this.users.includes(this.nickName.toString().toLowerCase())){
              this.mesajeAccount = 'Las contraseñas deben tener un mínimo de 6 caracteres..'
              this.step++;
            }else{
              this.mesajeAccount = 'El apodo ya se encuentra utilizado';
              console.log('El apodo ya se encuentra utilizado');
            }
          }else{
            this.mesajeAccount = 'El apodo debe tener más de 3 caracteres';
            console.log('El apodo debe tener más de 3 caracteres');
          }    
        }else if(this.step == 2 && this.password != '' && this.passwordConfirm != ''){
          if(this.password == this.passwordConfirm){
            if(this.password.length >= 6){
              this.enterUser();
              this.mesajeAccount = '';
              this.step++;
              this.$session.start();
              this.$session.renew('user');
              this.$session.set('nickname',this.nickName.toString());
              location.reload();
            }else{
              this.mesajeAccount = 'Las contraseñas deben tener como mínimo 6 caracteres.';
              console.log('Las contraseñas deben tener como mínimo 6 caracteres.');
            }
          }else{
            this.mesajeAccount = 'Las contraseñas no coinciden.';
            console.log('Las contraseñas no coinciden.');
          }
          
        }        
      }else if(option == '-'){
        this.mesajeAccount = '';
        this.step--;
      }
    },
    async enterUser(){
      try {
        let data = await this.axios.post('/auth/create',{
          "nick": this.nickName.toString(),
          "password": this.password.toString(),
          "passwordConfirm": this.passwordConfirm.toString(),
          "position": "user"
        });
        console.log('User successfully created.');
      } catch (error) {
        console.log(error)
      }
    },
    signout(){
      this.nicknameUser = '';
      this.passwordUser = '';
      this.$session.destroy();
      location.reload();
    },
    signUp(){
      this.dialog = true;
      this.mesajeAccount = 'El nombre de usuario debe tener 3 o más caracteres.'
    },
    signIn(){
      this.dialogSignIn = true;
      this.mesajeAccount = 'Introduzca sus credenciales para continuar.'
    },
    async enter(){
      if(this.nicknameUser == '' || this.passwordUser == ''){
        this.mesajeAccount = 'Complete los campos antes de continuar.';
      }else{
        let data = await this.axios.post('https://us-central1-monosotakos.cloudfunctions.net/api/auth/login',
        {
          "nick": this.nicknameUser.toString(),
	        "password": this.passwordUser.toString()
        });
        if(data.data.message == "Wrong password, try again."){
          this.mesajeAccount = 'Contraseña incorrecta, intente nuevamente.';
        }else if(data.data.message == "User entered does not exist, try again."){
          this.mesajeAccount = 'El usuario ingresado no existe, verifique la información e intente nuevamente.';
        }else if(data.data.message == "Login"){
          this.mesajeAccount = 'Datos validados.';
          this.$session.start();
          this.$session.renew(data.data.position);
          this.$session.set('nickname', data.data.nickname);
          this.dialogSignIn = false;
          location.reload();
        }else{
          this.mesajeAccount = 'Error desconocido, intente nuevamente o contáctese con el administrador.';
        }
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