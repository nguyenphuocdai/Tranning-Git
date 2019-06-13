import { TypesUtilsService } from "./../../../../../../../core/_base/crud/utils/types-utils.service";
import { KtSnackBarService } from "../../../../../../../core/_base/layout/services/kt-snack-bar.service";
import {
	Component,
	OnInit,
	Inject,
	Input,
	Output,
	EventEmitter,
	ChangeDetectorRef,
	AfterViewChecked
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
	selector: "kt-look-up",
	templateUrl: "./look-up.component.html",
	styleUrls: ["./look-up.component.scss"]
})
export class LookUpComponent implements OnInit, AfterViewChecked {
	@Input("dialogRefData") dialogRefData: DialogRefInterface;
	@Input("valueEdit") valueEdit: FieldConfigInterface;
	@Output("lookupComponentSubmit") submitForm = new EventEmitter<object>();
	optionDefault: string = "lookup";
	rfLookup: FormGroup;
	isSubmit: boolean = false;
	constructor(
		private dialogRef: MatDialogRef<ModalDialogComponent>,
		private fbField: FormBuilder,
		private _snackBarService: KtSnackBarService,
		private _changeDetectionRef: ChangeDetectorRef,
		private _typesUtilsService: TypesUtilsService
	) {}

	ngOnInit() {
		this.createForm();

		if (this.valueEdit) {
			this.rfLookup.controls["name"].setValue(this.valueEdit.name);
			this.rfLookup.controls["required"].setValue(
				this.valueEdit.required
			);
			this.rfLookup.controls["security"].setValue(
				this.valueEdit.security
			);
			this.rfLookup.controls["database"].setValue(
				this.valueEdit.database
			);
			this.rfLookup.controls["tracking"].setValue(
				this.valueEdit.tracking
			);
			this.rfLookup.controls["description"].setValue(
				this.valueEdit.description
			);
			this.rfLookup.controls["modules"].setValue(this.valueEdit.modules);
			this.dialogRefData.type = this.valueEdit.type;
			this.dialogRefData.valueView = this.valueEdit.inputType;

			if (this.valueEdit.validations.length !== 0) {
				this.valueEdit.validations.forEach((element, index) => {
					if (element.name === "required") {
						this.rfLookup.controls["errorMessage"].setValue(
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
		this.rfLookup = this.fbField.group({
			name: ["", Validators.required],
			required: new FormControl(false),
			errorMessage: [""],
			security: new FormControl(false),
			tracking: new FormControl(false),
			description: [""],
			modules: ["", Validators.required],
			database: ["", Validators.required]
		});
	}

	/**
	 * resolve ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'null: Another model 01'. Current value: 'null: Another model 02'.
	 */
	ngAfterViewChecked(): void {
		// your code
		this._changeDetectionRef.detectChanges();
	}
	/**
	 * Submit @Output
	 */
	onSubmit(event) {
		this.isSubmit = true;
		this.dialogRef.disableClose = true;
		console.log(this.rfLookup.value);
		if (this.rfLookup.invalid) {
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
		let label = this.rfLookup.controls["name"].value;
		let type = this.dialogRefData.type;
		let inputType = this.dialogRefData.valueView;
		let isRequired = this.rfLookup.controls["required"].value;
		let errorMessage = this.rfLookup.controls["errorMessage"].value;
		let isSecurity = this.rfLookup.controls["security"].value;
		let isTracking = this.rfLookup.controls["tracking"].value;
		let modules = this.rfLookup.controls["modules"].value;
		let database = this.rfLookup.controls["database"].value;
		let description = this.rfLookup.controls["description"].value;

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
			modules: modules,
			database: database,
			description:description,
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
	bindingDatabase() {
		let value = this.rfLookup.controls["name"].value;
		this.rfLookup.controls["database"].setValue(
			this._typesUtilsService.formatDatabaseInput(value)
		);
	}
}
