import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolutionListComponent } from './solution-list/solution-list.component';
import { SolutionEditComponent } from './solution-edit/solution-edit.component';
import { SolutionManagementComponent } from './solution-management.component';
import { Routes, RouterModule } from '@angular/router';
import { SolutionListRoleComponent } from './solution-list-role/solution-list-role.component';
import { SolutionModalDialogComponent } from './controls/solution-modal-dialog/solution-modal-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: SolutionManagementComponent,
		children: [
			{
				path: '',
				redirectTo: 'solution',
				pathMatch: 'full'
			},
			{
				path: 'solution',
				component: SolutionListComponent
			},
			// access by admin
			{
				path: 'list-role',
				component: SolutionListRoleComponent
			}
		]
	}
];

@NgModule({
  declarations: [
    SolutionManagementComponent,
    SolutionListComponent,
		SolutionEditComponent,
		SolutionListRoleComponent,
		SolutionModalDialogComponent
	],
	entryComponents : [
		SolutionModalDialogComponent
	],
  imports: [
		CommonModule,
    FormsModule,
    ReactiveFormsModule,
		RouterModule.forChild(routes),
		MaterialModule
  ]
})

export class SolutionManagementModule { }
