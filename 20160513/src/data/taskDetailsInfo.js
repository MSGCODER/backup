/**
 * Created by zhaiyujia on 2016/3/22.
 */
import React from 'react';
const columns = [
    {
        key:'0',
        title: <div className="blank"></div>

    },
    {
        key:'1',
        title: '所属车队',
        dataIndex: 'vehicleGroup'
    },
    {
        key:'2',
        title: '车辆类型',
        dataIndex: 'type'
    },
    {
        key:'3',
        title: '编码',
        dataIndex: 'code'
    },
    {
        key:'4',
        title: '车牌号',
        dataIndex: 'vehicleNo'
    },
    {
        key:'5',
        title: '车辆吨位',
        dataIndex: 'capacity'
    },
    {
        key:'6',
        title: '续航里程',
        dataIndex: 'enduranceMileage'
    }
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        motorcade: `${i}`,
        name: `张三${i}`,
        licensetype: `A${i}`,
        peoplestatus :`空闲${i}`,
        marker : `记性好${i}`,
        address: `大兴${i}号`
    });
}
export{columns,data}