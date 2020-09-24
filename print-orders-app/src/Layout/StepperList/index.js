import React from 'react'
import List from '@material-ui/core/List'
import Stepper from '../Stepper'

export default function StepperList(props) {
    const { pagination, fetchDataParams, setFetchDataParams, fetchData } = props

    const handleNext = () => {
        setFetchDataParams({ ...fetchDataParams, page: pagination.next })
        fetchData()
    }

    const handleBack = () => {
        setFetchDataParams({...fetchDataParams, page: pagination.back})
        fetchData()
    }

    return (
        <>
            <List>
                {props.children}
            </List>
            <Stepper 
                steps={pagination.steps} 
                activeStep={pagination.activeStep} 
                handleNext={handleNext} 
                handleBack={handleBack}
            />
        </>
    )
}