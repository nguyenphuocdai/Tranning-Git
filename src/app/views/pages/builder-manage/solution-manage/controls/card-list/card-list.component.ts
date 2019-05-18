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
	NgZone,
	ChangeDetectionStrategy
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

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
		private dialog: MatDialog
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
}
