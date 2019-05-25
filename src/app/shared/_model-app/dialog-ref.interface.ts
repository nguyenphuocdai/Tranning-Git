import { FieldConfigInterface } from "./field.interface";

export interface DialogRefInterface {
	type: string;
	valueView?: string;
	inputType?: string;
	valueEdit?: FieldConfigInterface;
}
