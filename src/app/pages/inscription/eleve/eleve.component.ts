import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { ClasseService } from 'src/app/layouts/service/classe.service';
import {Historique, Inscription, Mensualite} from 'src/app/layouts/service/general.model';
import { InscriptionreinscriptionService } from 'src/app/layouts/service/inscriptionreinscription.service';
import { ProfesseurService } from 'src/app/layouts/service/professeur.service';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.scss']
})


export class EleveComponent implements OnInit {
  @ViewChild('nav') nav: NgbNav;
  active = 1;
  montant: number;
 // typesubmit: boolean;
  breadCrumbItems: Array<{}>;
  trouveTel = false;
  inscription: Inscription = {
    id:'',
    dateInscription:'',
    nom: '',
    prenom: '',
    classeId: '',
    email: '',
    adresse: '',
    avance: 0,
    dateNaissance: '',
    emailParent: '',
    fonctionParent: '',
    lieuDeNaissance: '',
    montant: 0,
    nationalite: '',
    nomParent: '',
    prenomParent: '',
    sexe: '',
    sexeParent: '',
    telephone: '',
    telephoneParent: '',
    typeDePayement: 1,
    mensualite:0,
    montantTotal:0,
    reductionIns:0,
    ReductionMens:0,
    offreIns:false,
    offreInsMois:false
};
  historique:Historique={
    moisId: '',
    eleveId: '',
    montant:0,
    montantTotal:0,
    reduction:0,
    recu:0,
    classeId: '',
    mensualiteId: '',
    reliquat:0,
    anneescolaireId: '',
    restant:0

  }
classes : any = [];
formInscription: FormGroup;
val: string = '0';
navItem1: HTMLElement;
navItem2: HTMLElement;
btnSuivant: HTMLElement;
payerPremierMois: boolean = true;
montantPremierMois : number=0;
offrirMensualite : boolean=false;
offrirInscription : boolean=false;
offrirInscriptionetmois : boolean=false;
montantNext : any;
montanttotalinscription : any;
montanttotalmensualite : any;


mensualite: Mensualite = {
  moisId: '',
   montant:0,
   reduction:0,
   eleveId:'',
  reliquat:0,
   userId:localStorage.getItem('id')
 };

  constructor(private zone: NgZone,private changeDetectorRef: ChangeDetectorRef,private route:Router,private professeurService : ProfesseurService,   private fb : FormBuilder, private classeService: ClasseService, private serviceInscription: InscriptionreinscriptionService) {

   }

   validateNumber(control) {
    const numberPattern = /^[0-9]*$/;
    if (control.value && !numberPattern.test(control.value)) {
      return { invalidNumber: true };
    }
    return null;
  }
  ngOnInit(): void {
    this.formInscription = this.fb.group({
      // Ajoutez ici les contrôles de vot
      nom: [{ value: '', disabled: false }, Validators.required],
      prenom: [{ value: '', disabled: false }, Validators.required],
      sexe: [{ value: '', disabled: false }, Validators.required],
      dateNaissance: [{ value: '', disabled: false }],
      dateInscription: [{ value: '', disabled: false }],
      adresse: [{ value: '', disabled: false }],
      telephone: [{ value: '', disabled: false }],
      classeId: [{ value: '', disabled: false }, Validators.required],
      nomParent: [{ value: '', disabled: false }, Validators.required],
      prenomParent: [{ value: '', disabled: false }, Validators.required],
      telephoneParent: [{ value: '', disabled: false }],
      fonctionParent: [{ value: '', disabled: false }],
      montant: [{ value: '', disabled: true }, this.validateNumber],
      avance: ['0', [Validators.required, this.validateNumber]],
      emailParent: [{ value: '', disabled: false }],
      mensualite: [{ value: '', disabled: true }, Validators.required],
      totalapayer: [{ value: '', disabled: true }, Validators.required],
      reductionInscription: ['0',{  disabled: false }, Validators.required],
      reductionMensualite: [{ value: '0', disabled: false }, Validators.required],
      lieu: [{ value: '', disabled: false }],
      nationalite: [{ value: '', disabled: false }],
    })
    this.classeService.getAllClasse().subscribe(
      resp => {
          this.classes = resp;
      }, error1 => {
          console.log(error1)
      });


  }

  limitNumberLength(event: Event) {
    const input = event.target as HTMLInputElement;
    const maxLength = 10; // Changer à la longueur maximale souhaitée
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  }

  maxDate(): string {
  const today = new Date();
  // Formater la date au format ISO
  return today.toISOString().split('T')[0];
}


  onNavChange(event: any) {
    console.log(parseFloat(this.formInscription.get('avance').value));
    let reductionInscription = parseFloat(this.formInscription.value.reductionInscription);
    let reductionMensualite = parseFloat(this.formInscription.value.reductionMensualite);
    console.log(reductionInscription)
    console.log(reductionMensualite)
     this.classeService.getClasseById(this.formInscription.value.classeId).subscribe(value => {
      const montantInscription = parseFloat(value[0].montant_inscription);
      const montantMensualite = parseFloat(value[0].montant_mensuel);
      let total = parseFloat(this.formInscription.get('totalapayer').value)
     this.montantNext = montantInscription;
       if(reductionInscription  && reductionInscription == montantInscription && this.typeInscription!=1 ){
        console.log('ttt')
         Swal.fire({
           position: 'top-end',
           icon: 'error',
           title: 'Inscription échouée : La reduction sur l\'inscription ne doit pas être égal au montant de l\'insription ou cocher Offir Inscription',
           showConfirmButton: false,
           timer: 4500
         });
         return;
       }
       if(reductionInscription  && reductionInscription > montantInscription){
         Swal.fire({
           position: 'top-end',
           icon: 'error',
           title: 'Inscription échouée : La reduction sur l\'inscription ne  doit pas être supérieur au montant de l\'insription',
           showConfirmButton: false,
           timer: 4500
         });
         return;
       }
       if(reductionMensualite  && reductionMensualite > montantMensualite) {
         Swal.fire({
           position: 'top-end',
           icon: 'error',
           title: 'Inscription échouée : La reduction sur la mensualité ne  doit pas être supérieur au montant de la mensualité',
           showConfirmButton: false,
           timer: 4500
         });
         return;
       }

    if(this.payerPremierMois){
      let montantpaiement=montantInscription;
      if(reductionInscription){
        montantpaiement = montantpaiement-reductionInscription;
      }
       if(parseFloat(this.formInscription.value.avance)<=montantpaiement && !this.offrirInscription ){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Inscription échouée : Le montant reçu être doit être supérieur au montant de l\'insription ou décocher le payement du premier mois',
          showConfirmButton: false,
          timer: 4500
        });
       }
       else if(parseFloat(this.formInscription.value.avance)>total){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Inscription échouée : Le montant reçu ne doit pas être supérieur au montant total',
          showConfirmButton: false,
          timer: 4500
        });
       }

       else {
       this.montantPremierMois = parseFloat(this.formInscription.value.avance) - montantInscription
       this.active = 2;
      }

      }

      else {

        if(parseFloat(this.formInscription.value.avance)>montantInscription){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Inscription échouée : Le montant reçu doit être inférieur au moment de l\'insription ou cocher le payement du premier mois',
            showConfirmButton: false,
            timer: 4500
          });
         }
         else if(parseFloat(this.formInscription.value.avance)<0){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Inscription échouée : Le montant reçu ne doit pas être inférieur à 0',
            showConfirmButton: false,
            timer: 4500
          });
         }
         else {

           this.active = 2;


         }
      }
    }, error1 => {
      console.log(error1);
    });

   console.log(parseFloat(this.formInscription.get('avance').value));
  }

  onNavChangePre(event: any) {
    this.active = 1;
  }



  addInscription() {
    this.inscription.nom = this.formInscription.value.nom;
    this.inscription.prenom = this.formInscription.value.prenom;
    this.inscription.sexe = this.formInscription.value.sexe;
    this.inscription.dateNaissance = this.formInscription.value.dateNaissance;
    this.inscription.dateInscription = this.formInscription.value.dateInscription;
    this.inscription.adresse = this.formInscription.value.adresse;
    this.inscription.nationalite = this.formInscription.value.nationalite;
    this.inscription.lieuDeNaissance = this.formInscription.value.lieu;
    this.inscription.telephone = this.formInscription.value.telephone;
    this.inscription.classeId = this.formInscription.value.classeId;
    this.inscription.nomParent = this.formInscription.value.nomParent;
    this.inscription.prenomParent = this.formInscription.value.prenomParent;
    this.inscription.emailParent = this.formInscription.value.emailParent;
    this.inscription.telephoneParent = this.formInscription.value.telephoneParent;
    this.inscription.fonctionParent = this.formInscription.value.fonctionParent;
   // this.inscription.montant = parseFloat(this.formInscription.get('montant').value)
   this.inscription.montant = parseFloat(this.montanttotalinscription);
   // this.inscription.mensualite = parseFloat(this.formInscription.get('mensualite').value)
    this.inscription.mensualite = parseFloat(this.montanttotalmensualite)
    this.inscription.montantTotal = parseFloat(this.formInscription.get('totalapayer').value)
    this.inscription.reductionIns = parseFloat(this.formInscription.get('reductionInscription').value)
    this.inscription.ReductionMens = parseFloat(this.formInscription.get('reductionMensualite').value)
    this.inscription.offreIns = this.offrirInscription;
    this.inscription.offreInsMois = this.offrirInscriptionetmois;
    this.inscription.avance =parseFloat(this.formInscription.get('avance').value);

    this.serviceInscription.addInscription(this.inscription).subscribe(
      result => {
        console.log(result);
        if (result['success']) {
          this.mensualite.moisId='1',
            this.mensualite.eleveId=result['eleve'].id;
          if(this.payerPremierMois && !this.offrirInscriptionetmois ){
            this.mensualite.montant=this.inscription.avance-this.inscription.montant;
          }
          if(this.offrirInscription){
            this.mensualite.montant=this.inscription.avance;
          }
          this.mensualite.reduction=this.inscription.ReductionMens;
          this.serviceInscription.addMensualite(this.mensualite).subscribe(res => {
              if (res['success']) {
                this.historique.eleveId= res['mensualite'].eleveId;
                  this.historique.reduction= res['mensualite'].reduction;
                  this.historique.reliquat=0;
                this.historique.moisId= res['mensualite'].moisId;
                this.historique.montantTotal=res['mensualite'].montant - res['mensualite'].reduction;
                this.historique.montant= res['mensualite'].montant;
                this.historique.recu= res['mensualite'].avance;
                this.historique.restant= res['mensualite'].restant;
                this.historique.anneescolaireId= res['mensualite'].anneeScolaireId;
                this.historique.mensualiteId= res['mensualite'].id;
                this.historique.classeId=this.inscription.classeId;
                this.serviceInscription.addHistorique(this.historique).subscribe(
                  (resp)=>{console.log(resp)}, err=>{console.log(err)}
                )
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Inscription effectuée avec succès',
                  showConfirmButton: false,
                  timer: 1500
                });

               this.formInscription.reset();
               this.route.navigate(['/pages/inscription/listInscription']);
              }
              else{
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: 'Erreur lors du paiement de la mensualité: '+res['message'],
                  showConfirmButton: false,
                  timer: 1500
                });

              }

            }
          );
                this.formInscription.reset();
                this.route.navigate(['/pages/inscription/listInscription']);

        }
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Inscription échouée :'+ result['message'] + ' au montant de l\'inscription',
            showConfirmButton: false,
            timer: 4500
          });

        }


      },
      error => {
        console.log(error)
      }
    )

  }

/*   testTelephone($event: any) {
    // console.log(this.personnel.telephone)
    this.professeurService.verifieTel(this.formInscription.value.telephone).subscribe(value => {
      console.log(value)
        if (value['succes'] == true) {
            this.trouveTel = true;
        } else {
            this.trouveTel = false;
        }
    }, error1 => {
      console.log(error1)
    })
  } */


  onvalideEleve() {
    if (this.formInscription.value.nom =="" || this.formInscription.value.prenom =="" || this.formInscription.value.sexe ==""  || this.formInscription.value.classeId=="" ||this.formInscription.value.montant==''|| this.formInscription.value.avance < 0 ||this.formInscription.value.mensualite=='')
      return true
    else
      return false;
  }


  onvalidateInscription() {
    if (this.formInscription.value.nomParent =="" || this.formInscription.value.prenomParent =="" || this.formInscription.value.telephoneParent =="" )
      return true
    else
      return false;
  }



  recuperation($event: Event) {
    let reductionInscription = parseFloat(this.formInscription.value.reductionInscription);
    let reductionMensualite = parseFloat(this.formInscription.value.reductionMensualite);
    this.classeService.getClasseById(this.formInscription.value.classeId).subscribe(value => {
      const montantInscription = parseFloat(value[0].montant_inscription);
        const montantMensualite = parseFloat(value[0].montant_mensuel);
        let total = parseFloat(value[0].montant_inscription) + parseFloat(value[0].montant_mensuel);
        if (this.offrirInscription){
          console.log(this.formInscription.value.reductionInscription)
          total = total -  parseFloat(value[0].montant_inscription)
        }
        if (this.offrirInscriptionetmois){
          total = total - total;
        }
        if(reductionInscription){
          total = total-reductionInscription;
        }
        if(reductionMensualite){
          total = total-reductionMensualite;
        }
      //  this.montant = parseFloat(value[0].montant_inscription);
      if(this.offrirInscription || this.offrirInscriptionetmois)
       this.formInscription.get('montant').setValue(''); 
      else
      this.formInscription.get('montant').setValue(montantInscription);
       this.montanttotalinscription = montantInscription;

       if(this.offrirMensualite || this.offrirInscriptionetmois)
       this.formInscription.get('mensualite').setValue(''); 
      else
      this.formInscription.get('mensualite').setValue(montantMensualite);
      this.montanttotalmensualite = montantMensualite;
       this.formInscription.get('totalapayer').setValue(total);

       this.formInscription.get('reductionInscription').setValue(montantInscription);
       this.formInscription.get('reductionMensualite').setValue(montantMensualite);

  }, error1 => {
    console.log(error1);
  });

}

formatMontant(montant: number): string {
  // Vérifiez d'abord si montant est défini et n'est pas null
  if (montant !== null && montant !== undefined) {
    // Utilisez la méthode toLocaleString avec l'option 'fr-FR' pour formater le montant avec un espace comme séparateur des milliers.
    return montant.toLocaleString('fr-FR');
  } else {
    // Gérez le cas où montant est null ou non défini, par exemple, en renvoyant une chaîne vide.
    return '';
  }
}

isSuivantDisabled = false; // Par défaut, le bouton n'est pas désactivé
  typeInscription=1;

checkMontantRecu($event: Event) {
  const avance = parseFloat(this.formInscription.value.avance);
  const montantString = this.formInscription.value.montant;

  // Vérifie si montantString est une chaîne numérique
  if (!isNaN(parseFloat(montantString))) {
    const montant = parseFloat(montantString);


    if (avance > montant) {
      this.isSuivantDisabled = true;
    } else {
      this.isSuivantDisabled = false;
    }
  } else {
    // La valeur montantString n'est pas numérique, vous pouvez gérer cette situation ici.
  }
}


  offrirIns($event: any) {
    if(this.offrirInscription){
      this.offrirInscriptionetmois=false;
      this.disableCheckbox=false;
      this.formInscription.get('reductionInscription').setValue('');
      this.formInscription.get('reductionInscription').disable();
      this.formInscription.get('reductionMensualite').enable();
      this.formInscription.get('avance').enable();
      if(this.formInscription.value.classeId){
        this.recuperation($event);
      }
    }
    else{
      if(this.formInscription.value.classeId){
        let totalApayer = parseFloat(this.formInscription.get('totalapayer').value);
        this.classeService.getClasseById(this.formInscription.value.classeId).subscribe(value => {
          let montantInscription = parseFloat(value[0].montant_inscription);
          console.log(montantInscription)
          this.formInscription.get('totalapayer').setValue(totalApayer + montantInscription);
        }, error1 => {
          console.log(error1);
        });
      }
      this.formInscription.get('reductionInscription').enable();
    }
  }
  disableCheckbox: boolean = false;
  offrirInsEtmois($event: any) {
    if(this.offrirInscriptionetmois){
      this.offrirInscription=false;
      this.payerPremierMois=true;
      this.disableCheckbox=true;
      this.formInscription.get('reductionInscription').setValue('');
      this.formInscription.get('reductionMensualite').setValue('');
      this.formInscription.get('reductionInscription').disable();
      this.formInscription.get('reductionMensualite').disable();
      this.formInscription.get('avance').setValue('');
      this.formInscription.get('avance').disable();
      if(this.formInscription.value.classeId){
        this.recuperation($event);
      }
    }
    else{
      if(this.formInscription.value.classeId){

        this.classeService.getClasseById(this.formInscription.value.classeId).subscribe(value => {
          let montantInscription = parseFloat(value[0].montant_inscription);
          let montantMensualite = parseFloat(value[0].montant_mensuel);
          console.log(montantInscription)
          this.formInscription.get('totalapayer').setValue(montantMensualite + montantInscription);
        }, error1 => {
          console.log(error1);
        });
      }
      this.disableCheckbox=false;
      this.formInscription.get('reductionInscription').enable();
      this.formInscription.get('reductionMensualite').enable();
      this.formInscription.get('avance').enable();
    }
  }

  reductionIns($event: any) {
    if(this.formInscription.value.classeId){
      this.recuperation($event);
    }
  }

  reductionMens($event: any) {
    if(this.formInscription.value.classeId){
      this.recuperation($event);
    }
  }

  checkPayerMois($event: any) {
   let totalApayer = parseFloat(this.formInscription.get('totalapayer').value);
   console.log(totalApayer)

    this.classeService.getClasseById(this.formInscription.value.classeId).subscribe(value => {
    let montantMensualite = parseFloat(value[0].montant_mensuel);
      console.log(montantMensualite)
      if(!this.payerPremierMois){
        this.formInscription.get('totalapayer').setValue(totalApayer - montantMensualite);
      }else{
        this.formInscription.get('totalapayer').setValue(totalApayer + montantMensualite);
      }
    }, error1 => {
      console.log(error1);
    });



  }

  changeInscription($event: any) {
    if(this.typeInscription==1){
      this.formInscription.get('reductionInscription').setValue('0');
      this.formInscription.get('reductionMensualite').setValue('0');
      this.formInscription.get('reductionInscription').enable();
      this.formInscription.get('reductionMensualite').enable();
      this.formInscription.get('avance').enable();
      this.offrirInscription=false;
      this.disableCheckbox=false;
      this.offrirInscriptionetmois=false;
    }
  }
}
