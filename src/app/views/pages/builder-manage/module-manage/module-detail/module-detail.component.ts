import { TypesUtilsService } from "./../../../../../core/_base/crud/utils/types-utils.service";
import { ModuleModel } from "./../../../../../shared/_model-app/module.model";
import { ModuleService } from "./../../../../../shared/_services/kt-module-services/module.service";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
	selector: "kt-module-detail",
	templateUrl: "./module-detail.component.html",
	styleUrls: ["./module-detail.component.scss"]
})
export class ModuleDetailComponent implements OnInit, AfterViewInit {
	displayedColumns = [];
	dataSource: any;
	columns = [];
	module: ModuleModel;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngAfterViewInit() {
		if (this.module.optionsField.length > 0) {
			this.dataSource.paginator = this.paginator;
		}
	}
	constructor(
		private activatedRoute: ActivatedRoute,
		private moduleService: ModuleService,
		private typesUtilsService: TypesUtilsService,
		private _location: Location
	) {}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			const id = params["id"];
			if (id && id.length > 0) {
				this.moduleService.getListModuleObs$().subscribe(arrModules => {
					this.module = arrModules.find(x => x.name === id);
					if (this.module.optionsField.length > 0) {
						this.initColumn(this.module);
					}
				});
			}
		});
	}
	initColumn(item: ModuleModel) {
		let listOptions = item.optionsField;
		for (let i = 0; i < listOptions.length; i++) {
			const objOptions = listOptions[i];
			if (i === 1) {
				break;
			}
			for (let k in objOptions) {
				// temp hidden validators

				if (k === "validations" || k === "type") {
					continue;
				}
				this.displayedColumns.push(k);

				let obj = {
					columnDef: k,
					header: k.toUpperCase(),
					cell: (element: Element) => `${element[k]}`
				};

				this.columns.push(obj);
				console.log(obj);
			}
		}
		this.displayedColumns = this.columns.map(c => c.columnDef);

		this.displayedColumns.push("ACTIONS");
		this.dataSource = new MatTableDataSource<any>(item.optionsField);
	}
	/**
	 * previous routerlink
	 */
	backClicked() {
		this._location.back();
	}
	editItem(item) {
		console.log(item);
	}
	deleteItem(item) {
		console.log(item);
	}
}
