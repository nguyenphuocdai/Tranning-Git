import { BaseBuilderModel } from "./../_base/crud/models/_base-builder.model";

export class ModuleModel extends BaseBuilderModel {
	name: string;
	pluralName: string;
	accessType: string;
	databaseId: string;
	solutionId: string;
	clear(): void {
		// clear solution
	}
}
