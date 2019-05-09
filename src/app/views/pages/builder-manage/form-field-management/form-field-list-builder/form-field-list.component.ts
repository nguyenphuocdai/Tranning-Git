import { DynamicFormComponent } from "./../components/dynamic-form/dynamic-form.component";
import { FieldConfig } from "../../../../../core/_model-app/field.interface";
import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem
} from "@angular/cdk/drag-drop";
import { ModalDialogComponent } from "../controls/modal-dialog/modal-dialog.component";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Validators } from "@angular/forms";
@Component({
	selector: "kt-form-field-list",
	templateUrl: "./form-field-list.component.html",
	styleUrls: ["./form-field-list.component.scss"]
})
export class FormFieldListComponent implements OnInit {
	constructor(
		private _location: Location,
		private activatedRoute: ActivatedRoute,
		private dialog: MatDialog,
		private ref: ChangeDetectorRef
	) {
		// this.dialogRef.afterClosed().subscribe(x =>{
		// 	console.log(x);
		// });
	}
	@ViewChild(DynamicFormComponent) form: DynamicFormComponent;
	panelOpenState: boolean = false;
	regConfig: FieldConfig[] = [];
	items: FieldConfig[] = [];
	data = {
		animal: "panda"
	};
	poster: "https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg";
	todo = [];
	stableData = [
		{ type: "input", valueView: "Text Field" },
		{ type: "autoComplete", valueView: "Auto Complete" },
		{ type: "checkbox", valueView: "Check box" },
		{ type: "datePicker", valueView: "Date Picker" },
		{ type: "slider", valueView: "Slider" },
		{ type: "slideToggle", valueView: "Slide Toggle" },
		{ type: "radioButton", valueView: "Radio Button" },
		{ type: "selectOption", valueView: "Select Option" }
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
			return false;
		} else {
			this.dialog
				.open(ModalDialogComponent, {
					data: this.stableData[event.previousIndex],
					width: "70%",
					panelClass: ""
				})
				.afterClosed()
				.subscribe(response => {
					console.log(response);
					if (response) {
						transferArrayItem(
							event.previousContainer.data,
							event.container.data,
							event.previousIndex,
							event.currentIndex
						);
						this.regConfig.push(response);
						let obj = response;
						this.items.push(obj)
						this.ref.markForCheck();
						this.resetList();
						console.log(this.regConfig);

					}
				});
		}
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

	/**
	 * previous routerlink
	 */
	backClicked() {
		this._location.back();
	}
	submit(value: any) {}
}
