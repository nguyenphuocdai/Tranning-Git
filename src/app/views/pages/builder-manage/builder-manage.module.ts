import { SolutionService } from "../../../core/_services/kt-solution-services/solution.service";
import { DialogConfirmComponent } from "../../../core/material-services/dialog-confirm/dialog-confirm.component";
import { SmStepperComponent } from "./solution-manage/controls/sm-stepper/sm-stepper.component";
import { CoreModule } from "../../../core/core.module";
import { MaterialModule } from "../material/material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SolutionListComponent } from "./solution-manage/solution-list/solution-list.component";
import { SolutionEditComponent } from "./solution-manage/solution-edit/solution-edit.component";
import { BuilderManageComponent } from "./builder-manage.component";
import { Routes, RouterModule } from "@angular/router";
import { SolutionModalDialogComponent } from "./solution-manage/controls/solution-modal-dialog/solution-modal-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PortletModule } from "../../partials/content/general/portlet/portlet.module";
import { PartialsModule } from "../../partials/partials.module";
import { CardListComponent } from "./solution-manage/controls/card-list/card-list.component";
import { ModuleListComponent } from "./module-manage/module-list/module-list.component";

const routes: Routes = [
	{
		path: "",
		component: BuilderManageComponent,
		children: [
			{
				path: "",
				redirectTo: "solutions",
				pathMatch: "full"
			},
			{
				path: "solutions",
				component: SolutionListComponent
			},
			// access by admin
			// {
			// 	path: "list-role",
			// 	component: SolutionListRoleComponent
			// },
			{
				path: "solutions/edit/:id",
				component: SolutionEditComponent
			}
		]
	}
];

@NgModule({
	declarations: [
		BuilderManageComponent,
		// solution
		SolutionListComponent,
		SolutionEditComponent,
		SolutionModalDialogComponent,
		CardListComponent,
		SmStepperComponent,
		DialogConfirmComponent,
		// module
		ModuleListComponent
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
		CoreModule
	],
	providers: [SolutionService]
})
export class BuilderManageModule {}
