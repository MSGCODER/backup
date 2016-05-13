/**
 * Created by zhaiyujia on 2016/3/28.
 */
import Backbone from 'backbone';
var CarInfo = Backbone.Model.extend({
    defaults:{
        id:'',
        motorcade:{
            name:'motorcade',
            aliasName:'所属车队',
            value:'',
            isShowInCard:''
        },
        carType : {
            name:'carType',
            aliasName:'车辆类型',
            value:'',
            isShowInCard:''
        },
        code :{
            name:'code',
            aliasName:'编码',
            value:'',
            isShowInCard:'1'
        },
        numberPlate :{
            name:'numberPlate',
            aliasName:'车牌号',
            value:'',
            isShowInCard:'1'
        },
        vehicleTonnage :{
            name:'vehicleTonnage',
            aliasName:'车辆吨位',
            value:'',
            isShowInCard:''
        },
        rechargeMileage : {
            name:'rechargeMileage',
            aliasName:'续航里程',
            value:'',
            isShowInCard:''
        }
    }
});
var carInfoCollection = Backbone.Collection.extend({
    model:CarInfo
});
const carInfo=[];
for(let i = 0 ; i < 50 ; i ++){
    carInfo.push({
        id:i,
        motorcade:{
            name:'motorcade',
            aliasName:'所属车队',
            value:`所属车队${i}`,
            isShowInCard:''
        },
        carType : {
            name:'carType',
            aliasName:'车辆类型',
            value:`车辆类型${i}`,
            isShowInCard:''
        },
        code :{
            name:'code',
            aliasName:'编码',
            value:`编码${i}`,
            isShowInCard:'1'
        },
        numberPlate :{
            name:'numberPlate',
            aliasName:'车牌号',
            value:`车牌号${i}`,
            isShowInCard:'1'
        },
        vehicleTonnage :{
            name:'vehicleTonnage',
            aliasName:'车辆吨位',
            value:`车辆吨位${i}`,
            isShowInCard:''
        },
        rechargeMileage : {
            name:'rechargeMileage',
            aliasName:'续航里程',
            value:`续航里程${i}`,
            isShowInCard:''
        },
        name : {
            name:'name',
            aliasName:'姓名',
            value:`姓名${i}`,
            isShowInCard:''
        },
        licenseType :{
            name:'licenseType',
            aliasName:'驾照类别',
            value:`驾照类别${i}`,
            isShowInCard:'1'
        },
        personnelStatus :{
            name:'personnelStatus',
            aliasName:'人员状态',
            value:`人员状态${i}`,
            isShowInCard:'1'
        },
        marker :{
            name:'marker',
            aliasName:'备注',
            value:`备注${i}`,
            isShowInCard:''
        },
        address : {
            name:'address',
            aliasName:'家庭住址',
            value:`家庭住址${i}`,
            isShowInCard:''
        }
    })
}
var carInfoList = new carInfoCollection(carInfo);
var carInfoModel = new CarInfo();
export{
    carInfoList,carInfoModel
}