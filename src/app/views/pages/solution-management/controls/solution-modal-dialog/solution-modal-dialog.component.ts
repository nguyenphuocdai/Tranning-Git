import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Solution } from "../../../../../core/auth";

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
	url = "";
	rfSolution: FormGroup;
	stateCtrl: FormControl;
	loading: boolean = false;
	listSolution: Solution[] = [];
	states: Solution[];
	constructor(
		public dialogRef: MatDialogRef<SolutionModalDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		console.log(data);
	}
	onSelectFile(event) {
		this.url = "";
		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();

			reader.readAsDataURL(event.target.files[0]); // read file as data url

			reader.onload = (_imgsrc: any) => {
				// called once readAsDataURL is completed
				console.log(event);
				this.url = _imgsrc.target.result;
			};
		}
	}
	ngOnInit() {
		this.rfSolution = new FormGroup({
			name: new FormControl("", [
				Validators.required,
				Validators.minLength(3)
			]),
			description: new FormControl("", [
				Validators.required,
				Validators.minLength(3)
			])
		});

		// after fix
		let temp = localStorage.getItem("listSolution");
		if (temp) {
			return;
		}
		this.states = JSON.parse(temp);
	}

	handleCancel() {
		this.dialogRef.close();
	}

	onSubmit(e) {
		this.loading = true;
		if (this.rfSolution.invalid) {
			return;
		}
		let data = { ...this.rfSolution.value, image: this.url };
		this.listSolution.push(data);
		localStorage.setItem("listSolution", JSON.stringify(this.listSolution));

		setTimeout(() => {
			this.loading = false;
			this.dialogRef.close();
		}, 3000);

		console.log(data);
	}
}
