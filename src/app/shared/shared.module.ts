import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedComponent } from "./shared.component";

import { FormFieldService } from "./_services/kt-form-field-services/form-field.service";
import { ModuleService } from "./_services/kt-module-services/module.service";
import { SolutionService } from "./_services/kt-solution-services/solution.service";

@NgModule({
	imports: [CommonModule],
	declarations: [SharedComponent],
	exports: [],
	providers: [FormFieldService, ModuleService, SolutionService]
})
export class SharedModule {}
