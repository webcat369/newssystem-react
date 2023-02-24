// 定义一个状态
let initialState = {
  theme:'light'
};

export const ThemeRender = (prevState = initialState, action:any) => {
  let {type,theme} = action
  console.log(prevState,type,theme);
  
  switch (type) {
    case 'change_theme':
      return {...prevState,theme:theme}
    default:
      return prevState
  }
}