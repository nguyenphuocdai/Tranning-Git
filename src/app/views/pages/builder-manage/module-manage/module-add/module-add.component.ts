import { TypesUtilsService } from "./../../../../../core/_base/crud/utils/types-utils.service";
import { ModuleModel } from "./../../../../../shared/_model-app/module.model";
import { KtSnackBarService } from "./../../../../../core/_base/layout/services/kt-snack-bar.service";
import { ModuleService } from "./../../../../../shared/_services/kt-module-services/module.service";
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
		private moduleService: ModuleService,
		private snackBarService: KtSnackBarService,
		private typesUtilsService: TypesUtilsService
	) {
		this.solutionData = data;
	}
	solutionData: any;
	rfModule: FormGroup;
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
		// after check solutionId && databaseId has change, if change so return function;
		this.rfModule = this.fbModule.group({
			name: ["", Validators.required],
			pluralName: ["", Validators.minLength(3)],
			accessType: ["", Validators.required],
			solutionId: [
				{ value: this.solutionData.data.name, disabled: true },
				Validators.required
			],
			database: ["", Validators.required]
		});
	}

	onSubmit(event) {
		this.isSubmit = true;
		this._dialogRef.disableClose = true;

		if (this.rfModule.invalid) {
			return;
		}

		setTimeout(() => {
			const name = this.rfModule.controls["name"].value.trim();
			const pluralName = this.rfModule.controls["pluralName"].value.trim();
			const accessType = this.rfModule.controls["accessType"].value.trim();
			const database = this.rfModule.controls["database"].value.trim().toLowerCase();
			const solutionId = this.solutionData.data.name;

			let obj: ModuleModel = {
				id: this.typesUtilsService.makeid(),
				name: name,
				pluralName: pluralName,
				accessType: accessType,
				database: database,
				solutionId: solutionId,
				optionsField: []
			};

			this.moduleService.sendListModuleObs$(obj);
			this.snackBarService.openSnackBar(
				"Add new solution successfully !",
				5000
			);
			this.isSubmit = false;
			this._dialogRef.close(true);
		}, 3000);

		return event;
	}
	handleCancel() {
		this._dialogRef.close();
	}
	onPluralNameChange(data) {
		if (this.typesUtilsService.isEmptyString(data)) {
			return;
		}
		let database = data.replace(/ /g, "_").trim();
		this.rfModule.controls["database"].setValue(database);
	}

	onDatabaseChange(data) {
	}
}
