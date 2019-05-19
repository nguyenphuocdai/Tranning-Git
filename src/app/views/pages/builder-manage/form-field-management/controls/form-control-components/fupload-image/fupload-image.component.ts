import { KtSnackBarService } from "../../../../../../../core/_base/layout/services/kt-snack-bar.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { ModalDialogComponent } from "../../modal-dialog/modal-dialog.component";
import {
	FormControl,
	Validators,
	FormGroup,
	FormBuilder
} from "@angular/forms";
import {
	DialogRefInterface,
	FieldConfigInterface
} from "../../../../../../../core/auth";

const URL = "https://evening-anchorage-3159.herokuapp.com/api/";

@Component({
	selector: "kt-fupload-image",
	templateUrl: "./fupload-image.component.html",
	styleUrls: ["./fupload-image.component.scss"]
})
export class FuploadImageComponent implements OnInit {
	@Input("dialogRefData") dialogRefData: DialogRefInterface;
	@Output("fuploadComponentSubmit") submitForm = new EventEmitter<object>();

	rfField: FormGroup;

	isSubmit: boolean = false;
	constructor(
		private dialogRef: MatDialogRef<ModalDialogComponent>,
		private fbField: FormBuilder,
		private _snackBarService: KtSnackBarService
	) {}

	ngOnInit() {
		this.createForm();
	}

	/**
	 * create form builder
	 */
	createForm() {
		this.rfField = this.fbField.group({
			name: ["", Validators.required],
			required: new FormControl(false),
			errorMessage: [""],
			security: new FormControl(false),
			tracking: new FormControl(false),
			description: [""],
			fieldType: ["", Validators.required]
		});
	}

	/**
	 * Submit @Output
	 */
	onSubmit(event) {
		this.isSubmit = true;
		this.dialogRef.disableClose = true;
		console.log(this.rfField.value);
		if (this.rfField.invalid) {
			this.isSubmit = false;
			return;
		}

		setTimeout(() => {
			let mergedObj: FieldConfigInterface = this.onBuildData();
			this._snackBarService.openSnackBar(
				"Add new field successfully !",
				5000
			);
			this.isSubmit = false;
			this.submitForm.emit(mergedObj);
			// this.dialogRef.close(mergedObj);
			console.log(mergedObj);
		}, 3000);
	}

	/**
	 * build data fro @Output
	 */
	onBuildData() {
		let label = this.rfField.controls["name"].value;
		let type = this.dialogRefData.type;
		let inputType = this.dialogRefData.valueView;
		let isRequired = this.rfField.controls["required"].value;
		let errorMessage = this.rfField.controls["errorMessage"].value;
		let isSecurity = this.rfField.controls["security"].value;
		let isTracking = this.rfField.controls["tracking"].value;
		let displayFormat = this.rfField.controls["displayFormat"].value;
		let fieldType = this.rfField.controls["fieldType"].value;

		let mergedObj: FieldConfigInterface = {
			type: type,
			label: label,
			inputType: inputType,
			name: label,
			security: isSecurity,
			tracking: isTracking,
			displayFormat: displayFormat,
			fieldType: fieldType,
			validations: []
		};
		if (isRequired === true) {
			let objValidator = {
				name: "required",
				validator: Validators.required,
				message: errorMessage
			};
			mergedObj.validations.push(objValidator);
		}

		return mergedObj;
	}
	onFileComplete(data: any) {
		console.log(data);
	}
}
