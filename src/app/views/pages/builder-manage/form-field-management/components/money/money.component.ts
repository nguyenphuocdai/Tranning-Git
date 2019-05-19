import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfigInterface } from "./../../../../../../core/auth";
@Component({
	selector: "app-money",
	template: `
		<mat-form-field [formGroup]="group">
			<span matPrefix>{{ field.unitMoney.unit }} &nbsp;</span>
			<input
				type="text"
                [(ngModel)]="previewInput"
                #previewInputRef
				ktNumbericDerective
				numericType="number"
				ktInputToggleComma
				matInput
				placeholder="{{field.name}}"
				maxlength="24"
				[formControlName]="field.name"
				[placeholder]="field.name"
				[type]="field.inputType"
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
            <mat-hint align="end">{{previewInputRef.value.length}} / 32</mat-hint>
		</mat-form-field>
	`,
	styles: []
})
export class MoneyDynamicComponent implements OnInit {
	field: FieldConfigInterface;
	group: FormGroup;
	constructor() {}
	ngOnInit() {
		console.log(this.field.unitMoney);
	}
}

// <mat-hint align="start" *ngIf="field.checked"
// >{{ errorMessageRef?.value }}
// </mat-hint>
// <mat-form-field class="demo-full-width" [formGroup]="group">
// <input
//     matInput
//     [formControlName]="field.name"
//     [placeholder]="field.name"
//     [type]="field.inputType"
// />
// <ng-container
//     *ngFor="let validation of field.validations"
//     ngProjectAs="mat-error"
// >
//     <mat-error
//         *ngIf="group.get(field.name).hasError(validation.name)"
//         >{{ validation.message }}</mat-error
//     >
// </ng-container>
// </mat-form-field>