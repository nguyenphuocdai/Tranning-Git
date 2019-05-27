import { AppSettings } from "./../../../../../shared/_constant/app-setting";
import { LocalstorageService } from "./../../../../../shared/_services/local-storage-service/localstorage.service";
import { SolutionService } from "../../../../../shared/_services/kt-solution-services/solution.service";
import { SolutionModel } from "../../../../../shared/_model-app/solution.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { LayoutConfigService } from "../../../../../core/_base/layout";
import { User, Address, SocialNetworks } from "../../../../../core/auth";
import { MatDialog } from "@angular/material";
import { SolutionEditDialogComponent } from "../controls/solution-edit-dialog/solution-edit-dialog.component";

@Component({
	selector: "kt-solution-edit",
	templateUrl: "./solution-edit.component.html",
	styleUrls: ["./solution-edit.component.scss"]
})
export class SolutionEditComponent implements OnInit, OnDestroy {
	// Public properties
	previewImage: string = "";
	isShowFormEdit: boolean = false;
	solution: SolutionModel;
	user: User;
	userId$: Observable<number>;
	oldUser: User;
	selectedTab: number = 0;
	loading$: Observable<boolean>;
	rolesSubject = new BehaviorSubject<number[]>([]);
	addressSubject = new BehaviorSubject<Address>(new Address());
	soicialNetworksSubject = new BehaviorSubject<SocialNetworks>(
		new SocialNetworks()
	);
	rfSolution: FormGroup;
	hasFormErrors: boolean = false;
	// Private properties
	private subscriptions: Subscription[] = [];

	/**
	 * Component constructor
	 *
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param userFB: FormBuilder
	 * @param subheaderService: SubheaderService
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param store: Store<AppState>
	 * @param layoutConfigService: LayoutConfigService
	 */
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private solutionFB: FormBuilder,
		private layoutConfigService: LayoutConfigService,
		private _solutionService: SolutionService,
		private dialog: MatDialog,
		private localstorageService: LocalstorageService
	) {}

	/**
	 * On init
	 */
	ngOnInit() {
		const routeSubscription = this.activatedRoute.params.subscribe(
			params => {
				const id = params["id"];

				if (id && id.length > 0) {
					this._solutionService
						.getListSolutionObs$()
						.subscribe(listSln => {
							this.solution = listSln.find(x => x.name === id);
						});
					this.initSolution();
				}
			}
		);
		this.subscriptions.push(routeSubscription);
	}

	/**
	 * Init solution
	 */
	initSolution() {
		this.createForm();
	}

	/**
	 * Create form
	 */
	createForm() {
		this.rfSolution = this.solutionFB.group({
			name: [this.solution.name, Validators.required],
			owner: [this.solution.owner, Validators.required],
			version: [this.solution.version, Validators.required]
		});
	}
	onShowFormEdit() {
		// this.isShowFormEdit = isShow;
		console.log(this.solution);

		const dialogRef = this.dialog.open(SolutionEditDialogComponent, {
			data: { item: this.solution }
		});
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			// binding again when submit data edit
			// this.items = this.localstorageService.get(
			// 	AppSettings.SOLUTIONSTORAGE
			// );
			// this._ref.detectChanges();
		});
	}
	/**
	 * Redirect to list
	 *
	 */
	goBackWithId() {
		const url = `${this.layoutConfigService.getCurrentMainRoute()}/user-management/users`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Reset
	 */
	// reset() {
	// 	this.user = Object.assign({}, this.oldUser);
	// 	this.createForm();
	// 	this.hasFormErrors = false;
	// 	this.rfSolution.markAsPristine();
	// 	this.rfSolution.markAsUntouched();
	// 	this.rfSolution.updateValueAndValidity();
	// }

	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
	onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.rfSolution.controls;
		/** check form */
		if (this.rfSolution.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		const editedSolution = this.prepareSolution();
		/** handle edit solution */

		// if (editedSolution.id > 0) {
		// 	this.updateUser(editedSolution, withBack);
		// 	return;
		// }

		// this.addUser(editedSolution, withBack);
	}

	/**
	 * Returns prepared data for save
	 */
	prepareSolution(): SolutionModel {
		const controls = this.rfSolution.controls;
		const _solution = new SolutionModel();
		_solution.clear();
		_solution.name = controls["name"].value;
		_solution.owner = controls["owner"].value;
		// _solution.databaseName = controls["databaseName"].value;
		_solution.version = controls["version"].value;
		// _solution.image = controls["image"].value;
		return _solution;
	}
	/**
	 * Returns component title
	 */
	getComponentTitle() {
		let result = "Solution";
		if (!this.solution || !this.solution.name) {
			return result;
		}

		result = `Solution - ${this.solution.name}`;
		return result;
	}

	/**
	 * Close Alert
	 *
	 * @param $event: Event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	/**
	 * Destroy subscriptions
	 */

	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}
}
