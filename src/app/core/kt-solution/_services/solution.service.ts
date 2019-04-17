import { HttpClient } from "@angular/common/http";
import { AppSettings } from "./../../_constant/app-setting";
import { Injectable } from "@angular/core";
import { SolutionModel } from "../../auth";
import { Subject, Observable } from "rxjs";
import { HttpUtilsService } from "../../_base/crud";

@Injectable({
	providedIn: "root"
})
export class SolutionService {
	// Public properties
	subjectSolution = new Subject<SolutionModel[]>();
	listSolution: SolutionModel[] = [];

	constructor(
		private http: HttpClient,
		private httpUtils: HttpUtilsService
	) {}

	sendListSolution(listSolution: SolutionModel[]) {
		this.subjectSolution.next(listSolution);
	}

	clearSolution() {
		this.subjectSolution.next();
	}

	getListSolution(): Observable<SolutionModel[]> {
		return this.subjectSolution.asObservable();
	}

	// CREATE =>  POST: add a new solution to the server
	createSolution(solution: SolutionModel): Observable<SolutionModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<SolutionModel>(
			AppSettings.API_SOLUTIONS_URL,
			solution,
			{ headers: httpHeaders }
		);
	}

	// READ
	getAllSolutions(): Observable<SolutionModel[]> {
		return this.http.get<SolutionModel[]>(AppSettings.API_SOLUTIONS_URL);
	}

	getSolutionById(solutionId: number): Observable<SolutionModel> {
		return this.http.get<SolutionModel>(
			AppSettings.API_SOLUTIONS_URL + `/${solutionId}`
		);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	// Server should return filtered/sorted result
	// findsolutions(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
	// 	// Note: Add headers if needed (tokens/bearer)
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

	// 	const url = AppSettings.API_SOLUTIONS_URL + '/find';
	// 	return this.http.get<QueryResultsModel>(url, {
	// 		headers: httpHeaders,
	// 		params:  httpParams
	// 	});
	// }

	// UPDATE => PUT: update the solution on the server
	updateSolution(solution: SolutionModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(AppSettings.API_SOLUTIONS_URL, solution, {
			headers: httpHeader
		});
	}

	// UPDATE Status
	updateStatusForsolution(
		solutions: SolutionModel[],
		status: number
	): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			solutionsForUpdate: solutions,
			newStatus: status
		};
		const url = AppSettings.API_SOLUTIONS_URL + "/updateStatus";
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the solution from the server
	deletesolution(solutionId: number): Observable<SolutionModel> {
		const url = `${AppSettings.API_SOLUTIONS_URL}/${solutionId}`;
		return this.http.delete<SolutionModel>(url);
	}
}
