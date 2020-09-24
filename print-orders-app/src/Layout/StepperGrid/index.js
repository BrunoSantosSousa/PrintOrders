import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Stepper from '../Stepper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        margin: '10px'
    },
    container: {
        minHeight: '500px'
    }
})

function StepperGrid(props) {
    const classes = useStyles()
    const {
        pagination, 
        fetchDataParams, 
        setFetchDataParams, 
        fetchData 
    } = props

    const handleNext = () => {
        setFetchDataParams({...fetchDataParams, page: pagination.next})
        fetchData()
    }
    
    const handleBack = () => {
        setFetchDataParams({...fetchDataParams, page: pagination.back})
    }

    return (
        <Box display="flex" flexDirection="column" className={classes.root}>
            <Grid container spacing={1} className={classes.container}>
                {props.children}
            </Grid>
            {
                pagination.steps > 1 &&
                <Box >
                    <Stepper 
                        steps={pagination.steps}
                        activeStep={pagination.activeStep}
                        handleNext={handleNext}
                        handleBack={handleBack}
                    />
                </Box>
            }
            
        </Box>
    )
}

export default StepperGrid