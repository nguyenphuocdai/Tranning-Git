import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RouterAction } from "@ngrx/router-store";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
	selector: "kt-module-add",
	templateUrl: "./module-add.component.html",
	styleUrls: ["./module-add.component.scss"]
})
export class ModuleAddComponent implements OnInit {
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		public _dialogRef: MatDialogRef<ModuleAddComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		// console.log(data);
	}

	rfModule: FormGroup;
	isSubmit: boolean = false;
	private subscriptions: Subscription[] = [];

	accessTypes = [
		{ value: "master", viewValue: "Master Data" },
		{ value: "role", viewValue: "Role-based" },
		{ value: "department", viewValue: "Department-based" }
	];
	ngOnInit() {
		this.initialize();
		const routeSubscription = this.activatedRoute.params.subscribe(
			params => {
				const id = params["id"];

				if (id && id.length > 0) {
					// this.solution = JSON.parse(
					// 	localStorage.getItem("listSolution")
					// ).find(x => x.name === id);
					/**
					 * Initialize Solution
					 */
				}
			}
		);
		this.subscriptions.push(routeSubscription);
	}

	initialize() {
		this.createForm();
	}
	createForm() {
		this.rfModule = new FormGroup({
			name: new FormControl("", [
				Validators.required,
				Validators.minLength(3)
			]),
			pluralName: new FormControl("", [Validators.minLength(3)]),
			accessType: new FormControl("", [Validators.required]),
			solution: new FormControl("", [Validators.required]),
			database: new FormControl("", [Validators.required])
		});
	}

	onSubmit(event) {
		return event;
	}
	handleCancel(){
		return 1;
	}
}
