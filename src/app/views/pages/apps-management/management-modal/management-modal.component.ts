import { TypesUtilsService } from "./../../../../core/_base/crud/utils/types-utils.service";
import { ModuleModel } from "../../../../shared/_model-app/module.model";
import { FieldConfigInterface } from "./../../../../shared/_model-app/field.interface";
import { Component, OnInit, Inject, EventEmitter, Output } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
	selector: "kt-management-modal",
	templateUrl: "./management-modal.component.html",
	styleUrls: ["./management-modal.component.scss"]
})
export class ManagementModalComponent implements OnInit {
	@Output() submitClicked = new EventEmitter<any>();

	isSubmit: boolean = false;
	hasMultiple: boolean = false;
	module: ModuleModel;
	fields: FieldConfigInterface[] = [];
	rowData: any = [];
	isShowMultipleCheckbox: boolean = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private typesUtilsService: TypesUtilsService
	) {}

	ngOnInit() {
		// binding again
		this.isShowMultipleCheckbox = true;
		// ---
		this.module = this.data.module;
		this.fields = this.data.items;

		if (this.data.rowData) {
			this.isShowMultipleCheckbox = false;
			this.rowData = this.data.rowData;
		}
	}

	/**
	 * Data EventEmitter Dynamic Form
	 * @param value
	 */
	dynamicFormSubmit(value: any) {
		this.isSubmit = true;
		if (!this.data.rowData) {
			value.id = this.typesUtilsService.makeid(12);
		} else {
			value.id = this.data.rowData.id;
		}

		setTimeout(() => {
			let obj = {
				value: value,
				hasMultiple: this.hasMultiple
			};
			this.submitClicked.emit(obj);
			this.isSubmit = false;
		}, 3000);
	}
}
