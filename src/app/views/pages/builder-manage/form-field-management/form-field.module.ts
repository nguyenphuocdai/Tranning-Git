import { SharedModule } from "./../../../../shared/shared.module";
import { DirectiveModule } from "./../../../../core/_base/metronic/directives/directive.module";
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
import { TextFieldComponent } from "./controls/form-control-components/text-field/text-field.component";
import { SelectOptionComponent } from "./controls/form-control-components/select-option/select-option.component";
import { NumberFieldComponent } from "./controls/form-control-components/number-field/number-field.component";
import {
	MatSnackBarRef,
	MAT_SNACK_BAR_DATA,
	MatDialogRef,
	MAT_DIALOG_DATA
} from "@angular/material";
import { LookUpComponent } from "./controls/form-control-components/look-up/look-up.component";
import { FuploadImageComponent } from "./controls/form-control-components/fupload-image/fupload-image.component";
import { MoneyComponent } from "./controls/form-control-components/money/money.component";
import { CButtonComponent } from "./controls/form-control-components/c-button/c-button.component";
import { DatePickerComponent } from "./controls/form-control-components/date-picker/date-picker.component";
import { CRadioComponent } from "./controls/form-control-components/c-radio/c-radio.component";

const routes: Routes = [
	{
		path: "",
		component: FormFieldComponent,
		children: [
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
		DirectiveModule,
		SharedModule
	],
	declarations: [
		FormFieldComponent,
		FormFieldListComponent,
		FormFieldEditComponent,
		ModalDialogComponent,

		DatePickerComponent,
		CRadioComponent,
		// RadiobuttonComponent,

		TextFieldComponent,
		SelectOptionComponent,
		NumberFieldComponent,
		// NumericDirective,
		LookUpComponent,
		FuploadImageComponent,
		MoneyComponent,
		CButtonComponent
		// InputDirective
	],
	exports: [],
	entryComponents: [ModalDialogComponent],
	providers: [
		{
			provide: MatSnackBarRef,
			useValue: {}
		},
		{
			provide: MAT_SNACK_BAR_DATA,
			useValue: {} // Add any data you wish to test if it is passed/used correctly
		},
		{ provide: MatDialogRef, useValue: {} },
		{ provide: MAT_DIALOG_DATA, useValue: [] }
	]
})
export class FormFieldModule {}
