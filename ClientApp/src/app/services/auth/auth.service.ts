import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_CONFIG } from './auth0-variables';
import { JwtHelper } from 'angular2-jwt';
import * as auth0 from 'auth0-js';

(window as any).global = window;

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: AUTH_CONFIG.audience,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid profile email'
  });

  userProfile: any;
  private roles: string[] = [];

  constructor(public router: Router) {
    const profile = localStorage.getItem('profile');
    if (profile)
      this.userProfile = profile;

    const token = localStorage.getItem('access_token');
    if (token) {
      this.readRolesFromToken(token);
    }

    this.handleAuthentication();
  }

  public isInRole(roleName: string) {
    return this.roles.indexOf(roleName) > -1;
  }

  public login(): void {
    this.auth0.authorize();
  }

  private handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.readRolesFromToken(authResult.accessToken);
        this.setProfile(authResult.accessToken);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private readRolesFromToken(token) {
    const jwtHelper = new JwtHelper();
    const decodedToken = jwtHelper.decodeToken(token);
    this.roles = decodedToken['https://vega.com/roles'] || [];
  }

  private setProfile(token): void {
    this.auth0.client.userInfo(token, (err, profile) => {
      if (err)
        throw err;

      if (profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
        console.log(profile);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');

    localStorage.removeItem('profile');
    this.userProfile = null;
    this.roles = [];
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }
}
