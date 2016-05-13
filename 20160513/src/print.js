import React from 'react';
import {render} from 'react-dom';
import _ from 'underscore'
import ReactDOM from 'react-dom';
import  'antd/lib/index.css';
import {Icon,Row,Col} from 'antd';
//import {columns ,data} from './data/printData';
import FixedDataTable from 'fixed-data-table';
const {Table, Column, Cell} = FixedDataTable;
const PrintPage = React.createClass({
    getInitialState(){
        return{
            isShow:false,
            tableWidth:1024,
            tableHeight:500,
            listHeader:[],
            printData:[]
        }
    },
    componentWillMount(){
        var height = $(window).height();
        var width = $(window).width();
        this.setState({
            tableWidth:width,
            tableHeight:height*0.90
        })
    },
    componentDidMount(){
      this.printShowToken =PubSub.subscribe('print-show',function(topic,data){
        this.setState({
            isShow:true,
            printData:data.printData,
            listHeader:data.listHeader
        })
      }.bind(this))
    },
    handlePrintHideClick(){
        PubSub.publish('print-hide');
        this.setState({
            isShow:false
        })
    },
    render(){
        const TextCell = ({rowIndex,data,col,...props})=>(
            <Cell {...props}>
                {data[rowIndex][col]}
            </Cell>
        );
        let listTable = this.state.listHeader.map(function(list,index){
            if(list.aliasName){
                return(
                    <Column key={index}
                            header={<Cell className = "table-header">{list.aliasName}</Cell>}
                            cell={<TextCell data={this.state.printData} col={list.key} />}
                            isResizable={true}
                            flexGrow={1}
                            width={100}
                            className = ''
                            columnKey={index}
                        />
                )
            }
        }.bind(this));
        listTable = _.filter(listTable, function(item){ return typeof item !=='undefined'; });
        var isShowPrint = function(){
            if(this.state.isShow){
                return(
                    <div>
                        <Row type = "flex" className = "print-header">
                            <Col span = "12" className = "print-header-left">
                                <img src="/img/icon_print_pressed.png" className = "print-icon" />
                                <div className = "print-btn">打印</div>
                            </Col>
                            <Col span = "12" className = "print-header-right">
                                <div className = "print-out" onClick={this.handlePrintHideClick}>退出</div>
                            </Col>
                        </Row>
                        {/*<Table columns={columns} dataSource={data} pagination={false} bordered  />*/}
                        <Table
                            rowHeight={40}
                            rowsCount={this.state.printData.length}
                            width={this.state.tableWidth}
                            height={this.state.tableHeight}
                            headerHeight={50}
                            >
                            {listTable}
                        </Table>
                    </div>
                    )
            }else{
                return(
                    <div></div>
                )
            }

        }.bind(this);
        return(
            <div>
                {isShowPrint()}
            </div>

        )
    }
});
ReactDOM.render(
  <PrintPage />,
  document.getElementById('print-content')
);