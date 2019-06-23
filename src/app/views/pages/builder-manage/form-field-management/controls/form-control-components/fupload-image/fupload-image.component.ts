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
	@Input("valueEdit") valueEdit: FieldConfigInterface;
	@Output("fuploadComponentSubmit") submitForm = new EventEmitter<object>();

	rfFupload: FormGroup;
	isSubmit: boolean = false;
	constructor(
		private _dialogRef: MatDialogRef<ModalDialogComponent>,
		private _fbFupload: FormBuilder,
		private _snackBarService: KtSnackBarService,
		private _cdr: ChangeDetectorRef,
		private _typesUtilsService: TypesUtilsService
	) {}
	ngAfterViewChecked(): void {
		this._cdr.detectChanges();
	}
	ngOnInit() {
		this.createForm();

		if (this.valueEdit) {
			this.rfFupload.controls["name"].setValue(this.valueEdit.name);
			// this.rfFupload.controls["label"].setValue(this.valueEdit.label);
			// this.rfFupload.controls["textFupload"].setValue(
			// 	this.valueEdit.textFupload === undefined
			// 		? "Default"
			// 		: this.valueEdit.textFupload
			// );
			this.rfFupload.controls["required"].setValue(
				this.valueEdit.required
			);
			this.rfFupload.controls["security"].setValue(
				this.valueEdit.security
			);
			this.rfFupload.controls["tracking"].setValue(
				this.valueEdit.tracking
			);
			this.rfFupload.controls["fieldType"].setValue(
				this.valueEdit.fieldType
			);
			this.rfFupload.controls["database"].setValue(
				this.valueEdit.database
			);

			this.dialogRefData.type = this.valueEdit.type;
			this.dialogRefData.valueView = this.valueEdit.inputType;

			if (this.valueEdit.validations.length !== 0) {
				this.valueEdit.validations.forEach((element, index) => {
					if (element.name === "required") {
						this.rfFupload.controls["errorMessage"].setValue(
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
		this.rfFupload = this._fbFupload.group({
			name: ["", Validators.required],
			label: [""],
			required: new FormControl(false),
			errorMessage: [""],
			security: new FormControl(false),
			tracking: new FormControl(false),
			database: ["", Validators.required],
			// textFupload: ["", Validators.required],
			fieldType: ["", Validators.required]
		});
	}

	/**
	 * Submit @Output
	 */
	onSubmit(event) {
		this.isSubmit = true;
		this._dialogRef.disableClose = true;
		if (this.rfFupload.invalid) {
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
		// let label = this.rfFupload.controls["label"].value;
		// let textFupload = this.rfFupload.controls["textFupload"].value;
		let name = this.rfFupload.controls["name"].value;
		let type = this.dialogRefData.type;
		let inputType = this.dialogRefData.valueView;
		let isRequired = this.rfFupload.controls["required"].value;
		let errorMessage = this.rfFupload.controls["errorMessage"].value;
		let isSecurity = this.rfFupload.controls["security"].value;
		let isTracking = this.rfFupload.controls["tracking"].value;
		let database = this.rfFupload.controls["database"].value;
		let fieldType = this.rfFupload.controls["fieldType"].value;

		let mergedObj: FieldConfigInterface = {
			id:
				this.valueEdit !== undefined
					? this.valueEdit.id
					: this._typesUtilsService.makeid(),
			type: type,
			label: name,
			inputType: inputType,
			name: name,
			required: isRequired,
			security: isSecurity,
			tracking: isTracking,
			fieldType: fieldType,
			database: database,
			// textFupload: textFupload,
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
	bindingDatabase() {
		let value = this.rfFupload.controls["name"].value;
		this.rfFupload.controls["database"].setValue(
			this._typesUtilsService.formatDatabaseInput(value)
		);
	}
}
