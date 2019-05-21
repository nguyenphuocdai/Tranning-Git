import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfigInterface } from "../../../../../../core/auth";
import { TypesUtilsService } from "../../../../../../core/_base/crud";
@Component({
	selector: "app-number",
	template: `
		<div class="form-group kt-form__group">
			<mat-form-field [formGroup]="group">
				<input
					matInput
					[formControlName]="field.name"
					[placeholder]="field.name"
					[type]="field.inputType"
					(input)="onCheckMinMax(field.minValue, field.maxValue)"
					(focus)="onFocus()"
					(blur)="onBlur()"
					ktNumbericDerective
					numericType="{{ field.type }}"
				/>
				<mat-hint *ngIf="isShowMinMaxError" class="mat-error"
					>Vui lòng nhập trong khoảng {{ field.minValue }} -
					{{ field.maxValue }}
				</mat-hint>
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
		</div>
	`,
	styles: [
		`
			.mat-error {
				color: #fd397a !important;
			}
		`
	]
})
export class NumberComponent implements OnInit {
	field: FieldConfigInterface;
	group: FormGroup;
	isShowMinMaxError: boolean;
	constructor(private _typeUltiService: TypesUtilsService) {}
	ngOnInit() {}
	onCheckMinMax(min, max) {
		this.isShowMinMaxError = true;
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
		let floatInput = parseFloat(previewInput.replace(",", ""));
		if (floatInput > fMinValue && floatInput < fMaxValue) {
			this.isShowMinMaxError = false;
		}
	}
	onFocus() {
		let value = this.group.controls[this.field.name].value;
		if (value === undefined || value === null || value.length <= 3) {
			return;
		}
		this.group.controls[this.field.name].setValue(
			this._typeUltiService.digitRemoveComma(value)
		);
	}
	onBlur() {
		let value = this.group.controls[this.field.name].value;
		if (value === undefined || value === null || value.length <= 3) {
			return;
		}
		this.group.controls[this.field.name].setValue(
			this._typeUltiService.digitAddComma(value)
		);
	}
}
