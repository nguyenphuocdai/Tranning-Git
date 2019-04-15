import { Injectable } from "@angular/core";
import { Solution } from "../../auth";
import { Subject, Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class SolutionService {
  private subjectSolution = new Subject<Solution[]>();
  listSolution: Solution[] = [];
  constructor() {}

	sendListSolution(listSolution: Solution[]) {
		this.subjectSolution.next(listSolution);
	}

	clearSolution() {
		this.subjectSolution.next();
	}

	getListSolution(): Observable<Solution[]> {
		return this.subjectSolution.asObservable();
	}
}
