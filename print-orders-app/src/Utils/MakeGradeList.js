import Auth from '../Auth'
import makeConnection from '../Connection'
import Config from '../config'

const makeUserGradeList = async (user) => {
    const userGradeConnection = makeConnection({
        fetch: fetch,
        api: Config.URL.API,
        endpoint: Config.URI.UserGrade,
        hasChild: true,
        rootId: user.id
    })
    const response = await userGradeConnection.get()
    if(response.length > 0) {
        return response.map(userGrade => {
            return userGrade.grade
        })
    }
    return []
}

const makeAdminGradeList = async () => {
    const gradeConnection = makeConnection({
        fetch: fetch,
        api: Config.URL.API,
        endpoint: Config.URI.Grade
    })
    const response = await gradeConnection.get()
    return response.data.map(grade => {
        return {
            id: grade.id,
            description: grade.description
        }
    })
}

export default function() {
    const user = Auth.getAuthenticatedUser()
    return user.role === 'admin' ? makeAdminGradeList() : makeUserGradeList(user)
}