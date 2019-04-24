import { SolutionService } from "./../../../core/_services/kt-solution-services/solution.service";
import { DialogConfirmComponent } from "./../../../core/material-services/dialog-confirm/dialog-confirm.component";
import { SmStepperComponent } from "./controls/sm-stepper/sm-stepper.component";
import { CoreModule } from "./../../../core/core.module";
import { MaterialModule } from "./../material/material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SolutionListComponent } from "./solution-list/solution-list.component";
import { SolutionEditComponent } from "./solution-edit/solution-edit.component";
import { SolutionManagementComponent } from "./solution-management.component";
import { Routes, RouterModule } from "@angular/router";
import { SolutionListRoleComponent } from "./solution-list-role/solution-list-role.component";
import { SolutionModalDialogComponent } from "./controls/solution-modal-dialog/solution-modal-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PortletModule } from "../../partials/content/general/portlet/portlet.module";
import { PartialsModule } from "../../partials/partials.module";
import { CardListComponent } from "./controls/card-list/card-list.component";
import { ModuleModule } from "../module-management/module.module";

const routes: Routes = [
	{
		path: "",
		component: SolutionManagementComponent,
		children: [
			{
				path: "",
				redirectTo: "solution",
				pathMatch: "full"
			},
			{
				path: "solution",
				component: SolutionListComponent
			},
			// access by admin
			{
				path: "list-role",
				component: SolutionListRoleComponent
			},
			{
				path: "solution-edit/:id",
				component: SolutionEditComponent
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
		SolutionModalDialogComponent,
		CardListComponent,
		SmStepperComponent,
		DialogConfirmComponent
	],
	entryComponents: [SolutionModalDialogComponent, DialogConfirmComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),
		MaterialModule,
		PortletModule,
		PartialsModule,
		CoreModule,
		ModuleModule
	],
	providers: [SolutionService]
})
export class SolutionManagementModule {}
