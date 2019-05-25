import { TypesUtilsService } from "./../../../../../../../core/_base/crud/utils/types-utils.service";
import { KtSnackBarService } from "../../../../../../../core/_base/layout/services/kt-snack-bar.service";
import { ModalDialogComponent } from "../../modal-dialog/modal-dialog.component";
import { MatDialogRef } from "@angular/material";

import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	AfterViewChecked,
	ChangeDetectorRef
} from "@angular/core";
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

@Component({
	selector: "kt-fupload-image",
	templateUrl: "./fupload-image.component.html",
	styleUrls: ["./fupload-image.component.scss"]
})
export class FuploadImageComponent implements OnInit, AfterViewChecked {
	@Input("dialogRefData") dialogRefData: DialogRefInterface;
	@Output("fuploadComponentSubmit") submitForm = new EventEmitter<object>();

	rfField: FormGroup;
	fuploadText: string;
	isSubmit: boolean = false;
	constructor(
		private _dialogRef: MatDialogRef<ModalDialogComponent>,
		private _fbField: FormBuilder,
		private _snackBarService: KtSnackBarService,
		private _cdr: ChangeDetectorRef,
		private _typesUtilsService: TypesUtilsService
	) {}
	ngAfterViewChecked(): void {
		this.fuploadText = "Upload Image";
		this._cdr.detectChanges();
	}
	ngOnInit() {
		this.createForm();
	}

	/**
	 * create form builder
	 */
	createForm() {
		this.rfField = this._fbField.group({
			name: ["", Validators.required],
			required: new FormControl(false),
			errorMessage: [""],
			security: new FormControl(false),
			tracking: new FormControl(false),
			// description: [""],
			fieldType: ["", Validators.required]
		});
	}

	/**
	 * Submit @Output
	 */
	onSubmit(event) {
		this.isSubmit = true;
		this._dialogRef.disableClose = true;
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
		let fieldType = this.rfField.controls["fieldType"].value;

		let mergedObj: FieldConfigInterface = {
			id: this._typesUtilsService.makeid(),
			type: type,
			label: label,
			inputType: inputType,
			name: label,
			security: isSecurity,
			tracking: isTracking,
			fieldType: fieldType,
			textFupload: this.fuploadText,
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
