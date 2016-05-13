import {createFragment} from 'react-addons-create-fragment'
const staffInfo=[];
for(let i = 0 ; i < 50 ; i ++){
    staffInfo.push({
        key:i,
        type:`${i%3}`,
        name:`人${i}`,
        headerImage:'/img/icon_user_head_50_50_have_1.png',
        status:`${i%3}`,
        info_one:{   name:'部门',
                    value:`车队${i}`
        },
        info_two:{
                name:'手机',
                value:'132123212323'
        },
        info_three:{
                name:'准驾车型',
                value:'A1'
        },

        info_four:{
                 name:'驾驶证号',
                 value:'2312321321'
        },
        info_five:{
            name:'备注',
            value:'hello'
        }
    })
}
let staffTypeText=[
  '司机','管理员','其他'
];
export{staffInfo,staffTypeText}