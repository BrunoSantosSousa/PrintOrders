import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import Login from './Pages/Login'

function App() {
  return (
      <Router>
        <Route path="/" component={Login} />
      </Router>
  )
}

export default App
