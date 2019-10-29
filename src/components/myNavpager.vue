<template>
  <div class="navpager">
    <div v-if="data.pages > 1" class="lg">
      <nav aria-label="...">
        <ul class="pagination">
          <li v-if="data.current > 1"><a href="#" @click="getPage(1)">首页</a></li>&nbsp;
          <li v-if="data.current > 1"><a href="#" @click="getPage(data.current - 1)">«</a></li>
          <li v-if="data.pages <= max" v-for="i in data.pages" :class="i === data.current ? 'active' : ''">
            <a class="li-num" href="#" @click="getPage(i)">{{i}}</a>
          </li>
          <li v-if="data.pages > max" v-for="i in max" :key="i" :class="(begin + parseInt(i)) === data.current ? 'active' : ''">
            <a class="li-num" href="#" @click="getPage(begin + parseInt(i))">{{begin + parseInt(i)}}</a>
          </li>
          <li v-if="data.current < data.pages"><a href="#" @click="getPage(data.current + 1)"><span>»</span></a></li>
        </ul>
      </nav>
    </div>
    <div v-if="data.pages > 1" class="sm panel panel-default">
      <p class="page-btn" @click="getPage(data.current - 1)">上一页</p>
      <p>{{data.current}}/{{data.pages}}</p>
      <p class="page-btn" @click="getPage(data.current + 1)">下一页</p>
    </div>
  </div>

</template>

<script>
    export default {
        name: "myNavpager",
        props:{
            data: Object,
            getPage: Function
        },
        created(){
            if(window.screen.width < 500){
                this.max = 5;
            }
            this.freshData();
        },
        data(){
            return{
                max: 10,
                begin: 0,
            }
        },
        watch:{
            data(val){
                this.freshData();
            }
        },
        methods:{
            test: function (i) {
                console.log(i);
                console.log(typeof i);
                return parseInt(i);
            },
            freshData: function () {
                if(this.data.pages <= this.max){
                    return;
                }
                let half = Math.round(this.max / 2);
                this.begin = this.data.current - half;
                if(this.data.current + half > this.data.pages){
                    this.begin = this.data.pages - this.max;
                }
                if(this.begin < 1){
                    this.begin = 0;
                }
                // console.log(this.begin);
            }
        }
    }
</script>

<style scoped>
  .navpager{
    text-align:center;
  }
  .pagination{
    margin: 0;
  }
  .li-num{
    width: 40px;
  }
  .sm{
    height: 40px;
  }
  /*.sm .page-btn:hover{*/
  /*  background-color: #eeeeee;*/
  /*}*/
  .sm p, .sm a{
    width: 33.33%;
    float: left;
    line-height: 40px;
  }
</style>
