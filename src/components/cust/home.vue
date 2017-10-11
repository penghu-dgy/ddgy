<template>
   	<div class="mui-bar mui-bar-tab" style="opacity:0.8;height:210px;width:96%;margin-left:2%;background-color: #111111;">
			<table style="width: 100%;">
				<tr @click='dologin()'>
					<td style="height:75px;width: 85%;border-bottom:1px solid white;padding-left: 15px;">
						<font style="font-size: 16px; color: white;"><img src="../../assets/common/images/user.png" style="width: 20px;height: 20px;"/>&nbsp;&nbsp;立即登录</font><br>
						<font style="font-size: 8px; color: white;">已有账号,可立即登录并使用</font>
					</td>
					
				</tr>
				<tr @click="Enterprise()">
					<td style="height:75px;width: 85%;border-bottom:1px solid white;padding-left: 15px;">
						<font style="font-size: 16px; color: white;"><img src="../../assets/common/images/join.png" style="width: 20px;height: 20px;"/>&nbsp;&nbsp;加入企业</font><br>
						<font style="font-size: 8px; color: white;">已收到邀请码?请加入已有企业</font>
					</td>
					
				</tr>
				<tr @click="addEnterprice()">
					<td style="height:75px;width: 85%;padding-left: 15px;">
						<font style="font-size: 16px; color: white;"><img src="../../assets/common/images/create.png" style="width: 20px;height: 20px;"/>&nbsp;&nbsp;创建企业</font><br>
						<font style="font-size: 8px; color: white;">免费创建新的企业</font>
					</td>
					
				</tr>
			</table>
		</div>
 
</template>
<script>
import axios from 'axios'
import {API} from '../../static/api'
import routers from '../../router'

   export default{
   	name:'name',
   	data(){
   		return {
	 		s:{}
	 		}
   	},
   	created:function(){
    /* this.dologin();*/
    this.trylogin();
    
       
       
   	},
   	methods: { 

   		//登陆
       dologin:function(){
       /*localStorage.setItem('token',"hahaha");*/
       	 this.$router.push('loginByPwd')
 
       },
       //加入企业
       Enterprise:function(){
          this.$router.push("joinEnterprice");
       },
       //添加企业
       addEnterprice:function(){

          this.$router.push('addEp')
       },
       trylogin:function () {
          var _this=this
        var token = localStorage.getItem("token");//从浏览器获取token值，若为空则进入home，若有值则进cust
       
        if (token!=null) {
          _this.$router.push('my')
         
        }
        else{
          
        }
       }
       
   	}
   }
</script>
<style scoped>
</style>