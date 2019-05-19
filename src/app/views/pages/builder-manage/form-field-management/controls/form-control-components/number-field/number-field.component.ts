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
	@Output("numberComponentSubmit") submitForm = new EventEmitter<object>();
	previewInput: any;
	toppings = new FormControl();
	rfNumber: FormGroup;
	isShowMinMax: boolean;
	isShowMinMaxValue: boolean;
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
		private _changeDetectionRef: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.createForm();
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
			fieldType: ["", Validators.required],
			displayFormat: ["", Validators.required],
			parttern: ["", Validators.required],
			minValue: ["", Validators.required],
			maxValue: ["", Validators.required],
			isFloat: new FormControl(false),
			numberFloat: ["", Validators.required]
			// previewInput: ["", Validators.nullValidator]
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
		let isPattern = this.rfNumber.controls["parttern"].value;
		let messagePattern = "Accept only text";
		let isSecurity = this.rfNumber.controls["security"].value;
		let isTracking = this.rfNumber.controls["tracking"].value;
		let displayFormat = this.rfNumber.controls["displayFormat"].value;
		let fieldType = this.rfNumber.controls["fieldType"].value;
		let minValue = this.rfNumber.controls["minValue"].value;
		let maxValue = this.rfNumber.controls["maxValue"].value;

		let mergedObj: FieldConfigInterface = {
			type: type,
			label: label,
			inputType: inputType,
			name: label,
			security: isSecurity,
			tracking: isTracking,
			displayFormat: displayFormat,
			fieldType: fieldType,
			validations: [],
			minValue: minValue,
			maxValue: maxValue
		};
		if (isRequired === true) {
			let objValidator = {
				name: "required",
				validator: Validators.required,
				message: errorMessage
			};
			mergedObj.validations.push(objValidator);
		}
		if (isPattern) {
			let objValidator = {
				name: "pattern",
				validator: Validators.pattern(isPattern),
				message: messagePattern
			};
			mergedObj.validations.push(objValidator);
		}
		return mergedObj;
	}
	changeMinValue(newValue) {
		console.log(newValue);
		if (this.rfNumber.controls["minValue"].value.length === 0) {
			return;
		}
		return newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	removeCommas(controlName: string) {
		if (
			this.rfNumber.controls[controlName].value === undefined ||
			this.rfNumber.controls[controlName].value.length <= 3
		) {
			return;
		}
		let value = this.rfNumber.controls[controlName].value.replace(",", "");
		this.rfNumber.controls[controlName].setValue(value);
	}

	addCommas(controlName: string) {
		if (
			this.rfNumber.controls[controlName].value === undefined ||
			this.rfNumber.controls[controlName].value.length <= 3
		) {
			return;
		}
		let value = this.rfNumber.controls[controlName].value.replace(
			/\B(?=(\d{3})+(?!\d))/g,
			","
		);
		this.rfNumber.controls[controlName].setValue(value);
	}

	onCheckMinMax() {
		this.isShowMinMaxValue = false;
		let isRequired = this.rfNumber.controls["required"].value;
		let minValue = this.rfNumber.controls["minValue"].value;
		let maxValue = this.rfNumber.controls["maxValue"].value;
		let previewInput = this.previewInput;

		if (
			minValue === undefined ||
			maxValue === undefined ||
			previewInput === undefined
		) {
			return;
		}
		minValue = parseFloat(minValue.replace(",", ""));
		maxValue = parseFloat(maxValue.replace(",", ""));
		previewInput = parseFloat(previewInput.replace(",", ""));

		if (isRequired === false) {
			this.isShowMinMax = true;
		}

		if (previewInput < minValue && previewInput < maxValue) {
			this.isShowMinMaxValue = true;
			this.isShowMinMax = false;
		}
	}
}
