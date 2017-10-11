/*定义API常量*/
//export const IP ='http://139.129.93.45/rrsb-0.0.1-SNAPSHOT/api/'
//export const IP ='http://192.168.1.102/rrsb-0.0.1-SNAPSHOT/api/'
export const IP ='http://192.168.1.102/api/'
export const  API={
	LoginSendYzm:IP+'LoginSendYzm',
	login:IP+"login",
	resigster:IP+"resigster",
	employeeList:IP+'employeeList',
	AddEnterpriseInfo:IP+'AddEnterpriseInfo',
	updateEmpState:IP+'updateEmpState',
	sendYzm:IP+'sendYzm',
	resigsterEmp:IP+'resigsterEmp',
	loginByYzm:IP+'loginByYzm',
	getEnterpriseById:IP+'getEnterpriseById',
	finishEmployeeInfo:IP+'finishEmployeeInfo',
	refreshEmpState:IP+'refreshEmpState',
	UpdateEmpPwd:IP+'UpdateEmpPwd',
	getEmpInfo: IP+'getEmpInfo',
	activityAdd:IP+'activityAdd',
	activityById:IP+'activityById',
	ActivityUpdate:IP+'ActivityUpdate',
	noticeAdd:IP+'noticeAdd',
	noticeDetailByNoticeId:IP+'noticeDetailByNoticeId',
	noticeListByEntId:IP+'noticeListByEntId',
	activityAllList:IP+'activityAllList',
	employeeAllList:IP+'employeeAllList',
	customerAdd:IP+'customerAdd',
	searchCustomerList:IP+'searchCustomerList',
	customerUpdate:IP+'customerUpdate',
	customerDetailByCustId:IP+'customerDetailByCustId',
	workAdd:IP+'workAdd',
	workDelete:IP+'workDelete',
	customerDelete:IP+'customerDelete',
	customerDetailByCustId:IP+'customerDetailByCustId',
	recruitAdd:IP+'recruitAdd',
	recruitList:IP+'recruitList',
	recruitDetails:IP+'recruitDetails',
	recruitAdd:IP+'recruitAdd',
	imgAdd:IP+'imgAdd',
	payList:IP+'payList',
	addPay:IP+'addPay',
	payDetail:IP+'payDetail',
	getChooseEmpInfo:IP+'getChooseEmpInfo',
	updateEmployeeType:IP+'updateEmployeeType',
	//addNotice:IP+'addNotice',
	noticeDetailByNoticeId:IP+'noticeDetailByNoticeId',
	noticeListByEntId:IP+'noticeListByEntId',
	


	orderList:IP+"workOrderList",//显示工单列表
	operateDetail:IP+"operateDetail",//显示对订单的操作
	updateOrderState:IP+"updateOrderState",//更新订单状态
	operateDesc:IP+"operateDesc",//插入对订单的操作
	getOrderByOrderId:IP+"getOrderByOrderId", //根据订单id查询订单信息
	deleteOrderByOrderId:IP+"deleteOrderByOrderId",//根据订单id删除订单
	customerList:IP+"customerList",//查询用户列表
	getCustomerById:IP+"getCustomerById",//通过id查询客户信息
	addOrder:IP+"addOrder",//添加工单
	alterOrder:IP+"alterOrder",//修改工单
	addRecord:IP+"addRecord",//添加工作记录
	getRecordListByOrderId:IP+"getRecordListByOrderId",//查询订单的工作记录
	getEmployInfByEmpId:IP+"getEmployInfByEmpId",//通过员工id查询员工信息
	deleteRecordById:IP+"deleteRecordById",//通过备注删除备注信息
	distructionEmp:IP+"distructionEmp",//获取配送人员和施工人员信息
	getCount:IP+"getCount",//获取总数

	myJobList:IP+'myJobList',
	jobDetails:IP+'jobDetails',
	jobAdd:IP+'jobAdd',
	addApply:IP+'addApply',
	addFeedBack:IP+'addFeedBack',
	workAddnew:IP+'workAddnew',
	activityAddnew:IP+'activityAddnew',
	updateEmp:IP+'updateEmp',
	
}