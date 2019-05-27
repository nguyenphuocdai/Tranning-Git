import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import {
	FormGroup,
	Validators,
	FormControl,
	FormBuilder
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ModuleModel } from "./../../../../../shared/_model-app/module.model";
import { AppSettings } from "../../../../../shared/_constant/app-setting";
import { LocalstorageService } from "../../../../../shared/_services/local-storage-service/localstorage.service";
import { TypesUtilsService } from "../../../../../core/_base/crud/utils/types-utils.service";

@Component({
	selector: "kt-module-edit",
	templateUrl: "./module-edit-dialog.component.html",
	styleUrls: ["./module-edit-dialog.component.scss"]
})
export class ModuleEditDialogComponent implements OnInit {
	viewLoading: boolean = false;
	rfModule: FormGroup;
	hasFormErrors: boolean = false;

	/**
	 * Dependency Injection
	 * @param typesUtilsService
	 * @param localstorageService
	 * @param dialogRef
	 * @param data
	 */
	constructor(
		private typesUtilsService: TypesUtilsService,
		private localstorageService: LocalstorageService,
		private dialogRef: MatDialogRef<ModuleEditDialogComponent>,
		private fbModule: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	/**
	 * Mockup data
	 */
	accessTypes = [
		{ value: "master", viewValue: "Master Data" },
		{ value: "role", viewValue: "Role-based" },
		{ value: "department", viewValue: "Department-based" }
	];

	ngOnInit() {
		this.createForm();
	}

	createForm() {
		this.rfModule = this.fbModule.group({
			name: [this.data.item.name, Validators.required],
			pluralName: [
				this.data.item.pluralName,
				[Validators.required, Validators.minLength(3)]
			],
			accessType: [this.data.item.accessType, Validators.required],

			database: [this.data.item.database, Validators.required],
			solutionId: [
				{ value: this.data.item.solutionId, disabled: true },
				Validators.required
			]
		});
	}

	onSubmit() {
		// spinner
		this.viewLoading = true;

		const id = this.data.item.id;
		const name = this.rfModule.controls["name"].value;
		const pluralName = this.rfModule.controls["pluralName"].value;
		const database = this.rfModule.controls["database"].value;
		const accessType = this.rfModule.controls["accessType"].value;
		const solutionId = this.rfModule.controls["solutionId"].value;

		let obj = {
			id: id,
			name: name,
			pluralName: pluralName,
			database: database,
			accessType: accessType,
			solutionId: solutionId
		};

		if (this.typesUtilsService.isEquivalent(obj, this.data.item)) {
			this.viewLoading = false;
			this.hasFormErrors = true;
			return false;
		}

		let listModules: ModuleModel[] = this.localstorageService.get(
			AppSettings.MODULESTORAGE
		);
		listModules.forEach((element, index) => {
			if (element.id === obj.id) {
				listModules[index] = obj;
				this.localstorageService.set(
					AppSettings.MODULESTORAGE,
					listModules
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
