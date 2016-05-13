import Backbone from 'backbone';
var task = Backbone.Model.extend({
    defaults:{
        id:'',
        carUser : {
            name:'carUser',
            aliasName:'用车人',
            value:'',
            isShowInCard:''
        },
        useDate:{
            name:'userDate',
            aliasName:'用车时间',
            value:'',
            isShowInCard:''
        },
        useSection :{
            name:'useSection',
            aliasName:'用车部门',
            value:'',
            isShowInCard:''
        },
        useCase :{
            name:'useCase',
            aliasName:'用车原因',
            value:'',
            isShowInCard:'1'
        },
        destination : {
            name:'destination',
            aliasName:'目的地',
            value:'',
            isShowInCard:''
        },
        aboutTime :{
            name:'aboutTime',
            aliasName:'估计用时',
            value:'',
            isShowInCard:''
        },
        followNum :{
            name:'followNum',
            aliasName:'随车人数',
            value:'',
            isShowInCard:'1'
        },
        drawOutTime: {
            name:'drawOutTiem',
            aliasName:'出车时间',
            value:'',
            isShowInCard:''
        },
        applyCarType:{
            name:'applyCarType',
            aliasName:'申请车型',
            value:'',
            isShowInCard:''
        },
        drawInTime: {
            name:'drawInTime',
            aliasName:'回车时间',
            value:'',
            isShowInCard:'1'
        },
        plateNumber :{
            name:'plateNumber',
            aliasName:'车牌号',
            value:'',
            isShowInCard:''
        },
        collectionPosition: {
            name:'collectionPosition ',
            aliasName:'取车位置',
            value:'',
            isShowInCard:''
        },
        cycleTask: {
            name:'cycleTask',
            aliasName:'周期任务',
            value:'',
            isShowInCard:'1'
        },
        outCarRemark : {
            name:'outCarRemark',
            aliasName:'出车备注',
            value:'',
            isShowInCard:''
        },
        vehicleCount:{
            name:'vehicleCount',
            aliasName:'出车数',
            value:'',
            isShowInCard:''
        },
        hasReturn:{
            name:"hasReturn",
            aliasName:'已回车',
            value:'',
            isShowInCard:''
        }
    }
});
var taskModelTest = new task();
export{
    taskModelTest,task
}