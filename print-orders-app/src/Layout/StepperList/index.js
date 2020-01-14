import React from 'react'
import List from '@material-ui/core/List'
import Stepper from '../Stepper'

export default function StepperList(props) {
    const { pagination, fetchData } = props

    const handleNext = () => {
        fetchData({
            page : pagination.next
        })
    }

    const handleBack = () => {
        fetchData({
            page: pagination.back
        })
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