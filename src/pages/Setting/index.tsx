import * as React from 'react';
import {Button} from 'antd'
import {connect} from 'react-redux'

function Setting (props:any) {
  return (
    <>
        <Button type='primary' onClick={()=>{props.changeTheme('light')}}>亮色</Button>
        <Button onClick={()=>{props.changeTheme('dark')}}>暗色</Button>
    </>
  );
}

const mapStateToProps = ({ThemeRender: {theme}}:any)=>{
  return {
    theme
  }
}
const mapDispatchToProps = {
  changeTheme(theme:string){
    return {
      type:"change_theme",
      theme:theme
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Setting)
