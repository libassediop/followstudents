import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EleveService } from 'src/app/layouts/service/eleve.service';
import { NoteService } from 'src/app/layouts/service/note.service';
import { FormsModule } from '@angular/forms';
import { Filter } from 'ng2-smart-table';

@Component({
  selector: 'app-details-eleve',
  templateUrl: './detailseleve.component.html',
  styleUrls: ['./details-eleve.component.scss']
})
export class DetailsEleveComponent implements OnInit {

  term:any;
  
  matricule;
  donneesEleve;
  eleves;
  nbAbsences;
  filter = '';
  constructor(private route : ActivatedRoute , private serviceEleve : EleveService , private serviceNote : NoteService, private router : Router) { }

  ngOnInit(): void {
    this.matricule = this.route.snapshot.params.matricule;

    this.serviceEleve.getEleveByMatricule(this.matricule).subscribe(resp => {
      console.log(resp)
      this.donneesEleve = resp;
  }, error1 => {
  });
    this.serviceNote.getAllNoteByEleve(this.matricule).subscribe(resp => {
      this.eleves = resp;
      console.log(resp);
  }, error1 => {
  });
  this.matricule = this.route.snapshot.params.matricule;
  this.serviceNote.getAllAbsenceByEleve(this.matricule).subscribe(value => {
    this.eleves = value , console.log(value)
            this.nbAbsences = this.eleves.length;
    console.log(value);
}, error1 => {
});
}

currentPage = 1;
  pageSize = 3;

  get startIndex() {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex() {
    return Math.min(this.startIndex + this.pageSize, this.eleves.length);
  }

  searchAbsence(e) {
    let myDates = this.eleves.map((e) => e.date_absence);

    let searchDate = new Date('');
    let searchTime = searchDate.getTime();

    let result = myDates.filter(d => d.date.getTime() >= searchTime);

    console.log(result); 

  }

 
  returnlisteClasse(id: any) {

    this.router.navigate(['/pages/classe/listeEleveParClasse', id]);
  
  }


}
