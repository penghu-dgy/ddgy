<template>
  <div>
    

    <header class="_head">
    <img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" @click='back()'>
    <span style="font-size: 20px;">缴费记录</span>
    
    
    </header>
    <div class="_top_block"></div>
  
    <div style="margin-top:8px;">

    
      
      
      <ul class="mui-table-view">
        
        <li class="mui-table-view-cell mui-media" v-for="item in items" @click="goDetail(item.payId,item.empName)">
          <img class="mui-media-object mui-pull-left" style="border-radius:50%;" src="../../assets/common/images/cbd.jpg">
            <div class="mui-media-body" style="float:left; color:black;">
              支付编号{{item.zfbh}}
              <p class='mui-ellipsis' style="font-size: 12px;">{{item.zflx}} {{item.payTime}}</p>
            </div>
            <div  class="mui-pull-left"  style="position: absolute;right: 10px;color:black;"><span v-if='item.payMoney==50'>三个月</span>
            <span v-if='item.payMoney==100'>六个月</span>
            <span v-if='item.payMoney==140'>12个月</span>
           /{{item.payMoney}}</div>
        </li>
        



      </ul>
      

    </div>






     
  </div>
</template>

<script>
  //向后台接口发送数据，并获取值
  import {API} from '../../static/api.js'
  import axios from 'axios'
  export default({
    data(){
      return{
        items:[],     
               
                payEntity:{},
                payemp:'',
                paytime:'',
               // zfbh:''
               token:'',
               item:[],
               empid:0,
                
      }
    },
    created(){
      this.token=localStorage.getItem('token')
      this.item=this.$route.params.item;
     this.empid= sessionStorage.getItem('chooseempid')
      console.log('aaa'+this.empid)
      this.$nextTick(function(){
      //  console.log("e="+this.$route.params.e);
        //表示页面渲染后的
        this.payHistory();
      })
    },
    methods:{
      back:function(){
        this.$router.go(-1)
      },
      payHistory:function(){
        var _this=this;
        axios.get(API.payList,
          {
            params:{
              token:_this.token,empid:_this.empid
            }
          }
        )
        .then(function(response){
          _this.items=response.data.data;
          console.log(response)
        })
        .catch(function (error) {
                  console.log(error);
           });
      },
      goDetail:function(payId,name){
        sessionStorage.setItem('payId',payId)
         sessionStorage.setItem('empname',name)
          this.$router.push('detail');
      }
    }
  })
</script>
<style scoped>
  
    ._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
      ._top_block{width:100%;height:50px;}
      ._line{width:100%;height:1px;background: #f2f2f2;}
  

</style>