import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData={}
  constructor(private _auth:AuthService,private router:Router) { }

  ngOnInit() {
  }

  registeruser(){
    // console.log(this.registerUserData);
    this._auth.data_registeruser_authservice(this.registerUserData)
    .subscribe(
      res=>
      {
        localStorage.setItem('token',res['token'])
        console.log(res)
        this.router.navigate(['/special'])
      },
      (err)=>{console.log(err)}
    )
  }

}
