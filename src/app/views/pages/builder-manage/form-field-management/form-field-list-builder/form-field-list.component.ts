import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
@Component({
	selector: "kt-form-field-list",
	templateUrl: "./form-field-list.component.html",
	styleUrls: ["./form-field-list.component.scss"]
})
export class FormFieldListComponent implements OnInit {
	panelOpenState: boolean = false;
	data = {
		animal: "panda"
	};
	constructor(
		private _location: Location,
		private activatedRoute: ActivatedRoute) {}

	ngOnInit() {
		const routeSubscription = this.activatedRoute.params.subscribe(
			params => {
				const id = params["id"];
				console.log(id);

				if (id && id.length > 0) {
					// this._solutionService
					// 	.getListSolutionObs$()
						// .subscribe(listSln => {
						// 	this.solution = listSln.find(x => x.name === id);
						// });

					// this.solution = JSON.parse(
					// 	localStorage.getItem("listSolution")
					// ).find(x => x.name === id);

					/**
					 * Initialize Solution
					 */

					// this.initSolution();
				}
			});
	}

	backClicked() {
		this._location.back();
	}
}
