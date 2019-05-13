export interface ValidatorInterface {
	name: string;
	validator: any;
	message: string;
}
export interface FieldConfigInterface {
	label?: string;
	name?: string;
	inputType?: string;
	required?: boolean;
	tracking?: boolean;
	security?: boolean;
	errorMessage?: string;
	fieldType?: string;
	description?: string;
	options?: string[];
	collections?: any;
	displayFormat?: string;
	type: string;
	value?: any;
	validations?: ValidatorInterface[];
}
