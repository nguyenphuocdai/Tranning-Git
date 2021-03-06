import { ResponseDTO } from "./../../../../shared/_model-app/response.interface";
// Angular
import {
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation
} from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// RxJS
import { Observable, Subject } from "rxjs";
import { finalize, takeUntil, tap } from "rxjs/operators";
// Translate
import { TranslateService } from "@ngx-translate/core";
// Store
import { Store } from "@ngrx/store";
import { AppState } from "../../../../core/reducers";
// Auth
import { AuthNoticeService, AuthService, Login } from "../../../../core/auth";

// /**
//  * ! Just example => Should be removed in development
//  */
// //root
// //123456789hhccC
// const DEMO_PARAMS = {
// 	EMAIL: "projectxadmin@risotech.vn",
// 	PASSWORD: "theAteamVD"
// };

@Component({
	selector: "kt-login",
	templateUrl: "./login.component.html",
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	constructor(
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.initLoginForm();
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		this.loginForm = this.fb.group({
			email: [
				"",
				Validators.compose([
					Validators.required,
					// Validators.email,
					Validators.minLength(3),
					Validators.maxLength(320)
				])
			],
			password: [
				"",
				Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(100)
				])
			]
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		const authData = {
			email: controls["email"].value,
			password: controls["password"].value
		};
		this.auth
			.login(authData.email, authData.password)
			.subscribe((response: ResponseDTO) => {
				if (response) {
					let token = response.Data["token"];

					this.loading = false;
					// this.cdr.detectChanges();

					this.store.dispatch(new Login({ authToken: token }));
					this.router.navigateByUrl("/"); // Main page
				} else {
					this.authNoticeService.setNotice(
						this.translate.instant("AUTH.VALIDATION.INVALID_LOGIN"),
						"danger"
					);
				}
			});
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
}
