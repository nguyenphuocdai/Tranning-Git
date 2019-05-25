import { TypesUtilsService } from "./../../../../../../../core/_base/crud/utils/types-utils.service";
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

@Component({
	selector: "kt-money",
	templateUrl: "./money.component.html",
	styleUrls: ["./money.component.scss"]
})
export class MoneyComponent implements OnInit {
	@Input("dialogRefData") dialogRefData: DialogRefInterface;
	@Output("moneyComponentSubmit") submitForm = new EventEmitter<object>();

	toppings = new FormControl();
	rfField: FormGroup;
	optionDefault = "money";
	listUnit = [
		{ name: "Việt Nam Đồng", unit: "VNĐ" },
		{ name: "Đô la Mỹ", unit: "USD" },
		{ name: "Đô la Canada", unit: "CAD" }
	];
	isSubmit: boolean = false;
	constructor(
		private dialogRef: MatDialogRef<ModalDialogComponent>,
		private fbField: FormBuilder,
		private _snackBarService: KtSnackBarService,
		private _typesUtilsService: TypesUtilsService
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
			unitMoney: ["", Validators.required],
			fieldType: ["", Validators.required],
			errorMessage: [""],
			security: new FormControl(false),
			tracking: new FormControl(false),
			description: [""]
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
		let fieldType = this.rfField.controls["fieldType"].value;
		let unitMoney = this.rfField.controls["unitMoney"].value;
		let description = this.rfField.controls["description"].value;

		let mergedObj: FieldConfigInterface = {
			id: this._typesUtilsService.makeid(),
			type: type,
			label: label,
			inputType: inputType,
			name: label,
			security: isSecurity,
			tracking: isTracking,
			unitMoney: unitMoney,
			fieldType: fieldType,
			description: description,
			required: isRequired,
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
