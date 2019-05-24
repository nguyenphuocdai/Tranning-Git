import { BaseBuilderModel } from "../../core/_base/crud/models/_base-builder.model";

export class SolutionModel extends BaseBuilderModel {
	roles: number[];
	owner: string;
	databaseName: string;
	version: string;

	clear(): void {
		// clear solution
	}
}
