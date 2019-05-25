import { FieldConfigInterface } from "../../../../../../shared/_model-app/field.interface";
import { AppSettings } from "../../../../../../shared/_constant/app-setting";
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

	/**
	 * Constructor
	 * @param _layoutUtilsService
	 */
	constructor(private _layoutUtilsService: LayoutUtilsService) {}

	ngOnInit() {}

	/**
	 * trigger event click icon setting
	 */
	handleSetting() {
		console.log(this.field);
	}

	/**
	 * trigger event delete
	 */
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
					arr.forEach((element, index) => {
						if (
							JSON.stringify(element) ===
							JSON.stringify(this.field)
						) {
							arr.splice(index, 1);
						}
					});

					localStorage.setItem(
						AppSettings.FIELDSTORAGE,
						JSON.stringify(arr)
					);
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

	/**
	 * Get all items from local storage
	 */
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
