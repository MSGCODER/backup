/**
 * Created by zhaiyujia on 2016/3/21.
 */
import Backbone from 'backbone';
var completedTask = Backbone.Model.extend({
    defaults:{
        id:'',
        code:{
            name:'taskNum',
            aliasName:'任务编码',
            value:'',
            isShowInCard:''
        },
        useDate:{
            name:'userDate',
            aliasName:'出车日期',
            value:'',
            isShowInCard:''
        },
        drawInTime: {
            name:'drawInTime',
            aliasName:'回车日期',
            value:'',
            isShowInCard:''
        },
        plateNumber :{
            name:'plateNumber',
            aliasName:'车牌号码',
            value:'',
            isShowInCard:''
        },
        driver: {
            name:'driver',
            aliasName:'司机',
            value:'',
            isShowInCard:''
        },
        userPerson :{
            name:'userPerson',
            aliasName:'用车人',
            value:'',
            isShowInCard:''
        },
        mileage: {
            name:'mileage',
            aliasName:'里程',
            value:'',
            isShowInCard:''
        },
        destination: {
            name:'destination',
            aliasName:'地点',
            value:'',
            isShowInCard:''
        },
        Type : {
            name:'Type',
            aliasName:'任务类型',
            value:'',
            isShowInCard:''
        }
    }
});
var CompletedtaskCollection = Backbone.Collection.extend({
    model:completedTask
});
const completedtaskInfo=[];
for(let i = 0 ; i < 10; i ++){
    completedtaskInfo.push({
        id:i,
        taskNum:{
            name:'taskNum',
            aliasName:'任务编码',
            value:`3-${i}`,
            isShowInCard:''
        },
        useDate:{
            name:'userDate',
            aliasName:'出车日期',
            value:`出车日期${i}`,
            isShowInCard:''
        },
        drawInTime: {
            name:'drawInTime',
            aliasName:'回车日期',
            value:`回车日期${i}`,
            isShowInCard:''
        },
        plateNumber :{
            name:'plateNumber',
            aliasName:'车牌号码',
            value:`车牌号码${i}`,
            isShowInCard:''
        },
        driver: {
            name:'driver',
            aliasName:'司机',
            value:`司机${i}`,
            isShowInCard:''
        },
        userPerson :{
            name:'userPerson',
            aliasName:'用车人',
            value:`用车人${i}`,
            isShowInCard:''
        },
        mileage: {
            name:'mileage',
            aliasName:'里程',
            value:`里程${i}`,
            isShowInCard:''
        },
        destination: {
            name:'destination',
            aliasName:'地点',
            value:`杭州长江汽车有限公司${i}`,
            isShowInCard:''
        },
        Type : `${i%2}`
    })
}
var completedtaskList = new CompletedtaskCollection(completedtaskInfo);
var completedtaskModel = new completedTask();
export{
    completedtaskModel,completedtaskList
}