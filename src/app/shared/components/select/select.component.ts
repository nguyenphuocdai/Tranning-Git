import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { FieldConfigInterface } from "../../_model-app/field.interface";
@Component({
	selector: "app-select",
	templateUrl: "select.component.html"
})
export class SelectComponent implements OnInit {
	field: FieldConfigInterface;
	group: FormGroup;
	mySelections: any;
	constructor() {}
	ngOnInit() {}

	handleChangeTwoOptions() {
		if (this.group.controls[this.field.name].value.length <= 2) {
			this.mySelections = this.group.controls[this.field.name].value;
		} else {
			this.group.controls[this.field.name].setValue(this.mySelections);
		}
	}

}
