import { TypesUtilsService } from "./../../../../../../../core/_base/crud";
import { KtSnackBarService } from "../../../../../../../core/_base/layout/services/kt-snack-bar.service";
import {
	Component,
	OnInit,
	Inject,
	Input,
	Output,
	EventEmitter
} from "@angular/core";
import { MatDialogRef, ErrorStateMatcher } from "@angular/material";
import {
	FormControl,
	Validators,
	FormGroup,
	FormBuilder,
	FormGroupDirective,
	NgForm,
	FormArray
} from "@angular/forms";
import {
	DialogRefInterface,
	FieldConfigInterface
} from "../../../../../../../core/auth";
import { ModalDialogComponent } from "../../modal-dialog/modal-dialog.component";

@Component({
	selector: "kt-select-option",
	templateUrl: "./select-option.component.html",
	styleUrls: ["./select-option.component.scss"]
})
export class SelectOptionComponent implements OnInit {
	@Input("dialogRefData") dialogRefData: DialogRefInterface;
	@Input("valueEdit") valueEdit: FieldConfigInterface;
	@Output("selectComponentSubmit") submitForm = new EventEmitter<object>();

	// validate if check box required
	selected = new FormControl("valid", [
		Validators.required,
		Validators.pattern("valid")
	]);

	selectFormControl = new FormControl("valid", [
		Validators.required,
		Validators.pattern("valid")
	]);

	nativeSelectFormControl = new FormControl("valid", [
		Validators.required,
		Validators.pattern("valid")
	]);

	matcher = new MyErrorStateMatcher();

	toppings = new FormControl();
	rfSelectOption: FormGroup;
	toppingList = [
		{ id: 1, label: "Extra cheese", value: "Extracheese" },
		{ id: 2, label: "Mushroom", value: "Mushroom" },
		{ id: 3, label: "Onion", value: "Onion" },
		{ id: 4, label: "Pepperoni", value: "Pepperoni" }
	];
	isSubmit: boolean = false;
	addListOption = [{ id: 0, label: "", value: "" }];
	mySelections: any;
	constructor(
		private dialogRef: MatDialogRef<ModalDialogComponent>,
		private fbSelectOption: FormBuilder,
		private _snackBarService: KtSnackBarService,
		private _typesUtilsService: TypesUtilsService
	) {}

	ngOnInit() {
		this.createForm();
		this.bindData();

		if (this.valueEdit) {
			this.rfSelectOption.controls["name"].setValue(this.valueEdit.label);
			this.rfSelectOption.controls["required"].setValue(
				this.valueEdit.required
			);
			this.rfSelectOption.controls["security"].setValue(
				this.valueEdit.security
			);
			this.rfSelectOption.controls["tracking"].setValue(
				this.valueEdit.tracking
			);
			this.rfSelectOption.controls["fieldType"].setValue(
				this.valueEdit.fieldType
			);
			this.rfSelectOption.controls["description"].setValue(
				this.valueEdit.description
			);
			this.dialogRefData.type = this.valueEdit.type;
			this.dialogRefData.valueView = this.valueEdit.inputType;
			this.addListOption = this.valueEdit.options;

			if (this.valueEdit.validations.length !== 0) {
				this.valueEdit.validations.forEach((element, index) => {
					if (element.name === "required") {
						this.rfSelectOption.controls["errorMessage"].setValue(
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
		this.rfSelectOption = this.fbSelectOption.group({
			name: ["", Validators.required],
			required: new FormControl(false),
			errorMessage: [""],
			security: new FormControl(false),
			tracking: new FormControl(false),
			options: new FormArray([new FormControl(""), new FormControl("")]),
			description: [""],
			fieldType: ["", Validators.required]
		});
	}

	/**
	 * Submit @Output
	 */
	onSubmit() {
		this.isSubmit = true;
		this.dialogRef.disableClose = true;

		for (let option of this.addListOption) {
			if (option.value === "") {
				option.value = option.label;
			}
			if (option.label === "") {
				this.isSubmit = false;
				this.dialogRef.disableClose = false;

				this._snackBarService.openSnackBar(
					"Please check again! Data in form invalid",
					5000
				);

				return false;
			}
		}

		if (this.rfSelectOption.invalid) {
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
		let label = this.rfSelectOption.controls["name"].value;
		let type = this.dialogRefData.type;
		let inputType = this.dialogRefData.valueView;
		let isRequired = this.rfSelectOption.controls["required"].value;
		let errorMessage = this.rfSelectOption.controls["errorMessage"].value;
		let isSecurity = this.rfSelectOption.controls["security"].value;
		let isTracking = this.rfSelectOption.controls["tracking"].value;
		let fieldType = this.rfSelectOption.controls["fieldType"].value;
		let description = this.rfSelectOption.controls["description"].value;
		let options = this.addListOption;

		let mergedObj: FieldConfigInterface = {
			id: this._typesUtilsService.makeid(),
			type: type,
			label: label,
			inputType: inputType,
			name: this._typesUtilsService.removeUnicode(label),
			required: isRequired,
			security: isSecurity,
			tracking: isTracking,
			options: options,
			fieldType: fieldType,
			description: description,
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

	handleAddOption() {
		let option = {
			id: this.addListOption.length,
			label: "",
			value: ""
		};
		this.addListOption.push(option);
	}

	handleRemoveOption(index, option) {
		if (typeof index !== "number" || index < 0) {
			return;
		}
		this.addListOption.splice(index, 1);
	}
	handleChangeTwoOptions() {
		if (this.toppings.value.length <= 2) {
			this.mySelections = this.toppings.value;
		} else {
			this.toppings.setValue(this.mySelections);
		}
	}
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(
		control: FormControl | null,
		form: FormGroupDirective | NgForm | null
	): boolean {
		const isSubmitted = form && form.submitted;
		return !!(
			control &&
			control.invalid &&
			(control.dirty || control.touched || isSubmitted)
		);
	}
}
