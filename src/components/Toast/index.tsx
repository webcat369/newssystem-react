import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

let timer:any = null
let _scrollTop:any = 0
export default class Toast extends React.Component {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor (props:any) {
    super(props)
  }

  static show (mes:string, duration:number = 2500) {
    init()
    setTimer(duration)
    ReactDOM.render(
      <Fragment>
        <div className='toast'>
          <div className='toast-box'>
            <span>{mes}</span>
          </div>
        </div>
      </Fragment>,
      document.getElementById('toast'),
    )
  }

  static loading (status:string, mes:string) {
    init()
    setLoading(status)
    ReactDOM.render(
      <Fragment>
        <div className='toast'>
          <div className='toast-box'>
            <img className='toast-icon' src={require('../../images/loading.gif')} alt=''/>
            <span>{mes}</span>
          </div>
        </div>
      </Fragment>,
      document.getElementById('toast'),
    )
  }
}

// 当组件触发时，对body添加类名同时保存滚动高度，防止页面滚动
function popupOpen () {
  _scrollTop = document.scrollingElement?.scrollTop
  document.body.classList.add('body-popup')
  document.body.style.top = - _scrollTop + 'px'
}

// 弹层隐藏时恢复滚动
function popupClose () {
  // document.scrollingElement.scrollTop = _scrollTop
  window.scrollTo(0, _scrollTop)
  document.body.classList.remove('body-popup')
}

// 初始化toast
function init () {
  clearTimeout(timer)
  let toast = document.getElementById('toast')
  if (toast) {
    toast.style.display = 'block'
  } else {
    let div = document.createElement('div')
    div.setAttribute('id', 'toast')
    document.body.appendChild(div)
  }
  popupOpen()
}

// 设置loading
function setLoading (status:string) {
  let toast:any = document.getElementById('toast')
  if (status) {
    toast.style.display = 'block'
    popupOpen()
  } else {
    toast.style.display = 'none'
    popupClose()
  }
}

// 设置定时器
function setTimer (duration:number) {
  timer = setTimeout(() => {
    let toast = document.getElementById('toast')
    if (toast) {
      toast.style.display = 'none'
      popupClose()
    }
  }, duration)
}
