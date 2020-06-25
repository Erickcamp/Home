import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Chat from './components/Chat/Chat'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import Post from './components/Post/Post'
import Register from './components/Register/Register'
import View from './components/View/View'

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/chat' component={Chat} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/post' component={Post} />
        <Route path='/register' component={Register} />
        <Route path='/posts/:id' component={View} />
    </Switch>
)