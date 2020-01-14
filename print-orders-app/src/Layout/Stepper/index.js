import React from 'react'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

export function makePagination(response) {
    return {
        steps: response.last_page,
        activeStep: response.current_page - 1,
        next: response.current_page + 1,
        back: response.current_page - 1
    }
}

export default function Stepper(props) {
    const {steps, activeStep, handleNext, handleBack} = props

    const nextButtonDisabled = activeStep === (steps-1)
    const backButtonDisabled = activeStep === 0

    return (
        <MobileStepper 
            variant="text"
            steps={steps}
            position="static"
            activeStep={activeStep}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={nextButtonDisabled}>
                    Próximo <KeyboardArrowRight />
                </Button>
            }
            backButton={
                <Button size="small" onClick={handleBack} disabled={backButtonDisabled}>
                    <KeyboardArrowLeft /> Voltar
                </Button>
            }
        />
    )
}

