import { AsideService } from './../../../views/themes/default/aside-service.service';
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpUtilsService } from "./../../../core/_base/crud/utils/http-utils.service";
import { AppSettings } from "../../_constant/app-setting";
import { ModuleModel } from "../../_model-app/module.model";

@Injectable({
	providedIn: "root"
})
export class ModuleService {
	// Public properties
	subjectModule = new Subject<ModuleModel[]>();

	sourceModules: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	// listModule: ModuleModel[] = [];
	listModule = [];
	constructor(
		private http: HttpClient,
		private httpUtils: HttpUtilsService,
		private asideService: AsideService
	) {}

	/**
	 * Add new solution observable
	 * @param listSolution
	 */
	sendListModuleObs$(moduleData: any) {
		if (localStorage.getItem(AppSettings.MODULESTORAGE)) {
			this.listModule =
				JSON.parse(localStorage.getItem(AppSettings.MODULESTORAGE)) ==
				null
					? []
					: JSON.parse(
							localStorage.getItem(AppSettings.MODULESTORAGE)
					  );
		}
		this.listModule.push(moduleData);
		localStorage.setItem(
			AppSettings.MODULESTORAGE,
			JSON.stringify(this.listModule)
		);
		this.sourceModules.next(this.listModule);
		this.asideService.emitSolutions();
	}

	/**
	 * get list modules
	 */
	getListModuleObs$(): Observable<any> {
		if (localStorage.getItem(AppSettings.MODULESTORAGE)) {
			this.sourceModules.next(
				JSON.parse(localStorage.getItem(AppSettings.MODULESTORAGE))
			);
		}
		// todos
		return this.sourceModules.asObservable();
	}

	clearModule() {
		this.subjectModule.next();
	}

	// getListModule(): Observable<ModuleModel[]> {
	// 	return this.subjectModule.asObservable();
	// }

	// CREATE =>  POST: add a new Module to the server
	createModule(Module: ModuleModel): Observable<ModuleModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<ModuleModel>(AppSettings.API_MODULE_URL, Module, {
			headers: httpHeaders
		});
	}

	// READ
	getAllModules(): Observable<ModuleModel[]> {
		return this.http.get<ModuleModel[]>(AppSettings.API_MODULE_URL);
	}

	getModuleById(ModuleId: number): Observable<ModuleModel> {
		return this.http.get<ModuleModel>(
			AppSettings.API_MODULE_URL + `/${ModuleId}`
		);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	// Server should return filtered/sorted result
	// findModules(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
	// 	// Note: Add headers if needed (tokens/bearer)
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

	// 	const url = AppSettings.API_MODULE_URL + '/find';
	// 	return this.http.get<QueryResultsModel>(url, {
	// 		headers: httpHeaders,
	// 		params:  httpParams
	// 	});
	// }

	// UPDATE => PUT: update the Module on the server
	updateModule(Module: ModuleModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(AppSettings.API_MODULE_URL, Module, {
			headers: httpHeader
		});
	}

	// UPDATE Status
	updateStatusForModule(
		Modules: ModuleModel[],
		status: number
	): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			ModulesForUpdate: Modules,
			newStatus: status
		};
		const url = AppSettings.API_MODULE_URL + "/updateStatus";
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the Module from the server
	deleteModule(ModuleId: number): Observable<ModuleModel> {
		const url = `${AppSettings.API_MODULE_URL}/${ModuleId}`;
		return this.http.delete<ModuleModel>(url);
	}
}
