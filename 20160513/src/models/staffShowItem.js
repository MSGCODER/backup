import Backbone from 'backbone';
var staffShowItem = Backbone.Model.extend({
    defaults:{
        key:'',
        type:'',
        name:'',
        headerImage:'',
        status:'',
        info_one:{
            name:'',
            value:''
        },
        info_two:{
            name:'',
            value:''
        },
        info_three:{
            name:'',
            value:''
        },

        info_four:{
            name:'',
            value:''
        },
        info_five:{
            name:'',
            value:''
        }
    }
});
let staffShowModels = [];
for(let i = 0; i < 100 ; i++){
    staffModels.push({
        id:i,
        type:`${i%3}`,
        name :`王宇亭${i}`,
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
var staffShowList = Backbone.Collection.extend({
   model:staffShowItem
});