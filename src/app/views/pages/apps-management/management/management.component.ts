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
	ChangeDetectorRef
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

/**
 * @title Table with pagination
 */
@Component({
	selector: "kt-management",
	templateUrl: "./management.component.html",
	styleUrls: ["./management.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagementComponent implements OnInit, OnChanges, OnDestroy {
	constructor(
		private localstorageService: LocalstorageService,
		private activatedRoute: ActivatedRoute,
		private _solutionService: SolutionService,
		private ref: ChangeDetectorRef
	) {}
	items: FieldConfigInterface[] = [];
	module: ModuleModel;
	isSubmit: boolean = false;

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
						this.Initialize();
						this.ref.detectChanges();
					}
				}
			}
		});
	}
	/**
	 * submit form
	 * @param value
	 */
	dynamicFormSubmit(value: any) {
		this.isSubmit = true;
		console.log(value);
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log(changes);
	}
	Initialize() {
		this._solutionService.getListSolutionObs$();
		this.isSubmit = false;
	}

	ngOnDestroy() {}
}
