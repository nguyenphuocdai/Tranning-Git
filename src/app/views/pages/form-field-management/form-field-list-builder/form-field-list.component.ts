import { Component, OnInit } from "@angular/core";

@Component({
	selector: "kt-form-field-list",
	templateUrl: "./form-field-list.component.html",
	styleUrls: ["./form-field-list.component.scss"]
})
export class FormFieldListComponent implements OnInit {
	panelOpenState: boolean = false;
	data = {
		animal: "panda"
	};
	constructor() {}

	ngOnInit() {}
}
