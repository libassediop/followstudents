import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { ClasseService } from 'src/app/layouts/service/classe.service';
import { Inscription, Mensualite } from 'src/app/layouts/service/general.model';
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
    mensualite:0

};
classes : any = [];
formInscription: FormGroup;
val: string = '0';
navItem1: HTMLElement;
navItem2: HTMLElement;
btnSuivant: HTMLElement;
payerPremierMois: boolean = true;
montantPremierMois : number=0;
montantNext : any;


mensualite: Mensualite = {
  moisId: '',
   montant:'',
   eleveId:'',
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
      adresse: [{ value: '', disabled: false }],
      telephone: [{ value: '', disabled: false }],
      classeId: [{ value: '', disabled: false }, Validators.required],
      nomParent: [{ value: '', disabled: false }, Validators.required],
      prenomParent: [{ value: '', disabled: false }, Validators.required],
      telephoneParent: [{ value: '', disabled: false }],
      fonctionParent: [{ value: '', disabled: false }],
      montant: [{ value: '', disabled: true }, this.validateNumber],
      avance: ['', [Validators.required, this.validateNumber]],
      emailParent: [{ value: '', disabled: false }],
      mensualite: [{ value: '', disabled: true }, Validators.required],
      totalapayer: [{ value: '', disabled: true }, Validators.required],
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
     // console.log(this.matiere);
     this.classeService.getClasseById(this.formInscription.value.classeId).subscribe(value => {
   
      const montantInscription = parseFloat(value[0].montant_inscription);
      const montantMensualite = parseFloat(value[0].montant_mensuel);
      const total = parseFloat(value[0].montant_inscription) + parseFloat(value[0].montant_mensuel);
    //  this.montant = parseFloat(value[0].montant_inscription);
     this.formInscription.get('montant').setValue(montantInscription);
     this.formInscription.get('mensualite').setValue(montantMensualite);
     this.formInscription.get('totalapayer').setValue(total);
     this.montantNext = montantInscription;

    if(this.payerPremierMois){
   
    
       if(parseFloat(this.formInscription.value.avance)<=montantInscription ){
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
         else if(parseFloat(this.formInscription.value.avance)<=0){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Inscription échouée : Le montant reçu ne doit pas être inférieur ou égal à 0',
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
  }

  onNavChangePre(event: any) {
    this.active = 1;
  }



  addInscription() {
   
    this.inscription.nom = this.formInscription.value.nom;
    this.inscription.prenom = this.formInscription.value.prenom;
    this.inscription.sexe = this.formInscription.value.sexe;
    this.inscription.dateNaissance = this.formInscription.value.dateNaissance;
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
    this.inscription.montant = this.formInscription.value.montant;
    this.inscription.mensualite = this.formInscription.value.mensualite;


    if(this.montantPremierMois>0)
    this.inscription.avance =this.montantNext;
    else 
    this.inscription.avance = this.formInscription.value.avance;

    this.serviceInscription.addInscription(this.inscription).subscribe(
      result => {
        console.log(result);
        if (result['success']) {

          const lims = result;
          
        //  console.log(result['success'].eleve.id);
         // console.log(result['success']['eleve'].id);
          console.log(result['eleve'].id);
          if(this.montantPremierMois>0){
            this.mensualite.moisId='1',
            this.mensualite.eleveId=result['eleve'].id;
            this.mensualite.montant=this.montantPremierMois.toString();
            console.log(this.mensualite)
            this.serviceInscription.addMensualite(this.mensualite).subscribe(res => {
              console.log(res);
              if (res['success']) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Inscription et mensualité payées avec succès',
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
          }
          else {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Inscription payée avec succès',
              showConfirmButton: false,
              timer: 4500
            });
          }
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
    if (this.formInscription.value.nom =="" || this.formInscription.value.prenom =="" || this.formInscription.value.sexe ==""  || this.formInscription.value.classeId=="" ||this.formInscription.value.montant==''|| this.formInscription.value.avance =='' ||this.formInscription.value.mensualite=='')
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

    this.classeService.getClasseById(this.formInscription.value.classeId).subscribe(value => {
   
      const montantInscription = parseFloat(value[0].montant_inscription);
        const montantMensualite = parseFloat(value[0].montant_mensuel);
        const total = parseFloat(value[0].montant_inscription) + parseFloat(value[0].montant_mensuel);
      //  this.montant = parseFloat(value[0].montant_inscription);
       this.formInscription.get('montant').setValue(montantInscription);
       this.formInscription.get('mensualite').setValue(montantMensualite);
       this.formInscription.get('totalapayer').setValue(total);
  
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


}
