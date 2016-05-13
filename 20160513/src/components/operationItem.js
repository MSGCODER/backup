/**
 * 操作区组件
 */
import $ from 'jquery'
import React from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router'
import {Button as AntButton,Modal,Row, Col,Input as AntInput,Icon,Checkbox,Collapse} from 'antd';
import _ from 'underscore'
import BackBone from 'backbone';
import {Button,Tooltip,Overlay} from 'react-bootstrap';
import BackboneReactMixin from 'backbone-react-component';
import {SearchInput} from './toolComponents/selectAutoCompletion';
import {SendMessageDialog} from './toolComponents/dialogConponents'
import {AddDialog} from './toolComponents/dialogConponents';
import {staffData} from '../models/staffData';
import {vehicleData} from '../models/vehicleData';
import {serverBaseUrl} from '../serverBaseUrl'
const Panel = Collapse.Panel;
const confirm = Modal.confirm;
//添加
const AddItem = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return {
            lgShow:false
        };
    },
    handleMouseEnter:function(event){
        $(event.target).parents('.operation-item-btn').addClass('item-hover')
    },
    handleMouseLeave:function(event){
        $('.operation-item-btn').removeClass('item-hover')
    },
    onChildChangeAdd(isSubmit){
        this.setState({
            lgShow:false
        })
    },
    handleClick(e){
    },
    render(){
        return(
            <li  onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} className ='operation-item-btn' onClick = {this.handleClick}>
                <Button bsStyle="link" onClick={()=>this.setState({lgShow:true})}>
                    <ul className = 'list-inline'>
                        <li className = "add-item-icon operation-item-icon add-item-icon-hover">
                        </li>
                        <li>
                            <h5>添加</h5>
                        </li>
                    </ul>
                </Button>
                <AddDialog isAdd={this.state.lgShow} callbackParentOfAdd = {this.onChildChangeAdd} pageShow={this.props.pageShow} collection={staffData}/>
            </li>
        )
    }
});
//任务类型
const TaskType = React.createClass({
    render(){
        return(
            <li>
                <ul className="list-inline">
                    <Arranged />
                    <OnGoing />
                    <ToBeDistributed />
                </ul>
            </li>
        )
    }
});
//已安排
const Arranged = React.createClass({
    render(){
        return(
            <li>
                <Button bsStyle="link">
                    <ul className="list-inline">
                        <li className = "task-color arranged">1</li>
                        <li className = "type-text"><h5>已安排</h5></li>
                    </ul>
                </Button>
            </li>
        )
    }
});
//进行中
const OnGoing = React.createClass({
    render(){
        return(
            <li>
                <Button bsStyle="link">
                    <ul className = "list-inline">
                        <li className ="task-color onGoing">1</li>
                        <li className ="type-text"><h5>进行中</h5></li>
                    </ul>
                </Button>
            </li>
        )
    }
});
//待派发
const ToBeDistributed = React.createClass({
    render(){
        return(
            <li>
                <Button bsStyle="link">
                    <ul className="list-inline">
                        <li className = "task-color tobeDistributed">2</li>
                        <li className = "type-text"><h5>待派发</h5></li>
                    </ul>
                </Button>
            </li>
        )
    }
});
//任务管理列表显示
const TaskListItem =React.createClass({
    getInitialState(){
        return{
            showWay:false
        }
    },
    handleClick(){
        PubSub.publish('show-history','list');
        this.props.callbackParent('list')
    },
    render(){
        return(
            <ul className = "list-inline">
                <AddItem pageShow={this.props.pageShow} collection={staffData}/>
                <li className ='operation-item-btn'>
                    <Button bsStyle="link" onClick = {this.handleClick}>
                        <ul className = "list-inline" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                            <li className = "history-item-icon operation-item-icon list-item-icon-hover"></li>
                            <li className = "card-show"><h5>任务历史</h5></li>
                        </ul>
                    </Button>
                </li>
                <TaskType />
            </ul>
        )
    }
});
//列表
const ListItem =React.createClass({
    getInitialState(){
        return{
            showWay:false,
            pageShow:this.props.pageShow
        }
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.pageShow != this.state.pageShow){
            this.setState({
                pageShow:nextProps.pageShow,
                showWay:false
            });
            this.props.callbackParent('card')
        }
    },
    handleMouseEnter:function(event){
        $(event.target).parents('.operation-item-btn').addClass('item-hover');
    },
    handleMouseLeave:function(event){
        $('.operation-item-btn').removeClass('item-hover');
    },
    handleClick(e){
        this.state.showWay? this.setState({showWay:false}):this.setState({showWay:true});
        if(this.state.showWay){
            PubSub.publish('showWay','card');
            this.props.callbackParent('card')
        }else{
            PubSub.publish('showWay','list');
            this.props.callbackParent('list')
        }

    },
    render(){
        return(
            <li className ='operation-item-btn'>
                <Button bsStyle="link" onClick = {this.handleClick}>
                    <ul className = "list-inline" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        <li className = "list-item-icon operation-item-icon list-item-icon-hover"></li>
                        <li className = "card-show"><h5>切换展示</h5></li>
                    </ul>
                </Button>
            </li>
        )
    }
});
//批量操作
const BatchOperation = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return {
            show:false,
            pageShow:this.props.pageShow
        }
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.pageShow != this.state.pageShow){
            this.setState({
                pageShow: nextProps.pageShow,
                show:false
            });
        }
    },
    toggle(e){
        this.setState({
            show: !this.state.show
        });
        if(!this.state.show){
            $(e.target).parents('.operation-item-btn').addClass('item-click');
        }else{
            $('.operation-item-btn').removeClass('item-click');
        }
        PubSub.publish('batchOperation',!this.state.show);
    },
    handleMouseEnter:function(event){
        $(event.target).parents('.operation-item-btn').addClass('item-hover');
    },
    handleMouseLeave:function(event){
        $('.operation-item-btn').removeClass('item-hover');
    },
    render(){
        let tooltip ='';
        if(this.state.pageShow==='staff'){
            tooltip =
                <Tooltip id="deleteBatch">
                    <ul className="list-inline">
                        <SelectAll />
                        <SendMessage collection={this.getCollection()}/>
                        <DeleteItem />
                        <PrintItem />
                    </ul>
                </Tooltip>;
        }else{
            tooltip =
                <Tooltip id="deleteBatch">
                    <ul className="list-inline">
                        <SelectAll />
                        <DeleteItem />
                        <PrintItem />
                    </ul>
                </Tooltip>;
        }
        const sharedProps = {
            show: this.state.show,
            container: this,
            target: () => ReactDOM.findDOMNode(this.refs.target)
        };
        return(
            <li style={{position: 'relative' }} className ='operation-item-btn'>
                <Button bsStyle="link" ref="target" onClick={this.toggle}>
                    <ul className = "list-inline" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        <li className = "batch-item-icon operation-item-icon batch-item-icon-hover"></li>
                        <li>
                            <h5>批量操作</h5>
                        </li>
                    </ul>
                </Button>
                <Overlay {...sharedProps} placement="bottom">
                    {tooltip}
                </Overlay>
            </li>
        )
    }
});
//批量子组件
//全选
const SelectAll = React.createClass({
    getInitialState(){
        return{
            isAllSelect:false
        }
    },
    handleClick(e){
        this.selectAll_Token = PubSub.publish('select-all','');
    },
    componentDidMount(){
        PubSub.subscribe('select-all-back',function(topic,isAllSelect){
            if(isAllSelect){
                $('.select-all-batch').addClass('btn-click');
            }else{
                $('.select-all-batch').removeClass('btn-click');
            }
            if(this.isMounted()){
                this.setState({
                    isAllSelect:isAllSelect
                });
            }
        }.bind(this));
    },
    componentWillUnMount(){
        PubSub.unsubscribe(this.selectAll_Token);
    },
    handleMouseEnter(e){
        $(e.target).parents('.batch-btn-warp').addClass('btn-hover');
    },
    handleMouseLeave(e){
        $(e.target).parents('.batch-btn-warp').removeClass('btn-hover');
    },
    render(){
        return(
            <li className = "batch-btn-warp select-all-batch">
                <Button bsStyle="link" className="select-all-btn batch-btn" onClick={this.handleClick}
                        onMouseEnter={this.handleMouseEnter} onMouseLeave = {this.handleMouseLeave}
                    ></Button>
            </li>
        )
    }
});
//发送信息
const SendMessage = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            isSendMessage:false,
            isListShow:false,
            selectItem:[]
        }
    },
    handleSendMessage(){
        PubSub.publish('send-message','');
    },
    componentDidMount(){
        if(this.props.showList){
            this.setState({
                isListShow:true
            })
        }else{
            this.setState({
                isListShow:false
            })
        }
        this.backSendMessage_token =PubSub.subscribe('back-send-message',function(topic,data){
            if(this.isMounted()){
                this.setState({
                    selectItem:data,
                    isSendMessage:true
                })
            }
        }.bind(this))
    },
    componentWillUnMount(){
        PubSub.unsubscribe(this.backSendMessage_token)
    },
    handleChildChange(){
    },
    handleMouseEnter(e){
        $(e.target).parents('.batch-btn-warp').addClass('btn-hover');
    },
    handleMouseLeave(e){
        $('.batch-btn-warp').removeClass('btn-hover');
    },
    render(){
        var isListShow = function(){
            if(this.state.isListShow){
                return(
                    <Button  bsStyle="link" className="" onClick={this.handleSendMessage}
                             onMouseEnter = {this.handleMouseEnter} onMouseLeave = {this.handleMouseLeave}>
                        <ul className = "list-inline">
                            <li className = "send-item-icon operation-item-icon"></li>
                            <li>
                                <h5>发送</h5>
                            </li>
                        </ul>
                    </Button>
                )
            }else{
                return(
                    <Button bsStyle="link" className="send-message-btn batch-btn" onClick={this.handleSendMessage}
                            onMouseEnter = {this.handleMouseEnter} onMouseLeave = {this.handleMouseLeave}></Button>
                )
            }
        }.bind(this);
        return(
            <div className = "send-message batch-btn-warp">
                {isListShow()}
                <SendMessageDialog isSendMessage={this.state.isSendMessage} callbackParent={this.handleChildChange} selectItem={this.state.selectItem}/>
            </div>
        )
    }
});
//删除
const DeleteItem = React.createClass({
    getInitialState(){
        return{
            isListShow:false
        }
    },
    //点击删除以后，将选中的item删除
    handleClick(){
        confirm({
            title:'亲,您是否确认删除这几项内容',
            content:'',
            onOk(){
                if(this.state.isListShow){
                    PubSub.publish('delete-item-list','');
                }else{
                    PubSub.publish('delete-item-card','');
                }
            },
            onCancel(){
                //self.props.callbackParent('noDelete');
            }
        });
    },
    componentDidMount(){
        if(this.props.showList){
            this.setState({
                isListShow:true
            })
        }else{
            this.setState({
                isListShow:false
            })
        }
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.showList){
            this.setState({
                isListShow:true
            })
        }else{
            this.setState({
                isListShow:false
            })
        }
    },
    handleMouseEnter(e){
        $(e.target).parents('.batch-btn-warp').addClass('btn-hover');
    },
    handleMouseLeave(e){
        $(e.target).parents('.batch-btn-warp').removeClass('btn-hover');
    },
    render(){
        var isListShow = function(){
            if(this.state.isListShow){
                return(
                    <Button  bsStyle="link" className="" onClick={this.handleClick}>
                        <ul className = "list-inline">
                            <li className = "delete-item-icon operation-item-icon"></li>
                            <li>
                                <h5>刪除</h5>
                            </li>
                        </ul>
                    </Button>
                )
            }else{
                return(
                    <Button  bsStyle="link" className="delete-item-btn batch-btn" onClick={this.handleClick}
                             onMouseEnter = {this.handleMouseEnter} onMouseLeave = {this.handleMouseLeave}
                        ></Button>
                )
            }
        }.bind(this);
        return(
            <li className = "batch-btn-warp" >
                {isListShow()}
            </li>
        )
    }
});
//打印
const PrintItem = React.createClass({
    getInitialState(){
        return{
            isListShow:false
        }
    },
    //点击打印以后，隐藏app主页，显示打印页面,发布全局事件
    handleClick(){
        PubSub.publish('print-data','');
    },
    componentWillMount(){
        if(this.props.showList){
            this.setState({
                isListShow:true
            })
        }else{
            this.setState({
                isListShow:false
            })
        }
    },
    componentDidMount(){
    },
    handleMouseEnter(e){
        $(e.target).parents('.batch-btn-warp').addClass('btn-hover')
    },
    handleMouseLeave(e){
        $(e.target).parents('.batch-btn-warp').removeClass('btn-hover')
    },
    render(){
        var isListShow = function(){
            if(this.state.isListShow){
                return(
                    <Button  bsStyle="link" className=""  onClick={this.handleClick}>
                        <ul className = "list-inline">
                            <li className = "print-item-icon operation-item-icon"></li>
                            <li>
                                <h5>打印</h5>
                            </li>
                        </ul>
                    </Button>
                )
            }else{
                return(
                    <Button  bsStyle="link" className="print-item-btn batch-btn" onClick={this.handleClick}
                             onMouseEnter={this.handleMouseEnter} onMouseLeave = {this.handleMouseLeave}
                        ></Button>
                )
            }
        }.bind(this);
        return(
            <li className = "batch-btn-warp" >
                {isListShow()}
            </li>
        )
    }
});

//人员信息
const CarType = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            showCount:'',
            showWay:'card',
            clickType:''
        }
    },
    componentWillMount(){
        this.getStaffCount = $.get({
            url:this.props.baseUrl+'/statics ',
            success:function(result){
                if(result.status.code == 200){
                    this.setState({
                        showCount:result.data
                    })
                }
            }.bind(this),
            error:function(){

            }
        });
    },
    componentDidMount(){
        //添加或删除后更新
        this.updateCollectionCount_Token=PubSub.subscribe('update-collection-count',function(topic,message){
            this.getStaffCount = $.get({
                url:this.props.baseUrl+'/statics ',
                success:function(result){
                    if(result.status.code == 200){
                        this.setState({
                            showCount:result.data
                        })
                    }
                }.bind(this),
                error:function(){

                }
            });
        }.bind(this));
        //card or list
        this.showWay_token = PubSub.subscribe('showWay',function(topic,showWay){
            if(this.isMounted()){
                this.setState({
                    showWay:showWay
                })
            }
        }.bind(this))
    },
    componentWillReceiveProps(nextProps){
        this.getStaffCount = $.get({
            url:nextProps.baseUrl+'/statics ',
            success:function(result){
                if(result.status.code == 200){
                    this.setState({
                        showCount:result.data
                    })
                }
            }.bind(this),
            error:function(){

            }
        });
    },
    childrenChange(clickType){
        this.setState({
            clickType:clickType
        })
    },
    render(){
        return(
            <li>
                <ul className="list-inline">
                    {/*
                        Driver 对应 车辆管理中的客车
                        Manager 对应车辆管理中的货车
                        Other 对应车辆管理中的其他
                    */}
                    <Driver  collection={this.getCollection()}
                             parentCallback = {this.childrenChange}
                             pageShow = {this.props.pageShow}
                             count={this.state.showCount}
                             showWay ={this.state.showWay}
                             clickType ={this.state.clickType}
                        />
                    <Manager collection={this.getCollection()}
                             parentCallback = {this.childrenChange}
                             pageShow = {this.props.pageShow}
                             count={this.state.showCount}
                             showWay ={this.state.showWay}
                             clickType ={this.state.clickType}
                        />
                    <Other  collection={this.getCollection()}
                            parentCallback = {this.childrenChange}
                            pageShow = {this.props.pageShow}
                            count={this.state.showCount}
                            showWay ={this.state.showWay}
                            clickType ={this.state.clickType}
                        />
                </ul>
            </li>
        )
    }
});
//黄颜色类别展示按钮
const Driver = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            driverCollection:'',
            isDriver:false,
            showText:'司机',
            count:'',
            pageShow:''
        }
    },
    componentWillReceiveProps(nextProps){
        switch (nextProps.pageShow){
            case 'staff':
                this.setState({
                    showText:'司机',
                    count:nextProps.count.driverCount
                });
                if(nextProps.pageShow != this.state.pageShow){
                    $('.click-item').removeClass('click-item');
                    this.setState({
                        pageShow:nextProps.pageShow,
                        isDriver:false
                    })
                }
                break;
            case 'vehicle':
                this.setState({
                    showText:'客车',
                    count:nextProps.count.busCount
                });

                if(nextProps.pageShow != this.state.pageShow){
                    $('.click-item').removeClass('click-item');
                    this.setState({
                        pageShow:nextProps.pageShow,
                        isDriver:false
                    })
                }
                break;
        }
        if(nextProps.clickType != 'isDriver'){
            this.setState({
                isDriver:false
            })
        }
    },
    handleClick(e){
        if(!this.state.isDriver){
            $('.click-item').removeClass('click-item');
            $(e.target).parents('.yellow').addClass('click-item');
            //黄色按钮点击
            PubSub.publish('select-cardType',{type:'yellow',showWay:this.props.showWay,pageShow:this.state.pageShow});
            this.setState({
                isDriver:true
            });
            this.props.parentCallback('isDriver')
        }else{
            $(e.target).parents('.yellow').removeClass('click-item');
            //黄色按钮点击
            PubSub.publish('select-cardType',{type:'',showWay:this.props.showWay,pageShow:this.state.pageShow});
            this.setState({
                isDriver:false
            });
            this.props.parentCallback('')
        }
    },
    render(){
        return(
            <li className = "operation-item-driver">
                <Button bsStyle="link" onClick={this.handleClick}>
                    <ul className="list-inline yellow">
                        <li className = "type-color driver">{this.state.count || 0}</li>
                        <li className = "type-text"><h5>{this.state.showText}</h5></li>
                    </ul>
                </Button>
            </li>
        )
    }
});
//管理（红色类别展示条目）
const Manager = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            managerCollection:'',
            isManager:false,
            showText:'管理',
            count:'',
            pageShow:''
        }
    },
    componentWillMount(){
    },
    componentDidMount(){

    },
    componentWillReceiveProps(nextProps){
        switch (nextProps.pageShow){
            case 'staff':
                this.setState({
                    showText:'管理',
                    count:nextProps.count.adminCount
                });
                if(nextProps.pageShow != this.state.pageShow){
                    $('.click-item').removeClass('click-item');
                    this.setState({
                        pageShow:nextProps.pageShow,
                        isManager:false
                    })
                }
                break;
            case 'vehicle':
                this.setState({
                    showText:'货车',
                    count:nextProps.count.truckCount
                });
                if(nextProps.pageShow != this.state.pageShow){
                    $('.click-item').removeClass('click-item');
                    this.setState({
                        pageShow:nextProps.pageShow,
                        isManager:false
                    })
                }
                break;
        }
        if(nextProps.clickType != 'isManager'){
            this.setState({
                isManager:false
            })
        }
    },
    handleClick(e){
        if(!this.state.isManager){
            $('.click-item').removeClass('click-item');
            $(e.target).parents('.red').addClass('click-item');
            //红色按钮点击
            PubSub.publish('select-cardType',{type:'red',showWay:this.props.showWay,pageShow:this.state.pageShow});
            this.setState({
                isManager:true
            });
            this.props.parentCallback('isManager');
        }else{
            $(e.target).parents('.red').removeClass('click-item');
            //红色按钮点击复原
            PubSub.publish('select-cardType',{type:'',showWay:this.props.showWay,pageShow:this.state.pageShow});
            this.setState({
                isManager:false
            });
            this.props.parentCallback('');
        }
    },
    render(){
        return(
            <li>
                <Button bsStyle="link" onClick={this.handleClick}>
                    <ul className = "list-inline red">
                        <li className ="type-color manager">{this.state.count || 0}</li>
                        <li className ="type-text"><h5>{this.state.showText}</h5></li>
                    </ul>
                </Button>
            </li>
        )
    }
});
//其他（蓝色类别展示条目）
const Other = React.createClass({
    mixins:[BackboneReactMixin],
    getInitialState(){
        return{
            otherCollection:'',
            isOther:false,
            count:0,
            pageShow:''
        }
    },
    componentWillReceiveProps(nextProps){
        switch (nextProps.pageShow){
            case 'staff':
                this.setState({
                    count:nextProps.count.otherCount
                });
                if(nextProps.pageShow != this.state.pageShow){
                    $('.click-item').removeClass('click-item');
                    this.setState({
                        pageShow:nextProps.pageShow,
                        isOther:false
                    })
                }
                break;
            case 'vehicle':
                this.setState({
                    count:nextProps.count.otherCount
                });
                if(nextProps.pageShow != this.state.pageShow){
                    $('.click-item').removeClass('click-item');
                    this.setState({
                        pageShow:nextProps.pageShow,
                        isOther:false
                    })
                }
                break;
        }
        if(nextProps.clickType != 'isOther'){
            this.setState({
                isOther:false
            })
        }
    },
    handleClick(e){
        if(!this.state.isOther){
            $('.click-item').removeClass('click-item');
            $(e.target).parents('.blue').addClass('click-item');
            //蓝色按钮点击
            PubSub.publish('select-cardType',{type:'blue',showWay:this.props.showWay,pageShow:this.state.pageShow});
            this.setState({
                isOther:true
            });
            this.props.parentCallback('isOther')
        }else{
            $(e.target).parents('.blue').removeClass('click-item');
            //蓝色按钮点击
            PubSub.publish('select-cardType',{type:'',showWay:this.props.showWay,pageShow:this.state.pageShow});
            this.setState({
                isOther:false
            });
            this.props.parentCallback('')
        }
    },
    render(){
        return(
            <li>
                <Button bsStyle="link" onClick={this.handleClick}>
                    <ul className="list-inline blue">
                        <li className = "type-color other">{this.state.count || 0}</li>
                        <li className = "type-text"><h5>其他</h5></li>
                    </ul>
                </Button>
            </li>
        )
    }
});
//搜索
const Search = React.createClass({
    getInitialState(){
        return{
            advancedSearchList:[],
            showWay:'card'
        }
    },
    componentDidMount(){
        this.advancedSearchData_token = PubSub.subscribe('advanceSearchData',function(topic,textValue){
            let advancedSearchListTmp =this.state.advancedSearchList;
            if(this.isMounted()){
                if(_.contains(this.state.advancedSearchList,textValue)){
                    advancedSearchListTmp =  _.filter(advancedSearchListTmp,function(item){return item!==textValue});
                }else{
                    advancedSearchListTmp.push(textValue);
                }
            this.setState({
                advancedSearchList:advancedSearchListTmp
            },function(){
                this.searchStyle()
            }.bind(this)); }
        }.bind(this));
        //切换展示，更新搜索框URL
        this.showWay_token =PubSub.subscribe('showWay', function (topic,showWay) {
                this.setState({
                    showWay:showWay
                });
        }.bind(this))
    },
    componentWillUnMount(){
        PubSub.unsubscribe(this.advancedSearchData_token)
    },
    focusAdvancedSearch(e){
        let advancedSearchItem =$(e.target);
        $(advancedSearchItem).addClass('click');
    },
    blurAdvancedSearch(e){
        let advancedSearchItem =$(e.target);
        $(advancedSearchItem).removeClass('click')
    },
    handleKeyPress(e){
        let advancedSearchListTmp =this.state.advancedSearchList;
        if(e.keyCode == 46){
            let deleteAdvItem = $(e.target).text();
            advancedSearchListTmp =  _.filter(advancedSearchListTmp,function(item){return item!==deleteAdvItem});
            this.setState({
                advancedSearchList:advancedSearchListTmp
            },function(){
                $('.advanced-search-item-text').removeClass('click').blur();
                this.searchStyle()
            }.bind(this))
        }
    },
    searchStyle(){
        if(this.state.advancedSearchList.length > 0){
            $('.search-item-block').addClass('search-item-block-show');
            $('.search-item .search-btn').addClass('is-display');
            $('.ant-select-search__field').attr('disabled','true')
        }else{
            $('.search-item-block').removeClass('search-item-block-show');
            $('.search-item .search-btn').removeClass('is-display');
            $('.ant-select-search__field').removeAttr('disabled')
        }
    },
    render(){
        let advancedSearchItem = this.state.advancedSearchList.map(function (item,index) {
            return(
                <div className = "advanced-search-item-block" key={index}>
                    <span className = "advanced-search-item-text" onFocus={this.focusAdvancedSearch} onBlur={this.blurAdvancedSearch} onKeyDown= {this.handleKeyPress}
                          style={{outline: '0px solid'}}
                          tabIndex="0" >{item}</span>
                </div>
            )
        }.bind(this));
        return(
            <li className = "search-item">
                <div className = "search-item-block">{advancedSearchItem}</div>
                <SearchInput callbackParent = {this.handleSelectChoose} className = "search-item-content"
                             showWay = {this.state.showWay}
                             pageShow ={this.props.pageShow} baseUrl = {this.props.baseUrl}/>
            </li>
        )
    }
});
//高级搜索
const AdvancedSearchIcon = React.createClass({
    getInitialState(){
        return{
            moveHeight:'90px',
            pageShow:this.props.pageShow
        }
    },
    handleClick(){
        this.state.moveHeight=='90px'?this.setState(
            {moveHeight:'-520px'}
        ):this.setState(
            {moveHeight:'90px'}
        );
        PubSub.publish('advanceSearch',this.state.moveHeight)
    },
    componentWillReceiveProps(nextProps){
    },
    render(){
        return(
            <li className = "advanced-search-item">
                <Button  bsStyle="link" onClick = {this.handleClick}>
                    <h5>高级搜索</h5>
                </Button>
            </li>
        )
    }
});
//停用记录
const OutageRecord = React.createClass({
    mixins:[BackboneReactMixin],
    gitInitialState(){
        return{
            isOutAgeCollection:''
        }
    },
    componentWillMount(){

    },
    componentDidMount(){
    },
    handleChange(event){
        if(event.target.checked){
            this.NonUse = $.get({
                url:this.props.baseUrl+'?view=card&select=nonUse',
                success:function(result){
                    if(result.status.code == 200){
                        PubSub.publish('reset-collection',result.data);
                    }
                }.bind(this),
                error:function(){

                }
            });
        }else{
            this.select_all = $.get({
                url:this.props.baseUrl+'?view=card&select=all',
                success:function(result){
                    if(result.status.code == 200){
                        PubSub.publish('reset-collection',result.data);
                    }
                }.bind(this),
                error:function(){

                }
            });
        }
    },
    render(){
        return(
            <li>
                <label>
                    <Checkbox onChange={this.handleChange}/>
                    <span className = 'operation-color' style={{color:'#22384D'}}>显示停用记录</span>
                </label>
            </li>
        )
    }
});
//导航栏组件
const OperationItem= React.createClass({
    getInitialState(){
        return{
            cardShow:true,
            pageShow:'',
            baseUrl:''
        }
    },
    componentWillMount(){
        switch (this.props.pageShow){
            case 'staff':
                this.setState({
                   baseUrl:serverBaseUrl+'/api/staff'
                });
                break;
            case 'vehicle':
                this.setState({
                   baseUrl:serverBaseUrl+'/api/vehicle'
                });
                break;
        }
    },
    componentWillReceiveProps(nextProps){
        switch (nextProps.pageShow){
            case 'staff':
                this.setState({
                    baseUrl:serverBaseUrl+'/api/staff'
                });
                break;
            case 'vehicle':
                this.setState({
                    baseUrl:serverBaseUrl+'/api/vehicle'
                });
                break;
        }
    },
    childListChange(showWay){
        if(showWay=='card'){
            this.setState({
                cardShow : true
            })
        }else{
            this.setState({
                cardShow : false
            })
        }
    },
    handleClick(){
        this.setState({
            cardShow : true
        });
        PubSub.publish('show-history','card');
    },
    render(){
        let pageShow = this.props.pageShow;
        var isCardShowContent = function(){
            if(this.state.cardShow){
                return(
                    <BatchOperation pageShow = {pageShow} collection={staffData} baseUrl = {this.state.baseUrl}/>
                )
            }else{
                switch (pageShow){
                    case 'staff':
                        return(
                            <ul className = 'list-inline' style={{display:'inline-block'}}>
                                <SendMessage showList={true} baseUrl = {this.state.baseUrl} />
                                <DeleteItem showList={true} baseUrl = {this.state.baseUrl} />
                                <PrintItem showList={true} baseUrl = {this.state.baseUrl} />
                            </ul>
                        );
                        break;
                    case 'vehicle':
                        return(
                            <ul className = 'list-inline' style={{display:'inline-block'}}>
                                <DeleteItem showList={true} baseUrl = {this.state.baseUrl} />
                                <PrintItem showList={true} baseUrl = {this.state.baseUrl} />
                            </ul>
                        );
                        break;
                }
            }
        }.bind(this);
        var isTaskShowContent = function(){
            if(this.state.cardShow){
                return(
                    <TaskListItem callbackParent={this.childListChange} pageShow={this.props.pageShow} collection={staffData}/>
                )
            }else{
                return(
                    <ul className = 'list-inline' style={{display:'inline-block'}}>
                        <PrintItem showList={true}/>
                        <DeleteItem showList={true}/>
                        <Button  bsStyle="link" className=""  onClick={this.handleClick}>
                            <ul className = "list-inline">
                                <li className = "return-item-icon operation-item-icon"></li>
                                <li>
                                    <h5>返回</h5>
                                </li>
                            </ul>
                        </Button>
                    </ul>
                )
            }
        }.bind(this);
        var operaShowWay = function(){
            switch(pageShow){
                case 'staff':
                    return(
                        <ul className="list-inline operation">
                            <li className = "left-item">
                                <ul className = "list-inline">
                                    <AddItem pageShow={this.props.pageShow} collection={staffData} baseUrl ={this.state.baseUrl} />
                                    <ListItem callbackParent={this.childListChange} pageShow={this.props.pageShow} baseUrl = {this.state.baseUrl} />
                                    {isCardShowContent()}
                                </ul>
                            </li>
                            <li className = "right-item">
                                <ul className = "list-inline">
                                    <CarType collection={staffData} pageShow ={this.props.pageShow} baseUrl = {this.state.baseUrl} />
                                    <Search baseUrl = {this.state.baseUrl} pageShow = {this.props.pageShow}/>
                                    <AdvancedSearchIcon pageShow = {this.props.pageShow} baseUrl = {this.state.baseUrl}  />
                                    <OutageRecord collection = {staffData} baseUrl = {this.state.baseUrl}  />
                                </ul>
                            </li>
                        </ul>
                    );
                    break;
                case 'vehicle':
                    return(
                        <ul className="list-inline operation">
                            <li className = "left-item">
                                <ul className = "list-inline">
                                    <AddItem pageShow={this.props.pageShow} collection={vehicleData} baseUrl = {this.state.baseUrl}  />
                                    <ListItem callbackParent={this.childListChange} pageShow={this.props.pageShow} baseUrl = {this.state.baseUrl}  />
                                    {isCardShowContent()}
                                </ul>
                            </li>
                            <li className = "right-item">
                                <ul className = "list-inline">
                                    <CarType collection={vehicleData} pageShow={this.props.pageShow} baseUrl = {this.state.baseUrl}  />
                                    <Search baseUrl = {this.state.baseUrl} pageShow = {this.props.pageShow} />
                                    <AdvancedSearchIcon pageShow = {this.props.pageShow} baseUrl = {this.state.baseUrl} />
                                    <OutageRecord collection = {vehicleData} baseUrl = {this.state.baseUrl}  />
                                </ul>
                            </li>
                        </ul>
                    );
                    break;
                case 'setting':
                    return(
                        <span></span>
                    );
                    break;
                case 'task':
                    return(
                        <ul className="list-inline operation">
                            <li className = "left-item">
                                {isTaskShowContent()}
                            </li>
                            <li className = "task-right-item">
                                <ul className = "list-inline">
                                    <Search />
                                    <AdvancedSearchIcon pageShow = {this.props.pageShow}/>
                                </ul>
                            </li>
                        </ul>
                    );
                    break;
            }
        }.bind(this);
        return(
            <div className = 'operation-content'>
                {operaShowWay()}
            </div>
        )
    }
});
export{OperationItem,Search}
