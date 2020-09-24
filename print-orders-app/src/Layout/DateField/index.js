import ptBRLocale from 'date-fns/locale/pt-BR';
import React from 'react'
import { useField } from 'formik'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

function DateField(props) {
    const [field, meta, helpers] = useField(props.name)
    const { value } = meta
    const { setValue } = helpers
    const handleChange = (date) => setValue(date)

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
            <KeyboardDatePicker
                name={props.name}
                margin="normal"
                id={props.id}
                label={props.label}
                format="dd/MM/yyyy"
                fullWidth
                value={value}
                onChange={handleChange}
                invalidDateMessage="Data inválida!"
                maxDateMessage="Limite de data excedido!"
                minDateMessage="Data mínima requerida!"
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    )
}

export default DateField