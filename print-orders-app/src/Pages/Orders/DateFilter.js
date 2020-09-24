import ptBRLocale from 'date-fns/locale/pt-BR';
import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';


import DateField from '../../Layout/DateField'

function DialogDateFilter(props) {
    const {state, setState} = props

    const handleChange = prop => date => {
        setState({...state, [prop]:date})
    }

    const handleSubmit = () => {
        props.handleSubmit({
            start_date: state.start_date.toISOString().split('T')[0],
            end_date: state.end_date.toISOString().split('T')[0]
        })
    }

    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="date-filter-dialog-title"
        >
            <DialogTitle id="date-filter-dialog-title" >
                Filtrar pedidos por data
            </DialogTitle>
            <DialogContent>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <KeyboardDatePicker
                                name="start_date"
                                margin="normal"
                                id="start_date"
                                label="Data Inicial"
                                format="dd/MM/yyyy"
                                fullWidth
                                value={state.start_date}
                                onChange={handleChange('start_date')}
                                invalidDateMessage="Data inválida!"
                                maxDateMessage="Limite de data excedido!"
                                minDateMessage="Data mínima requerida!"
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <KeyboardDatePicker
                                name="end_date"
                                margin="normal"
                                id="end_date"
                                label="Data Final"
                                format="dd/MM/yyyy"
                                fullWidth
                                value={state.end_date}
                                onChange={handleChange('end_date')}
                                invalidDateMessage="Data inválida!"
                                maxDateMessage="Limite de data excedido!"
                                minDateMessage="Data mínima requerida!"
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary" >Cancelar</Button>
                <Button onClick={handleSubmit} color="primary" >Filtrar</Button>
            </DialogActions>
        </Dialog>
    )
}

function DateFilter(props) {

    return (
        <>
            {
                props.open &&
                <DialogDateFilter
                    open={props.open}
                    state={props.state}
                    setState={props.setState}
                    handleClose={props.handleClose}
                    handleSubmit={props.handleSubmit}    
                />
            }
        </>
    )
}

export default DateFilter