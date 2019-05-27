import { BaseBuilderModel } from "../../core/_base/crud/models/_base-builder.model";
import { FieldConfigInterface } from "./field.interface";

export class ModuleModel extends BaseBuilderModel {
	name: string;
	pluralName: string;
	accessType: string;
	database: string;
	solutionId: string;
	optionsField?: FieldConfigInterface[];
	clear?(): void {
		// clear solution
	}
}
