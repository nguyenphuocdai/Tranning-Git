import { TypesUtilsService } from "./../../../../../../../core/_base/crud/utils/types-utils.service";
import { KtSnackBarService } from "../../../../../../../core/_base/layout/services/kt-snack-bar.service";
import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	AfterViewInit
} from "@angular/core";
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
	@Input("valueEdit") valueEdit: FieldConfigInterface;
	@Output("moneyComponentSubmit") submitForm = new EventEmitter<object>();

	toppings = new FormControl();
	rfMoney: FormGroup;
	optionDefault = "money";
	unitDefault = "";
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

		if (this.valueEdit) {
			let obj: any = this.valueEdit.unitMoney;
			this.rfMoney.controls["name"].setValue(this.valueEdit.name);
			this.rfMoney.controls["required"].setValue(this.valueEdit.required);
			this.rfMoney.controls["security"].setValue(this.valueEdit.security);
			this.rfMoney.controls["tracking"].setValue(this.valueEdit.tracking);
			this.rfMoney.controls["database"].setValue(this.valueEdit.database);
			this.rfMoney.controls["unitMoney"].setValue(
				this.valueEdit.unitMoney
			);
			this.unitDefault = obj.unit;
			this.rfMoney.controls["description"].setValue(
				this.valueEdit.description
			);
			this.dialogRefData.type = this.valueEdit.type;
			this.dialogRefData.valueView = this.valueEdit.inputType;

			if (this.valueEdit.validations.length !== 0) {
				this.valueEdit.validations.forEach((element, index) => {
					if (element.name === "required") {
						this.rfMoney.controls["errorMessage"].setValue(
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
		this.rfMoney = this.fbField.group({
			name: ["", Validators.required],
			required: new FormControl(false),
			unitMoney: ["", Validators.required],
			database: ["", Validators.required],
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
		console.log(this.rfMoney.value);
		if (this.rfMoney.invalid) {
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
		let label = this.rfMoney.controls["name"].value;
		let type = this.dialogRefData.type;
		let inputType = this.dialogRefData.valueView;
		let isRequired = this.rfMoney.controls["required"].value;
		let errorMessage = this.rfMoney.controls["errorMessage"].value;
		let isSecurity = this.rfMoney.controls["security"].value;
		let isTracking = this.rfMoney.controls["tracking"].value;
		let description = this.rfMoney.controls["description"].value;
		let database = this.rfMoney.controls["database"].value;
		let unitMoney = this.rfMoney.controls["unitMoney"].value;

		for (let item of this.listUnit) {
			if (item.unit === unitMoney) {
				unitMoney = item;
			}
		}

		let mergedObj: FieldConfigInterface = {
			id:
				this.valueEdit !== undefined
					? this.valueEdit.id
					: this._typesUtilsService.makeid(),
			type: type,
			label: label,
			inputType: inputType,
			name: label,
			security: isSecurity,
			tracking: isTracking,
			unitMoney: unitMoney,
			description: description,
			database: database,
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
	bindingDatabase() {
		let value = this.rfMoney.controls["name"].value;
		this.rfMoney.controls["database"].setValue(
			this._typesUtilsService.formatDatabaseInput(value)
		);
	}
}
