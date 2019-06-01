import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfigInterface } from "../../../../../../core/auth";
import { TypesUtilsService } from "../../../../../../core/_base/crud";
@Component({
	selector: "app-number",
	templateUrl: "number.component.html",
	styles: [
		`
			.mat-error {
				color: #fd397a !important;
			}
		`
	]
})
export class NumberComponent implements OnInit {
	field: FieldConfigInterface;
	group: FormGroup;
	hasError: boolean = false;
	constructor() {}
	ngOnInit() {}
	onNumberChange(event) {
		// let regexpNumber = new RegExp(/^(\d+$)([\.,])+$/);

		let controlValue = this.group.controls[this.field.name].value;
		if (!controlValue) {
			return;
		}

		// if (controlValue.match(regexpNumber)) {
		// 	console.log(1);
		// 	return;
		// } else {
		// 	this.group.controls[this.field.name].setValue(controlValue.replace(event.key,""));
		// 	// console.log(2);
		// 	return;
		// }
		// if (!this.group.controls[this.field.name].value) {
		// 	return;
		// }
		// let current: string = this.group.controls[
		// 	this.field.name
		// ].value.replace(/,/g, "");
		// let next: string = current.concat(event.key);
		// console.log(String(next.replace(/,/g, "")).match(regexpNumber));
		// if (
		// 	String(next.replace(/,/g, "")).match(regexpNumber) &&
		// 	next.replace(/,/g, "").length > 3
		// ) {
		// 	let valueRemoveComma = next.replace(/,/g, "");
		// 	let valueAddcomma = valueRemoveComma.replace(
		// 		/\B(?=(\d{3})+(?!\d))/g,
		// 		","
		// 	);

		// 	if (valueAddcomma.split(".").length === 2) {
		// 		let numberDecimal = parseInt(
		// 			this.group.controls[this.field.name].value,
		// 			10
		// 		);
		// 		this.maxlength = valueAddcomma.length + 1 + numberDecimal;
		// 	}

		// 	setTimeout(() => {
		// 		this.group.controls[this.field.name].setValue(valueAddcomma);
		// 	}, 10);
		// }
		// }
	}
	onBlur() {
		this.hasError = false;
		let numberDecimal = parseInt(this.field.numberDecimal, 10);
		let regexDecimal = new RegExp(
			/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d{1,12})?$/
		);
		let controlValue = this.group.controls[this.field.name].value;
		if (!controlValue) {
			return;
		}

		if (controlValue.match(regexDecimal)) {
			console.log(1);
			let arrSplit = controlValue.split(".");
			let valueAddcomma;
			if (arrSplit.length === 2) {
				valueAddcomma = arrSplit[0].replace(
					/\B(?=(\d{3})+(?!\d))/g,
					","
				);
				valueAddcomma = valueAddcomma.concat("." + arrSplit[1]);
			} else {
				valueAddcomma = controlValue.replace(
					/\B(?=(\d{3})+(?!\d))/g,
					","
				);
			}
			this.group.controls[this.field.name].setValue(valueAddcomma);
		} else {
			this.hasError = true;
		}
	}
}
