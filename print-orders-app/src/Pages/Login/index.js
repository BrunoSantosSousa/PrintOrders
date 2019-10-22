import React from 'react'
import {    TopBar,
            UUIDField,
            LoginCardActions as CardActions,
            LoginContainer as Container } from './styles'
import CssBaseline from '@material-ui/core/CssBaseline';

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function Login() {
    const [values, setValues] = React.useState({
        uuid: '',
        showUuid: false,
        remember: false
    })

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleCheckboxChange = prop => event => {
        setValues({ ...values, [prop]: event.target.checked })
    }

    const handleClickShowUUID = () => {
        setValues({ ...values, showUuid: !values.showUuid })
    }

    const handleMouseDownUUID = event => {
        event.preventDefault()
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <TopBar/>
            <Container maxWidth="sm">
                <Card>
                    <CardContent>
                        <UUIDField
                            id="uuid"
                            variant="outlined"
                            type={values.showUuid ? 'text' : 'password' }
                            label="UUID"
                            value={values.uuid}
                            onChange={handleChange('uuid')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            aria-label="Modificar visibilidade da senha"
                                            onClick={handleClickShowUUID}
                                            onMouseDown={handleMouseDownUUID}
                                        >
                                            {values.showUuid ? <VisibilityOff/> : <Visibility/> }
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            />
                    </CardContent>
                    <CardActions>
                        <Grid container justify="space-between">
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
                            <Grid item>
                                <Button variant="contained" color="primary">Conectar-se</Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Container>
        </React.Fragment>
    )
}

export default Login
