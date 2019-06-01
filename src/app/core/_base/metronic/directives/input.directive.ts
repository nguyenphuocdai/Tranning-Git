import {
	Directive,
	OnChanges,
	Input,
	SimpleChanges,
	ElementRef,
	HostListener
} from "@angular/core";

@Directive({
	selector: "[input]"
})
export class InputDirective implements OnChanges {
	@Input() public type: any;
	@Input() public input: any;

	constructor(private el: ElementRef) {}

	@HostListener("ngModelChange") ngOnChanges() {
		if (this.type === "database") {
			let data = this.input
				.replace(/ /g, "_")
				.trim()
				.toLowerCase();
			this.el.nativeElement.value = data;
		}
	}
}
