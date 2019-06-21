import { PreviewImageComponent } from "./../../../../shared/components/preview-image/preview-image.component";
import { SolutionService } from "./../../../../shared/_services/kt-solution-services/solution.service";
import { ModuleModel } from "./../../../../shared/_model-app/module.model";
import { AppSettings } from "./../../../../shared/_constant/app-setting";
import { FieldConfigInterface } from "./../../../../shared/_model-app/field.interface";
import { LocalstorageService } from "./../../../../shared/_services/local-storage-service/localstorage.service";
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
import { ManagementModalComponent } from "../management-modal/management-modal.component";

/**
 * @title Table with pagination
 */
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
	isSubmit: boolean = false;
	specialColumnUpload: string = "";
	specialColumnDate: string = "";
	/**
	 * Init
	 * @param localstorageService
	 * @param activatedRoute
	 * @param _solutionService
	 * @param ref
	 * @param _location
	 */
	constructor(
		private localstorageService: LocalstorageService,
		private activatedRoute: ActivatedRoute,
		private _solutionService: SolutionService,
		private ref: ChangeDetectorRef,
		private _location: Location,
		private router: Router,
		private dialog: MatDialog
	) {
		router.events.subscribe(val => {
			if (val instanceof NavigationEnd) {
				this.columns = [];
				if (!this.module) {
					return;
				}
				this.initColumn(this.module);
			}
		});
	}

	ngOnInit() {
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
						this.initColumn(this.module);
						return;
						// this.ref.detectChanges();
					}
				}
			}
		});
	}

	ngAfterViewInit() {
		if (this.module.optionsField.length > 0 && this.dataSource) {
			this.dataSource.paginator = this.paginator;
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log(changes);
	}

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

	// /**
	//  * Data EventEmitter Dynamic Form
	//  * @param value
	//  */
	// dynamicFormSubmit(value: any) {
	// 	this.isSubmit = true;
	// 	// temp
	// 	setTimeout(() => {
	// 		this.dataForm.push(value);
	// 		this.isSubmit = false;
	// 		this.dataSource = new MatTableDataSource<any>(this.dataForm);
	// 		this.storeDataForm(value);
	// 		// this.ref.detectChanges();
	// 	}, 3000);
	// }

	Initialize() {
		this._solutionService.getListSolutionObs$();
		this.isSubmit = false;
	}

	/**
	 * Store data submit to local storage
	 * @param value
	 */
	storeDataForm(value) {
		if (!value) {
			return;
		}
		let localData = this.localstorageService.get(AppSettings.DATASTORAGE);
		if (!localData) {
			localData = [
				{
					moduleId: this.module.id,
					data: []
				}
			];
		}
		for (let i = 0; i < localData.length; i++) {
			const element = localData[i];
			if (element.moduleId === this.module.id) {
				element.data.push(value);
				this.localstorageService.set(
					AppSettings.DATASTORAGE,
					localData
				);
				return;
			}
		}
	}

	ngOnDestroy() {}

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

		this.dataForm = this.getDataForm();
		this.dataSource = new MatTableDataSource<any>(this.dataForm);
		this.dataSource.paginator = this.paginator;
	}

	onCreateData() {
		const dialogRef = this.dialog.open(ManagementModalComponent, {
			data: { items: this.items, module: this.module }
		});

		dialogRef.componentInstance.submitClicked.subscribe(result => {
			if (result.hasMultiple === false) {
				dialogRef.close();
			}

			this.dataForm.push(result.value);
			this.isSubmit = false;
			this.dataSource = new MatTableDataSource<any>(this.dataForm);
			this.storeDataForm(result.value);
			this.ref.detectChanges();
		});
		// dialogSubmitSubscription.unsubscribe();
	}

	getDataForm() {
		let localData = this.localstorageService.get(AppSettings.DATASTORAGE);
		if (!localData) {
			return [];
		}

		for (let i = 0; i < localData.length; i++) {
			const element = localData[i];
			if (element.moduleId === this.module.id) {
				console.log(element.data);
				return element.data;
			}
		}
	}

	backClicked() {
		this._location.back();
	}
	editItem(item) {
		console.log(item);
	}
	deleteItem(item) {
		console.log(item);
	}

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
}
