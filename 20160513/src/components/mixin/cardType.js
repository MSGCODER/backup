import React from 'react';
import { Row, Col} from 'antd';
//用于判断卡片的类型
//以及更新显示条目值
const cardTypeMinx = {
    cardType(item) {
        let typeIcon = ''; //卡片底部类别icon
        let typeText = '';//卡片文案
        let colorIcon = '';//卡片颜色
        let type = '';
        if (this.props.pageShow == 'staff') {
            type = item.role;
            if (item.nonUse) {
                colorIcon = "/img/card_title_stop.png";
                typeIcon = <img src="/img/icon_stop.png"/>;
                switch (type) {
                    case 0:
                        typeText = "管理员";
                        break;
                    case 1:
                        typeText = "司机";
                        break;
                    case 2:
                        typeText = "其他";
                        break
                }
            } else {
                switch (type) {
                    case 0:
                        typeIcon = <img src="/img/icon_driver.png"/>;
                        typeText = "管理员";
                        colorIcon = '/img/card_title_manage.png';
                        break;
                    case 1:
                        typeIcon = <img src="/img/staff-driver.png"/>;
                        typeText = "司机";
                        colorIcon = '/img/card_title_driver.png';
                        break;
                    case 2:
                        typeIcon = <img src="/img/icon_driver.png"/>;
                        typeText = "其他";
                        colorIcon = '/img/card_title_others.png';
                        break
                }
            }

        } else {
            type = item.type;
            if (item.nonUse) {
                colorIcon = "/img/card_title_stop.png";
                typeIcon = <img src="/img/icon_stop.png"/>;
                switch (type) {
                    case 0:
                        typeText = "客车";
                        break;
                    case 1:
                        typeText = "货车";
                        break;
                    case 2:
                        typeText = "其他";
                        break
                }
            } else {
                typeIcon = <img src="/img/vehicle-icon.png" style={{width:'80%'}}/>;
                switch (type) {
                    case 0:
                        typeText = "客车";
                        colorIcon = '/img/card_title_driver.png';
                        break;
                    case 1:
                        typeText = "货车";
                        colorIcon = '/img/card_title_manage.png';
                        break;
                    case 2:
                        typeText = "其他";
                        colorIcon = '/img/card_title_others.png';
                        break;
                }
            }
        }
        return (
            <div className="footer-img">
                <img src={colorIcon}/>

                <div className="type-text">{typeText}</div>
                <div className="type-icon">
                    {typeIcon}
                </div>
            </div>
        )
    },
    updateShowItem(){
        //更新显示dom
        let showItemKeys = [];
        let showItem = [];
        switch (this.props.pageShow) {
            case 'staff':
                switch (this.state.model.role) {
                    case 1:
                        showItemKeys = this.props.driverSettingFields;
                        showItem = this.handelAtOfName(this.props.cardMap, showItemKeys);
                        break;
                    default:
                        showItemKeys = this.props.staffSettingFields;
                        showItem = this.handelAtOfName(this.props.cardStaff, showItemKeys);
                        break;
                }
                for (let i = 0; i < showItem.length; i++) {
                    showItem[i].value = this.state.model[showItem[i].name];
                }
                break;
            case 'vehicle':
                showItemKeys = this.props.vehicleSettingFields;
                showItem = this.handelAtOfName(this.props.cardMap, showItemKeys);
                for (let i = 0; i < showItem.length; i++) {
                    showItem[i].value = this.state.model[showItem[i].name];
                }
                break;
        }
        var showItemDom = showItem.map(function (attrItem, index) {
            return (
                <ul className="list-inline" key={index}>
                    <li className='item-space'><h5>{attrItem.aliasName}</h5></li>
                    <span>：</span>
                    <li><h5>{attrItem.value}</h5></li>
                </ul>
            )
        }.bind(this));
        this.setState({
            showItemDom: showItemDom
        })
    },
    updateShowTaskItem(){
        let showItemKeys = [];
        let showItem = [];
        showItemKeys = this.props.unAssignedDisplaySetting;
        showItem = this.handelAtOfName(this.props.cardTask, showItemKeys);
        for (let i = 0; i < showItem.length; i++) {
            showItem[i].value = this.state.model[showItem[i].name];
        }
        var showTaskItemDom = showItem.map(function (attrItem, index) {
            return (
                <Col span="8" order="4" key={index}>
                    <label>{attrItem.aliasName}：</label>
                    <span>{attrItem.value}</span>
                </Col>
            )
        }.bind(this));
        this.setState({
            showTaskItemDom: showTaskItemDom
        })
    },
    //卡片的状态
    cardStatus(item){
        switch (this.props.pageShow){
            case 'staff':
                switch (item.status){
                    case 0:
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                }
                break;
            case 'vehicle':
                switch (item.status){
                    case 0:
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                }
                break;
        }
    }

};
export{cardTypeMinx}