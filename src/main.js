import React from 'react'
import ReactDOM from 'react-dom'
import { Style } from 'radium'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import store from './store'
import Cloudboard from './components/cloudboard'
import baseStyles from './styles/base'

const history = syncHistoryWithStore(browserHistory, store)
const rootEl = document.getElementById('root')

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Cloudboard}/>
      </Router>
    </Provider>
    <Style rules={baseStyles}/>
  </div>,
  rootEl
)
