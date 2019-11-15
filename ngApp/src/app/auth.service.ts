import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
private registerApi="http://localhost:3000/api/register"
private loginApi="http://localhost:3000/api/login"
  constructor(private http:HttpClient,private router:Router) { }
  
  data_registeruser_authservice(user){
    return this.http.post(this.registerApi,user)
  }
  loginuser(user){
      return this.http.post(this.loginApi,user)
    }
    loggedIn(){
      return !!localStorage.getItem('token')
    }
    loggedOut(){
      localStorage.removeItem('token')
      this.router.navigate(['/events'])
    }
    gettoken(){
      return localStorage.getItem('token')
    }
}
