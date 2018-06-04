export const DEFAULT_PROTOCOL = 'https'
export const DEFAULT_AUTH_SCHEME = 'Bearer'

export const config = (configFile: ConfigFile): AuthConfig => {
    return {
        protocol: configFile.protocol ? configFile.protocol : DEFAULT_PROTOCOL,
        scheme: configFile.scheme ? configFile.scheme : DEFAULT_AUTH_SCHEME,
        urlConfig: {
            auth: {
                baseUrl: configFile.urlConfig.auth.baseUrl,
                version: configFile.urlConfig.auth.version,
                loginEndpoint: configFile.urlConfig.auth.loginEndpoint,
                logoutEndpoint: configFile.urlConfig.auth.logoutEndpoint,
                refreshTokenEndpoint: configFile.urlConfig.auth.refreshTokenEndpoint
            },
            events: {
                resultTypes: configFile.urlConfig.events.resultTypes,
                getAllEndpoint: configFile.urlConfig.events.getAllEndpoint
            },
            predictions: {
                createPrediction: configFile.urlConfig.predictions.createPrediction,
                getPredictions: configFile.urlConfig.predictions.getPredictions,
                globalPredictions: configFile.urlConfig.predictions.globalPredictions
            },
            userPoints: {
                getPoints: configFile.urlConfig.userPoints.getPoints
            },
            teams: {
                getAll:  configFile.urlConfig.teams.getAll
            }
        }
    }
}

export interface ConfigFile {
    protocol: string,
    scheme: string,
    urlConfig: UrlConfig
}
export interface UrlConfig {
    auth: AuthUrlConfig
    events: EventUrlConfig
    predictions: PredictionUrlConfig
    userPoints: UserPointsConfig
    teams: TeamsConfig
}
export interface AuthUrlConfig {
    baseUrl: string,
    version: string,
    loginEndpoint: string,
    logoutEndpoint: string,
    refreshTokenEndpoint: string
}
export interface AuthConfig {
    protocol: string,
    scheme: string,
    urlConfig: UrlConfig
}
export interface EventUrlConfig {
    resultTypes: string
    getAllEndpoint: string
}

export interface PredictionUrlConfig {
    createPrediction: string
    getPredictions: string
    globalPredictions: string
}

export interface UserPointsConfig {
    getPoints: string
}

export interface TeamsConfig {
    getAll: string
}