import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { LocalstorageService } from "./../../../../../shared/_services/local-storage-service/localstorage.service";
import { AppSettings } from "./../../../../../shared/_constant/app-setting";
import { ModuleService } from "./../../../../../shared/_services/kt-module-services/module.service";
import { LayoutConfigService } from "../../../../../core/_base/layout";
import { ModuleAddComponent } from "../module-add/module-add.component";
import { Observable, Subscription } from "rxjs";
import { ModuleEditDialogComponent } from "../module-edit/module-edit-dialog.component";

@Component({
	selector: "kt-module-list",
	templateUrl: "./module-list.component.html",
	styleUrls: ["./module-list.component.scss"]
})

export class ModuleListComponent implements OnInit {
	constructor(
		private layoutConfigService: LayoutConfigService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private dialog: MatDialog,
		private ref: ChangeDetectorRef,
		private _moduleService: ModuleService,
		private localstorageService: LocalstorageService
	) {}
	items = [
		// {
		// 	name: "Leona Module",
		// 	pluraName: "Leonas",
		// 	accessType: "master",
		// 	solution: "Leona The Vanxi",
		// 	database: "Core"
		// }
	];
	_listModule$: Observable<[]> = null;
	_subscription: Subscription;
	solution: any;
	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			const id = params["id"];
			if (id && id.length > 0) {
				this.solution = JSON.parse(
					localStorage.getItem(AppSettings.SOLUTIONSTORAGE)
				).find(x => x.name === id);
			}
		});
		this.Initialize();
	}

	Initialize() {
		this._subscription = this._moduleService
			.getListModuleObs$()
			.subscribe(modules => {
				this.items = modules;
				this.ref.markForCheck();
			});
	}

	handleNavigate(item) {
		const url = `${this.layoutConfigService.getCurrentMainRoute()}/build-form-field/builder/${
			item.name
		}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	handleOpenModal() {
		this.dialog.open(ModuleAddComponent, {
			data: { data: this.solution },
			panelClass: "",
			maxHeight: "90vh"
		});
	}
	onRemove(item) {
		return item;
	}

	onEdit(item) {
		const dialogRef = this.dialog.open(ModuleEditDialogComponent, {
			data: { item }
		});
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			// binding again when submit data edit
			this.items = this.localstorageService.get(
				AppSettings.MODULESTORAGE
			);
			this.ref.detectChanges();
		});
	}
}
