/**
 * Created by zhaiyujia on 2016/3/18.
 */
import {createFragment} from 'react-addons-create-fragment'
const taskInfo=[];
for(let i = 0 ; i < 5 ; i ++){
    taskInfo.push({
        key:i,
        info_one:{
            name:'用车人',
            value:`李亮`
        },
        info_two:{
            name:'用车时间',
            value:'2016-02-19 09:00'
        },
        info_three:{
            name:'用车部门',
            value:'综合部'
        },

        info_four:{
            name:'用车原因',
            value:'办理业务'
        },
        info_five:{
            name:'目的地',
            value:'北京住房公积金管理中心'
        },
        info_six:{
            name:'估计用时',
            value:'6小时'
        },

        info_seven:{
            name:'随车人数',
            value:'1'
        },
        info_eight:{
            name:'出车时间',
            value:'办业务'
        },
        info_nine:{
            name:'申请车型',
            value:'箱货'
        },

        info_elevent:{
            name:'回车时间',
            value:'2016-02-19 09:00'
        },
        info_e12:{
            name:'车牌号',
            value:'A22222'
        },
        info_13:{
            name:'取车位置',
            value:'234'
        },

        info_14:{
            name:'周期任务',
            value:'否'
        },
        info_15:{
            name:'出车备注',
            value:'否'
        }
    })
}
let taskTypeText=[
    '已安排','进行中','待派发'
];
export{taskInfo,taskTypeText}