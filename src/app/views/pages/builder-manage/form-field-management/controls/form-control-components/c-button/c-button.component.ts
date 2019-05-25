import { TypesUtilsService } from "./../../../../../../../core/_base/crud/utils/types-utils.service";
import { KtSnackBarService } from "../../../../../../../core/_base/layout/services/kt-snack-bar.service";
import {
	Component,
	OnInit,
	Inject,
	Input,
	Output,
	EventEmitter
} from "@angular/core";
import { MatDialogRef } from "@angular/material";
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
import { ModalDialogComponent } from "../../modal-dialog/modal-dialog.component";

@Component({
	selector: "kt-c-button",
	templateUrl: "./c-button.component.html",
	styleUrls: ["./c-button.component.scss"]
})
export class CButtonComponent implements OnInit {
	@Input("dialogRefData") dialogRefData: DialogRefInterface;
	@Input("valueEdit") valueEdit: FieldConfigInterface;
	@Output("cButtonComponentSubmit") submitForm = new EventEmitter<object>();

	rfField: FormGroup;
	optionDefault: string = "button";
	isSubmit: boolean = false;
	constructor(
		private _dialogRef: MatDialogRef<ModalDialogComponent>,
		private _fbField: FormBuilder,
		private _snackBarService: KtSnackBarService,
		private _typesUtilsService: TypesUtilsService
	) {}

	ngOnInit() {
		this.createForm();
		if (this.valueEdit) {
			this.rfField.controls["name"].setValue(this.valueEdit.name);
			this.rfField.controls["required"].setValue(this.valueEdit.required);
			this.rfField.controls["errorMessage"].setValue(
				this.valueEdit.errorMessage
			);
			this.rfField.controls["security"].setValue(this.valueEdit.security);
			this.rfField.controls["tracking"].setValue(this.valueEdit.tracking);
			this.rfField.controls["fieldType"].setValue(
				this.valueEdit.fieldType
			);
		}
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
			fieldType: ["", Validators.required]
		});
	}

	/**
	 * Submit @Output
	 */
	onSubmit(event) {
		this.isSubmit = true;
		this._dialogRef.disableClose = true;
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
		// if (isPattern) {
		// 	let objValidator = {
		// 		name: "pattern",
		// 		validator: Validators.pattern(isPattern),
		// 		message: messagePattern
		// 	};
		// 	mergedObj.validations.push(objValidator);
		// }
		return mergedObj;
	}
}
