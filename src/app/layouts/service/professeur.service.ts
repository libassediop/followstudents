import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Personnel, Professeur, UsersFirstCon} from './general.model';

@Injectable({
  providedIn: 'root'
})

export class ProfesseurService {


  private host:string ='https://samastock.alwaysdata.net/yole/api';
  constructor(private http:HttpClient) { }


  getAllProfeeseur(){
    return this.http.get(this.host+'/user/getAllProf?token='+localStorage.getItem('token'));
  }


  getProfessurByIdClasse(idClasse){
    return this.http.get(this.host+'/user/getAllProfByClasse/'+idClasse+'?token='+localStorage.getItem('token'));
  }

  getProfessurByLogin(login){
    return this.http.get(this.host+'/user/getProfByLogin?login='+login+'&token='+localStorage.getItem('token'));
  }

  getUserByLogin(login){
    return this.http.get(this.host+'/user/getUserByLogin?login='+login+'&token='+localStorage.getItem('token'));
  }

  updateUser(user:Personnel,id){
    return this.http.put(this.host+'/user/updateUserById/'+id+'?nom='+user.nom+'&prenom='+user.prenom+'&telephone='+user.telephone+'&sexe='+user.sexe+'&login='+user.login+'&email='+user.email+'&lieuDeNaissance='+user.lieuDeNaissance+'&adresse='+user.adresse+'&dateNaissance='+user.dateNaissance+'&token='+localStorage.getItem('token'),{observe :'response'});
  }

  updateMotDePasse(user:UsersFirstCon,id){
    return this.http.put(this.host+'/user/updatePasswordUser/'+id+'?ancien_password='+user.ancienPass+'&nouveau_password='+user.password+'&token='+localStorage.getItem('token'),{observe :'response'});
  }
  getUserById(id){
    return this.http.get(this.host+'/user/getUserById?login='+id+'&token='+localStorage.getItem('token'));
  }


  verifieLogin(login){

    return this.http.get(this.host+'/user/verifLogin/'+login+'?token='+localStorage.getItem('token'));
  }
  verifieMail(mail){

    return this.http.get(this.host+'/user/verifMail/'+mail+'?token='+localStorage.getItem('token'));
  }
  verifieTel(tel){

    return this.http.get(this.host+'/user/verifTel/'+tel+'?token='+localStorage.getItem('token'));
  }
  getlisteClasseByProfesseur(id){
    return this.http.get(this.host+'/classe/getClasseByProf/'+id+'?token='+localStorage.getItem('token'));

  }

  getAllSecretaire(){
    return this.http.get(this.host+'/user/getAllSecretaire'+'?token='+localStorage.getItem('token'));
  }

  getSecretaireByLogin(login){
    return this.http.get(this.host+'/user/getSecretaireByLogin?login='+login+'&token='+localStorage.getItem('token')
    )
    ;
  }

  addSecretaire(val:Personnel){
    return this.http.post(this.host+'/user/addSecretaire'+'?nom='+val.nom+'&telephone='+val.telephone+'&email='+val.email+'&login='+val.login+'&sexe='+val.sexe+'&prenom='+val.prenom+'&dateNaissance='+val.dateNaissance+'&lieuDeNaissance='+val.lieuDeNaissance+'&adresse='+val.adresse+'&password=passer'+'&token='+localStorage.getItem('token'),{observe :'response'});
  }

  updatePersonnel(id,val:Personnel){
    return this.http.put(this.host+'/user/updateSecretaireById/'+id+'?nom='+val.nom+'&telephone='+val.telephone+'&email='+val.email+'&login='+val.login+'&sexe='+val.sexe+'&prenom='+val.prenom+'&dateNaissance='+val.dateNaissance+'&lieuDeNaissance='+val.lieuDeNaissance+'&adresse='+val.adresse+'&password=passer'+'&token='+localStorage.getItem('token'),{observe :'response'});

  }

  updateProfesseur(id,val:Professeur){
    return this.http.put(this.host+'/user/updateProfById/'+id+'?nom='+val.nom+'&telephone='+val.telephone+'&email='+val.email+'&login='+val.login+'&sexe='+val.sexe+'&prenom='+val.prenom+'&dateNaissance='+val.dateNaissance+'&lieuDeNaissance='+val.lieuDeNaissance+'&adresse='+val.adresse+'&password=passer'+'&token='+localStorage.getItem('token'),{observe :'response'});

  }
  addProfesseur(val:Professeur){
    return this.http.post(this.host+'/user/addProf'+'?nom='+val.nom+'&telephone='+val.telephone+'&email='+val.email+'&login='+val.login+'&sexe='+val.sexe+'&prenom='+val.prenom+'&dateNaissance='+val.dateNaissance+'&lieuDeNaissance='+val.lieuDeNaissance+'&adresse='+val.adresse+'&password=passer&classe_id='+val.classeId+'&matiere_id='+val.matiereId+'&token='+localStorage.getItem('token'),{observe :'response'});
  }
 affecterClasse(idclasse,idprof,idmatiere){
     return this.http.post(this.host+'/user/affecterProf/'+idprof+'?classe_id='+idclasse+'&matiere_id='+idmatiere+'&token='+localStorage.getItem('token'),{observe :'response'});
 }
  getAllEleveByProf(id){
    return this.http.get(this.host+'/getAllEleveByProf/?prof_id=='+id+'&token='+localStorage.getItem('token')
    );
  }
}
