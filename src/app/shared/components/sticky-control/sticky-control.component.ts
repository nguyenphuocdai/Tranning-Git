import { ModalDialogComponent } from "./../../../views/pages/builder-manage/form-field-management/controls/modal-dialog/modal-dialog.component";
import { LayoutUtilsService } from "./../../../core/_base/crud/utils/layout-utils.service";
import { Component, OnInit, Input, Output, ViewChild } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { LocalstorageService } from "../../_services/local-storage-service/localstorage.service";
import { FieldConfigInterface } from "../../_model-app/field.interface";
import { ModuleModel } from "../../_model-app/module.model";
import { AppSettings } from "../../_constant/app-setting";
// import { DynamicFormComponent } from "../dynamic-form/dynamic-form.component";

@Component({
	selector: "kt-sticky-control",
	templateUrl: "./sticky-control.component.html",
	styleUrls: ["./sticky-control.component.scss"]
})
export class StickyControlComponent implements OnInit {
	@Input() field;
	@Output("ondelete") ondelete = new EventEmitter();
	// @ViewChild(DynamicFormComponent) dynamicFormControl: DynamicFormComponent;
	moduleOpenning: string = "";
	/**
	 * Constructor
	 * @param _layoutUtilsService
	 * @param _dialog
	 */
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _layoutUtilsService: LayoutUtilsService,
		private _dialog: MatDialog,
		private _localstorageService: LocalstorageService
	) {}

	ngOnInit() {
		this._activatedRoute.params.subscribe(params => {
			const id = params["id"];
			if (id && id.length > 0) {
				this.moduleOpenning = id;
			}
		});
	}

	/**
	 * trigger event click icon setting
	 */
	handleSetting() {
		this._dialog
			.open(ModalDialogComponent, {
				data: { type: this.field.type, valueEdit: this.field },
				width: "70%",
				panelClass: "",
				maxHeight: "90vh"
			})
			.beforeClosed()
			.subscribe(response => {
				if (response) {
					console.log(response);
					this.afterSetting(response);
				}
			});
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

					this.afterDelete(arr);
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
		let listModule: ModuleModel[] = this._localstorageService.get(
			AppSettings.MODULESTORAGE
		);
		let localData: FieldConfigInterface[] = [];

		listModule.forEach((element, index) => {
			if (element.name === this.moduleOpenning) {
				if (
					element.optionsField === undefined ||
					element.optionsField.length === 0
				) {
					localData = [];
					return false;
				}
				localData = listModule[index].optionsField;
			}
		});
		return localData;
	}

	afterDelete(arr: FieldConfigInterface[]) {
		let listModule: ModuleModel[] = this._localstorageService.get(
			AppSettings.MODULESTORAGE
		);
		listModule.forEach((element, index) => {
			if (element.name === this.moduleOpenning) {
				listModule[index].optionsField = arr;

				this._localstorageService.set(
					AppSettings.MODULESTORAGE,
					listModule
				);
			}
		});
	}

	afterSetting(response: FieldConfigInterface) {
		let listModule: ModuleModel[] = this._localstorageService.get(
			AppSettings.MODULESTORAGE
		);
		listModule.forEach((element, index) => {
			if (element.name === this.moduleOpenning) {
				let arrFields = listModule[index].optionsField;
				arrFields.forEach((item, i) => {
					if (item.id === response.id) {
						listModule[index].optionsField[i] = response;
					}
				});
				this._localstorageService.set(
					AppSettings.MODULESTORAGE,
					listModule
				);
				this.ondelete.emit(listModule[index].optionsField);
			}
		});
	}
}
