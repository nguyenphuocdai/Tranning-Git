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
		private localstorageService: LocalstorageService
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

		let dialogRef = this.dialog.open(DialogConfirmComponent, {
			width: "400px",
			data: { title: title, message: message, itemDelete: item }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log("The dialog was closed");
			console.log(result);
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
			this._ref.detectChanges();
		});
	}
}
