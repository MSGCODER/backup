const utilMixin = {
    //将原对象中的value值赋值给新的对象
    addValueOfItem(objective, origin){
        for (let i = 0; i < objective.length; i++) {
            objective[i].value = origin[objective[i].name]
        }
    },
    //用于格式化提交到后台的日期型
    formatDate(model, array){
        for (let i = 0; i < array.length; i++) {
            if(model[array[i]]){
                model[array[i]] = model[array[i]].getFullYear() + '-' + ((model[array[i]].getMonth() + 1) < 10 ? ("0" + (model[array[i]].getMonth() + 1)) : (model[array[i]].getMonth() + 1)) + '-' +
                    (model[array[i]].getDate() < 10 ? "0" + model[array[i]].getDate() : model[array[i]].getDate())
            }
        }
        return model
    }
};
export{utilMixin}
