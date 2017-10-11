<template>
	<div>

	
	<header class="_head">
		<span style="font-size: 20px;">客户列表</span>
		<img src="../../assets/common/images/add.png" style="position:absolute;right:10px;top:10px;"  @click='addCustom()'>
	</header>
	<div class="_top_block"></div>
<div style="height:3px"></div>

<div v-for="item in items">
	
		<div style="width:100%;height:60px; background-color:#ffffff" @click='custom(item.custid)'>
			<div style="width:15%;float: left;text-align: right;height:60px;">
				<img src="../../assets/common/images/Smile48.png" style="margin-top:5px;"/>
			</div>
			<div style="width:50%;line-height: 28px;float:left;margin-left:10px;">
				<div style="display:inline-block">{{item.custname}}</div>
				<div>{{item.custphone}}</div>
				
			</div><span style="position:relative;top:18px;text-align:center">{{item.custtype}}</span>
		</div>
		<div class="_line"></div>

</div>		
		
		

	</div>
</template>


<script>
import {API} from '../../static/api.js'

	import axios from 'axios'
	export default({
		data(){
			return {
				search:'',
				items:[],
				custEntity:{},
				token:''
			}
		},

		 created(){
		 	this.token=localStorage.getItem('token')
            this.$nextTick(function(){
            	//表示页面渲染完成之后
            	//this.initDom();
            	this.customerListByEntId();
            })
		},

		methods:{
		
			addCustom:function(){
				this.$router.push('addCustom')
			},
			custom:function(id){
				console.log("id="+id);
				//this.$router.push('custom/'+id);
				this.$router.push('detailcust/'+id);
			},

			query:function(){
				this.customerListByEntId();
			},

			customerListByEntId:function(){
           		var _this = this;
              axios.get(API.searchCustomerList,
                  {
					params: {
      					token:_this.token,
      					search:_this.search
    				}
                  }                 
                )
                .then(function (response) {
                	//_this.isShow =1;
                	console.log("123");
    
                	console.log("aaa="+response.data.data[0].custname);
                	_this.items = response.data.data;
                })
                .catch(function (error) {
                  console.log(error);
                });
              }




		}
	})
</script>



<style scoped>
	
body{background:#f2f2f2;color:#969797}
			body,div,ul,li,span{margin:0;padding:0;border:0;}
			ul li{float:left;list-style: none;display: block;width:25%;height:45px;line-height: 45px;text-align: center;}
			._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
			._top_block{width:100%;height:50px;}
			._foot{position:fixed;width:100%;height:50px;color:white;background: gray;text-align: center;left:0px;bottom:0px;line-height: 50px;}
			._btn{display:block;border:1px solid #969797;border-radius:5px;width:80px;height:30px;text-align: center;line-height: 30px;}
			._line{width:85%;height:2px;background: #f2f2f2;margin-left:15%;}

</style>