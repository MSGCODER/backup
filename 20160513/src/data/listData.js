/**
 * 列表显示模拟数据
 */
import React from 'react';
import {render} from 'react-dom';
import {Button as AntButton,Modal,Row, Col,Input as AntInput,Icon} from 'antd';
const columns = [
    {
        title:<AntButton size="small"><Icon type="menu-fold" /></AntButton>,
        className:"choose-table-header"
    },
    {
    title: '姓名',
    dataIndex: 'name'},
    {
    title: '年龄',
    dataIndex: 'age'},
    {
    title: '住址',
    dataIndex: 'address'
}];
const data =[];
for(let i = 0; i < 46 ; i++ ){
    data.push({
        key:i,
        name:`李大嘴${i}`,
        age:32,
        address:`西湖区${i}`
    })
}
export{columns,data}