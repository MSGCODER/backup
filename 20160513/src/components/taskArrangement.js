/**
 * Created by zhaiyujia on 2016/3/17.
 */
import $ from 'jquery'
import React from 'react';
import {render,ReactDOM} from 'react-dom';
import _ from 'underscore';
import BackboneReactMixin from 'backbone-react-component';
import { Row, Col,DatePicker,Checkbox,Form,Modal,Button,Table,Input} from 'antd';
import {Search} from './operationItem';
import {columns} from '../data/taskDetailsInfo';
import {taskModel,taskList} from '../models/taskData'
import {withDrawModel,withDrawList} from '../models/withDrawData'
import {completedtaskModel,completedtaskList} from '../models/CompletedTaskData'
import {ListShow} from './contentItem'
import {carInfoList,carInfoModel} from '../models/plateInfo'
import {driverColumns} from '../data/driverDetailsInfo'
import {settingCheckMinx} from './mixin/settingCheck';
import {cardTypeMinx} from './mixin/cardType';
import {staffData,staffCollection,staffModel,staff} from '../models/staff';
import {vehicleCollection,vehicleModel} from '../models/vehicle';
import {taskCollection,task} from '../models/task';
import {serverBaseUrl}  from '../serverBaseUrl';
//回车登记的表单组件
let WithDrawForm =React.createClass({
    getInitialState(){
      return{
          formData:'',
          singleTaskId:''
      }
    },
    componentWillReceiveProps(nextProps){
      this.setState({
          formData:nextProps.form.getFieldsValue()
      }) ;
    },
    handleFormClick(event){
        event.stopPropagation();
    },
    componentDidMount(){
        PubSub.subscribe('singleTaskId',function(topic,singleTaskId){
            //alert(singleTaskId);
            this.setState({
                singleTaskId:singleTaskId
            })
            //console.log(this.state.singleTaskId);
            let model = this.state.formData;
            console.log(this.state.singleTaskId);
                model.taskId=this.state.singleTaskId;
            model.missionId = this.props.modelId;
            console.log('收到表单值：', model);
            $.ajax({
                type: "POST",
                url: serverBaseUrl+"/api/task/complete",
                data: model,
                success: function(result){
                    if(result.status.code == 200){
                        if(result.data.missionComplete){
                            PubSub.publish('completeMission',this.props.modelId);
                            PubSub.publish('lastedComplete',this.props.modelId);
                        }
                    }
                }.bind(this)
            });
        }.bind(this));
        PubSub.subscribe('canSubmitForm',function(topic,data){
           if(data==true){
               let model = this.state.formData;
               console.log(this.state.singleTaskId);
               if(this.props.taskItem){
                   model.taskId=this.props.taskItem.taskId;
               }
               else{
                   model.taskId=this.state.singleTaskId;
               }
               model.missionId = this.props.modelId;
               console.log('收到表单值：', model);
               $.ajax({
                   type: "POST",
                   url: serverBaseUrl+"/api/task/complete",
                   data: model,
                   success: function(result){
                       if(result.status.code == 200){
                           if(result.data.missionComplete){
                               PubSub.publish('completeMission',this.props.modelId);
                               PubSub.publish('lastedComplete',this.props.modelId);
                           }
                       }
                   }.bind(this)
               });
           }
        }.bind(this));
    },
    render(){
        const { getFieldProps } = this.props.form;

        //console.log(this.props.form.getFieldsValue());
        return(
            <Form onSubmit={this.handleSubmit} onClick={this.handleFormClick} form={this.props.form}>
                <ul>
                    <li className="withdraw-form">
                        <Row type="flex" className="">
                            <Col span="12">
                                <span className="withdraw-label">回车时间</span>
                                <span>：</span>
                                <DatePicker className="" {...getFieldProps('driveReturnTime')}/>
                            </Col>
                            <Col span="12">
                                <span className="withdraw-label">本次任务行程</span>
                                <span>：</span>
                                <Input type="text" {...getFieldProps('mileage')}/>
                            </Col>
                        </Row>
                        <Row type="flex" className="">
                            <Col span="12">
                                <span className="withdraw-label">停车费</span>
                                <span>：</span>
                                <Input type="text" {...getFieldProps('parkingFee')}/>
                            </Col>
                            <Col span="12">
                                <span className="withdraw-label">过路费</span>
                                <span>：</span>
                                <Input type="text" {...getFieldProps('roadToll')}/>
                            </Col>
                        </Row>
                        <Row type="flex" className="">
                            <Col span="12">
                                <span className="withdraw-label">回车停放位置</span>
                                <span>：</span>
                                <Input type="text" {...getFieldProps('placement')}/>
                            </Col>
                            <Col span="12">
                                <span className="withdraw-label">回车备注</span>
                                <span>：</span>
                                <Input type="text" {...getFieldProps('comment')}/>
                            </Col>
                        </Row>
                    </li>
                </ul>
            </Form>
        )
    }
});
WithDrawForm = Form.create()(WithDrawForm);
const Task = React.createClass({
    mixins: [BackboneReactMixin,settingCheckMinx,cardTypeMinx],
    getInitialState(){
        return {
            isEdit:false,
            isCanWithdraw:false,
            isWithdrawShow:false,
            isCloseEditWindow:false,
            isClick:true,
            isClickWithDrawBtn:false,
            showTaskItemDom:'',
            missionId:this.props.missionId,
            multipleTaskList:'',
            collection:this.props.collection
        }
    },
    componentWillMount(){
        this.updateShowTaskItem();
    },
    handleMouseEnter(event){
        event.preventDefault();
         $(event.target).parents('.task-card').find(".task-hover").show();
    },
    handleMouseLeave(event){
        event.stopPropagation();
        $(event.target).parents('.task-card').find(".task-hover").hide();
    },
    handleClick(event){
        event.preventDefault();
        let taskCard = $(event.target).parents('.task-card');
        this.setState({
            isClick:!this.state.isClick
        })
        if(this.state.isClick)
        {
            $(taskCard).find(".hide-data").show();
        }else{
            $(taskCard).find(".hide-data").hide();
            $(taskCard).find(".withdraw-hide").hide();
        }

        $.ajax({
            type: "get",
            url: serverBaseUrl+"/api/mission/detail?id="+this.state.model.id,
            success: function(msg){
                if(msg.status.code == 200) {

                    this.setState({
                        multipleTaskList:msg.data.tasks
                    });
                }
            }.bind(this)
        });
    },
    componentDidMount(){

        PubSub.subscribe('update-tasktype-collection',function(topic,model){
            //model.status=1;
            //this.getCollection().reset(model);
            window.location.reload();
        }.bind(this));
    },
    handleEditClick(event){
        event.stopPropagation();
        this.setState({
            isEdit: true,
            isCloseEditWindow:false,
        })
        this.closeEdit_Token=PubSub.subscribe('isCloseEditWindow',function(topic,isCloseEditWindow){
            this.setState({
                isCloseEditWindow:isCloseEditWindow,
                isClick:true
            });
        }.bind(this));
    },
    handleRegisterClick(event){
        event.stopPropagation();
        this.setState({
            isCanWithdraw: true,
            isClick:false
        })
        let taskCard = $(event.target).parents('.task-card');
        $(taskCard).find(".hide-data").show();
        $(".withdraw-hide").show();

        $.ajax({
            type: "get",
            url: serverBaseUrl+"/api/mission/detail?id="+this.state.model.id,
            success: function(msg){
                if(msg.status.code == 200) {
                    //console.log(msg.data.tasks);
                    this.setState({
                        multipleTaskList:msg.data.tasks
                    });
                }
            }.bind(this)
        });
    },
    handleClose(event){
        //let taskCard = $(event.target).parents('.task-card');
        //$(taskCard).find(".hide-data").hide();
        $(".withdraw-hide").hide();
        this.setState({
            isCanWithdraw: false,
            isClick:false
        })
    },
    handleSubmit(){
        event.stopPropagation();
        PubSub.publish('isSaveWithdraw',false);
        $(".hide-btn2").hide();
        PubSub.publish("canSubmitForm",true);
    },
    handleSubmitSingle(){
        event.stopPropagation();
        PubSub.publish('isSaveWithdraw',false);
        $(".hide-btn2").hide();
        //console.log(this.state.multipleTaskList[0].taskId);
        PubSub.publish("singleTaskId",this.state.multipleTaskList[0].taskId);
    },
    handleCloseReturn(e){
        event.stopPropagation();
        PubSub.publish('isWithdrawShow',false);
        $(".hide-btn2").hide();
    },
    handleCheckBox(event){
        event.stopPropagation();
    },
    render(){
        let itemShow = this.state.showTaskItemDom;
        let task = this.state.model;
        //console.log(task);
        let taskInfo = this.getModel();
        let showItemKeys = taskInfo.keys();
        let showItem = [];
        showItem = this.handelAtOfName(this.props.cardTask, showItemKeys);
        for (let i = 0; i < showItem.length; i++) {
            showItem[i].value = this.state.model[showItem[i].name];
        }
        var code = showItem[0].value;
        var type = task.status;
        var carType= task.type;
        //var taskId = this.state.multipleTaskList[0].taskId;
        let CanWithdraw = function(){
            if(this.state.isCanWithdraw==true)
            {
                    return (
                        <div className="withdraw-hide">
                            <WithDrawForm modelId={task.id} taskType={carType}/>
                            <ul className="" onClick={this.handleCheckBox}>
                                <li className="withdraw-checkbox">
                                    <label className="">
                                        <Checkbox />
                                        这是被临时取消的任务
                                    </label>
                                </li>
                                <li className="withdraw-btn">
                                    <button className="save-btn" onClick={this.handleSubmitSingle}>保存</button>
                                    <button className="close-btn" onClick={this.handleClose}>关闭</button>
                                </li>
                            </ul>
                        </div>
                    )
            }
        }.bind(this);
        let enterRegistration = function(){
            if(carType=="singleTask"){
                return(
                    <div className="inline-block">
                        <span onClick={this.handleRegisterClick}>回车登记</span>
                    </div>
                )
            }
            else if(carType=="multipleTask"){
                return(
                    <div className="inline-block">
                        <span onClick={this.handleClick}>回车登记</span>
                    </div>
                )
            }
        }.bind(this);
        let isShowTypeBtn = function(){
            if(type=="2"){
                return(
                    <ul className = "hide-btn2">
                        <li className = "withdraw-checkbox" onClick={this.handleCheckBox}>
                            <label className = "">
                                <Checkbox/>
                                这是被临时取消的任务
                            </label>
                        </li>
                        <li className = "withdraw-btn">
                            <button className = "save-btn" onClick={this.handleSubmit}>保存</button>
                            <button className = "close-btn" onClick={this.handleCloseReturn}>关闭</button>
                        </li>
                    </ul>
                )
            }
        }.bind(this);
        let carTypeTask = function () {
            if (carType == "singleTask") {
                return (
                    <div>
                        <Row type="flex" className="task-data">
                            {itemShow}
                        </Row>
                    </div>
                )
            }
            else if (carType == "multipleTask"){
                return (
                    <div>
                        <Row type="flex" className="task-data">
                            {itemShow}
                        </Row>
                        <div className="hide-data">
                            <ul className="arranged-task">
                                <ShowTaskDetailsListMap multipleTaskList={this.state.multipleTaskList} text={type} modelId = {this.state.model.id}/>
                            </ul>
                            {isShowTypeBtn()}
                        </div>
                    </div>
                )
            }
        }.bind(this);
            let isEdit = function () {
                if (this.state.isEdit) {
                    if(this.state.isCloseEditWindow)
                    {
                        if (type == 0) {
                            return (
                                <div>
                                    <Row type="flex" className="task-data">
                                        {itemShow}
                                    </Row>
                                </div>
                            )
                        }
                        else{
                            return(
                                <div>
                                    {carTypeTask()}
                                </div>
                            )
                        }
                    }
                    else{
                        return (
                            <EditDistribution model={this.getModel()} />
                        )
                    }
                }
                else if(this.state.isCanWithdraw){
                    return(
                        <div>
                            {carTypeTask()}
                            {CanWithdraw()}
                        </div>
                    )
                }else {
                    if (type == 0) {
                        return (
                            <div>
                                <Row type="flex" className="task-data">
                                    {itemShow}
                                </Row>
                            </div>
                        )
                    }
                    else{
                        return(
                            <div>
                                {carTypeTask()}
                            </div>
                        )
                    }
                }
            }.bind(this);
            var taskType = function () {
                if (type === 0) {
                    return (
                        <div>
                            <div className="task-number_card red">
                                <label>编码：</label>
                                <span>{code}</span>
                                <span className="edit-icon icon-red" onMouseEnter={this.handleMouseEnter} >
                                    <span className="inner-icon edit-inner-icon"></span>
                                </span>
                            </div>
                            {isEdit()}
                            <ul className="task-hover icon-red" onMouseLeave={this.handleMouseLeave}>
                                <li className="task-hover-li-red">
                                    <span className="inner-icon edit-inner-icon"></span>
                                    <span onClick={this.handleEditClick}>编辑派发</span>
                                </li>
                                <li>
                                    <span className="inner-icon cancel-task-icon"></span>
                                    <span>取消任务</span>
                                </li>
                            </ul>
                        </div>
                    )
                } else if (type === 1) {
                    return (
                        <div>
                            <div className="task-number_card blue">
                                <label>编码：</label>
                                <span>{code}</span>
                            <span className="edit-icon icon-blue">
                                <span className="inner-icon edit-inner-icon" onMouseEnter={this.handleMouseEnter}></span>
                            </span>
                            </div>
                            {isEdit()}
                            <ul className="task-hover icon-orange" onMouseLeave={this.handleMouseLeave}>
                                <li className="task-hover-li-blue">
                                    <span className="inner-icon edit-inner-icon"></span>
                                    <span onClick={this.handleEditClick}>编辑派发</span>
                                </li>
                                <li>
                                    <span className="inner-icon cancel-task-icon"></span>
                                    <span>取消任务</span>
                                </li>
                            </ul>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <div className="task-number_card orange">
                                <label>编码：</label>
                                <span>{code}</span>
                            <span className="edit-icon icon-orange">
                                <span className="inner-icon return-car-icon" onMouseEnter={this.handleMouseEnter}></span>
                            </span>
                            </div>
                            {isEdit()}
                            <ul className="task-hover icon-blue" onMouseLeave={this.handleMouseLeave}>
                                <li className="task-hover-li-orange">
                                    <span className="inner-icon return-car-icon"></span>
                                    {enterRegistration()}
                                </li>
                            </ul>
                        </div>
                    )
                }
            }.bind(this);
            return (
                <div className="task-card" onClick={this.handleClick} onMouseLeave={this.handleMouseLeave}>
                    {taskType()}
                </div>
            )
        }
    });
//显示多人多车任务的车牌号与司机对应组件
const ShowTaskDetailsList = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return {
            isEdit: false,
            isOther:true,
            returnDetail:'',
            returnDetailBtn:'',
            taskItem:this.props.taskItem
        }
    },
    componentWillUnMount(){
        PubSub.unsubscribe(this.saveWith_token);
    },
    handleClick(event){
        event.stopPropagation();
        this.setState({
            isEdit:true
        });
        this.props.parentCallback(this.props.taskItem.taskId);
        $(".hide-btn2").show();
        PubSub.publish('isClickWithDrawBtn',true);
        PubSub.subscribe('isWithdrawShow',function(topic,isWithdrawShow){
            this.setState({
                isEdit:isWithdrawShow
            });
            this.props.parentCallback('');
            $(".return-detail-btn").text('编辑回车');
        }.bind(this));
        this.saveWith_token =PubSub.subscribe('isSaveWithdraw',function(topic,isSaveWithdraw){
            if(this.state.isEdit){
                this.setState({
                    isEdit:isSaveWithdraw,
                    returnDetail:'return-detail',
                    returnDetailBtn:'return-detail-btn',
                })
                this.props.parentCallback('');
                $(".return-detail-btn").text('编辑回车');
            }
        }.bind(this))
    },
    componentWillReceiveProps(nextProps){
      this.setState({
          isOther:nextProps.isOther
      })
    },
    render(){
        var type=this.props.text;
        let isCanClickButton = function(){
            if(type=="1"){
                return(
                    <div>
                        <button className="withDraw">回车</button>
                    </div>
                )
            }
            else if(type=="2"){
                return(
                    <div>
                        <button className={this.state.returnDetailBtn+" withDraw withDraw-car"} onClick={this.handleClick}>回车</button>
                    </div>
                )
            }
        }.bind(this);
        let {taskItem} = this.props;
        let withDrawInfo = this.state.model;
        let clickReturn = '';
            if(this.state.isEdit){
                clickReturn =(
                        <WithDrawForm taskItem={this.state.taskItem} modelId = {this.props.modelId}/>
                )
            }else{
                clickReturn = (
                    <li className = {"dotted "+this.state.returnDetail}>
                        <label>编码：</label>
                        <span>{taskItem.taskId}</span>
                        <Row type="flex" className="task-data task-adjustment1">
                            <Col span="8" order="4">
                                <label>车牌号：</label>
                                 <span>{taskItem.vehicleNo}</span>

                            </Col>
                            <Col span="8" order="4">
                                <label>司机：</label>
                                <span>{taskItem.staffName}</span>
                            </Col>
                        </Row>
                        <Row type="flex" className="task-data task-adjustment2">
                            <Col span="8" order="4">

                            </Col>
                            <Col span="8" order="4">
                                {/*{withDrawitemShow(5,6)}*/}
                            </Col>
                        </Row>
                        {isCanClickButton()}
                    </li>
                )
            }
        if(this.props.isOther || this.props.isMy){
            return (
                <div>{clickReturn}</div>
            )
        }else{
            return(
                <div>
                    <Row type="flex" className="task-data task-adjustment">
                        <Col span="6">
                            <label>车牌号：</label>
                            <span>{taskItem.vehicleNo}</span>
                        </Col>
                        <Col span="6">
                            <label>司机：</label>
                            <span>{taskItem.staffName}</span>
                        </Col>
                        <Col span="6">

                        </Col>
                        <Col span="6">
                        </Col>
                    </Row>
                </div>
            )
        }
    }
});
//多人多车车与人对应组件显示
const ShowTaskDetailsListMap = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            clickId :'',
            isOther:true,
            isSaveId:''
        }
    },
    childrenClickReturn(id){
        if(id || id =="0"){
            this.setState({
                clickId:id,
                isOther:false
            });
        }else{
            this.setState({
                clickId:id,
                isOther:true
            });
        }
    },
    changeChildrenSave(id){
        this.setState({
            isSaveId:id
        })
    },
    render(){
        //let taskList = this.state.collection;
        let taskList = this.props.multipleTaskList;
        let taskShow;
        if(taskList){

             taskShow = taskList.map(function(item,index){
                 //console.log(item.taskId === this.state.clickId)
                if(item.taskId === this.state.clickId){
                    return (
                        <ShowTaskDetailsList key={index} taskItem = {item}
                                             parentCallback = {this.childrenClickReturn}
                                             parentCallbackSave={this.changeChildrenSave}
                                             className='return-details'
                                             text ={this.props.text} isMy = {true}
                                             modelId = {this.props.modelId}
                            />
                    )
                }else{
                    return (
                        <ShowTaskDetailsList key={index} taskItem = {item}
                                             parentCallback = {this.childrenClickReturn}
                                             parentCallbackSave={this.changeChildrenSave}
                                             text ={this.props.text} isOther = {this.state.isOther}
                                             modelId = {this.props.modelId}
                            />
                    )
                }
            }.bind(this));
        }
        return(
            <div>
                {taskShow}
            </div>
        )
    }
});
//任务管理列表
const TaskArrangement = React.createClass({
    mixins:[BackboneReactMixin],
    componentDidMount(){
        this.completeMission_Token = PubSub.subscribe('completeMission',function(topic,modelId){
            //alert(modelId);
            this.getCollection().remove(this.getCollection().get(modelId));
        }.bind(this))
    },
   render(){
       let taskList = this.state.collection;
       let taskShow = "";
       if(taskList){
            taskShow = taskList.map(function(item,index){
               return (
                   <Task key={index} model={this.getCollection().get(item.id) } cardTask = {this.props.cardTask} unAssignedDisplaySetting = {this.props.unAssignedDisplaySetting} collection={taskList}/>
               )
           }.bind(this));
       }
       return(
           <div>
               {taskShow}
           </div>
       )
   }
});
//任务管理内容主容器
const TaskContent = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            showWay:'card',
            completedMissionCollection:'',
            taskCollection:'',
            //列表展示数据
            tasks:''
        }
    },
    componentWillMount(){
        this.getStaffDate = $.get({
            url:'http://n59.clkj.com:9000/api/mission/latest',
            success:function(result){
                if(result.status.code == 200){
                    //console.log(result.data);
                    this.setState({
                        completedMissionCollection:new taskCollection(result.data)
                    })
                }
            }.bind(this),
            error:function(){

            }
        });
        let listHeadTemp = [];
        let model = this.getModel();
        let listHeadKeys = model.keys();
        model.values().map(function(list,index){
            if(list.aliasName){
                listHeadTemp.push({
                    aliasName:list.aliasName,
                    key:listHeadKeys[index]
                })
            }
        });
        this.setState({
            listHeader:listHeadTemp,
            listHeaderCopy:listHeadTemp
        })
    },
    componentDidMount(){
        this.showHistory_token = PubSub.subscribe('show-history',function(topic,showWay){
            this.setState({
                showWay:showWay
            })
        }.bind(this));
        this.lastedComplete_token = PubSub.subscribe('lastedComplete',function(topic,data){
            //alert('latest');
            this.getStaffDate = $.get({
                url:'http://n59.clkj.com:9000/api/mission/latest',
                success:function(result){
                    if(result.status.code == 200){
                        //console.log(result.data);
                        this.state.completedMissionCollection.reset(result.data)
                    }
                }.bind(this),
                error:function(){

                }
            });
        }.bind(this));

        $.ajax({
            type: "get",
            url: serverBaseUrl+"/api/mission/history",
            success: function(msg){
                if(msg.status.code == 200) {
                    let dataSource = this.handleListDataSource(msg.data);
                    console.log(dataSource);
                    this.setState({
                        tasks : dataSource,
                    });
                }
            }.bind(this)
        });
    },
    handleListDataSource(data){
        let dataSourceArray = [];
        for(let items of data){
            for(let item of items.tasks){
                let itemsTemp = {};
                itemsTemp = _.clone(items) ;
                itemsTemp.staffName = item.staffName;
                itemsTemp.vehicleNo = item.vehicleNo;
                itemsTemp.taskId= item.taskId;
                dataSourceArray.push(itemsTemp);
            }
        }
        return dataSourceArray;
    },
    componentWillUnmount(){
        PubSub.unsubscribe(this.showHistory_token);
    },
    render(){
        var pageShow = this.props.pageShow;
        var handleShowWay=function(){
            if(this.state.showWay=='card'){
                return(
                    <div className="main-task">
                        <Row className="row">
                            <Col span="18">
                                <div className="main-task-content">
                                    <TaskArrangement collection={this.getCollection()} model={this.getModel()} cardTask = {this.props.cardTask} unAssignedDisplaySetting = {this.props.unAssignedDisplaySetting}/>
                                </div>
                            </Col>
                            <Col span="6" className="main-task-right">
                                <CompletedArrangement  collection={this.state.completedMissionCollection}/>
                            </Col>
                        </Row>
                    </div>
                )
            }else{
                return(
                    <div className="task-list-show">
                        <ListShow tasks = {this.state.tasks} pageShow = {pageShow} model = {this.getModel()} cardMap = {this.props.cardTask}/>
                    </div>
                )
            }
        }.bind(this);
        return (
            <div id="content" className="content task-content">
                {handleShowWay()}
            </div>
        )
    }
});
//最近已完成任务列表
const CompletedArrangement = React.createClass({
    mixins:[BackboneReactMixin],
    render(){
        let completedtaskList = this.state.collection;
        //console.log(completedtaskList);
        if(completedtaskList){
            let completedtaskShow = completedtaskList.map(function(item,index){
                return (
                    <CompletedList key={index} model={this.getCollection().get(item.id)}/>
                )
            }.bind(this));
            return(
                <div className="completed-task-content">
                    <div className="completed-task-header title-grey">最近已完成任务</div>
                    {completedtaskShow}
                    <div className="completed-task-footer title-grey">
                        <span>最近24小时内完成的任务数量：</span>
                        <span>99999999条</span>
                    </div>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
});
//最近已完成任务列表多车任务迭代组件
const CompletedCarsTaskMap = React.createClass({
    mixins:[BackboneReactMixin],
    render(){
        //console.log(this.props.tasks);
        let {tasks} = this.props;
        //let completedcarstaskList = this.state.collection;
        let completedcarstaskShow = tasks.map(function(item,index){
            return (
                <CompletedCarsTask key={index} taskItem={item}/>
            )
        }.bind(this));
        return(
            <div className="">
                {completedcarstaskShow}
            </div>
        )
    }
});
//最近已完成任务列表多车任务组件
const CompletedCarsTask = React.createClass({
    mixins:[BackboneReactMixin],
    render(){
        let {taskItem} = this.props;
        return(
            <div className="completed-cars-task">
                <Row className="completed-task-list-row">
                    <Col span="8" className="completed-task-list-col">
                        <span className="icon-list-default icon"></span>
                        <span>:</span>
                        {taskItem.taskId}
                    </Col>
                    <Col span="8" className="completed-task-list-col">
                        <span className="icon-card icon"></span>
                        <span>:</span>
                        {taskItem.staffName}
                    </Col>
                    <Col span="8" className="completed-task-list-col">
                        <span className="icon-driver icon"></span>
                        <span>:</span>
                        {taskItem.vehicleNo}
                    </Col>
                </Row>
            </div>
        )
    }
});
const CompletedList = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return {
            isOpen:false
        }
    } ,
    handleMouseEnter(event){
        $(event.target).parents('.completed-task-list').find(".hide-triangle").show();
    },
    handleClick(event){
        if(this.state.isOpen==true)
        {
            this.setState(
                {
                    isOpen:false
                }
            );
            $(event.target).parents('.completed-task-list').find(".task-details").hide();
        }else{
            this.setState(
                {
                    isOpen:true
                }
            );
            $(event.target).parents('.completed-task-list').find(".task-details").show();
        }
    },
    render(){
        //let type = this.state.model.Type;
        let completedTaskInfo = this.state.model;
        //completedtaskInfo= _.toArray(completedtaskInfo);
        //console.log(completedtaskInfo);
        //let getCompletedItemArray= function(starNum,endNum){
        //    return completedtaskInfo.slice(starNum,endNum);
        //};
        //let completeditemShow = function (starNum,endNum){
        //    let CompletedItemShow;
        //    let completeditemArray = getCompletedItemArray(starNum,endNum);
        //    CompletedItemShow =completeditemArray.map(function(item,index){
        //        return(
        //            <span className="task-data1"  key={index}>{item.value}</span>
        //        )
        //    });
        //    return  CompletedItemShow
        //};
        let completedCarsTaskType = function(){
            if(completedTaskInfo.isMultiple)
            {
                return(
                    <CompletedCarsTaskMap tasks = {completedTaskInfo.tasks}/>
                )
            }
        }.bind(this);
        let completedTaskType = function(){
            if(!completedTaskInfo.isMultiple)
            {
                return(
                    <div className="task-types task-types-singal">
                        <span>单</span>
                    </div>
                )
            }
            else{
                return(
                    <div className="task-types">
                        <span>多</span>
                    </div>
                )
            }
        }.bind(this);
        return(
            <div className="completed-task-list" onMouseOver={this.handleMouseEnter}>
                {completedTaskType()}
                <span className="task-data1 task-number">{completedTaskInfo.code}</span>
                <Row className="completed-task-list-row list-row">
                    <Col span="12" className="completed-task-list-col">
                        <span className="icon-out icon"></span>
                        <span>:</span>
                        {completedTaskInfo.driveOutTime}
                    </Col>
                    <Col span="12" className="completed-task-list-col">
                        <span className="icon-back icon"></span>
                        <span>:</span>
                        {completedTaskInfo.driveReturnTime}
                    </Col>
                </Row>
                <Row className="completed-task-list-row list-row">
                    <Col span="12" className="completed-task-list-col">
                        <span className="icon-card icon"></span>
                        <span>:</span>
                        {completedTaskInfo.vehicleNo}
                    </Col>
                    <Col span="12" className="completed-task-list-col">
                        <span className="icon-car icon"></span>
                        <span>:</span>
                        {completedTaskInfo.driver}
                    </Col>
                </Row>
                <div className="triangle-up hide-triangle" onClick={this.handleClick}></div>
                <div className="task-details">
                    <Row className="completed-task-list-row list-row">
                        <Col span="12" className="completed-task-list-col">
                            <span className="icon-time icon"></span>
                            <span>:</span>
                            {completedTaskInfo.mileage}
                        </Col>
                        <Col span="12" className="completed-task-list-col">
                            <span className="icon-driver icon"></span>
                            <span>:</span>
                            {completedTaskInfo.vehicleUser}
                        </Col>
                    </Row>
                    <Row className="completed-task-list-row list-row">
                        <Col span="24" className="completed-task-list-col">
                            <span className="icon-destination icon"></span>
                            <span>:</span>
                            {completedTaskInfo.destination}
                        </Col>
                    </Row>
                    {completedCarsTaskType()}
                </div>
            </div>
        )
    }
});
//空闲车辆组件
const Idle = React.createClass({
    render(){
        return(
            <ul className="list-inline">
                <li className = "task-color idle">5</li>
                <li className = "type-text"><h5>空闲</h5></li>
            </ul>
        )
    }
});
//出车组件
const Outing= React.createClass({
    render(){
        return(
            <ul className="list-inline">
                <li className = "task-color outing">3</li>
                <li className = "type-text"><h5>出车</h5></li>
            </ul>
        )
    }
});


//添加车牌号和司机的任务组件
const Addtaskdetails=React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
      return{
          isDelete:false
      }
    },
    handleClick(event){
        this.setState({
            isDelete:true
        })
    },
    render(){
        let addTaskItem ='';
        if(!this.state.isDelete){
                addTaskItem =(
                    <li className="add-task-d-li">
                        <Row className="add-task-row">
                            <Col span="8" className="">
                                <label>车牌号</label>
                                <span className="icon">:</span>
                                <span>{this.props.item.carNumber}</span>
                            </Col>
                            <Col span="8" className="adjustment">
                                <label>司机</label>
                                <span className="icon">:</span>
                                <span>{this.props.item.driver}</span>
                            </Col>
                            <Col span="8" className="">
                                <label>出车时间</label>
                                <span className="icon">:</span>
                                <span>{this.props.item.position}</span>
                            </Col>
                        </Row>
                        <span className="delete-btn" onClick={this.handleClick}>删除</span>
                    </li>
                )
        }else{
            <div></div>
        }
        return(
            <div>
                {addTaskItem}
            </div>
        )
    }
});
//详细列表展示组件
const ShowTaskDetails=React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState() {
        return {
            status:'',
            driverShowList:'',
            carShowList:''
        };
    },
    handleClick(event){
        if(this.state.status=="1")
        {
            $("#car-number").val("");
        }else{
            $("#driver").val("");
        }
        $(".addtask-modal").hide();
    },
    handleOk(event){
        $(".addtask-modal").hide();
    },
    componentDidMount(){
        PubSub.subscribe('plus-icon',function(topic,data){
            if(data==1){
                this.setState({
                    status:"1"
                })
            }else {
                this.setState({
                    status:"2"
                })
            }
        }.bind(this))
        $.ajax({
            type: "get",
            url: serverBaseUrl+"/api/staff?view=mission&select=driver",
            success: function(msg){
                if(msg.status.code == 200) {
                    this.setState({
                        driverShowList: new staffCollection(msg.data),
                    });
                }
            }.bind(this)
        });
        $.ajax({
            type: "get",
            url: serverBaseUrl+"/api/vehicle/getInfo",
            success: function(msg){
                if(msg.status.code == 200) {
                    this.setState({
                        carShowList: new vehicleCollection(msg.data),
                    });
                }
            }.bind(this)
        });
    },
    render(){
        let showDetailsList = function(){
            if(this.state.status==1)
            {
                return(
                    <TaskCarDetailsListShow collection={this.state.carShowList} model={vehicleModel}/>
                )
            }else{
                return(
                    <TaskDriverDetailsListShow collection={this.state.driverShowList} model={staffModel}/>
                )
            }
        }.bind(this);
        return(
            <div className="task-details-list">
                <div className="task-details-list-h">
                    <Idle />
                    <Outing />
                    <div className = "task-right-item">
                        <ul className = "list-inline">
                            <Search />
                            <span className = "search-text">搜索</span>
                        </ul>
                    </div>
                </div>
                <div className="task-details-list-c">
                    {showDetailsList()}
                </div>
                <div className="task-details-list-f">
                    <button className="btn ok-btn" onClick={this.handleOk}>确认添加</button>
                    <button className="btn cancel-btn" onClick={this.handleClick}>取消</button>
                </div>
            </div>
        )
    }
});
//编辑派发中司机信息的列表显示组件
const TaskDriverDetailsListShow = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState() {
        return {
            status:'',
        };
    },
    handleDriverRowClick(record, index){
        PubSub.publish('add-details-driver',record);
        $(".ant-table-body").find("tr").removeClass("active");
        $(".ant-table-body").find("tr").eq(index).addClass("active");
        $(".triangle").remove();
        $(".ant-table-body").find("tr").eq(index).find("td").eq(0).html("<i class='triangle'></i>");
    },
    render() {
        var driverSource = this.state.collection;
        return (
            <div>
                <Table columns={driverColumns}
                       dataSource={driverSource}
                       pagination={false}
                       useFixedHeader
                       onRowClick={this.handleDriverRowClick}
                    />
            </div>
        );
    }
});
//编辑派发中车牌号信息的列表显示组件
const TaskCarDetailsListShow = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState() {
        return {
            status:'',
        };
    },
    handlePlateRowClick(record, index){
        PubSub.publish('add-details-plate',record);
        $(".ant-table-body").find("tr").removeClass("active");
        $(".ant-table-body").find("tr").eq(index).addClass("active");
        $(".triangle").remove();
        $(".ant-table-body").find("tr").eq(index).find("td").eq(0).html("<i class='triangle'></i>");
    },
    render() {
        var carSource = this.state.collection;
        return (
            <div>
                <Table columns={columns}
                       dataSource={carSource}
                       pagination={false}
                       useFixedHeader
                       onRowClick={this.handlePlateRowClick}
                    />
            </div>
        );
    }
});
//编辑派发组件
let EditDistribution = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            carInfoList:[],
            //isCloseEditWindow:false
            vehicleId:'',
            staffId:'',
            placement:''
        }
    },
    handleSubmit(e) {
        e.preventDefault();
        PubSub.publish('isCloseEditWindow',true);
        console.log('收到表单值：', this.props.form.getFieldsValue());
        let model = this.props.form.getFieldsValue();
        //let formValue = this.props.form.getFieldsValue().id='12233';
        //this.getCollection().push(this.props.form.getFieldsValue());
        //console.log('保存表单值'+this.state.collection);
        //this.props.callbackParentOfAdd(true);
        model.id=this.state.model.id;
        $.ajax({
            type: "POST",
            url: serverBaseUrl+"/api/mission/assign",
            data: model,
            success: function(msg){
                //alert("保存成功");
                PubSub.publish('update-tasktype-collection',model);
            }
        });
    },
    handleCancel(){
        //this.props.callbackParentOfAdd(false);
    },
    componentDidMount(){
    if(this.state.model.status==1){
        $.ajax({
            type: "get",
            url: serverBaseUrl+"/api/mission/detail?id="+this.state.model.id,
            success: function(msg){
                if(msg.status.code == 200) {
                    let carInfoTemp = this.state.carInfoList;
                    for(var i of msg.data.tasks) {
                        carInfoTemp.push({
                             driver:i.staffName,
                             carNumber:i.vehicleNo
                        })
                    }
                    this.setState({
                        carInfoList:carInfoTemp
                    });
                }
            }.bind(this)
        });
    }
      PubSub.subscribe('add-details-plate',function(topic,data){
          $('#car-number').val(data.vehicleNo);
          this.setState({
              vehicleId:data.vehicleId
          });
      }.bind(this));
        PubSub.subscribe('add-details-driver',function(topic,data){
            $('#driver').val(data.name);
            this.setState({
                staffId:data.id
            });
        }.bind(this))

    },
    handlePlateClick(event){
        $(".addtask-modal").show();
        PubSub.publish('plus-icon',1);
    },
    handleDriverClick(event){
        $(".addtask-modal").show();
        PubSub.publish('plus-icon',2);
    },
    handleAddtaskDetails(event){
        let carInfoTemp = this.state.carInfoList;
        let carNumber = $('#car-number').val();
        let driver = $('#driver').val();
        var missionId = this.state.model.id;

        let carInfo = {
            carNumber:carNumber,
            driver:driver,
            position:this.state.placement.toLocaleDateString()
        };
        carInfoTemp.push(carInfo);
        this.setState({
            carInfoList:carInfoTemp
        });

        let newTask = {
            missionId:missionId,
            vehicleId:this.state.vehicleId,
            staffId:this.state.staffId,
            driveOutTime:this.state.placement
        };

        $.ajax({
            type: "POST",
            url: serverBaseUrl+"/api/task/new",
            data: newTask,
            success: function(msg){
                console.log("success"+msg);
            }
        });
    },
    handleSetDate(Date,value){

        this.setState({
            placement:Date
        });
    },
    handleCloseEditWindow(event){
        PubSub.publish('isCloseEditWindow',true);
       //alert(1);
    },
    render(){
        const { getFieldProps } = this.props.form;
        const CheckboxGroup = Checkbox.Group;
        let  carInfoItems = this.state.carInfoList.map(function(item,index){
            return( <Addtaskdetails item = {item}  key = {index} model ={this.getModel()} />)
        }.bind(this));
        let isEditOrShowStatus = function(){
            if(this.state.isCloseEditWindow) {
                return (
                    <div>
                        <Task collection={taskList} model={taskModel}/>
                    </div>
                )
            }
            else{
                return(
                    <Form onSubmit={this.handleSubmit} className = ''form={this.props.form}>
                        <div className = 'task-edit-page'>
                            <Row className="task-edit-row">
                                <Col span="12" className="">
                                    <label>用车人</label>
                                    <span className="colon">:</span>
                                    <Input type="text" {...getFieldProps('vehicleUser',{initialValue:this.state.model.vehicleUser})} id = "vehicleUser" />
                                </Col>
                                <Col span="12" className="task-edit-col">
                                    <label>用车时间</label>
                                    <span className="colon">:</span>
                                    <DatePicker {...getFieldProps('vehicleUseTime',{initialValue:this.state.model.vehicleUseTime})} id = "vehicleUseTime"/>
                                </Col>
                            </Row>
                            <Row className="task-edit-row">
                                <Col span="12" className="">
                                    <label>估计用时</label>
                                    <span className="colon">:</span>
                                    <Input type="text" {...getFieldProps('costTime',{initialValue:this.state.model.costTime})} id = "costTime"/>
                                </Col>
                                <Col span="12" className="task-edit-col">
                                    <label>用车原因</label>
                                    <span className="colon">:</span>
                                    <Input type="text" {...getFieldProps('vehicleUseReason',{initialValue:this.state.model.vehicleUseReason})} id = "vehicleUseReason"/>
                                </Col>
                            </Row>
                            <Row className="task-edit-row">
                                <Col span="12" className="">
                                    <label>申请车型</label>
                                    <span className="colon">:</span>
                                    <Input type="text" {...getFieldProps('applyForVehicleModel')} id = "applyForVehicleModel" value={this.state.model.applyForVehicleModel}/>
                                </Col>
                                <Col span="12" className="task-edit-col">
                                    <label>目的地</label>
                                    <span className="colon">:</span>
                                    <Input type="text" {...getFieldProps('destination')} id = "destination" value={this.state.model.destination}/>
                                </Col>
                            </Row>
                            <Row className="task-edit-row">
                                <Col span="12" className="">
                                    <label>随车人数</label>
                                    <span className="colon">:</span>
                                    <Input type="text" {...getFieldProps('passengers')} id = "passengers" value={this.state.model.passengers}/>
                                </Col>
                                <Col span="12" className="task-edit-col">
                                    <label className="back-time-label">预计回车时间</label>
                                    <span className="colon">:</span>
                                    <DatePicker id = "returnDate"/>
                                </Col>
                            </Row>
                            <Row className="task-edit-row">
                                <Col span="24" className="">
                                    <label>出车里程</label>
                                    <span className="colon">:</span>
                                    <Input type="text"  id = "mileage"/>
                                </Col>
                            </Row>
                            <Row className="task-edit-row">
                                <Col span="24" className="">
                                    <label>用车备注</label>
                                    <span className="colon">:</span>
                                    <Input className="vehicles-marker" type="text" {...getFieldProps('comment')} id = "comment" value={this.state.model.comment}/>
                                </Col>
                            </Row>
                        </div>
                        <div className="edit-car-task">
                            <Row className="edit-car-task-input">
                                <Col span="8" className="">
                                    <label>车牌号：</label>
                                    <div className="div-inline">
                                        <Input className="" type="text" id = "car-number"/>
                                        <span className="plus-icon" onClick={this.handlePlateClick}></span>
                                    </div>
                                </Col>
                                <Col span="8" className="adjustment">
                                    <label>司机：</label>
                                    <div className="div-inline">
                                        <Input className="" type="text" id = "driver"/>
                                        <span className="plus-icon" onClick={this.handleDriverClick}></span>
                                    </div>
                                </Col>
                                <Col span="8" className="adjustment">
                                    <label>出车时间：</label>
                                    <DatePicker className="" type="text" id = "position" onChange={this.handleSetDate}/>
                                </Col>
                            </Row>
                            <button onClick={this.handleAddtaskDetails}>添加</button>
                            <ul className="add-task-details">{carInfoItems}</ul>
                            <label className="only-current-task" >
                                <Checkbox defaultChecked={false} />
                                仅限这次任务
                            </label>
                        </div>
                        <ul className="periodic-task">
                            <li className="periodic-task-btn">
                                <label className="Perio-task">
                                    <Checkbox defaultChecked={false}  />
                                    周期任务：
                                </label>
                                <button className="btn1">修改周期</button>
                                <button className="btn2">结束周期任务</button>
                            </li>
                            <li className="periodic-task-details">
                                <ul className="startDate">
                                    <li className="startDate-endDate">
                                        <ul>
                                            <li className="startDate-endDate-left">
                                                <label htmlFor="">起始日期：</label>
                                                <DatePicker  placeholder="" />
                                            </li>
                                            <li className="startDate-endDate-right">
                                                <label className="endDate" htmlFor="">结束日期(选填)：</label>
                                                <DatePicker  placeholder=""  />
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <CheckboxGroup options={['日', '一', '二','三', '四', '五', '六']} onChange={this.onChange}/>
                                    </li>
                                </ul>
                            </li>
                            <li className="edit-btn">
                                <Button className="save-send-btn">保存并继续派发</Button>
                                <Button className="save-btn" onClick={this.handleSubmit}>保存</Button>
                                <Button className="close-btn" onClick={this.handleCloseEditWindow}>关闭</Button>
                            </li>
                        </ul>
                        <div className="addtask-modal">
                            <ShowTaskDetails model = {carInfoModel} collection={carInfoList}/>
                        </div>
                    </Form>
                )
            }
        }.bind(this);
        return(
            <div>{isEditOrShowStatus()}</div>
        )
       }
});
EditDistribution = Form.create()(EditDistribution);
export{TaskContent}

