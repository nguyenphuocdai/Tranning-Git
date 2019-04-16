import { LayoutConfigService } from "../../../../../core/_base/layout/services/layout-config.service";
import { Solution } from "../../../../../core/auth";
import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "kt-card-list",
	templateUrl: "./card-list.component.html",
	styleUrls: ["./card-list.component.scss"]
})
export class CardListComponent implements OnInit {
	@Output("eventCardListclick") eventCardListclick = new EventEmitter();
	@Input("listSolution") listSolution: Solution[] = [];
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private layoutConfigService: LayoutConfigService
	) {}

	ngOnInit() {}
	/**
	 * Open modal when new solution
	 */

	handleCardListclick() {
		this.eventCardListclick.emit({ newItem: true });
	}

	/**
	 * Initialize layout config
	 * @param item: Solution
	 */

	handleNavigate(item) {
		const url = `${this.layoutConfigService.getCurrentMainRoute()}/solution-management/solution-edit/${
			item.name
		}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}
}
