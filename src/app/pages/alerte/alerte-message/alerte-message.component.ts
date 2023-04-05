import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-alerte-message',
  templateUrl: './alerte-message.component.html',
  styleUrls: ['./alerte-message.component.scss']
})
export class AlerteMessageComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  selectValue: string[];
  constructor() { }

  ngOnInit(): void {
    this.selectValue = ['Alaska', 'Hawaii', 'California', 'Nevada', 'Oregon', 'Washington', 'Arizona', 'Colorado', 'Idaho', 'Montana', 'Nebraska', 'New Mexico', 'North Dakota', 'Utah', 'Wyoming', 'Alabama', 'Arkansas', 'Illinois', 'Iowa'];

  }

}
