import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Base
import { PortletModule } from "../../partials/content/general/portlet/portlet.module";
import { PartialsModule } from "../../partials/partials.module";
import { DialogConfirmComponent } from "../../../core/material-services/dialog-confirm/dialog-confirm.component";
import { CoreModule } from "../../../core/core.module";
import { MaterialModule } from "../material/material.module";

// Builder
import { BuilderManageComponent } from "./builder-manage.component";

// Solution
import { CardListComponent } from "./solution-manage/controls/card-list/card-list.component";
import { SolutionAddComponent } from "./solution-manage/solution-add/solution-add.component";
import { SolutionListComponent } from "./solution-manage/solution-list/solution-list.component";
import { SolutionEditComponent } from "./solution-manage/solution-edit/solution-edit.component";
import { SmStepperComponent } from "./solution-manage/controls/sm-stepper/sm-stepper.component";

// Solution Service
import { SolutionService } from "../../../core/_services/kt-solution-services/solution.service";

// Module
import { ModuleListComponent } from "./module-manage/module-list/module-list.component";
import { ModuleAddComponent } from "./module-manage/module-add/module-add.component";
import { ModuleEditComponent } from "./module-manage/module-edit/module-edit.component";

// Field
import { FormFieldEditComponent } from "./form-field-management/form-field-edit/form-field-edit.component";

// Pipe, Directives
import {
	ReplaceSpacePipe,
	// NumericDirective
} from "../../../core/_base/metronic/index";
import { FormFieldModule } from "./form-field-management/form-field.module";

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
		// Solution
		SolutionListComponent,
		SolutionEditComponent,
		SolutionAddComponent,
		CardListComponent,
		SmStepperComponent,
		DialogConfirmComponent,
		// Module
		ModuleListComponent,
		ModuleAddComponent,
		ModuleEditComponent,
		// Pipe
		ReplaceSpacePipe,
		// NumericDirective
	],
	entryComponents: [
		SolutionAddComponent,
		DialogConfirmComponent,
		ModuleAddComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),
		MaterialModule,
		PortletModule,
		PartialsModule,
		CoreModule,
		FormFieldModule
	],
	// exports: [NumericDirective],
	providers: [SolutionService]
})
export class BuilderManageModule {}
