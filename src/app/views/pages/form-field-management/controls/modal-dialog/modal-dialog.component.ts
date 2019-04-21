import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";

@Component({
	selector: "kt-modal-dialog",
	templateUrl: "./modal-dialog.component.html",
	styleUrls: ["./modal-dialog.component.scss"]
})
export class ModalDialogComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		// this.bindData();
		console.log(data);
	}
	toppings = new FormControl();
	toppingList = [
		"Extra cheese",
		"Mushroom",
		"Onion",
		"Pepperoni",
		"Sausage",
		"Tomato"
	];

	openLink(event: MouseEvent): void {
		// this.bottomSheetRef.dismiss();
		event.preventDefault();
	}

	ngOnInit() {}
	// default value multiple select
	bindData() {
		const anotherList: any[] = [this.toppingList[0], this.toppingList[1]];

		this.toppings.setValue(anotherList);
	}
}
