import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfigInterface } from "../../../../../../core/auth";
@Component({
	selector: "app-number",
	template: `
		<mat-form-field class="demo-full-width" [formGroup]="group">
			<input
				matInput
				[formControlName]="field.name"
				[placeholder]="field.name"
				[type]="field.inputType"
				(input)="onCheckMinMax(field.minValue, field.maxValue)"
			/>
			<mat-hint *ngIf="isShowMinMaxError"
				>Vui lòng nhập giá trị trong khoảng {{ field.minValue }} -
				{{ field.maxValue }}
			</mat-hint>
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
export class NumberComponent implements OnInit {
	field: FieldConfigInterface;
	group: FormGroup;
	isShowMinMaxError: boolean;
	constructor() {}
	ngOnInit() {}
	onCheckMinMax(min, max) {
		this.isShowMinMaxError = false;
		// let isRequired = this.field
		let previewInput = this.group.controls[this.field.name].value;

		if (
			min === undefined ||
			max === undefined ||
			previewInput === undefined
		) {
			return;
		}
		let fMinValue = parseFloat(min.replace(",", ""));
		let fMaxValue = parseFloat(max.replace(",", ""));
		previewInput = parseFloat(previewInput.replace(",", ""));

		// if (isRequired === false) {
		// 	this.isShowMinMax = true;
		// }

		if (previewInput < fMinValue && previewInput < fMaxValue) {
			this.isShowMinMaxError = true;
		}
	}
}
