/**
 * dialog
 * use Ant Design UI
 */
import React from 'react';
import {render} from 'react-dom';
import _ from 'underscore'
import {Button as AntButton,Modal,Row, Col,Input as AntInput,Icon,Form, Select, Checkbox, Radio ,Tooltip,DatePicker,Collapse,Upload,Menu,Cascader,TimePicker,CheckboxGroup} from 'antd';
import BackboneReactMixin from 'backbone-react-component';
import {SearchInput} from "./selectAutoCompletion"
import {staffs} from "../../models/staffInfo";
import {validateMixin} from './../mixin/validate';
import {typeStatusStaffMixin} from './../mixin/typeStatus';
import {advanceSearchMixin} from  './../mixin/advanceSearch';
import {utilMixin} from './../mixin/util';
import {staff} from '../../models/staff';
import {serverBaseUrl} from '../../serverBaseUrl'
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const diaLogBaseUrl = {
    //staffBaseUrl : serverBaseUrl+'/api/staff',
    staffBaseUrl:serverBaseUrl+'/api/staff',
    vehicleBaseUrl:serverBaseUrl+'/api/vehicle',
    missionBaseUrl:serverBaseUrl+'/api/mission'
};
//form的整体布局
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 14}
};
let EditTable = React.createClass({
    mixins: [BackboneReactMixin, validateMixin, typeStatusStaffMixin],
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        let modifyForm = this.props.form.getFieldsValue();
        //modifyForm = _.omit(modifyForm, function (value, key, object) {
        //    return _.isUndefined(value)
        //});
        let formData = _.extend(this.state.model, modifyForm);
        formData.role = this.state.model.role;
        //格式化准驾类型
        if( formData.licenseType){
            formData.licenseType = formData.licenseType[formData.licenseType.length-1];
        }
        this.editStaffDate = $.post({
            url: diaLogBaseUrl.staffBaseUrl+"/edit",
            data: formData,
            success: function (data) {
                if (data.status.code == 200) {
                    this.getModel().set(formData);
                    this.props.callbackParentOfEdit('edit-success');
                }
            }.bind(this),
            error: function () {
                this.props.callbackParentOfEdit('edit-error');
            }.bind(this)
        });
    },
    handleCancel(){
        this.props.callbackParentOfEdit('noEdit');
    },
    getValidateStatus(field) {
        const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;
        if (isFieldValidating(field)) {
            return 'validating';
        } else if (!!getFieldError(field)) {
            return 'error';
        } else if (getFieldValue(field)) {
            return 'success';
        }
    },
    render() {
        let staffInfo = this.state.model;
        const validateForm = this.validateFormEdit(this.props.form.getFieldProps,staffInfo);
        const getFieldProps = validateForm.getFieldProps;
        let isDriver = this.typeStatusInfo(staffInfo, validateForm).isDriver;
        let typeStatus = this.typeStatusInfo(staffInfo, validateForm).typeStatus;
        //上传头像属性配置
        const uploadProps = {
            action: '/upload.do',
            listType: 'picture-card'
            //showUploadList:false
        };
        return (
            <Form horizontal onSubmit={this.handleSubmit} className='edit-form' form={this.props.form}
                  acceptCharset="utf-8">
                <div className="up-info">
                    <Row type='flex' justify="center">
                        <Col span="8">
                            <div className="header-icon">
                                <FormItem>
                                    <Upload name="logo" action="/upload.do" listType="picture"
                                            onChange={this.handleUpload}
                                        {...getFieldProps('upload')}
                                        >
                                        <img src="/img/icon_userpic.png" className="add-img-front"/>
                                    </Upload>
                                </FormItem>
                                <img src={staffInfo.avatar} className="header-img"/>
                            </div>
                        </Col>
                        <Col span="16" className="header-right">
                            <h3>{staffInfo.name}</h3>
                            {typeStatus}
                        </Col>
                    </Row>
                </div>
                <div className="middle-info">
                    <Row type='flex' justify="center">
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                hasFeedback={true}
                                label="编码：" labelCol={{span: 8}} required>
                                <AntInput type="text" {...validateForm.code} placeholder=""/>
                            </FormItem>
                        </Col>
                        <Col span='12'></Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="部门：" labelCol={{span: 8}}>
                                <AntInput
                                    type="text" {...getFieldProps('department', {initialValue: staffInfo.department})}
                                    placeholder=""/>
                            </FormItem>
                        </Col>
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="性别：" required>
                                <RadioGroup {...getFieldProps('sex', {initialValue: false})}>
                                    <Radio value={false}>男</Radio>
                                    <Radio value={true}>女</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                hasFeedback
                                label="身份证号：" labelCol={{span: 8}} required>
                                <AntInput type="text" placeholder="" {...validateForm.IDCardNo} />
                            </FormItem>
                        </Col>
                        <Col span="12"></Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="地址：" labelCol={{span: 8}}>
                                <AntInput type="text"
                                          placeholder="" {...getFieldProps('address', {initialValue: staffInfo.address})} />
                            </FormItem>
                        </Col>
                        <Col span="12"></Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="入职日期：" labelCol={{span: 8}}>
                                <DatePicker format="yyyy/MM/dd" placeholder="" {...getFieldProps('employmentDate')} id="employmentDate"/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                hasFeedback
                                label="电话号码：" required>
                                <AntInput type="text" placeholder="" {...validateForm.tel} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="备注：" labelCol={{span: 8}}>
                                <AntInput type="text"
                                          placeholder="" {...getFieldProps('comment', {initialValue: staffInfo.comment})} />
                            </FormItem>
                        </Col>
                        <Col span="12"></Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="是否停用：" labelCol={{span: 8}}>
                                <label className="isOutage">
                                    <Checkbox  {...getFieldProps('nonUse',{initialValue:false})} />
                                </label>
                            </FormItem>
                        </Col>
                        <Col span="12"></Col>
                    </Row>
                    {isDriver}
                </div>
                <div className="footer-info" style={{backgroundColor:'#E6E5ED'}}>
                    <Row>
                        <Col span='12' style={{textAlign:'left'}}>
                            <AntButton type="primary" htmlType="submit" onClick={this.handleSubmit}>保存</AntButton>
                        </Col>
                        <Col span='12' style={{textAlign:'right'}}>
                            <AntButton type="primary" onClick={this.handleCancel}>退出</AntButton>
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
});
EditTable = Form.create()(EditTable);

let EditTableVehicle = React.createClass({
    mixins: [BackboneReactMixin],
    getInitialState(){
        return {}
    },
    componentDidMount(){
    },
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        let modifyForm = this.props.form.getFieldsValue();
        modifyForm = _.omit(modifyForm, function (value, key, object) {
            return _.isUndefined(value)
        });
        let formData = _.extend(this.state.model, modifyForm);
        this.editStaffDate = $.post({
            url: diaLogBaseUrl.vehicleBaseUrl+"/edit",
            data: formData,
            success: function (data) {
                if (data.status.code == 200) {
                    this.getModel().set(formData);
                    this.props.callbackParentOfEdit('edit-success');
                }
            }.bind(this),
            error: function () {
                this.props.callbackParentOfEdit('edit-error');
            }
        });
    },
    handleCancel(){
        this.props.callbackParentOfEdit('noEdit');
    },
    render() {
        const { getFieldProps } = this.props.form;
        let cardInfo = this.state.model;
        return (
            <Form horizontal onSubmit={this.handleSubmit} className='add-form'>
                <div className="up-info">
                    <Row type='flex' justify="center">
                        <Col span="8">
                            <div className="header-icon">
                                <FormItem>
                                    <Upload name="logo" action="/upload.do" listType="picture"
                                            onChange={this.handleUpload}
                                        {...getFieldProps('upload')}
                                        >
                                        <img src="/img/upload-car-img.png" className="add-img-front"/>
                                    </Upload>
                                </FormItem>
                                <img src={cardInfo.avatar} className="header-img"/>
                            </div>
                        </Col>
                        <Col span="16" className="header-right">
                            <h3>{cardInfo.code}</h3>
                            <Row type="flex">
                                <Col span="4">
                                    <div className="type-text right">车牌号</div>
                                </Col>
                                <Col span="12">
                                    <div className="status-text right">{cardInfo.vehicleNo}</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className="middle-info">
                    <Row type='flex' justify="center">
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆品牌：">
                                <AntInput type="text" {...getFieldProps('brand',{initialValue: cardInfo.brand})} placeholder=""/>
                            </FormItem>
                        </Col>
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机：">
                                <AntInput type="text" {...getFieldProps('driverName',{initialValue: cardInfo.driverName})} placeholder=""/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆型号：">
                                <AntInput type="text" {...getFieldProps('model',{initialValue: cardInfo.model})} placeholder=""/>
                            </FormItem>
                        </Col>
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机手机：">
                                <AntInput type="text" {...getFieldProps('driverTel',{initialValue: cardInfo.driverTel})} placeholder=""/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆类型：">
                                <AntInput type="text" placeholder="" {...getFieldProps('type',{initialValue: cardInfo.type})} />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="所在部门：">
                                <AntInput type="text" placeholder="" {...getFieldProps('department',{initialValue: cardInfo.department})} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="标签：">
                                <AntInput type="text" placeholder="" {...getFieldProps('tags',{initialValue: cardInfo.tags})} />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车主：">
                                <AntInput type="text" placeholder="" {...getFieldProps('vehicleOwner',{initialValue: cardInfo.vehicleOwner})} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="颜色：">
                                <AntInput type="text" placeholder="" {...getFieldProps('color',{initialValue: cardInfo.color})} />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="车主手机：">
                                <AntInput type="text" placeholder="" {...getFieldProps('vehicleOwnerTel',{initialValue: cardInfo.vehicleOwnerTel})} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="载重（吨）：">
                                <AntInput type="text" placeholder="" {...getFieldProps('capacity',{initialValue: cardInfo.capacity})} />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车队：">
                                <AntInput type="text" placeholder="" {...getFieldProps('vehicleGroup',{initialValue: cardInfo.vehicleGroup})} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="座位数：">
                                <AntInput type="text" placeholder="" {...getFieldProps('seats',{initialValue: cardInfo.seats})} />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="油卡编号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('oilCardNo',{initialValue: cardInfo.oilCardNo})} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12" className="oil-input">
                            <FormItem
                                {...formItemLayout}
                                label="油耗：">
                                <AntInput type="text" placeholder="" {...getFieldProps('oilWear',{initialValue: cardInfo.oilWear})} />
                                <span className="unit">升/百公里</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="电卡编号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('electricCardNo',{initialValue: cardInfo.electricCardNo})} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12" className="continue-input">
                            <FormItem
                                {...formItemLayout}
                                label="续航里程：">
                                <AntInput type="text" placeholder="" {...getFieldProps('enduranceMileage',{initialValue: cardInfo.enduranceMileage})} />
                                <span className="unit">KM</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆状态：">
                                <Select defaultValue={cardInfo.status} {...getFieldProps('status')}>
                                    <Option value="0">可用</Option>
                                    <Option value="1">出车</Option>
                                    <Option value="2">维护</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="初始里程：">
                                <AntInput type="text" placeholder="" {...getFieldProps('startMileage',{initialValue: cardInfo.startMileage})} />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="是否停用：">
                                <label className="isOutage">
                                    <Checkbox {...getFieldProps('nonUse')} defaultChecked = {cardInfo.nonUse}/>
                                </label>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="发动机号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('engineNo',{initialValue: cardInfo.engineNo})} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="车架号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('vin',{initialValue: cardInfo.vin})} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入单位：">
                                <AntInput type="text" placeholder="" {...getFieldProps('purchaseCompany',{initialValue: cardInfo.purchaseCompany})} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入价格：">
                                <AntInput type="text" placeholder="" {...getFieldProps('purchasePrice',{initialValue: cardInfo.purchasePrice})} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入日期：">
                                <DatePicker {...getFieldProps('purchaseDate',{initialValue:cardInfo.purchaseDate} )} format="yyyy/MM/dd" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                wrapperCol={{span:14,offset:8}}
                                label="备注：">
                                <AntInput type="textarea"   {...getFieldProps('comment',{initialValue: cardInfo.comment})} placeholder="请输入..."
                                          id="textarea-more" name="textarea" className='vehicle-more'/>
                            </FormItem>

                        </Col>
                    </Row>
                </div>
                <div className="footer-info" style={{backgroundColor:'#E6E5ED'}}>
                    <Row>
                        <Col span='12' style={{textAlign:'left'}}>
                            <AntButton type="primary" htmlType="submit" onClick={this.handleSubmit}>保存</AntButton>
                        </Col>
                        <Col span='12' style={{textAlign:'right'}}>
                            <AntButton type="primary" onClick={this.handleCancel}>退出</AntButton>
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
});
EditTableVehicle = Form.create()(EditTableVehicle);
const EditDialog = React.createClass({
    mixins: [BackboneReactMixin],
    getInitialState(){
        return {
            visible: false
        }
    },
    componentDidMount(){
    },
    componentWillUnMount(){
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            visible: nextProps.isEdit
        });
    },
    showModal(){
        this.setState({
            visible: true
        });
    },
    handleChildrenChange(isChange){
        this.setState({
            visible: false
        });
        this.props.callbackParent(isChange);
    },
    render(){
        let {pageShow,cardInfo} = this.props;
        var editTable = function () {
            switch (pageShow) {
                case 'staff':
                    return (<EditTable model={this.getModel()}
                                       visible={this.state.visible}
                                       callbackParentOfEdit={this.handleChildrenChange}
                                       baseUrl={this.props.baseUrl}
                        />);
                    break;
                case 'vehicle':
                    return (<EditTableVehicle model={this.getModel()}
                                              visible={this.state.visible}
                                              callbackParentOfEdit={this.handleChildrenChange}
                                              cardInfo={cardInfo}
                                              baseUrl={this.props.baseUrl}
                        />);
                    break;
            }
        }.bind(this);
        return (
            <Modal visible={this.state.visible} footer="" closable={false} className="edit-modal">
                {editTable()}
            </Modal>
        )
    }
});
//添加条目table(task)
let AddTask = React.createClass({
    mixins:[BackboneReactMixin,validateMixin,utilMixin],
    getInitialState(){
        return {
            visible: false,
            isCreateTask: false
        }
    },
    handleSubmit(e) {
        this.setState({
            isCreateTask:false,
            visible:false,
            checkboxValues:''
        });
        this.props.callbackParentOfAdd(false);
        let model = this.props.form.getFieldsValue();
        model.scheduledSetting = this.state.checkboxValues;
        console.log('收到表单值：', model);
        $.ajax({
            type: "POST",
            url: diaLogBaseUrl.missionBaseUrl+"/new",
            data: model,
            success: function(msg){
                if (msg.status.code == 200) {
                    //发送全局事件，更新collection
                    PubSub.publish('update-task-collection',model);
                }
            }
        });
        this.props.form.resetFields();
    },

    handleCancel(){
        this.setState({
            visible: false
        })
        this.props.form.resetFields();
        this.props.callbackParentOfAdd(false);
    },
    showModal() {
        this.setState({
            visible: true
        });
    },
    handleCreateTask(event){
            this.setState({
                isCreateTask:true
            });
        //console.log( $("#createTask").serializeArray());
    } ,
    handleAlertCancel(event){
        this.setState({
            isCreateTask: false
        });
        this.props.form.resetFields();
    },
    onChange(checkedValues){
        var str=[],str2;
        for(var i=0;i<checkedValues.length;i++)
        {
            if(checkedValues[i]=="日")
            {
                str.push('0');
            }else if(checkedValues[i]=="一"){
                str.push('1');
            }else if(checkedValues[i]=="二"){
                str.push('2');
            }else if(checkedValues[i]=="三"){
                str.push('3');
            }else if(checkedValues[i]=="四"){
                str.push('4');
            }else if(checkedValues[i]=="五"){
                str.push('5');
            }else if(checkedValues[i]=="六"){
                str.push('6');
            }
        }
        str2=str.join("|");
        this.setState({
            checkboxValues:str2
        })
    },
    render() {
        //const  validateForm = this.validateFormAdd(this.props.form.getFieldProps);
        //const getFieldProps = validateForm.getFieldProps;
        const CheckboxGroup = Checkbox.Group;
        const { getFieldProps } = this.props.form;
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var week = date.getDay();
        var today = year + "-" + month + "-" + day;
        var todayWeek = '';
        switch (week) {
            case 0:
                todayWeek = '日';
                break;
            case 1:
                todayWeek = '一';
                break;
            case 2:
                todayWeek = '二';
                break;
            case 3:
                todayWeek = '三';
                break;
            case 4:
                todayWeek = '四';
                break;
            case 5:
                todayWeek = '五';
                break;
            case 6:
                todayWeek = '六';
                break;
        }
        var showWeek = "(周"+todayWeek+")";
        let addTaskShow = function (){

            if(this.state.isCreateTask)
            {
                return(
                    <div className="popup-windows">
                         <div className="popup-windows-show">
                            <ul>
                                <li className="popup-windows-show-icon">
                                    <span className="alert-icon"></span>
                                </li>
                                <li className="popup-windows-show-word">
                                    <ul>
                                        <li>
                                            <span>今天是</span>
                                            <span>{today}</span>
                                            <span>{showWeek}</span>
                                        </li>
                                        <li>
                                            <span>周期任务</span>
                                            <span>x</span>
                                            <span>的首次用车时间是</span>
                                            <span>xxxx-xx-xx</span>
                                            <span>(周x)</span>
                                        </li>
                                        <li>
                                            <span>确认添加这个任务吗？</span>
                                        </li>
                                    </ul>
                                </li>
                                <li className="popup-windows-show-btn">
                                    <button className="okbtn" onClick={this.handleSubmit}>确认</button>
                                    <button className="canclebtn" onClick={this.handleAlertCancel}>取消</button>
                                </li>
                            </ul>
                         </div>
                    </div>
                )
            }
        }.bind(this);
        return (
            <Form id="createTask" className = 'add-task'onSubmit={this.handleSubmit}   form={this.props.form}>
                <div className="title">添&nbsp;加&nbsp;任&nbsp;务</div>
                <div className="task-dialog-content">
                    <ul>
                        <li className="first-messsage">
                            <span className="span1">编</span><span className="span2">码：</span>
                            <AntInput className="inputBox" type="text" {...getFieldProps('code')} id='code'/>
                            <label htmlFor="" className="destination">&nbsp;目的地：</label>
                            <AntInput className="inputBox" type="text" {...getFieldProps('destination')} id='name'/>
                        </li>
                        <li>
                            <label className="people" htmlFor="">用车人：</label>
                            <AntInput className="inputBox" type="text" name="a2" {...getFieldProps('vehicleUser')}/>
                            <label htmlFor="">用车时间：</label>
                            <DatePicker {...getFieldProps('vehicleUseTime')}/>
                        </li>
                        <li>
                            <label htmlFor="">估计用时：</label>
                            <AntInput className="inputBox" type="text" name="a3" {...getFieldProps('costTime')}/>
                            <label htmlFor="">用车原因：</label>
                            <AntInput className="inputBox" type="text" name="a4" {...getFieldProps('vehicleUseReason')}/>
                        </li>
                        <li>
                            <label htmlFor="">申请车型：</label>
                            <AntInput className="inputBox" type="text" name="a5" {...getFieldProps('applyForVehicleModel')}/>
                            <label htmlFor="">随车人数：</label>
                            <AntInput className="inputBox" type="text" name="a6" {...getFieldProps('passengers')}/>
                        </li>
                        <li>
                            <label htmlFor="">出车备注：</label>
                            <AntInput className="inputBox-long" type="text" name="a7" {...getFieldProps('comment')}/>
                        </li>
                        <li>
                            <label className="Perio-task">
                                <Checkbox defaultChecked={false} {...getFieldProps('isScheduled')}/>
                                周期任务
                            </label>
                        </li>
                        <li>
                            <ul className="startDate">
                                <li>
                                    <label htmlFor="">起始日期：</label>
                                    <DatePicker {...getFieldProps('startDate')}/>
                                    <label className="endDate" htmlFor="">结束日期(选填)：</label>
                                    <DatePicker {...getFieldProps('endDate')} />

                                </li>
                                <li>
                                    <CheckboxGroup options={['日', '一', '二','三', '四', '五', '六']} onChange={this.onChange}/>
                                </li>
                            </ul>
                        </li>
                        <li className="creator">任务创建人：admin</li>
                        <li className="create-task-submit">
                            <AntButton className="btn create-btn" onClick={this.handleCreateTask}>创建任务</AntButton>
                            <AntButton className="btn cancel-btn" onClick ={this.handleCancel}>取消</AntButton>
                        </li>
                    </ul>
                </div>
                    {addTaskShow()}
            </Form>
        );
    }
});
//添加条目table(task)
AddTask = Form.create()(AddTask);
//添加条目table(staff)
let AddTable = React.createClass({
    mixins: [BackboneReactMixin, validateMixin, utilMixin],
    getInitialState(){
        return {
            isDriver: false
        }
    },
    formatData(model){
        //用于处理发往后台数据格式化
        model.isDriver = this.state.isDriver;
        if(this.state.isDriver){
            model.role = 1;
            if(model.licenseType){
                model.licenseType = model.licenseType[model.licenseType.length-1];
            }
        }else{
            model.role =2;
        }
    },
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        let model = this.props.form.getFieldsValue();
        this.formatData(model);
        this.addStaffDate = $.post({
            url: diaLogBaseUrl.staffBaseUrl+"/new",
            data: model,
            success: function (data) {
                if (data.status.code == 200) {
                    //添加测试图片
                    model.avatar = "/img/icon_user_head_50_50_have_4.png";
                    console.log(data.id);
                    model.id = data.id;
                    //发送全局事件，更新collection
                    PubSub.publish('update-collection',model);
                }
            }.bind(this),
            error: function () {
            }
        });
        this.props.callbackParentOfAdd(true);
    },
    handleSaveAndSubmit(e){
        console.log('收到表单值：', this.props.form.getFieldsValue());
        let model = this.props.form.getFieldsValue();
        //处理isDriver和licenseType
        model.isDriver = this.state.isDriver;
        model.licenseType = model.licenseType[model.licenseType.length-1];
        this.addStaffDate = $.post({
            url: diaLogBaseUrl.staffBaseUrl+"/new",
            //url:'http://10.1.1.132:8080/api/staff/new',
            data: model,
            success: function (data) {
                if (data.status.code == 200) {
                    //发送全局事件，更新collection
                    PubSub.publish('update-collection',model);
                }
            }.bind(this),
            error: function () {
            }
        });
        this.props.form.resetFields();
    },
    handleCancel(){
        this.props.callbackParentOfAdd(false);
    },
    handleUpload(){
    },

    getValidateStatus(field) {
        const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;
        if (isFieldValidating(field)) {
            return 'validating';
        } else if (!!getFieldError(field)) {
            return 'error';
        } else if (getFieldValue(field)) {
            return 'success';
        }
    },
    isDriverClick(){
        this.setState({
            isDriver: !this.state.isDriver
        })
    },
    render() {
        const licenseTypeOptions = [
            {
                value: 'A',
                label: 'A',
                children: [
                    {
                        value: 'A1',
                        label: 'A1'
                    },
                    {
                        value: 'A2',
                        label: 'A2'
                    }
                ]
            },
            {
                value: 'B',
                label: 'B',
                children: [
                    {
                        value: 'B1',
                        label: 'B1'
                    },
                    {
                        value: 'B2',
                        label: 'B2'
                    }
                ]
            },
            {
                value: 'C',
                label: 'C',
                children: [
                    {
                        value: 'C1',
                        label: 'C1'
                    },
                    {
                        value: 'C2',
                        label: 'C2'
                    }
                ]
            }
        ];
        //准驾车型，只展示最后一项
        function displayRender(label) {
            return label[label.length - 1];
        }
        const validateForm = this.validateFormAdd(this.props.form.getFieldProps);
        const getFieldProps = validateForm.getFieldProps;
        const upLoadProps = {
            action: '/upload.do',
            listType: 'picture-card'
        };
        return (
            <Form horizontal onSubmit={this.handleSubmit} className='add-form' form={this.props.form}>
                <div className="up-info">
                    <Row type='flex' justify="center">
                        <Col span='8' className='up-info-header-img'>
                            <FormItem>
                                <Upload {...upLoadProps}>
                                    <img className="upLoad-img-btn" src="/img/icon_userpic.png"/>
                                </Upload>
                            </FormItem>
                        </Col>
                        <Col span='12' className='up-info-header-text'>
                            <FormItem
                                {...formItemLayout}
                                hasFeedback
                                label="姓名：" required>
                                <AntInput type="text" {...validateForm.name} id='name' placeholder=""/>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                hasFeedback
                                label="职务：" required>
                                <AntInput type="text" {...validateForm.duties} id='duties' placeholder=""/>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div className="middle-info">
                    <Row type='flex' justify="center">
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                hasFeedback
                                label="编码：" required>
                                <AntInput type="text" {...validateForm.code} id='code' placeholder=""/>
                            </FormItem>
                        </Col>
                        <Col span='12'></Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="所在部门：">
                                <AntInput type="text" {...getFieldProps('department')} id='department' placeholder=""/>
                            </FormItem>
                        </Col>
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="性别：" required>
                                <RadioGroup {...getFieldProps('sex', {initialValue: false})}>
                                    <Radio value={false}>男</Radio>
                                    <Radio value={true}>女</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                hasFeedback
                                label="身份证号：" required>
                                <AntInput type="text" {...validateForm.IDCardNo} placeholder="" id="IDCardNo"/>
                            </FormItem>
                        </Col>
                        <Col span="12"></Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="家庭住址：">
                                <AntInput type="text" placeholder="" {...getFieldProps('address')} id="address"/>
                            </FormItem>
                        </Col>
                        <Col span="12"></Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="入职日期：">
                                <DatePicker format="yyyy/MM/dd" placeholder="" {...getFieldProps('employmentDate')} id="employmentDate"/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                hasFeedback
                                label="手机：" required>
                                <AntInput type="text" placeholder="" {...validateForm.tel} id='tel'/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="备注：">
                                <AntInput type="text" placeholder="" {...getFieldProps('comment')} id="comment"/>
                            </FormItem>
                        </Col>
                        <Col span="12"></Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="是否停用:">
                                <label className="isOutage">
                                    <Checkbox {...getFieldProps('nonUse', {initialValue: false})}
                                        defaultChecked={false}/>
                                </label>
                            </FormItem>
                        </Col>
                        <Col span="12"></Col>
                    </Row>
                    <Collapse defaultActiveKey={['1']} className="is-driver" >
                        <Panel header={(
                       <div className =""
                            onClick={this.isDriverClick}
                            style={{width:'110%',position:'relative',right:'38px',borderBottom:'10px solid #E6E5ED'}}>
                           <span className = 'driver-text' style={{position:'relative',left:'185px'}}>司机</span>
                           <Icon type="circle-down" />
                       </div>
                       )}>
                            <Row type='flex' justify="center">
                                <Col span="12">
                                    <FormItem
                                        {...formItemLayout}
                                        hasFeedback
                                        label="驾驶证号：" required>
                                        <AntInput type="text" placeholder="" {...validateForm.licenseNo}
                                                  id="licenseNo"/>
                                    </FormItem>
                                </Col>
                                <Col span="12"></Col>
                            </Row>
                            <Row type='flex' justify="center">
                                <Col span="12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="有效期限：" required>
                                        <DatePicker format="yyyy/MM/dd" id="expirationDate" {...validateForm.expirationDate} />
                                    </FormItem>
                                </Col>
                                <Col span="12"></Col>
                            </Row>
                            <Row type='flex' justify="center">
                                <Col span="12">
                                    <FormItem
                                        {...formItemLayout}
                                        hasFeedback
                                        label="发证机关：" required>
                                        <AntInput type="text" placeholder=""
                                                  {...validateForm.licensingOrganization}/>
                                    </FormItem>
                                </Col>
                                <Col span="12"></Col>
                            </Row>
                            <Row type='flex' justify="center">
                                <Col span="12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="年审到期：" required>
                                        <DatePicker format="yyyy/MM/dd" placeholder="" id="auditDate" {...validateForm.auditDate} />
                                    </FormItem>
                                </Col>
                                <Col span="12"></Col>
                            </Row>
                            <Row type='flex' justify="center">
                                <Col span="12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="领证日期：" required>
                                        <DatePicker  format="yyyy/MM/dd" id="licensingDate" {...validateForm.licensingDate} />
                                    </FormItem>
                                </Col>
                                <Col span="12"></Col>
                            </Row>
                            <Row type='flex' justify="center">
                                <Col span="12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="准驾类型：" labelCol={{span: 8}} required>
                                        <Cascader options={licenseTypeOptions} expandTrigger="hover"
                                                  popupClassName="form-cascader"
                                                  displayRender={displayRender}  {...getFieldProps('licenseType')} />
                                    </FormItem>
                                </Col>
                                <Col span="12"></Col>
                            </Row>
                        </Panel>
                    </Collapse>
                </div>
                <div className="footer-info" style={{backgroundColor:'#E6E5ED'}}>
                    <Row type="flex" justify="space-around">
                        <Col span='8'>
                            <AntButton type="primary" onClick={this.handleSaveAndSubmit}>保存并添加</AntButton>
                        </Col>
                        <Col span='8'>
                            <AntButton type="primary" htmlType="submit" onClick={this.handleSubmit}>保存</AntButton>
                        </Col>
                        <Col span='8'>
                            <AntButton type="primary" onClick={this.handleCancel}>退出</AntButton>
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
});
//添加条目table(staff)
AddTable = Form.create()(AddTable);
//添加条目table(Vehicle)
let AddTableOfVehicle = React.createClass({
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        let model = this.props.form.getFieldsValue();
        this.addVehicleDate = $.post({
            url: diaLogBaseUrl.vehicleBaseUrl+"/new",
            data: model,
            success: function (result) {
                if (result.status.code == 200) {
                    console.log(result.data);
                    model.id = result.data;
                    //发送全局事件，更新collection
                    PubSub.publish('update-collection',model);
                }
            }.bind(this),
            error: function () {
            }
        });
        this.props.callbackParentOfAdd(true);
    },
    handleCancel(){
        this.props.callbackParentOfAdd(false);
    },
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <Form horizontal onSubmit={this.handleSubmit} className='add-form'>
                <div className="up-info">
                    <Row type='flex' justify="center">
                        <Col span='8' className='up-info-header-img'>
                            <FormItem>
                                <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}
                                    {...getFieldProps('upload', {
                                        valuePropName: 'fileList',
                                        normalize: this.normFile
                                    })}
                                    >
                                    <img src="/img/add_driver_header.png"/>
                                </Upload>
                            </FormItem>
                        </Col>
                        <Col span='12' className='up-info-header-text'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆编码：">
                                <AntInput type="text" {...getFieldProps('code')} placeholder=""/>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="车牌号：">
                                <AntInput type="text" {...getFieldProps('vehicleNo')} placeholder=""/>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div className="middle-info">
                    <Row type='flex' justify="center">
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆品牌：">
                                <AntInput type="text" {...getFieldProps('brand')} placeholder=""/>
                            </FormItem>
                        </Col>
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机：">
                                <AntInput type="text" {...getFieldProps('driverName')} placeholder=""/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆型号：">
                                <AntInput type="text" {...getFieldProps('model')} placeholder=""/>
                            </FormItem>
                        </Col>
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机手机：">
                                <AntInput type="text" {...getFieldProps('driverTel')} placeholder=""/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆类型：">
                                <Select defaultValue={0} {...getFieldProps('type')} >
                                    <Option value={0}>客车</Option>
                                    <Option value={1}>货车</Option>
                                    <Option value={2}>其他</Option>
                                </Select>
                                {/*<AntInput type="text" placeholder="" {...getFieldProps('type')} placeholder="请输入客车 货车或其他"/>*/}
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="所在部门：">
                                <AntInput type="text" placeholder="" {...getFieldProps('department')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="标签：">
                                <AntInput type="text" placeholder="" {...getFieldProps('tags')} />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车主：">
                                <AntInput type="text" placeholder="" {...getFieldProps('vehicleOwner')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="颜色：">
                                <AntInput type="text" placeholder="" {...getFieldProps('color')} />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="车主手机：">
                                <AntInput type="text" placeholder="" {...getFieldProps('vehicleOwnerTel')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="载重（吨）：">
                                <AntInput type="text" placeholder="" {...getFieldProps('capacity')} />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车队：">
                                <AntInput type="text" placeholder="" {...getFieldProps('vehicleGroup')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="座位数：">
                                <AntInput type="text" placeholder="" {...getFieldProps('seats')} />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="油卡编号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('oilCardNo')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12" className="oil-input">
                            <FormItem
                                {...formItemLayout}
                                label="油耗：">
                                <AntInput type="text" placeholder="" {...getFieldProps('oilWear')} />
                                <span className="unit">升/百公里</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="电卡编号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('electricCardNo')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12" className="continue-input">
                            <FormItem
                                {...formItemLayout}
                                label={<div><p>续航里程：</p><p>（电车）</p></div>}>
                                <AntInput type="text" placeholder="" {...getFieldProps('enduranceMileage')} />
                                <span className="unit">KM</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆状态：">
                                <Select defaultValue={0} {...getFieldProps('status')} >
                                    <Option value={0}>可用</Option>
                                    <Option value={1}>出车</Option>
                                    <Option value={2}>维护</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="初始里程：">
                                <AntInput type="text" placeholder="" {...getFieldProps('startMileage')} />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="是否停用：">
                                <label className="isOutage">
                                    <Checkbox {...getFieldProps('nonUse')} />
                                </label>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="发动机号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('engineNo')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="车架号：">
                                <AntInput type="text" placeholder="" {...getFieldProps('vin')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入单位：">
                                <AntInput type="text" placeholder="" {...getFieldProps('purchaseCompany')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入价格：">
                                <AntInput type="text" placeholder="" {...getFieldProps('purchasePrice')} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入日期：">
                                <DatePicker {...getFieldProps('purchaseDate')} />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                wrapperCol={{span:14,offset:8}}
                                label="备注：">
                                <AntInput type="textarea" placeholder="请输入..."
                                    {...getFieldProps('comment')}
                                          id="textarea-more" name="textarea" className='vehicle-more'/>
                            </FormItem>

                        </Col>
                    </Row>
                </div>
                <div className="footer-info" style={{backgroundColor:'#E6E5ED'}}>
                    <Row type="flex" justify="space-around">
                        <Col span='8'>
                            <AntButton type="primary" htmlType="submit" onClick={this.handleSubmit}>保存并添加</AntButton>
                        </Col>
                        <Col span='8'>
                            <AntButton type="primary" htmlType="submit" onClick={this.handleSubmit}>保存</AntButton>
                        </Col>
                        <Col span='8'>
                            <AntButton type="primary" onClick={this.handleCancel}>退出</AntButton>
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
});
//添加条目table(Vehicle)
AddTableOfVehicle = Form.create()(AddTableOfVehicle);
//添加条目窗口
const AddDialog = React.createClass({
    mixins: [BackboneReactMixin],
    getInitialState(){
        return {
            visible: false,
            collectionInfo: []
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            visible: nextProps.isAdd
        });
    },
    showModal(){
        this.setState({
            visible: true
        });
    },
    handleChildrenChange(isSubmit){
        this.setState({
            visible: false
        });
        this.props.callbackParentOfAdd(false);
    },
    render(){
        let pageShow = this.props.pageShow;
        var addTable = function () {
            switch (pageShow) {
                case 'staff':
                    return (
                        <Modal visible={this.state.visible} footer="" closable={false} className="add-modal">
                            <AddTable
                                visible={this.state.visible}
                                callbackParentOfAdd={this.handleChildrenChange} collection={staffs}
                                />
                        </Modal>
                    );
                    break;
                case 'vehicle':
                    return (
                        <Modal visible={this.state.visible} footer="" closable={false} className="add-modal">
                            <AddTableOfVehicle
                                visible={this.state.visible}
                                callbackParentOfAdd={this.handleChildrenChange}
                                />
                        </Modal>);
                    break;
                case 'task':
                    return (
                        <Modal visible={this.state.visible} footer="" closable={false} className="add-task">
                            <AddTask visible={this.state.visible}
                                     callbackParentOfAdd={this.handleChildrenChange}
                                />
                        </Modal>
                    );
                    break;
            }
        }.bind(this);
        return (
            <div>{addTable()}</div>

        )
    }

});
//发送消息窗口
const SendMessageDialog = React.createClass({
    mixins: [BackboneReactMixin],
    getInitialState(){
        return {
            visible: false,
            selectVisible: false,
            inputValue: [],
            selectValue: '',
            selectValueArray: [],
            searchSelectHeight: '100px'
        };
    },
    componentDidMount(){

    },
    componentWillReceiveProps(nextProps){
        let inputValueTemp = this.state.inputValue;
        if (nextProps.isSendMessage) {
            if (this.state.model) {
                if (!_.contains(this.state.inputValue, this.state.model)) {
                    inputValueTemp.push(this.state.model);
                }
                this.setState({
                    visible: nextProps.isSendMessage,
                    selectValueArray: inputValueTemp
                });
            }
            //发送批量操作
            if (nextProps.selectItem) {
                this.setState({
                    visible: true,
                    selectValueArray: nextProps.selectItem
                })
            }
        } else {
            this.setState({
                visible: false
            })
        }

    },
    showModal(){
        this.setState({
            visible: true
        });
    },
    handleOK(){
        this.setState({
            visible: false
        });
        this.props.callbackParent(false)
    },
    handleCancel(){
        this.setState({
            visible: false
        });
        this.props.callbackParent(false)
    },
    handleIconClick(){
        if (this.state.selectVisible) {
            $('.search-select').addClass('is-display');
            this.setState({
                selectVisible: false
            })
        } else {
            $('.search-select').removeClass('is-display');
            this.setState({
                selectVisible: true
            })
        }
    },
    handleAddName(){
        let tempArray = this.state.selectValueArray;
        if (this.state.selectValue) {
            tempArray.push(this.state.selectValue);
            this.setState({
                selectValueArray: tempArray
            })
        }
    },
    handleSelectChoose(value){
        this.setState({
            selectValue: value
        })
    },
    handleSelectFocus(event){
        $("input[name=cursor-field]").focus();
    },
    handlePressCancel(event){
        if (event.keyCode == 8) {
            if (this.state.selectValueArray.length > 0) {
                let tempArray = this.state.selectValueArray;
                tempArray.pop();
                this.setState({
                    selectValueArray: tempArray
                })
            }
        }
    },
    handleClickCancel(event){
        let tempArray = this.state.selectValueArray;
        tempArray.splice($(event.target).attr('data-index'), 1);
        this.setState({
            selectValueArray: tempArray
        })
    },
    render(){
        let selectItem = this.state.selectValueArray.map(function (item, index) {
            //todo 暂时兼容非Model数据，与后台数据交换的时候要改
            if (typeof item === 'object') {
                return (
                    <li className="select-item" key={index} data-id={item.id}>
                        <span className="item-content">{item.name ? item.name : item.label}</span>
                        <span className="item-remove" data-index={index} onClick={this.handleClickCancel}></span>
                    </li>
                )
            } else {
                return (
                    <li className="select-item" key={index}>
                        <span className="item-content">{item}</span>
                        <span className="item-remove" data-index={index} onClick={this.handleClickCancel}></span>
                    </li>
                )
            }

        }.bind(this));
        return (
            <div className="send-message">
                <Modal visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer=""
                       closable={false} className="send-message-modal">
                    <Row>
                        <Col span="4"><span>短信接收人员:</span></Col>
                        <Col span="18">
                            <span className='send-select-warp' onClick={this.handleSelectFocus}>
                                <span className="send-select-span">
                                     <ul className='send-select-content'>
                                         {selectItem}
                                         <li className="cursor-warp">
                                            <span className="cursor-field-warp">
                                                <input className="cursor-field" value="" name='cursor-field'
                                                       onKeyDown={this.handlePressCancel}></input>
                                            </span>
                                        </li>
                                     </ul>
                                </span>
                            </span>
                        </Col>
                        <Col span="2" className="plus-icon-box">
                            <Icon type="plus-circle-o" className="plus-icon" onClick={this.handleIconClick}/>

                            <div className="search-select is-display">
                                <div className="search-select-title">添加新的联系人</div>
                                <SearchInput placeholder="搜索关键字" callbackParent={this.handleSelectChoose}/>
                                <AntButton type="primary" size="large" className="confirmation-btn"
                                           style={{position:'absolute',bottom:'10px',left:'30px'}}
                                           onClick={this.handleAddName}>确认添加</AntButton>
                            </div>
                        </Col>
                    </Row>
                    <Row type="flex" justify="start">
                        <Col span="18" offset="4" className="input-tip"><span
                            className="">使用"@姓名"可以快速添加短信内容</span></Col>
                    </Row>
                    <Row className="send-content">
                        <Col span="4"><span>消息内容:</span></Col>
                        <Col span="18" className="input-textarea"><AntInput type="textarea" placeholder=""/></Col>
                    </Row>
                    <Row className="send-message-er-box">
                        <Col span="4" offset="17"><span>消息创建人:</span></Col>
                        <Col span="3">
                            <div className="send-message-er">张三</div>
                        </Col>
                    </Row>

                    <Row className="send-btn">
                        <Col span="6"><AntButton type="primary" onClick={this.handleOK}>发送</AntButton></Col>
                        <Col span="6" offset="12"><AntButton type="primary"
                                                             onClick={this.handleCancel}>退出</AntButton></Col>
                    </Row>
                </Modal>
            </div>
        )
    }
});
//查看信息table（staff）
let LookTable = React.createClass({
    mixins: [BackboneReactMixin, typeStatusStaffMixin],
    handleEdit(e) {
        e.preventDefault();
        this.props.callbackParentOfLook('isEdit');
    },
    handleCancel(){
        this.props.callbackParentOfLook(false);
    },
    render() {
        const { getFieldProps } = this.props.form;
        let staffInfo = this.state.model;
        let isDriver = this.typeStatusInfoLook(staffInfo).isDriver;
        let typeStatus = this.typeStatusInfoLook(staffInfo).typeStatus;
        return (
            <Form horizontal onSubmit={this.handleSubmit} className='look-form'>
                <div className="up-info">
                    <Row type='flex' justify="center">
                        <Col span="8">
                            <div className="header-icon">
                                <img src={staffInfo.avatar}/>
                            </div>
                        </Col>
                        <Col span="16" className="header-right">
                            <h3>{staffInfo.name}</h3>
                            {typeStatus}
                        </Col>
                    </Row>
                </div>
                <div className="middle-info">
                    <Row type='flex' justify="center">
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="编码：" required>
                                <p>{staffInfo.code}</p>
                            </FormItem>
                        </Col>
                        <Col span='12'></Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="部门：">
                                <p>{staffInfo.department}</p>
                            </FormItem>
                        </Col>
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="性别：" required>
                                <p>{staffInfo.sex?'女':'男'}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="身份证号：" required>
                                <p>{staffInfo.IDCardNo}</p>
                            </FormItem>
                        </Col>
                        <Col span="12"></Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="地址：">
                                <p>{staffInfo.address}</p>
                            </FormItem>
                        </Col>
                        <Col span="12"></Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="入职：">
                                <p>{staffInfo.employmentDate}</p>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="电话：" required>
                                <p>{staffInfo.tel}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="备注" required>
                                <p>{staffInfo.comment}</p>
                            </FormItem>
                        </Col>
                        <Col span="12"></Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="是否停用">
                                <label className="isOutage">
                                    <Checkbox {...getFieldProps('nonUse')} defaultChecked={false} disabled/>
                                </label>
                            </FormItem>
                        </Col>
                        <Col span="12"></Col>
                    </Row>
                    {isDriver}
                </div>
                <div className="footer-info" style={{backgroundColor:'#E6E5ED'}}>
                    <Row type='flex' justify="space-around">
                        <Col span='6'>
                            <AntButton type="primary" htmlType="submit" onClick={this.handleEdit}>编辑</AntButton>
                        </Col>
                        <Col span='6'>
                            <AntButton type="primary" onClick={this.handleCancel}>任务记录</AntButton>
                        </Col>
                        <Col span='6'>
                            <AntButton type="primary" onClick={this.handleCancel}>病事假记录</AntButton>
                        </Col>
                        <Col span='6'>
                            <AntButton type="primary" onClick={this.handleCancel}>退出</AntButton>
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
});
LookTable = Form.create()(LookTable);
//查看信息table (vehicle)
let LookTableVehicle = React.createClass({
    mixins: [BackboneReactMixin],
    handleEdit(e) {
        e.preventDefault();
        this.props.callbackParentOfLook('isEdit');
    },
    handleCancel(){
        this.props.callbackParentOfLook(false);
    },
    render() {
        const { getFieldProps } = this.props.form;
        //console.log(this.state.model);
        const vehicleInfo = this.state.model;
        return (
            <Form horizontal onSubmit={this.handleSubmit} className='look-form'>
                <div className="up-info">
                    <Row type='flex' justify="center">
                        <Col span="8">
                            <div className="header-icon">
                                <img src={vehicleInfo.avatar}/>
                            </div>
                        </Col>
                        <Col span="16" className="header-right">
                            <h3>{vehicleInfo.label}</h3>
                            <Row type="flex">
                                <Col span="4">
                                    <div className="type-text right">车牌号：</div>
                                </Col>
                                <Col span="12">
                                    <div className="status-text right">{vehicleInfo.vehicleNo}</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className="middle-info">
                    <Row type='flex' justify="center">
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆品牌：">
                                <p>{vehicleInfo.brand}</p>
                            </FormItem>
                        </Col>
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机：">
                                <p>{vehicleInfo.driverName}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="车辆型号：">
                                <p>{vehicleInfo.model}</p>
                            </FormItem>
                        </Col>
                        <Col span='12'>
                            <FormItem
                                {...formItemLayout}
                                label="司机手机：">
                                <p>{vehicleInfo.driverTel}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆类型：">
                                <Select defaultValue={vehicleInfo.status} disabled>
                                    <Option value={0}>客车</Option>
                                    <Option value={1}>货车</Option>
                                    <Option value={1}>其他</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="所在部门：">
                                <p>{vehicleInfo.department}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type='flex' justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="标签：">
                                <p>{vehicleInfo.tags}</p>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车主：">
                                <p>{vehicleInfo.vehicleOwner}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="颜色：">
                                <p>{vehicleInfo.color}</p>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="车主手机：">
                                <p>{vehicleInfo.driverTel}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="载重（吨）：">
                                <p>{vehicleInfo.capacity}</p>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="所属车队：">
                                <p>{vehicleInfo.vehicleGroup}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="座位数：">
                                <p>{vehicleInfo.seats}</p>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="油卡编号：">
                                <p>{vehicleInfo.oilCardNo}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="油耗：">
                                <p>{vehicleInfo.oilWear}</p>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="电卡编号：">
                                <p>{vehicleInfo.electricCardNo}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="续航里程">
                                <p>{vehicleInfo.enduranceMileage}</p>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="车辆状态：">
                                <Select defaultValue={vehicleInfo.status} disabled>
                                    <Option value={0}>可用</Option>
                                    <Option value={1}>出车</Option>
                                    <Option value={1}>维护</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="初始里程：">
                                <p>{vehicleInfo.startMileage}</p>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="是否停用：">
                                <label className="isOutage">
                                    <Checkbox {...getFieldProps('nonUse')} defaultChecked={vehicleInfo.nonUse} disabled/>
                                </label>

                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                label="发动机号：">
                                <p>{vehicleInfo.engineNo}</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="车架号：">
                                <p>{vehicleInfo.vin}</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入单位：">
                                <p>{vehicleInfo.purchaseCompany}</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入价格：">
                                <p>{vehicleInfo.purchasePrice}</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购入日期：">
                                <p>{vehicleInfo.purchaseDate}</p>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                {...formItemLayout}
                                wrapperCol={{span:14,offset:8}}
                                label="备注：">
                                <AntInput type="textarea" placeholder="请输入..." id="textarea-more" name="textarea"
                                          className='vehicle-more' value={vehicleInfo.comment}/>
                            </FormItem>

                        </Col>
                    </Row>
                </div>
                <div className="footer-info" style={{backgroundColor:'#E6E5ED'}}>
                    <Row type='flex' justify="space-around">
                        <Col span='6'>
                            <AntButton type="primary" htmlType="submit" onClick={this.handleEdit}>编辑</AntButton>
                        </Col>
                        <Col span='6'>
                            <AntButton type="primary" onClick={this.handleCancel}>出车记录</AntButton>
                        </Col>
                        <Col span='6'>
                            <AntButton type="primary" onClick={this.handleCancel}>维保记录</AntButton>
                        </Col>
                        <Col span='6'>
                            <AntButton type="primary" onClick={this.handleCancel}>退出</AntButton>
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
});
LookTableVehicle = Form.create()(LookTableVehicle);
//查看信息弹窗
const LookDialog = React.createClass({
    mixins: [BackboneReactMixin],
    getInitialState(){
        return {
            visible: false
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            visible: nextProps.isLook
        });
    },
    showModal(){
        this.setState({
            visible: true
        });
    },
    handleChildrenChange(isChange){
        this.setState({
            visible: false
        });
        this.props.callbackParent(isChange);
    },
    render(){
        let pageShow = this.props.pageShow;
        var lookTable = function () {
            switch (pageShow) {
                case 'staff':
                    return (<LookTable
                        visible={this.state.visible}
                        callbackParentOfLook={this.handleChildrenChange} model={this.getModel()}
                        />);
                    break;
                case 'vehicle':
                    return (<LookTableVehicle
                        visible={this.state.visible}
                        callbackParentOfLook={this.handleChildrenChange}
                        model={this.getModel()}
                        />);
                    break;
            }
        }.bind(this);
        return (
            <Modal visible={this.state.visible} footer="" closable={false} className="look-modal">
                {lookTable()}
            </Modal>
        )
    }
});
//高级搜索下拉面板
const AdvancedSearchPanel = React.createClass({
    mixins: [advanceSearchMixin],
    getInitialState(){
        return {
            tableDataStaff: [{
                headerName: '车辆类型：',
                value_0: 'A1执照',
                value_1: 'A2执照',
                value_2: 'B1执照',
                value_3: 'B2执照',
                value_4: 'C1执照',
                value_5: 'C2执照',
                value_6: 'C3执照'
            },
                {
                    headerName: '所属部门：',
                    value_0: '车队1',
                    value_1: '车队2',
                    value_2: '车队3',
                    value_3: '车队4',
                    value_4: '车队5',
                    value_5: '',
                    value_6: ''
                },
                {
                    headerName: '状态：：',
                    value_0: '空闲',
                    value_1: '正在任务中',
                    value_2: '休假中',
                    value_3: '',
                    value_4: '',
                    value_5: '',
                    value_6: ''
                }
            ],
            tableDataVehicle: [],
            advancedSearchList: [],
            startValue: null,
            endValue: null
        }
    },
    componentDidMount(){

        this.advancedSearch_token = PubSub.subscribe('advanceSearch', function (topic, moveHeight) {
            $('.advanced-search-panel').animate({
                top: moveHeight
            })
        }.bind(this))
    },
    componentWillUnMount(){
      PubSub.unsubscribe(this.advancedSearch_token)
    },
    clickSearchTab(e){
        let textValue = $(e.target).text();
        PubSub.publish('advanceSearchData', textValue);
    },
    disableStartDate(startValue){
        if (!startValue || !this.state.endValue) {
            return false
        }
        return startValue.getTime() >= this.state.endValue.getTime()
    },
    disableEndDate(endValue){
        if (!endValue || !this.state.startValue) {
            return false
        }
        return endValue.getTime() <= this.state.startValue.getTime()
    },
    onChange(field, value){
        console.log(field, 'change', value);
        this.setState({
            [field]: value
        })
    },
    timeOnChange(){

    },
    render(){
        let generalTableContentStaff = this.state.tableDataStaff.map(function (item, index) {
            return (
                <tr key={index}>
                    <td>{item.headerName}</td>
                    <td onClick={this.clickSearchTab}>{item.value_0}</td>
                    <td onClick={this.clickSearchTab}>{item.value_1}</td>
                    <td onClick={this.clickSearchTab}>{item.value_2}</td>
                    <td onClick={this.clickSearchTab}>{item.value_3}</td>
                    <td onClick={this.clickSearchTab}>{item.value_4}</td>
                    <td onClick={this.clickSearchTab}>{item.value_5}</td>
                </tr>
            )
        }.bind(this));
        let starTimeAndEndTime =
            <div className='vehicle-out-start'>
                <DatePicker className="car-out-start" disabledDate={this.disableStartDate}
                            value={this.state.startValue}
                            placeholder="开始日期"
                            onChange={this.onChange.bind(this, 'startValue')}/>
                <span className="start-date-space">至</span>
                <DatePicker className="car-out-start" disabledDate={this.disableEndDate}
                            value={this.state.endValue}
                            placeholder="结束日期"
                            onChange={this.onChange.bind(this, 'endValue')}/>
            </div>;
        let panel = '';
        switch (this.props.pageShow) {
            case 'staff':
                panel = (
                    <div>
                        <div className='table-title'>
                            <span>所有职员<Icon type="right"/>共999个职员</span>
                        </div>
                        <table className="advanced-table">
                            <tbody>
                            {generalTableContentStaff}
                            </tbody>
                        </table>
                    </div>
                );
                break;
            case 'vehicle':
                panel = this.advanceSearch();
                break;
            case 'task':
                panel = this.advanceSearch();
                break;
        }
        return (
            <div className="advanced-search-panel">
                {panel}
            </div>
        )
    }
});
export{EditDialog,SendMessageDialog,AddDialog,LookDialog,AdvancedSearchPanel}
