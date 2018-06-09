/**
 * Example config file,
 * replace with your own
 * url configuration json object.
 */
export default {
    "protocol": "http",
    "scheme": "Bearer",
    "urlConfig": {
        "auth": {
            "version": "v1",
            "baseUrl": "165.227.242.169/api",
            "signup": "signup",
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
        },
        "leaderboards": {
            "getAllLeaderboards": "leaderboard/"
        }
    }
}
