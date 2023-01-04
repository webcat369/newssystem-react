import React from 'react'
import './App.css'
import BaseRouter from './router/index'
import { Provider } from "react-redux";
import {store} from "./redux/store"

const App = () => {
  return (
    <Provider store={store}>
      <BaseRouter></BaseRouter>
    </Provider> 
  )
}

export default App
