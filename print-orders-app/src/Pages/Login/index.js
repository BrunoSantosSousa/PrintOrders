import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import CardActions from '@material-ui/core/CardActions'

import CssBaseline from '@material-ui/core/CssBaseline'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Auth from '../../Auth'
import { AlertSnackBar, useAlert } from '../../Alert'

const useStyles = makeStyles({
    topBar: {
        backgroundColor: '#9b0000',
        height: '15em'
    },
    loginContainer: {
        marginTop: '-5em'
    },
    uidField: {
        width: '100%'
    },
    loginActions: {
        margin: '0 10px'
    }
})

function Login() {
    const history = useHistory()
    const classes = useStyles()
    
    const [open, message, variant, handleClose, msg] = useAlert()

    const [values, setValues] = useState({
        uid: '',
        showUid: false,
        remember: false
    })

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value })
        if(checkUIDLength(event.target.value)) doLogin(event.target.value)
    }

    const checkUIDLength = value => value.length === 6

    const doLogin = async (uid) => {
        let authorized = await Auth.authenticate(uid)
        if(!authorized) {
            msg('Falha ao logar no sistema', 'error')
            return
        }
        history.push('/dashboard')
        setTimeout(() => {
            const authenticatedUser = Auth.getAuthenticatedUser()
            msg(`Seja bem vindo(a) ${authenticatedUser.name}!`, 'success')
        }, 200)
    }

    const handleCheckboxChange = prop => event => {
        setValues({ ...values, [prop]: event.target.checked })
    }

    const handleClickShowUID = () => {
        setValues({ ...values, showUid: !values.showUid })
    }

    const handleMouseDownUID = event => {
        event.preventDefault()
    }

    return (
        <>
            <CssBaseline/>
            <div className={classes.topBar}></div>
            <Container maxWidth="sm" className={classes.loginContainer} >
                <Card>
                    <CardContent>
                        <TextField
                            id="uid"
                            className={classes.uidField}
                            variant="outlined"
                            type={values.showUid ? 'text' : 'password' }
                            label="UID"
                            value={values.uuid}
                            onChange={handleChange('uid')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            aria-label="Modificar visibilidade da senha"
                                            onClick={handleClickShowUID}
                                            onMouseDown={handleMouseDownUID}
                                        >
                                            {values.showUid ? <Visibility/> : <VisibilityOff/> }
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            />
                    </CardContent>
                    <CardActions className={classes.loginActions}>
                        <Grid container>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.remember}
                                            onChange={handleCheckboxChange('remember')}
                                            value="remember"
                                            color="primary"
                                        />
                                    }
                                    label="Manter-me conectado(a)"
                                />
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Container>
            <AlertSnackBar
                open={open}
                message={message}
                variant={variant}
                handleClose={handleClose}
            />
        </>
    )
}

export default Login
