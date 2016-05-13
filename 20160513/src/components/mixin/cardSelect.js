const cardSelectMinx ={
  selectAble(){
      console.log('text');
      if(this.state.selectId.length == this.state.collection.length){
          this.setState({
              isSelectAll:false,
              selectId:[]
          });
          PubSub.publish('select-all-back',false);

      }else {
          this.setState({
              selectId:[],
              isSelectAll:true
          });
          this.state.collection.map(function(item,index){
              this.state.selectId.push(item.id)
          }.bind(this));
          PubSub.publish('select-all-back',true);
      }
  }
};
export {cardSelectMinx}
