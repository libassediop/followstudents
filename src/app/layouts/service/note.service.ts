import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AddAbsence, Contenue } from './general.model';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private host:string ='https://samastock.alwaysdata.net/yole/api';
  //private host:string ='http://127.0.0.1:8000/api';
  constructor(private http:HttpClient) { }


addAbsenceYole(abs: AddAbsence,id){
  return this.http.post(this.host+'/absence/addAbsence?dateDebut='+abs.date_debut+'&dateFin='+abs.date_fin+'&eleveId='+id+'&matiereId='+abs.matiere_id+'&userIdA='+abs.user_ida+'&token='+localStorage.getItem('token'),AddAbsence);

}

  public AddNote(contenue:Contenue){

    return this.http.post(this.host+'/note/addNote?Note='+contenue.noteEleve+'&eleveId='+contenue.idEleve+'&matiereId='+contenue.idMatiere+'&userIdA='+localStorage.getItem('id')+'&idSemestre=1&devoirExam=devoir'+'&token='+localStorage.getItem('token'),{observe :'response'});
  }

  public SendSMS(idclasse,message){
    return this.http.post(this.host+'/message/sendMessageByClasse/'+idclasse+'?userIdA='+localStorage.getItem('id')+'&token='+localStorage.getItem('token')+'&message='+message,{observe :'response'});
  }


  public getAllAbsenceByEleve(matricule){

    return this.http.get(this.host+'/absence/getAbsenceByEleve?matricule='+matricule+'&token='+localStorage.getItem('token'));
  }

  public getAllNoteByEleve(matricule){

    return this.http.get(this.host+'/note/getNoteByEleve?matricule='+matricule+'&token='+localStorage.getItem('token'));
  }
  public getAllAbsenceByClasse(idClasse){

    return this.http.get(this.host+'/absence/getAbsenceByClasse/'+idClasse+'?token='+localStorage.getItem('token'));
  }
  public getAllDateAbsenceByClasse(idClasse){
    return this.http.get(this.host+'/absence/getDateAbsenceByClasse/'+idClasse+'?token='+localStorage.getItem('token'));
  }
  public getAllNoteByClasse(idClasse){

    return this.http.get(this.host+'/note/getNoteByClasse/'+idClasse+'?token='+localStorage.getItem('token'));
  }
}
