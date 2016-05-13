import React from 'react';
import {render} from 'react-dom';
import { Input, Select, Button, Icon } from 'antd';
import jsonp from 'jsonp';
import querystring from 'querystring';
import classNames from 'classnames';
const Option = Select.Option;
let timeout;
let currentValue;
function fetch(value,props,callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;
    let {pageShow,baseUrl,showWay} = props;
    function fake() {
        const str = querystring.encode({
            code: 'utf-8',
            searchText: value
        });
        this.vehicleDate = $.get({
            url:baseUrl+`/search?view=${showWay}&${str}`,
            success:function(result){
                if(result.status.code == 200){
                    PubSub.publish('search-'+pageShow,result.data);
                }
            }.bind(this),
            error:function(){

            }
        });
    }

    timeout = setTimeout(fake, 300);
}

const SearchInput = React.createClass({
    getInitialState() {
        return {
            data: [],
            value: '',
            focus: false
        };
    },
    handleChange(value) {
        this.setState({ value });
        //this.props.callbackParent(value);
        fetch(value,this.props,(data) => this.setState({ data }));
        //console.log(value.length);
        if(value.length!=0){
            $(".search-btn").hide();
        }
        else{
            $(".search-btn").show();
        }
    },
    handleSubmit() {
        //console.log('输入框内容是: ', this.state.value);
    },
    handleFocusBlur(e) {
        //this.props.callbackParent(value);
        this.setState({
            focus: e.target === document.activeElement
        });
    },
    render() {
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim()
        });
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus
        });
        return (
            <Input.Group className={searchCls} style={this.props.style}>
                <Select
                    combobox
                    value={this.state.value}
                    searchPlaceholder={this.props.placeholder}
                    notFoundContent=""
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onChange={this.handleChange}
                    onFocus={this.handleFocusBlur}
                    onBlur={this.handleFocusBlur}>
                    {this.state.data.map(d => <Option key={d.value}>{d.text}</Option>)}
                </Select>
                <div className="ant-input-group-wrap">
                    <Button className={btnCls+' search-btn'} onClick={this.handleSubmit}>
                        <Icon type="search" />
                    </Button>
                </div>
            </Input.Group>
        );
    }
});
export{SearchInput}
