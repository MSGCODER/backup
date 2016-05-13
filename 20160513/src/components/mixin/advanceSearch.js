import React from 'react';
import {Icon,DatePicker,TimePicker} from 'antd';
const advanceSearchMixin ={
  advanceSearch(){
      return(
          <div>
              <div className = 'table-title'>
                  <span>所有车辆<Icon type="right" />共999个车辆</span>
              </div>
              <table className = "advanced-table">
                  <tbody>
                  <tr className = "car-type-up">
                      <td rowSpan="2">车辆类型：</td>
                      <td onClick={this.clickSearchTab}>1-15座客车</td>
                      <td onClick={this.clickSearchTab}>1-15座客车</td>
                      <td onClick={this.clickSearchTab}>1-15座客车</td>
                      <td onClick={this.clickSearchTab}>1-15座客车</td>
                      <td onClick={this.clickSearchTab}>1-15座客车</td>
                  </tr>
                  <tr className = "car-type-down">
                      <td onClick={this.clickSearchTab}>10-30吨客车</td>
                      <td onClick={this.clickSearchTab}>货车（冷藏）</td>
                      <td onClick={this.clickSearchTab}>货车（危险品）</td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>
                      <td onClick={this.clickSearchTab}>任务类型：</td>
                      <td onClick={this.clickSearchTab}>周期任务</td>
                      <td onClick={this.clickSearchTab}>普通任务</td>
                      <td onClick={this.clickSearchTab}>多车任务</td>
                      <td onClick={this.clickSearchTab}>单车任务</td>
                      <td></td>
                  </tr>
                  <tr>
                      <td>出车时间：</td>
                      <td className="vehicle-out-start">
                          <DatePicker className="car-out-start" disabledDate={this.disableStartDate}
                                      value={this.state.startValue}
                                      placeholder="开始日期"
                                      onChange={this.onChange.bind(this, 'startValue')} />
                      </td>
                      <td>至</td>
                      <td className="vehicle-out-start">
                          <DatePicker  className="car-out-start" disabledDate={this.disableEndDate}
                                       value={this.state.endValue}
                                       placeholder="结束日期"
                                       onChange={this.onChange.bind(this, 'endValue')} />
                      </td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>
                      <td>回车时间：</td>
                      <td><TimePicker onChange={this.timeOnChange} /></td>
                      <td>至</td>
                      <td><TimePicker onChange={this.timeOnChange} /></td>
                      <td></td>
                      <td></td>
                  </tr>
                  </tbody>
              </table>
          </div>
      )
  }
};
export{advanceSearchMixin}
