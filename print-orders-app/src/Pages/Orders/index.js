import 'date-fns'
import { format, addDays, differenceInDays } from 'date-fns'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent' 
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Title from '../../Layout/Title/'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
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
import CircularProgress from '@material-ui/core/CircularProgress'
import BookIcon from '@material-ui/icons/Book'
import NoteIcon from '@material-ui/icons/Note'
import ListAltIcon from '@material-ui/icons/ListAlt'
import SearchIcon from '@material-ui/icons/Search'
import Alert from '@material-ui/lab/Alert'

import { AlertSnackBar, useAlert } from '../../Alert'
import makeConnection from '../../Connection'
import makeGradeList from '../../Utils/MakeGradeList'
import { makePagination } from '../../Layout/Stepper'
import StepperGrid from '../../Layout/StepperGrid'
import Loading from '../../Layout/Loading'
import NewOrderDialog from './NewOrderDialog'
import OrderEdit from './OrderEdit'
import Config from '../../config'
import makeTheme from './Theme'
import DateFilter from './DateFilter'


const useOrderHeaderStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#f5f5f5'
    },
    formControl: {
        width: '100%'
    },
    fabBtnEl: {
        marginTop: '10px',
    },
    iconBtn: {
        margin: '3px'
    }
}))

function OrderHeader(props) {
    const { 
        handleNewOrderClick,
        handleDateFilterClick,
        gradeList, 
        setCurrentGrade,
        filtering,
        setFiltering
    } = props
    const classes = useOrderHeaderStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const menuOpen = Boolean(anchorEl)

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleGradeSelected = grade => event => {
        handleClose()
        setCurrentGrade(grade)
        handleNewOrderClick()
    }

    const handleChange = prop => event => setFiltering({...filtering, [prop]:event.target.value})

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item md={3} xs={12}>
                <Button
                    id="new-order"
                    className={classes.fabBtnEl}
                    fullWidth
                    color="secondary"
                    variant="contained"
                    onClick={handleClick}
                >
                    <AddIcon /> Novo Pedido
                </Button>
                <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={menuOpen}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    {
                        gradeList.map(grade => (
                            <MenuItem 
                                key={grade.id} 
                                onClick={handleGradeSelected(grade)}
                            >
                                {grade.description}
                            </MenuItem>
                        ))
                    }
                </Menu>
            </Grid>
            <Grid item md={4} xs={10}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status-input"
                        value={filtering.status}
                        onChange={handleChange('status')}
                    >
                        <MenuItem value="">
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
            <Grid item md={4} xs={12}>
                <Button
                    className={classes.fabBtnEl}
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={handleDateFilterClick}
                >
                    <SearchIcon /> Filtrar Datas
                </Button>
            </Grid>
        </Grid>
    )
}

const useOrderItemStyles = (theme) => makeStyles({
    root: {
        backgroundColor: theme.bgColor,
        width: '100%',
        paddingTop: '5px',
        paddingBottom: '5px'
    },
    btnBase: {
        margin: '5px',
        width: '100%'
    },
    statusLabel: {
        color: theme.statusColor,
        fontWeight: 'bold'
    },
    turmaLabel: {
        fontSize: '18px',
        fontWeight: 'bold'
    }
})


function OrderItem(props) {
    const {record, handleClickItem, findGrade} = props
    const theme = makeTheme(record.status)
    const useStyles = useOrderItemStyles(theme)
    const classes = useStyles()
    const [grade, setGrade] = useState('')
    const [deliveryDate, setDeliveryDate] = useState('')

    useEffect(() => {
        if(findGrade(record.grade_id)) {
            setGrade(findGrade(record.grade_id).description)
        }
        setDeliveryDate(format(addDays(new Date(record.delivery_date), 1), 'dd/MM/yyyy'))
    }, [])

    const getIcon = (type) => {
        switch(type) {
            case 'book':
                return (<BookIcon fontSize="large"/>)
            case 'test':
                return (<ListAltIcon fontSize="large"/>)
            case 'xerox':
                return (<NoteIcon fontSize="large"/>)
            default:
                break;
        }
    }

    const handleClick = () => {
        handleClickItem(record)
    }

    const status = {
        'pending' : 'Pendente',
        'awaiting' : 'Aguardando',
        'done' : 'Pronto'
    }

    const types = {
        'book' : 'Livro',
        'xerox' : 'Cópia',
        'test' : 'Avaliação'
    }

    const checked = {
        0: 'Não',
        1: 'Sim'
    }

    return (
        <Grid item xs={12} md={4}>
            <ButtonBase className={classes.btnBase} onClick={handleClick}>
                <Box display="flex" className={classes.root} flexDirection="column">
                    <Box>
                        <Box><span className={classes.turmaLabel}>{grade}</span></Box>
                    </Box>
                    <Box display="flex">
                        <Box display="flex" justifyContent="center" alignItems="center" flexGrow="1">
                            <Box>
                                <span>{getIcon(record.type)}</span>
                            </Box>
                        </Box>
                        <Box flexGrow="2">
                            <Box>Tipo: {types[record.type]}</Box>
                            <Box>Status: <span className={classes.statusLabel}>{status[record.status]}</span></Box>
                            <Box>Checado: {checked[record.checked]}</Box>
                            <Box>Data de entrega: {deliveryDate}</Box>
                        </Box>
                    </Box>
                </Box>
            </ButtonBase>
        </Grid>
    )
}

const useNoOrderFoundStyles = makeStyles({
    root: {
        marginTop: '10px'
    }
})

function NoOrderFound(props) {
    const classes = useNoOrderFoundStyles()
    return (
        <Grid item xs={12} className={classes.root}>
            <Alert severity="warning">Nenhum pedido encontrado.</Alert>
        </Grid>
    )
}

function OrderList(props) {
    const { 
        records, 
        pagination, 
        fetchData, 
        setFetchDataParams, 
        handleClickItem,
        findGrade
    } = props

    return (
        <StepperGrid pagination={pagination} fetchData={fetchData} setFetchDataParams={setFetchDataParams}>
            {
                records.length == 0 ?
                    <NoOrderFound /> :
                    records.map((record, index) => (
                        <OrderItem 
                            key={index} 
                            record={record} 
                            handleClickItem={handleClickItem}
                            findGrade={findGrade}
                        />
                    ))
            }
        </StepperGrid>
    )
}

export default function Orders() {
    const [open, message, variant, handleClose, msg] = useAlert()
    const [newOrderDialogOpen, setNewOrderDialogOpen] = useState(false)
    const [orderEditOpen, setOrderEditOpen] = useState(false)
    const [dateFilterOpen, setDateFilterOpen] = useState(false)
    const [gradeList, setGradeList] = useState([])
    const [firstLoadExecuted, setFirstLoadExecuted] = useState(false)
    const [currentGrade, setCurrentGrade] = useState({
        id: -1,
        description: ''
    })
    const [currentEditRecord, setCurrentEditRecord] = useState({})
    const [records, setRecords] = useState([])
    const [fetchDataParams, setFetchDataParams] = useState({})
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        steps: 1,
        activeStep: 0
    })
    const [filtering, setFiltering] = useState({
        status: ''
    })
    const [dateFilter, setDateFilter] = useState({
        start_date: new Date(),
        end_date: new Date()
    })
    const handleNewOrderClick = () => setNewOrderDialogOpen(true)

    const makeOrderConnection = (type) => {
        const configTypes = {
            order: Config.URI.Order,
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

    const fetchData = async () => {
        setLoading(true)
        const orderConnection = makeOrderConnection('order')
        const response = await orderConnection.get(fetchDataParams)
        setPagination(makePagination(response))
        setRecords(response.data)
        setLoading(false)
    }

    const fetchGradeListData = async () => {
        const gradeList = await makeGradeList()
        if(gradeList.length > 0) {
            setGradeList(gradeList)
        } else {
            msg('Nenhuma turma vinculada à sua conta, por favor peça ajuda a um secretário!', 'error')
        }
    }

    const findGrade = (id) => gradeList.filter(grade => grade.id === id)[0]

    useEffect(() => {
        if(!firstLoadExecuted) {
            const firstLoad = async () => {
                await fetchGradeListData()
                await fetchData()
            }
            firstLoad()
            setFirstLoadExecuted(true)
        }
    }, [])

    useEffect(() => {
        if(firstLoadExecuted) {
            setFetchDataParams({...fetchDataParams, ...filtering})
        }
    }, [filtering])

    useEffect(() => {
        if(firstLoadExecuted) {
            const changeFetchDataParams = async () => {
                await fetchData()
            }
            changeFetchDataParams()
        }
    }, [fetchDataParams])

    const handlePostRegister = () => {
        msg("Novo pedido registrado!", 'success')
        fetchData()
    }
    
    const handlePostFailure = () => msg('Falha ao registrar pedido!', 'error')

    const handleRegister = async (data) => {
        setNewOrderDialogOpen(false)
        const dataWithGrade = {...data, grade_id: currentGrade.id}
        const orderConnection = makeOrderConnection(dataWithGrade.type)
        const response = await orderConnection.post(dataWithGrade)
        if(response.message && response.message === 'CREATED') {
            handlePostRegister()
        } else {
            handlePostFailure()
        }
    }

    const handleUpdate = async (updateFn) => {
        setOrderEditOpen(false)
        const [message, status] = await updateFn()
        msg(message, status)
        fetchData()
    }

    const handleClickItem = (record) => {
        setCurrentEditRecord(record)
        setOrderEditOpen(true)
    }

    const handleCloseEdit = () => {
        setOrderEditOpen(false)
    }

    const handleCloseDateFilter = () => {
        setDateFilterOpen(false)
    }

    const handleDateFilterClick = () => {
        setDateFilterOpen(true)
    }

    const handleDateFilterSubmit = state => {
        setDateFilterOpen(false)
        setFetchDataParams({...fetchDataParams, ...state})
    }

    return (
        <>
            <Title>Pedidos</Title>

            <OrderHeader
                filtering={filtering}
                setFiltering={setFiltering}
                gradeList={gradeList}
                setCurrentGrade={setCurrentGrade}
                handleNewOrderClick={handleNewOrderClick}
                handleDateFilterClick={handleDateFilterClick}
            />
            
            <NewOrderDialog 
                open={newOrderDialogOpen}
                setOpen={setNewOrderDialogOpen}
                handleRegister={handleRegister}
            />

            <OrderEdit
                open={orderEditOpen}
                handleClose={handleCloseEdit}
                handleUpdate={handleUpdate}
                record={currentEditRecord}
            />

            <DateFilter 
                open={dateFilterOpen}
                state={dateFilter}
                setState={setDateFilter}
                handleClose={handleCloseDateFilter}
                handleSubmit={handleDateFilterSubmit}
            />

            {
                loading ?
                    <Loading /> :
                    <OrderList 
                        records={records}
                        pagination={pagination}
                        fetchData={fetchData}
                        fetchDataParams={fetchDataParams}
                        setFetchDataParams={setFetchDataParams}
                        handleClickItem={handleClickItem}
                        findGrade={findGrade}
                    />
            }

            <AlertSnackBar 
                open={open}
                message={message}
                variant={variant}
                handleClose={handleClose}
            />
        </>
    )
}