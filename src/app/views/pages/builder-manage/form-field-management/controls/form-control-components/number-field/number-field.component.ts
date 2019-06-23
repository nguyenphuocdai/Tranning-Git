import { TypesUtilsService } from "./../../../../../../../core/_base/crud/utils/types-utils.service";
import { KtSnackBarService } from "../../../../../../../core/_base/layout/services/kt-snack-bar.service";
import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ChangeDetectorRef,
	AfterViewChecked
} from "@angular/core";
import { ModalDialogComponent } from "../../modal-dialog/modal-dialog.component";
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

@Component({
	selector: "kt-number-field",
	templateUrl: "./number-field.component.html",
	styleUrls: ["./number-field.component.scss"]
})
export class NumberFieldComponent implements OnInit, AfterViewChecked {
	@Input("dialogRefData") dialogRefData: DialogRefInterface;
	@Input("valueEdit") valueEdit: FieldConfigInterface;
	@Output("numberComponentSubmit") submitForm = new EventEmitter<object>();
	previewInput: any;
	previewDecimal: string = "";
	toppings = new FormControl();
	rfNumber: FormGroup;
	// isShowMinMax: boolean;
	// isShowMinMaxValue: boolean;
	toppingList = [
		"Extra cheese",
		"Mushroom",
		"Onion",
		"Pepperoni",
		"Sausage",
		"Tomato"
	];
	emailFormControl = new FormControl("", [Validators.required]);
	isSubmit: boolean = false;
	constructor(
		private dialogRef: MatDialogRef<ModalDialogComponent>,
		private fbNumber: FormBuilder,
		private _snackBarService: KtSnackBarService,
		private _changeDetectionRef: ChangeDetectorRef,
		private _typesUtilsService: TypesUtilsService
	) {}

	ngOnInit() {
		this.createForm();
		if (this.valueEdit) {
			this.rfNumber.controls["name"].setValue(this.valueEdit.name);
			this.rfNumber.controls["required"].setValue(
				this.valueEdit.required
			);
			this.rfNumber.controls["database"].setValue(
				this.valueEdit.database
			);
			this.rfNumber.controls["security"].setValue(
				this.valueEdit.security
			);
			this.rfNumber.controls["tracking"].setValue(
				this.valueEdit.tracking
			);
			// this.rfNumber.controls["fieldType"].setValue(
			// 	this.valueEdit.fieldType
			// );
			this.rfNumber.controls["minValue"].setValue(
				this.valueEdit.minValue
			);
			this.rfNumber.controls["isDecimal"].setValue(
				this.valueEdit.isDecimal
			);
			this.rfNumber.controls["numberDecimal"].setValue(
				this.valueEdit.numberDecimal
			);
			this.rfNumber.controls["maxValue"].setValue(
				this.valueEdit.maxValue
			);
			this.rfNumber.controls["description"].setValue(
				this.valueEdit.description
			);
			this.dialogRefData.type = this.valueEdit.type;
			this.dialogRefData.valueView = this.valueEdit.inputType;

			if (this.valueEdit.validations.length !== 0) {
				this.valueEdit.validations.forEach((element, index) => {
					if (element.name === "required") {
						this.rfNumber.controls["errorMessage"].setValue(
							element.message
						);
					}
				});
			}
		}
	}

	/**
	 * bind data multi checkbox
	 */
	bindData() {
		const anotherList: any[] = [this.toppingList[0], this.toppingList[1]];
		this.toppings.setValue(anotherList);
	}

	/**
	 * create form builder
	 */
	createForm() {
		this.rfNumber = this.fbNumber.group({
			name: ["", Validators.required],
			required: new FormControl(false),
			errorMessage: [""],
			security: new FormControl(false),
			tracking: new FormControl(false),
			description: [""],
			isDecimal: new FormControl(false),
			numberDecimal: [""],
			database: ["", Validators.required]
		});
	}

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
		console.log(this.rfNumber.value);
		if (this.rfNumber.invalid) {
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
			console.log(mergedObj);
		}, 3000);
	}

	/**
	 * build data fro @Output
	 */
	onBuildData() {
		let label = this.rfNumber.controls["name"].value;
		let type = this.dialogRefData.type;
		let inputType = this.dialogRefData.valueView;
		let isRequired = this.rfNumber.controls["required"].value;
		let errorMessage = this.rfNumber.controls["errorMessage"].value;
		let isDecimal = this.rfNumber.controls["isDecimal"].value;
		let numberDecimal = this.rfNumber.controls["numberDecimal"].value;
		let isSecurity = this.rfNumber.controls["security"].value;
		let isTracking = this.rfNumber.controls["tracking"].value;
		let database = this.rfNumber.controls["database"].value;
		let description = this.rfNumber.controls["description"].value;

		let mergedObj: FieldConfigInterface = {
			id:
				this.valueEdit !== undefined
					? this.valueEdit.id
					: this._typesUtilsService.makeid(),
			type: type,
			label: label,
			inputType: inputType,
			name: label,
			isDecimal: isDecimal,
			numberDecimal: numberDecimal,
			required: isRequired,
			security: isSecurity,
			tracking: isTracking,
			description: description,
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
	// changeMinValue(newValue) {
	// 	console.log(newValue);
	// 	if (this.rfNumber.controls["minValue"].value.length === 0) {
	// 		return;
	// 	}
	// 	return newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	// }
	// removeCommas(controlName: string) {
	// 	if (
	// 		this.rfNumber.controls[controlName].value === undefined ||
	// 		this.rfNumber.controls[controlName].value.length <= 3
	// 	) {
	// 		return;
	// 	}
	// 	let value = this.rfNumber.controls[controlName].value.replace(",", "");
	// 	this.rfNumber.controls[controlName].setValue(value);
	// }

	// addCommas(controlName: string) {
	// 	if (
	// 		this.rfNumber.controls[controlName].value === undefined ||
	// 		this.rfNumber.controls[controlName].value.length <= 3
	// 	) {
	// 		return;
	// 	}
	// 	let value = this.rfNumber.controls[controlName].value.replace(
	// 		/\B(?=(\d{3})+(?!\d))/g,
	// 		","
	// 	);
	// 	this.rfNumber.controls[controlName].setValue(value);
	// }

	// onCheckMinMax() {
	// 	this.isShowMinMaxValue = false;
	// 	let minValue = this.rfNumber.controls["minValue"].value;
	// 	let maxValue = this.rfNumber.controls["maxValue"].value;
	// 	let previewInput = this.previewInput;

	// 	if (
	// 		minValue === undefined ||
	// 		maxValue === undefined ||
	// 		previewInput === undefined
	// 	) {
	// 		return;
	// 	}
	// 	minValue = parseFloat(minValue.replace(",", ""));
	// 	maxValue = parseFloat(maxValue.replace(",", ""));
	// 	previewInput = parseFloat(previewInput.replace(",", ""));

	// 	if (previewInput < minValue || previewInput > maxValue) {
	// 		this.isShowMinMaxValue = true;
	// 	}
	// }

	onNumberDecimalChange(data) {
		let valueDecimalNumber = this.rfNumber.controls["numberDecimal"].value;
		let padEndNumber = parseInt(valueDecimalNumber, 10);
		if (data) {
			let eg = "500.";
			this.previewDecimal = eg.padEnd(eg.length + padEndNumber, "0");
		}

		if (this.previewInput) {
			let arrSplitpreviewInput = this.previewInput.split(".");
			this.previewInput = arrSplitpreviewInput[0];
			this.previewInput = this.previewInput.concat(".").padEnd(this.previewInput.length + 1 + padEndNumber, "0");
		}
	}
	bindingDatabase() {
		let value = this.rfNumber.controls["name"].value;
		this.rfNumber.controls["database"].setValue(
			this._typesUtilsService.formatDatabaseInput(value)
		);
	}
}
