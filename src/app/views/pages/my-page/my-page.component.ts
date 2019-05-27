import { ExportJsonToExcelService } from './../../../shared/lib/export-json-to-excel/export-json-to-excel.service';
import { ExportAsConfig } from './../../../shared/lib/ngx-export-as/export-as-config.model';
import { ExportAsService } from './../../../shared/lib/ngx-export-as/export-as.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit {
  config: ExportAsConfig = {
    type: 'pdf',
    elementId: 'mytable',
  };
  persons: Person[];
  constructor( private exportAsService: ExportAsService, private exportJsonToExcelService: ExportJsonToExcelService) {
    this.exportJsonToExcelService = exportJsonToExcelService;
    this.persons = PERSONS;
   }

  ngOnInit() {
  }
  // exportAs(type) {
  //   this.config.type = type;
  //   this.exportAsService.save(this.config, 'myFile');
  //   // this.exportAsService.get(this.config).subscribe(content => {
  //   //   console.log(content);
  //   // });
  // }
  exportToExcel(event) {
    this.exportJsonToExcelService.exportAsExcelFile(this.persons, 'persons');
  }
}


export class Person {
  id: number;
  name: String;
  surname: String;
  age: number;
}


export const PERSONS: Person[] = [
  {
      id: 1,
      name: 'Very long name which needs to be wrapped',
      surname: 'Novicky',
      age: 21
  },
  {
      id: 2,
      name: 'Another long name that won\'t be wrapped',
      surname: 'Tracz',
      age: 12
  },
  {
      id: 3,
      name: 'Steve',
      surname: 'Laski',
      age: 38
  }
];