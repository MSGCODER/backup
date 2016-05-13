import Backbone from 'backbone';
var task = Backbone.Model.extend({
    defaults:{
        id:'',
        useDate:{
            name:'userDate',
            aliasName:'用车时间',
            value:'',
            isShowInCard:''
        },
        carUser : {
            name:'carUser',
            aliasName:'用车人',
            value:'',
            isShowInCard:''
        },
        useCase :{
            name:'useCase',
            aliasName:'用车原因',
            value:'',
            isShowInCard:'1'
        },
        aboutTime :{
            name:'aboutTime',
            aliasName:'估计用时',
            value:'',
            isShowInCard:''
        },
        destination : {
            name:'destination',
            aliasName:'目的地',
            value:'',
            isShowInCard:''
        },
        useCarRemark : {
            name:'outCarRemark',
            aliasName:'用车备注',
            value:'',
            isShowInCard:''
        },
        applyCarType:{
            name:'applyCarType',
            aliasName:'申请车型',
            value:'',
            isShowInCard:''
        },
        followNum :{
            name:'followNum',
            aliasName:'随车人数',
            value:'',
            isShowInCard:'1'
        },
        cycleTask: {
            name:'cycleTask',
            aliasName:'周期性任务',
            value:'',
            isShowInCard:'1'
        },
        drawOutTime: {
            name:'drawOutTiem',
            aliasName:'出车时间',
            value:'',
            isShowInCard:''
        },
        plateNumber :{
            name:'plateNumber',
            aliasName:'车牌号',
            value:'',
            isShowInCard:''
        },
        driver :{
            name:'driver',
            aliasName:'司机',
            value:'',
            isShowInCard:''
        },
        collectionPosition: {
            name:'collectionPosition ',
            aliasName:'取车位置',
            value:'',
            isShowInCard:''
        },
        backInTime: {
            name:'backInTime ',
            aliasName:'预计回车时间',
            value:'',
            isShowInCard:''
        },
        mileage: {
            name:'mileage ',
            aliasName:'出车里程',
            value:'',
            isShowInCard:''
        },
        alreadyEnter: {
            name:'alreadyEnter ',
            aliasName:'已回车',
            value:'',
            isShowInCard:''
        },
        Type : {
            name:'Type',
            aliasName:'任务类型',
            value:'',
            isShowInCard:''
        },
        carType:{
            name:'carType',
            aliasName:'出车任务类型',
            value:'',
            isShowInCard:''
        }
    }
});
var taskCollection = Backbone.Collection.extend({
    model:task
});
const taskInfo=[];
for(let i = 0 ; i < 100 ; i ++){
    taskInfo.push({
        id:i,
        useDate:{
            name:'userDate',
            aliasName:'用车时间',
            value:`用车时间${i}`,
            isShowInCard:''
        },
        carUser : {
            name:'carUser',
            aliasName:'用车人',
            value:`用车人${i}`,
            isShowInCard:''
        },
        useCase :{
            name:'useCase',
            aliasName:'用车原因',
            value:`用车原因${i}`,
            isShowInCard:'1'
        },
        aboutTime :{
            name:'aboutTime',
            aliasName:'估计用时',
            value:`估计用时${i}`,
            isShowInCard:''
        },
        destination : {
            name:'destination',
            aliasName:'目的地',
            value:`目的地${i}`,
            isShowInCard:''
        },
        useCarRemark : {
            name:'outCarRemark',
            aliasName:'用车备注',
            value:`用车备注${i}`,
            isShowInCard:''
        },
        applyCarType:{
            name:'applyCarType',
            aliasName:'申请车型',
            value:`申请车型${i}`,
            isShowInCard:''
        },
        followNum :{
            name:'followNum',
            aliasName:'随车人数',
            value:`随车人数${i}`,
            isShowInCard:'1'
        },
        cycleTask: {
            name:'cycleTask',
            aliasName:'周期性任务',
            value:`周期性任务${i}`,
            isShowInCard:'1'
        },
        drawOutTime: {
            name:'drawOutTiem',
            aliasName:'出车时间',
            value:`出车时间${i}`,
            isShowInCard:''
        },
        plateNumber :{
            name:'plateNumber',
            aliasName:'车牌号',
            value:`车牌号${i}`,
            isShowInCard:''
        },
        driver :{
            name:'driver',
            aliasName:'司机',
            value:`司机${i}`,
            isShowInCard:''
        },
        collectionPosition: {
            name:'collectionPosition ',
            aliasName:'取车位置',
            value:`取车位置${i}`,
            isShowInCard:''
        },
        backInTime: {
            name:'backInTime ',
            aliasName:'预计回车时间',
            value:`预计回车时间${i}`,
            isShowInCard:''
        },
        mileage: {
            name:'mileage ',
            aliasName:'出车里程',
            value:`出车里程${i}`,
            isShowInCard:''
        },
        alreadyEnter: {
            name:'alreadyEnter ',
            aliasName:'已回车',
            value:`已回车${i}`,
            isShowInCard:''
        },
        Type : `${i%3}`,
        carType : `${i%2}`
    })
}
var taskList = new taskCollection(taskInfo);
var taskModel = new task();
export{
    taskModel,taskList
}