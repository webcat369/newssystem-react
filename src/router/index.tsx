import React from 'react'
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Login from 'pages/Login/index'
import NewsSandBox from 'pages/NewsSandBox/index'
import News from 'pages/News'
import Detail from 'pages/Detail'

export default function BaseRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/news" element={<News/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path='/*' element={localStorage.getItem("token") ? <NewsSandBox/> : <Navigate to="/login" />}/>
        {/* {localStorage.getItem("token") ? <Route path="/home" component={NewsSandBox} exact /> : <Redirect from="/" to="/login" exact/>} */}
        {/* {localStorage.getItem("token")?<Route path="/*" component={NewsSandBox} />:<Redirect to="/login" />} */}
      </Routes>
    </Router>
  )
}
