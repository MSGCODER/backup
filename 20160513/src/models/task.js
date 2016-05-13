//task model and collection
import Backbone from 'backbone';
var task = Backbone.Model.extend({
    defaults:{
        id:'',
        code :'',
        destination:'',
        vehicleUser:'',
        vehicleUseTime:'',
        costTime:'',
        vehicleUseReason:'',
        applyForVehicleModel:'',
        passengers:'',
        comment:'',
        scheduledMission:'',
        status:'',
        creator:'',
        createTime:'',
        mileage:'',
        returnDate:'',
        driveOutTime:'',
        driveReturnCount:'',
        type:'',
        staffName:'',
        vehicleNo:''
    },
});
var taskCollection = Backbone.Collection.extend({
    model:task
});

var taskDataModel = [];
for(let i = 0; i < 20 ; i++){
    taskDataModel.push({
        id:`${i}`,
        code :`code${i}`,
        destination:`目的地${i}`,
        vehicleUser:`用车人${i}`,
        vehicleUseTime:`用车时间${i}`,
        costTime:`估计用时${i}`,
        vehicleUseReason:`用车原因${i}`,
        applyForVehicleModel:`申请车型${i}`,
        passengers:`随车人数${i}`,
        comment:`用车备注${i}`,
        scheduledMission:`周期任务${i}`,
        status:`${i%3}`,
        creator:`任务创建人${i}`,
        createTime:`创建时间${i}`,
        mileage:`出车里程${i}`,
        returnDate:`预计回车时间${i}`,
        driveOutTime:`出车时间${i}`,
        driveReturnCount:`已回车${i}`,
    })
}
let taskData = new taskCollection(taskDataModel);
let taskModel = new task();
export{
    taskModel,taskData,taskCollection,task
}
