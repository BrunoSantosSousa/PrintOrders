import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import Title from '../../Layout/Title/'
import makeConnection from '../../Connection'
import Config from '../../config'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import ClassIcon from '@material-ui/icons/Class'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import { makePagination } from '../../Layout/Stepper'
import StepperList from '../../Layout/StepperList'

function GradeItem(props) {
    const { record } = props
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <ClassIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={record.description} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="info">
                    <FindInPageIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

function GradeList(props) {
    const { records, pagination, fetchData } = props
    return (
        <>
            <StepperList pagination={pagination} fetchData={fetchData}>
                { records.map((record, index) => <GradeItem key={index} record={record} /> ) }
            </StepperList>
        </>
    )
}

const useLoadingStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2)
    }
}))

function Loading() {
    const classes = useLoadingStyles()
    return (
        <Box display="flex" justifyContent="center" className={classes.root}>
            <CircularProgress />
        </Box>
    )
}

export default function Grades(props) {
    const { msg } = props
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        steps: 1,
        activeStep: 0
    })

    const gradeConnection = makeConnection({
        fetch: fetch,
        api: Config.URL.API,
        endpoint: Config.URI.Grade
    })
    
    const fetchData = async (params = null) => {
        if(!loading) {
            setLoading(true)
        }
        const response = await gradeConnection.get(params)
        setPagination(makePagination(response))
        setRecords(response.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Title margin={true}>Séries</Title>

            <Fab 
                size="small"
                color="primary"
                variant="extended"
                aria-label="add"
            >
                <AddIcon /> Nova Série
            </Fab>

            { 
                loading ? 
                    <Loading /> : 
                    <GradeList 
                        records={records} 
                        pagination={pagination}
                        fetchData={fetchData}
                    /> 
            }
        </>
    )
}