import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClasseService } from 'src/app/layouts/service/classe.service';
import { Matiere } from 'src/app/layouts/service/general.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.scss']
})
export class MatiereComponent implements OnInit {
   term:any;
   formM : FormGroup
update: any;
idMatiere;
  modif: string;
  searchTerm: any;
  


   
  constructor(private serviceMatiere : ClasseService, public fb: FormBuilder, private modalService : NgbModal) {
    this.formM = this.fb.group({
      libelle: ['', Validators.required],
    });
   }
   public matieres:any = [] ;
  matiere : Matiere = {
      libelle:'',
    };

  ngOnInit(): void {
    this.serviceMatiere.getAllMatiere().subscribe(
      (result)=>{
        this.matieres=result
      },
      err =>{
        console.log(err)
      }
    );
  }
  

  Addmatiere() {
    console.log(this.matiere);
    this.matiere.libelle = this.formM.value.libelle;
    this.serviceMatiere.addMatiere(this.matiere).subscribe(
      result => {
        console.log(result);
        this.modalService.dismissAll();
        if (result['sucsess']) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'matiere ajouté avec success',
            showConfirmButton: false,
            timer: 1500
          });
          this.serviceMatiere.getAllMatiere().subscribe(
            (result) => {
              this.matieres = result;
            },
            error => {
              console.log(error);
            }
          );

        }
        this.matiere = {
          libelle: '',
        };
      },
      error => {
        console.log(error)
      }
    )
  }

  UpdateMatiere(idM ){
    this.update=true;
    this.serviceMatiere.getMatiereById(idM).subscribe(value => {
    this.formM.setValue({
     libelle: value[0].libelle,
     });
    this.idMatiere=idM;
    },error1 => {

    })
    this.matiere.libelle ='';
    }

  Modifiermatiere (){
    console.log(this.idMatiere , this.matiere)
    this.matiere.libelle = this.formM.value.libelle;
    this.serviceMatiere.modifierMatiere(this.idMatiere, this.matiere).subscribe(
      result => {
        this.matiere = {
          libelle: '',
          
        };
        if (result['success']) {
          this.modalService.dismissAll();
          this.serviceMatiere.getAllMatiere().subscribe(
            (result) => {
              this.matieres = result;
            },
            error => {
              console.log(error);
            }
          );
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'matiere modifié avec success',
            showConfirmButton: false,
            timer: 1500
          });
          this.formM.reset();
        }

      else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Une erreur est survenue lors de la modification de la matière .',
          });
        }
      },
    
    );
  }
 
 

   annuler() {
    this.update=false;
    this.formM.reset();
    this.matiere={
      libelle:'',
      }
  }
  
  searchFilter(e) {
    const searchStr = e.target.value;
    if (searchStr.length === 0) {
      this.serviceMatiere.getAllMatiere().subscribe(
        (result) => {
          this.matieres = result;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.matieres = this.matieres.filter((matiere) => {
        return matiere.libelle.toLowerCase().startsWith(searchStr.toLowerCase());
      });
    }
  }

  print() {
    window.print();
  }
  currentPage = 1;
  pageSize = 6;

  get startIndex() {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex() {
    return Math.min(this.startIndex + this.pageSize, this.matieres.length);
  }
}
