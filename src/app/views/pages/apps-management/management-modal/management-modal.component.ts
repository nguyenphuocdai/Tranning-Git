import { Component, OnInit, Inject, EventEmitter, Output } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
	selector: "kt-management-modal",
	templateUrl: "./management-modal.component.html",
	styleUrls: ["./management-modal.component.scss"]
})
export class ManagementModalComponent implements OnInit {
	@Output() submitClicked = new EventEmitter<any>();

	isSubmit: boolean = false;
	hasMultiple: boolean = false;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {}

	/**
	 * Data EventEmitter Dynamic Form
	 * @param value
	 */
	dynamicFormSubmit(value: any) {
		this.isSubmit = true;
		setTimeout(() => {
			let obj = {
				hasMultiple: this.hasMultiple,
				value: value
			};
			this.submitClicked.emit(obj);
			this.isSubmit = false;
		}, 3000);
	}
}
