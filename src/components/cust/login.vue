<template>
    <div>
	  <div style="width: 100%;margin: 0;color: red; text-align:right;">
          <a>更多</a>
    </div>
    <div style="margin: 0;padding: 0;">
      <ul style="margin: 0;padding: 0;overflow: auto;margin-bottom:30px;">
        <li style="list-style:none;text-align: center;"><img src="../../assets/common/images/my.png" style="width: 65px;height: 65px;"></li>
           
      </ul>
            

            <input type="text" class="mui-input-password"placeholder="密码" style="width: 100%;height: 30px;color:white;" name="empUserName">


            <input type="password" class="mui-input-password"placeholder="密码" style="width: 100%;height: 30px;color:white;" name="empPassword">


          


         
        <button class="xiayibu" style="margin-top: 30px;height:40px;" @click="login()">
          登录
        </button>  
        
        <div style="padding: 0;margin: 0;text-align: center;width: 100%;">
          <p style="height: 23px;line-height: 23px;text-align: center;font-size: 18px;color: #FF5050;margin: 0;">
          使用验证码登录
          </p>
        </div>
        
        <div style="height: 200px;width: 100%;"></div>
        
        
        
        
    </div> 
    </div>  
</template>
<script>
    import {API} from '../../static/api.js'
    import axios from 'axios'
	  export default({
        data(){
            return {
                s:{
                 empName:'',
                 empPassword:''
                }
            }
        },
        methods:{
            login:function(){
               this.$router.push('cust')
            },
           resigster:function(){
            var formData=new FormData($("#employee").val());
            var config={
              headers:{'Content-Type':'multipart/form-data'}
            };
              axios.post(API.resigster,
                  formData,
                  config
                )
                .then(function (response) {
                 alert(response.data);
                })
                .catch(function (error) {
                  console.log(error);
                });
              }
          }
    })
</script>
<style scoped>
    	 ul{
        margin: 0;padding: 0;overflow: auto;
       }
      .xiayibu{width: 98%;margin-left: 1%;margin-bottom: 8px;padding: 10px 0;height: 23px;background-size: 100% 1px;background-color: #FF5050;border-radius: 5px;clear: both;}
</style>