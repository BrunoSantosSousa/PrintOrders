import React from 'react'
import { AlertSnackBar, useAlert } from '../../Alert'

export default function Orders() {
    const [open, message, variant, handleClose, msg] = useAlert()

    return (
        <>
            <h1>Orders page</h1>

            <AlertSnackBar 
                open={open}
                message={message}
                variant={variant}
                handleClose={handleClose}
            />
        </>
    )
}