import styled from 'styled-components'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';

export const TopBar = styled.div`
    background-color: #9b0000;
    height: 15em;
`

export const LoginContainer = styled(Container)`
    margin-top: -5em;
`

export const UUIDField = styled(TextField)`
    width: 100%;
`

export const LoginCardActions = styled(CardActions)`
    margin: 0 10px;
`