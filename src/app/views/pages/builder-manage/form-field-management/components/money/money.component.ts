import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfigInterface } from "./../../../../../../core/auth";
@Component({
	selector: "app-money",
	template: `
		<div class="">
			<mat-form-field [formGroup]="group">
				<span matPrefix>{{ unit }} &nbsp;</span>
				<input
					type="text"
					ktNumbericDerective
					numericType="number"
					ktInputToggleComma
					matInput
					placeholder="{{ field.name }}"
					[formControlName]="field.name"
					[placeholder]="field.name"
					(blur)="onBlur()"
				/>
				<mat-icon
					matSuffix
					*ngIf="field.description"
					matTooltip="{{ field.description }}"
					>local_atm</mat-icon
				>
				<ng-container
					*ngFor="let validation of field.validations"
					ngProjectAs="mat-error"
				>
					<mat-error
						*ngIf="group.get(field.name).hasError(validation.name)"
						>{{ validation.message }}</mat-error
					>
				</ng-container>
			</mat-form-field>
		</div>
	`,
	styles: []
})
export class MoneyDynamicComponent implements OnInit {
	field: FieldConfigInterface;
	group: FormGroup;
	unit: string = "";
	constructor() {}
	ngOnInit() {
		this.unit = this.field.unitMoney["unit"];
	}
	onBlur() {
		let controlValue = this.group.controls[this.field.name].value;
		if (!controlValue) {
			return;
		}
		let valueAddcomma = controlValue.replace(
			/\B(?=(\d{3})+(?!\d))/g,
			","
		);
		this.group.controls[this.field.name].setValue(valueAddcomma);
	}
}
