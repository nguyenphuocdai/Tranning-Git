import { ModalDialogComponent } from './../material/controls/modal-dialog/modal-dialog.component';
import { ModalBottomSheetComponent } from "./../material/controls/modal-bottom-sheet/modal-bottom-sheet.component";
import { Component, OnInit } from "@angular/core";
import { MatBottomSheet, MatDialog } from "@angular/material";

@Component({
	selector: "kt-builder",
	templateUrl: "./builder.component.html",
	styleUrls: ["./builder.component.scss"]
})
export class BuilderComponent implements OnInit {
	panelOpenState: boolean = false;
	data = {
		animal: "panda"
	};
	constructor(
		// private bottomSheet: MatBottomSheet,
		// public dialog: MatDialog
	) {}

	ngOnInit() {}

	// openBottomSheet(): void {
	// 	this.bottomSheet.open(ModalBottomSheetComponent, {
	// 		data: { names: ["Frodo", "Bilbo"], panelClass: "container" }
	// 	});
	// }
	// openDialog() {
	// 	this.dialog.open(ModalDialogComponent, {
	// 		data: this.data,
	// 		width: '80%',
	// 		panelClass: ''
	// 	});
	// }
}
