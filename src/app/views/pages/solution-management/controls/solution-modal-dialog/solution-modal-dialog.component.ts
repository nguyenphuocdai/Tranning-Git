import { Component, OnInit, Inject } from "@angular/core";
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
	previewImage = "";
	rfSolution: FormGroup;
	stateCtrl: FormControl;
	loading: boolean = false;
	listSolution: SolutionModel[] = [];
	states: SolutionModel[];

	constructor(
		public _dialogRef: MatDialogRef<SolutionModalDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		console.log(data);
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
		if (this.rfSolution.invalid) {
			return;
		}

		let data = { ...this.rfSolution.value, image: this.previewImage };
		this.listSolution.push(data);
		localStorage.setItem("listSolution", JSON.stringify(this.listSolution));

		setTimeout(() => {
			this.loading = false;
			this._dialogRef.close();
		}, 3000);

		console.log(data);
	}

	/**
	 * choosen image
	 * @param event
	 */
	onSelectFile(event) {
		/*
			reset image in form control
		*/
		this.previewImage = "";
		this.rfSolution.patchValue({
			image: null
		});

		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();

			reader.readAsDataURL(event.target.files[0]); // read file as data url

			reader.onload = (_imgsrc: any) => {
				console.log(event);
				this.previewImage = _imgsrc.target.result;
				this.rfSolution.patchValue({
					image: this.previewImage
				});
			};
		}
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
			description: new FormControl("", [
				Validators.required,
				Validators.minLength(3)
			]),
			image: new FormControl(null, [Validators.required])
		});
	}
}
