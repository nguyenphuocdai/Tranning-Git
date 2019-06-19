import { SolutionService } from './../../../../../../shared/_services/kt-solution-services/solution.service';
import { AsideService } from "./../../../../../themes/default/aside-service.service";
import { LayoutUtilsService } from "./../../../../../../core/_base/crud/utils/layout-utils.service";
import { ModuleModel } from "./../../../../../../shared/_model-app/module.model";
import { AppSettings } from "./../../../../../../shared/_constant/app-setting";
import { LocalstorageService } from "./../../../../../../shared/_services/local-storage-service/localstorage.service";
import { DialogConfirmComponent } from "../../../../../../core/material-services/dialog-confirm/dialog-confirm.component";
import { MatDialog } from "@angular/material";
import { LayoutConfigService } from "../../../../../../core/_base/layout/services/layout-config.service";
import { SolutionModel } from "../../../../../../core/auth";
import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	Input,
	SimpleChanges,
	OnChanges,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SolutionEditDialogComponent } from "../solution-edit-dialog/solution-edit-dialog.component";

@Component({
	selector: "kt-card-list",
	templateUrl: "./card-list.component.html",
	styleUrls: ["./card-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent implements OnInit, OnChanges {
	@Output("eventCardListclick") eventCardListclick = new EventEmitter();
	@Input("listSolution") listSolution: SolutionModel[] = [];

	items: SolutionModel[] = [];
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private layoutConfigService: LayoutConfigService,
		private dialog: MatDialog,
		private _ref: ChangeDetectorRef,
		private localstorageService: LocalstorageService,
		private layoutUtilsService: LayoutUtilsService,
		private asideService: AsideService,
		private solutionService: SolutionService
	) {}

	ngOnInit() {
		this.items = this.listSolution;
	}
	/**
	 * Open modal when new solution
	 */
	ngOnChanges(changes: SimpleChanges): void {
		for (let propName in changes) {
			let change = changes["listSolution"].currentValue;
			this.items = change;
		}
	}

	handleCardListclick() {
		this.eventCardListclick.emit({ newItem: true });
	}

	/**
	 * Initialize layout config
	 * @param item: Solution
	 */

	handleNavigate(item) {
		const url = `${this.layoutConfigService.getCurrentMainRoute()}/builder/solutions/edit/${
			item.name
		}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Open Dialog Confirm
	 */

	onRemove(item): void {
		let title = "Alert Confirm";
		let message = "Are you sure delete item this?";
		let messageNotDelete =
			"Delete is failed, Please delete all module in solution. ";

		let dialogRef = this.dialog.open(DialogConfirmComponent, {
			width: "400px",
			data: { title: title, message: message, itemDelete: item }
		});

		dialogRef.afterClosed().subscribe((itemDelete: SolutionModel) => {
			if (itemDelete) {
				let arrSolution: SolutionModel[] = this.localstorageService.get(
					AppSettings.SOLUTIONSTORAGE
				);
				let arrModule: ModuleModel[] = this.localstorageService.get(
					AppSettings.MODULESTORAGE
				);

				let isDelete: boolean = false;
				// check if solution contains module -> not delete
				if (arrModule) {
					for (let i = 0; i < arrModule.length; i++) {
						const moduleData = arrModule[i];
						if (moduleData.solutionId === itemDelete.name) {
							isDelete = true;
							break;
						}
					}
				}

				if (isDelete) {
					this.layoutUtilsService.showActionNotification(
						messageNotDelete,
						1
					);
					return;
				}
				if (!isDelete) {
					// delete solution and binding data items
					arrSolution.forEach(
						(solutionData: SolutionModel, index: number) => {
							if (itemDelete.id === solutionData.id) {
								arrSolution.splice(index, 1);
								this.localstorageService.set(
									AppSettings.SOLUTIONSTORAGE,
									arrSolution
								);
								this.items = arrSolution;
								this.asideService.sendAllSolutions(this.items);
								this._ref.detectChanges();
								return;
							}
						}
					);
				}
			}
		});
	}
	onUpdateData(item) {
		this.items = item;
	}

	onEdit(item) {
		const dialogRef = this.dialog.open(SolutionEditDialogComponent, {
			data: { item }
		});
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			// binding again when submit data edit
			this.items = this.localstorageService.get(
				AppSettings.SOLUTIONSTORAGE
			);
			this.solutionService.getListSolutionObs$();
			this._ref.detectChanges();
		});
	}
}
