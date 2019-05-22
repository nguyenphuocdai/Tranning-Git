import { LayoutUtilsService } from "./../../../../../../core/_base/crud";
import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "kt-sticky-control",
	templateUrl: "./sticky-control.component.html",
	styleUrls: ["./sticky-control.component.scss"]
})
export class StickyControlComponent implements OnInit {
	constructor(private _layoutUtilsService: LayoutUtilsService) {}
	@Input() field;
	ngOnInit() {}
	handleSetting() {
		console.log(this.field);
	}
	handleDelete() {
		this._layoutUtilsService.deleteElement(
			"Delete",
			"Are you want to delete this item?",
			"Processing delete ..."
		);
		console.log("on delete");
	}
}
