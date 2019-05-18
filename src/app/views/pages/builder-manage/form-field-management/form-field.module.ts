import { DirectiveModule } from "./../../../../core/_base/metronic/directives/directive.module";
import { FormatCommaPipe } from "./../../../../core/_base/metronic/pipes/format-digit-comma";
import { NumericDirective } from "../../../../core/_base/metronic/index";
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
// controls components dynamic
import { InputComponent } from "./components/input/input.component";
import { ButtonComponent } from "./components/button/button.component";
import { SelectComponent } from "./components/select/select.component";
import { DateComponent } from "./components/date/date.component";
import { RadiobuttonComponent } from "./components/radiobutton/radiobutton.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { DynamicFieldDirective } from "./components/dynamic-field/dynamic-field.directive";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";
// form control components
import { TextFieldComponent } from "./controls/form-control-components/text-field/text-field.component";
import { SelectOptionComponent } from "./controls/form-control-components/select-option/select-option.component";
import { NumberFieldComponent } from "./controls/form-control-components/number-field/number-field.component";
import { NumberComponent } from "./components/number.component";

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
		MaterialModule,
		DirectiveModule
	],
	declarations: [
		FormFieldComponent,
		FormFieldListComponent,
		FormFieldEditComponent,
		ModalDialogComponent,
		InputComponent,
		NumberComponent,
		ButtonComponent,
		SelectComponent,
		DateComponent,
		RadiobuttonComponent,
		CheckboxComponent,
		DynamicFieldDirective,
		DynamicFormComponent,
		TextFieldComponent,
		SelectOptionComponent,
		NumberFieldComponent,
		NumericDirective,
		FormatCommaPipe
	],
	exports: [DynamicFieldDirective],
	entryComponents: [
		ModalDialogComponent,
		InputComponent,
		ButtonComponent,
		SelectComponent,
		DateComponent,
		RadiobuttonComponent,
		CheckboxComponent,
		NumberComponent
	]
})
export class FormFieldModule {}
