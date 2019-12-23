import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@material-ui/icons/Warning'
import IconButton from '@material-ui/core/IconButton'
import { amber, green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
}

const useStyle = makeStyles(theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.main
    },
    warnin: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    }

}))

function AlertSnackBarWrapper(props) {
    const classes = useStyle()
    const { className, message, onClose, variant, ...other } = props
    const Icon = variantIcon[variant]

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)}/>
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon}/>
                </IconButton>
            ]}
            {...other}
        />
    )
}

AlertSnackBarWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired
}

export function useAlert() {
    const [open, setOpen] = useState(false)
    const [variant, setVariant] = useState("success")
    const [message, setMessage] = useState("")

    const handleClose = (event, reason) => {
        if(reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    const msg = (message, variant) => {
        setMessage(message)
        setVariant(variant)
        setOpen(true)
    }
    
    return [open, message, variant, handleClose, msg]
}

export const AlertSnackBar = (props) => {
    const {open, message, variant, handleClose, ...other} = props

    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <AlertSnackBarWrapper
                    onClose={handleClose}
                    variant={variant}
                    message={message}
                />
            </Snackbar>
        </>
    )
}

AlertSnackBar.propTypes = {
    open: PropTypes.bool,
    message: PropTypes.string,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    handleClose: PropTypes.func
}

