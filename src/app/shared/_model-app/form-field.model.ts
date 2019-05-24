import { BaseBuilderModel } from "../../core/_base/crud/models/_base-builder.model";

export class ModuleModel extends BaseBuilderModel {
	roles: number[];
	image: string;

	clear(): void {
		// clear solution
	}
}
