import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfigInterface } from "./../../../../../../core/auth";
@Component({
	selector: "app-lookup",
	template: `
		<div class="form-group kt-form__group">
			<mat-form-field [formGroup]="group">
				<mat-label>{{ field.label }}</mat-label>
				<mat-select
					[(ngModel)]="field.label"
					[formControlName]="field.name"
				>
					<mat-option value="{{ field.label }}">{{
						field.label
					}}</mat-option>
				</mat-select>
			</mat-form-field>
			<mat-form-field class="kt-padding-l-20">
				<mat-label>{{ field.modules }}</mat-label>
				<mat-select [(ngModel)]="field.modules">
					<mat-option value="{{ field.modules }}">{{
						field.modules
					}}</mat-option>
				</mat-select>
			</mat-form-field>
		</div>
	`,
	styles: []
})
export class LookupComponent implements OnInit {
	field: FieldConfigInterface;
	group: FormGroup;
	constructor() {}
	ngOnInit() {}
}