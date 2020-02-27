import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import Reports from './Reports'
import Users from './Users'
import Grades from './Grades'

import { AlertSnackBar, useAlert } from '../../Alert'

const useStylePanel = makeStyles(theme => ({
    root: {
        flex: 1
    }
}))

function TabPanel(props) {
    const classes = useStylePanel()
    const { children, value, index, ...other} = props

    return (
        <Typography
            component="div"
            className={classes.root}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls" : `vertical-tabpanel-${index}`
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: "inline",
        height: 22
    },
    tabs: {
        borderBottom: `1px solid ${theme.palette.divider}`
    }
}))

export default function Admin() {
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => setValue(newValue)
    const [open, message, variant, handleClose, msg] = useAlert()
    
    return (
        <>
            <div className={classes.root}>
                <Tabs
                    orientation="horizontal"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs"
                    className={classes.tabs}
                >
                    <Tab label="Relatórios" {...a11yProps(0)}/>
                    <Tab label="Usuários" {...a11yProps(1)}/>
                    <Tab label="Séries" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Reports />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Users msg={msg} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Grades msg={msg} />
                </TabPanel>
            </div>
            <AlertSnackBar 
                open={open}
                message={message}
                variant={variant}
                handleClose={handleClose}
            />
        </>
    )
}