import Config from '../config'

export default {
    authenticate: async function(uid) {
        const url = Config.URL.API + Config.URI.Auth
        const headers = new Headers({
            'Content-Type': 'application/json'
        })
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ uid : uid })
        });
        return await this.handleAuthenticationRequest(response)
    },
    handleAuthenticationRequest: async function(response) {
        if(response.status === 200) {
            const responseBody = await response.json()
            this.setAuthenticatedUser(responseBody)
            return true
        }
        return false
    },
    setAuthenticatedUser: function(payload) {
        window.localStorage.setItem('authenticated_user', JSON.stringify({
            ...payload,
            start_time: (new Date()).getTime()
        }))
    },
    getAuthenticatedUser: function() {
        return JSON.parse(window.localStorage.getItem('authenticated_user'))
    },
    getAuthorization: function() {
        const authenticatedUser = this.getAuthenticatedUser()
        return `${authenticatedUser.token_type} ${authenticatedUser.token}`
    },
    hasAuthenticatedUser: function() {
        return Boolean(window.localStorage.getItem('authenticated_user'))
    },
    isAuthenticatedSessionExpired: function() {
        if(!this.hasAuthenticatedUser()) {
            return false;
        }
        const authenticatedUser = this.getAuthenticatedUser()
        const currentTimeMilis = (new Date()).getTime()
        const expirationTime = authenticatedUser.start_time + (authenticatedUser.expires_in * 1000)
        const isExpired = expirationTime <= currentTimeMilis
        return isExpired
    }

}