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
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<ModalDialogComponent>,
		private fbField: FormBuilder
	) {
		// this.bindData();
		console.log(data);
	}
	// items: FieldConfig[] = [];
	items = [];
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
	emailFormControl = new FormControl('', [
		Validators.required
	  ]);

	openLink(event: MouseEvent): void {
		event.preventDefault();
	}
	closeModal() {
		this.dialogRef.close({ isSuccess: true });
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
		this.items.push(this.rfField.value);
		console.log(this.items);
	}
}
