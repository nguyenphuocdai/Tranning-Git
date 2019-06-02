import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfigInterface } from "../../_model-app/field.interface";
@Component({
	selector: "kt-app-checkbox",
	template: `
		<div class="demo-full-width margin-top" [formGroup]="group">
			<mat-checkbox [formControlName]="field.name">{{
				field.label
			}}</mat-checkbox>
		</div>
	`,
	styles: []
})
export class CheckboxComponent implements OnInit {
	field: FieldConfigInterface;
	group: FormGroup;
	constructor() {}
	ngOnInit() {}
}
