import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfigInterface } from "./../../../../../../core/auth";
@Component({
	selector: "kt-app-button",
	template: `
		<div [formGroup]="group" class="cursor-pointer">
			<button type="submit" mat-raised-button color="primary">
				{{ field.label }}
			</button>
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
