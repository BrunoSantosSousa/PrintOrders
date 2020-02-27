import 'date-fns';
import React, { useState, useEffect } from 'react'
import { AlertSnackBar, useAlert } from '../../Alert'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Title from '../../Layout/Title/'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Select from '@material-ui/core/Select'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import Fade from '@material-ui/core/Fade'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import makeConnection from '../../Connection';

import Config from '../../config'


const useOrderHeaderStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#f5f5f5'
    },
    formControl: {
        width: '100%'
    },
    btnNewOrder: {
        margin: '10px',
        width: '100%'
    },
    iconBtn: {
        margin: '3px'
    }
}))

function OrderHeader(props) {
    const { handleNewOrderClick } = props
    const classes = useOrderHeaderStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const menuOpen = Boolean(anchorEl)

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleGradeSelected = event => {
        handleClose()
        handleNewOrderClick()
    }

    return (
        <Grid container className={classes.root} spacing={1}>
            <Grid item md={3} sm={12}>
                <Fab
                    className={classes.btnNewOrder}
                    size="small"
                    color="primary"
                    variant="extended"
                    aria-label="add"
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <AddIcon /> Novo Pedido
                </Fab>
                <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={menuOpen}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleGradeSelected}>Maternal e Jardim I</MenuItem>
                    <MenuItem onClick={handleGradeSelected}>1º Ano</MenuItem>

                </Menu>
            </Grid>
            <Grid item md={4} xs={10}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status-input"
                    >
                        <MenuItem value="''">
                            <em>Nenhum</em>
                        </MenuItem>
                        <MenuItem value='pending'>Pendente</MenuItem>
                        <MenuItem value='awaiting'>Aguardando</MenuItem>
                        <MenuItem value='done'>Pronto</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={1} xs={2}>
                <IconButton className={classes.iconBtn} aria-label="delete">
                    <HelpOutlineIcon />
                </IconButton>
            </Grid>
            <Grid item md={3} xs={10}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="checked-label">Checado</InputLabel>
                    <Select
                        labelId="checked-label"
                        id="status-input"
                    >
                        <MenuItem value="''">
                            <em>Nenhum</em>
                        </MenuItem>
                        <MenuItem value={1}>Sim</MenuItem>
                        <MenuItem value={0}>Não</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={1} xs={2}>
                <IconButton className={classes.iconBtn} aria-label="delete">
                    <HelpOutlineIcon />
                </IconButton>
            </Grid>
        </Grid>
    )
}

const useOrderDialogStyles = makeStyles(theme => ({
    formControl: {
        width: '100%',
        marginTop: '16px'
    }
}))

function NewOrderDialog(props) {
    const classes = useOrderDialogStyles()
    const {open, setOpen, handleRegister, gradeId} = props

    const [state, setState] = useState({
        type: 'book',
        grade_id: gradeId,
        delivery_date: new Date(),
        description: '',
        book_name: '',
        pages: '',
        comments: ''
    })

    const handleDateChange = date => setState({...state, delivery_date: date})
    const handleChange = prop => event => setState({...state, [prop]: event.target.value})
    const handleClose = () => setOpen(false)

    const formatBaseState = () => {
        return {
            type: state.type,
            grade_id: state.grade_id,
            delivery_date: state.delivery_date,
            description: state.description,
            comments: state.comments
        }
    }

    const formatBookState = () => {
        return {
            type: state.type,
            grade_id: state.grade_id,
            delivery_date: state.delivery_date,
            book_name: state.book_name,
            pages: state.pages,
            comments: state.comments
        }
    }

    const formatState = () => state.type === 'book' ? formatBookState() : formatBaseState()
    
    return (
        <>
            <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} aria-labelledby="order-dialog-title">
                <DialogTitle id="order-dialog-title">Novo Pedido</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="type-label">Tipo de Pedido</InputLabel>
                                <Select
                                    labelId="type-label"
                                    id="type-input"
                                    value={state.type}
                                    onChange={handleChange('type')}
                                    fullWidth
                                >
                                    <MenuItem value="book">Livro</MenuItem>
                                    <MenuItem value="xerox">Xerox</MenuItem>
                                    <MenuItem value="test">Avaliação</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Data de entrega"
                                    format="dd/MM/yyyy"
                                    fullWidth
                                    value={state.delivery_date}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        {
                            state.type !== 'book' ?
                                <>
                                    <Grid item xs={12}>
                                        <TextField 
                                            id="description-input" 
                                            label="Descrição" 
                                            fullWidth
                                            onChange={handleChange('description')}
                                        />
                                    </Grid>
                                </> :
                                <>
                                    <Grid item xs={12}>
                                        <TextField 
                                            id="book-name-input" 
                                            label="Nome do Livro" 
                                            fullWidth
                                            onChange={handleChange('book_name')}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            id="pages-input" 
                                            label="Páginas" 
                                            fullWidth
                                            onChange={handleChange('pages')}
                                        />
                                    </Grid>
                                </>
                        }
                        
                        <Grid item xs={12}>
                            <TextField id="observation-input" label="Observações" fullWidth/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancelar</Button>
                        <Button onClick={handleRegister(formatState())} color="primary">Registrar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default function Orders() {
    const [open, message, variant, handleClose, msg] = useAlert()

    const [newOrderDialogOpen, setNewOrderDialogOpen] = useState(false)

    const handleNewOrderClick = () => setNewOrderDialogOpen(true)

    const makeOrderConnection = (type) => {
        const configTypes = {
            book: Config.URI.BookOrder,
            xerox: Config.URI.XeroxOrder,
            test: Config.URI.TestOrder
        }
        return makeConnection({
            fetch: fetch,
            api: Config.URL.API,
            endpoint: configTypes[type]
        })
    }

    const handlePostRegister = () => {
        msg("Novo pedido registrado!", 'success')
        // FETCHDATA
    }
    
    const handlePostFailure = () => msg('Falha ao registrar pedido!', 'error')

    const handleRegister = data => async () => {
        setNewOrderDialogOpen(false)
        const orderConnection = makeOrderConnection(data.type)
        const response = await orderConnection.post(data)
        if(response.message && response.message === 'CREATED') {
            handlePostRegister()
        } else {
            handlePostFailure()
        }
    }

    return (
        <>
            <Title>Pedidos</Title>

            <OrderHeader handleNewOrderClick={handleNewOrderClick}/>
            
            <NewOrderDialog 
                open={newOrderDialogOpen}
                setOpen={setNewOrderDialogOpen}
                handleRegister={handleRegister}
            />

            <AlertSnackBar 
                open={open}
                message={message}
                variant={variant}
                handleClose={handleClose}
            />
        </>
    )
}