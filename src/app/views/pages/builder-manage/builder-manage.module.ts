import { SharedModule } from "./../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Base
import { PortletModule } from "../../partials/content/general/portlet/portlet.module";
import { PartialsModule } from "../../partials/partials.module";
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

// Module
import { ModuleListComponent } from "./module-manage/module-list/module-list.component";
import { ModuleAddComponent } from "./module-manage/module-add/module-add.component";
import { ModuleEditDialogComponent } from "./module-manage/module-edit/module-edit-dialog.component";

// Pipe, Directives
import {
	ReplaceSpacePipe
	// NumericDirective
} from "../../../core/_base/metronic/index";
import { FormFieldModule } from "./form-field-management/form-field.module";
import { SolutionEditDialogComponent } from "./solution-manage/controls/solution-edit-dialog/solution-edit-dialog.component";
import { ModuleDetailComponent } from "./module-manage/module-detail/module-detail.component";

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
			{
				path: "solutions/edit/:id",
				component: SolutionEditComponent
			},
			{
				path: "solutions/module/:id",
				component: ModuleDetailComponent
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
		SolutionEditDialogComponent,
		// Module
		ModuleListComponent,
		ModuleAddComponent,
		ModuleEditDialogComponent,
		// Pipe
		ReplaceSpacePipe,
		// NumericDirective
		ModuleDetailComponent
	],
	entryComponents: [
		SolutionAddComponent,
		ModuleAddComponent,
		SolutionEditDialogComponent,
		ModuleEditDialogComponent,
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
		FormFieldModule,
		SharedModule
	],
	// exports: [NumericDirective],
	providers: []
})
export class BuilderManageModule {}
