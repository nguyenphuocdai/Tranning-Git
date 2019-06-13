import { ModuleService } from "./../../../../shared/_services/kt-module-services/module.service";
import { SolutionService } from "./../../../../shared/_services/kt-solution-services/solution.service";
import { ModuleModel } from "./../../../../shared/_model-app/module.model";
import { AppSettings } from "./../../../../shared/_constant/app-setting";
import { FieldConfigInterface } from "./../../../../shared/_model-app/field.interface";
import { LocalstorageService } from "./../../../../shared/_services/local-storage-service/localstorage.service";
import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	SimpleChanges,
	OnChanges,
	OnDestroy,
	ChangeDetectorRef,
	ViewChild,
	AfterViewInit
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Location } from "@angular/common";

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
		private _location: Location
	) {}

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
						this.items = element.optionsField;
						this.module = element;
						this.initColumn(this.module);
						this.Initialize();
						this.ref.detectChanges();
					}
				}
			}
		});
	}

	ngAfterViewInit() {
		if (this.module.optionsField.length > 0) {
			this.dataSource.paginator = this.paginator;
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log(changes);
	}

	/**
	 * Data EventEmitter Dynamic Form
	 * @param value
	 */
	dynamicFormSubmit(value: any) {
		this.isSubmit = true;
		// temp
		setTimeout(() => {
			this.dataForm.push(value);
			this.isSubmit = false;
			this.dataSource = new MatTableDataSource<any>(this.dataForm);
			this.ref.detectChanges();
		}, 3000);
	}

	Initialize() {
		this._solutionService.getListSolutionObs$();
		this.isSubmit = false;
	}

	ngOnDestroy() {}

	initColumn(item: ModuleModel) {
		let listOptions = item.optionsField;

		for (let i = 0; i < listOptions.length; i++) {
			const objOptions = listOptions[i];
			if (objOptions["type"] === "button") {
				continue;
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
		this.dataSource = new MatTableDataSource<any>(this.dataForm);
	}
	backClicked() {
		this._location.back();
	}
}
