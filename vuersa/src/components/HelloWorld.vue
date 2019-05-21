<template>
  <v-container>
    <v-layout>
      <div>
        <v-text-field label="Regular" single-line v-model="msg"></v-text-field>
        <v-btn color="success" @click="trans">點我</v-btn>

        <v-sheet class="pa-5" color="grey lighten-3">
          <ul>
            <li v-for="(value, name, index) in resdata" :key="index">{{name}} {{ value}}</li>
          </ul>
          <div>
            <v-text-field label="Regular" single-line v-model="oridata"></v-text-field>
            <v-btn color="success" @click="enco">點我</v-btn>
            <span>{{endata}}</span>
          </div>
          <div>
            <!-- <v-text-field label="Regular" single-line v-model="oridata"></v-text-field> -->
            <v-btn color="success" @click="deco">點我</v-btn>
            <span>{{dedata}}</span>
          </div>
        </v-sheet>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    msg: "",
    resdata: {},
    rsa: "",
    decode: "",
    getmsg: "",
    oridata: "",
    endata: "",
    dedata: ""
  }),
  methods: {
    trans() {
      this.axios
        .post("http://localhost:3000/binary", {
          value: this.msg
        })
        .then(response => {
          console.log(this.resdata);
          this.resdata = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    enco() {
      this.axios
        .post("http://localhost:3000/rsa", {
          value: this.oridata
        })
        .then(response => {
          console.log(this.resdata);
          this.endata = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deco() {
      this.axios
        .post("http://localhost:3000/rsadecode", {
          value: this.endata
        })
        .then(response => {
          console.log(this.resdata);
          this.dedata = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>
