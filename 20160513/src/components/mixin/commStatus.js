import React from 'react';
let cardStatus;
const typeStatusCommonMixin ={
    staffCardStatus(staffInfo){
        switch (staffInfo.role){
            //司机
            case 1:
                switch (staffInfo.status){
                    case 1:
                        cardStatus =(
                            <ul className = "list-inline">
                                <li className = "circle circle-g">
                                    <img src="/img/icon_trip_normal.png" />
                                </li>
                                <li className = "status"><h5>空闲</h5></li>
                            </ul>
                        );
                        break;
                    default:
                        cardStatus =(
                        <ul className = "list-inline">
                            <li className = "circle circle-g">
                                <img src="/img/icon_trip_leave.png" />
                            </li>
                            <li className = "status"><h5>出车</h5></li>
                        </ul>
                        );
                        break;
                }
                break;
            //管理员和其他
            default:
                switch (staffInfo.status){
                    case 1:
                        cardStatus =(
                            <ul className = "list-inline">
                                <li className = "circle circle-g">
                                    <img src="/img/icon_trip_normal.png" />
                                </li>
                                <li className = "status"><h5>出勤</h5></li>
                            </ul>
                        );
                        break;
                    default :
                        cardStatus =(
                            <ul className = "list-inline">
                                <li className = "circle circle-g">
                                    <img src="/img/icon_trip_leave.png" />
                                </li>
                                <li className = "status"><h5>休假</h5></li>
                            </ul>
                        );
                        break;
                }
                break;
        }
        return cardStatus;
    },
    vehicleCardStatus(vehicleInfo){
        switch (vehicleInfo.status){
            //出车
            case 1:
                cardStatus =(
                    <ul className = "list-inline">
                        <li className = "circle circle-g">
                            <img src="/img/icon_trip_leave.png" />
                        </li>
                        <li className = "status"><h5>出车</h5></li>
                    </ul>
                );
                break;
            //维护
            case 2:
                cardStatus =(
                    <ul className = "list-inline">
                        <li className = "circle circle-g">
                            <img src="/img/icon_trip_leave.png" />
                        </li>
                        <li className = "status"><h5>维护</h5></li>
                    </ul>
                );
                break;
            //可用
            default:
                cardStatus =(
                    <ul className = "list-inline">
                        <li className = "circle circle-g">
                            <img src="/img/icon_trip_normal.png" />
                        </li>
                        <li className = "status"><h5>可用</h5></li>
                    </ul>
                );
                break;
        }
        return cardStatus;
    }
};
export{typeStatusCommonMixin}
