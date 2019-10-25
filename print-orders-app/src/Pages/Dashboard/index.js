import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from 'react-router-dom'
import Nav from '../../Layout/Nav/'
import {
    PagePaper as Paper
} from './styles'
import Orders from '../Orders'
import Admin from '../Admin'

function Dashboard() {
    const { path } = useRouteMatch()

    return (
        <>
            <CssBaseline/>
            <Nav/>
            <Paper square="true" elevation="2" >
                <Switch>
                    <Route exact path={path} component={Orders}></Route>
                    <Route path={`${path}/orders`} component={Orders}></Route>
                    <Route path={`${path}/admin`} component={Admin}></Route>
                </Switch>
            </Paper>

        </>
    )
}

export default Dashboard