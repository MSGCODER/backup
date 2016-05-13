import Backbone from 'backbone';
var taskSetting = Backbone.Model.extend({
    defaults:{
        single:{
            vehicleCount:true, //出车数
            hasReturn:true,     //已回车
            drawOutTime:true,  //出车时间
            outCarRemark:true,        //出车备注
            carUser:true,       //用车人
            destination:true,  //目的地
            cycleTask:false,   //周期任务
            aboutTime:false,   //估计用时
            applyCarType:false, //申请车型
            collectionPosition:false, //取车位置
            useCase:false,      //出车原因
            drawInTime:false,  //预计回车时间
            followNum:false   //随车人数
        },
        multi:{
            vehicleCount:true,
            hasReturn:true,
            drawOutTime:true,
            outCarRemark:true,
            carUser:true,
            destination:true,
            cycleTask:false,
            aboutTime:false,
            applyCarType:false,
            collectionPosition:false,
            useCase:false,
            drawInTime:false,
            followNum:false,
            plateNumber:false //车牌号
        },
        distributing:{
            drawOutTime:true,
            outCarRemark:true,
            carUser:true,
            destination:true,
            cycleTask:false,
            aboutTime:true,
            applyCarType:false,
            collectionPosition:false,
            useCase:true,
            drawInTime:false,
            followNum:false,
            useSection:false //用车部门
        }
    }
});
let taskSettingModel = new taskSetting();
export{
    taskSettingModel,taskSetting
}