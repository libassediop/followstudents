import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Historique, HistoriqueDetteIns, Inscription, Mensualite, Reinscription} from './general.model';
// import { ReinscriptionComponent } from '../reinscription/reinscription.component';

@Injectable({
  providedIn: 'root'
})

export class InscriptionreinscriptionService {


  private host:string ='https://samastock.alwaysdata.net/yole/api';
 // private host:string ='http://127.0.0.1:8000/api';
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
    const offreIns = inscri.offreIns ? 1 : 0;
    const offreInsMois = inscri.offreInsMois ? 1 : 0;
    return this.http.post(this.host+'/inscription/addInscription?etat=1+&typeDePayement=1&caisseId=1&nom='+inscri.nom+'&dateNaissance='+inscri.dateNaissance+'&prenom='+inscri.prenom+'&nationalite='+inscri.nationalite+'&lieuDeNaissance='+inscri.lieuDeNaissance+'&adresse='+inscri.adresse+'&email='+inscri.email+
    '&telephone='+inscri.telephone+'&sexe='+inscri.sexe+'&nomParent='+inscri.nomParent+'&prenomParent='+inscri.prenomParent+'&emailParent='+inscri.emailParent+'&telephoneParent='+inscri.telephoneParent+'&sexeParent='+inscri.sexeParent+'&fonctionParent='+inscri.fonctionParent+'&classeId='+inscri.classeId+'&userId='+localStorage.getItem('id')
      +'&montant_recu='+inscri.avance+'&montantTotal='+inscri.montantTotal+'&reductionIns='+inscri.reductionIns+'&dateInscription='+inscri.dateInscription+'&ReductionMens='+inscri.ReductionMens+'&offreIns='+offreIns+'&offreInsMois='+offreInsMois+'&montantPreniermois='+inscri.mensualite
      +'&token='+localStorage.getItem('token'),{observe :'response'});
  }

  detteInscription(idinscriptionID,montant_recu){
    return this.http.post(this.host+'/inscription/reglerRestantInscription/'+idinscriptionID+'?montant_recu='+montant_recu+'&token='+localStorage.getItem('token'),{observe :'response'});
  }

  detteMensuelle(idMensuel,montant_recu){
    return this.http.post(this.host+'/mensualite/reglerRestantMensualite/'+idMensuel+'?token='+localStorage.getItem('token')+'&montant_recu='+montant_recu,{observe :'response'});
  }


  addReinscription(reinscri : Reinscription){
    return this.http.post(this.host+'/reinscription/addReInscription?matricule='+reinscri.matricule+'&classeId='+reinscri.classeId+'&avance='+reinscri.avance+'&userId='+reinscri.userId+'&typeDePayement='+reinscri.typeDePayement+'&caisseId=1'+'?token='+localStorage.getItem('token'),reinscri);
  }

  addMensualite(mensualite:Mensualite) {

    return this.http.post(this.host+'/mensualite/payerMensualite?token='+localStorage.getItem('token')+'&eleveId='+mensualite.eleveId+'&moisId='+mensualite.moisId+'&montant_recu='+mensualite.montant+'&userId='+localStorage.getItem('id'),{observe :'response'});
   //  return this.http.post(this.host+'/mensualite/payerMensualite?token='+localStorage.getItem('token'),mensualite);
  }

  addHistorique(historique:Historique) {
    return this.http.post(this.host+'/mensualite/addHistorique?token='+localStorage.getItem('token')+'&eleveId='+historique.eleveId+'&moisId='+historique.moisId+'&classeId='+historique.classeId+'&mensualiteId='+historique.mensualiteId+'&montant='+historique.montant+'&montantTotal='+historique.montantTotal+'&reduction='+historique.reduction+'&recu='+historique.recu+'&reliquat='+historique.reliquat+'&restant='+historique.restant+'&anneescolaireId='+historique.anneescolaireId+'&userId='+localStorage.getItem('id'),{observe :'response'});
  }
  addHistoriqueDetteins(historique:HistoriqueDetteIns) {
    return this.http.post(this.host+'/inscription/addHistoriqueDette?token='+localStorage.getItem('token')+'&id_ins='+historique.idIns+'&monantApayer='+historique.montantApayer+'&montantResant='+historique.montantResttant+'&monantRecu='+historique.montantRecu,{observe :'response'});
  }
  getHistoriqueByEleveByClasse(idEleve,idClasse){
    return this.http.get(this.host+'/mensualite/getHistoriqueByEleveByClasse?token='+localStorage.getItem('token')+'&idClasse='+idClasse+'&eleveId='+idEleve);
  }

  getHistoriqueDetteByIns(idIns){
    return this.http.get(this.host+'/inscription/getHistoriqueDetteByIns?token='+localStorage.getItem('token')+'&idIns='+idIns);
  }

  getMensualiteImpayerByEleve(id){
    return this.http.get(this.host+'/mensualite/getMensualiteImpayerByEleve/'+id+'?token='+localStorage.getItem('token'));

  }

  getMensualitePayerByEleve(id){
    return this.http.get(this.host+'/mensualite/getMensualitePayerByEleve/'+id+'?token='+localStorage.getItem('token'));
  }
  getMoisRestantApayerByEleve(id){
    return this.http.get(this.host+'/mensualite/getMoisRestantApayerByEleve/'+id+'?token='+localStorage.getItem('token'));

  }
  getStatClasseEleveProf(){
    return this.http.get(this.host+'/statClasseEleveProf/?token='+localStorage.getItem('token'));

  }


}
