import React from 'react'
import { Router, Route } from 'react-router'
import { createHashHistory } from 'history'
import Home from 'js/containers/Home'
import Playlist from 'js/containers/Playlist'

export const history = createHashHistory()

export default () =>
  <Router history={history}>
    <Route path='/' component={Home} />
    <Route path='/playlist' component={Playlist} />
  </Router>
