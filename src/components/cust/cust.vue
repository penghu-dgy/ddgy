<template>
	<div>
		

		

<header class="_head" style="z-index: 99;opacity:0.8">
		<span style="font-size: 20px;">客户列表</span>
		<img src="../../assets/common/images/add.png" style="position:absolute;right:10px;top:10px;"  @click='addCustom()'>
	</header>
		
		
		<div style="width:100%;height:45px;line-height: 45px;background: white;margin-top:57px;">
			<input type="text" name="search"  v-model="search" @keyup.enter="query()"
			style="width:100%;height:30px;border:0;padding-left:10px;" placeholder="请输入查询的电话或者姓名或者地址"/>
	</div>
	
		
		
	<div id="ls" style="margin-top:8px;width:100%;height:auto;background: white;" v-for="item in items" @click='custom(item.custid)'>
		<div style="width:100%;height:45px;line-height: 45px;color:black;" >
			<span style="display: block;position: absolute;left:10px;"><!--<img src="../images/bussiness-man.png" style=""/>-->{{item.custname}} &nbsp;&nbsp;{{item.custtime}}&nbsp;&nbsp;<img src="../../assets/common/images/more16.png" style="margin-top:8px;"></span><span style="position:absolute;right: 10px;color:red;">{{item.custtype}}</span>
		</div>
		
		<div class="_line"></div>
		
		<div style="width:100%;height:100px;margin-top:15px;">
			<div style="width:100%;height:100px;position: absolute;right: 0px;line-height: 26px;">
				<div style="margin-left:10px;">手机：{{item.custphone}}</div>
				<div style="margin-left:10px;">区域：{{item.custprovince}} {{item.custcity}}</div>
				<div style="margin-left:10px;">地址：{{item.custaddress}}</div>
				
			</div>			
		</div>
	</div>
		
		<div style="height:60px"></div>
		
	
       



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
                	//console.log("123");
    
                	//console.log("aaa="+response.data.data[0].custname);
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
			/*ul li{float:left;list-style: none;display: block;width:25%;height:45px;line-height: 45px;text-align: center;}*/
			._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
			._top_block{width:100%;height:50px;}
			._foot{position:fixed;width:100%;height:50px;color:white;background: gray;text-align: center;left:0px;bottom:0px;line-height: 50px;}
			._btn{display:block;border:1px solid #969797;border-radius:5px;width:80px;height:30px;text-align: center;line-height: 30px;}
			._line{height:2px;background: #f2f2f2;margin-left:5px;margin-right:5px;}
	

</style>