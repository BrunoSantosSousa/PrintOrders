import PermissionsFile from '../permissions'
import Auth from './index'

export const Permissions = PermissionsFile.Permissions

function hasPermission(permissionGroup, permission)
{
    return permissionGroup.filter(perm => perm === permission).length > 0
}

export function CanSee(permission)
{
    const authenticatedUser = Auth.getAuthenticatedUser()
    const permissionGroup = PermissionsFile[authenticatedUser.role]
    return hasPermission(permissionGroup, permission)
}

