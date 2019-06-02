import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { FieldConfigInterface } from "../../_model-app/field.interface";
@Component({
	selector: "app-fupload",
	template: `
		<div class="form-group kt-form__group" [formGroup]="group">
			<app-material-file-upload
				(complete)="onFileComplete($event)"
				[RequireMessage]="require?.message"
				[multiple]="field.fieldType"
				[Text]="field.textFupload"
				[controlName]="formControl"
				[controlGroup]="group"
			></app-material-file-upload>
		</div>
	`,
	styles: []
})
export class FuploadDynamicComponent implements OnInit {
	field: FieldConfigInterface;
	group: FormGroup;
	formControl: any;
	require: any;
	constructor() {}
	ngOnInit() {
		// validate require
		this.require = this.field.validations[0];
		this.formControl = new FormControl(this.field.name);
	}
	onFileComplete(data) {
		console.log(data);
		this.group.controls[this.field.name].setValue(data);
	}
}
