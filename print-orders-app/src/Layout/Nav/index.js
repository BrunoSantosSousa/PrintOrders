import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Container,
         Image,
         ImageButton,
         ImageSrc,
         ImageBackdrop,
         ImageTitle,
         ImageMarked } from './styles'

// https://codesandbox.io/s/material-demo-4zqqb

export default function Nav() {
    const { url } = useRouteMatch()
    const history = useHistory()

    const images = [
        {
            url: "https://cdn.searchenginejournal.com/wp-content/uploads/2018/03/4-things-seos-should-do-760x400.png",
            title: "Pedidos",
            width: "60%",
            path: `${url}/orders`
        },
        {
            url: "https://produtividadeimbativel.com.br/wp-content/uploads/2018/11/Curso-de-administra%C3%A7%C3%A3o-do-tempo-380x249.jpg",
            title: "Administrativo",
            width: "40%",
            path: `${url}/admin`
        }
    ];

    const handleClick = path => () => history.push(path)

    return (
        <Container>
            {
                images.map(image => (
                    <Image
                        focusRipple
                        key={image.title}
                        style={{ width: image.width }}
                        onClick={handleClick(image.path)}
                    >
                        <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                        <ImageBackdrop />
                        <ImageButton>
                            <ImageTitle>
                                { image.title }
                                <ImageMarked/>
                            </ImageTitle>
                        </ImageButton>
                    </Image>
                ))
            }
        </Container>
    )
}