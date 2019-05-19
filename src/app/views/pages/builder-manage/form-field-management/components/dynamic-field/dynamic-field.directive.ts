import { MoneyDynamicComponent } from "./../money/money.component";
import {
	ComponentFactoryResolver,
	Directive,
	Input,
	OnInit,
	ViewContainerRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfigInterface } from "./../../../../../../core/auth";
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { SelectComponent } from "../select/select.component";
import { DateComponent } from "../date/date.component";
import { RadiobuttonComponent } from "../radiobutton/radiobutton.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { NumberComponent } from "../number/number.component";
import { LookupComponent } from "../lookup/look-up.component";

const componentMapper = {
	input: InputComponent,
	button: ButtonComponent,
	select: SelectComponent,
	date: DateComponent,
	radiobutton: RadiobuttonComponent,
	checkbox: CheckboxComponent,
	number: NumberComponent,
	lookup: LookupComponent,
	money: MoneyDynamicComponent
};
@Directive({
	selector: "[dynamicField]"
})
export class DynamicFieldDirective implements OnInit {
	@Input() field: FieldConfigInterface;
	@Input() group: FormGroup;
	componentRef: any;
	constructor(
		private resolver: ComponentFactoryResolver,
		private container: ViewContainerRef
	) {}
	ngOnInit() {
		const factory = this.resolver.resolveComponentFactory(
			componentMapper[this.field.type]
		);
		this.componentRef = this.container.createComponent(factory);
		this.componentRef.instance.field = this.field;
		this.componentRef.instance.group = this.group;
	}
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1) + "Component";
	}
}
