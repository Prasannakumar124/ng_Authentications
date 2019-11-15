import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  constructor(private authService:AuthService) { }
  intercept(req,next){
    let tokenizedreq=req.clone(
      {
        setHeaders:
                  {
                    Authorization:`token: ${this.authService.gettoken()}`
                   
                  }
      })
    return next.handle(tokenizedreq)
  }
}
