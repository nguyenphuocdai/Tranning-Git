import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { SolutionModalDialogComponent } from "../../solution-manage/controls/solution-modal-dialog/solution-modal-dialog.component";
import { LayoutConfigService } from "../../../../../core/_base/layout";
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
	) {}

	ngOnInit() {}

	handleCardListclick(item) {
		const url = `${this.layoutConfigService.getCurrentMainRoute()}/builder/${item.name}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	handleOpenModal() {
		this.dialog.open(SolutionModalDialogComponent, {
			data: {data: "ModuleListComponent"},
			panelClass: ""
		});
	}
}
