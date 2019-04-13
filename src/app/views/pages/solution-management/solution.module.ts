import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolutionListComponent } from './solution-list/solution-list.component';
import { SolutionEditComponent } from './solution-edit/solution-edit.component';
import { SolutionComponent } from './solution.component';

@NgModule({
  declarations: [
    SolutionComponent,
    SolutionListComponent,
    SolutionEditComponent],
  imports: [
    CommonModule
  ]
})
export class SolutionModule { }
