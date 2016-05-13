import Backbone from 'backbone';
var cardKey = Backbone.Model.extend({
   defaults:{
       index:'',
       name:'',
       value:''
   }
});
var cardList = Backbone.Collection.extend({
    model:cardKey
});
//对照表
var cardsDriver =[
    {
        index:'1',
        name:'code',
        aliasName:'编码',
        value:''
    },
    {
        index:'3',
        name:'sex',
        aliasName:'性别',
        value:''
    },
    {
        index:'4',
        name:'department',
        aliasName:'所在部门',
        value:''
    },
    {
        index:'5',
        name:'duties',
        aliasName:'职务',
        value:''
    },
    {
        index:'6',
        name:'IDCardNo',
        aliasName:'身份证号',
        value:''
    },
    {
        index:'7',
        name:'tel',
        aliasName:'手机号码',
        value:''
    },
    {
        index:'8',
        name:'address',
        aliasName:'家庭住址',
        value:''
    },
    {
        index:'9',
        name:'employmentDate',
        aliasName:'入职日期',
        value:''
    },
    {
        index:'10',
        name:'comment',
        aliasName:'备注',
        value:''
    },
    {
        index:'14',
        name:'licenseNo',
        aliasName:'驾驶证号',
        value:''
    },
    {
        index:'15',
        name:'licenseType',
        aliasName:'驾照类型',
        value:''
    },
    {
        index:'16',
        name:'expirationDate',
        aliasName:'有效期限',
        value:''
    },
    {
        index:'17',
        name:'licensingOrganization',
        aliasName:'发证机关',
        value:''
    },
    {
        index:'18',
        name:'auditDate',
        aliasName:'年审到期',
        value:''
    },
    {
        index:'19',
        name:'licensingDate',
        aliasName:'领证日期',
        value:''
    }
];

const cardsStaff =[
    {
        index:'1',
        name:'code',
        aliasName:'编码',
        value:''
    },
    {
        index:'3',
        name:'sex',
        aliasName:'性别',
        value:''
    },
    {
        index:'4',
        name:'department',
        aliasName:'所在部门',
        value:''
    },
    {
        index:'6',
        name:'IDCardNo',
        aliasName:'身份证号',
        value:''
    },
    {
        index:'7',
        name:'tel',
        aliasName:'手机号码',
        value:''
    },
    {
        index:'8',
        name:'address',
        aliasName:'家庭住址',
        value:''
    },
    {
        index:'9',
        name:'employmentDate',
        aliasName:'入职日期',
        value:''
    },
    {
        index:'10',
        name:'comment',
        aliasName:'备注',
        value:''
    }
];
var cardVehicle = [
    {
        index:'2',
        name:'code',
        aliasName:'编码',
        value:''
    },
    {
        index:'3',
        name:'brand',
        aliasName:'车辆品牌',
        value:''
    },
    {
        index:'4',
        name:'model',
        aliasName:'车辆型号',
        value:''
    },
    {
        index:'5',
        name:'type',
        aliasName:'车辆类型',
        value:''
    },
    {
        index:'6',
        name:'tags',
        aliasName:'标签',
        value:''
    },
    {
        index:'7',
        name:'color',
        aliasName:'颜色',
        value:''
    },
    {
        index:'8',
        name:'capacity',
        aliasName:'载重',
        value:''
    },
    {
        index:'9',
        name:'seats',
        aliasName:'座位数',
        value:''
    },
    {
        index:'10',
        name:'oilWear',
        aliasName:'油耗',
        value:''
    },
    {
        index:'11',
        name:'enduranceMileage',
        aliasName:'续航里程',
        value:''
    },
    {
        index:'12',
        name:'startMileage',
        aliasName:'初始里程',
        value:''
    },
    {
        index:'13',
        name:'engineNo',
        aliasName:'发动机号',
        value:''
    },
    {
        index:'14',
        name:'vin',
        aliasName:'车架号',
        value:''
    },
    {
        index:'15',
        name:'purchaseCompany',
        aliasName:'购入单位',
        value:''
    },
    {
        index:'16',
        name:'purchasePrice',
        aliasName:'购入价格',
        value:''
    },
    {
        index:'17',
        name:'purchaseDate',
        aliasName:'购入日期',
        value:''
    },
    {
        index:'18',
        name:'driverName',
        aliasName:'司机',
        value:''
    },
    {
        index:'19',
        name:'driverTel',
        aliasName:'司机手机',
        value:''
    },
    {
        index:'20',
        name:'department',
        aliasName:'所属部门',
        value:''
    },
    {
        index:'21',
        name:'vehicleOwner',
        aliasName:'所属车主',
        value:''
    },
    {
        index:'22',
        name:'vehicleGroup',
        aliasName:'所属车队',
        value:''
    },
    {
        index:'23',
        name:'oilCardNo',
        aliasName:'油卡编号',
        value:''
    },
    {
        index:'24',
        name:'electricCardNo',
        aliasName:'电卡编号',
        value:''
    },
    {
        index:'25',
        name:'status',
        aliasName:'车辆状态',
        value:''
    },
    {
        index:'26',
        name:'nonUse',
        aliasName:'是否停用',
        value:''
    },
    {
        index:'27',
        name:'comment',
        aliasName:'备注',
        value:''
    },
    {
        index:'28',
        name:'vehicleNo',
        aliasName:'车牌号',
        value:''
    }
];
var cardTask = [
    {
        index:'0',
        name:'vehicleCount',
        aliasName:'车辆总数',
        value:''
    },
    {
        index:'0',
        name:'code',
        aliasName:'编码',
        value:''
    },
    {
        index:'1',
        name:'destination',
        aliasName:'目的地',
        value:''
    },
    {
        index:'2',
        name:'vehicleUser',
        aliasName:'用车人',
        value:''
    },
    {
        index:'3',
        name:'driverReturnCount',
        aliasName:'已回车',
        value:''
    },
    {
        index:'4',
        name:'vehicleUseTime',
        aliasName:'用车时间',
        value:''
    },
    {
        index:'5',
        name:'costTime',
        aliasName:'估计用时',
        value:''
    },
    {
        index:'6',
        name:'vehicleUseReason',
        aliasName:'用车原因',
        value:''
    },
    {
        index:'7',
        name:'applyForVehicleModel',
        aliasName:'申请车型',
        value:''
    },
    {
        index:'8',
        name:'passengers',
        aliasName:'随车人数',
        value:''
    },
    {
        index:'9',
        name:'comment',
        aliasName:'用车备注',
        value:''
    },
    {
        index:'10',
        name:'scheduledMission',
        aliasName:'周期任务',
        value:''
    },
    {
        index:'15',
        name:'mileage',
        aliasName:'出车里程',
        value:''
    },
    {
        index:'16',
        name:"returnDate",
        aliasName:'预计回车时间',
        value:''
    },
    {
        index:'17',
        name:'driveOutTime',
        aliasName:'出车时间',
        value:''
    },
    {
        index:'18',
        name:'placement',
        aliasName:'取车位置',
        value:''
    },
    {
        index:'19',
        name:'vehicleNo',
        aliasName:'车牌号',
        value:''
    },
    {
        index:'20',
        name:'staffName',
        aliasName:'司机',
        value:''
    },
];
export{cardList,cardsDriver,cardsStaff,cardVehicle,cardTask}