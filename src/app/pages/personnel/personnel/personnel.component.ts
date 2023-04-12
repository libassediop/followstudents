import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { listData } from 'src/app/services/data';
import { InvoiceList } from 'src/modeles/list.model';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  term:any;

  listData: InvoiceList[];

  constructor(private modalService : NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Invoices' }, { label: 'Invoice List', active: true }];

    /**
     * fetches the data
     */
    this._fetchData();
  }

  /**
   * fetches the invoice list data
   */
  private _fetchData() {
    this.listData = listData;
  }

  /**
   * Open extra large modal
   * @param exlargeModal extra large modal data
   */
 extraLarge(exlargeModal: any) {
  this.modalService.open(exlargeModal, { size: 'xl', centered: true });
}

}
