import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfigInterface } from "./../../../../../../core/auth";
@Component({
	selector: "app-lookup",
	template: `
           <mat-form-field [formGroup]="group">
               <mat-label>{{ field.label }}</mat-label>
               <mat-select [(ngModel)]="field.label" [formControlName]="field.name">
                   <mat-option value="{{ field.label }}">{{ field.label }}</mat-option>
               </mat-select>
		   </mat-form-field>
		   <mat-form-field class="kt-padding-l-20">
               <mat-label>{{ field.modules }}</mat-label>
               <mat-select [(ngModel)]="field.modules">
                   <mat-option value="{{ field.modules }}">{{ field.modules }}</mat-option>
               </mat-select>
           </mat-form-field>
	`,
	styles: []
})
export class LookupComponent implements OnInit {
	field: FieldConfigInterface;
	group: FormGroup;
	constructor() {}
	ngOnInit() {}
}


// <mat-form-field class="demo-full-width" [formGroup]="group">
// 			<input
// 				matInput
// 				[formControlName]="field.name"
// 				[placeholder]="field.name"
// 				[type]="field.inputType"
// 			/>
// 			<ng-container
// 				*ngFor="let validation of field.validations"
// 				ngProjectAs="mat-error"
// 			>
// 				<mat-error
// 					*ngIf="group.get(field.name).hasError(validation.name)"
// 					>{{ validation.message }}</mat-error
// 				>
// 			</ng-container>
//         </mat-form-field>
        




// <mat-form-field class="kt-padding-l-20">
// <mat-label>{{fieldTypeRef.value}}</mat-label>
// <mat-select [(ngModel)]="fieldTypeRef.value">
//     <mat-option value="{{fieldTypeRef.value}}">{{fieldTypeRef.value}}</mat-option>
// </mat-select>
// <mat-hint *ngIf="rfField.get('required').value">{{ rfField.get('errorMessage').value }}</mat-hint>
// </mat-form-field>
// <mat-icon *ngIf="descriptionRef.value" color="primary" matSuffix matTooltip="{{
// descriptionRef.value
// }}">help</mat-icon>