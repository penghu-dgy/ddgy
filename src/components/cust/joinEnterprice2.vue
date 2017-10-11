<template>
	<div>
		<div class="mui-navbar-inner mui-bar mui-bar-nav">
			<button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
				<span class="mui-icon mui-icon-left-nav"></span>
			</button>
		</div>
		<div style="height: 150px;margin-top: 50px;text-align:center">
			<h3 style="padding-top: 50px;">加入已有企业</h3>
		</div>

		<form class="mui-input-group" >
			<div class="mui-input-row" style="background-color:#EFEFF4 ;">
				<input type="text" placeholder="请输入企业号码" style="border-bottom:solid #007aff 2px;text-align:center;" v-model.lazy='entId'>
			</div>			
		</form>
			<button  class="mui-btn mui-btn-primary "  style="width: 90%;margin-left: 5%;margin-top: 20px;" @click='next()'>下一步</button>

			
            <button class="mui-btn mui-btn-primary " style="width: 90%;margin-left: 5%;margin-top: 20px;"  @click="my()">立即体验</button>
   
		
					
		<div style="margin-top: 10px;text-align:center" >
			<a>扫描企业二维码</a>
			</div>
	</div>
</template>
<script >
import {API} from '../../static/api.js'
import axios from 'axios'

	export default({
		data(){
            return {
            	s:{},
            	entId:''
            }
		},
		created(){
			
		},
		methods:{
			my:function(){
			    this.$router.push('getSession')
			},
		


		next:function(){
				var _this = this
           		var params = new URLSearchParams();
           		params.append('token', sessionStorage.getItem('token'));
           		params.append('entId',_this.entId)

           		
           		axios.post(API.getEnterpriseById, params)

              
            .then(function (response) {
              
                console.log(response.data);
    				
                
                if (response.data.code!=0) {
                		alert('请输入正确企业ID')

                	}

                else{
                	/*console.log(response.data+'aaa'+response.data.ent.entname)*/
                	sessionStorage.setItem('entmanager',response.data.ent.entmanager)
                	sessionStorage.setItem('entname',response.data.ent.entname)
                	sessionStorage.setItem('entcreatetime',response.data.ent.entcreatetime)
                	sessionStorage.setItem('enttotal',response.data.enttotal)
                	sessionStorage.setItem('entId',_this.entId)
                	
                	_this.$router.push("enterpriceDetail")
                }
                	
                })
                
            .catch(function (error) {
                  console.log(error);
                })

				

			}
			
		}
		
	})
</script>



<style scoped>
		input::-ms-input-placeholder {
			text-align: center;
			}
			input::-webkit-input-placeholder {
			text-align: center;
			}
			input:-moz-placeholder {
			text-align: center;
			}
			input::-moz-placeholder {
			text-align: center;
			}
			input::input-placeholder {
			text-align: center
			}
			
			
</style>