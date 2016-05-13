/**
 * header 区组件
 */
import React from 'react';
import {render} from 'react-dom';
import BackboneReactMixin from 'backbone-react-component';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router';
//系统设置组件
const SysTemSetting = React.createClass({

    render(){
        return(
            <Link to="/setting"><Button bsStyle="link"><h5>系统设置</h5></Button></Link>
        )
    }
});
//管理员组件
const Admin = React.createClass({
   render(){
       return(
           <div>
               <ul className = "list-inline">
                   <li className = "header-img"></li>
                   <li><Button bsStyle="link"><h5>管理员</h5></Button></li>
               </ul>
           </div>
       )
   }
});
const LoginOut = React.createClass({
   render(){
       return(
           <div>
               <Button bsStyle="link"><h5>退出</h5></Button>
           </div>
       )
   }
});
const Header = React.createClass({
    render(){
        return (
            <div className="header-content">
                    <ul className="list-inline header-text">
                        <li className="header-title-left">
                            <ul className = "list-inline">
                                <li>
                                    <h2>长江电动汽车</h2>
                                </li>
                                <li>
                                    <h4>车队管理系统</h4>
                                </li>
                            </ul>
                        </li>
                        <li className="headerOperationSpace">
                            <ul className = "list-inline">
                                <li>
                                    <SysTemSetting />
                                 </li>
                                <li>
                                    <Admin />
                                </li>
                                <li>
                                    <h5>|</h5>
                                </li>
                                <li>
                                    <LoginOut />
                                </li>
                            </ul>
                        </li>
                    </ul>
            </div>
        )
    }
});
export{Header}