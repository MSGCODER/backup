import Backbone from 'backbone';
var staff = Backbone.Model.extend({
    defaults:{
        id:'',
        code : {
            name:'Code',
            aliasName:'编码',
            value:'',
            isShowInCard:''
        },
        headImg:'',
        gender:{
            name:'Gender',
            aliasName:'性别',
            value:'',
            isShowInCard:''
        },
        name :{
            name:'Name',
            aliasName:'姓名',
            value:'',
            isShowInCard:''
        },
        section :{
            name:'Section',
            aliasName:'部门',
            value:'',
            isShowInCard:'1'
        },
        job : {
            name:'Job',
            aliasName:'工作',
            value:'',
            isShowInCard:''
        },
        idNumber :{
            name:'Id',
            aliasName:'身份证号',
            value:'',
            isShowInCard:''
        },
        phoneNumber :{
            name:'PhoneNumber',
            aliasName:'手机',
            value:'',
            isShowInCard:'1'
        },
        address : {
            name:'Address',
            aliasName:'家庭住址',
            value:'',
            isShowInCard:''
        },
        joinData:{
            name:'JoinData',
            aliasName:'入职日期',
            value:'',
            isShowInCard:''
        },
        remark : {
            name:'Remark',
            aliasName:'备注',
            value:'',
            isShowInCard:'1'
        },
        outAge :{
            name:'OutAge',
            aliasName:'是否停用',
            value:'',
            isShowInCard:''
        },
        type : {
            name:'Type',
            aliasName:'职员类型',
            value:'',
            isShowInCard:''
        },
        drivingLicense : {
            name:'DrivingLicense',
            aliasName:'驾驶证号',
            value:'',
            isShowInCard:'1'
        },
        validDate : {
            name:'ValidDate',
            aliasName:'有效期',
            value:'',
            isShowInCard:''
        },
        authorizedBy: {
            name:'AuthorizedBy',
            aliasName:'发证机关',
            value:'',
            isShowInCard:''
        },
        annualExamination :{
            name:'AnnualExamination',
            aliasName:'年审到期',
            value:'',
            isShowInCard:''
        },
        startLicenseData:{
            name:'StartLicenseData',
            aliasName:'领证日期',
            value:'',
            isShowInCard:''
        },
        licenseType:{
            name:'LicenseType',
            aliasName:'准驾车型',
            value:'',
            isShowInCard:'1'
        }
    }
});
var staffCollection = Backbone.Collection.extend({
   model:staff
});

var staffDataModel = [];
for(let i = 0; i < 100 ; i++){
    staffDataModel.push({
        id:i,
        code :{
            name:'Code',
            aliasName:'编码',
            isShowInCard:'',
            value:`Code${i}`
        },
        headImg:'/img/icon_user_head_50_50_have_1.png',
        status:`${i%2}`,
        gender:{
            name:'Gender',
            aliasName:'性别',
            value:`${i%2}`,
            isShowInCard:''
        },
        name :{
            name:'Code',
            aliasName:'姓名',
            isShowInCard:'',
            value:`王宇亭${i}`
        },
        section : {
            name:'Code',
            aliasName:'部门',
            isShowInCard:'1',
            value:`车队${i}`
        },
        job :{
            name:'Code',
            aliasName:'工作',
            isShowInCard:'',
            value:`Job${i}`
        },
        idNumber :{
            name:'Code',
            aliasName:'身份证号',
            isShowInCard:'',
            value:`身份证号码${i}`
        },
        phoneNumber :{
            name:'Code',
            aliasName:'手机号码',
            isShowInCard:'1',
            value:`电话号码${i}`
        },
        address : {
            name:'Code',
            aliasName:'地址',
            isShowInCard:'',
            value:`地址${i}`
        },
        joinData:{
            name:'Code',
            aliasName:'入职日期',
            isShowInCard:'',
            value:`入职日期${i}`
        },
        remark :{
            name:'Code',
            aliasName:'备注',
            isShowInCard:'1',
            value:`备注${i}`
        },
        outAge :{
            name:'Code',
            aliasName:'是否停用',
            isShowInCard:'',
            value:`${i%2+1}`
        },
        type : `${i%3}` ,
        drivingLicense :{
            name:'Code',
            aliasName:'驾驶证号',
            isShowInCard:'1',
            value:`驾驶证号${i}`
        },
        validDate : {
            name:'Code',
            aliasName:'有效期',
            isShowInCard:'',
            value:`有效期${i}`
        },
        authorizedBy:{
            name:'Code',
            aliasName:'发证机关',
            isShowInCard:'',
            value:`发证机关${i}`
        },
        annualExamination :{
            name:'Code',
            aliasName:'年审到期',
            isShowInCard:'',
            value:`年检${i}`
        },
        startLicenseData:{
            name:'Code',
            aliasName:'领证日期',
            isShowInCard:'',
            value:`领证日期${i}`
        },
        licenseType:{
            name:'Code',
            aliasName:'准驾车型',
            isShowInCard:'1',
            value:`准驾类型${i}`
        }
    })
}
let staffData = new staffCollection(staffDataModel);
let staffModel = new staff();
export{
    staffModel,staffData,staffCollection,staffDataModel
}