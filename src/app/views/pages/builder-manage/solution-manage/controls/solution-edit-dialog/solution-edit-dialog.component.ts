import { SolutionModel } from "./../../../../../../shared/_model-app/solution.model";
import { AppSettings } from "./../../../../../../shared/_constant/app-setting";
import { LocalstorageService } from "./../../../../../../shared/_services/local-storage-service/localstorage.service";
import { TypesUtilsService } from "./../../../../../../core/_base/crud/utils/types-utils.service";
import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
	selector: "kt-solution-edit-dialog",
	templateUrl: "./solution-edit-dialog.component.html",
	styleUrls: ["./solution-edit-dialog.component.scss"]
})
export class SolutionEditDialogComponent implements OnInit {
	viewLoading: boolean = false;
	rfSolution: FormGroup;
	hasFormErrors: boolean = false;
	constructor(
		private typesUtilsService: TypesUtilsService,
		private localstorageService: LocalstorageService,
		private dialogRef: MatDialogRef<SolutionEditDialogComponent>,
		private _ref: ChangeDetectorRef,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	owners = [
		{ value: "person", viewValue: "Person" },
		{ value: "pompany", viewValue: "Company" }
	];

	ngOnInit() {
		this.createForm();
	}

	createForm() {
		this.rfSolution = new FormGroup({
			name: new FormControl(this.data.item.name, [
				Validators.required,
				Validators.minLength(3)
			]),
			owner: new FormControl(this.data.item.owner, [Validators.required]),
			version: new FormControl(this.data.item.version, [
				Validators.required
			])
		});
	}

	onSubmit() {
		// spinner
		this.viewLoading = true;

		const id = this.data.item.id;
		const name = this.rfSolution.controls["name"].value;
		const owner = this.rfSolution.controls["owner"].value;
		const version = this.rfSolution.controls["version"].value;

		let obj = {
			id: id,
			name: name,
			owner: owner,
			version: version
		};

		if (this.typesUtilsService.isEquivalent(obj, this.data.item)) {
			this.viewLoading = false;
			this.hasFormErrors = true;
			return false;
		}

		let listSolution: SolutionModel[] = this.localstorageService.get(
			AppSettings.SOLUTIONSTORAGE
		);
		listSolution.forEach((element, index) => {
			if (element.id === obj.id) {
				listSolution[index] = obj;
				this.localstorageService.set(
					AppSettings.SOLUTIONSTORAGE,
					listSolution
				);
				setTimeout(() => {
					this.viewLoading = false;
					this.dialogRef.close(true);
				}, 2500);
				return;
			}
		});
	}

	/** Alect Close event */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}
