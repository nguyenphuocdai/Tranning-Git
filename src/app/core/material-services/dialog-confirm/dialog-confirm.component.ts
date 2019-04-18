import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
	selector: "kt-dialog-confirm",
	templateUrl: "./dialog-confirm.component.html",
	styleUrls: ["./dialog-confirm.component.scss"]
})
export class DialogConfirmComponent implements OnInit {
	title: string = "Alert";
	message: string = "Message default ?!";
	itemDelete: any;
	ngOnInit(): void {}
	constructor(
		public dialogRef: MatDialogRef<DialogConfirmComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.title = data.title;
		this.message = data.message;
		this.itemDelete = data.itemDelete;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
	getComponentTitle() {
		let result = this.title;
		// if (!this.solution || !this.solution.name) {
		// 	return result;
		// }

		// result = `Edit solution - ${this.solution.name}`;
		return result;
	}
}
