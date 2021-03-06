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
	id: string;
	label?: string;
	name?: string;
	inputType?: string;
	textType?: string;
	isDecimal?: string;
	numberDecimal?: string;
	required?: boolean;
	tracking?: boolean;
	security?: boolean;
	errorMessage?: string;
	fieldType?: string;
	description?: string;
	options?: SelectOption[];
	collections?: any;
	displayFormat?: string;
	database?: string;
	type: string;
	value?: any;
	modules?: string;
	minValue?: string;
	maxValue?: string;
	unitMoney?: string;
	textFupload?: string;
	pattern?: string;
	validations?: ValidatorInterface[];
}
