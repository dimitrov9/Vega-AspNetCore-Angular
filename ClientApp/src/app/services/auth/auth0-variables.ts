interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
    audience: string;
}

export const AUTH_CONFIG: AuthConfig = {
    clientID: 'QV4nSsMQoVU2PRwa0QUKtoXfyRDnVm02',
    domain: 'vega-aspnetcore-angular.eu.auth0.com',
    callbackURL: 'https://localhost:5001',
    audience: 'https://api.vega.com'
};
