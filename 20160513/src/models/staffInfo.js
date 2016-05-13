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
        Name :`����ͤ${i}`,
        Section : `����${i}`,
        Job :'ְ��',
        Id :i,
        PhoneNumber :"12321321232",
        Address : "213213213",
        JoinData:"��ְ����",
        Remark :"��ע",
        OutAge :"�Ƿ�ͣ��",
        Type : `${i%3}` ,
        DrivingLicense :"��ʻ֤��",
        ValidDate : '��Ч����',
        AuthorizedBy: "��֤����",
        AnnualExamination :"������",
        StartLicenseData:"��֤����",
        LicenseType:"A"
    })
}
var  staffList = Backbone.Collection.extend({
    model:staff
});

let staffs = new staffList(staffModels);
export{staffs}