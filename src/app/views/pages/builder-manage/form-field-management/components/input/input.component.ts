import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfigInterface } from "./../../../../../../core/auth";
@Component({
	selector: "app-input",
	template: `
		<ng-container [ngSwitch]="field.textType">
			<ng-container *ngSwitchCase="'one'">
				<mat-form-field class="demo-full-width" [formGroup]="group">
					<input
						matInput
						[formControlName]="field.name"
						[placeholder]="field.name"
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
							*ngIf="
								group.get(field.name).hasError(validation.name)
							"
							>{{ validation.message }}</mat-error
						>
					</ng-container>
				</mat-form-field>
			</ng-container>

			<ng-container *ngSwitchCase="'multiple'">
				<mat-form-field class="demo-full-width" [formGroup]="group">
					<textarea
						matInput
						[placeholder]="field.name"
						[formControlName]="field.name"
					></textarea>
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
							*ngIf="
								group.get(field.name).hasError(validation.name)
							"
							>{{ validation.message }}</mat-error
						>
					</ng-container>
				</mat-form-field>
			</ng-container>
		</ng-container>
	`,
	styles: []
})
export class InputComponent implements OnInit {
	field: FieldConfigInterface;
	group: FormGroup;
	constructor() {}
	ngOnInit() {}
}
