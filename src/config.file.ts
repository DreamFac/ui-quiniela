/**
 * Example config file,
 * replace with your own
 * url configuration json object.
 */
export default {
    "protocol": "https",
    "scheme": "Bearer",
    "urlConfig": {
        "version": "v1",
        "baseUrl": "quiniela/api",
        "loginEndpoint": "auth/token",
        "logoutEndpoint": "auth/logout",
        "refreshTokenEndpoint": "auth/refresh"
    }
}
