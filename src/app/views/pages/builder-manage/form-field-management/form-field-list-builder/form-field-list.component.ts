import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem
} from "@angular/cdk/drag-drop";
import { ModalDialogComponent } from "../controls/modal-dialog/modal-dialog.component";
import { MatDialog } from "@angular/material";
@Component({
	selector: "kt-form-field-list",
	templateUrl: "./form-field-list.component.html",
	styleUrls: ["./form-field-list.component.scss"]
})
export class FormFieldListComponent implements OnInit {
	constructor(
		private _location: Location,
		private activatedRoute: ActivatedRoute,
		public dialog: MatDialog
	) {}
	panelOpenState: boolean = false;
	data = {
		animal: "panda"
	};
	poster: "https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg";
	todo = [];
	stableData = [
		"Text Field",
		"Auto Complete",
		"Check box",
		"Date Picker",
		"Slider",
		"Slide Toggle",
		"Radio Button",
		"Select Option"
	];
	done = [];

	ngOnInit() {
		this.resetList();
		const routeSubscription = this.activatedRoute.params.subscribe(
			params => {
				const id = params["id"];
				console.log(id);

				if (id && id.length > 0) {
					// this._solutionService
					// 	.getListSolutionObs$()
					// .subscribe(listSln => {
					// 	this.solution = listSln.find(x => x.name === id);
					// });
					// this.solution = JSON.parse(
					// 	localStorage.getItem("listSolution")
					// ).find(x => x.name === id);
					/**
					 * Initialize Solution
					 */
					// this.initSolution();
				}
			}
		);
	}
	/**
	 * event drop from source to preview (temp not use)
	 * @param event CdkDragDrop
	 */
	drop(event: CdkDragDrop<string[]>) {
		// if (event.previousContainer === event.container) {
		// 	moveItemInArray(
		// 		event.container.data,
		// 		event.previousIndex,
		// 		event.currentIndex
		// 	);
		// } else {
		// transferArrayItem(
		// 	event.previousContainer.data,
		// 	event.container.data,
		// 	event.previousIndex,
		// 	event.currentIndex
		// );
		// // }
		// this.resetList();
	}
	/**
	 * event drop from preview to source
	 * @param event CdkDragDrop
	 */
	dropFromPreview(event: CdkDragDrop<string[]>) {
		if (event.previousContainer === event.container) {
			// moveItemInArray(
			// 	event.container.data,
			// 	event.previousIndex,
			// 	event.currentIndex
			// );
		} else {
			this.dialog.open(ModalDialogComponent, {
				data: this.data,
				width: "70%",
				panelClass: ""
			});
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		}
		this.resetList();
	}
	/** Predicate function that doesn't allow items to be dropped into a list. */
	noReturnPredicate() {
		return false;
	}
	/**
	 * reset list source
	 */
	private resetList() {
		this.todo = this.stableData.slice();
	}

	backClicked() {
		this._location.back();
	}
}
