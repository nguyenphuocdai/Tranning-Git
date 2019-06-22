import { DialogConfirmDeleteComponent } from "./../../../../core/material-services/dialog-confirm/dialog-confirm.component";
import {
	Component,
	OnInit,
	SimpleChanges,
	OnChanges,
	OnDestroy,
	ChangeDetectorRef,
	ViewChild,
	AfterViewInit
} from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { MatPaginator, MatTableDataSource, MatDialog } from "@angular/material";
import { Location } from "@angular/common";
import { Subscription } from "rxjs";
import { ManagementService } from "./../../../../shared/_services/kt-management-services/management.service";
import { PreviewImageComponent } from "./../../../../shared/components/preview-image/preview-image.component";
import { SolutionService } from "./../../../../shared/_services/kt-solution-services/solution.service";
import { ModuleModel } from "./../../../../shared/_model-app/module.model";
import { AppSettings } from "./../../../../shared/_constant/app-setting";
import { FieldConfigInterface } from "./../../../../shared/_model-app/field.interface";
import { LocalstorageService } from "./../../../../shared/_services/local-storage-service/localstorage.service";
import { ManagementModalComponent } from "../management-modal/management-modal.component";

@Component({
	selector: "kt-management",
	templateUrl: "./management.component.html",
	styleUrls: ["./management.component.scss"]
})
export class ManagementComponent
	implements OnInit, OnChanges, OnDestroy, AfterViewInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	displayedColumns = [];
	columns = [];
	dataForm = [];
	items: FieldConfigInterface[] = [];
	dataSource: any;
	module: ModuleModel;
	specialColumnUpload: string = "";
	specialColumnDate: string = "";
	dataModuleSubscription: Subscription;

	/**
	 * Init
	 * @param localstorageService
	 * @param activatedRoute
	 * @param ref
	 * @param router
	 * @param dialog
	 * @param managementService
	 * @param _location
	 * @param _solutionService
	 */
	constructor(
		private localstorageService: LocalstorageService,
		private activatedRoute: ActivatedRoute,
		private ref: ChangeDetectorRef,
		private router: Router,
		private dialog: MatDialog,
		private managementService: ManagementService,
		private _location: Location,
		private _solutionService: SolutionService
	) {
		this.refreshChangeRouter();
		this.setModuleActiveRoute();
	}

	/**
	 * OnInit
	 */
	ngOnInit() {}

	/**
	 * AfterViewInit
	 */
	ngAfterViewInit() {
		if (this.module.optionsField.length > 0 && this.dataSource) {
			this.dataSource.paginator = this.paginator;
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		// console.log(changes);
	}

	/**
	 * Set Module when Router Active
	 */
	setModuleActiveRoute() {
		this.activatedRoute.params.subscribe(params => {
			const id = params["id"];
			if (id && id.length > 0) {
				let listModule = this.localstorageService.get(
					AppSettings.MODULESTORAGE
				);
				for (let i = 0; i < listModule.length; i++) {
					const element: ModuleModel = listModule[i];
					if (element.name === id) {
						this.items = this.bindDefaultButton(
							element.optionsField
						);
						this.module = element;

						this.dataModuleSubscription = this.managementService.currentDataModules.subscribe(
							listDataModules => {
								if (!listDataModules) {
									return;
								}
								let dataModule = listDataModules.find(
									x => x.moduleId === this.module.id
								);
								this.dataForm = dataModule.data;
								this.dataSource = new MatTableDataSource<any>(
									this.dataForm
								);
							}
						);
						this.initColumn(this.module);
						return;
					}
				}
			}
		});
	}

	/**
	 * refresh when change Router
	 */
	refreshChangeRouter() {
		this.router.events.subscribe(val => {
			if (val instanceof NavigationEnd) {
				this.columns = [];
				if (!this.module) {
					return;
				}
				this.initColumn(this.module);
			}
		});
	}

	/**
	 * Create button default if data field's not contains button
	 * @param item
	 */
	bindDefaultButton(item: FieldConfigInterface[]): FieldConfigInterface[] {
		let btn = {
			database: "submit",
			id: "mMARoiyfQraZzsai",
			inputType: "Button",
			label: "Submit",
			name: "Submit",
			required: false,
			security: false,
			tracking: false,
			type: "button"
		};

		if (item.filter(x => x.type === "button").length === 1) {
			return item;
		}
		return item.concat(btn);
	}

	/**
	 * Initialize
	 */
	Initialize() {
		this._solutionService.getListSolutionObs$();
	}

	/**
	 * InitColumn
	 * @param item
	 */
	initColumn(item: ModuleModel) {
		let listOptions = item.optionsField;
		for (let i = 0; i < listOptions.length; i++) {
			const objOptions = listOptions[i];

			if (objOptions["type"] === "button") {
				continue;
			}
			if (objOptions["type"] === "fupload") {
				this.specialColumnUpload = objOptions["name"];
			}
			if (objOptions["type"] === "datepicker") {
				this.specialColumnDate = objOptions["name"];
			}
			// header column table (name of object optionsField)
			let headerName = objOptions["name"];
			// binding headerName to object
			this.displayedColumns.push(headerName);

			let obj = {
				columnDef: headerName,
				header: headerName.toUpperCase(),
				cell: (element: Element) => `${element[headerName]}`
			};

			this.columns.push(obj);
		}

		this.displayedColumns = this.columns.map(c => c.columnDef);
		this.displayedColumns.push("ACTIONS");
		this.Initialize();

		this.dataSource = new MatTableDataSource<any>(this.dataForm);
		this.dataSource.paginator = this.paginator;
	}

	/**
	 * CreateData
	 */
	onCreateData() {
		const dialogRef = this.dialog.open(ManagementModalComponent, {
			data: { items: this.items, module: this.module }
		});

		dialogRef.componentInstance.submitClicked.subscribe(result => {
			if (result.hasMultiple === false) {
				dialogRef.close();
			}

			this.managementService.addDataModule(result.value, this.module.id);
			this.ref.detectChanges();
		});
	}

	/**
	 * Edit Item
	 * @param rowData
	 */
	editItem(rowData) {
		const dialogRef = this.dialog.open(ManagementModalComponent, {
			data: { items: this.items, module: this.module, rowData: rowData }
		});

		dialogRef.componentInstance.submitClicked.subscribe(result => {
			dialogRef.close();
			this.managementService.editDataModule(result.value, this.module.id);
			this.ref.detectChanges();
		});
	}

	/**
	 * Delete Item
	 * @param item
	 */
	deleteItem(item) {
		let title = "Alert Confirm";
		let message = "Are you sure delete item this?";

		this.dialog
			.open(DialogConfirmDeleteComponent, {
				width: "400px",
				data: { title: title, message: message, itemDelete: item }
			})
			.afterClosed()
			.subscribe(itemDelete => {
				if (itemDelete) {
					this.managementService.deleteDataModule(
						itemDelete,
						this.module.id
					);
					this.ref.detectChanges();
				}
			});
	}

	/**
	 * Preview Image
	 * @param item
	 */
	onPreviewImage(item) {
		let dataFiles = item[this.specialColumnUpload].files;
		this.dialog
			.open(PreviewImageComponent, {
				height: "70vh",
				data: { file: dataFiles }
			})
			.afterClosed()
			.subscribe(x => {
				console.log(x);
			});
	}

	/**
	 * Back Clicked
	 */
	backClicked() {
		this._location.back();
	}
	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.dataModuleSubscription.unsubscribe();
	}
}
