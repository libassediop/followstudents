import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Classe, Matiere } from "./general.model";

@Injectable({
  providedIn: 'root'
})
export class CaisseService {
  private host: string = 'https://samastock.alwaysdata.net/yole/api';
  // private host:string ='http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }

  getAllCaisseJournier() {
    return this.http.get(this.host + '/caissejournalier' + '?token=' + localStorage.getItem('token'));
  }

  getAllCaisseMensualité() {
    return this.http.get(this.host + '/caisseMensuelle' + '?token=' + localStorage.getItem('token'));
  }

  getAllCaisseAnnuelle() {
    return this.http.get(this.host + '/caisseAnnuelle' + '?token=' + localStorage.getItem('token'));
  }


}
