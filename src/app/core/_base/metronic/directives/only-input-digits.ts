import {
	Directive,
	ElementRef,
	HostListener,
	Input,
	Output,
	EventEmitter
} from "@angular/core";

@Directive({
	selector: "[ktNumbericDerective]"
})
export class NumericDirective {
	/**
	 *    Allow decimal numbers and negative values
	 */
	// private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
	/**
	 *    Allow "/(09|01[2|6|8|9])+([0-9]{8})\b/g" ---- phone number
	 */
	@Input("numericType") numericType: string; // number | decimal
	@Output() ngModelChange: EventEmitter<any> = new EventEmitter();
	/**
	 *    Allow numbers and decimal
	 */

	private regex = {
		number: new RegExp(/^\d+$/),
		decimal: new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g)
	};
	/**
	 * Not allow specialKeys input
	 */
	private specialKeys = {
		number: [
			"Backspace",
			"Tab",
			"End",
			"Home",
			"ArrowLeft",
			"ArrowRight",
			","
		],
		decimal: [
			"Backspace",
			"Tab",
			"End",
			"Home",
			"ArrowLeft",
			"ArrowRight",
			","
		]
	};

	constructor(private el: ElementRef) {}

	/**
	 * keydown check validator input
	 * @param event
	 */
	@HostListener("keydown", ["$event"])
	onKeyDown(event: KeyboardEvent) {
		if (this.numericType === "") {
			return;
		}

		if (this.specialKeys[this.numericType].indexOf(event.key) !== -1) {
			return;
		}
		// Do not use event.keycode this is deprecated.
		let current: string = this.el.nativeElement.value.replace(/,/g, "");
		let next: string = current.concat(event.key);

		if (/^0/.test(next) || this.el.nativeElement.value === "0") {
			setTimeout(() => {
				this.ngModelChange.emit("");
			}, 5);
			return;
		}

		if (
			next &&
			!String(next.replace(/,/g, "")).match(this.regex[this.numericType])
		) {
			event.preventDefault();
		}

		if (
			String(next.replace(/,/g, "")).match(
				this.regex[this.numericType]
			) &&
			next.replace(/,/g, "").length > 3
		) {
			let valueRemoveComma = next.replace(/,/g, "");
			let valueAddcomma = valueRemoveComma.replace(
				/\B(?=(\d{3})+(?!\d))/g,
				","
			);
			setTimeout(() => {
				this.ngModelChange.emit(valueAddcomma);
			}, 10);
		}
		// this.ngModelChange.emit(next);
	}

	// @HostListener("focus") onFocus() {
	// 	if (this.el.nativeElement.value.length <= 3) {
	// 		return;
	// 	}
	// 	let valueFocus = this.el.nativeElement.value.replace(/,/g, '').replace(
	// 		/\B(?=(\d{3})+(?!\d))/g,
	// 		","
	// 	);
	//     this.ngModelChange.emit(valueFocus);
	// }

	// @HostListener("blur") onBlur() {
	// 	if (this.el.nativeElement.value.length <= 3) {
	// 		return;
	// 	}
	// 	let valueBlur = this.el.nativeElement.value.replace(
	// 		/\B(?=(\d{3})+(?!\d))/g,
	// 		","
	// 	);
	// 	this.ngModelChange.emit(valueBlur);
	// }
	// example <input ktNumbericDerective numericType="decimal" type="text">
	// 0,00  => true
	// 0.00  => true
	// 01,00 => true
	// 01.00 => true
	// 0.000 => false
	// 0-01  => false
	// then use this:

	// ^\d+(\.|\,)\d{2}$
}
