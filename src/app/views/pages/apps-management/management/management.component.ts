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
		private _ref: ChangeDetectorRef
	) {}
	items: FieldConfigInterface[] = [];
	module: ModuleModel;
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
						this._ref.detectChanges();
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
		console.log(value);
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log(changes);
	}
	ngOnDestroy(): void {
		console.log(1);
	}
}
