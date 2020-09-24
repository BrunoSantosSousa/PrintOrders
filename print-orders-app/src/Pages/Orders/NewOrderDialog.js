import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import DateField from '../../Layout/DateField'


const useOrderDialogStyles = makeStyles(theme => ({
    formControl: {
        width: '100%',
        marginTop: '16px'
    }
}))

function NewOrderDialog(props) {
    const classes = useOrderDialogStyles()
    const {open, setOpen, handleRegister} = props
    const [formMode, setFormMode] = useState('book')
    /*
    const handleDateChange = date => setState({...state, delivery_date: date})
    const handleChange = prop => event => setState({...state, [prop]: event.target.value})
    */
    const handleClose = () => setOpen(false)
    
    const initialValues = {
        type: 'book',
        delivery_date: new Date(),
        description: '',
        book_name: '',
        pages: '',
        comments: ''
    }

    const validationSchema = Yup.object().shape({
        description: Yup.string().required('Descrição é um campo obrigatório!')        
    })

    const bookValidationSchema = Yup.object().shape({
        book_name: Yup.string().required('O nome do livro é obrigatório!'),
        pages: Yup.string().required('As páginas do livro são obrigatórias!')
    })

    const handleFormModeChange = handleChange => event => {
        setFormMode(event.target.value)
        handleChange(event)
    }

    const getDate = date => date.toISOString().split('T')[0]
   
    const formatBaseData = values => {
        return {
            type: values.type,
            delivery_date: getDate(values.delivery_date),
            description: values.description,
            comments: values.comments
        }
    }

    const formatBookData = values => {
        return {
            type: values.type,
            delivery_date: getDate(values.delivery_date),
            book_name: values.book_name,
            pages: values.pages,
            comments: values.comments
        }
    }

    const formatData = values => values.type === 'book' ? formatBookData(values) : formatBaseData(values)
    
    const handleSubmit = (values, {setSubmitting}) => {
        handleRegister(formatData(values))
        setSubmitting(false)
    }

    return (
        <>
            <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} aria-labelledby="order-dialog-title">
                <DialogTitle id="order-dialog-title">Novo Pedido</DialogTitle>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={formMode === 'book' ? bookValidationSchema : validationSchema}>
                    {
                        ({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                            <form autoComplete="off">
                                <DialogContent>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="type-label">Tipo de Pedido</InputLabel>
                                                <Select
                                                    labelId="type-label"
                                                    name="type"
                                                    value={values.type}
                                                    onChange={handleFormModeChange(handleChange)}
                                                    onBlur={handleBlur}
                                                    fullWidth
                                                >
                                                    <MenuItem value="book">Livro</MenuItem>
                                                    <MenuItem value="xerox">Xerox</MenuItem>
                                                    <MenuItem value="test">Avaliação</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <DateField id="delivery_date" name="delivery_date" label="Data de entrega"></DateField>
                                        </Grid>
                                        {
                                            values.type !== 'book' ?
                                                <>
                                                    <Grid item xs={12}>
                                                        <TextField 
                                                            name="description"
                                                            label="Descrição"
                                                            error={errors.description && touched.description}
                                                            helperText={errors.description && touched.description ? errors.description : ''}
                                                            fullWidth
                                                            value={values.description}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                </> :
                                                <>
                                                    <Grid item xs={12}>
                                                        <TextField 
                                                            name="book_name"
                                                            label="Nome do Livro"
                                                            error={errors.book_name && touched.book_name}
                                                            helperText={errors.book_name && touched.book_name ? errors.book_name : ''}
                                                            fullWidth
                                                            value={values.book_name}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField 
                                                            name="pages"
                                                            label="Páginas"
                                                            error={errors.pages && touched.pages}
                                                            helperText={errors.pages && touched.pages ? errors.pages : ''}
                                                            fullWidth
                                                            value={values.pages}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                </>
                                        }
                                        
                                        <Grid item xs={12}>
                                            <TextField 
                                                name="comments"
                                                label="Observações" 
                                                fullWidth
                                                value={values.comments}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                        <Button onClick={handleClose} color="primary">Cancelar</Button>
                                        <Button type="submit" onClick={handleSubmit} color="primary">Registrar</Button>
                                </DialogActions>
                            </form>
                        )
                    }
                </Formik>
            </Dialog>
        </>
    )
}

export default NewOrderDialog