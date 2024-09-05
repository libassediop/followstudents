import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EleveService } from 'src/app/layouts/service/eleve.service';
import { InscriptionreinscriptionService } from 'src/app/layouts/service/inscriptionreinscription.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  detailEleve;
  constructor(private  route: ActivatedRoute,private serviceInscription: InscriptionreinscriptionService) { }

  ngOnInit(): void {
    let matricule: string;
    matricule = this.route.snapshot.params.matricule;
    this.serviceInscription.getInscriptionByEleve(matricule).subscribe(resp => {
      this.detailEleve = resp[0];
      console.log(resp[0])
    }, error1 => {
    });
  }

}
