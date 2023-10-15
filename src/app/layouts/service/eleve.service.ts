import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Inscription } from './general.model';


@Injectable({
  providedIn: 'root'
})
export class EleveService {

  private host:string ='https://samastock.alwaysdata.net/yole/api';
  constructor(private http:HttpClient) { }



  getAllEleveByClasse(idClasse){
    return this.http.get(this.host+'/eleve/getEleveByClasse/'+idClasse+'?token='+localStorage.getItem('token'));
  }

  getAllEleve(){
    return this.http.get(this.host+'/eleve/getAllEleve'+'?token='+localStorage.getItem('token'));
  }

  getAllParent(){
    return this.http.get(this.host+'/parent/getAllParentt'+'?token='+localStorage.getItem('token'));
  }

  getParentByClasse(idClasse){
    return this.http.get(this.host+'/parent/getAllParentEleve'+'?token='+localStorage.getItem('token'));
  }
  getEleveByMatricule(matricule){
    return this.http.get(this.host+'/eleve/getEleveByMatricule?matricule='+matricule+'&token='+localStorage.getItem('token'));
  }

  getEleveById(matricule){
    return this.http.get(this.host+'/eleve/getEleveById?idEleve='+matricule+'&token='+localStorage.getItem('token'));
  }

  getFicheEleveByMatricule(matricule){
    return this.http.get(this.host+'/eleve/getFicheEleveByMatricule?matricule='+matricule+'&token='+localStorage.getItem('token'));
  }

  getLastAnneeScolaireByMatricule(matricule){
    return this.http.get(this.host+'/eleve/getMaxIdInsByMatricule/'+matricule+'&token='+localStorage.getItem('token'));
  }



  updatdeEleve(inscri : Inscription){
    return this.http.put(this.host+'/eleve/updateEleveById/'+inscri.id+'?nom='+inscri.nom+'&prenom='+inscri.prenom+'&adresse='+inscri.adresse+'&sexe='+inscri.sexe+'&nationalite='+inscri.nationalite+'&dateNaissance='+inscri.dateNaissance+'&lieuDeNaissance='+inscri.lieuDeNaissance+'&nomParent='+inscri.nomParent+'&prenomParent='+inscri.prenomParent+'&telephoneParent='+inscri.telephoneParent+'&fonctionParent='+inscri.fonctionParent+'&sexeParent='+inscri.sexeParent+'&classe_id='+inscri.classeId+'&token='+localStorage.getItem('token'),{observe :'response'})
  }
  getHistoriqueListeEleveByClasse(idClasse){
    return this.http.get(this.host+'/eleve/getHistoriqueListeEleveByClasse'+idClasse+'&token='+localStorage.getItem('token'));


  }


}
