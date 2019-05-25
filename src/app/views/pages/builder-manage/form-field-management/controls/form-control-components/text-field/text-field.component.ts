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
	selector: "kt-text-field",
	templateUrl: "./text-field.component.html",
	styleUrls: ["./text-field.component.scss"]
})
export class TextFieldComponent implements OnInit {
	@Input("dialogRefData") dialogRefData: DialogRefInterface;
	@Input("valueEdit") valueEdit: FieldConfigInterface;
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
		private _snackBarService: KtSnackBarService,
		private _typesUtilsService: TypesUtilsService
	) {}

	ngOnInit() {
		this.createForm();

		if (this.valueEdit) {
			console.log(this.valueEdit);
			this.rfField.controls["name"].setValue(this.valueEdit.name);
			this.rfField.controls["required"].setValue(this.valueEdit.required);
			this.rfField.controls["security"].setValue(this.valueEdit.security);
			this.rfField.controls["tracking"].setValue(this.valueEdit.tracking);
			this.rfField.controls["displayFormat"].setValue(
				this.valueEdit.displayFormat
			);
			this.rfField.controls["fieldType"].setValue(
				this.valueEdit.fieldType
			);
			this.rfField.controls["description"].setValue(
				this.valueEdit.description
			);
			this.rfField.controls["pattern"].setValue(this.valueEdit.pattern);
			if (this.valueEdit.validations.length !== 0) {
				this.valueEdit.validations.forEach((element, index) => {
					if (element.name === "required") {
						this.rfField.controls["errorMessage"].setValue(
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
		this.rfField = this.fbField.group({
			name: ["", Validators.required],
			required: new FormControl(false),
			errorMessage: [""],
			security: new FormControl(false),
			tracking: new FormControl(false),
			description: [""],
			fieldType: ["", Validators.required],
			displayFormat: ["", Validators.required],
			pattern: ["", Validators.required]
		});
	}

	/**
	 * Submit @Output
	 */
	onSubmit(event) {
		this.isSubmit = true;
		this.dialogRef.disableClose = true;
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
	 * build data from @Output
	 */
	onBuildData() {
		let label = this.rfField.controls["name"].value;
		let type = this.dialogRefData.type;
		let inputType = this.dialogRefData.valueView;
		let isRequired = this.rfField.controls["required"].value;
		let errorMessage = this.rfField.controls["errorMessage"].value;
		let pattern = this.rfField.controls["pattern"].value;
		let messagePattern = "Accept only text";
		let isSecurity = this.rfField.controls["security"].value;
		let isTracking = this.rfField.controls["tracking"].value;
		let displayFormat = this.rfField.controls["displayFormat"].value;
		let fieldType = this.rfField.controls["fieldType"].value;
		let description = this.rfField.controls["description"].value;

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
			description: description,
			displayFormat: displayFormat,
			fieldType: fieldType,
			pattern: pattern,
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
		if (pattern) {
			let objValidator = {
				name: "pattern",
				validator: Validators.pattern(pattern),
				message: messagePattern
			};
			mergedObj.validations.push(objValidator);
		}
		return mergedObj;
	}
}
