import { FieldConfigInterface } from "./../../../../../../core/_model-app/field.interface";
import { AppSettings } from "./../../../../../../core/_constant/app-setting";
import { LayoutUtilsService } from "./../../../../../../core/_base/crud";
import { Component, OnInit, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
	selector: "kt-sticky-control",
	templateUrl: "./sticky-control.component.html",
	styleUrls: ["./sticky-control.component.scss"]
})
export class StickyControlComponent implements OnInit {
	@Input() field;
	@Output("ondelete") ondelete = new EventEmitter();
	constructor(private _layoutUtilsService: LayoutUtilsService) {}
	ngOnInit() {}

	handleSetting() {
		console.log(this.field);
	}

	handleDelete() {
		this._layoutUtilsService
			.deleteElement(
				"Delete",
				"Are you want to delete this item?",
				"Processing delete ..."
			)
			.afterClosed()
			.subscribe(bool => {
				if (bool) {
					let arr = this.getAllItems();
					let indexField = arr.findIndex(
						x => x.label === this.field.label
					);
					arr.splice(indexField, 1);
					
					localStorage.setItem(
						AppSettings.FIELDSTORAGE,
						JSON.stringify(arr)
					);
					console.log(arr);

					setTimeout(() => {
						this.ondelete.emit(arr);
						this._layoutUtilsService.showActionNotification(
							"Delete successfully!",
							3
						);
					}, 100);
				}
			});
	}

	getAllItems(): FieldConfigInterface[] {
		let localData: FieldConfigInterface[] = JSON.parse(
			localStorage.getItem(AppSettings.FIELDSTORAGE)
		);
		if (localData === null) {
			return;
		}
		return localData;
	}
}
