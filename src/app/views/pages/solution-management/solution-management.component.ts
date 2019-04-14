import { Component, OnInit } from '@angular/core';
import { Solution } from '../../../core/auth';

@Component({
  selector: 'kt-solution',
  templateUrl: './solution-management.component.html',
  styleUrls: ['./solution-management.component.scss']
})
export class SolutionManagementComponent implements OnInit {

  private solution: Solution;
  constructor() { }

  ngOnInit() {
  }

}
