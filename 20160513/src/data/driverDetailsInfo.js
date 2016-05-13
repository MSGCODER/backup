/**
 * Created by zhaiyujia on 2016/3/28.
 */
import React from 'react';
const driverColumns = [
    {
        key:'0',
        title: <div className="blank"></div>

    },
    {
        key:'1',
        title: '所属部门',
        dataIndex: 'department',
        value:''
    },
    {
        key:'2',
        title: '姓名',
        dataIndex: 'name',
        value:''
    },
    {
        key:'3',
        title: '驾照类别',
        dataIndex: 'licenseType',
        value:''
    },
    {
        key:'4',
        title: '人员状态',
        dataIndex: 'status',
        value:''
    },
    {
        key:'5',
        title: '备注',
        dataIndex: 'comment',
        value:''
    },
    {
        key:'6',
        title: '家庭住址',
        dataIndex: 'address',
        value:''
    }
];
export{driverColumns}