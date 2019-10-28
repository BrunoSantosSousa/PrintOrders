import styled from 'styled-components'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'

const red = "white";

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    min-width: 300px;
    width: 100%;
`

export const Image = styled(ButtonBase)`
    position: relative;
    height: 100px;
    &:hover {
        z-index: 1;
    }
    @media screen and (max-width: 600px) {
        width: 100% !important;
        height: 90px;
   asda

    }

`

export const SpanAbsolute = styled.span`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`

export const ImageButton = styled(SpanAbsolute)`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 22px;
    font-weight: bold;
    ${Image}:hover & {
        color: ${red};
    }
`

export const ImageSrc = styled(SpanAbsolute)`
    background-size: cover;
    background-position: center 40%;
`

export const ImageBackdrop = styled(SpanAbsolute)`
    background-color: black;
    opacity: 0.5;
    ${Image}:hover & {
        background-color: #455a64;
        opacity: 0.3;
    }
`

export const ImageTitle = styled(Typography)`
    position: relative;
    font-size: 20px;
    padding: 10px 30px;
    ${Image}:hover & {
        border: 4px solid ${red};
    }
`

export const ImageMarked = styled.span`
    height: 4px;
    width: 30px;
    background-color: white;
    position: absolute;
    bottom: -2px;
    left: calc(50% - 15px);
    ${Image}:hover & {
        opacity: 0;
    }
`