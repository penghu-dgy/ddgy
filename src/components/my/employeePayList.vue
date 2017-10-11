<template>
	
<div>
	
<header class="mui-bar mui-bar-nav"  >
			<a class=" mui-icon mui-icon-left-nav mui-pull-left" style="font-size: 20px;line-height: 25px;" @click='backs()'></a>
			<h1 class="mui-title">员工缴费列表</h1>
		
		</header>
		
	
		
		<div class="mui-content" >
		<ul id="OA_task_1" class="mui-table-view">


<li class="mui-table-view-cell mui-media" v-for='item in items' >
     <div class="mui-slider-right mui-disabled ">


        <a @click='sess(item.empid,item.empname,item.empphone)' class="mui-btn mui-btn-green">
                缴费

        </a>


        <a  @click='sessi(item.empid)'  class="mui-btn mui-btn-red" >
                历史纪录

        </a>
        </div>
              
          
            <div class="mui-slider-handle " >
                
                  <img class="mui-media-object mui-pull-left" src="../../assets/common/images/cbd.jpg">
                  <div class="mui-media-body">
                    {{item.empname}} 
                  </div>
                
                      
              </div>
          
     
</li>



						</ul>




		</div>
		


</div>


</template>


<style scoped>
	


</style>



<script>
	import axios from 'axios'
  import {API} from '../../static/api.js'
  

  export default({
    data(){
      return {
        items:[],
        token:''
      }
    },
    created(){
      this.token=localStorage.getItem('token')
     // this.payid=this.$route.params.ids;
            this.$nextTick(function(){
             // this.payList()
             this.employeeList()
            })
    },
    methods:{
      sessi:function(a){
        sessionStorage.setItem('empid',a)
        //console.log(a)
        this.$router.push('record')
      },
      sess:function(a,b,c){
        sessionStorage.setItem('chooseempid',a)
        sessionStorage.setItem('empphone',c)
        sessionStorage.setItem('empname',b)
       // console.log(a)
        this.$router.push('chongzhi')
      },

      backs:function(){
        this.$router.push('my')
      },
      payList:function(){
        var _this=this;
        axios.get(API.payList,
          {
          params:{
              token:_this.token,
               payid:_this.payId
          }
          }
        )
        .then(function(response){
          _this.items=response.data.data;
        })
              
            .then(function (response) {
                  
                  _this.items = response.data.data;
               
                })
            .catch(function (error) {
                  console.log(error);
                });
              },



                employeeList:function(){
              var _this = this;

              var token=localStorage.getItem('token');

              var params = new URLSearchParams();

              params.append('token', token);
              
              axios.post(API.employeeList, params)

              
            .then(function (response) {
                  //_this.isShow =1;
                  //console.log(response.data.user.emptype);
            
                  //console.log("aaa="+response.data.list[0].empname);
                  _this.items = response.data.data;
                  _this.emp = response.data.user;
                  /*sessionStorage.setItem("userType",_this.emp.emptype)*/
                  _this.usertype=_this.emp.emptype

                  //sessionStorage.setItem("userid",_this.emp.empid)
                  //console.log( response)
                })
            .catch(function (error) {
                  console.log(error);
                });
              },





     
      }
  })
	
</script>