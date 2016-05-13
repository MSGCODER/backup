import React from 'react';
import {Button as AntButton,Modal,Row, Col,Input as AntInput,Icon,Form, Select, Checkbox, Radio ,Tooltip,DatePicker,Collapse,Upload,Menu,Cascader,TimePicker} from 'antd';
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 }
};
const typeStatusStaffMixin = {
    typeStatusInfo(staffInfo,validateForm){
        const  getFieldProps = validateForm.getFieldProps;
        //准驾车型options
        const licenseTypeOptions=[
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
        let isDriver = '';
        let typeStatus = '';
        switch (staffInfo.role){
            //司机
            case 1:
                isDriver = (
                    <Collapse defaultActiveKey={['1']} className = "is-driver">
                        <Panel header={(
                       <div className ="" style={{width:'110%',position:'relative',right:'38px',borderBottom:'10px solid #E6E5ED'}}>
                           <span className = 'driver-text' style={{position:'relative',left:'185px'}}>司机</span>
                           <Icon type="circle-down" />
                       </div>
                       )}>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        hasFeedback
                                        label="驾驶证号：" labelCol={{span: 8}} required>
                                        <AntInput type="text" placeholder="" {...validateForm.licenseNo} />
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="有效期：" labelCol={{span: 8}} required>
                                        <DatePicker format="yyyy/MM/dd"  {...validateForm.expirationDate} />
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        hasFeedback
                                        label="发证机关：" labelCol={{span: 8}} required>
                                        <AntInput type="text" placeholder="" {...validateForm.licensingOrganization} />
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="年审到期：" labelCol={{span: 8}} required>
                                        <DatePicker  format="yyyy/MM/dd" {...getFieldProps('auditDate')}/>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="领证日期：" labelCol={{span: 8}} required>
                                        <DatePicker  format="yyyy/MM/dd" {...getFieldProps('licensingDate')} />
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="准驾类型：" labelCol={{span: 8}} required>
                                        <Cascader  options={licenseTypeOptions} expandTrigger="hover" popupClassName="form-cascader"
                                                   displayRender={displayRender}  {...getFieldProps('licenseType')} />
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                        </Panel>
                    </Collapse>
                );
                let driverStatus;
                switch (staffInfo.status){
                    case 0:
                        driverStatus=(
                            <Col span = "12">
                                <div className = "status-icon right icon"></div>
                                <div className = "status-text right">出车</div>
                            </Col>
                        );
                    default:
                        driverStatus=(
                            <Col span = "12">
                                <div className = "status-icon right icon"></div>
                                <div className = "status-text right">空闲</div>
                            </Col>
                        );
                }
                typeStatus = (
                    <Row type = "flex">
                        <Col span = "4">
                            <div className ="type-icon right icon"></div>
                            <div className = "type-text right">司机</div>
                        </Col>
                        {driverStatus}
                    </Row>
                );
                break;
            //管理员
            case 0:
                let adminStatus;
                switch (staffInfo.status){
                    case 2:
                        adminStatus=(
                            <Col span = "12">
                                <div className = "status-icon right icon"></div>
                                <div className = "status-text right">休假</div>
                            </Col>
                        );
                    default:
                        adminStatus=(
                            <Col span = "12">
                                <div className = "status-icon right icon"></div>
                                <div className = "status-text right">出勤</div>
                            </Col>
                        );
                }
                typeStatus =(
                    <Row type = "flex">
                        <Col span = "4">
                            <div className ="type-icon right icon"></div>
                            <div className = "type-text right">管理员</div>
                        </Col>
                        <Col span = "12">
                            {adminStatus}
                        </Col>
                    </Row>
                );
                break;
            //其他
            case 2:
                let otherStatus;
                switch (staffInfo.status){
                    case 2:
                        otherStatus=(
                            <Col span = "12">
                                <div className = "status-icon right icon"></div>
                                <div className = "status-text right">休假</div>
                            </Col>
                        );
                    default:
                        otherStatus=(
                            <Col span = "12">
                                <div className = "status-icon right icon"></div>
                                <div className = "status-text right">出勤</div>
                            </Col>
                        );
                }
                typeStatus =(
                    <Row type = "flex">
                        <Col span = "4">
                            <div className ="type-icon right icon"></div>
                            <div className = "type-text right">其他</div>
                        </Col>
                        <Col span = "12">
                            {otherStatus}
                        </Col>
                    </Row>
                );
                break;
        }
        return{
            typeStatus:typeStatus,
            isDriver:isDriver
        }
    },
    typeStatusInfoLook(staffInfo){
        let isDriver = '';
        let typeStatus = '';
        switch (staffInfo.role){
            //司机
            case 1:
                isDriver = (
                    <Collapse defaultActiveKey={['1']} className = "is-driver">
                        <Panel header={(
                       <div className ="" style={{width:'110%',position:'relative',right:'38px',borderBottom:'10px solid #E6E5ED'}}>
                           <span className = 'driver-text' style={{position:'relative',left:'185px'}}>司机</span>
                           <Icon type="circle-down" />
                       </div>
                       )}>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="驾驶证号："  required>
                                        <p>{staffInfo.licenseNo}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="有效期：" required>
                                        <p>{staffInfo.expirationDate}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="发证机关："  required>
                                        <p>{staffInfo.licensingOrganization}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="年审到期："  required>
                                        <p>{staffInfo.auditDate}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="领证日期：" required>
                                        <p>{staffInfo.licensingDate}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                            <Row type = 'flex' justify="center">
                                <Col span = "12">
                                    <FormItem
                                        {...formItemLayout}
                                        label="准驾车型："  required>
                                        <p>{staffInfo.licenseType}</p>
                                    </FormItem>
                                </Col>
                                <Col span = "12"></Col>
                            </Row>
                        </Panel>
                    </Collapse>
                );
                let driverStatus;
                switch (staffInfo.status){
                    case 0:
                        driverStatus=(
                            <Col span = "12">
                                <div className = "status-icon right icon"></div>
                                <div className = "status-text right">出车</div>
                            </Col>
                        );
                    default:
                        driverStatus=(
                            <Col span = "12">
                                <div className = "status-icon right icon"></div>
                                <div className = "status-text right">空闲</div>
                            </Col>
                        );
                }
                typeStatus = (
                    <Row type = "flex">
                        <Col span = "4">
                            <div className ="type-icon right icon"></div>
                            <div className = "type-text right">司机</div>
                        </Col>
                        {driverStatus}
                    </Row>
                );
                break;
            //管理员
            case 0:
                let adminStatus;
                switch (staffInfo.status){
                    case 2:
                        adminStatus=(
                            <Col span = "12">
                                <div className = "status-icon right icon"></div>
                                <div className = "status-text right">休假</div>
                            </Col>
                        );
                    default:
                        adminStatus=(
                            <Col span = "12">
                                <div className = "status-icon right icon"></div>
                                <div className = "status-text right">出勤</div>
                            </Col>
                        );
                }
                typeStatus =(
                    <Row type = "flex">
                        <Col span = "4">
                            <div className ="type-icon right icon"></div>
                            <div className = "type-text right">管理员</div>
                        </Col>
                        <Col span = "12">
                            {adminStatus}
                        </Col>
                    </Row>
                );
                break;
            //其他
            case 2:
                let otherStatus;
                switch (staffInfo.status){
                    case 2:
                        otherStatus=(
                            <Col span = "12">
                                <div className = "status-icon right icon"></div>
                                <div className = "status-text right">休假</div>
                            </Col>
                        );
                    default:
                        otherStatus=(
                            <Col span = "12">
                                <div className = "status-icon right icon"></div>
                                <div className = "status-text right">出勤</div>
                            </Col>
                        );
                }
                typeStatus =(
                    <Row type = "flex">
                        <Col span = "4">
                            <div className ="type-icon right icon"></div>
                            <div className = "type-text right">其他</div>
                        </Col>
                        <Col span = "12">
                            {otherStatus}
                        </Col>
                    </Row>
                );
                break;
        }
        return{
            typeStatus:typeStatus,
            isDriver:isDriver
        }
    }
};
export {typeStatusStaffMixin}
