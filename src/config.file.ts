/**
 * Example config file,
 * replace with your own
 * url configuration json object.
 */
export default {
    "protocol": "https",
    "scheme": "Bearer",
    "urlConfig": {
        "auth": {
            "version": "v1",
            "baseUrl": "oraculapp.ngrok.io/api",
            "loginEndpoint": "auth/token",
            "logoutEndpoint": "auth/logout",
            "refreshTokenEndpoint": "auth/refresh"
        },
        "events": {
            "resultTypes": "result-types/",
            "getAllEndpoint": "events/"
        },
        "predictions": {
            "createPrediction": "predictions/",
            "getPredictions": "predictions/",
            "globalPredictions": "global-predictions/"
        },
        "userPoints": {
            "getPoints": "points/"
        },
        "teams": {
            "getAll": "teams/"
        }
    }
}
