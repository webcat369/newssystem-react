import React from 'react'
import './index.css';
import './api/request'
// 方式一
// import ReactDOM from 'react-dom/client'
// import BaseRouter from './router'
// ReactDOM.createRoot(document.getElementById('root')!).render(<BaseRouter/>)

// 方式二
// import ReactDOM from 'react-dom'
// import App from './App'
// 出现警告：错误说明ReactDOM.render()方法在react18中已经不支持了，但仍然可以运行
// ReactDOM.render(<App/>, document.getElementById('root'))


// 方式三
import { createRoot } from 'react-dom/client'
import App from './App'
const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(<App />);


