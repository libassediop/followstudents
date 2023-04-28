import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Inscription, Reinscription } from './general.model';
// import { ReinscriptionComponent } from '../reinscription/reinscription.component';

@Injectable({
  providedIn: 'root'
})

export class InscriptionreinscriptionService {


  private host:string ='https://samastock.alwaysdata.net/yole/api';
  constructor(private http:HttpClient) { }

 reinscri : Reinscription;

  getInscriptionJournaliere(){
    return this.http.get(this.host+'/inscription/getInscriptionJournaliere'+'?token='+localStorage.getItem('token'));
  }
  getInscriptionMensuelle(){
    return this.http.get(this.host+'/inscription/getInscriptionMensuelle'+'?token='+localStorage.getItem('token'));
  }

  getInscriptionByEleve(matricule){
    return this.http.get(this.host+'/inscription/getInscriptionByEleve?matricule='+matricule+'?token='+localStorage.getItem('token'));
  }

  getInscriptionBydate(date){
    return this.http.get(this.host+'/inscription/getInscriptionByDate?date='+date+'?token='+localStorage.getItem('token'));
  }
 
  addInscription(inscri : Inscription){
    return this.http.post(this.host+'/inscription/addInscription?nom='+inscri.nom+'&dateNaissance='+inscri.dateNaissance+'&prenom='+inscri.prenom+'&nationalite='+inscri.nationalite+'&lieuDeNaissance='+inscri.lieuDeNaissance+'&adresse='+inscri.adresse+'&email='+inscri.email+'&telephone='+inscri.telephone+'&sexe='+inscri.sexe+'&etat='+1+'&nomParent='+inscri.nomParent+'&prenomParent='+inscri.prenomParent+'&emailParent='+inscri.emailParent+'&telephoneParent='+inscri.telephoneParent+'&sexeParent='+inscri.sexeParent+'&fonctionParent='+inscri.fonctionParent+'&classeId='+inscri.classeId+'&montant='+100000+'&avance='+1000+'&userId='+localStorage.getItem('id')+'&typeDePayement='+inscri.typeDePayement+'&caisseId=1'+'&token='+localStorage.getItem('token'),{observe :'response'});
  }

  addReinscription(reinscri : Reinscription){
    return this.http.post(this.host+'/reinscription/addReInscription?matricule='+reinscri.matricule+'&classeId='+reinscri.classeId+'&montant='+reinscri.montant+'&avance='+reinscri.avance+'&userId='+reinscri.userId+'&typeDePayement='+reinscri.typeDePayement+'&caisseId=1'+'?token='+localStorage.getItem('token'),reinscri);
  }


  
}
