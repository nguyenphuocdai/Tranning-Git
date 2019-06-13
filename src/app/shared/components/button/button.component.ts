import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfigInterface } from "../../_model-app/field.interface";
@Component({
	selector: "kt-app-button",
	template: `
		<div [formGroup]="group" class="cursor-pointer">
			<div class="form-group kt-form__group">
				<button type="submit" mat-raised-button color="primary">
					{{ field.label }}
				</button>
			</div>
		</div>
	`,
	styles: []
})
export class ButtonComponent implements OnInit {
	field: FieldConfigInterface;
	group: FormGroup;
	constructor() {}
	ngOnInit() {}
}
