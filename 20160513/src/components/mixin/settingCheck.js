import _ from 'underscore'
import {message} from 'antd';
const saveSuccess = function () {
    console.log('save');
    message.success('保存成功');
};

const saveError = function () {
    message.error('保存失败');
};
const settingCheckMinx ={
    handleCheck(e){
        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
        let selectItemKeys =this.state.selectItemKeys;
        let cardKey =this.state.cardKey;
        if(selectItemKeys.length < 5){
            if(e.target.checked){
                selectItemKeys.push(e.target.value);
                var selectedArrayTemp = this.handelAtOfName(cardKey,selectItemKeys);
                this.setState({
                    selectItemKeys:selectItemKeys,
                    selectedArray:selectedArrayTemp
                })
            }else{
                selectItemKeys.remove(e.target.value);
                var selectedArrayTemp =this.handelAtOfName(cardKey,selectItemKeys);
                this.setState({
                    selectItemKeys:selectItemKeys,
                    selectedArray:selectedArrayTemp
                })
            }
        }else{
            if(e.target.checked){
                this.setState({
                    selectItemKeys:selectItemKeys
                })
            }else{
                selectItemKeys.remove(e.target.value);
                var selectedArrayTemp = this.handelAtOfName(cardKey,selectItemKeys);
                this.setState({
                    selectItemKeys:selectItemKeys,
                    selectedArray:selectedArrayTemp
                })
            }
        }
    },
    handleDefaultChecked(name){
        let selectItemKeys =this.state.selectItemKeys;
        for(let i = 0 ; i < selectItemKeys.length;i++){
            if(name ==  this.state.selectItemKeys[i]){
                return true;
            }
        }
    },
    handelAtOfName(cardKey,array){
        let arrayTemp = [];
        for(let i = 0; i < array.length ; i++){
            for(let j = 0 ; j < cardKey.length ; j ++){
                if(array[i] == cardKey [j].name){
                    arrayTemp.push(cardKey[j]);
                //todo break; 待验证
                }
            }
        }
        return arrayTemp;
    },
    deleteAtOfName(array){
        let arrayTemp = [];
        let cardKey = _.clone(this.state.cardKey);
        for(let i = 0 ; i < cardKey.length ; i ++){
            let flag = true;
            for(let j = 0 ; j < array.length ; j ++){
                if(cardKey[i].name == array[j]){
                    flag = false;
                    break;
                }
            }
            if(flag){
                arrayTemp.push(cardKey[i]);
            }
        }
        return arrayTemp;
    },
    //排序，保证卡片显示的条目有序
    softByIndex(array,key){
        let afterSoft =  _.sortBy(array, key);
        return afterSoft
    },
    //初始化展示条目key
    getSelectItemKeys(baseUrl,nav){
        this.taskSetting = $.get({
            url:baseUrl+'?module='+nav,
            success:function(result){
                if(result.status.code == 200){
                    this.setState({
                        selectItemKeys:result.data
                    },function(){
                        let selectArray = this.handelAtOfName(this.state.cardKey,this.state.selectItemKeys);
                        this.setState({
                            selectedArray:selectArray
                        });
                    });
                }
            }.bind(this),
            error:function(){
            }
        });
    },
    //保存自定义展示条目
    saveSelectItemKeys(baseUrl,moduel){
        let selectKeys = this.state.selectItemKeys;
        this.taskSettingUpdate = $.post({
            url:baseUrl+'/update/',
            data:{
                module:moduel,
                displaySetting:JSON.stringify(selectKeys)
            },
            success:function(result){
                if(result.status.code == 200){
                    saveSuccess()
                }
            }.bind(this),
            error:function(){
                saveError()
            }
        });
    }
};
export{settingCheckMinx}
