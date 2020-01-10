import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyle = makeStyles(theme => ({
    root: {
        padding: '0px 5px 10px',
        width: '100%',
        marginBottom: '10px',
        borderBottom: `1px solid ${theme.palette.divider}`
    }
}))

export default function Title(props) {
    const { children } = props
    const classes = useStyle()

    return (
        <Typography variant="h5" className={classes.root}>
            {children}
        </Typography>
    )
}