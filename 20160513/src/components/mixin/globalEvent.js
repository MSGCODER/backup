//管理所有注册全局事件
const contentEventMinx ={
      printShow(){
          let subscribe = function(){
              this.printShowToken = PubSub.subscribe('print-data',function(topic,print){
                  let printDataId = this.state.selectedRowKeys;
                  let printData =[];
                  if(printDataId.length > 0){
                      for(let i = 0; i < printDataId.length; i++){
                          this.state.collection.map(function(item,index){
                              if(item.id==printDataId[i]){
                                  printData.push(item)
                              }
                          })
                      }
                      PubSub.publish('print-show',{printData:printData,listHeader:this.state.listHeader});
                  }else{
                  }
              }.bind(this));
              return this.printShowToken
          };
          let publish = function(){
            PubSub.publish('print-data')
          };
          let unsubscribe = function(){
              PubSub.unsubscribe(this.printShowToken);
          };
      }
};
const navEventMinx ={

};
const operationEventMinx = {

};
