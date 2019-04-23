import { KtSnackBarService } from "./../../../../../core/_base/layout/services/kt-snack-bar.service";
import { SolutionService } from "./../../../../../core/_services/kt-solution-services/solution.service";
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
	selector: "kt-solution-modal-dialog",
	templateUrl: "./solution-modal-dialog.component.html",
	styleUrls: ["./solution-modal-dialog.component.scss"]
})
export class SolutionModalDialogComponent implements OnInit {
	/**
	 * Public variable
	 */
	rfSolution: FormGroup;
	stateCtrl: FormControl;
	loading: boolean = false;
	listSolution: SolutionModel;
	states: SolutionModel[];

	items: [];

	owners = [
		{ value: "person", viewValue: "Person" },
		{ value: "pompany", viewValue: "Company" }
	];

	constructor(
		public _dialogRef: MatDialogRef<SolutionModalDialogComponent>,
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
		this.loading = true;
		this._dialogRef.disableClose = true;

		if (this.rfSolution.invalid) {
			return;
		}

		setTimeout(() => {
			this.listSolution = this.rfSolution.value;
			this._solutionService.sendSolutionObs$(this.listSolution);

			this.loading = false;
			this._snackBarService.openSnackBar(
				"Add new solution successfully !",
				5000
			);

			this._dialogRef.close();
		}, 3000);
	}

	/**
	 * choosen image
	 * @param event
	 */
	// onSelectFile(event) {
	// 	/*
	// 		reset image in form control
	// 	*/
	// 	this.previewImage = "";
	// 	this.rfSolution.patchValue({
	// 		image: null
	// 	});

	// 	if (event.target.files && event.target.files[0]) {
	// 		let reader = new FileReader();

	// 		reader.readAsDataURL(event.target.files[0]); // read file as data url

	// 		reader.onload = (_imgsrc: any) => {
	// 			console.log(event);
	// 			this.previewImage = _imgsrc.target.result;
	// 			this.rfSolution.patchValue({
	// 				image: this.previewImage
	// 			});
	// 		};
	// 	}
	// }

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
