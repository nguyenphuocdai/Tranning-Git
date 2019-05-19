import { Directive, Renderer, HostListener, ElementRef, Output, EventEmitter } from "@angular/core";

@Directive({
	selector: "[ktInputToggleComma]"
})
export class InputToggleCommaDirective {
	constructor(private el: ElementRef, private renderer: Renderer) {}
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
	@HostListener("focus") onFocus() {
		if (this.el.nativeElement.value.length <= 3) {
			return;
		}
		let valueFocus = this.el.nativeElement.value.replace(/,/g, '');
        this.ngModelChange.emit(valueFocus);
	}

	@HostListener("blur") onBlur() {
		if (this.el.nativeElement.value.length <= 3) {
			return;
		}
		let valueBlur = this.el.nativeElement.value.replace(
			/\B(?=(\d{3})+(?!\d))/g,
			","
		);
		this.ngModelChange.emit(valueBlur);
	}
}
