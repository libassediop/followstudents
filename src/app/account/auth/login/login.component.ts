import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Users } from 'src/app/layouts/service/general.model';
import { AuthService } from '../auth.service';
declare var $: any;

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, public router: Router, public authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      tap(
        event => {},
        err => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.authService.logout();
          }
        }
      )
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  error = '';
  f: FormGroup;
  u: Users = {
    login: '',
    password: '',
  };

  constructor(public authService: AuthService, public router: Router, public fb: FormBuilder) {
   
  }

  ngOnInit() {
    const inputs = document.querySelectorAll('.input');
    function addcl() {
      let parent = this.parentNode.parentNode;
      parent.classList.add('focus');
    }
    function remcl() {
      let parent = this.parentNode.parentNode;
      if (this.value == '') {
        parent.classList.remove('focus');
      }
    }
    inputs.forEach(input => {
      input.addEventListener('focus', addcl);
      input.addEventListener('blur', remcl);
    });
    
    this.f = this.fb.group({
      login: ['milk', [Validators.required]],
      password: ['passer', [Validators.required]],
    });
  }

  
  onLogin() {
    if (this.f.invalid) {
      this.error = 'Veuillez remplir tous les champs.';
      return;
    }else{
    this.submitted = true;
    this.u.login = this.f.value.login;
    this.u.password = this.f.value.password;
    console.log(this.u)
      this.authService.login(this.u).subscribe(resp => {
        // if (resp['user'].password_changed === 0) {
        //   // console.log(resp);
        //   localStorage.setItem('id', resp['user'].id);
        //   localStorage.setItem('login', resp['user'].login);
        //   localStorage.setItem('token', resp['token']);
        //   this.router.navigate(['first']);
        // } else {
          this.authService.saveToken(resp['token'], resp['user'].nom, resp['user'].prenom, resp['user'].profilId, resp['user'].id, resp['user'].login);
          this.router.navigate(['pages']);
        }
      , error1 => {
        // this.Toast('danger', 'Erreur !', 'Identifiant ou mot de passe incorect!')
        this.error = error1 ? error1 : 'Identifiant ou mot de passe incorect!';
      }); 
    }
  }
}