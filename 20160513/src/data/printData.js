let columns=[
    {
        title:"编码",
        dataIndex:'printCode',
        key:'printCode'
    },
    {
        title:'姓名',
        dataIndex:'printName',
        key:'printName'
    },
    {
       title:'所在部门',
       dataIndex:'printState',
       key:'printState'
    }
];
let data=[];
for(let i = 0; i < 46 ; i++){
    data.push({
        key:i,
        printCode:i,
        printName:`王宇亭${i}`,
        printState:`内蒙古${i}`
    })
}
export{columns,data}