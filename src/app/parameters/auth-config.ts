import {AuthConfig} from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
  issuer: "http://localhost:8180/realms/fitnote-realm",
  redirectUri: "http://localhost:8100/tabs/plans",
  postLogoutRedirectUri: 'http://localhost:8100/login',
  clientId: 'fitnote-public-client',
  responseType: 'code',
  // scope: 'openid profile email offline_access',
  scope: 'openid profile email',
  // Revocation Endpoint must be set manually when using Keycloak
  // See: https://github.com/manfredsteyer/angular-oauth2-oidc/issues/794
  revocationEndpoint: "http://localhost:8080/realms/fitnote-realm/protocol/openid-connect/revoke",
  showDebugInformation: true,
  requireHttps: false,
}
