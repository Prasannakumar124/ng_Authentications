import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginUserData={};
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
  }
  loginuser(){
    this.auth.loginuser(this.LoginUserData).subscribe(
      res=>
      {
        console.log(res)
      localStorage.setItem('token',res['token']);
      this.router.navigate(['/special'])
      },
      err=>console.log(err)
      )
    console.log(this.LoginUserData);
  }
}
