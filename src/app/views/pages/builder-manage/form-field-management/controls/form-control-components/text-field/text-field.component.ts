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
	selector: "kt-text-field",
	templateUrl: "./text-field.component.html",
	styleUrls: ["./text-field.component.scss"]
})
export class TextFieldComponent implements OnInit {
	@Input("dialogRefData") dialogRefData: DialogRefInterface;
	@Output("textComponentSubmit") submitForm = new EventEmitter<object>();

	toppings = new FormControl();
	rfField: FormGroup;
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
		private fbField: FormBuilder,
		private _snackBarService: KtSnackBarService
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
		this.rfField = this.fbField.group({
			name: ["", Validators.required],
			required: new FormControl(false),
			errorMessage: [""],
			security: new FormControl(false),
			tracking: new FormControl(false),
			description: [""],
			fieldType: ["", Validators.required],
			displayFormat: ["", Validators.required],
			parttern: ["", Validators.required]
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
		let isPattern = this.rfField.controls["parttern"].value;
		let messagePattern = "Accept only text";
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
}
