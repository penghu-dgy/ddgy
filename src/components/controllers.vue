<template>
<div>          
            <div>
            	  <transition name="fade">
				    <router-view></router-view>
				  </transition>
            </div>
			


		<div class="mui-bar mui-bar-tab">
					<a v-if='usertype != "0001"' @click='custs()' class="mui-active  ic">
					<span class="mui-icon mui-icon-contact"></span>
					<span class="mui-tab-label">客户</span>
					</a>

					<a @click='orderHomes()'  class=" mui-active ic">
					<span class="mui-icon mui-icon-email"></span>
					<span class="mui-tab-label">工单</span>
					</a>

					<!-- <a @click='newActivityLists()'  class="mui-active ic">
					<span class="mui-icon mui-icon-contact"></span>
					<span class="mui-tab-label">审批</span>
					</a> -->

					<a @click='mys()'  class=" mui-active ic">
					<span class="mui-icon mui-icon-gear"></span>
					<span class="mui-tab-label">我的</span>
					</a>
				</div>
</div>
</template>
<script>
import {API} from '../static/api.js'
import axios from 'axios'
	 export default{
	 	//name:'nav',
	 	data(){
	 		return {
	 			s:{
	 				
	 			},
	 			usertype:'',
				
	 		}
	 	},
	 	created(){
	 		var _this=this

	 		var a=sessionStorage.s
			_this.s=JSON.parse(a)
			_this.usertype=_this.s.emptype
	 		
	 		 this.$nextTick(function(){
            	
            })
	 	},
	 	methods:{
	 		custs:function(){
	 			this.$router.push('cust')
	 		},
	 		orderHomes:function(){
	 			this.$router.push('orderHome')
	 		},
	 		newActivityLists:function(){
	 			this.$router.push('newActivityList')
	 		},
	 		mys:function(){
	 			this.$router.push('my')
	 		},

	 		/*getEmpInfo:function(){
					var _this = this;

					var toke=localStorage.getItem('token');

					var params = new URLSearchParams();

					params.append('token', localStorage.getItem('token'));
					
					axios.post(API.getEmpInfo, params)

			   
			 .then(function (response) {
			 	//console.log('asdasdasd'+response.data.code)
			     	if (response.data.code!=0) {
			     		//alert("错误")
			     	}
			     	else{

			     		_this.s=response.data.user
			     		sessionStorage.setItem('empent',_this.s.empent)
			     		sessionStorage.setItem('userid',_this.s.empid)
			     		var str = JSON.stringify(_this.s); 
			     		sessionStorage.s=str;
			     		_this.usertype=_this.s.emptype
			     		var a=_this.usertype.split('');
			     		//alert('aaaaaa'+a.length)
			     		if(a[0]){
			     			_this.boss=true
			     		}
			     		//console.log(_this.s.emptype)
			     	}

			     })
			 .catch(function (error) {
			       console.log(error);
			     });
		},*/


               
	 	
	 		}
	 		}
</script>
<style scoped> 
.ic{
	/* width:25%;float:left; */
	display:table-cell;overflow:hidden;height:50px;text-align:center;vertical-align:middle;white-space:nowrap;text-overflow:ellipsis;color:#929292
}

.mui-tab-label{
	font-size:11px;display:block;overflow:hidden;text-overflow:ellipsis
	;line-height:15px;
}
.mui-icon{
	line-height: 10px
}
</style>