import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Classe, Matiere} from './general.model';
@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  private host:string ='https://samastock.alwaysdata.net/yole/api';
  constructor(private http:HttpClient) { }

  getAllClasse(){
    return this.http.get(this.host+'/classe'+'?token='+localStorage.getItem('token'));
  }

  listClassesWithMontantMois(){
    return this.http.get(this.host+'/listClassesWithMontantMois'+'?token='+localStorage.getItem('token'));
  }

  addMontantMoisbyClasses(moisId,libelleMois,classeId,montant,idAnneeScolaire){
    return this.http.post(this.host+'/ajoutMontantMensByClasseByMois?moisId='+moisId+'&libelleMois='+libelleMois+'&classeId='+classeId+'&montant='+montant+'&anneeScolaireId='+idAnneeScolaire+'&token='+localStorage.getItem('token'), {observe :'response'});
  }
  updateMontantMoisbyClasses(moisId,libelleMois,classeId,montant,idAnneeScolaire,id){
    return this.http.put(this.host+'/updateMontantMensByClasseByMois?moisId='+moisId+'&libelleMois='+libelleMois+'&classeId='+classeId+'&montant='+montant+'&anneeScolaireId='+idAnneeScolaire+'&token='+localStorage.getItem('token')+'&id='+id, {observe :'response'});
  }

  getClasseById(id){
    return this.http.get(this.host+'/classe/getClasseById/'+id+'?token='+localStorage.getItem('token'));
  }

  getAllClasseAvecInscris(){
    return this.http.get(this.host+'/classe/getAllClasseAvecInsByAnneeScolaire'+'?token='+localStorage.getItem('token'));
  }

  addClasse(cl:Classe){
    return this.http.post(this.host+'/classe'+'?token='+localStorage.getItem('token'),cl);
  }

  modifierClasse(id,classe : Classe){
    return this.http.put(this.host+'/classe/'+id+'?token='+localStorage.getItem('token'),classe);
  }

  getHistoriqueListeEleveByClasse(){
 return(this.host+'/eleve/getHistoriqueListeEleveByClasse'+'?token='+localStorage.getItem('token'))
  }

  getAllMatiere(){
    return this.http.get(this.host+'/matiere'+'?token='+localStorage.getItem('token'));
  }

  getMatiereById(id){
    return this.http.get(this.host+'/matiere/getMatiereById/'+id+'?token='+localStorage.getItem('token'));
  }

  modifierMatiere(id,matiere : Matiere){
    return this.http.put(this.host+'/matiere/'+id+'?token='+localStorage.getItem('token'),matiere);
  }

  supprimerMatiereById(id){
    return this.http.delete(this.host+'/matiere/'+id+'?token='+localStorage.getItem('token'));
  }

  supprimerClasseById(id){
    return this.http.delete(this.host+'/classe/'+id+'?token='+localStorage.getItem('token'));
  }

  getMatiereByClasse(idClasse){
    return this.http.get(this.host+'/matiere/getMatiereByClasse/'+idClasse+'?token='+localStorage.getItem('token'));
  }
  addMatiere(matiere:Matiere){
      return this.http.post(this.host+'/matiere'+'?token='+localStorage.getItem('token'),matiere);
  }
  getParentByNum(numero){
      return this.http.get(this.host+'/parent/getParentByTel?telephone='+numero+'&token='+localStorage.getItem('token'))
  }


}
