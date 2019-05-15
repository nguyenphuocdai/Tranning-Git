import { DialogRefInterface } from "./../../../../../../core/_model-app/dialog-ref.interface";
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
	selector: "kt-modal-dialog",
	templateUrl: "./modal-dialog.component.html",
	styleUrls: ["./modal-dialog.component.scss"]
})
export class ModalDialogComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DialogRefInterface,
		private dialogRef: MatDialogRef<ModalDialogComponent>
	) {
		console.log(this.data);
	}

	ngOnInit() {}
	/**
	 * receive object data from component child
	 * @param event
	 */
	onSubmit(event) {
		console.log(event);
		this.dialogRef.close(event);
	}
}
