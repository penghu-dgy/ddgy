<template>
	<div>
      <div>
    <div id="detail" >
      <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <button type="button" class="mui-left  mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click='back()' >
              <span class="mui-icon mui-icon-left-nav"></span>
            </button>
          <h1 class="mui-center mui-title">缴费详情</h1>
        </div>
      <div  class="mui-table-view-cell mui-media" ></div>
        <div style="margin-top: 45px;height:1px;width:100%;background:#B9B9B9;overflow:hidden;"></div>

        <div style="margin:20px;">员工姓名： {{empname}}</div>
        <div style="margin:20px;">员工ID： {{payemp}}</div>
        <div style="margin:20px;">缴费金额：{{paymoney}}</div>
        <div style="margin:20px;font-size:16px;color: #989898;">支付时间：{{paytime}}</div>
         <div style="margin:20px;font-size:16px;color: #989898;">支付方式：{{zflx}}</div>
         <div style="margin:20px;font-size:16px;color: #989898;">支付编号：{{zfbh}}</div>
    </div>
  </div>


   </div>
</template>


<script type="text/javascript">

  import {API} from '../../static/api.js'
  import axios from 'axios'
  export default({
    data(){
      return{
                items:[],     
                
                payEntity:{},
                payemp:'',
                paymoney:'',
                paytime:'',
                zflx:'',
                zfbh:'',
                payId:0,
                token:'',
                empname:''
      }
    },
    created(){
      this.token=localStorage.getItem('token')
      this.payId=sessionStorage.getItem('payId')

      this.empname=sessionStorage.getItem('empname')

     
       //alert("payId="+this.payId);

      this.$nextTick(function(){
        //表示页面渲染后的
        this.payDetail();
      })
    },
    methods:{
      back:function(){
        //this.$router.push('employeePayList')
        this.$router.go(-1)
      },
      payDetail:function(){
        var _this=this;
        axios.get(API.payDetail,
          {
            params:{
              token:_this.token, payid:_this.payId
            }
          }
        )
        .then(function(response){
          _this.items=response.data.data;
          _this.payemp = _this.items.payemp;
          console.log(_this.payemp);
          _this.paymoney = _this.items.paymoney;
          _this.paytime = _this.items.paytime;
          _this.zflx=_this.items.zflx;
          _this.zfbh=_this.items.zfbh;  

        })
        .catch(function (error) {
                  console.log(error);
           });
      }
    }
  })
            

</script>


<style scoped>                                                                                                                                                                                                                                                                                                                                                                             
	


</style>