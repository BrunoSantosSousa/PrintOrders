import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'

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

export default Loading
