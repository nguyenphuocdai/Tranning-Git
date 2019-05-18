import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputToggleCommaDirective } from "./toggle-comma-input";
@NgModule({
	imports: [CommonModule],
	declarations: [InputToggleCommaDirective],
	exports: [InputToggleCommaDirective]
})
export class DirectiveModule {}
