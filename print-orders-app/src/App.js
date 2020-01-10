import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import { AlertSnackBar, useAlert } from './Alert'

function App() {
    const [open, message, variant, handleClose, msg] = useAlert()

    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" exact component={() => <Login/> } />
                    <Route path="/dashboard" component={() => <Dashboard/> } />
                </Switch>
            </Router>

            <AlertSnackBar 
                open={open}
                message={message}
                variant={variant}
                handleClose={handleClose}
            />
        </>
    )
}

export default App
