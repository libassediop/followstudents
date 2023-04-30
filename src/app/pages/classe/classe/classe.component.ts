import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  


   
  constructor(private serviceClasse : ClasseService, public fb: FormBuilder, private modalService : NgbModal) {
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
      },
      err =>{
        console.log(err)
      }
    );
  }
  

  Addclasse() {
    console.log(this.classe);
    this.classe.libelle = this.formClasse.value.libelle;
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
          this.serviceClasse.getAllClasse().subscribe(
            (result) => {
              this.classes = result;
            },
            error => {
              console.log(error);
            }
          );

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

}
