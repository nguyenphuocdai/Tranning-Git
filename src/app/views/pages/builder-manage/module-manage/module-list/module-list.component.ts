import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { LayoutConfigService } from "../../../../../core/_base/layout";
import { ModuleAddComponent } from "../module-add/module-add.component";
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
		private dialog: MatDialog
	) {}
	items = [{ name: "Leona", pluraName: "Leonas" }];
	ngOnInit() {}

	handleCardListclick(item) {
		const url = `${this.layoutConfigService.getCurrentMainRoute()}/builder/${
			item.name
		}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	handleOpenModal() {
		this.dialog.open(ModuleAddComponent, {
			data: { data: "ModuleListComponent" },
			panelClass: "",
			maxHeight: '90vh'
		});
	}
	onRemove(item) {
		return item;
	}
}
