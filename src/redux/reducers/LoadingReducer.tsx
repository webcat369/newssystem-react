// 定义一个状态
let initialState = {
  isLoading:false
};

export const LoadingReducer = (prevState = initialState, action:any)=>{
  // console.log(action)
  let {type,payload} = action

  switch(type){
    case "change_loading":
        let newstate = {...prevState}
        newstate.isLoading = payload
        return newstate
    default:
        return prevState
  }
}