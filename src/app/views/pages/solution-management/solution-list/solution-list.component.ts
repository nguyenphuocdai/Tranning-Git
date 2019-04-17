import { KtSnackBarService } from "./../../../../core/_base/layout/services/kt-snack-bar.service";
import { SolutionModel } from "./../../../../core/auth/_models/solution.model";
import { SolutionModalDialogComponent } from "./../controls/solution-modal-dialog/solution-modal-dialog.component";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Subscription } from "rxjs";

@Component({
	selector: "kt-solution-list",
	templateUrl: "./solution-list.component.html",
	styleUrls: ["./solution-list.component.scss"]
})
export class SolutionListComponent implements OnInit, OnDestroy {
	constructor(
		public dialog: MatDialog,
		private snackbarService: KtSnackBarService
	) {}
	data = {
		a: 2
	};
	listSolution: SolutionModel[] = [];
	ngOnInit() {
		this.listSolution = JSON.parse(localStorage.getItem("listSolution"));
	}
	handleOpenModal() {
		this.dialog.open(SolutionModalDialogComponent, {
			data: this.data,
			panelClass: ""
		});
	}
	handleCardListClick(event) {
		this.handleOpenModal();
	}

	ngOnDestroy() {}
}
