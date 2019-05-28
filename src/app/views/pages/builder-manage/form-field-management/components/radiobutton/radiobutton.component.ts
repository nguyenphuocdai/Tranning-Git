import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfigInterface } from "./../../../../../../core/auth";
@Component({
	selector: "app-radiobutton",
	template: `
		<div class="demo-full-width margin-top" [formGroup]="group">
			<label class="radio-label-padding pr-3">{{ field.label }}:</label>
			<mat-radio-group [formControlName]="field.name">
				<mat-radio-button
					*ngFor="let item of field.options; let i = index"
					[value]="item.value"
					[checked]="item.value === field.options[0].value"
					>{{ item.label }}</mat-radio-button
				>
			</mat-radio-group>
		</div>
	`,
	styles: []
})
export class RadiobuttonComponent implements OnInit {
	field: FieldConfigInterface;
	group: FormGroup;
	constructor() {}
	ngOnInit() {}
}
