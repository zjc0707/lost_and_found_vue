<template>
  <div class="form-group">
    <div v-if="showAlert" class="alert alert-danger alert-dismissible">
      <button @click="closeAlert" class="close">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>错误：</strong><span>{{alertMessage}}</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "myAlert",
        data(){
            return{
                showAlert:false,
                alertMessage:"",
          }
        },
        methods:{
            closeAlert: function () {
                this.showAlert = false;
            },
            openAlert: function (msg) {
                this.alertMessage = msg;
                this.showAlert = true;
            }
        }
    }
</script>

<style scoped>
  .alert {
    margin-bottom: 0;
  }
</style>
