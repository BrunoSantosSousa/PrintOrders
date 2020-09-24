import React, { useState, useEffect } from 'react'
import { format, addDays } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'

import makeConnection from '../../Connection'
import Config from '../../config'
import Loading from '../../Layout/Loading'
import makeTheme from './Theme'

const getButtonTheme = type => {
    const buttonTypes = {
        approval: {
            bgColor: '#ffca28'
        },
        finish: {
            bgColor: '#2e7d32'
        }
    }
    return buttonTypes[type]
}

const makeButtonStyles = theme => makeStyles({
    buttonBase: {
        width: '100%',
        paddingTop: '10px',
        paddingBottom: '10px',
        backgroundColor: theme.bgColor
    },
    box: {
        fontWeight: 'bold',
        fontSize: '16px'
    }
})

function ApprovalButton(props) {
    const useStyles = makeButtonStyles(getButtonTheme('approval'))
    const classes = useStyles()

    return (
        <ButtonBase className={classes.buttonBase} onClick={props.handleClick}>
            <Box className={classes.box}><span>Aprovar Pedido</span></Box>
        </ButtonBase>
    )
}

function FinishButton(props) {
    const useStyles = makeButtonStyles(getButtonTheme('finish'))
    const classes = useStyles()

    return (
        <ButtonBase className={classes.buttonBase} onClick={props.handleClick}>
            <Box className={classes.box}><span>Finalizar Pedido</span></Box>
        </ButtonBase>
    )
}

function OrderForm(props) {
    const { state, setState } = props
    const handleChange = prop => event => setState({...state, [prop]: event.target.value})

    return (
        <>
            <form autocomplete="off">
                <Grid container spacing={1} >
                    {
                        state.type !== 'book' ?
                        <> 
                            <Grid item xs={12}>
                                <TextField 
                                    name="description"
                                    label="Descrição"
                                    fullWidth
                                    value={state.description}
                                    disabled={state.status !== 'pending'}
                                    onChange={handleChange('description')}
                                />
                            </Grid>
                        </> :
                        <>
                            <Grid item xs={12}>
                                <TextField 
                                    name="book_name"
                                    label="Nome do Livro"
                                    fullWidth
                                    value={state.book_name}
                                    disabled={state.status !== 'pending'}
                                    onChange={handleChange('book_name')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    name="pages"
                                    label="Páginas"
                                    fullWidth
                                    value={state.pages}
                                    disabled={state.status !== 'pending'}
                                    onChange={handleChange('pages')}
                                />
                            </Grid>
                        </>
                    }
                    <Grid item xs={12}>
                        <TextField 
                            name="comments"
                            label="Observações"
                            fullWidth
                            value={state.comments}
                            onChange={handleChange('comments')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            name="drive_path"
                            label="Caminho do GoogleDrive"
                            fullWidth
                            value={state.drive_path}
                            onChange={handleChange('drive_path')}
                        />
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

function makeOrderConnection(type) {
    const uriTypes = {
        xerox: Config.URI.XeroxOrder,
        book: Config.URI.BookOrder,
        test: Config.URI.TestOrder
    }

    return makeConnection({
        fetch: fetch,
        api: Config.URL.API,
        endpoint: uriTypes[type]
    })
}

const useOrderEditMenuStyles = theme => makeStyles({
    root: {
        backgroundColor: theme.bgColor,
        minHeight: '70px'
    },
    btnGrid: {
        marginTop: '20px'
    }
})

function OrderEditMenuDialog(props) {
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({})
    const theme = makeTheme(props.record.status)
    const useStyles = useOrderEditMenuStyles(theme)
    const classes = useStyles()
    const connection = makeOrderConnection(props.record.type)

    const fetchData = async () => {
        const response = await connection.getById(props.record.id)
        setState(response)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const prettyTypes = {
        xerox: 'Xerox',
        book: 'Livro',
        test: 'Avaliação'
    }

    const formatDate = date => format(addDays(new Date(date), 1), 'dd/MM/yyyy')

    const getId = () => {
        switch(state.type) {
            case 'xerox':
                return state.xerox_id
            case 'book':
                return state.book_id
            case 'test':
                return state.test_id
            default:
                break
        }
    }

    const getNumber = () => {
        switch(state.type) {
            case 'xerox':
                return `Nº X${state.xerox_id}`
            case 'book':
                return `Nº B${state.book_id}`
            case 'test':
                return `Nº T${state.test_id}`
            default:
                break
        }
    }

    const handleApproval = () => {
        props.handleUpdate(async () => {
            const response = await connection.update(getId(), {
                status: 'awaiting',
                checked: 1
            })
            if(response.message === 'UPDATED') {
                return ['Pedido aprovado com sucesso!', 'success']
            } else {
                return ['Falha ao aprovar pedido!', 'error']
            }
        })
    }

    const handleFinish = () => {
        props.handleUpdate(async () => {
            const response = await connection.update(getId(), {
                status: 'done',
                checked: 1
            })
            if(response.message === 'UPDATED') {
                return ['Pedido finalizado com sucesso!', 'success']
            } else {
                return ['Falha ao finalizar pedido!', 'error']
            }
        })
    }

    const handleUpdate = () => {
        props.handleUpdate(async () => {
            const response = await connection.update(getId(), state)
            if(response.message === 'UPDATED') {
                return ['Pedido atualizado!', 'success']
            } else {
                return ['Falha ao atualizar pedido', 'error']
            }
        })
    }

    return (
        <Dialog 
            maxWidth="sm"
            classes={{ paper: classes.root }}
            fullWidth 
            open={props.open} 
            onClose={props.handleClose} 
            aria-labelledby="order-approval-dialog-title"
        >
            {
                loading ?
                <Loading /> :
                <>
                    <DialogTitle id="order-approval-dialog-title">Retificar Pedido [{prettyTypes[state.type]}]</DialogTitle>
                    <DialogContent>
                        <Typography variant="h5" align="center" gutterBottom>
                            {state.grade} | {getNumber()} | {formatDate(state.delivery_date)}
                        </Typography>
                        <OrderForm state={state} setState={setState} />
                        <Grid container spacing={1} className={classes.btnGrid}>
                            <Grid item xs={12}>
                                {
                                    state.status === 'pending' &&
                                    <ApprovalButton type={state.type} handleClick={handleApproval}/>
                                }
                                {
                                    state.status === 'awaiting' &&
                                    <FinishButton type={state.type} handleClick={handleFinish}/>
                                }
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary">Cancelar</Button>
                        <Button onClick={handleUpdate} color="primary">Salvar</Button>
                    </DialogActions>
                </>
            }
            
        </Dialog>
    )
}

function OrderEditContainer(props) {    
    return (
        <>
            {
                props.open &&
                <OrderEditMenuDialog
                    open={props.open}
                    handleClose={props.handleClose}
                    handleUpdate={props.handleUpdate}
                    record={props.record}
                />
            }
        </>
    )
}

export default OrderEditContainer