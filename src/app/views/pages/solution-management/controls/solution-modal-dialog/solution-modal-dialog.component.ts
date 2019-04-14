import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl } from "@angular/forms";

//fix after
export class State {
	constructor(
		public name: string,
		public population: string,
		public flag: string
	) {}
}

@Component({
	selector: "kt-solution-modal-dialog",
	templateUrl: "./solution-modal-dialog.component.html",
	styleUrls: ["./solution-modal-dialog.component.scss"]
})
export class SolutionModalDialogComponent implements OnInit {
	url = "";
	stateCtrl: FormControl;
	states: State[] = [
		{
			name: "Arkansas",
			population: "2.978M",
			// https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
			flag:
				"https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg"
		},
		{
			name: "California",
			population: "39.14M",
			// https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
			flag:
				"https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg"
		},
		{
			name: "Florida",
			population: "20.27M",
			// https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
			flag:
				"https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg"
		},
		{
			name: "Texas",
			population: "27.47M",
			// https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
			flag:
				"https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg"
		}
	];
	constructor(
		public dialogRef: MatDialogRef<SolutionModalDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		console.log(data);
	}
	onSelectFile(event) {
		this.url = '';
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

			reader.onload = (_imgsrc: any) => { // called once readAsDataURL is completed
				console.log(event);
        this.url = _imgsrc.target.result;
      }
    }
  }
	ngOnInit() {}

	handleCancel() {
		this.dialogRef.close();
	}
}
