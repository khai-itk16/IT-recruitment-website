import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConfig } from '../config/url-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = new UrlConfig()

  constructor(private http: HttpClient,
    private router: Router) { }

  public loginUser(user) { 
    return this.http.post<any>(this.url.urlLogIn, user)
  }

  public registerUser(registerUser) { 
    return this.http.post<any>(this.url.urlRegister, registerUser)
  }

  public loggedIn() {
    return !!localStorage.getItem('token')
  }

  public getToken() {
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(["/"])
  }
}
