import { KtSnackBarService } from "./../../../../../core/_base/layout/services/kt-snack-bar.service";
import { ModuleService } from "./../../../../../core/_services/kt-module-services/module.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
	selector: "kt-module-add",
	templateUrl: "./module-add.component.html",
	styleUrls: ["./module-add.component.scss"]
})
export class ModuleAddComponent implements OnInit {
	constructor(
		public _dialogRef: MatDialogRef<ModuleAddComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fbModule: FormBuilder,
		private _moduleService: ModuleService,
		private _snackBarService: KtSnackBarService
	) {
		console.log(data);
		this.solutionData = data;
	}
	solutionData: any;
	rfModule: FormGroup;
	listModule = [];
	// lsitModule: Array<{
	// 	id: number,
	// 	name: string,
	// 	pluralName: string,
	// 	accessType: string,
	// 	database: string,
	// 	solution:string
	// }>;
	isSubmit: boolean = false;

	accessTypes = [
		{ value: "master", viewValue: "Master Data" },
		{ value: "role", viewValue: "Role-based" },
		{ value: "department", viewValue: "Department-based" }
	];
	ngOnInit() {
		this.initialize();
	}

	initialize() {
		this.createForm();
	}
	createForm() {
		//after check solutionId && databaseId has change, if change so return function;
		this.rfModule = this.fbModule.group({
			name: ["", Validators.required],
			pluralName: ["", Validators.minLength(3)],
			accessType: ["", Validators.required],
			solutionId: [
				{ value: this.solutionData.data.name, disabled: true },
				Validators.required
			],
			databaseId: [
				{ value: this.solutionData.data.databaseName, disabled: true },
				Validators.required
			]
		});
	}

	onSubmit(event) {
		console.log(this.rfModule);
		this.isSubmit = true;
		this._dialogRef.disableClose = true;

		if (this.rfModule.invalid) {
			return;
		}

		setTimeout(() => {
			this.listModule = this.rfModule.value;
			this._moduleService.sendListModuleObs$(this.listModule);
			this._snackBarService.openSnackBar(
				"Add new solution successfully !",
				5000
			);
			this.isSubmit = false;
			this._dialogRef.close();
		}, 3000);

		return event;
	}
	handleCancel() {
		this._dialogRef.close();
	}
}
