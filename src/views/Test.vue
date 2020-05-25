<template>
  <div>
    <v-container>
      <v-file-input multiple v-model="file" label="File input" outlined dense></v-file-input>
      <v-btn depressed color="primary" @click="cargar">Cargar</v-btn>
      <v-divider></v-divider>
      <v-btn depressed color="secondary" @click="create">Crear</v-btn>
      <input type="text" v-model="txt">
      <v-btn @click="ver">Ver</v-btn>
    </v-container>
  </div>
</template>

<script>
import { throws } from 'assert';
export default {
  data(){
    return{
      file: null,
      series: [],
      text: '',
      txt: '',
    }
  },
  created(){
    this.getInfo();
    //this.create();
  },
  methods:{
    ver(){
      const pattern = new RegExp('^[A-Z,0-9]+$', 'i');
      console.log(pattern.test(this.txt))
    },
    async getInfo(){
      let data = await this.axios.get('/serie/get');
      this.series = data.data;
    },
    create(){
      var FileSaver = require('file-saver');
      var JSZip = require('jszip');
      var zip = new JSZip();
      var data = zip.folder("Data");
      for(let i in this.series){
        let content = JSON.stringify(this.series[i]['data']);
        var blob = new Blob([content], {type: "json  ;charset=utf-8"});
        var nameAux = this.series[i]['data'].name + ".json";
        var name = nameAux.replace('/','');
        data.file( name, blob, {type: "json  ;charset=utf-8"});
      }
      // FileSaver.saveAs(blob, this.series[i]['data'].name + ".json");
      zip.generateAsync({type:"blob"})
      .then(function(content) {
          saveAs(content, "DataBase.zip");
      });
      console.log('Descargando...');
    },
    cargar(){
      for(let i in this.file){
        this.cargar2(this.file[i]);
      }
    },
    cargar2(file){
      const reader = new FileReader();
      reader.onload = e => {
        let data = e.target.result;
        this.sendData(data);
      };
      reader.readAsText(file);
    },
    async sendData(json){
      let data = await this.axios.post(`/serie/create2`,{
        "data": json,
      });
      console.log(data);
    },
  }

}
</script>