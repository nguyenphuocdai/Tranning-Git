import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpUtilsService } from './../../../core/_base/crud/utils/http-utils.service';
import { AppSettings } from '../../_constant/app-setting';

@Injectable({
	providedIn: "root"
})
export class FormFieldService {
	// Public properties
	subjectFormField = new Subject<FormFieldService[]>();
	private isCloseModal$ = new Subject<boolean>();
	listFormField: FormFieldService[] = [];

	constructor(
		private http: HttpClient,
		private httpUtils: HttpUtilsService
	) {}

	nextIsDelete(isValue: boolean) {
		this.isCloseModal$.next(isValue);
	}

	getIsDelete(): Observable<boolean> {
		return this.isCloseModal$.asObservable();
	}

	sendListFormField(listFormField: FormFieldService[]) {
		this.subjectFormField.next(listFormField);
	}

	clearFormField() {
		this.subjectFormField.next();
	}

	getListFormField(): Observable<FormFieldService[]> {
		return this.subjectFormField.asObservable();
	}

	// CREATE =>  POST: add a new FormField to the server
	createFormField(FormField: FormFieldService): Observable<FormFieldService> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<FormFieldService>(
			AppSettings.API_FORM_FIELD_URL,
			FormField,
			{
				headers: httpHeaders
			}
		);
	}

	// READ
	getAllFormFields(): Observable<FormFieldService[]> {
		return this.http.get<FormFieldService[]>(
			AppSettings.API_FORM_FIELD_URL
		);
	}

	getFormFieldById(FormFieldId: number): Observable<FormFieldService> {
		return this.http.get<FormFieldService>(
			AppSettings.API_FORM_FIELD_URL + `/${FormFieldId}`
		);
	}

	// UPDATE => PUT: update the FormField on the server
	updateFormField(FormField: FormFieldService): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(AppSettings.API_FORM_FIELD_URL, FormField, {
			headers: httpHeader
		});
	}

	// UPDATE Status
	updateStatusForFormField(
		FormFields: FormFieldService[],
		status: number
	): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			FormFieldsForUpdate: FormFields,
			newStatus: status
		};
		const url = AppSettings.API_FORM_FIELD_URL + "/updateStatus";
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the FormField from the server
	deleteFormField(FormFieldId: number): Observable<FormFieldService> {
		const url = `${AppSettings.API_FORM_FIELD_URL}/${FormFieldId}`;
		return this.http.delete<FormFieldService>(url);
	}
}
