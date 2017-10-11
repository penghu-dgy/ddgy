<template>
  <div id="detail" >

    <header class="mui-bar mui-bar-nav">
      <span class="mui-icon mui-icon-left-nav mui-pull-left" @click="detailCust(id)"></span>
      <!-- <a id="menu" class="mui-action-menu mui-icon mui-icon-bars mui-pull-right" href="#topPopover"></a> -->
      <span class=" mui-icon  mui-pull-right " style="font-size: 18px;line-height: 25px;" @click="updateCust(custEntity.custid)">提交</span>
      <h1 class="mui-title">编辑客户</h1>
    </header>
      

          <table style="width:100%;background:white;margin-top:50px;">
            <tr style="height:45px;line-height:45px;"><td style="padding-left:5px;">客户名称</td><td style="float:right;">
            <input type="text" id="myname" v-model="custEntity.custname" style="padding-top:25px;border:0px;text-align:right;width:140px;" placeholder="please input..." />
            </td></tr>
            </table>

          <table style="width:100%;background:white;margin-top:50px;margin-top:2px;">
            <tr style="height:45px;line-height:45px;"><td style="padding-left:5px;">客户电话</td><td style="float:right;">
            <input type="text" id="mytel" v-model="custEntity.custphone" style="padding-top:25px;border:0px;text-align:right;width:140px;" placeholder="please input..." />
            </td></tr>
            </table>

            <table style="width:100%;background:white;margin-top:50px;margin-top:2px;">
            <tr style="height:45px;line-height:45px;"><td style="padding-left:5px;">分类</td><td style="float:right;">
            <!-- <input type="text" style="padding-top:25px;border:0px;text-align:right;width:140px;" placeholder="please input..." /> -->
            <span id='showUserPicker' style="float:right;">{{custEntity.custtype}}</span>
            </td></tr>
            </table>

            <table style="width:100%;background:white;margin-top:50px;margin-top:2px;">
            <tr style="height:45px;line-height:45px;"><td style="padding-left:5px;">地址</td><td style="float:right;">
            <!-- <input type="text" style="padding-top:25px;border:0px;text-align:right;width:140px;" placeholder="please input..." /> -->
            <span id="cityResult3" style="float:right;border-top: 1px;">{{custEntity.custprovince}} {{custEntity.custcity}} {{custEntity.custarea}}</span>
            </td></tr>
            </table>

            <table style="width:100%;background:white;margin-top:50px;margin-top:2px;">
            <tr style="height:45px;line-height:45px;"><td style="padding-left:5px;">街道</td><td style="float:right;">
            <input type="text" id="myjd" v-model="custEntity.custaddress" style="padding-top:25px;border:0px;text-align:right;width:140px;" placeholder="please input..." />
            </td></tr>
            </table>

           
    
      
  </div>
</template>
<script>

  import {API} from '../../static/api.js'
  import {cityData3} from '../../assets/common/js/city.data-3.js'
  import city from '../../assets/common/js/city.data.js'
  import pick from '../../assets/common/js/mui.picker.js'
  import pop from '../../assets/common/js/mui.poppicker.js'

  import axios  from 'axios' 
	export default({
		data(){
			return {
				id:"",
        custname:'',
        custphone:'',
        custtype:'',
        custprovince:'',
        custcity:'',
        custarea:'',
        custaddress:'',
        custEntity:{},
        employeeEntity:{},
        works:[],
        token:''
			}
		},
		created(){
      this.token=localStorage.getItem('token')
			      this.id=this.$route.params.ids;
            //alert(this.id);
            
            this.$nextTick(function(){  
                this.initDom();  		
                this.goCustomerDetail(this.id);
           })
		},
		methods:{

      updateCust:function(cid){
var _this = this;
            var myname = document.getElementById("myname").value
            var mytel = document.getElementById("mytel").value
            var myjd = document.getElementById("myjd").value
            if(myname==""||myname==null){
                mui.alert('名称不能为空', '修改信息', function() {return;});
                return;
            }
            if(mytel==""||mytel==null){
                mui.alert('电话不能为空', '修改信息', function() {return;});
                return;
            }
            if(myjd==""||myjd==null){
                mui.alert('街道不能为空', '修改信息', function() {return;});
                return;
            }

            //修改客户信息
           
            axios.get(API.customerUpdate,
            {
              params: {
                    token:_this.token,
                    custid:cid,
                    custname:_this.custEntity.custname,
                    custphone:_this.custEntity.custphone,
                    custtype:document.getElementById("showUserPicker").innerText,
                    custprovince:document.getElementById("cityResult3").innerText,
                    custaddress:_this.custEntity.custaddress
                  }
             })
              .then(function (response) {
                    if(response.data.code==0){

                    _this.$router.push('../detailcust/'+cid);
                    mui.toast('修改成功...');
                  }
              })
              .catch(function (error) {
                  console.log(error);
              });
          
      },


      detailCust:function(id){
          //跳转到客户详情页面
          this.$router.push('../detailcust/'+id);
      },
	     

	      goCustomerDetail:function(cid){
        		//this.$router.push('noticeDetail')
        		//发送http请求，获取对应的noticeEntity对象，然后将entity对象的值绑定到详情里面
var _this=this
        		console.log("cid==="+cid);
        		var _this = this;
            axios.get(API.customerDetailByCustId,
            {
    					params: {
          					token:_this.token,
          					custid:cid
        				}
             } )
              .then(function (response) {
     
                	console.log("123");
                	//_this.custEntity = response.data.data;
                  _this.custEntity = response.data.data.customer;//客户详情
                  _this.works = response.data.data.list;//工作记录            
                  _this.employeeEntity = response.data.data.employee;//客户的员工详情
              })
              .catch(function (error) {
                  console.log(error);
              });

        	},
        initDom:function(){
          
                 (function($, doc) {
        $.init();
        $.ready(function() {
          //普通示例
          var userPicker = new $.PopPicker();
          userPicker.setData([{
            value: 'A',
            text: 'A级'
          }, {
            value: 'B',
            text: 'B级'
          }, {
            value: 'C',
            text: 'C级'
          }, {
            value: 'D',
            text: 'D级'
          }]);
          var showUserPickerButton = doc.getElementById('showUserPicker');
          //var userResult = doc.getElementById('userResult');
          showUserPickerButton.addEventListener('tap', function(event) {
            userPicker.show(function(items) {
              document.getElementById("showUserPicker").innerText = items[0].text;
              //document.getElementById("showUserPicker").innerText = JSON.stringify(items[0]);
              //userResult.innerText = JSON.stringify(items[0]);

              //返回 false 可以阻止选择框的关闭
              //return false;
            });
          }, false);
          //-----------------------------------------

          //-----------------------------------------
          //          //级联示例
          var cityPicker3 = new $.PopPicker({
            layer: 3
          });
          cityPicker3.setData(cityData3);
          var showCityPickerButton = doc.getElementById('cityResult3');
          var cityResult3 = doc.getElementById('cityResult3');
          showCityPickerButton.addEventListener('tap', function(event) {
            cityPicker3.show(function(items) {
              cityResult3.innerText = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;


              //返回 false 可以阻止选择框的关闭
              //return false;
            });
          }, false);
        });
      })(mui, document);
      }


		}
	})
</script>


<!-- 引入外部css样式 -->

<style scoped>
 
</style>