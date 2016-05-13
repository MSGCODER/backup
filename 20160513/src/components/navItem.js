/**
 * 导航区组件
 */
import React from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import 'pubsub-js';
import {Router,Route,IndexRoute,Link,IndexLink,browserHistory} from 'react-router';
import Backbone from 'backbone';
import BackboneReactMixin from 'backbone-react-component';
import {Content} from './contentItem'
import {staffInfo,staffTypeText} from '../data/cardData';
import {vehicleInfo,vehicleTypeText} from '../data/vehicleInfo';
import {navArray,settingNavArray} from '../data/navigation';
import {staffData,staffCollection,staffModel,staff} from '../models/staff';
import {vehicleModel,vehicleData,vehicleCollection,vehicle} from '../models/vehicle';
//import {taskModel,taskList} from '../models/taskData'
import {completedtaskModel,completedtaskList} from '../models/CompletedTaskData'
import {TaskArrangement,CompletedArrangement} from './taskArrangement'
import {TaskContent} from './taskArrangement'
import { Row, Col ,Collapse,Icon} from 'antd';
import {cardsDriver,cardsStaff,cardVehicle,cardTask} from '../models/cardKey'
import {taskData,taskCollection,taskModel,task} from '../models/task';
import {serverBaseUrl}  from '../serverBaseUrl';
//任务管理
const TaskManage = React.createClass({
    getInitialState(){
        return{
            taskCollection:'',
            unAssignedDisplaySetting:[]
        }
    },
    componentDidMount(){
        //console.log('TaskMount');
        PubSub.publish('taskMount','');

        $.ajax({
            type: "get",
            url: serverBaseUrl+"/api/mission?select=all",
            success: function(msg){
                if(msg.status.code == 200) {
                    this.setState({
                        taskCollection: new taskCollection(msg.data),
                        unAssignedDisplaySetting:msg.unAssignedDisplaySetting
                    });
                }
            }.bind(this)
        });

        //添加刷新UI，保持数据同步
        this.taskCollectio_token = PubSub.subscribe('update-task-collection',function(topic,model){
            //model.status=0;
            //let taskModel = new task();
            //taskModel.set(model);
            //this.state.taskCollection.add(taskModel);
            ////通知操作栏，更新数据
            //PubSub.publish('update-task-count','');
            window.location.reload();
        }.bind(this));

    },
    render(){
        return (
            <TaskContent model = {taskModel} collection={this.state.taskCollection} cardTask={cardTask} unAssignedDisplaySetting = {this.state.unAssignedDisplaySetting}/>
        )
    }
});

//职员信息
const StaffInfo = React.createClass({
    getInitialState(){
        return{
            typeCollection:'',
            staffSettingFields:[],
            driverSettingFields:[],
            baseUrl:serverBaseUrl+'/api/staff'
        }
    },
    //注册全局事件,更新content显示内容
    //会产生重复发送请求的问题，可能和全局事件没有被unsubscribe有关
    componentDidMount(){
        //卡片展示
        this.getStaffDate = $.get({
            url:this.state.baseUrl+'?view=card&select=all',
            success:function(result){
                if(result.status.code == 200){
                    this.setState({
                        typeCollection:new staffCollection(result.data),
                        staffSettingFields:result.staffSettingFields,
                        driverSettingFields:result.driverSettingFields
                    });
                }
            }.bind(this),
            error:function(){

            }
        });
        //添加刷新UI，保持数据同步
        this.typeStaffCollectio_token = PubSub.subscribe('update-collection',function(topic,model){
            let staffModel = new staff();
            staffModel.set(model);
            this.state.typeCollection.add(staffModel);
            //通知操作栏，更新数据
            PubSub.publish('update-collection-count','');
        }.bind(this));
        //显示停用记录
        this.typeStaffCollectio_token = PubSub.subscribe('reset-collection',function(topic,collection){
            this.state.typeCollection.reset(collection);
        }.bind(this));
        this.searchStaff_token = PubSub.subscribe('search-staff',function(topic,collection){
            this.state.typeCollection.reset(collection);
        }.bind(this));
        //点击selectCardType
        this.selectCardType_token = PubSub.subscribe('select-cardType',function(topic,msg){
            if(msg.pageShow == 'staff'){
                let selectKey = 'all';
                switch (msg.type){
                    case 'yellow':
                        selectKey = 'driver';
                        break;
                    case 'red':
                        selectKey = 'admin';
                        break;
                    case 'blue':
                        selectKey = 'other';
                        break;
                }
                this.selectStaffDate = $.get({
                    url:this.state.baseUrl+'?view='+msg.showWay+'&select='+selectKey,
                    success:function(result){
                        if(result.status.code == 200){
                            this.state.typeCollection.reset(result.data);
                        }
                    }.bind(this),
                    error:function(){

                    }
                });
            }else{
                //this.selectStaffDate.abort();
            }
        }.bind(this));
        PubSub.publish('staffInfoMount','');
    },
    componentWillUnmount(){
        PubSub.unsubscribe(this.typeStaffCollectio_token);
        this.getStaffDate.abort();
    },
    render(){
        return (
            <Content cardInfo = {staffInfo} typeTextInfo={staffTypeText} pageShow={'staff'}
                     collection={this.state.typeCollection} model={staffModel}
                     cardMap = {cardsDriver}
                     cardStaff = {cardsStaff}
                     staffSettingFields = {this.state.staffSettingFields}
                     driverSettingFields = {this.state.driverSettingFields}
                     baseUrl={this.state.baseUrl}
                />
        )
    }

});
//车辆档案
const VehicleRecord = React.createClass({
    getInitialState(){
        return{
            typeCollection:'',
            vehicleSettingFields:[],
            baseUrl:serverBaseUrl+'/api/vehicle',
            loading:true
        }
    },
    componentDidMount(){
        PubSub.publish('vehicleMount','');
        this.vehicleDate = $.get({
            url:this.state.baseUrl+'?view=card&select=all',
            success:function(result){
                if(result.status.code == 200){
                    this.setState({
                        typeCollection:new vehicleCollection(result.data),
                        vehicleSettingFields:result.vehicleSettingFields
                    });
                }
            }.bind(this),
            error:function(){

            }
        });
        //添加model，刷新信息
        this.typeVehicleCollectio_token = PubSub.subscribe('update-collection',function(topic,model){
            let vehicleModel = new vehicle();
            vehicleModel.set(model);
            this.state.typeCollection.add(vehicleModel);
            PubSub.publish('update-collection-count','');
        }.bind(this));
        //显示停用记录
        this.typeVehicleCollectio_token = PubSub.subscribe('reset-collection',function(topic,collection){
            this.state.typeCollection.reset(collection);
        }.bind(this));
        this.searchVehicle_token = PubSub.subscribe('search-vehicle',function(topic,collection){
            this.state.typeCollection.reset(collection);
        }.bind(this));
        //点击selectCardType
        this.selectCardType_token = PubSub.subscribe('select-cardType',function(topic,msg){
            if(msg.pageShow == 'vehicle'){
                let selectKey = 'all';
                switch (msg.type){
                    case 'yellow':
                        selectKey = 'bus';
                        break;
                    case 'red':
                        selectKey = 'truck';
                        break;
                    case 'blue':
                        selectKey = 'other';
                        break;
                }
                this.selectVehicleDate = $.get({
                    url:this.state.baseUrl+'?view='+msg.showWay+'&select='+selectKey,
                    success:function(result){
                        if(result.status.code == 200){
                            this.state.typeCollection.reset(result.data);
                        }
                    }.bind(this),
                    error:function(){

                    }
                });
            }else{
                //this.selectVehicleDate.abort();
            }
        }.bind(this));
    },
    componentWillUnmount(){
        PubSub.unsubscribe(this.typeCollectio_token);
        this.vehicleDate.abort();
    },
    render(){
        return (
            <Content cardInfo={vehicleInfo} typeTextInfo={vehicleTypeText} pageShow={'vehicle'}
                     collection = {this.state.typeCollection} model = {vehicleModel}
                     vehicleSettingFields = {this.state.vehicleSettingFields}
                     cardMap = {cardVehicle} baseUrl={this.state.baseUrl}
                />
        )
    }
});
//维修保养
const Maintenance = React.createClass({
    componentDidMount(){
        PubSub.publish('maintenance','');
    },
    render(){
        console.log("Maintenance is called");
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
});
//病事假记录
const LeaveRecord = React.createClass({
    componentDidMount(){
        PubSub.publish('leaveRecord','');
    },
    render(){
        return (
            <div>
                <div>LeaveRecord</div>
                {this.props.children}
            </div>
        )
    }
});

const NavMenu = React.createClass({
    getInitialState(){
        return{
            pageShow:'',
            normal : true,
            isSetting : false,
            navData : navArray,
            baseUrl : '',
            linkIcon:'link-icon'
        }
    },
    navBtnStatus(selector){
        //let element = $(ReactDOM.findDOMNode(this.refs[selector]));
        let element = $('.'+selector);
        element.addClass('click');
        element.find('.default').addClass('is-display');
        element.find('.press').removeClass('is-display');
    },
    componentDidMount(){
        //主页面
        PubSub.subscribe('taskMount',function(topic,data){
            this.navBtnStatus('taskManage');
            this.setState({
                navData : navArray,
                baseUrl : '',
                linkIcon:'link-icon'
            });
        }.bind(this));
        PubSub.subscribe('staffInfoMount',function(topic,data){
            this.setState({
                navData : navArray,
                baseUrl : '',
                linkIcon:'link-icon'
            });
            this.navBtnStatus('staffInfo');
        }.bind(this));
        PubSub.subscribe('vehicleMount',function(topic,data){
            this.setState({
                navData : navArray,
                baseUrl : '',
                linkIcon:'link-icon'
            });
            this.navBtnStatus('vehicleRecord');
        }.bind(this));
        PubSub.subscribe('maintenance',function(topic,data){
            this.setState({
                navData : navArray,
                baseUrl : '',
                linkIcon:'link-icon'
            });
            this.navBtnStatus('maintenance');
        }.bind(this));
        PubSub.subscribe('leaveRecord',function(topic,data){
            this.setState({
                navData : navArray,
                baseUrl : '',
                linkIcon:'link-icon'
            });
            this.navBtnStatus('leaveRecord');
        }.bind(this));
        //系统设置页面
        PubSub.subscribe('driverSettingMount',function(topic,data){
            this.setState({
                navData : settingNavArray,
                baseUrl : '/setting',
                linkIcon:'link-icon-setting'
            });
            this.navBtnStatus('driverSetting');
        }.bind(this));
        PubSub.subscribe('staffSettingMount',function(topic,data){
            this.setState({
                navData : settingNavArray,
                baseUrl : '/setting',
                linkIcon:'link-icon-setting'
            });
            this.navBtnStatus('staffSetting');
        }.bind(this));
        PubSub.subscribe('vehicleSettingMount',function(topic,data){
            this.setState({
                navData : settingNavArray,
                baseUrl : '/setting',
                linkIcon:'link-icon-setting'
            });
            this.navBtnStatus('vehicleSetting');
        }.bind(this));
        PubSub.subscribe('taskSettingMount',function(topic,data){
            console.log('test task mount');
            this.setState({
                navData : settingNavArray,
                baseUrl : '/setting',
                linkIcon:'link-icon-setting'
            });
            this.navBtnStatus('taskSetting');
        }.bind(this));
    },
    componentWillReceiveProps(nextProps){
        switch (nextProps.pageShow){
            case 'setting':
                this.setState({
                    navData : settingNavArray,
                    baseUrl : '/setting',
                    linkIcon:'link-icon-setting'
                });
                break;
            case 'task':
                this.setState({
                    navData : navArray,
                    baseUrl : ''
                });
                break;
            case 'staff':
                this.setState({
                    navData : navArray,
                    baseUrl : '',
                    linkIcon:'link-icon'
                });
                break;
            case 'vehicle':
                this.setState({
                    navData : navArray,
                    baseUrl : '',
                    linkIcon:'link-icon'
                });
                break;
            case 'maintenance':
                this.setState({
                    navData : navArray,
                    baseUrl : '',
                    linkIcon:'link-icon'
                });
                break;
            case 'leaveRecord':
                this.setState({
                    navData : navArray,
                    baseUrl : '',
                    linkIcon:'link-icon'
                });
                break;
        }
    },
    handleClick(e){
        let linkBox = $('.link-box');
        let aDefault =  $(linkBox).find('.link-style');
        $(aDefault).removeClass('click');
        let press = $(linkBox).find('.press');
        let defaultStatus = $(linkBox ).find('.default');
        $(press).addClass('is-display');
        $(defaultStatus).removeClass('is-display');
        let thisPress = $(e.target).parents('.link-box').find('.press');
        let thisDefault= $(e.target).parents('.link-box').find('.default');
        let aClick= $(e.target).parents('.link-box').find('.link-style').addClass('click');
        $(thisDefault).addClass('is-display');
        $(thisPress).removeClass('is-display')
    },
    render(){
        var navArrayValue = this.state.navData;
        //var showPage = this.props.pageShow;
        var items = navArrayValue.map(function(item,index){
            if(item.key=='1'){
                return(
                    <div className="link-box" key={item.key} >
                        <IndexLink to={this.state.baseUrl+"/"} ref={item.name} className={"link-style "+item.name} onClick={this.handleClick}>
                            <div className ={this.state.linkIcon} >
                                <div className ={item.icon+" icon default"}></div>
                                <div className ={item.icon+"-press icon press is-display"}></div>
                                <div className = "text">{item.aliasName}</div>
                                <div>{item.helpInfo}</div>
                            </div>
                        </IndexLink>
                    </div>
                )
            }else{
                return(
                    <div className="link-box" key={item.key} >
                        <Link to={this.state.baseUrl+"/"+item.name} ref={item.name} className={"link-style "+item.name} onClick={this.handleClick}>
                            <div className = {this.state.linkIcon}>
                                <div className ={item.icon+" icon default"}></div>
                                <div className ={item.icon+"-press icon press is-display"}></div>
                                <div className = "text">{item.aliasName}</div>
                                <div>{item.helpInfo}</div>
                            </div>
                        </Link>
                    </div>
                )
            }
        }.bind(this));
        return(
            <div className="nav-item-layout" >
                <div className="logo">
                    <img src="/img/icon_logo.png" />
                </div>
                <div>
                    <div className="title">车队管理系统</div>
                    {items}
                </div>
            </div>
        )
    }
});
export{TaskManage,StaffInfo,VehicleRecord,Maintenance,LeaveRecord,NavMenu}
