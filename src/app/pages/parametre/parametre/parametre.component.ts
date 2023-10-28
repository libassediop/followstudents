import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.scss']
})
export class ParametreComponent implements OnInit {


  breadCrumbItems: Array<{}>;
  selectValue = [];
  stateValue = [];

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Checkout', active: true }];

    this.selectValue = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola',
      'Anguilla', 'Antarctica', 'Argentina', 'Hawaii', 'California', 'Colombia', 'Congo', 'Dominica', 'Denmark', 'Nevada', 'Oregon',
      'Washington', 'Ecuador', 'Idaho', 'Montana', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Nicaragua', 'New Caledonia', 'North Dakota',
      'Tonga', 'Tunisia', 'Thailand', 'Turkey', 'Illinois', 'Tuvalu', 'Uganda', 'Uruguay', 'United Arab Emirates', 'United Kingdom', 'Venezuela', 'Zimbabwe',
      'Uruguay'];

    this.stateValue = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Montana', 'Nevada', 'New Mexico', 'New York', 'North Dakota', 'Texas', 'Virginia', 'Wisconsin', 'Wyoming']
  }

}
