import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import Login from 'pages/Login/index'
import NewsSandBox from 'pages/NewsSandBox/index'
import News from 'pages/News'
import Detail from 'pages/Detail'

export default function BaseRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/news" component={News}/>
        <Route path="/detail/:id" component={Detail}/>
        {/* {localStorage.getItem("token") ? <Route path="/home" component={NewsSandBox} exact /> : <Redirect from="/" to="/login" exact/>} */}
        {localStorage.getItem("token")?<Route path="/*" component={NewsSandBox} />:<Redirect to="/login" />}
      </Switch>
    </Router>
  )
}
