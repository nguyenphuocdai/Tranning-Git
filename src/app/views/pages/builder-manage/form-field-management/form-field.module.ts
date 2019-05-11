import { DragDropComponent } from "./controls/drag-drop/drag-drop.component";
import { CoreModule } from "../../../../core/core.module";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormFieldComponent } from "./form-field.component";
import { FormFieldListComponent } from "./form-field-list-builder/form-field-list.component";
import { MaterialModule } from "../../material/material.module";
import { PartialsModule } from "../../../partials/partials.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { HighlightModule } from "ngx-highlightjs";
import { ModalDialogComponent } from "./controls/modal-dialog/modal-dialog.component";
import { FormFieldEditComponent } from "./form-field-edit/form-field-edit.component";
import { InputComponent } from "./components/input/input.component";
import { ButtonComponent } from "./components/button/button.component";
import { SelectComponent } from "./components/select/select.component";
import { DateComponent } from "./components/date/date.component";
import { RadiobuttonComponent } from "./components/radiobutton/radiobutton.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { DynamicFieldDirective } from "./components/dynamic-field/dynamic-field.directive";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";

const routes: Routes = [
	{
		path: "",
		component: FormFieldComponent,
		children: [
			// {
			// 	path: "",
			// 	redirectTo: "form-list",
			// 	pathMatch: "full"
			// },
			{
				path: "builder/:id",
				component: FormFieldListComponent
			}
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule.withConfig({
			warnOnNgModelWithFormControl: "never"
		}),
		PartialsModule,
		CoreModule,
		PerfectScrollbarModule,
		HighlightModule,
		RouterModule.forChild(routes),
		MaterialModule
	],
	declarations: [
		FormFieldComponent,
		FormFieldListComponent,
		FormFieldEditComponent,
		DragDropComponent,
		ModalDialogComponent,
		InputComponent,
		ButtonComponent,
		SelectComponent,
		DateComponent,
		RadiobuttonComponent,
		CheckboxComponent,
		DynamicFieldDirective,
		DynamicFormComponent
	],
	exports: [DynamicFieldDirective],
	entryComponents: [
		ModalDialogComponent,
		InputComponent,
		ButtonComponent,
		SelectComponent,
		DateComponent,
		RadiobuttonComponent,
		CheckboxComponent
	]
})
export class FormFieldModule {}
