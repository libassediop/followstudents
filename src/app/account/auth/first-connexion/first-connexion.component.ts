import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import 'rxjs/add/operator/do';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UsersFirstCon } from 'src/app/layouts/service/general.model';
import { AuthService } from '../auth.service';

declare var $:any;

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, public router: Router,public authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.authService.logout();
        }
      }
    });
  }
}
@Component({
  selector: 'app-first-connexion',
  templateUrl: './first-connexion.component.html',
  styleUrls: ['./first-connexion.component.scss']
})
export class FirstConnexionComponent implements OnInit {
 matricule;

  constructor(public authService: AuthService, public router: Router,private routeActivate : ActivatedRoute) { }


  u: UsersFirstCon= {
    login: '',
    password: '',
    confirmPass : '',
    ancienPass:''

  };
  ngOnInit() {
    this.matricule = this.routeActivate.snapshot.params.matricule;
  }
  onLogin() {
    if(this.u.password!==this.u.confirmPass){
      this.showNotificationErrorDeuxMotDePasse();
      this.u.password='';
      this.u.confirmPass='';
    }
    else{
    this.authService.updatePasswordUser(localStorage.getItem('id'),this.u.password).subscribe(resp => {
      if(resp['success']===true){
   this.u.login=localStorage.getItem("login");
        this.authService.login(this.u).subscribe(resp => {
             this.authService.saveToken(resp['token'],resp['user'].nom,resp['user'].prenom,resp['user'].profilId,resp['user'].id,resp['user'].login)
               this.router.navigate(['alerte']);
            
               },
               error1 => {
                 this.showNotificationError()
               });

      }
      else{
        this.showNotificationError()

    } },
        error1 => {
          this.showNotificationError()
        });
 
  }
}
  showNotificationError(){
    const type = ['danger'];

    var color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "pe-7s-study",
      message: " <b>Erreur lors de la modificaton, Veuillez contacter l'administrateur SVP</b>"
    },{
      type: type,
      timer: 1000,
      placement: {
        from: 'top',
        align: 'right'
      }
    });
  }

  showNotificationErrorDeuxMotDePasse(){
    const type = ['danger'];

    var color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "pe-7s-study",
      message: " <b>Les deux mots de passes ne sont pas identiques</b>"
    },{
      type: type,
      timer: 1000,
      placement: {
        from: 'top',
        align: 'right'
      }
    });
  }

  showNotification(){
    const type = ['success'];

    var color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "pe-7s-study",
      message: " <b>Mot de passe modifié avec succès</b>"
    },{
      type: type,
      timer: 1000,
      placement: {
        from: 'top',
        align: 'right'
      }
    });
  }
}
