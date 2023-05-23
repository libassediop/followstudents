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
        console.log(result)
        this.classes=result
      },
      err =>{
        console.log(err)
      }
    );
  }
  

  Addclasse() {
    console.log(this.classe);
    this.classe.libelle = this.formClasse.value.libelle;
    this.classe.niveau = this.formClasse.value.niveau;
    this.serviceClasse.addClasse(this.classe).subscribe(
      result => {
        console.log(result);
        this.modalService.dismissAll();
        if (result['sucsess']) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'classe ajouté avec success',
            showConfirmButton: false,
            timer: 1500
          });
          this.formClasse.reset()
          this.serviceClasse.getAllClasse().subscribe(
            (result) => {
              this.classes = result;
            },
            error => {
              console.log(error);
            }
          );
          this.formClasse.reset()
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
    console.log(this.idClasse , this.classe)
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
              this.classes = result;
            },
            error => {
              console.log(error);
            }
          );
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'classe modifié avec success',
            showConfirmButton: false,
            timer: 1500
          });
          this.formClasse.reset();
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
    this.formClasse.reset();
    this.classe={
      libelle:'',
      niveau:''
      }
  }


  currentPage = 1;
  pageSize = 6;

  get startIndex() {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex() {
    return Math.min(this.startIndex + this.pageSize, this.classes.length);
  }

  
golisteClasse(id: any) {

  this.route.navigate(['/pages/classe/listeEleveParClasse', id]);

}
}
