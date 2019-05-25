import { FieldConfigInterface } from "./../../../../../../shared/_model-app/field.interface";
import { DialogRefInterface } from "../../../../../../shared/_model-app/dialog-ref.interface";
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
	selector: "kt-modal-dialog",
	templateUrl: "./modal-dialog.component.html",
	styleUrls: ["./modal-dialog.component.scss"]
})
export class ModalDialogComponent implements OnInit {
	dialogRefData: DialogRefInterface;
	valueEdit: FieldConfigInterface;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DialogRefInterface,
		private dialogRef: MatDialogRef<ModalDialogComponent>
	) {
		this.dialogRefData = data;
		if (data.valueEdit) {
			this.valueEdit = data.valueEdit;
		}
	}

	ngOnInit() {}
	/**
	 * receive object data from component child
	 * @param data
	 */
	onSubmit(data) {
		this.dialogRef.close(data);
	}
}
