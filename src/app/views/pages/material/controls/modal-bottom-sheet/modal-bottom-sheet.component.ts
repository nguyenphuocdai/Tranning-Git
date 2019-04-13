import { Component, OnInit, Inject } from "@angular/core";
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MAT_DIALOG_DATA } from "@angular/material";

@Component({
	selector: "kt-modal-bottom-sheet",
	templateUrl: "./modal-bottom-sheet.component.html",
	styleUrls: ["./modal-bottom-sheet.component.scss"]
})
export class ModalBottomSheetComponent implements OnInit {
	constructor(
		private bottomSheetRef: MatBottomSheetRef<ModalBottomSheetComponent>,
		// inject receive data when call modal
		@Inject(MAT_BOTTOM_SHEET_DATA) public data: any
	) {
		console.log(data);
	}

	openLink(event: MouseEvent): void {
		this.bottomSheetRef.dismiss();
		event.preventDefault();
	}

	ngOnInit() {}
}
