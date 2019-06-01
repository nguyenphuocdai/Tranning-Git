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
	// isShowMinMaxError: boolean;
	constructor(private _typeUltiService: TypesUtilsService) {}
	ngOnInit() {}
	// onCheckMinMax(min, max) {
	// 	this.isShowMinMaxError = true;
	// 	let previewInput = this.group.controls[this.field.name].value;

	// 	if (
	// 		min === undefined ||
	// 		max === undefined ||
	// 		previewInput === undefined
	// 	) {
	// 		return;
	// 	}
	// 	let fMinValue = parseFloat(min.replace(",", ""));
	// 	let fMaxValue = parseFloat(max.replace(",", ""));
	// 	let floatInput = parseFloat(previewInput.replace(",", ""));
	// 	if (floatInput >= fMinValue && floatInput <= fMaxValue) {
	// 		this.isShowMinMaxError = false;
	// 	}
	// }
	// onFocus() {
	// 	let value = this.group.controls[this.field.name].value;
	// 	if (value === undefined || value === null || value.length <= 3) {
	// 		return;
	// 	}
	// 	this.group.controls[this.field.name].setValue(
	// 		this._typeUltiService.digitRemoveComma(value)
	// 	);
	// }
	// onBlur() {
	// 	let value = this.group.controls[this.field.name].value;
	// 	if (value === undefined || value === null || value.length <= 3) {
	// 		return;
	// 	}
	// 	this.group.controls[this.field.name].setValue(
	// 		this._typeUltiService.digitAddComma(value)
	// 	);
	// }
	onNumberChange(event) {
		console.log(event);
		let regexpNumber = new RegExp(/^\d+$/);
		// let allowKey =  [
		// 	"Backspace",
		// 	"Tab",
		// 	"End",
		// 	"Home",
		// 	"ArrowLeft",
		// 	"ArrowRight",
		// 	","
		// ];
		// if (allowKey.indexOf(event.key) !== -1) {
		// 	return;
		// }
		// const charCode = (event.which) ? event.which : event.keyCode;
		// if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		//   return false;
		// }
		// Do not use event.keycode this is deprecated.
		let current: string = this.group.controls[this.field.name].value.replace(/,/g, "");
		let next: string = current.concat(event.key);
		if (
			String(next.replace(/,/g, "")).match(regexpNumber) &&
			next.replace(/,/g, "").length > 3
		) {
			let valueRemoveComma = next.replace(/,/g, "");
			let valueAddcomma = valueRemoveComma.replace(
				/\B(?=(\d{3})+(?!\d))/g,
				","
			);
			setTimeout(() => {
				// let control = this.group.controls[this.field.name];
				// let controlValue = this.group.controls[this.field.name].value;
				// let numberDecimal = parseInt(this.group.controls[this.field.numberDecimal].value,10);

				// let arrSplitpreviewInput = controlValue.split(".");
				// control.setValue(arrSplitpreviewInput[0]);
				// let valuePadEnd = controlValue.concat(".").padEnd(controlValue.length + 1 + numberDecimal, "0");

				this.group.controls[this.field.name].setValue(valueAddcomma);
			}, 10);
		}
	}
}
