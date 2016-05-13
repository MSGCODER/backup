//staff model and collection
import Backbone from 'backbone';
var staff = Backbone.Model.extend({
    defaults:{
        id:'',
        avatar :'',
        code:'',
        name:'',
        sex:'',
        department:'',
        duties:'',
        IDCardNo:'',
        tel:'',
        address:'',
        employmentDate:'',
        comment:'',
        nonUse:'',
        status:'',
        role:'',
        licenseType:'',
        licenseNo:'',
        expirationDate:'',
        licensingOrganization:'',
        auditDate:'',
        licensingDate:''
    }
});
var staffCollection = Backbone.Collection.extend({
    model:staff
});

var staffDataModel = [];
for(let i = 0; i < 100 ; i++){
    staffDataModel.push({
        key:i,
        id:i,
        avatar :'/img/icon_user_head_50_50_have_1.png',
        code : `code${i}`,
        name :`王宇亭${i}`,
        sex:`${i%2}`,
        department:`部门${i}`,
        duties:`职务${i}`,
        IDCardNo:`身份证号${i}`,
        tel:'w12312',
        address:`地址${i}`,
        employmentDate:'12313',
        comment:'321312',
        nonUse:`${i%2}`,
        status:`${i%4}`,
        role:`${i%3}`,
        licenseType:`准驾类型${i}`,
        licenseNo:'你好',
        expirationDate:'dsasda',
        licensingOrganization:'dasda',
        auditDate:'sda',
        licensingDate:'ads'
    })
}
let staffData = new staffCollection(staffDataModel);
let staffModel = new staff();
export{
    staffModel,staffData,staffCollection,staff
}