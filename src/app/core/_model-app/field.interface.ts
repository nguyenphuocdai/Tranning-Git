export interface ValidatorInterface {
	name: string;
	validator: any;
	message: string;
}

export interface SelectOption {
	id: number;
	label: string;
	value: string;
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
	options?: SelectOption[];
	collections?: any;
	displayFormat?: string;
	type: string;
	value?: any;
	modules?: string;
	minValue?: string;
	maxValue?: string;
	validations?: ValidatorInterface[];
}
