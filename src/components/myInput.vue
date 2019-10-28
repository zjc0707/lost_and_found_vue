<template>
  <div class="form-group">
    <label :for="id" :class="labelClass">{{labelText}}</label>
    <div :class="inputClass">
      <input v-model="tempValue" :id="id" :type="inputType"
              class="form-control" :placeholder="placeholder" @input="inputLoad">
    </div>
  </div>
</template>

<script>
    export default {
        name: "myInput",
        props:['id','labelText','inputType','placeholder','value','onlyNumber'],
        data(){
            return{
                tempValue: this.value,
                inputClass:"col-sm-8",
                labelClass:"col-sm-2 control-label",
            }
        },
        watch:{
            value(val){
                if(val === this.tempValue) return;
                this.tempValue = val;
            }
        },
        methods:{
            check_num: function (s) {
                if(!this.onlyNumber) return s;
                let str = s.toString();
                str = str.replace(/[^\d]/g, ''); // 清除“数字”和“.”以外的字符
                if (str.indexOf('.') < 0 && str !== '') {
                    // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                    str = parseInt(str);
                }
                return str.toString();
            },
            inputLoad(event){
                let value = event.target.value;
                value = this.check_num(value);
                this.tempValue = value;
                this.$emit('input', value)
            }
        }
    }
</script>

<style scoped>

</style>
