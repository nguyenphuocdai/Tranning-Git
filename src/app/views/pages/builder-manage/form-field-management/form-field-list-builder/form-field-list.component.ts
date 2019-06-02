import { AsideService } from "./../../../../themes/default/aside-service.service";
import { DynamicFormComponent } from "./../../../../../shared/components/dynamic-form/dynamic-form.component";
import { ModuleModel } from "./../../../../../shared/_model-app/module.model";
import { ActivatedRoute } from "@angular/router";
import { LocalstorageService } from "./../../../../../shared/_services/local-storage-service/localstorage.service";
import { data } from "./../../../../../shared/_mock-updata/mk-drag-data";
import { LayoutUtilsService } from "./../../../../../core/_base/crud";
import { ModalDialogComponent } from "../controls/modal-dialog/modal-dialog.component";
import { FieldConfigInterface } from "../../../../../shared/_model-app/field.interface";
import {
	Component,
	OnInit,
	ChangeDetectorRef,
	ViewChild,
	AfterViewInit
} from "@angular/core";
import { Location } from "@angular/common";
import {
	CdkDragDrop,
	transferArrayItem,
	CdkDragStart,
	CdkDragEnd
} from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material";
import { AppSettings } from "../../../../../shared/_constant/app-setting";
@Component({
	selector: "kt-form-field-list",
	templateUrl: "./form-field-list.component.html",
	styleUrls: ["./form-field-list.component.scss"]
})
export class FormFieldListComponent implements OnInit, AfterViewInit {
	@ViewChild(DynamicFormComponent) dynamicFormControl: DynamicFormComponent;
	panelOpenState: boolean = false;
	regConfig: FieldConfigInterface[] = [];
	items: FieldConfigInterface[] = [];
	todo = [];
	isDragging: boolean = false;
	moduleOpenning: string = "";
	// mockup-data
	stableData = data;

	/**
	 * Constructor DI
	 * @param _activatedRoute
	 * @param _location
	 * @param _dialog
	 * @param _ref
	 * @param _layoutUtilsService
	 * @param _localstorageService
	 */
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _location: Location,
		private _dialog: MatDialog,
		private _ref: ChangeDetectorRef,
		private _layoutUtilsService: LayoutUtilsService,
		private _localstorageService: LocalstorageService,
		private asideService: AsideService
	) {}

	/**
	 * On init
	 */
	ngOnInit() {
		this.resetList();
		// this.items = this._localstorageService.get(AppSettings.FIELDSTORAGE);

		this._activatedRoute.params.subscribe(params => {
			const id = params["id"];
			if (id && id.length > 0) {
				this.moduleOpenning = id;

				let listModule: ModuleModel[] = this._localstorageService.get(
					AppSettings.MODULESTORAGE
				);
				listModule.forEach((element, index) => {
					if (element.name === id) {
						if (
							element.optionsField === undefined ||
							element.optionsField.length === 0
						) {
							this.items = [];
							return false;
						}
						this.items = listModule[index].optionsField;
					}
				});
			}
		});
		this.asideService.emitSolutions();
	}

	ngAfterViewInit() {
		// setTimeout(() =>
		// 	this._layoutUtilsService.showActionNotification("123123213")
		// );
	}
	/**
	 * event drop from source to preview (temp not use)
	 * @param event CdkDragDrop
	 */
	drop(event: CdkDragDrop<string[]>) {}

	/**
	 * event drop from preview to source
	 * @param event CdkDragDrop
	 */
	dropFromPreview(event: CdkDragDrop<string[]>) {
		if (event.previousContainer === event.container) {
			return false;
		} else {
			this._dialog
				.open(ModalDialogComponent, {
					data: this.stableData[event.previousIndex],
					width: "70%",
					panelClass: "",
					maxHeight: "90vh"
				})
				.beforeClosed()
				.subscribe(response => {
					if (response) {
						transferArrayItem(
							event.previousContainer.data,
							event.container.data,
							event.previousIndex,
							event.currentIndex
						);

						this.items = this.getAllItems();

						this.items.push(response);
						this.regConfig = this.items;

						// local strorage
						let arrLocal = this.getAllItems();

						if (arrLocal !== null && this.items.length === 0) {
							this.items = this.items.concat(arrLocal);
						}

						for (let i = 0; i < this.items.length; i++) {
							if (this.items[i].hasOwnProperty("valueView")) {
								this.items.splice(i, 1);
							}
						}

						this.afterSubmit(this.items);

						this._ref.markForCheck();
						this.resetList();
						this.dynamicFormControl.ngOnInit();
					}
				});
		}
	}
	/** Predicate function that doesn't allow items to be dropped into a list. */
	noReturnPredicate() {
		return false;
	}
	/**
	 * reset list source
	 */
	private resetList() {
		this.todo = this.stableData.slice();
	}

	/**
	 * previous routerlink
	 */
	backClicked() {
		this._location.back();
	}

	/**
	 * submit form
	 * @param value
	 */
	dynamicFormSubmit(value: any) {
		console.log(value);
	}

	dragStarted(event: CdkDragStart) {
		this.isDragging = true;
	}

	dragEnded(event: CdkDragEnd) {
		this.isDragging = false;
	}

	onReset() {
		this._layoutUtilsService
			.deleteElement(
				"Alert Reset Form",
				"Are you want to reset this form?",
				"Processing reset ...",
				"Reset All"
			)
			.afterClosed()
			.subscribe(bool => {
				if (bool) {
					this.items = [];

					let listModule: ModuleModel[] = this._localstorageService.get(
						AppSettings.MODULESTORAGE
					);

					listModule.forEach((element, index) => {
						if (element.name === this.moduleOpenning) {
							element.optionsField = this.items;
							this._localstorageService.set(
								AppSettings.MODULESTORAGE,
								listModule
							);
						}
					});
					// localStorage.removeItem(AppSettings.FIELDSTORAGE);
					this._ref.markForCheck();
					this.dynamicFormControl.ngOnInit();
				}
			});
	}

	onSubmit() {
		let listModule: ModuleModel[] = this._localstorageService.get(
			AppSettings.MODULESTORAGE
		);

		this._layoutUtilsService
			.deleteElement(
				"Alert Submit Form",
				"Are you want to submit this form?",
				"Processing submit ...",
				"Yes"
			)
			.afterClosed()
			.subscribe(bool => {
				if (bool) {
					listModule.forEach((element, index) => {
						if (element.name === this.moduleOpenning) {
							listModule[index].optionsField = this.items;
							this._localstorageService.set(
								AppSettings.MODULESTORAGE,
								listModule
							);
						}
					});
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

	afterSubmit(arr: FieldConfigInterface[]) {
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
}
