import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
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
import { makePagination } from '../../Layout/Stepper'
import StepperList from '../../Layout/StepperList'

import Config from '../../config'

const useUserFormStyles = makeStyles({
    root: {
        minWidth: 200
    }
})

function UserForm(props) {
    const {state, setState} = props
    const classes = useUserFormStyles()
    const handleSwitchChange = name => event => setState({...state, [name]: event.target.checked})
    const handleChange = prop => event => setState({...state, [prop]: event.target.value})

    return (
        <form className={classes.root} noValidate autoComplete="off">
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

function NewUserDialog(props) {
    const {open, setOpen, handleRegister} = props
    
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
    
    return (
        <>
            <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Registro de Usuário</DialogTitle>
                <DialogContent>
                    <UserForm state={state} setState={setState}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancelar</Button>
                    <Button onClick={handleRegister(formatState())} color="primary">Registrar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const useUserDialogStyles = makeStyles({
    divider : {
        marginTop: 10,
        marginBottom: 10
    },
    select: {
        width: "100%"
    },
    btnAddGrade: {
        marginTop: 10,
        width: "100%"
    },
    disabledInput: {
        width: "98%"
    }
})

function UserDialog(props) {
    const classes = useUserDialogStyles()

    const {open, setOpen, editItemState, handleEdit, msg} = props
    
    const gradeConnection = makeConnection({
        fetch: fetch,
        api: Config.URL.API,
        endpoint: Config.URI.Grade
    })

    const makeUserGradeConnection = (rootId) => { 
        return makeConnection({
            fetch: fetch,
            api: Config.URL.API,
            endpoint: Config.URI.UserGrade,
            hasChild: true,
            rootId: rootId
        })
    }

    const [state, setState] = useState({
        name: '',
        admin: false
    })

    const [grades, setGrades] = useState([])
    const [userGrades, setUserGrades] = useState([])
    const [grade, setGrade] = useState('')

    const [loading, setLoading] = useState(true)

    const handleClose = () => setOpen(false)

    const loadGrades = async () => {
        let response = await gradeConnection.get()
        setGrades(response.data)
    }

    const handleGradeChange = (event) => setGrade(event.target.value) 

    const formatBindGradeData = () => {
        return {
            grade_id: grade
        }
    }

    const fetchData = async () => {
        setLoading(true)
        await loadGrades()
        await loadUserGrades()
        setLoading(false)
    }

    const handleBindGrade = async () => {
        const userGradeConnection = makeUserGradeConnection(editItemState.id)
        let response = await userGradeConnection.post(formatBindGradeData())
        if(response.message === 'CREATED') {
            msg(`Série vinculada à ${state.name} com sucesso!`, 'success')
            fetchData()
        }
        else if (response.message === 'DUPLICATED') {
            msg(`Já existe um vinculo com a série.`, 'warning')
        }
    }

    
    const loadUserGrades = async () => {
        const userGradeConnection = makeUserGradeConnection(editItemState.id)
        let response = await userGradeConnection.get()
        setUserGrades(response)
    }

    const formattedState = () => {
        return {
            name: state.name,
            role: state.admin ? 'admin' : 'user'
        }
    }

    const handleDestroy = userGradeId => async () => {
        const userGradeConnection = makeUserGradeConnection(editItemState.id)
        let response = await userGradeConnection.delete(userGradeId)
        if(response.message === 'DELETED') {
            msg("Vínculo removido!", 'info')
            fetchData()
        }
    }
    
    useEffect(() => {
        setState({
            name: editItemState.name,
            admin: editItemState.role === 'admin' ? true : false
        })
        if(editItemState.id) {
            fetchData()
        }
    }, [editItemState])

    return (
        <>
            <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Informações de Usuário</DialogTitle>
                <DialogContent>
                    <UserForm state={state} setState={setState}/>
                    <Box display="flex" justifyContent="flex-end">
                        <Button 
                            variant="outlined" 
                            color="primary"
                            onClick={handleEdit(formattedState())}
                        >
                            <EditIcon /> Retificar Usuário
                        </Button>
                    </Box>
                    <Divider className={classes.divider} />
                    {
                        loading ?
                            <Loading /> :
                            <>
                                <Typography variant="subtitle1">Séries vinculadas</Typography>
                                {
                                    userGrades.length > 0 ?
                                        <>
                                            { 
                                                userGrades.map((userGrade) => 
                                                <Grid container key={userGrade.grade.id}>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField 
                                                            disabled 
                                                            label="Série" 
                                                            defaultValue={userGrade.grade.description} 
                                                            className={classes.disabledInput}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <Button 
                                                            className={classes.btnAddGrade} 
                                                            variant="outlined" 
                                                            color="secondary"
                                                            onClick={handleDestroy(userGrade.id)}
                                                        >
                                                            <DeleteIcon /> Remover vínculo
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Divider className={classes.divider} />
                                                    </Grid>
                                                </Grid>) 
                                            }
                                        </> :
                                        <Alert severity="warning">Nenhuma série vinculada!</Alert>
                                }
                                
                                <Grid container >
                                    <Grid item xs={12} md={6}>
                                        <FormControl className={classes.select}>
                                            <InputLabel id="serie-label">Série</InputLabel>
                                            <Select
                                                labelId="serie-label"
                                                id="serie"
                                                value={grade}
                                                onChange={handleGradeChange}
                                            >
                                                { grades.map((grade) => <MenuItem key={grade.id} value={grade.id}>{grade.description}</MenuItem> )}
                                            </Select>
                                            
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6} >
                                        <Button 
                                            className={classes.btnAddGrade} 
                                            variant="outlined" 
                                            color="primary"
                                            disabled={!grade}
                                            onClick={handleBindGrade}
                                        >
                                            <AttachFileIcon /> Vincular Série
                                        </Button>
                                    </Grid>
                                </Grid>
                            </>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}


function UserItem(props) {
    const { record, handleEditItem } = props

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
                <IconButton edge="end" aria-label="delete" onClick={handleEditItem(record)}>
                    <EditIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

function UserList(props) {
    const { records, pagination, fetchData, handleEditItem } = props
    return (
        <>
            <StepperList pagination={pagination} fetchData={fetchData}>
                { records.map((record, index) => <UserItem key={index} record={record} handleEditItem={handleEditItem} />) }
            </StepperList>
        </>
    )
}

export default function Users(props) {
    const { msg } = props

    const [userDialogOpen, setUserDialogOpen] = useState(false)
    const [newUserDialogOpen, setNewUserDialogOpen] = useState(false)
    const [records, setRecords] = useState([])
    const [editItemState, setEditItemState] = useState({})
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        steps: 1,
        activeStep: 0
    })

    const userConnection = makeConnection({
        fetch: fetch,
        api: Config.URL.API,
        endpoint: Config.URI.User
    })

    const handleNewUserClick = () => setNewUserDialogOpen(true)

    const fetchData = async (param = null) => {
        if(!loading) {
            setLoading(true)
        }
        const response = await userConnection.get(param)
        setPagination(makePagination(response))
        setRecords(response.data)
        setLoading(false)
    }

    const handlePostRegister = () => {
        msg("Novo usuário registrado!", 'success')
        fetchData()
    }

    const handlePostEdit = () => {
        msg('Usuário retificado!', 'success')
        fetchData()
    }

    const handleEditFailure = () => msg('Falha ao editar dados de usuário!', 'error')
    const handleRegisterFailure = () => msg('Falha ao registrar novo usuário!', 'error')

    const handleRegister = data => async () => {
        setNewUserDialogOpen(false)
        const response = await userConnection.post(data)
        if(response.message && response.message === 'CREATED') {
            handlePostRegister()
        } else {
            handleRegisterFailure()
        }
    }

    const handleEdit = data => async () => {
        setUserDialogOpen(false)
        const response = await userConnection.update(editItemState.id, data)
        if(response.message && response.message === 'UPDATED') {
            handlePostEdit()
        } else {
            handleEditFailure()
        }
    }

    const handleEditItem = item => event => {
        setEditItemState(item)
        setUserDialogOpen(true)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Title margin={true}>Usuários</Title>
            <Fab 
                size="small" 
                color="primary" 
                variant="extended"
                aria-label="add"
                onClick={handleNewUserClick}
            >
                <AddIcon /> Novo Usuário
            </Fab>

            <NewUserDialog 
                open={newUserDialogOpen} 
                setOpen={setNewUserDialogOpen} 
                handleRegister={handleRegister}
            />

            <UserDialog 
                open={userDialogOpen}
                setOpen={setUserDialogOpen}
                editItemState={editItemState}
                handleEdit={handleEdit}
                msg={msg}
            />
        
            { 
                loading ? 
                    <Loading /> : 
                    <UserList 
                        records={records}
                        pagination={pagination}
                        fetchData={fetchData}
                        handleEditItem={handleEditItem}
                    /> 
            }           
        </>
    )
}