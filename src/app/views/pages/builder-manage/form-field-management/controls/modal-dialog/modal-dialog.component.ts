import { KtSnackBarService } from "./../../../../../../core/_base/layout/services/kt-snack-bar.service";
import * as FunctionBase from "../../../../../../core/_function-base/function-base.ultilities";
import { FieldSetting } from "./../../../../../../core/_constant/field-setting";
import { FieldConfig } from "./../../../../../../core/auth";
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import {
	FormControl,
	Validators,
	FormGroup,
	FormBuilder
} from "@angular/forms";

@Component({
	selector: "kt-modal-dialog",
	templateUrl: "./modal-dialog.component.html",
	styleUrls: ["./modal-dialog.component.scss"]
})
export class ModalDialogComponent implements OnInit {
	// items: FieldConfig[] = [];
	// functionBase = new FunctionBase();
	// items = [];
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
	dialogRefData: any;
	isSubmit: boolean;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<ModalDialogComponent>,
		private fbField: FormBuilder,
		private _snackBarService: KtSnackBarService
	) {
		this.dialogRefData = data;
		console.log(this.dialogRefData);
	}

	openLink(event: MouseEvent): void {
		event.preventDefault();
	}
	closeModal() {
		// this.dialogRef.close({ regConfig: this.items });
	}
	ngOnInit() {
		this.createForm();
	}
	// default value multiple select
	bindData() {
		const anotherList: any[] = [this.toppingList[0], this.toppingList[1]];
		this.toppings.setValue(anotherList);
	}
	createForm() {
		this.rfField = this.fbField.group({
			name: ["", Validators.required],
			required: new FormControl(false),
			errorMessage: [""],
			security: new FormControl(false),
			tracking: new FormControl(false),
			// placeholder: [""],
			description: [""],
			fieldType: ["", Validators.required],
			displayFormat: ["", Validators.required],
			parttern: ["", Validators.required]
			// solutionId: [
			// 	{ value: this.solutionData.data.name, disabled: true },
			// 	Validators.required
			// ],
			// databaseId: [
			// 	{ value: this.solutionData.data.databaseName, disabled: true },
			// 	Validators.required
			// ]
		});
	}
	onSubmit(event) {
		this.isSubmit = true;
		this.dialogRef.disableClose = true;

		if (this.rfField.invalid) {
			return;
		}
		setTimeout(() => {
			let obj = this.onPreBuildItems(this.dialogRefData.type);
			this.dialogRefData = null;
			let mergedObj = { ...obj, ...this.rfField.value };
			// this.items.push(mergedObj);

			this._snackBarService.openSnackBar(
				"Add new field successfully !",
				5000
			);
			this.isSubmit = false;
			this.dialogRef.close(mergedObj);
			console.log(mergedObj);
		}, 3000);
	}

	/**
	 * prebuild item when has type input
	 * @param type
	 */
	onPreBuildItems(type: string) {
		if (FunctionBase.isEmptyOrSpaces(type)) {
			return;
		}

		let item = {
			type: "",
			inputType: ""
		};

		switch (type) {
			case FieldSetting.INPUT: {
				item.type = "input";
				item.inputType = "text";
				break;
			}
			case FieldSetting.AUTOCOMPLETE: {
				break;
			}
			default: {
				break;
			}
		}
		return item;
	}
}
