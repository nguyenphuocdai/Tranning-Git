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

	rfButton: FormGroup;
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
			this.rfButton.controls["name"].setValue(this.valueEdit.name);
			this.rfButton.controls["required"].setValue(this.valueEdit.required);
			this.rfButton.controls["errorMessage"].setValue(
				this.valueEdit.errorMessage
			);
			this.rfButton.controls["security"].setValue(this.valueEdit.security);
			this.rfButton.controls["tracking"].setValue(this.valueEdit.tracking);
			this.rfButton.controls["database"].setValue(
				this.valueEdit.database
			);

			this.dialogRefData.type = this.valueEdit.type;
			this.dialogRefData.valueView = this.valueEdit.inputType;

			if (this.valueEdit.validations.length !== 0) {
				this.valueEdit.validations.forEach((element, index) => {
					if (element.name === "required") {
						this.rfButton.controls["errorMessage"].setValue(
							element.message
						);
					}
				});
			}
		}
	}

	/**
	 * create form builder
	 */
	createForm() {
		this.rfButton = this._fbField.group({
			name: ["", Validators.required],
			required: new FormControl(false),
			errorMessage: [""],
			security: new FormControl(false),
			tracking: new FormControl(false),
			database: ["", Validators.required]
		});
	}

	/**
	 * Submit @Output
	 */
	onSubmit(event) {
		this.isSubmit = true;
		this._dialogRef.disableClose = true;
		if (this.rfButton.invalid) {
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
		let label = this.rfButton.controls["name"].value;
		let type = this.dialogRefData.type;
		let inputType = this.dialogRefData.valueView;
		let isRequired = this.rfButton.controls["required"].value;
		let errorMessage = this.rfButton.controls["errorMessage"].value;
		let isSecurity = this.rfButton.controls["security"].value;
		let isTracking = this.rfButton.controls["tracking"].value;
		let database = this.rfButton.controls["database"].value;

		let mergedObj: FieldConfigInterface = {
			id:
				this.valueEdit !== undefined
					? this.valueEdit.id
					: this._typesUtilsService.makeid(),
			type: type,
			label: label,
			inputType: inputType,
			name: label,
			required: isRequired,
			security: isSecurity,
			tracking: isTracking,
			database: database,
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
}
