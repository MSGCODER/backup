//vehicle model and collection
import Backbone from 'backbone';
var vehicle = Backbone.Model.extend({
    defaults:{
        id:'',
        avatar:'',
        label:'',
        code:'',
        brand: '',
        model:'',
        type:'',
        tags:'',
        color:'',
        capacity:'',
        seats:'',
        oilWear:'',
        enduranceMileage:'',
        startMileage:'',
        engineNo:'',
        vin:'',
        purchaseCompany:'',
        purchasePrice:'',
        purchaseDate:'',
        driverName:'',
        driverTel:'',
        department:'',
        vehicleOwner:'',
        vehicleNo:'',
        vehicleOwnerTel:'',
        vehicleGroup:'',
        oilCardNo:'',
        electricCardNo:'',
        status:'',
        nonUse:'',
        comment:''
    }
});
var vehicleCollection = Backbone.Collection.extend({
    model:vehicle
});
var vehicleDataModel = [];
for(let i = 0; i < 100 ; i++){
    vehicleDataModel.push({
        key:i,
        id:i,
        avatar:'/img/vehicle-header.png',
        label:'车辆代号',
        code:'编码',
        brand: '车辆品牌',
        model:'车辆型号',
        type:`${i%3}`,
        tags:'车辆标签',
        color:'车辆颜色',
        capacity:'载重量',
        seats:'座位数',
        oilWear:'油耗',
        enduranceMileage:'续航里程',
        startMileage:'初始里程',
        engineNo:'发动机号',
        vin:'车架号',
        purchaseCompany:'购入单位',
        purchasePrice:'购入价格',
        purchaseDate:'购入日期',
        driverName:'司机',
        driverTel:'手机手机',
        department:'所属部门',
        vehicleOwner:'所属车主',
        vehicleNo:'车牌号',
        vehicleOwnerTel:'车主手机',
        vehicleGroup:'所属车队',
        oilCardNo:'油卡编号',
        electricCardNo:'电卡编号',
        status:`${i%3}`,
        nonUse:'是否停用',
        comment:'备注'
    })
}
let vehicleData = new vehicleCollection(vehicleDataModel);
let vehicleModel = new vehicle();
export{
    vehicleModel,vehicleData,vehicleCollection,vehicle
}
