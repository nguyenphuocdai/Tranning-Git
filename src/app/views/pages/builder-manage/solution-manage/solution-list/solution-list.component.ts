import { CardListComponent } from "../controls/card-list/card-list.component";
import { SolutionService } from "../../../../../core/_services/kt-solution-services/solution.service";
import { SolutionModel } from "../../../../../core/_model-app/solution.model";
import { SolutionAddComponent } from "../solution-add/solution-add.component";
import {
	Component,
	OnInit,
	OnDestroy,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Observable, Subscription } from "rxjs";

@Component({
	selector: "kt-solution-list",
	templateUrl: "./solution-list.component.html",
	styleUrls: ["./solution-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolutionListComponent implements OnInit, OnDestroy {
	_subscription: Subscription;
	_listSolution$: Observable<SolutionModel[]> = null;
	data = {
		a: "Solution List Component Temporary"
	};
	constructor(
		private dialog: MatDialog,
		private _solutionService: SolutionService,
		private ref: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.Initialize();
	}

	handleOpenModal() {
		this.dialog.open(SolutionAddComponent, {
			data: this.data,
			panelClass: "",
			maxHeight: "90vh"
		});
	}
	handleCardListClick(event) {
		this.handleOpenModal();
	}
	Initialize() {
		this._subscription = this._solutionService
			.getListSolutionObs$()
			.subscribe(sln => {
				this._listSolution$ = sln;
				this.ref.markForCheck();
			});
	}

	ngOnDestroy() {
		this._subscription.unsubscribe();
	}
}
