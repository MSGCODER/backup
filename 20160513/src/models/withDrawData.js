/**
 * Created by zhaiyujia on 2016/3/26.
 */
import Backbone from 'backbone';
var withDrawInfo = Backbone.Model.extend({
    defaults:{
        id:'',
        code :{
            name:'code',
            aliasName:'编码',
            value:'',
            isShowInCard:''
        },
        plateNumber :{
            name:'plateNumber',
            aliasName:'车牌号',
            value:'',
            isShowInCard:''
        },
        driver :{
            name:'driver',
            aliasName:'司机',
            value:'',
            isShowInCard:''
        },
        drawOutTime: {
            name:'drawOutTiem',
            aliasName:'出车时间',
            value:'',
            isShowInCard:''
        },
        collectionPosition: {
            name:'collectionPosition ',
            aliasName:'取车位置',
            value:'',
            isShowInCard:''
        }
    }
});
var withDrawCollection = Backbone.Collection.extend({
    model:withDrawInfo
});
const withDrawData=[];
for(let i = 0 ; i < 3 ; i ++){
    withDrawData.push({
        id:i,
        code :{
            name:'code',
            aliasName:'编码',
            value:`${i}`,
            isShowInCard:''
        },
        plateNumber :{
            name:'plateNumber',
            aliasName:'车牌号',
            value:`车牌号${i}`,
            isShowInCard:''
        },
        driver :{
            name:'driver',
            aliasName:'司机',
            value:`司机${i}`,
            isShowInCard:''
        },
        drawOutTime: {
            name:'drawOutTiem',
            aliasName:'出车时间',
            value:`出车时间${i}`,
            isShowInCard:''
        },
        collectionPosition: {
            name:'collectionPosition ',
            aliasName:'取车位置',
            value:`取车位置${i}`,
            isShowInCard:''
        }
    })
}
var withDrawList = new withDrawCollection(withDrawData);
var withDrawModel = new withDrawInfo();
export{
    withDrawModel,withDrawList
}