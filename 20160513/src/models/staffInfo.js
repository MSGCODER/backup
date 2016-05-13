import Backbone from 'backbone';
var staff = Backbone.Model.extend({
   defaults:{
       id:'',
       Code : "",
       HeadImg:"",
       Name : "",
       Section :"",
       Job : "",
       Id :"",
       PhoneNumber :"",
       Address : "",
       JoinData:"",
       Remark :"",
       OutAge :"",
       Type : "" ,
       DrivingLicense : "",
       ValidDate : "",
       AuthorizedBy: "",
       AnnualExamination :"",
       StartLicenseData:"",
       LicenseType:""
   }
});
let staffModels = [];
for(let i = 0; i < 100 ; i++){
    staffModels.push({
        id:i,
        Code :i,
        Name :`王宇亭${i}`,
        Section : `车队${i}`,
        Job :'职务',
        Id :i,
        PhoneNumber :"12321321232",
        Address : "213213213",
        JoinData:"入职日期",
        Remark :"备注",
        OutAge :"是否停用",
        Type : `${i%3}` ,
        DrivingLicense :"驾驶证号",
        ValidDate : '有效期限',
        AuthorizedBy: "发证机关",
        AnnualExamination :"年审到期",
        StartLicenseData:"领证日期",
        LicenseType:"A"
    })
}
var  staffList = Backbone.Collection.extend({
    model:staff
});

let staffs = new staffList(staffModels);
export{staffs}