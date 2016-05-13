import {createFragment} from 'react-addons-create-fragment'
const vehicleInfo=[];
for(let i = 0 ; i < 50 ; i ++){
    vehicleInfo.push({
        key:i,
        type:`${i%3}`,
        name:`车${i}`,
        headerImage:'/img/icon_user_head_50_50_have_1.png',
        status:`${i%3}`,
        info_one:{   name:'车牌号',
            value:`京A${i}`
        },
        info_two:{
            name:'车辆类型',
            value:'客车'
        },
        info_three:{
            name:'标签',
            value:'早班车'
        },

        info_four:{
            name:'座位数',
            value:i
        },
        info_five:{
            name:'备注',
            value:'不带宠物'
        }
    })
}
let vehicleTypeText=[
  '客车','货车','其他'
];
export{vehicleInfo,vehicleTypeText}