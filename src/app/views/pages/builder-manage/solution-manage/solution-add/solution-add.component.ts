import { KtSnackBarService } from "../../../../../core/_base/layout/services/kt-snack-bar.service";
import { SolutionService } from "../../../../../shared/_services/kt-solution-services/solution.service";
import { Component, OnInit, Inject, NgZone } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SolutionModel } from "../../../../../core/auth";

// fix after
export class State {
	constructor(
		public name: string,
		public description: string,
		public image: string
	) {}
}

@Component({
	selector: "kt-solution-add",
	templateUrl: "./solution-add.component.html",
	styleUrls: ["./solution-add.component.scss"]
})
export class SolutionAddComponent implements OnInit {
	/**
	 * Public variable
	 */
	rfSolution: FormGroup;
	stateCtrl: FormControl;
	isSubmit: boolean = false;
	listSolution: SolutionModel;
	states: SolutionModel[];

	items: [];

	owners = [
		{ value: "person", viewValue: "Person" },
		{ value: "pompany", viewValue: "Company" }
	];

	constructor(
		public _dialogRef: MatDialogRef<SolutionAddComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private _solutionService: SolutionService,
		private _snackBarService: KtSnackBarService
	) {
		// console.log(data);
	}

	ngOnInit() {
		this.initialize();
	}
	/**
	 * Init component
	 */
	initialize() {
		// after fix
		this.createForm();
		let temp = localStorage.getItem("listSolution");
		if (temp) {
			return;
		}
		this.states = JSON.parse(temp);
	}

	/**
	 * Close modal
	 */
	handleCancel() {
		this._dialogRef.close();
	}

	/**
	 * Submit Form
	 * @param event
	 */

	onSubmit(event) {
		this.isSubmit = true;
		this._dialogRef.disableClose = true;

		if (this.rfSolution.invalid) {
			return;
		}

		setTimeout(() => {
			this.listSolution = this.rfSolution.value;
			this._solutionService.sendSolutionObs$(this.listSolution);

			this._snackBarService.openSnackBar(
				"Add new solution successfully !",
				5000
			);
			this.isSubmit = false;
			this._dialogRef.close();
		}, 3000);
	}
	/**
	 * Create Form rfSolution
	 */
	createForm() {
		this.rfSolution = new FormGroup({
			name: new FormControl("", [
				Validators.required,
				Validators.minLength(3)
			]),
			owner: new FormControl("", [Validators.required]),
			version: new FormControl("", [Validators.required]),
			databaseName: new FormControl("", [Validators.required])
		});
	}
}
