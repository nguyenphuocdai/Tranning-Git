import { BaseBuilderModel } from "../../core/_base/crud/models/_base-builder.model";
import { ModuleModel } from "./module.model";

export class SolutionModel implements BaseBuilderModel {
	id: string;
	name: string;
	owner: string;
	version: string;
	modules?: ModuleModel[] = [];
	description?: string = "";
	isEditMode?: boolean = false;
	userId?: number = 1;
	createdDate?: string = "";
	updatedDate?: string = "";

	clear?(): void {
		// clear solution
	}
}
