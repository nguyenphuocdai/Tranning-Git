import { AppSettings } from "./../../../shared/_constant/app-setting";
import { SolutionModel } from "./../../../shared/_model-app/solution.model";
import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class AsideService {
	constructor() {}
	private subject = new Subject<any>();

	sendAllSolutions(listSolution: SolutionModel[]) {
		this.subject.next(listSolution);
	}

	clearSolutions() {
		this.subject.next();
	}

	getAllSolutions(): Observable<any> {
		return this.subject.asObservable();
	}

	emitSolutions() {
		let listSln;
		if (localStorage.getItem(AppSettings.SOLUTIONSTORAGE)) {
			listSln = JSON.parse(
				localStorage.getItem(AppSettings.SOLUTIONSTORAGE)
			);
		}
		this.sendAllSolutions(listSln);
	}
}
