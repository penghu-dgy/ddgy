<template>
<div>
	



    <header class="_head">
    <img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;"  @click='back()'>
    <span style="font-size: 20px;">充值</span>
    
    
    </header>
    <div class="_top_block"></div>
  
  
  
    
    <div class="_line" style="height:8px;"></div>
      <div >
        <form class="mui-input-group">
          <div class="mui-input-row mui-radio"  @click="payment(50,3)">
            <label>三个月/50元
            <input name="radio1" type="radio"  checked="true"></label>
          </div>
          <div class="mui-input-row mui-radio" @click="payment(100,6)">
            <label>六个月/100元
            <input name="radio1" type="radio" ></label>
          </div>
          <div class="mui-input-row mui-radio" @click="payment(140,12)" >
            <label>12个月/140元
            <input name="radio1" type="radio" ></label>
          </div>
          
        </form>
      </div>
      
      
      <div class="_line" style="height:8px;"></div>
      
      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell mui-media"  @click="goPay('alipay')">
          <a class="mui-navigate-right">
            <img class="mui-media-object mui-pull-left" src="../../assets/common/images/cbd.jpg">
            <div class="mui-media-body" style="color:black;" >
              支付宝支付  
              <p class='mui-ellipsis' style="font-size: 12px;">支付宝安全支付</p>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media" @click="goPay('WeChat')">
          <a class="mui-navigate-right">
            <img class="mui-media-object mui-pull-left" src="../../assets/common/images/cbd.jpg">
            <div class="mui-media-body" style="color:black;">
              微信支付  
              <p class='mui-ellipsis' style="font-size: 12px;">微信安全支付</p>
            </div>
          </a>
        </li>

        
      </ul>
      
      
      <div class="mui-content-padded">
        <p id="info"></p>
      </div>

</div>
	
</template>>




<script>
//向后台接口发送数据，并获取值
    import {API} from '../../static/api.js'
    import axios from 'axios'
	  export default({
        data:function(){
            return {
               
                zflx:'',
                PayEntity:[],
                paymoney:50,
                n:3,
                pay:{},
                token:'',
                empphone:0,
                empid:0,
                empname:''
              
            }
        },
        created(){
        	this.token=localStorage.getItem('token')
        	   this.empid=sessionStorage.getItem('chooseempid')
            /* this.empphone=sessionStorage.getItem('empphone')
             this.empname=sessionStorage.getItem('empname')*/

        	  //console.log(this.pay)
            this.$nextTick(function(){
         
            })
		},
        methods:{
        	payment:function(s,n){
        		var _this = this;
        		this.paymoney = s;
        	//console.log(_this.pay)
          this.n=n
              
          },   
          back:function(){
            this.$router.push('empInfo')
          },
          goPay:function(type){
        	 var _this=this
        	  _this.zflx=type
        	if (_this.paymoney==0) {alert('请选择充值金额') ;return}
        	
           if(confirm('确定支付?')) { 
           		


           		axios.get(API.addPay,
                  {
				params: {
      				token:_this.token,
              empid:_this.empid,
              n:_this.n,
              paymoney:_this.paymoney,
              zflx:_this.zflx,
             
    			}
                  }                 
                )
                .then(function (response) {

                    console.log(response)
                	if(response.data.code==0){
                    sessionStorage.setItem("payId",response.data.payId)
                  	_this.$router.push('record');
                		

                	}
                })
                .catch(function (error) {
                  console.log(error);
                });


        	
        		
   	 } 
    		return false; 

	} 
     	 
        	
          }
    })
	
</script>




<style scoped>
	
._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
      ._top_block{width:100%;height:50px;}
      ._line{width:100%;height:1px;background: #f2f2f2;}
</style>