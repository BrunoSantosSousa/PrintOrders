import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Title from '../../Layout/Title/'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import PersonIcon from '@material-ui/icons/Person'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CircularProgress from '@material-ui/core/CircularProgress'
import makeConnection from '../../Connection'

import Config from '../../config'

const useUserDialogStyles = makeStyles({
    form: {
        minWidth: 200
    }
})

const userConnection = makeConnection({
    fetch: fetch,
    api: Config.URL.API,
    endpoint: Config.URI.User
})

function UserDialog(props) {
    const {open, setOpen, onSuccess, onError} = props
    const classes = useUserDialogStyles()

    const [state, setState] = useState({
        name: '',
        admin: false
    })

    const handleClose = () => setOpen(false)

    const formatState = () => {
        return {
            name: state.name,
            role: state.admin ? 'admin' : 'user'
        }
    }

    const handleRegister = async () => {
        const response = await userConnection.post(formatState())
        setOpen(false)
        if(response.message && response.message === 'CREATED') {
            onSuccess()
        } else {
            onError()
        }
    }

    const handleSwitchChange = name => event => setState({...state, [name]: event.target.checked})
    
    const handleChange = prop => event => {
        setState({...state, [prop]: event.target.value})
    }
    
    return (
        <>
            <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Registro de Usuário</DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate autoComplete="off">
                        <FormGroup>
                            <TextField 
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nome completo"
                                type="text"
                                fullWidth
                                value={state.name}
                                onChange={handleChange('name')}
                            />
                            <FormControlLabel 
                                control={<Switch checked={state.admin} onChange={handleSwitchChange('admin')} value={true} />}
                                label="Administrador"
                            />
                        </FormGroup>
                    </form>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancelar</Button>
                    <Button onClick={handleRegister} color="primary">Registrar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

function UserItem(props) {
    const { record } = props

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <PersonIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary={record.name}
                secondary={`${record.role} - ${record.uid}`}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

function UserList(props) {
    const { records } = props
    return (
        <>
            <List>
                { records.map((record, index) => <UserItem key={index} record={record} />) }
            </List>
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

export default function Users(props) {
    const { msg } = props

    const [userDialogOpen, setUserDialogOpen] = useState(false)

    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)

    const handleNewUserClick = () => setUserDialogOpen(true)

    const fetchData = async () => {
        const response = await userConnection.get()
        setRecords(response.data)
        setLoading(false)
    }

    const handlePostRegister = () => {
        msg("Novo usuário registrado!", 'success')
        setLoading(true)
        fetchData()
    }

    const handleRegisterFailure = () => msg('Falha ao registrar novo usuário!', 'error')

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Title>Usuários</Title>
            <Fab 
                size="small" 
                color="primary" 
                variant="extended"
                aria-label="add"
                onClick={handleNewUserClick}
            >
                <AddIcon /> Novo Usuário
            </Fab>

            <UserDialog 
                open={userDialogOpen} 
                setOpen={setUserDialogOpen} 
                onSuccess={handlePostRegister}
                onError={handleRegisterFailure}
            />
        
            { loading ? <Loading /> : <UserList records={records} /> }           
        </>
    )
}