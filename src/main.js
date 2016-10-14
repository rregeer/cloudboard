import './modernizr'

import React from 'react'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import createStore from './store'
import Cloudboard from './components/cloudboard'
import Board from './components/board'
import BoardPicker from './components/board-picker'

import './styles/base.scss'
import './styles/loader.scss'

createStore(store => {
  const history = syncHistoryWithStore(browserHistory, store)
  const rootEl = document.getElementById('root')

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Cloudboard}>
          <IndexRoute component={BoardPicker}/>
          <Route path=":board" component={Board}/>
        </Route>
      </Router>
    </Provider>,
    rootEl
  )
})
