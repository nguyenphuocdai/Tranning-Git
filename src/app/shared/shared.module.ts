import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedComponent } from "./shared.component";

import { FormFieldService } from "./_services/kt-form-field-services/form-field.service";
import { ModuleService } from "./_services/kt-module-services/module.service";
import { SolutionService } from "./_services/kt-solution-services/solution.service";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { DynamicFieldDirective } from "./components/dynamic-field/dynamic-field.directive";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";
import { InputComponent } from "./components/input/input.component";
import { NumberComponent } from "./components/number/number.component";
import { ButtonComponent } from "./components/button/button.component";
import { SelectComponent } from "./components/select/select.component";
import { DateComponent } from "./components/date/date.component";
import { LookupComponent } from "./components/lookup/look-up.component";
import { MoneyDynamicComponent } from "./components/money/money.component";
import { FuploadDynamicComponent } from "./components/fupload-dynamic/fupload-dynamic.component";
import { StickyControlComponent } from "./components/sticky-control/sticky-control.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "../views/pages/material/material.module";
import { MaterialFileUploadComponent } from "./components/material-file-upload/material-file-upload.component";
import { PreviewImageComponent } from './components/preview-image/preview-image.component';
import { DialogConfirmDeleteComponent } from "../core/material-services/dialog-confirm/dialog-confirm.component";
import { PartialsModule } from "../views/partials/partials.module";

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule, PartialsModule],
	declarations: [
		SharedComponent,
		CheckboxComponent,
		DynamicFieldDirective,
		DynamicFormComponent,
		InputComponent,
		NumberComponent,
		ButtonComponent,
		SelectComponent,
		DateComponent,
		LookupComponent,
		MoneyDynamicComponent,
		FuploadDynamicComponent,
		StickyControlComponent,
		DynamicFieldDirective,
		MaterialFileUploadComponent,
		PreviewImageComponent,
		DialogConfirmDeleteComponent
	],
	exports: [
		CheckboxComponent,
		DynamicFieldDirective,
		DynamicFormComponent,
		InputComponent,
		NumberComponent,
		ButtonComponent,
		SelectComponent,
		DateComponent,
		LookupComponent,
		MoneyDynamicComponent,
		FuploadDynamicComponent,
		StickyControlComponent,
		DynamicFieldDirective,
		MaterialFileUploadComponent,
		PreviewImageComponent,
		DialogConfirmDeleteComponent
	],
	entryComponents: [
		InputComponent,
		ButtonComponent,
		SelectComponent,
		DateComponent,
		CheckboxComponent,
		NumberComponent,
		LookupComponent,
		MoneyDynamicComponent,
		FuploadDynamicComponent,
		PreviewImageComponent,
		DialogConfirmDeleteComponent
	],
	providers: [FormFieldService, ModuleService, SolutionService]
})
export class SharedModule {}
