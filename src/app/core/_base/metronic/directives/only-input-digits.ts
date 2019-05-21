import { Directive, ElementRef, HostListener, Input } from "@angular/core";

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
		number: ["Backspace", "Tab", "End", "Home", "ArrowLeft", "ArrowRight",","],
		decimal: ["Backspace", "Tab", "End", "Home", "ArrowLeft", "ArrowRight", ","]
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
		let current: string = this.el.nativeElement.value;
		let next: string = current.concat(event.key);
		if (next && !String(next).match(this.regex[this.numericType])) {
			event.preventDefault();
		}
	}

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
