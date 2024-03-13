import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Users } from 'src/app/layouts/service/general.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  value: Users;
  private host: string = 'https://samastock.alwaysdata.net/yole/api';
  //private host:string ='http://127.0.0.1:8000/api';
  isLoggedIn = false;
  role: number;

  // store the URL so we can redirect after logging in
  redirectUrl: string; constructor(private myRoute: Router, private http: HttpClient, public router: Router) { }

  updatePasswordUser(id, newpassword) {
    return this.http.put(
      this.host
      + '/user/updatePasswordUserNewConnexion/'
      + id + '?password=' + newpassword + '&token=' + localStorage.getItem('token'),
      { observe: 'response' });
  }

  login(value: Users) {
    return this.http.post(
      this.host
      + '/login?login='
      + value.login
      + '&' + 'password=' + value.password,
      { observe: 'response' });
  }




  saveToken(jwt: string, nom: string, prenom: string, typeUser: number, iduser: number, login: string) {
    localStorage.setItem('token', jwt);
    localStorage.setItem('nom', nom);
    localStorage.setItem('prenom', prenom);
    localStorage.setItem('login', login);
    localStorage.setItem('typeUser', String(typeUser));
    this.role = typeUser;
    localStorage.setItem('id', String(iduser));
    this.isLoggedIn = true;
  }
  isAdmin() {
    return this.role === 1;

  }
  isSecretaire() {
    return this.role === 2;
  }
  isProf() {
    return this.role === 3;
  }
  isAuthentificate() {
    return this.isLoggedIn;
  }



  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('login');
    localStorage.removeItem('typeUser');
    localStorage.removeItem('etat');
    localStorage.removeItem('id');
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }
  logout2(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('prenom');
    localStorage.removeItem('typeUser');
    this.isLoggedIn = false;
    this.router.navigate(['firstConnexion']);
  }
  sendToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isLoggedInn() {
    return this.getToken() !== null;
  }

}
