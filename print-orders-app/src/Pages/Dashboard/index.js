import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from 'react-router-dom'
import Nav from '../../Layout/Nav/'

import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

import Orders from '../Orders'
import Admin from '../Admin'

import { Permissions, CanSee } from '../../Auth/PermisionManager'

const useStyles = makeStyles({
    paper: {
        minHeight: "500px",
        padding: "5px 10px",
        margin: "10px"
    }
})


function Dashboard() {
    const { path } = useRouteMatch()
    const classes = useStyles()
    const [adminTab, setAdminTab] = useState(0)

    return (
        <>
            <CssBaseline/>
            <Nav/>
            <Container maxWidth="md">
                <Paper className={classes.paper}>
                    <Switch>
                        <Route exact path={path} component={ () => <Orders/> } ></Route>
                        <Route path={`${path}/orders`} component={ () => <Orders/> }></Route>
                        <Route path={`${path}/admin`} component={ () => <Admin/> }></Route>
                    </Switch>
                </Paper>
            </Container>

        </>
    )
}

export default Dashboard