import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
	selector: "kt-module-add",
	templateUrl: "./module-add.component.html",
	styleUrls: ["./module-add.component.scss"]
})
export class ModuleAddComponent implements OnInit {
	constructor(
		public _dialogRef: MatDialogRef<ModuleAddComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
		// console.log(data);
	}

	ngOnInit() {}
}
