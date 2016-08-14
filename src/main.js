import React from 'react'
import ReactDOM from 'react-dom'
import { Style } from 'radium'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'

import store from './store'
import Cloudboard from './components/cloudboard'
import Board from './components/board'
import BoardPicker from './components/board-picker'
import baseStyles from './styles/base'

const history = syncHistoryWithStore(hashHistory, store)
const rootEl = document.getElementById('root')

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Cloudboard}>
          <IndexRoute component={BoardPicker}/>
          <Route path=":board" component={Board}/>
        </Route>
      </Router>
    </Provider>
    <Style rules={baseStyles}/>
  </div>,
  rootEl
)
