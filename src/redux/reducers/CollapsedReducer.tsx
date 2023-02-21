// 定义一个状态
let initialState = {
  isCollapsed:false
};


export const CollapsedReducer = (prevState = initialState ,action:any)=>{
  let {type} =action

  switch(type){
      case "change_collapsed":
          let newstate = {...prevState}
          newstate.isCollapsed = !newstate.isCollapsed
          return newstate
      default:
          return prevState
  }
}