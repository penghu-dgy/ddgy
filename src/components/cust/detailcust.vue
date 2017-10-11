<template>
  <div id="detail" >

   


    <header class="_head" style="z-index:97">
        <img src="../../assets/common/images/back32.png" style="position:absolute;left:10px;top:10px;" @click="listCust()">
        <span style="font-size: 20px;">客户详情</span>
        <img src="../../assets/common/images/Category.png"  style="position:absolute;right:10px;top:10px;" @click='b=!b'>
      </header>
      <div class="_top_block"></div>

   
  
<transition name="bounce">
    <div style="position:fixed;bottom:45px;background:white;width:100%;height:80px;z-index:99 " class="box"  v-show='b'>

      <div style="width:100%;text-align:center;height:40px;line-height:40px">
          <a  style="text-decoration:none;" @click='deleteCustomer(custEntity.custid)'>删除客户</a>
       
      </div>
       <div style="width:100%;height:3px;background-color:#f2f2f2"></div>
      <div style="width:100%;text-align:center;height:40px;line-height:40px;background-color:white">
          <a  style="text-decoration:none;" @click='updateCustomer(custEntity.custid)'>修改客户</a>
      </div>
       <div style="width:100%;height:3px;background-color:#f2f2f2"></div>
      <div style="width:100%;text-align:center;height:40px;line-height:40px;background-color:white">
          <a style="text-decoration:none;" @click='b=!b'><b>取消</b></a>
       </div>
      
    </div>
</transition>

    
<div id="ls" style="margin-top:8px;width:100%;height:auto;background: white;">

    
    <div style="width:100%;height:45px;line-height: 45px;color:black;">
      <span style="display: block;position: absolute;left:10px;">{{custEntity.custname}} &nbsp;&nbsp;{{custEntity.custtime}}</span><span style="position:absolute;right: 10px;color:red;">{{custEntity.custtype}}</span>
    </div>
    
    <div class="_line"></div>
    
    <div style="width:100%;height:100px;margin-top:15px;">
      <div style="width:100%;height:100px;position: absolute;right: 0px;line-height: 26px;">
        <div style="margin-left:10px;">手机：{{custEntity.custphone}}</div>
        <div style="margin-left:10px;">区域：{{custEntity.custprovince}} {{custEntity.custcity}} {{custEntity.custarea}}</div>
        <div style="margin-left:10px;">地址：{{custEntity.custaddress}}</div>
        
      </div>      
    </div>
    
    <div class="_line" style="height:8px;"></div>
    <div style="width:100%;height:45px;line-height: 45px;">
      <span style="display: block;position: absolute;left:10px;">工作记录</span><span style="position:absolute;right: 10px;"><img src="../../assets/common/images/comments.png" style="margin-top:10px;width:25px;height:25px;" @click="publishWork(custEntity.custid)"/></span>
    </div>
   
  
    <div v-for="(work,index) in works">
    <div class="_line" style="height:8px"></div>
      <div style="width:100%;height:45px;line-height: 45px;" >
        <span style="display: block;position: absolute;left:10px;">{{work.worktime}}</span><span style="position:absolute;right: 15px;"> <img src="../../assets/common/images/delete.png" @click='deleteWork(work.workid)'></span>
      </div>
      <div class="_line"></div>
      {{index}}
      <div style="margin-left:10px;">{{work.workcontent}}</div>
     
        <img :src="a" v-for='a in imgArr[index]' class='imgs' @click="fangda(a)">
      
     <!--  <img :src="work.workimage" v-if='work.workimage' width="95%" height="230px" style="margin-left:2.5%" /> -->
     
    </div>

  
  </div>
           <div style="width:100%;height:100%;opacity:0.5;z-index:98;position:fixed;top:0;left:0;background-color:black;" v-if='fang' @click='fang=!fang'>

              
               </div>
           <img :src="fangdahou" style="z-index:99;display:inline;width:80%; ;position:absolute;top:5%;left:10%" v-if='fang' @click='fang=!fang'>


<div class="bgDiv" v-if='b' @click='b=!b'></div>
    
      
  </div>
</template>
<script>
  import {API} from '../../static/api.js'
  import axios  from 'axios' 
	export default({
		data(){
			return {
				id:"",
        custEntity:{},
        employeeEntity:{},
        works:[],
        token:'',
        b:false,
        img:'',
        imgArr:[],
        fangdahou:'',
        fang:false,
			}
		},
		created(){
      var _this=this
      this.token=localStorage.getItem('token')
			       this.id=this.$route.params.ids;
             this.$nextTick(function(){
           		
                _this.goCustomerDetail(this.id);
               
           })
		},

		methods:{
          fangda:function(a){
            this.fangdahou=a
            this.fang=true
          },
          
          deleteWork:function(wid){

            //原来的提示框
            /*if(confirm("确定删除该记录？")){
              alert("删除成功");
            }else {
              return;
            }*/


            var _this = this;
            var btnArray = ['否', '是'];
            mui.confirm('确认删除？', '工作记录', btnArray, function(e) {
              if(e.index == 1) {
                  axios.get(API.workDelete,
                  {
                    params: {
                          token:_this.token,
                          workid:wid
                      }
                   })
                    .then(function (response) {
           
                       if(response.data.code==0){
                          
                          console.log("finish!="+_this.id);          
                          //删除成功后,还是在本页面(刷新)                  
                          _this.goCustomerDetail(_this.id);
                          mui.toast('删除成功...');
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    }); 
                  
              }else {
                return;
              }
            })       
                 
          },


          updateCustomer:function(cid){
              //跳转到修改页面去
              this.$router.push('../updateCust/'+cid);
          },
          escape2Html:function (str) {
           var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
           return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
          },


          deleteCustomer:function(cid){
            /*if(confirm("确定删除该客户？")){
              alert("删除成功");
            }else {
              return;
            }*/

            var _this = this;
            var btnArray = ['否', '是'];
            mui.confirm('确认删除？', 'Hello MUI', btnArray, function(e) {
              if (e.index == 1) {
                
                   axios.get(API.customerDelete,
                    {
                      params: {
                            token:_this.token,
                            custid:cid
                        }
                     })
                      .then(function (response) {
             
                         if(response.data.code==0){
                            
                            console.log("finish!");          
                            //删除成功后,跳转到列表页面
                            _this.$router.push('../cust');
                            mui.toast('删除成功...');
                          }
                      })
                      .catch(function (error) {
                          console.log(error);
                      });      

              } else {
                return;
              }
            })
  

          },




          publishWork:function(cid){
               //跳转工作记录页面this.$router.push('detailcust/'+id);
              this.$router.push('../work/'+cid);
          },


          listCust:function(){
              //跳转到列表页面
              this.$router.push('../cust');
          },
        bianli(){
          var _this=this;
            //console.log(_this.works)
          var i= this.works.length
         // alert(i)
           for(var j=0;j<i;j++){
          //  console(j)
            console.log(_this.works[j])
           _this.imgArr[j]=JSON.parse(_this.escape2Html(_this.works[j].workimage))

           }
          // console.log(_this.imgArr[0][0])

          },
	     
	      goCustomerDetail:function(cid){
        		//this.$router.push('noticeDetail')
        		//发送http请求，获取对应的noticeEntity对象，然后将entity对象的值绑定到详情里面

        		console.log("cid==="+cid);
        		var _this = this
            axios.get(API.customerDetailByCustId,
            {
    					params: {
          					token:_this.token,
          					custid:cid
        				}
             } )
              .then(function (response) {
                  
                	//console.log(response);
                	//_this.custEntity = response.data.data;

                  _this.custEntity = response.data.data.customer;//客户详情
                  _this.works = response.data.data.list;//工作记录  
                 // console.log(_this.works)          
                  _this.employeeEntity = response.data.data.employee;//客户的员工详情
                  _this.bianli()
               
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
      ._head{position: fixed;top:0px;left:0px;width:100%;height:50px;background: white;text-align: center;line-height: 50px;}
      ._top_block{width:100%;height:50px;}
      ._foot{position:fixed;width:100%;height:50px;color:white;background: gray;text-align: center;left:0px;bottom:0px;line-height: 50px;}
      ._btn{display:block;border:1px solid #969797;border-radius:5px;width:80px;height:30px;text-align: center;line-height: 30px;}
      ._line{height:2px;background: #f2f2f2;}


    .bounce-enter-active {
  animation: bounce-in .2s;
}
.bounce-leave-active {
  animation: bounce-out .2s;
}
@keyframes bounce-in {
  0% {
     margin-bottom:-100px;
  }
   10% {
     margin-bottom:-90px;
  }
   20% {
     margin-bottom:-80px;
  }
   30% {
     margin-bottom:-70px;
  }
  40% {
     margin-bottom:-60px;
  }
  50% {
     margin-bottom:-50px;
  }
  60% {
     margin-bottom:-40px;
  }
  70% {
     margin-bottom:-30px;
  }
  80% {
     margin-bottom:-20px;
  }
  90% {
     margin-bottom:-10px;
  }
  100% {
     margin-bottom:0px;
  }
}
@keyframes bounce-out {
  0% {
     margin-bottom:0px;
  }
  
  100% {
     margin-bottom:-100px;
  }
 
}


.bgDiv{
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: .5;
      position:fixed;
      
      z-index: 98;
      bottom: 0;
  }

.imgs{
  width:100px;
}



  
</style>