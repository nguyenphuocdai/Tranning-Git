import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfigInterface } from "./../../../../../../core/auth";
@Component({
	selector: "app-input",
	template: `
		<mat-form-field class="demo-full-width" [formGroup]="group">
			<input
				matInput
				[formControlName]="field.name"
				[placeholder]="field.name"
				[type]="field.inputType"
			/>
			<mat-icon
					*ngIf="field.description"
					color="primary"
					matSuffix
					matTooltip="{{ field.description }}"
					>help</mat-icon
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
	`,
	styles: []
})
export class InputComponent implements OnInit {
	field: FieldConfigInterface;
	group: FormGroup;
	constructor() {}
	ngOnInit() {}
}
