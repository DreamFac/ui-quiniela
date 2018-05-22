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
                getAllEndpoint: configFile.urlConfig.events.getAllEndpoint,
                selectTeamEndpoint: configFile.urlConfig.events.selectTeamEndpoint
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
    getAllEndpoint: string
    selectTeamEndpoint: string
}
