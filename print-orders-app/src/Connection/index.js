import Auth from '../Auth'

const makeOptions = (method, authorization, data = null) => {
    const headers = {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : authorization
    }
    if(data) {
        return {
            method: method,
            headers: headers,
            body: JSON.stringify(data)
        }
    } else {
        return {
            method: method,
            headers: headers
        }
    }
}

const makeFetch = (fetch, url, options) => {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

const makeParams = (params) => {
    let str = "?"
    for(let key in params) {
        if(params.hasOwnProperty(key)) {
            str += `${key}=${params[key]}`
        }
    }
    return str
}

const withParams = (url, params) => {
    return `${url}${makeParams(params)}`
}

const checkAuthentication = () => {
    if(!Auth.hasAuthenticatedUser()) {
        throw "Usuário não autenticado."
    }

    if(Auth.isAuthenticatedSessionExpired()) {
        throw "Sessão expirada!"
    }
}

export default function makeConnection(props) {

    const {fetch, api, endpoint, hasChild, rootId} = props
    let url = ""
    if(hasChild) {
        let formattedEndPoint = endpoint.replace("{id}", rootId)
        url = `${api}${formattedEndPoint}`
    } else {
        url = `${api}${endpoint}`
    }
    const authorization = Auth.getAuthorization()
    
    return {
        get: (params = null) => {
            checkAuthentication()
            const options = makeOptions('get', authorization)
            if(params) {
                return makeFetch(fetch, withParams(url, params), options)
            }
            return makeFetch(fetch, url, options)
        },
        getById: (id) => {
            checkAuthentication()
            const options = makeOptions('get', authorization)
            const urlWithId = `${url}/${id}`
            return makeFetch(fetch, url, options)
        },
        post: (data) => {
            checkAuthentication()
            const options = makeOptions('post', authorization, data)
            return makeFetch(fetch, url, options)
        },
        update: (id, data) => {
            checkAuthentication()
            const options = makeOptions('put', authorization, data)
            const urlWithId = `${url}/${id}`
            return makeFetch(fetch, url, options)
        },
        delete: (id) => {
            checkAuthentication()
            const options = makeOptions('delete', authorization)
            return makeFetch(fetch, url, options)
        }
    }
}
