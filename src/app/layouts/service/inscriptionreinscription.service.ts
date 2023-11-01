import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Inscription, Mensualite, Reinscription} from './general.model';
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
    console.log(inscri)
    return this.http.post(this.host+'/inscription/addInscription?etat=1+&typeDePayement=1&caisseId=1&nom='+inscri.nom+'&dateNaissance='+inscri.dateNaissance+'&prenom='+inscri.prenom+'&nationalite='+inscri.nationalite+'&lieuDeNaissance='+inscri.lieuDeNaissance+'&adresse='+inscri.adresse+'&email='+inscri.email+
    '&telephone='+inscri.telephone+'&sexe='+inscri.sexe+'&nomParent='+inscri.nomParent+'&prenomParent='+inscri.prenomParent+'&emailParent='+inscri.emailParent+'&telephoneParent='+inscri.telephoneParent+'&sexeParent='+inscri.sexeParent+'&fonctionParent='+inscri.fonctionParent+'&classeId='+inscri.classeId+'&userId='+localStorage.getItem('id')+'&montant_recu='+inscri.avance+'&token='+localStorage.getItem('token'),{observe :'response'});
  }

  detteInscription(idinscriptionID,montant_recu){
    return this.http.post(this.host+'/inscription/reglerRestantInscription/'+idinscriptionID+'?montant_recu='+montant_recu+'&token='+localStorage.getItem('token'),{observe :'response'});
  }

  detteMensuelle(idMensuel,montant_recu){
    return this.http.post(this.host+'/inscription/reglerRestantMensualite/'+idMensuel+'?token='+localStorage.getItem('token')+'&montant_recu='+montant_recu,{observe :'response'});
  }


  addReinscription(reinscri : Reinscription){
    return this.http.post(this.host+'/reinscription/addReInscription?matricule='+reinscri.matricule+'&classeId='+reinscri.classeId+'&avance='+reinscri.avance+'&userId='+reinscri.userId+'&typeDePayement='+reinscri.typeDePayement+'&caisseId=1'+'?token='+localStorage.getItem('token'),reinscri);
  }

  addMensualite(mensualite:Mensualite) {
    return this.http.post(this.host+'/mensualite/payerMensualite?token='+localStorage.getItem('token')+'&eleveId='+mensualite.eleveId+'&moisId='+mensualite.moisId+'&montant_recu='+mensualite.montant+'&userId='+localStorage.getItem('id'),{observe :'response'});
   //  return this.http.post(this.host+'/mensualite/payerMensualite?token='+localStorage.getItem('token'),mensualite);
  }

  getMensualiteImpayerByEleve(id){
    return this.http.get(this.host+'/mensualite/getMensualiteImpayerByEleve/'+id+'?token='+localStorage.getItem('token'));

  }

  getMensualitePayerByEleve(id){
    return this.http.get(this.host+'/mensualite/getMensualitePayerByEleve/'+id+'?token='+localStorage.getItem('token'));

  }


}
