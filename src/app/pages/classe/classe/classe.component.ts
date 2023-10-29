import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClasseService } from 'src/app/layouts/service/classe.service';
import { Classe } from 'src/app/layouts/service/general.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {

  term:any;
   formClasse : FormGroup
update: any;
idClasse;
  modif: string;
  searchTerm: any;
  public filteredClasses: any = [];

  activeSortColumn: string = 'libelle';  // Colonne de tri par défaut
  activeSortColumnNiveau: string = 'niveau'; 
  isAscending: boolean = false;
  isAscendingNiveau: boolean = false;      
   
  constructor(private route: Router,private serviceClasse : ClasseService, public fb: FormBuilder, private modalService : NgbModal) {
    this.formClasse = this.fb.group({
      libelle: ['', Validators.required],
      niveau: ['', Validators.required]
    });
   }
   public classes:any = [] ;
  classe : Classe = {
    libelle:'',
    niveau:''
    };

  ngOnInit(): void {
    this.serviceClasse.getAllClasse().subscribe(
      (result)=>{
        this.classes=result
        this.filteredClasses = result;
        this.filterClasses();  // Appliquer le filtre initial
        this.sortClasses();    // Trier les classes initiales
      },
      err =>{
        console.log(err)
      }
    );
  }
  

  Addclasse() {
    this.classe.libelle = this.formClasse.value.libelle;
    this.classe.niveau = this.formClasse.value.niveau;
    this.serviceClasse.addClasse(this.classe).subscribe(
      result => {
       
        this.modalService.dismissAll();
        if (result['sucsess']) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Classe ajoutée avec succèss',
            showConfirmButton: false,
            timer: 1500
          });
          this.formClasse.reset()
          this.serviceClasse.getAllClasse().subscribe(
            (result) => {
              this.filteredClasses = result;
            },
            error => {
              console.log(error);
            }
          );
          this.formClasse.reset()
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops... L\'ajout de la classe a échoué',
            text: 'Erreur : '+result['message']
          });
        }
        this.classe = {
          libelle: '',
          niveau : ''
        };
      },
      error => {
        console.log(error)
        
      }
    )
  }
 UpdateClasse(idM ){
    this.update=true;
    this.serviceClasse.getClasseById(idM).subscribe(value => {
    this.formClasse.setValue({
     libelle: value[0].libelle,
     niveau: value[0].niveau,
     });
    this.idClasse=idM;
    },error1 => {

    })
    this.classe.libelle ='';
    this.classe.niveau ='';
    }

  ModifierClasse (){
    this.classe.libelle = this.formClasse.value.libelle;
    this.classe.niveau = this.formClasse.value.niveau;
    this.serviceClasse.modifierClasse(this.idClasse, this.classe).subscribe(
      result => {
        this.classe = {
          libelle: '',
          niveau:''
          
        };
        if (result['success']) {
          this.modalService.dismissAll();
          this.formClasse.reset();
          this.serviceClasse.getAllClasse().subscribe(
            (result) => {
              this.filteredClasses = result;
              this.update=false;
            },
            error => {
              console.log(error);
            }
          );
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Classe modifiée avec succèss',
            showConfirmButton: false,
            timer: 1500
          });
          this.formClasse.reset();
        }

      else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Une erreur est survenue lors de la modification de la classe : '+ result['message'],
          });
        }
      },
    
    );
  }
 
  supprimerClasse (id : any){
   
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas revenir en arrière !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#f46a6a',
        confirmButtonText: 'Oui, continuer!'
      }).then((result) => {
        if (result.value) {
          this.serviceClasse.supprimerClasseById(id).subscribe(
            (value) => {
              if (value['success']) {
                Swal.fire('Suppression!', 'La classe a été supprimée avec succès.', 'success');
                this.serviceClasse.getAllClasse().subscribe(
                  (result)=>{
                    this.filteredClasses=result
                  },
                  err =>{
                    console.log(err)
                  }
                );
              }
              else{
                Swal.fire('Erreur!', 'La classe ne peut pas être supprimée.', 'error');
              }
            }
          );
        }
      });
    }
  

  annuler() {
    this.update=false;
    this.formClasse.reset();
    this.classe={
      libelle:'',
      niveau:''
      }
  }


  currentPage = 1;
  pageSize = 15;

  get startIndex() {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex() {
    return Math.min(this.startIndex + this.pageSize, this.classes.length);
  }

  
golisteClasse(id: any) {

  this.route.navigate(['/pages/classe/listeEleveParClasse', id]);

}

imprimerClasses(): void {
  window.print();
}

filterClasses() {
  // Vérifiez si 'term' est défini
  if (this.term) {
    // Filtrer les classes en fonction du terme de recherche
    this.filteredClasses = this.classes.filter((classe) =>
      classe.libelle.toLowerCase().includes(this.term.toLowerCase())
    );
  } else {
    // Si 'term' n'est pas défini, utilisez simplement la liste complète de classes
    this.filteredClasses = this.classes;
  }
}

sortClasses(column: string = 'libelle') {
  // Mettez à jour le code pour trier les classes en fonction de la colonne
  this.filteredClasses.sort((a, b) => {
    const valueA = a[column].toLowerCase();
    const valueB = b[column].toLowerCase();

    // Compare les valeurs en fonction de l'ordre de tri
    let comparison = 0;
    if (valueA > valueB) {
      comparison = 1;
    } else if (valueA < valueB) {
      comparison = -1;
    }

    // Inverse l'ordre de tri si nécessaire
    return this.isAscending ? comparison : -comparison;
  });

  // Mettez à jour la colonne de tri active
  this.activeSortColumn = column;
  

  // Inverse l'ordre de tri pour la prochaine fois
  this.isAscending = !this.isAscending;
}



sortNiveau(column: string = 'niveau') {
  // Mettez à jour le code pour trier les classes en fonction de la colonne
  this.filteredClasses.sort((a, b) => {
    const valueA = a[column].toLowerCase();
    const valueB = b[column].toLowerCase();

    // Compare les valeurs en fonction de l'ordre de tri
    let comparison = 0;
    if (valueA > valueB) {
      comparison = 1;
    } else if (valueA < valueB) {
      comparison = -1;
    }

    // Inverse l'ordre de tri si nécessaire
    return this.isAscendingNiveau ? comparison : -comparison;
  });

  // Mettez à jour la colonne de tri active
  this.activeSortColumnNiveau = column;


  // Inverse l'ordre de tri pour la prochaine fois
  this.isAscendingNiveau = !this.isAscendingNiveau;
}
}
