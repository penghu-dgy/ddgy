<template>
	
<div>
	



    <header class="_head">
    <img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" @click='backs()'>
    <span style="font-size: 20px;">员工列表</span>
    
    </header>
		
	<div class="_top_block"></div>
		
		
	

  	<ul class="mui-table-view mui-table-view-chevron" style="margin-top:20px">


      <li class="mui-table-view-cell mui-media"  v-for='(item, index) in items' >

        <a @click='sess(item.empid)'   class="mui-navigate-right" >

          
            <img class="mui-media-object mui-pull-left" style="border-radius:50%;" src="../../assets/common/images/cbd.jpg">
            <div class="mui-media-body"><span></span>
                {{item.empname}}    <span style="font-size: 12px;color:blue;">
                <span v-if='emptypes[index][0]==1'>老板</span>
                <span v-if='emptypes[index][1]==1'>经理</span>
                <span v-if='emptypes[index][2]==1'>销售</span>
                <span v-if='emptypes[index][3]==1'>施工</span>
                </span>
              <p class='mui-ellipsis' style="font-size: 12px;">{{item.empphone}}</p><span class='mui-ellipsis' style="color:#ff0000;position:absolute;margin-top:-30px;margin-left:55%" v-if='item.empstate==0'>待审核</span>
            </div>
         </a>
        </li>


      
						</ul>





		


</div>


</template>


<style scoped>
	
._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
    ._top_block{width:100%;height:50px;}
      

</style>



<script>
	import axios from 'axios'
	import {API} from '../../static/api.js'
	

	export default({
		data(){
			return {
				items:[],
				
				item:[],
				emp:[],
				usertype:'',
				emptypes:[],
        userid:''



			}
		},
		created(){
      this.userid=sessionStorage.getItem('userid')
      
            this.$nextTick(function(){
            	//表示页面渲染完成之后
            	//this.initDom();
            	this.employeeList()

            })
		},

		methods:{
			backs:function(){
				this.$router.push('my')
			},
      sess:function(a){
        sessionStorage.setItem('chooseempid',a)
       /* sessionStorage.setItem('chooseempphone',c)
        sessionStorage.setItem('chooseempname',b)*/
       //console.log(a)
      this.$router.push('empInfo')
      },
			
			
			employeeList:function(){
           		var _this = this;

           		var token=localStorage.getItem('token');

           		var params = new URLSearchParams();

           		params.append('token', token);
           		
           		axios.post(API.employeeList, params)

              
            .then(function (response) {
               	_this.items = response.data.data;
                    //_this.items.append(response.data.emptypes)
                    _this.emptypes=response.data.emptypes;
                	_this.emp = response.data.user;
                	sessionStorage.setItem("userType",_this.emp.emptype)
                	_this.usertype=_this.emp.emptype
                  
               
                })
            .catch(function (error) {
                  console.log(error);
                });
              },

             




			}
	})


	
</script>