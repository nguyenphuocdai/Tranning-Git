import { Solution } from './../../../../core/auth/_models/solution.model';
import { CardListComponent } from "./../../material/common-behaviors/card-list/card-list.component";
import { SolutionModalDialogComponent } from "./../controls/solution-modal-dialog/solution-modal-dialog.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material";

@Component({
	selector: "kt-solution-list",
	templateUrl: "./solution-list.component.html",
	styleUrls: ["./solution-list.component.scss"]
})
export class SolutionListComponent implements OnInit {
	constructor(public dialog: MatDialog) {}
	@ViewChild("cardListComponent") cardListComponent: CardListComponent;
	data = {
		a: 2
	};
	listProject: Solution[] = [];
	ngOnInit() {
		this.listProject = JSON.parse(localStorage.getItem("listSolution")); 
	}

	handleOpenModal() {
		this.dialog.open(SolutionModalDialogComponent, {
			data: this.data,
			// width: "50%",
			panelClass: ""
		});
	}
	handleCardListClick(event) {
		console.log(event);
		this.handleOpenModal();
	}
}
